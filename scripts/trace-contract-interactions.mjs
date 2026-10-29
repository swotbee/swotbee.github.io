#!/usr/bin/env node
/** Controlled, local interaction trace; no real forms or analytics are sent.
 * Usage: node scripts/trace-contract-interactions.mjs [--base http://127.0.0.1:4415]
 * Start the repository's gzip serve:dist server first. Results remain in /tmp.
 */
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
const args = process.argv.slice(2);
if (args.includes('--help')) {
  console.log('Usage: node scripts/trace-contract-interactions.mjs [--base http://127.0.0.1:4415]');
  process.exit(0);
}
const base = args.includes('--base') ? args[args.indexOf('--base') + 1] : 'http://127.0.0.1:4415';
assert(['127.0.0.1', 'localhost'].includes(new URL(base).hostname), 'Local test server required');
const browser = await chromium.launch();
const result = [];
try {
  for (const [mode, viewport, throttle] of [['desktop', { width: 1440, height: 1000 }, 1],
    ['mobile-4x-cpu', { width: 390, height: 844 }, 4]]) {
    const context = await browser.newContext({ viewport });
    let submissions = 0;
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin === base) return route.continue();
      if (url.pathname.includes('webhook')) submissions++;
      return route.abort();
    });
    await context.addInitScript(() => {
      window.__interactionTrace = { events: [], longTasks: [], lcp: [] };
      for (const [type, key] of [['event', 'events'], ['longtask', 'longTasks'], ['largest-contentful-paint', 'lcp']]) {
        new PerformanceObserver(list => {
          window.__interactionTrace[key].push(...list.getEntries().map(entry => ({
            name: entry.name, duration: entry.duration, startTime: entry.startTime,
            interactionId: entry.interactionId,
          })));
        }).observe({ type, buffered: true, durationThreshold: 16 });
      }
    });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: throttle });
    await page.goto(base + '/services/hubspot-contract-management/?sb_analytics_test=1');
    await page.locator('summary').first().click();
    await page.locator('#cf-first').fill('Local QA');
    await page.locator('#cf-email').pressSequentially('not-an-email', { delay: 20 });
    await page.locator('#cf-submit').click();
    await page.waitForTimeout(500);
    const trace = await page.evaluate(() => window.__interactionTrace);
    assert.equal(submissions, 0, 'No lead or external submission permitted');
    const interactionDurations = trace.events.filter(entry => entry.interactionId).map(entry => entry.duration);
    const summary = { mode, thirdPartiesBlocked: true, submissions,
      maxObservedInteractionMs: Math.max(0, ...interactionDurations),
      maxObservedLongTaskMs: Math.max(0, ...trace.longTasks.map(entry => entry.duration)), trace };
    result.push(summary);
    console.log(JSON.stringify({ ...summary, trace: undefined }));
    await context.close();
  }
  await writeFile('/tmp/swotbee-contract-interaction-trace-20261029.json', JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
