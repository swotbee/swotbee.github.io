#!/usr/bin/env node
/** Verify analytics privacy and real-SDK performance without sending visitor data.
 * Usage: node scripts/verify-analytics-reliability.mjs
 * Requires a test-ID build. All collection and third parties are intercepted.
 */
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { chromium } from 'playwright';

const root = resolve('dist');
const base = 'http://127.0.0.1:4417';
const collector = 'https://send.swotbee.com';
const homepage = await readFile(resolve(root, 'index.html'), 'utf8');
assert(homepage.includes('G-TEST') && homepage.includes('37de9287-3007-4ce1-b575-b720fca2b6e1'), 'Build with test Google and synthetic Umami IDs first');
const sdk = await (await fetch(collector + '/script.js')).text();
assert(sdk.includes('performance'), 'Expected the pinned real tracker script');
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, base);
    if (url.pathname === '/frame-test/') {
      res.setHeader('Content-Type', 'text/html');
      res.end('<iframe src="/"></iframe>');
      return;
    }
    const path = resolve(root, '.' + url.pathname + (url.pathname.endsWith('/') ? 'index.html' : ''));
    if (!path.startsWith(root + '/')) { res.writeHead(403).end(); return; }
    res.setHeader('Content-Type', ({ '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
      '.woff2': 'font/woff2', '.svg': 'image/svg+xml' })[extname(path)] || 'application/octet-stream');
    res.end(await readFile(path));
  } catch (error) {
    if (error.code !== 'ENOENT' && error.code !== 'EISDIR') throw error;
    res.writeHead(404).end();
  }
});
await new Promise(resolve => server.listen(4417, '127.0.0.1', resolve));
let browser;
try {
  browser = await chromium.launch();
  const context = await browser.newContext();
  await context.addInitScript(() => localStorage.setItem('sb_consent', 'granted'));
  const remote = [];
  const collected = [];
  await context.route('**/*', async route => {
    const req = route.request();
    const url = new URL(req.url());
    if (url.origin === base) return route.continue();
    remote.push(url.hostname + url.pathname);
    if (url.href === collector + '/script.js') return route.fulfill({ contentType: 'text/javascript', body: sdk });
    if (url.pathname === '/api/send' && url.origin === collector) {
      const value = JSON.parse(req.postData());
      collected.push({ ...value, cache: req.headers()['x-umami-cache'] });
      // Make startup events wait for the initial pageview's cache.
      if (value.type === 'event' && !value.payload.name) await new Promise(resolve => setTimeout(resolve, 600));
      return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ cache: 'synthetic-cache' }) });
    }
    return route.fulfill({ contentType: 'text/javascript', body: '' });
  });
  const page = await context.newPage();
  await page.goto(base + '/frame-test/');
  await page.waitForTimeout(800);
  assert.equal(remote.length, 0, 'Preview iframe must not load Google, GTM, Clarity or Umami');
  console.log('PASS preview iframe excludes every analytics vendor');

  const sensitive = new URL(base + '/renewal-audit-call/thank-you/');
  sensitive.searchParams.set('uid', 'FAKE_BOOKING_IDENTIFIER');
  sensitive.searchParams.set('startTime', '2026-11-02T10:30:00Z');
  sensitive.searchParams.set('utm_campaign', 'privacy_local_check');
  remote.length = 0;
  await page.goto(sensitive.href);
  await page.waitForTimeout(800);
  assert(!page.url().includes('FAKE_BOOKING_IDENTIFIER') && !page.url().includes('startTime'));
  assert(page.url().includes('utm_campaign=privacy_local_check'));
  assert((await page.locator('#booking-time').innerText()).includes('2026'), 'Booking date remains visible');
  assert.equal(await page.locator('meta[name="referrer"]').getAttribute('content'), 'no-referrer');
  assert(!remote.some(value => value.includes('clarity.ms')), 'Private booking confirmation must not load Clarity');
  assert(!remote.some(value => value.endsWith('/recorder.js')), 'Private booking page must not load recorder');
  assert(collected.every(value => !JSON.stringify(value).includes('FAKE_BOOKING_IDENTIFIER')));
  console.log('PASS booking details preserved in UI, removed from URL and excluded from recording');

  collected.length = 0;
  await page.goto(base + '/resources/contract-tracker-template/?private=FAKE_PRIVATE_VALUE');
  await page.evaluate(() => window.__sbTrack('qa_startup', { resource_id: 'local' }));
  await page.locator('h1').click();
  await page.waitForTimeout(11500);
  const pageviews = collected.filter(value => value.type === 'event' && !value.payload.name);
  const startup = collected.find(value => value.payload.name === 'qa_startup');
  assert.equal(pageviews.length, 1, 'Manual initial pageview must not duplicate');
  assert.equal(startup.cache, 'synthetic-cache', 'Queued startup event shares initialized visit cache');
  const performance = collected.find(value => value.type === 'performance');
  assert(performance, 'Real SDK must send performance through before-send hook');
  assert(['ttfb', 'fcp', 'lcp'].some(key => Number.isFinite(performance.payload[key])));
  assert(collected.every(value => !JSON.stringify(value).includes('FAKE_PRIVATE_VALUE')));
  console.log('PASS real-SDK performance metrics, startup linkage, one pageview and URL minimization');
  await context.close();
} catch (error) {
  console.error('FAIL analytics reliability:', error.message);
  console.error('Fix/retry: rebuild with the documented synthetic IDs, then rerun.');
  console.error('Pause safely: do not deploy until these regression checks pass.');
  console.error('Debug: inspect the named assertion; all remote collection is mocked.');
  process.exitCode = 1;
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
