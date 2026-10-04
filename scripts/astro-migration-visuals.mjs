#!/usr/bin/env node
/**
 * Capture deterministic desktop and mobile screenshots for distinct site page types.
 *
 * Third-party requests are blocked and stored consent is set to denied. This keeps
 * screenshots stable while the separate consent and conversion suites validate the
 * real external integrations.
 *
 * Usage:
 *   node scripts/astro-migration-visuals.mjs --label before
 *   node scripts/astro-migration-visuals.mjs --label after
 */

import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const OUTPUT_ROOT = path.join(ROOT, ".astro-migration");
const PORT = 4407;
const ORIGIN = `http://127.0.0.1:${PORT}`;

const PAGES = [
  { slug: "home", route: "/", kind: "homepage-react-island" },
  { slug: "renewal-audit", route: "/renewal-audit-call/", kind: "booking-funnel" },
  { slug: "reporting", route: "/hubspot-sales-pipeline-reporting/", kind: "reporting-form-landing" },
  { slug: "article", route: "/posts/contract-renewal-reminder-software/", kind: "markdown-article" },
  { slug: "service", route: "/services/sales-revops/", kind: "service-page" },
  { slug: "resource", route: "/resources/hubspot-management-reporting-starter-pack/", kind: "resource-page" },
  { slug: "scorecard", route: "/renewal-scorecard/", kind: "interactive-calculator" },
  { slug: "thank-you", route: "/renewal-audit-call/thank-you/", kind: "noindex-result-page" },
  { slug: "search", route: "/search/", kind: "client-search-page" },
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

function parseArgs(argv) {
  let label;
  for (let index = 2; index < argv.length; index += 1) {
    if (argv[index] === "--") continue;
    if (argv[index] === "--label") label = argv[++index];
    else if (argv[index] === "-h" || argv[index] === "--help") {
      console.log("Usage: node scripts/astro-migration-visuals.mjs --label <before|after|name>");
      process.exit(0);
    } else throw new Error(`Unknown option: ${argv[index]}`);
  }
  if (!label || !/^[a-z0-9_-]+$/i.test(label)) throw new Error("Provide --label using letters, numbers, underscores, or hyphens.");
  return { label };
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

async function waitForServer(attempts = 60) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(ORIGIN);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for ${ORIGIN}`);
}

function startServer() {
  const child = spawn(process.execPath, ["scripts/serve-dist.mjs", "--port", String(PORT)], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
  });
  let errorOutput = "";
  child.stderr.on("data", (chunk) => { errorOutput += chunk.toString(); });
  child.on("exit", (code) => {
    if (code && code !== 0) console.error(`[astro-visuals] server exited ${code}: ${errorOutput.trim()}`);
  });
  return child;
}

async function main() {
  const { label } = parseArgs(process.argv);
  if (!existsSync(path.join(DIST, "index.html"))) throw new Error("No ./dist build found. Run pnpm build first.");
  const outputDirectory = path.join(OUTPUT_ROOT, label);
  await mkdir(outputDirectory, { recursive: true });

  const server = startServer();
  let browser;
  try {
    await waitForServer();
    browser = await chromium.launch({ headless: true });
    const manifest = { label, origin: ORIGIN, pages: {}, errors: [] };

    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 1,
        reducedMotion: "reduce",
      });
      await context.addInitScript(() => {
        localStorage.setItem("sb_consent", "denied");
      });
      await context.route("**/*", async (route) => {
        const url = new URL(route.request().url());
        if (url.origin === ORIGIN || url.protocol === "data:" || url.protocol === "blob:") await route.continue();
        else await route.abort("blockedbyclient");
      });

      for (const pageDefinition of PAGES) {
        const page = await context.newPage();
        const consoleErrors = [];
        const pageErrors = [];
        page.on("console", (message) => {
          if (message.type() === "error" && !/ERR_BLOCKED_BY_CLIENT/.test(message.text())) consoleErrors.push(message.text());
        });
        page.on("pageerror", (error) => pageErrors.push(error.message));
        const response = await page.goto(`${ORIGIN}${pageDefinition.route}`, { waitUntil: "networkidle" });
        await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}" });
        await page.evaluate(() => window.scrollTo(0, 0));
        const fileName = `${pageDefinition.slug}-${viewport.name}.png`;
        const filePath = path.join(outputDirectory, fileName);
        await page.screenshot({ path: filePath, fullPage: true, animations: "disabled" });
        const screenshot = await readFile(filePath);
        const key = `${pageDefinition.slug}:${viewport.name}`;
        manifest.pages[key] = {
          route: pageDefinition.route,
          kind: pageDefinition.kind,
          viewport,
          status: response?.status() ?? null,
          title: await page.title(),
          screenshot: fileName,
          sha256: sha256(screenshot),
          bytes: screenshot.length,
          consoleErrors,
          pageErrors,
        };
        if (response?.status() !== 200 || consoleErrors.length || pageErrors.length) {
          manifest.errors.push({ key, status: response?.status() ?? null, consoleErrors, pageErrors });
        }
        await page.close();
      }
      await context.close();
    }

    await writeFile(path.join(outputDirectory, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
    console.log(`[astro-visuals] captured=${Object.keys(manifest.pages).length} errors=${manifest.errors.length} output=${path.relative(ROOT, outputDirectory)}`);
    if (manifest.errors.length) process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    server.kill("SIGTERM");
  }
}

main().catch((error) => {
  console.error(`[astro-visuals] ${error.message}`);
  console.error("\nWhat next:");
  console.error("  1) Confirm the production build exists: pnpm build");
  console.error("  2) Install the browser if missing: pnpm exec playwright install chromium");
  console.error("  3) Confirm port 4407 is free and rerun the command\n");
  process.exit(2);
});
