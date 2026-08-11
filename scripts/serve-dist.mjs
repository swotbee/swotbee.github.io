#!/usr/bin/env node
/**
 * Serve ./dist with gzip, the way GitHub Pages does.
 *
 * Use this for any local performance measurement. `python -m http.server` and most
 * quick static servers send everything uncompressed, which inflates transfer sizes
 * roughly 5x for CSS and HTML and makes Lighthouse mobile scores look far worse than
 * production. Read-only; serves files and changes nothing.
 *
 * Usage: node scripts/serve-dist.mjs [--port 4395]
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = resolve(fileURLToPath(new URL("../dist", import.meta.url)));

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".woff2": "font/woff2", ".ico": "image/x-icon", ".xml": "application/xml",
  ".txt": "text/plain", ".webmanifest": "application/manifest+json",
};
// Images and fonts are already compressed; gzipping them again wastes CPU and can
// grow the payload. This is the same set a CDN would compress.
const COMPRESS = new Set([".html", ".js", ".css", ".json", ".svg", ".xml", ".txt", ".webmanifest"]);

function usage() {
  console.log(`Usage: node scripts/serve-dist.mjs [--port <n>]

Serves ./dist over http with gzip, matching GitHub Pages closely enough for
Lighthouse to be meaningful.

Options:
  --port <n>   Port to listen on (default 4395)
  -h, --help   Show this help

Why it exists: measuring against an uncompressed server made this site's mobile
Lighthouse read 81 with a 4.0s LCP when the real, compressed figure was 97 with a
2.1s LCP. That gap is big enough to send you optimising things that are not slow.
`);
}

let port = 4395;
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a === "-h" || a === "--help") { usage(); process.exit(0); }
  else if (a === "--port") port = Number(process.argv[++i]);
  else {
    console.error(`Unknown option: ${a}\n`);
    usage();
    process.exit(2);
  }
}

if (!existsSync(join(DIST, "index.html"))) {
  console.error(`[serve-dist] No built site at ${DIST}\n`);
  console.error("What next:");
  console.error("  1) Build first");
  console.error("     why: this serves the production output, not the dev server");
  console.error("     how: pnpm build && node scripts/serve-dist.mjs");
  console.error("  2) Build with analytics ids, if measuring performance");
  console.error("     why: a plain build omits GA4 and Clarity, so the numbers flatter the page");
  console.error("     how: PUBLIC_GA4_ID=G-TEST PUBLIC_CLARITY_ID=test pnpm build");
  console.error("  3) Use the dev server instead");
  console.error("     why: fine for looking at a page, useless for performance numbers");
  console.error("     how: pnpm dev\n");
  process.exit(2);
}

createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p.endsWith("/")) p += "index.html";
    const file = join(DIST, p);
    // Never serve outside dist, even if the path contains ../
    if (!file.startsWith(DIST)) { res.writeHead(403).end("forbidden"); return; }
    let body = await readFile(file);
    const ext = extname(file);
    const headers = { "content-type": MIME[ext] || "application/octet-stream" };
    if (COMPRESS.has(ext) && /\bgzip\b/.test(req.headers["accept-encoding"] || "")) {
      body = gzipSync(body);
      headers["content-encoding"] = "gzip";
    }
    headers["content-length"] = body.length;
    res.writeHead(200, headers);
    res.end(body);
  } catch {
    // GitHub Pages serves 404.html for anything missing; mirror that so link and
    // performance runs see the same behaviour they will in production.
    try {
      const body = await readFile(join(DIST, "404.html"));
      res.writeHead(404, { "content-type": "text/html" }).end(body);
    } catch {
      res.writeHead(404).end("not found");
    }
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`[serve-dist] http://127.0.0.1:${port}  (gzip on, serving ${DIST})`);
});
