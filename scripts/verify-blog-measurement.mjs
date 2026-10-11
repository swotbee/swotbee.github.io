#!/usr/bin/env node
/**
 * Verify contract tracker downloads, enquiry clicks and stored landing attribution.
 * Local browser check; blocks all third-party requests and never submits a form.
 * Safe to rerun. Requires dist built with PUBLIC_GA4_ID=G-TEST.
 * Usage: node scripts/verify-blog-measurement.mjs [--port 4403]
 */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('Usage: node scripts/verify-blog-measurement.mjs [--port 4403]\n'
    + 'Build first: PUBLIC_GA4_ID=G-TEST PUBLIC_CLARITY_ID=test pnpm verify\n'
    + 'Checks local downloads, pointer/keyboard CTA events and multi-page attribution.');
  process.exit(0);
}
const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== '--port')) {
  console.error('Use --help for supported options.');
  process.exit(2);
}
const port = Number(args[1] || 4403);
assert(Number.isInteger(port) && port > 1024 && port < 65536, 'Invalid local port');
const origin = `http://127.0.0.1:${port}`;
const root = fileURLToPath(new URL('../', import.meta.url));
let server;
let browser;

async function events(page, name) {
  return page.evaluate((eventName) => Array.from(window.dataLayer || [])
    .filter((entry) => entry[0] === 'event' && entry[1] === eventName)
    .map((entry) => entry[2]), name);
}

async function context(consent) {
  const ctx = await browser.newContext({ acceptDownloads: true });
  await ctx.route('**/*', (route) => {
    const url = new URL(route.request().url());
    return url.origin === origin ? route.continue() : route.abort();
  });
  if (consent) await ctx.addInitScript((choice) => localStorage.setItem('sb_consent', choice), consent);
  return ctx;
}

try {
  // Refuse a stale/plain build before launching a browser.
  const built = await readFile(`${root}dist/resources/contract-tracker-template/index.html`, 'utf8');
  assert(built.includes('G-TEST'), 'Build with the test GA4 identifier first');
  server = spawn(process.execPath, ['scripts/serve-dist.mjs', '--port', String(port)], {
    cwd: root, stdio: ['ignore', 'pipe', 'pipe'],
  });
  await Promise.race([
    once(server.stdout, 'data'),
    once(server, 'exit').then(([code]) => { throw new Error(`Preview exited: ${code}`); }),
  ]);
  browser = await chromium.launch({ headless: true });
  const ctx = await context('granted');
  const page = await ctx.newPage();
  await page.goto(`${origin}/resources/contract-tracker-template/`);
  assert.equal(await page.title(), 'Free Contract Tracker Template (Excel and Google Sheets) | SWOTBee');

  const pendingDownload = page.waitForEvent('download');
  await page.locator('#dl').focus();
  await page.keyboard.press('Enter');
  const download = await pendingDownload;
  assert.equal(download.suggestedFilename(), 'contract-tracker-template.csv');
  const csv = await readFile(await download.path(), 'utf8');
  assert(csv.includes('End Date'), 'CSV has the contract date column');
  assert(csv.includes('Notice'), 'CSV has notice fields');
  const downloads = await events(page, 'resource_download');
  assert.equal(downloads.length, 1, 'One download produces exactly one event');
  assert.deepEqual(downloads[0], {
    resource_id: 'contract_tracker_template', asset_type: 'csv',
    file_name: 'contract-tracker-template.csv', source_page: '/resources/contract-tracker-template/',
    cta_placement: 'resource_hero', transport_type: 'beacon',
  });

  // Keep the page alive to inspect events; preserve normal event bubbling.
  await page.evaluate(() => document.addEventListener('click', (event) => {
    if (event.target.closest('[data-ga-cta]')) event.preventDefault();
  }, true));
  const cta = page.locator('[data-ga-cta="contract_tracker_discovery_call"]');
  await cta.click();
  assert.equal((await events(page, 'cta_click')).length, 1, 'Pointer click is not counted twice');
  await cta.focus();
  await page.keyboard.press('Enter');
  const clicks = await events(page, 'cta_click');
  assert.equal(clicks.length, 2, 'Keyboard enquiry click is measured once');
  for (const event of clicks) assert.deepEqual(event, {
    cta: 'contract_tracker_discovery_call', href: '/contactus/', transport_type: 'beacon',
  });
  await ctx.close();

  const fresh = await context();
  const visitor = await fresh.newPage();
  await visitor.goto(`${origin}/posts/flowner-vs-enrollem-comparison/`, { referer: 'https://www.google.com/' });
  const landing = await visitor.evaluate(() => window.__sbAttribution());
  assert.equal(landing.sb_referrer, 'https://www.google.com/');
  await Promise.all([
    visitor.waitForURL((url) => url.pathname === '/renewal-audit-call/'),
    visitor.locator('[data-ga-cta="flowner_renewal_handoff_mid_call"]').click(),
  ]);
  await visitor.locator('#sb-consent-accept').click();
  assert.deepEqual(await visitor.evaluate(() => window.__sbAttribution()), landing,
    'Accepting on a subsequent page preserves the original enquiry attribution');
  await visitor.goto(`${origin}/contactus/`);
  const formAttribution = await visitor.evaluate(() => {
    const form = document.querySelector('form');
    window.__sbFillAttribution(form);
    return Object.fromEntries(['sb_landing_page', 'sb_referrer'].map((name) => [name,
      form.querySelector(`input[name="${name}"]`).value]));
  });
  assert.deepEqual(formAttribution, landing, 'Contact form receives the original landing and referrer');
  await fresh.close();
  console.log('[blog-measurement] PASS: CSV payload, one download event, pointer and keyboard enquiries, multi-page attribution');
} catch (error) {
  console.error(`[blog-measurement] FAIL: ${error.message}\nWhat next:\n`
    + '  1) Rebuild and retry: PUBLIC_GA4_ID=G-TEST PUBLIC_CLARITY_ID=test pnpm verify && pnpm check:blog-measurement\n'
    + '  2) If the preview port is occupied: pnpm check:blog-measurement --port 4404\n'
    + '  3) Inspect the source: src/layouts/BaseLayout.astro and src/pages/resources/contract-tracker-template.astro');
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  if (server && server.exitCode === null) {
    const exited = once(server, 'exit');
    server.kill();
    await exited;
  }
}
