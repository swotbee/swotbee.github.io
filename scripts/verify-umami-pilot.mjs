#!/usr/bin/env node
/** Controlled local-site acceptance against the synthetic Umami tenant only.
 * Usage: node scripts/verify-umami-pilot.mjs [--preconsent-trial]
 * Blocks other remote requests; form tests use local stubs, never real submissions.
 */
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import { chromium } from 'playwright';

const root = resolve('dist');
const base = 'http://127.0.0.1:4418';
const collector = 'https://send.swotbee.com';
const pagePath = '/resources/contract-tracker-template/';
const html = await readFile(root + pagePath + 'index.html', 'utf8');
const preconsentTrial = process.argv.includes('--preconsent-trial');
assert(html.includes(`const preconsentTrial = ${preconsentTrial};`),
  'Build mode must match the --preconsent-trial test option.');
assert(html.includes('37de9287-3007-4ce1-b575-b720fca2b6e1') && html.includes(collector),
  'Build first with the synthetic Umami ID and origin; never run this against a production tenant.');
const server = createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, base).pathname);
    if (path.endsWith('/')) path += 'index.html';
    const file = resolve(root, '.' + path);
    if (!file.startsWith(root + '/')) { res.writeHead(403).end(); return; }
    const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.svg':'image/svg+xml', '.woff2':'font/woff2' };
    res.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
    res.end(await readFile(file));
  } catch (_) { res.writeHead(404).end(); }
});
await new Promise((resolve, reject) => { server.once('error', reject); server.listen(4418, '127.0.0.1', resolve); });
let browser;
try {
  browser = await chromium.launch({ headless: true });
  // The collector excludes HeadlessChrome as bot traffic. Use a regular Chromium
  // UA for this explicitly synthetic tenant so replay persistence is exercised.
  const context = await browser.newContext({ acceptDownloads: true,
    userAgent: `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${browser.version()} Safari/537.36` });
  const requests = [];
  const sent = [];
  const responses = [];
  const recordKinds = new Set();
  let fixtureSubmissions = 0;
  await context.route('**/*', async route => {
    const req = route.request();
    const url = new URL(req.url());
    if (url.origin === collector) {
      requests.push({ url: req.url(), method: req.method() });
      if (url.pathname === '/api/send' && req.method() === 'POST') sent.push(JSON.parse(req.postData()).payload);
      if (url.pathname === '/api/record' && req.method() === 'POST') {
        for (const kind of ['record', 'heatmap']) if (req.postData()?.includes(`"${kind}"`)) recordKinds.add(kind);
      }
      return route.continue();
    }
    if (url.origin === base) return route.continue();
    // Local form acceptance fixture only: no request reaches Google or the CRM.
    if (url.hostname === 'www.google.com' && url.pathname === '/recaptcha/api.js') {
      return route.fulfill({contentType:'text/javascript',body:'window.grecaptcha={ready:fn=>fn(),execute:()=>Promise.resolve("local-test-token")};'});
    }
    if (url.hostname === 'auto.zippylens.com' && url.pathname === '/webhook/swotbee-form-submit') {
      fixtureSubmissions++;
      return route.fulfill({status:fixtureSubmissions === 1 ? 503 : 200,contentType:'application/json',body:JSON.stringify({accepted:fixtureSubmissions > 1})});
    }
    return route.abort();
  });
  context.on('response', res => {
    if (res.url().startsWith(collector + '/api/')) responses.push({url:res.url(),status:res.status()});
  });
  const page = await context.newPage();
  await page.setViewportSize({width:390,height:844});
  await page.goto(base + pagePath);
  await page.waitForTimeout(1000);
  if (preconsentTrial) {
    await page.waitForFunction(() => typeof window.umami?.track === 'function');
    assert(requests.some(r => r.url.endsWith('/recorder.js')), 'Trial must load recorder before consent');
    assert.equal(await page.evaluate(() => localStorage.getItem('sb_consent')), null);
    assert(await page.locator('#sb-consent-body').innerText().then(text => text.includes('after Reject')));
  } else assert.equal(requests.length, 0, 'Undecided visitor must not load Umami');
  // Reproduce the launch mismatch: reach the footer before granting consent.
  // GA4 advanced consent mode sees those thresholds. Umami sees them only when
  // the temporary pre-consent override is enabled.
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForFunction(() => window.dataLayer.filter(args => args[0] === 'event' && args[1] === 'scroll_depth').length === 4);
  if (preconsentTrial) {
    await page.waitForTimeout(700);
    assert.deepEqual(sent.filter(p => p.name === 'scroll_depth').map(p => p.data.percent).sort((a,b) => a-b), [25,50,75,90]);
  } else assert.equal(requests.length, 0, 'Pre-consent scrolling contacted Umami');
  await page.evaluate(() => window.scrollTo(0, 0));
  if (preconsentTrial) {
    await page.locator('h1').click();
    for (let attempt = 0; attempt < 40 && recordKinds.size < 2; attempt++) await page.waitForTimeout(500);
    assert(recordKinds.has('record'), 'No pre-consent replay upload from the 100% synthetic tenant');
    assert(recordKinds.has('heatmap'), 'No pre-consent heatmap upload from the synthetic tenant');
    console.log('PASS actual pre-consent replay and heatmap uploads');
  }
  await page.waitForTimeout(100);
  const buttons = await page.locator('#sb-consent button').evaluateAll(nodes => nodes.map(node => {
    const box = node.getBoundingClientRect(); return {width:box.width,height:box.height};
  }));
  assert.equal(buttons.length, 2);
  assert.equal(buttons[0].width, buttons[1].width);
  assert(buttons.every(box => box.height >= 44));
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Mobile overflow');
  await page.screenshot({path:'/tmp/umami-pilot-consent-mobile.png'});
  await page.setViewportSize({width:1280,height:900});
  await page.getByRole('button', { name:'Accept analytics cookies', exact:true }).click();
  await page.waitForFunction(() => typeof window.umami?.track === 'function');
  assert.equal(sent.filter(p => p.name === 'scroll_depth').length, preconsentTrial ? 4 : 0,
    'Granting consent must not backfill earlier scrolling');
  await page.mouse.wheel(0, 20000);
  await page.waitForTimeout(1000);
  assert.equal(sent.filter(p => !p.name).length, 1, 'Consent choice must not duplicate the pageview');
  const scrollEvents = sent.filter(p => p.name === 'scroll_depth');
  assert.deepEqual(scrollEvents.map(p => p.data.percent).sort((a,b) => a-b), [25,50,75,90],
    'Post-consent scrolling must reach Umami even if thresholds were crossed before consent');
  assert.equal(await page.evaluate(() => window.dataLayer.filter(args => args[0] === 'event' && args[1] === 'scroll_depth').length), 4,
    'Granting Umami consent must not duplicate GA4 scroll thresholds');
  await page.mouse.wheel(0, -20000);
  await page.waitForTimeout(100);
  await page.mouse.wheel(0, 20000);
  await page.waitForTimeout(400);
  assert.equal(sent.filter(p => p.name === 'scroll_depth').length, 4, 'Repeat scrolling duplicated Umami thresholds');
  console.log('PASS configured pre-consent behavior, scroll thresholds and per-vendor deduplication');
  await page.locator('[data-resource-download]').click();
  await page.waitForTimeout(1500);
  assert.equal(sent.filter(p => p.name === 'resource_download').length, 1, 'Download must dispatch once');
  assert(await page.evaluate(() => window.dataLayer.some(args => args[0] === 'event' && args[1] === 'resource_download')),
    'GA4 must still receive the same event');
  console.log('PASS consent gate, actual download event and GA4 parallel dispatch');

  // Returning consent queues the page-specific event until the real SDK is ready.
  const start = sent.length;
  await page.reload();
  await page.waitForFunction(() => typeof window.umami?.track === 'function');
  await page.waitForTimeout(1000);
  assert(sent.slice(start).some(p => !p.name), 'Returning visitor pageview missing');
  await page.mouse.wheel(0, 20000);
  await page.waitForTimeout(700);
  assert.deepEqual(sent.slice(start).filter(p => p.name === 'scroll_depth').map(p => p.data.percent).sort((a,b) => a-b), [25,50,75,90],
    'Returning consented visit must report all four thresholds');
  await page.evaluate(() => window.__sbTrack('cta_click', {
    cta:'synthetic_privacy_check', email:'private@example.invalid',
    href:'/contactus/?email=private@example.invalid#private', transport_type:'beacon'
  }));
  await page.waitForTimeout(700);
  const payload = sent.find(p => p.data?.cta === 'synthetic_privacy_check');
  assert(payload, 'Privacy test event missing');
  assert(!JSON.stringify(payload).includes('private@example.invalid'));
  assert(!('transport_type' in payload.data));
  assert(responses.some(r => r.url.endsWith('/api/send') && r.status === 200), 'No successful actual SDK ingestion');
  console.log('PASS returning visitor, URL/property minimization and real SDK ingestion');

  const formStart = sent.length;
  await page.goto(base + '/hubspot-sales-pipeline-reporting/');
  await page.waitForFunction(() => typeof window.umami?.track === 'function');
  const form = page.locator('form[data-report-signup]');
  await form.locator('input[name=email]').fill('private@example.invalid');
  await form.locator('button[type=submit]').click();
  await page.waitForFunction(() => document.querySelector('form[data-report-signup] [role=alert]')?.textContent.includes('could not save'));
  await page.waitForTimeout(700);
  assert(!sent.slice(formStart).some(p => p.name === 'report_signup_accepted'), 'Failed submission counted as accepted');
  await form.locator('button[type=submit]').click();
  await page.waitForFunction(() => document.querySelector('form[data-report-signup]')?.classList.contains('hidden'));
  await page.waitForTimeout(900);
  assert.equal(fixtureSubmissions, 2, 'Retry must contact only the local webhook stub');
  assert.equal(sent.slice(formStart).filter(p => p.name === 'report_signup_accepted').length, 1);
  assert.equal(sent.slice(formStart).filter(p => p.name === 'report_signup_saved').length, 1);
  assert(!JSON.stringify(sent.slice(formStart)).includes('private@example.invalid'));
  console.log('PASS local form failure/retry, exactly one accepted/saved event, no email in analytics');

  // The shared redirect helper must not hang when a collector is unavailable.
  await page.evaluate(() => {
    window.__sbTrackUmami = () => new Promise(() => {});
    window.__sbTrackThenGo('cta_click', {cta:'synthetic_redirect'}, '/resources/contract-tracker-template/');
  });
  await page.waitForURL(base + pagePath, {timeout:4000});
  console.log('PASS navigation falls back when Umami does not respond');

  const cookieSettings = page.locator('[data-consent-reopen]').first();
  await cookieSettings.click();
  await page.getByRole('button', { name:'Reject analytics cookies', exact:true }).click();
  await page.waitForFunction(() => localStorage.getItem('sb_consent') === 'denied');
  await page.waitForTimeout(500);
  const afterWithdrawal = requests.length;
  await page.reload();
  await page.waitForTimeout(1200);
  if (preconsentTrial) {
    assert(requests.length > afterWithdrawal, 'Trial must continue for returning denied visitor');
    assert(requests.slice(afterWithdrawal).some(r => r.url.endsWith('/recorder.js')), 'Trial recorder missing after Reject');
    const deniedStart = sent.length;
    await page.evaluate(() => window.__sbTrack('cta_click', {cta:'synthetic_denied_trial'}));
    await page.waitForTimeout(700);
    assert(sent.slice(deniedStart).some(p => p.data?.cta === 'synthetic_denied_trial'));
  } else assert.equal(requests.length, afterWithdrawal, 'Returning denied visitor contacted collector');
  console.log('PASS withdrawal and returning denied visitor');

  await context.addInitScript(() => localStorage.setItem('sb_consent', 'granted'));
  const queryStart = sent.length;
  const reqStart = requests.length;
  await page.goto(base + pagePath + '?email=private@example.invalid&utm_source=synthetic_test');
  await page.waitForFunction(() => typeof window.umami?.track === 'function');
  await page.waitForTimeout(1200);
  assert(sent.slice(queryStart).every(p => !JSON.stringify(p).includes('private@example.invalid')));
  assert(!requests.slice(reqStart).some(r => r.url.endsWith('/recorder.js')), 'Recorder must not capture sensitive-query URL');
  assert(page.url().includes('email='), 'Do not change the real URL used by CRM/GA4');
  console.log('PASS sensitive-query replay exclusion without changing attribution URL');

  const contractStart = sent.length;
  const contractRequests = requests.length;
  await page.goto(base + '/services/hubspot-contract-management/');
  await page.waitForFunction(() => typeof window.umami?.track === 'function');
  await page.getByLabel('Name', {exact:true}).fill('Local synthetic operator');
  await page.getByLabel('Email *', {exact:true}).fill('private@example.invalid');
  await page.getByLabel('Current signing tool').selectOption('PandaDoc');
  await page.getByLabel('What would you like to change?').fill('Local fixture only: attach the signed agreement to its intended deal.');
  await page.getByRole('button', {name:'Request a workflow call', exact:true}).click();
  await page.getByText('Your workflow request has been received.', {exact:true}).waitFor();
  await page.waitForTimeout(900);
  const contractEvents = sent.slice(contractStart);
  assert.equal(contractEvents.filter(p => p.name === 'contract_form_start').length, 1);
  assert.equal(contractEvents.filter(p => p.name === 'contract_gateway_acknowledged').length, 1);
  assert(await page.evaluate(() => window.dataLayer.some(args => args[0] === 'event' && args[1] === 'contract_gateway_acknowledged')));
  assert(!JSON.stringify(contractEvents).includes('private@example.invalid'));
  assert(!JSON.stringify(contractEvents).includes('Local fixture only'));
  assert(!requests.slice(contractRequests).some(r => r.url.endsWith('/recorder.js')), 'Contract service page must not load replay');
  assert.equal(fixtureSubmissions, 3, 'Contract form must use exactly one additional local webhook fixture');
  console.log('PASS contract page scope, one form start/acknowledgement, GA4 parity, no form contents or replay');

  const excludedStart = requests.length;
  await page.goto(base + '/contactus/');
  await page.waitForTimeout(1000);
  assert.equal(requests.length, excludedStart, 'Excluded page contacted Umami');
  const iframe = await context.newPage();
  const frameStart = requests.length;
  await iframe.setContent(`<iframe src="${base}${pagePath}"></iframe>`);
  await page.waitForTimeout(1500);
  assert.equal(requests.length, frameStart, 'Dashboard-style iframe preview contaminated analytics');
  console.log('PASS page scope and iframe-preview exclusion');
  assert(!responses.some(r => r.status >= 400), 'Collector rejected a browser request: ' +
    JSON.stringify(responses.filter(r => r.status >= 400)));
  await context.close();
} catch (error) {
  console.error('FAIL Umami pilot acceptance:', error.message);
  console.error('Fix/retry: inspect the failed assertion and rebuild with the synthetic IDs.');
  console.error('Pause safely: leave PUBLIC_UMAMI_WEBSITE_ID unset in production.');
  console.error('Investigate: inspect collector CORS and script availability without exposing credentials.');
  process.exitCode = 1;
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
