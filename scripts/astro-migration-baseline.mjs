#!/usr/bin/env node
/**
 * Capture or compare the semantic output of an Astro production build.
 *
 * The snapshot intentionally ignores generated asset hashes and CSS serialization.
 * It retains routes, visible text, headings, links, forms, metadata, JSON-LD,
 * Markdown article content, sitemap entries, redirects, RSS entries, and Pagefind
 * page counts. This makes it suitable for a framework migration where byte-for-byte
 * HTML equality would create noise but user-visible and discoverability changes must
 * fail loudly.
 *
 * Usage:
 *   node scripts/astro-migration-baseline.mjs capture --output scripts/fixtures/astro6-baseline.json
 *   node scripts/astro-migration-baseline.mjs compare --baseline scripts/fixtures/astro6-baseline.json
 *   node scripts/astro-migration-baseline.mjs self-test --baseline scripts/fixtures/astro6-baseline.json
 */

import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const PACKAGE_JSON = path.join(ROOT, "package.json");
const DEFAULT_BASELINE = path.join(ROOT, "scripts/fixtures/astro6-baseline.json");

const REPRESENTATIVE_PAGES = [
  { route: "/", kind: "homepage-react-island" },
  { route: "/renewal-audit-call/", kind: "booking-funnel" },
  { route: "/hubspot-sales-pipeline-reporting/", kind: "reporting-form-landing" },
  { route: "/posts/contract-renewal-reminder-software/", kind: "markdown-article" },
  { route: "/services/sales-revops/", kind: "service-page" },
  { route: "/resources/hubspot-management-reporting-starter-pack/", kind: "resource-page" },
  { route: "/renewal-scorecard/", kind: "interactive-calculator" },
  { route: "/renewal-audit-call/thank-you/", kind: "noindex-result-page" },
  { route: "/renewal-operations-animated-v3/", kind: "static-redirect" },
];

function usage() {
  console.log(`Usage:
  node scripts/astro-migration-baseline.mjs capture [--output <file>]
  node scripts/astro-migration-baseline.mjs compare [--baseline <file>] [--report <file>]
  node scripts/astro-migration-baseline.mjs self-test [--baseline <file>]

Commands:
  capture   Save the current ./dist semantic output as a JSON baseline.
  compare   Compare the current ./dist semantic output with a saved baseline.
  self-test Simulate route and canonical regressions and require their detection.

Options:
  --output <file>     Capture destination (default: scripts/fixtures/astro6-baseline.json)
  --baseline <file>   Baseline to compare (default: scripts/fixtures/astro6-baseline.json)
  --report <file>     Optional JSON comparison report
  -h, --help          Show this help
`);
}

function parseArgs(argv) {
  const options = { command: argv[2] };
  for (let index = 3; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "-h" || argument === "--help") options.help = true;
    else if (argument === "--output") options.output = argv[++index];
    else if (argument === "--baseline") options.baseline = argv[++index];
    else if (argument === "--report") options.report = argv[++index];
    else throw new Error(`Unknown option: ${argument}`);
  }
  return options;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function decodeHtml(value = "") {
  const named = {
    amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " ",
    ndash: "-", mdash: "-", hellip: "...", rsquo: "'", lsquo: "'",
    rdquo: '"', ldquo: '"', middot: "·", rsaquo: "›", laquo: "«", raquo: "»",
  };
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    if (entity.startsWith("#x")) return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    if (entity.startsWith("#")) return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    return named[entity.toLowerCase()] ?? match;
  });
}

function parseAttributes(tag) {
  const attributes = {};
  for (const match of tag.matchAll(/([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    attributes[match[1].toLowerCase()] = decodeHtml(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return attributes;
}

function normalizeText(html) {
  return decodeHtml(html
    .replace(/<!--([\s\S]*?)-->/g, " ")
    .replace(/<(script|style|noscript|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<(?:br|hr)\b[^>]*>/gi, " ")
    .replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function extractBody(html) {
  return html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
}

function extractArticle(html) {
  return html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1] ?? extractBody(html);
}

function collectHeadings(html) {
  return [...html.matchAll(/<h([1-6])\b([^>]*)>([\s\S]*?)<\/h\1>/gi)].map((match) => {
    const attributes = parseAttributes(`<h${match[1]}${match[2]}>`);
    return {
      level: Number(match[1]),
      id: attributes.id ?? null,
      text: normalizeText(match[3]),
    };
  });
}

function collectLinks(html) {
  const links = [];
  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = parseAttributes(match[0]).href;
    if (!href) continue;
    if (href.startsWith("/") || href.startsWith("https://swotbee.com")) links.push(href);
  }
  return [...new Set(links)].sort();
}

function collectForms(html) {
  return [...html.matchAll(/<form\b[^>]*>/gi)].map((match) => {
    const attributes = parseAttributes(match[0]);
    return {
      id: attributes.id ?? null,
      action: attributes.action ?? null,
      method: (attributes.method ?? "get").toLowerCase(),
      name: attributes.name ?? null,
    };
  });
}

function collectMetadata(html) {
  const metadata = {};
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
  if (title !== undefined) metadata.title = [normalizeText(title)];

  for (const tag of html.match(/<(?:meta|link)\b[^>]*>/gi) ?? []) {
    const attributes = parseAttributes(tag);
    let key = attributes.property || attributes.name;
    if (!key && attributes.rel === "canonical") key = "canonical";
    if (!key) continue;
    if (attributes.rel && attributes.rel !== "canonical") continue;
    const value = attributes.content ?? attributes.href;
    if (value === undefined) continue;
    (metadata[key] ??= []).push(value);
  }

  return Object.fromEntries(Object.entries(metadata)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, values]) => [key, [...values].sort()]));
}

function sortObject(value) {
  if (Array.isArray(value)) return value.map(sortObject);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, nested]) => [key, sortObject(nested)]));
}

function collectJsonLd(html) {
  return [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match, index) => {
      const source = match[1].trim();
      try {
        return { index, value: sortObject(JSON.parse(source)) };
      } catch (error) {
        return { index, parseError: error.message, sourceHash: sha256(source) };
      }
    });
}

function routeForHtmlFile(filePath) {
  const relative = path.relative(DIST, filePath).split(path.sep).join("/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return `/${relative.slice(0, -"index.html".length)}`;
  return `/${relative}`;
}

function fileForRoute(route) {
  if (route === "/") return path.join(DIST, "index.html");
  if (route.endsWith(".html")) return path.join(DIST, route.slice(1));
  return path.join(DIST, route.slice(1), "index.html");
}

async function walk(directory, predicate = () => true) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(entryPath, predicate));
    else if (entry.isFile() && predicate(entryPath)) files.push(entryPath);
  }
  return files;
}

async function snapshotPage(route, kind) {
  const filePath = fileForRoute(route);
  if (!existsSync(filePath)) throw new Error(`Representative page is missing: ${route} (${filePath})`);
  const html = await readFile(filePath, "utf8");
  const body = extractBody(html);
  const visibleText = normalizeText(body);
  return {
    kind,
    route,
    hasHtmlElement: /<html(?:\s|>)/i.test(html),
    bytes: Buffer.byteLength(html),
    visibleTextHash: sha256(visibleText),
    visibleTextLength: visibleText.length,
    headings: collectHeadings(body),
    internalLinks: collectLinks(body),
    forms: collectForms(body),
    metadata: collectMetadata(html),
    jsonLd: collectJsonLd(html),
  };
}

async function collectMarkdownPages() {
  const postsDirectory = path.join(DIST, "posts");
  const files = await walk(postsDirectory, (filePath) => filePath.endsWith("index.html"));
  const pages = {};
  for (const filePath of files.sort()) {
    const html = await readFile(filePath, "utf8");
    if (!/<html(?:\s|>)/i.test(html)) continue;
    const route = routeForHtmlFile(filePath);
    const article = extractArticle(html);
    const text = normalizeText(article);
    const metadata = collectMetadata(html);
    const jsonLd = collectJsonLd(html);
    pages[route] = {
      textHash: sha256(text),
      textLength: text.length,
      headings: collectHeadings(article),
      internalLinks: collectLinks(article),
      metadataHash: sha256(JSON.stringify(metadata)),
      jsonLdHash: sha256(JSON.stringify(jsonLd)),
      jsonLdCount: jsonLd.length,
    };
  }
  return pages;
}

function xmlValue(source, name) {
  return decodeHtml(source.match(new RegExp(`<${name}>([\\s\\S]*?)<\\/${name}>`, "i"))?.[1]?.trim() ?? "");
}

async function collectSitemap() {
  const xml = await readFile(path.join(DIST, "sitemap-0.xml"), "utf8");
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)].map((match) => ({
    loc: xmlValue(match[1], "loc"),
    lastmod: xmlValue(match[1], "lastmod") || null,
    changefreq: xmlValue(match[1], "changefreq") || null,
    priority: xmlValue(match[1], "priority") || null,
  })).sort((left, right) => left.loc.localeCompare(right.loc));
}

async function collectRss() {
  const xml = await readFile(path.join(DIST, "rss.xml"), "utf8");
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((match) => ({
    title: xmlValue(match[1], "title"),
    link: xmlValue(match[1], "link"),
    pubDate: xmlValue(match[1], "pubDate"),
  })).sort((left, right) => left.link.localeCompare(right.link));
}

async function collectRedirects(htmlFiles) {
  const redirects = [];
  for (const filePath of htmlFiles) {
    const html = await readFile(filePath, "utf8");
    const refreshTag = html.match(/<meta\b[^>]*http-equiv=["']refresh["'][^>]*>/i)?.[0];
    if (!refreshTag) continue;
    const refresh = parseAttributes(refreshTag).content ?? null;
    const canonicalTag = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i)?.[0];
    redirects.push({
      route: routeForHtmlFile(filePath),
      refresh,
      canonical: canonicalTag ? parseAttributes(canonicalTag).href ?? null : null,
    });
  }
  return redirects.sort((left, right) => left.route.localeCompare(right.route));
}

async function collectAssetStats() {
  const assetDirectory = path.join(DIST, "_astro");
  const files = await walk(assetDirectory);
  const byExtension = {};
  let totalBytes = 0;
  for (const filePath of files) {
    const extension = path.extname(filePath).toLowerCase() || "(none)";
    const bytes = (await stat(filePath)).size;
    const bucket = byExtension[extension] ??= { files: 0, bytes: 0 };
    bucket.files += 1;
    bucket.bytes += bytes;
    totalBytes += bytes;
  }
  return { files: files.length, bytes: totalBytes, byExtension: sortObject(byExtension) };
}

async function captureSnapshot() {
  if (!existsSync(path.join(DIST, "index.html"))) {
    throw new Error("No production build found in ./dist. Run pnpm build first.");
  }
  const packageJson = JSON.parse(await readFile(PACKAGE_JSON, "utf8"));
  const htmlFiles = (await walk(DIST, (filePath) => filePath.endsWith(".html"))).sort();
  const routes = htmlFiles.map(routeForHtmlFile).sort();
  const representativePages = {};
  for (const page of REPRESENTATIVE_PAGES) {
    representativePages[page.route] = await snapshotPage(page.route, page.kind);
  }
  const pagefindFragments = existsSync(path.join(DIST, "pagefind/fragment"))
    ? await readdir(path.join(DIST, "pagefind/fragment"))
    : [];

  return {
    schemaVersion: 1,
    environment: {
      node: process.version,
      astro: packageJson.dependencies.astro,
      vite: packageJson.devDependencies.vite,
      reactIntegration: packageJson.dependencies["@astrojs/react"],
      alpineIntegration: packageJson.dependencies["@astrojs/alpinejs"],
    },
    routeCount: routes.length,
    routes,
    representativePages,
    markdownPages: await collectMarkdownPages(),
    sitemap: await collectSitemap(),
    redirects: await collectRedirects(htmlFiles),
    rss: await collectRss(),
    pagefind: {
      fragmentCount: pagefindFragments.filter((name) => name.endsWith(".pf_fragment")).length,
    },
    assetStats: await collectAssetStats(),
  };
}

function compareValues(expected, actual, pointer, differences) {
  if (Object.is(expected, actual)) return;
  if (Array.isArray(expected) && Array.isArray(actual)) {
    if (expected.length !== actual.length) {
      differences.push(`${pointer}: array length ${expected.length} -> ${actual.length}`);
    }
    const length = Math.min(expected.length, actual.length);
    for (let index = 0; index < length; index += 1) {
      compareValues(expected[index], actual[index], `${pointer}[${index}]`, differences);
    }
    return;
  }
  if (expected && actual && typeof expected === "object" && typeof actual === "object") {
    const keys = [...new Set([...Object.keys(expected), ...Object.keys(actual)])].sort();
    for (const key of keys) {
      if (!(key in expected)) differences.push(`${pointer}.${key}: added`);
      else if (!(key in actual)) differences.push(`${pointer}.${key}: removed`);
      else compareValues(expected[key], actual[key], `${pointer}.${key}`, differences);
    }
    return;
  }
  differences.push(`${pointer}: ${JSON.stringify(expected)} -> ${JSON.stringify(actual)}`);
}

function comparisonView(snapshot) {
  const linksAsSet = (links) => Object.fromEntries(links.map((link) => [link, true]));
  const pageView = (page) => ({
    kind: page.kind,
    route: page.route,
    hasHtmlElement: page.hasHtmlElement,
    visibleTextHash: page.visibleTextHash,
    visibleTextLength: page.visibleTextLength,
    headings: page.headings,
    internalLinks: linksAsSet(page.internalLinks),
    forms: page.forms,
    metadata: page.metadata,
    jsonLd: page.jsonLd,
  });
  const markdownView = (page) => ({
    ...page,
    internalLinks: linksAsSet(page.internalLinks),
  });
  return {
    routeCount: snapshot.routeCount,
    routes: Object.fromEntries(snapshot.routes.map((route) => [route, true])),
    representativePages: Object.fromEntries(Object.entries(snapshot.representativePages).map(([route, page]) => [route, pageView(page)])),
    markdownPages: Object.fromEntries(Object.entries(snapshot.markdownPages).map(([route, page]) => [route, markdownView(page)])),
    sitemap: Object.fromEntries(snapshot.sitemap.map(({ loc, ...entry }) => [loc, entry])),
    redirects: Object.fromEntries(snapshot.redirects.map(({ route, ...entry }) => [route, entry])),
    rss: Object.fromEntries(snapshot.rss.map(({ link, ...entry }) => [link, entry])),
    pagefind: snapshot.pagefind,
  };
}

function printNextSteps() {
  console.error("\nWhat next:");
  console.error("  1) Inspect every reported semantic difference");
  console.error("     why: route, text, metadata, schema, sitemap, redirect, RSS, and search changes can affect users or indexing");
  console.error("     how: rerun with --report .astro-migration/semantic-diff.json");
  console.error("  2) Fix unintended differences and rebuild");
  console.error("     why: a successful Astro build does not prove equivalent output");
  console.error("     how: pnpm build && pnpm baseline:astro:compare");
  console.error("  3) Update the baseline only for an explicitly approved behavior change");
  console.error("     why: silently accepting a new snapshot would erase the regression signal");
  console.error("     how: document the decision, then rerun pnpm baseline:astro:capture\n");
}

async function main() {
  const options = parseArgs(process.argv);
  if (options.help || !["capture", "compare", "self-test"].includes(options.command)) {
    usage();
    process.exit(options.help ? 0 : 2);
  }

  if (options.command === "capture") {
    const output = path.resolve(options.output ?? DEFAULT_BASELINE);
    const snapshot = await captureSnapshot();
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, `${JSON.stringify(snapshot, null, 2)}\n`);
    console.log(`[astro-baseline] captured routes=${snapshot.routeCount} markdown=${Object.keys(snapshot.markdownPages).length} sitemap=${snapshot.sitemap.length} pagefind=${snapshot.pagefind.fragmentCount}`);
    console.log(`[astro-baseline] wrote ${path.relative(ROOT, output)}`);
    return;
  }

  const baselinePath = path.resolve(options.baseline ?? DEFAULT_BASELINE);
  if (!existsSync(baselinePath)) throw new Error(`Baseline does not exist: ${baselinePath}`);
  const expected = JSON.parse(await readFile(baselinePath, "utf8"));
  const actual = await captureSnapshot();

  if (options.command === "self-test") {
    const simulated = structuredClone(actual);
    simulated.routes = simulated.routes.slice(1);
    simulated.routeCount -= 1;
    simulated.representativePages["/"].metadata.canonical = ["https://swotbee.com/simulated-regression/"];
    const simulatedDifferences = [];
    compareValues(comparisonView(expected), comparisonView(simulated), "$", simulatedDifferences);
    const detectedRoute = simulatedDifferences.some((difference) => difference.includes("$.routes") || difference.includes("$.routeCount"));
    const detectedCanonical = simulatedDifferences.some((difference) => difference.includes('representativePages./.metadata.canonical'));
    if (!detectedRoute || !detectedCanonical) {
      throw new Error(`Self-test failed: route=${detectedRoute} canonical=${detectedCanonical}`);
    }
    console.log(`[astro-baseline] self-test passed differences=${simulatedDifferences.length} route=true canonical=true`);
    return;
  }

  const differences = [];
  compareValues(comparisonView(expected), comparisonView(actual), "$", differences);
  const report = {
    baseline: path.relative(ROOT, baselinePath),
    expectedEnvironment: expected.environment,
    actualEnvironment: actual.environment,
    equivalent: differences.length === 0,
    differences,
    assetStatsBefore: expected.assetStats,
    assetStatsAfter: actual.assetStats,
  };
  if (options.report) {
    const reportPath = path.resolve(options.report);
    await mkdir(path.dirname(reportPath), { recursive: true });
    await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  }
  if (differences.length > 0) {
    console.error(`[astro-baseline] failed with ${differences.length} semantic difference(s):`);
    for (const difference of differences.slice(0, 100)) console.error(`  - ${difference}`);
    if (differences.length > 100) console.error(`  - ... ${differences.length - 100} more; use --report for the complete list`);
    printNextSteps();
    process.exit(1);
  }
  console.log(`[astro-baseline] equivalent routes=${actual.routeCount} markdown=${Object.keys(actual.markdownPages).length} sitemap=${actual.sitemap.length} pagefind=${actual.pagefind.fragmentCount}`);
  if (options.report) console.log(`[astro-baseline] wrote ${options.report}`);
}

main().catch((error) => {
  console.error(`[astro-baseline] ${error.message}`);
  process.exit(2);
});
