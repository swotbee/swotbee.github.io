#!/usr/bin/env node
/**
 * Compare representative Pagefind results from two built website checkouts.
 *
 * Usage:
 *   node scripts/astro-migration-pagefind-compare.mjs --before /tmp/astro6 --after .
 */
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const queries = [
  "renewal reminder",
  "hubspot reporting",
  "deal duplication",
  "customer retention consulting",
  "Breeze AI",
  "renewal revenue leakage",
];

function parseArgs(argv) {
  const options = { after: "." };
  for (let index = 2; index < argv.length; index += 1) {
    if (argv[index] === "--before") options.before = argv[++index];
    else if (argv[index] === "--after") options.after = argv[++index];
    else throw new Error(`Unknown option: ${argv[index]}`);
  }
  if (!options.before) throw new Error("Provide the Astro 6 checkout with --before <directory>.");
  return {
    before: path.resolve(options.before),
    after: path.resolve(options.after),
  };
}

async function waitFor(origin) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      if ((await fetch(origin)).ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for ${origin}`);
}

async function main() {
  const directories = parseArgs(process.argv);
  const servers = [
    { name: "before", cwd: directories.before, port: 4416 },
    { name: "after", cwd: directories.after, port: 4417 },
  ].map((site) => ({
    ...site,
    origin: `http://127.0.0.1:${site.port}`,
    child: spawn(process.execPath, ["scripts/serve-dist.mjs", "--port", String(site.port)], {
      cwd: site.cwd,
      stdio: ["ignore", "pipe", "pipe"],
    }),
  }));

  let browser;
  try {
    await Promise.all(servers.map((server) => waitFor(server.origin)));
    browser = await chromium.launch({ headless: true });
    const snapshots = {};
    for (const server of servers) {
      const page = await browser.newPage();
      await page.goto(`${server.origin}/search/`, { waitUntil: "networkidle" });
      snapshots[server.name] = await page.evaluate(async (terms) => {
        const pagefind = await import("/pagefind/pagefind.js");
        const output = {};
        for (const term of terms) {
          const response = await pagefind.search(term);
          output[term] = {
            total: response.results.length,
            top: await Promise.all(response.results.slice(0, 10).map(async (result) => {
              const data = await result.data();
              return { url: data.url, title: data.meta.title };
            })),
          };
        }
        return output;
      }, queries);
      await page.close();
    }

    const differences = [];
    for (const query of queries) {
      const before = snapshots.before[query];
      const after = snapshots.after[query];
      if (JSON.stringify(before) !== JSON.stringify(after)) differences.push({ query, before, after });
    }
    if (differences.length) {
      console.error(`[pagefind-parity] failed queries=${differences.length}`);
      console.error(JSON.stringify(differences, null, 2));
      process.exitCode = 1;
    } else {
      console.log(`[pagefind-parity] equivalent queries=${queries.length} top-results=10`);
    }
  } finally {
    if (browser) await browser.close();
    for (const server of servers) server.child.kill("SIGTERM");
  }
}

main().catch((error) => {
  console.error(`[pagefind-parity] ${error.message}`);
  process.exit(2);
});
