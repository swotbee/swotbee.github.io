#!/usr/bin/env node
/**
 * Verify that no tracking script or cookie fires before the visitor consents.
 *
 * Drives a real headless browser through five visitor states (undecided, accept,
 * return, withdraw, return-after-reject) and asserts what actually happened on the
 * wire. Read-only: it serves a local copy of ./dist and touches nothing else, so it
 * is always safe to rerun. Run it before any deploy that changes analytics, consent,
 * or a third-party embed.
 *
 * Usage: node scripts/verify-consent-gating.mjs [options]
 *
 * Why this exists: two separate consent bugs on this site survived a careful read of
 * the code and were caught only by driving a browser. Reading the diff is not a
 * substitute for watching the network.
 */

import { spawn } from "node:child_process";
import { existsSync, readdirSync, rmSync } from "node:fs";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = resolve(fileURLToPath(new URL(".", import.meta.url)));
const REPO_ROOT = resolve(SCRIPT_DIR, "..");
const DIST_DIR = join(REPO_ROOT, "dist");

const C = {
  red: "\x1b[0;31m", green: "\x1b[0;32m", yellow: "\x1b[1;33m",
  blue: "\x1b[0;34m", dim: "\x1b[2m", nc: "\x1b[0m",
};
const TAG = "[consent]";
const logInfo = (m) => console.log(`${C.blue}${TAG}${C.nc} ${m}`);
const logOk = (m) => console.log(`${C.green}${TAG}${C.nc} ${m}`);
const logWarn = (m) => console.log(`${C.yellow}${TAG}${C.nc} ${m}`);
const logErr = (m) => console.error(`${C.red}${TAG}${C.nc} ${m}`);

/** Every human-facing failure ends in a menu, per docs/scripts-style-guide.md 2.1a. */
function printNextSteps(options) {
  console.error("\nWhat next:");
  options.forEach((o, i) => {
    console.error(`  ${i + 1}) ${o.what}`);
    console.error(`     why: ${o.why}`);
    console.error(`     how: ${o.how}`);
  });
  console.error("");
}

function showUsage() {
  console.log(`Usage: node scripts/verify-consent-gating.mjs [options]

Checks that analytics and session-recording scripts stay dormant until a visitor
accepts, load when they do, and stop when consent is withdrawn.

Options:
  --url <url>       Test a URL that is already served (e.g. a live site or dev
                    server) instead of serving ./dist locally
  --path <path>     Page path to exercise when serving ./dist
                    (default: /renewal-operations-animated-v3/)
  --chrome <path>   Path to a Chrome/Chromium binary, if autodetection fails
  --port <n>        Port for the temporary static server (default: 4399)
  --verbose         Print every third-party request per phase
  -h, --help        Show this help

Exit codes:
  0  all assertions passed
  1  a consent assertion failed (a real problem, do not deploy)
  2  the harness could not run (browser missing, no dist, port in use)

Examples:
  pnpm build && node scripts/verify-consent-gating.mjs
  node scripts/verify-consent-gating.mjs --url https://swotbee.com/ --verbose
`);
}

/* ── locating a browser ─────────────────────────────────────────────────────── */

function findChrome(explicit) {
  if (explicit) {
    if (!existsSync(explicit)) {
      fail(2, `Chrome binary not found at: ${explicit}`, [
        { what: "Correct the path and retry",
          why: "--chrome was given explicitly, so autodetection was skipped",
          how: "node scripts/verify-consent-gating.mjs --chrome /usr/bin/google-chrome" },
        { what: "Let the script autodetect instead",
          why: "it already knows the Playwright and common system locations",
          how: "node scripts/verify-consent-gating.mjs" },
        { what: "Install a browser",
          why: "use this if no Chrome or Chromium exists on this machine",
          how: "npx playwright install chromium" },
      ]);
    }
    return explicit;
  }

  const candidates = [];
  // Playwright's cache is the most likely hit on a dev machine, and unlike snap
  // Chromium it honours --user-data-dir, which this script depends on.
  const pw = join(process.env.HOME || "", ".cache", "ms-playwright");
  if (existsSync(pw)) {
    for (const dir of readdirSync(pw).filter((d) => d.startsWith("chromium")).sort().reverse()) {
      candidates.push(join(pw, dir, "chrome-linux64", "chrome"));
      candidates.push(join(pw, dir, "chrome-linux", "chrome"));
      candidates.push(join(pw, dir, "chrome-mac", "Chromium.app", "Contents/MacOS/Chromium"));
    }
  }
  candidates.push(
    "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium", "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  );

  const found = candidates.find((p) => existsSync(p));
  if (found) return found;

  fail(2, "No Chrome or Chromium binary found.", [
    { what: "Install Playwright's Chromium",
      why: "smallest reliable option, and it respects --user-data-dir",
      how: "npx playwright install chromium" },
    { what: "Point at an existing browser",
      why: "use this if Chrome is installed somewhere unusual",
      how: "node scripts/verify-consent-gating.mjs --chrome /path/to/chrome" },
    { what: "Skip this check for now and verify by hand",
      why: "safe only because this is a read-only pre-deploy check that mutates nothing; open DevTools, filter Network by 'clarity', and confirm nothing loads before you click Accept",
      how: "pnpm preview, then check in a browser" },
  ]);
}

/**
 * Snap-packaged Chromium ignores --user-data-dir and refuses to start when the
 * default profile is locked by the user's own browser. Detected up front, because
 * the resulting error is opaque.
 */
function warnIfSnap(bin) {
  if (bin.includes("/snap/")) {
    logWarn("This looks like a snap-packaged Chromium. It ignores --user-data-dir and");
    logWarn("fails when your own browser holds the profile lock. If it hangs, pass");
    logWarn("--chrome with a non-snap binary, or run: npx playwright install chromium");
  }
}

function fail(code, message, options) {
  logErr(message);
  if (options) printNextSteps(options);
  process.exit(code);
}

/* ── static server for ./dist ───────────────────────────────────────────────── */

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2",
  ".ico": "image/x-icon", ".xml": "application/xml", ".txt": "text/plain",
};

function serveDist(port) {
  return new Promise((res, rej) => {
    const server = createServer(async (req, resp) => {
      try {
        let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
        if (p.endsWith("/")) p += "index.html";
        const file = join(DIST_DIR, p);
        if (!file.startsWith(DIST_DIR)) { resp.writeHead(403).end(); return; }
        const body = await readFile(file);
        resp.writeHead(200, { "content-type": MIME[extname(file)] || "application/octet-stream" });
        resp.end(body);
      } catch {
        resp.writeHead(404).end("not found");
      }
    });
    server.on("error", (e) => rej(e));
    server.listen(port, "127.0.0.1", () => res(server));
  });
}

/* ── minimal CDP client (no dependencies) ───────────────────────────────────── */

class CDP {
  constructor(ws) { this.ws = ws; this.id = 1; this.pending = new Map(); this.listeners = []; }

  static async connect(port, attempts = 40) {
    for (let i = 0; i < attempts; i++) {
      try {
        const r = await fetch(`http://127.0.0.1:${port}/json/version`);
        const { webSocketDebuggerUrl } = await r.json();
        const ws = new WebSocket(webSocketDebuggerUrl);
        await new Promise((res, rej) => {
          ws.addEventListener("open", res, { once: true });
          ws.addEventListener("error", rej, { once: true });
        });
        const c = new CDP(ws);
        ws.addEventListener("message", (ev) => {
          const m = JSON.parse(ev.data);
          if (m.id && c.pending.has(m.id)) {
            const { resolve, reject } = c.pending.get(m.id);
            c.pending.delete(m.id);
            m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result);
            return;
          }
          c.listeners.forEach((f) => f(m));
        });
        return c;
      } catch {
        await sleep(250);
      }
    }
    return null;
  }

  send(method, params = {}, sessionId) {
    const id = this.id++;
    this.ws.send(JSON.stringify(sessionId ? { id, method, params, sessionId } : { id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }

  async evaluate(sessionId, expression) {
    const r = await this.send("Runtime.evaluate",
      { expression, returnByValue: true, awaitPromise: true }, sessionId);
    if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
    return r.result.value;
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ── what we measure ────────────────────────────────────────────────────────── */

// Vendors that must not load before consent. Add a row here when a new pixel is
// introduced, or the check silently stops covering it.
//
// `snap.licdn.com` (LinkedIn Insight Tag) was REMOVED 2026-08-11, deliberately, not
// because it stopped mattering. Siva decided the tag fires on All Pages regardless of
// consent so the retargeting audience fills from every visitor, and the banner and
// /cookie/ were rewritten in the same change to say so plainly. Leaving LinkedIn in this
// list would have failed three checks forever, and a suite that always fails is a suite
// nobody reads, which would have cost us the coverage of the other fourteen.
//
// If LinkedIn is ever put back behind consent, put it back here in the same commit.
const GATED = /clarity\.ms|connect\.facebook\.net|bat\.bing\.com|hs-scripts\.com/i;
const THIRD_PARTY = /googletagmanager|google-analytics|doubleclick|clarity\.ms|licdn|facebook|bing\.com|hubspot|hsappstatic/i;
// `li_sugr` stays listed so the intent is recorded, but do NOT read a green suite as
// proof that LinkedIn is swept on withdrawal. It is not, and cannot be: the probe reads
// document.cookie, which by definition cannot see LinkedIn's cookies on .linkedin.com,
// and no site can delete another domain's cookies anyway. Measured on a fresh profile,
// LinkedIn sets seven cookies, all third-party. So this assertion genuinely covers the
// Google and Microsoft cookies and is silent about LinkedIn, rather than the earlier note
// here suggesting it might "start failing intermittently". It never will.
// /cookie/ already tells visitors the truth: those cookies are cleared through browser
// settings or LinkedIn's own controls, not by us.
const TRACKING_COOKIE = /^(_ga|_gid|_gcl|_clck|_clsk|_uetsid|_uetvid|_fbp|_fbc|li_sugr)/;

const PROBE = `(() => {
  const el = document.getElementById('sb-consent');
  const dl = Array.from(window.dataLayer || []).map(a => {
    try { return Array.from(a); } catch (e) { return ['<unreadable>']; }
  });
  return {
    bannerExists: !!el,
    bannerVisible: !!el && !el.hidden,
    stored: (() => { try { return localStorage.getItem('sb_consent'); } catch (e) { return '<blocked>'; } })(),
    gatedTags: Array.from(document.querySelectorAll('script[src]'))
      .map(s => s.src)
      // Keep this list in step with GATED above. snap.licdn.com is deliberately absent:
      // the LinkedIn tag is intentionally ungated as of 2026-08-11, see the note there.
      .filter(s => /clarity\\.ms|connect\\.facebook\\.net/.test(s)).length,
    consentCalls: dl.filter(a => a[0] === 'consent'),
    // Read the RAW dataLayer, not the mapped copy above: gtag pushes arguments objects,
    // which Array.from flattens fine, but a plain object push like
    // {event:'sb_consent_granted'} is not array-like and Array.from turns it into [],
    // silently destroying exactly what this assertion looks for.
    consentEvents: Array.from(window.dataLayer || [])
      .filter(a => a && !Array.isArray(a) && typeof a.length !== 'number' && a.event)
      .map(a => String(a.event))
      .filter(e => e.indexOf('sb_consent') === 0),
    cookies: document.cookie.split(';').map(c => c.trim().split('=')[0]).filter(Boolean),
  };
})()`;

async function run(opts) {
  const chrome = findChrome(opts.chrome);
  warnIfSnap(chrome);
  logInfo(`browser: ${C.dim}${chrome}${C.nc}`);

  let server = null;
  let target = opts.url;

  if (!target) {
    if (!existsSync(join(DIST_DIR, "index.html"))) {
      fail(2, "No built site found at ./dist.", [
        { what: "Build, then retry",
          why: "this check reads the real production output, not the dev server, because dev and prod differ in which scripts are inlined",
          how: "pnpm build && node scripts/verify-consent-gating.mjs" },
        { what: "Point at an already-running server",
          why: "use this to check a dev server or the live site instead",
          how: "node scripts/verify-consent-gating.mjs --url http://localhost:4321/" },
        { what: "Check whether the build is failing for another reason",
          why: "an empty dist usually means the build errored, not that it was skipped",
          how: "pnpm build" },
      ]);
    }
    try {
      server = await serveDist(opts.port);
    } catch (e) {
      fail(2, `Could not start the temporary server on port ${opts.port}: ${e.message}`, [
        { what: "Use a different port",
          why: "something else is already listening, commonly a previous run that did not exit",
          how: `node scripts/verify-consent-gating.mjs --port ${opts.port + 1}` },
        { what: "Free the port",
          why: "use this if you expect nothing to be running there",
          how: `ss -ltnp | grep ${opts.port}` },
        { what: "Test an already-served URL instead",
          why: "skips the local server entirely",
          how: "node scripts/verify-consent-gating.mjs --url http://localhost:4321/" },
      ]);
    }
    target = `http://127.0.0.1:${opts.port}${opts.path}`;
  }

  logInfo(`target : ${target}`);

  const port = 9222 + Math.floor(process.pid % 500);
  const profile = join(REPO_ROOT, "node_modules", ".cache", `consent-check-${process.pid}`);
  const proc = spawn(chrome, [
    "--headless=new", "--disable-gpu", "--no-sandbox", "--no-first-run",
    "--no-default-browser-check", "--disable-extensions",
    `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank",
  ], { stdio: "ignore" });

  const cleanup = () => {
    try { proc.kill("SIGKILL"); } catch {}
    try { server?.close(); } catch {}
    // Remove the throwaway profile. Named by pid and created by this run, so reruns
    // never accumulate stale profiles under node_modules/.cache.
    try { rmSync(profile, { recursive: true, force: true }); } catch {}
  };
  process.on("exit", cleanup);
  process.on("SIGINT", () => { cleanup(); process.exit(130); });

  const cdp = await CDP.connect(port);
  if (!cdp) {
    cleanup();
    fail(2, "The browser started but never exposed a debugging port.", [
      { what: "Retry with a non-snap browser",
        why: "snap Chromium refuses to start when your own browser holds the profile lock, which is the usual cause",
        how: "npx playwright install chromium && node scripts/verify-consent-gating.mjs" },
      { what: "Check whether the browser is crashing on launch",
        why: "use this if a non-snap browser also fails",
        how: `${chrome} --headless=new --remote-debugging-port=${port} about:blank` },
      { what: "Verify by hand instead",
        why: "safe because this check mutates nothing; open DevTools, filter Network by 'clarity', and confirm nothing loads before Accept",
        how: "pnpm preview" },
    ]);
  }

  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });

  const requests = [];
  cdp.listeners.push((m) => {
    if (m.method === "Network.requestWillBeSent" && m.sessionId === sessionId) {
      requests.push(m.params.request.url);
    }
  });
  await cdp.send("Network.enable", {}, sessionId);
  await cdp.send("Page.enable", {}, sessionId);
  await cdp.send("Runtime.enable", {}, sessionId);

  const since = (i) => requests.slice(i).filter((u) => THIRD_PARTY.test(u));
  const phase = async (label, action) => {
    const mark = requests.length;
    await action();
    await sleep(opts.settle);
    const probe = await cdp.evaluate(sessionId, PROBE);
    const hits = since(mark);
    logInfo(`${label}: banner=${probe.bannerVisible} stored=${probe.stored} gatedTags=${probe.gatedTags}`);
    if (opts.verbose) hits.forEach((u) => console.log(`    ${C.dim}${u.slice(0, 120)}${C.nc}`));
    return { probe, hits };
  };

  const nav = () => cdp.send("Page.navigate", { url: target }, sessionId);
  const click = (id) => cdp.evaluate(sessionId, `document.getElementById('${id}').click(); true`);

  const p1 = await phase("undecided visitor      ", nav);
  if (!p1.probe.bannerExists) {
    cleanup();
    fail(2, "No consent banner found on the page at all.", [
      { what: "Build with the analytics IDs set",
        why: "the banner only renders when PUBLIC_GA4_ID or PUBLIC_CLARITY_ID exists, so a plain local build has nothing to consent to and correctly omits it",
        how: "PUBLIC_GA4_ID=G-TEST PUBLIC_CLARITY_ID=test pnpm build && node scripts/verify-consent-gating.mjs" },
      { what: "Check the page you pointed at",
        why: "redirect stubs and error pages carry no analytics and no banner, which is correct",
        how: "node scripts/verify-consent-gating.mjs --path /" },
      { what: "Confirm the banner is still wired into the layout",
        why: "use this if the two above look right",
        how: "rg -n ConsentBanner src/layouts/BaseLayout.astro" },
    ]);
  }

  const p2 = await phase("after accept           ", () => click("sb-consent-accept"));
  const p3 = await phase("returning, consented   ", nav);
  const p4 = await phase("withdrawn via footer   ", async () => {
    await cdp.evaluate(sessionId, `
      document.querySelector('[data-consent-reopen]').click();
      document.getElementById('sb-consent-reject').click(); true`);
  });
  const p5 = await phase("returning, rejected    ", nav);

  const checks = [
    ["banner is shown to an undecided visitor", p1.probe.bannerVisible === true],
    ["no gated script tag before consent", p1.probe.gatedTags === 0],
    ["no gated vendor requested before consent", !p1.hits.some((u) => GATED.test(u))],
    ["consent defaults to denied", JSON.stringify(p1.probe.consentCalls).includes('"denied"')],
    ["no tracking cookie before consent", !p1.probe.cookies.some((c) => TRACKING_COOKIE.test(c))],
    ["accept is remembered", p2.probe.stored === "granted"],
    ["accept loads the gated scripts", p2.probe.gatedTags >= 1],
    ["accept sends a consent update", p2.probe.consentCalls.some((c) => c[1] === "update")],
    ["update grants analytics_storage",
      JSON.stringify(p2.probe.consentCalls).includes('"analytics_storage":"granted"')],
    ["banner closes once a choice is made", p2.probe.bannerVisible === false],
    ["accept pushes a dataLayer event GTM triggers can read",
      (p2.probe.consentEvents || []).includes("sb_consent_granted")],
    ["a returning visitor is not asked again", p3.probe.bannerVisible === false],
    ["gated scripts load for a consented visitor", p3.probe.gatedTags >= 1],
    ["the footer control can withdraw consent", p4.probe.stored === "denied"],
    ["a rejected visitor gets no gated script", p5.probe.gatedTags === 0],
    ["a rejected visitor is not asked again", p5.probe.bannerVisible === false],
    ["no tracking cookie survives a rejection",
      !p5.probe.cookies.some((c) => TRACKING_COOKIE.test(c))],
  ];

  console.log("");
  let failed = 0;
  for (const [name, ok] of checks) {
    if (!ok) failed++;
    console.log(`  ${ok ? C.green + "PASS" : C.red + "FAIL"}${C.nc}  ${name}`);
  }
  console.log("");

  cleanup();

  if (failed) {
    logErr(`${failed} of ${checks.length} consent checks failed.`);
    printNextSteps([
      { what: "Fix the gating and rerun",
        why: "a failure here means tracking runs without permission, which is the thing the banner exists to prevent",
        how: "review src/components/astro/ConsentBanner.astro and the loaders in src/layouts/BaseLayout.astro, then rerun this script" },
      { what: "Inspect the failing phase in detail",
        why: "use this when the failing assertion is not obviously wrong; the request log usually shows which vendor slipped through",
        how: "node scripts/verify-consent-gating.mjs --verbose" },
      { what: "Reproduce it by hand",
        why: "use this to confirm a suspected false positive before changing code; the harness has produced one before, by focusing a hidden field",
        how: "pnpm preview, then watch the Network tab while clicking through the banner" },
    ]);
    return 1;
  }

  logOk(`all ${checks.length} consent checks passed`);
  return 0;
}

/* ── entry point ────────────────────────────────────────────────────────────── */

function parseArgs(argv) {
  const opts = {
    url: null, path: "/renewal-operations-animated-v3/", chrome: null,
    port: 4399, verbose: false, settle: 5000,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-h" || a === "--help") { showUsage(); process.exit(0); }
    else if (a === "--url") opts.url = argv[++i];
    else if (a === "--path") opts.path = argv[++i];
    else if (a === "--chrome") opts.chrome = argv[++i];
    else if (a === "--port") opts.port = Number(argv[++i]);
    else if (a === "--verbose") opts.verbose = true;
    else {
      logErr(`Unknown option: ${a}`);
      showUsage();
      process.exit(2);
    }
  }
  return opts;
}

try {
  process.exit(await run(parseArgs(process.argv.slice(2))));
} catch (err) {
  logErr(`Unexpected failure: ${err?.message ?? err}`);
  console.error(err?.stack ?? "");
  printNextSteps([
    { what: "Rerun once",
      why: "browser startup and page settle are timing-sensitive; a single flake is not unusual",
      how: "node scripts/verify-consent-gating.mjs" },
    { what: "Rerun with more detail",
      why: "use this if it fails twice in the same place",
      how: "node scripts/verify-consent-gating.mjs --verbose" },
    { what: "Verify by hand and unblock yourself",
      why: "safe because this check mutates nothing; it is a gate, not a build step",
      how: "pnpm preview, then watch the Network tab while clicking through the banner" },
  ]);
  process.exit(2);
}
