#!/usr/bin/env node
/** Local contract form regression: all external traffic is mocked or blocked.
 * Safe to rerun; creates no lead. Build first, then run with --port 4464.
 */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { chromium } from 'playwright';

if (process.argv.includes('--help')) {
  console.log('Usage: node scripts/verify-contract-workflow.mjs [--port 4464]\nBuild first. Uses localhost only and mocks all form submissions.');
  process.exit(0);
}
const args = process.argv.slice(2);
assert(!args.length || (args.length === 2 && args[0] === '--port'), 'Use --help for supported options');
const port = Number(args[1] || 4464);
assert(Number.isInteger(port) && port > 1024 && port < 65536, 'Invalid port');
const origin = `http://127.0.0.1:${port}`;
const routePath = '/services/hubspot-contract-management/';
let server;
let browser;
let posts = [];
let status = 500;
try {
  server = spawn(process.execPath, ['scripts/serve-dist.mjs', '--port', String(port)], { stdio: ['ignore', 'pipe', 'pipe'] });
  await Promise.race([once(server.stdout, 'data'), once(server, 'error').then(([error]) => { throw error; })]);
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  await context.route('**/*', async route => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.origin === origin) return route.continue();
    if (url.hostname === 'www.google.com' && url.pathname === '/recaptcha/api.js') {
      return route.fulfill({ contentType: 'application/javascript', body: 'window.grecaptcha={ready:fn=>fn(),execute:()=>Promise.resolve("LOCAL_MOCK_ONLY")};' });
    }
    if (url.hostname === 'auto.zippylens.com' && url.pathname === '/webhook/swotbee-form-submit') {
      posts.push(request.postDataJSON());
      return route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(status === 200 ? { ok: true } : { ok: false }), headers: { 'Access-Control-Allow-Origin': '*' } });
    }
    return route.abort();
  });
  const page = await context.newPage();
  await page.goto(origin + routePath + '?utm_source=google&utm_medium=cpc&utm_campaign=contract_test&utm_content=setup');
  assert.equal(await page.locator('#contact-form').getAttribute('data-preview'), null);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://swotbee.com' + routePath);
  assert(!(await page.locator('meta[name="robots"]').getAttribute('content')).includes('noindex'));
  const requiredLabels = await page.locator('#contact-form :required').evaluateAll(inputs =>
    inputs.map(input => input.labels[0].textContent.trim()));
  assert.equal(requiredLabels.length, 4);
  assert(requiredLabels.every(label => label.endsWith('*')), 'Every required field has a visible marker');
  const submit = page.getByRole('button', { name: 'Request a workflow call', exact: true });
  await submit.click();
  assert.match(await page.locator('#cf-status').innerText(), /valid email/);
  await page.getByLabel('Name *', { exact: true }).fill('Local QA');
  await page.getByLabel('Email *', { exact: true }).fill('sample@example.com');
  await submit.click();
  assert.match(await page.locator('#cf-status').innerText(), /signing tool/);
  assert.equal(posts.length, 0);
  await page.getByLabel('Current signing tool').selectOption('PandaDoc');
  await page.getByLabel('What would you like to change?').fill('Keep the signed agreement on the correct deal.');
  await submit.click();
  await page.getByText('Something went wrong sending that.', { exact: false }).waitFor();
  assert.equal(await page.getByLabel('Name *', { exact: true }).inputValue(), 'Local QA');
  assert(await submit.isEnabled());
  assert.equal(posts.length, 1);
  status = 200;
  await submit.click();
  await page.getByText('Your workflow request has been received.', { exact: true }).waitFor();
  assert.equal(posts.length, 2, 'One failed request and one intentional retry');
  const payload = posts[1];
  const fields = Object.fromEntries(payload.fields.map(field => [field.name, field.value]));
  assert.equal(payload.recaptchaToken, 'LOCAL_MOCK_ONLY');
  assert.equal(payload.expectedAction, 'contact_form');
  assert.match(fields.message, /^\[Contract workflow inquiry\]\nSigning tool: PandaDoc\nRequested change:/);
  assert.equal(fields.utm_campaign, 'contract_test');
  assert.equal(fields.sb_landing_page, routePath);
  assert(!(await page.locator('#cf-success').innerText()).includes('Renewal Alignment'));
  assert.match(await page.locator('#cf-success').innerText(), /call has not been booked/);
  assert.equal(await page.evaluate(() => document.activeElement.id), 'cf-success');
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}`);
  }
  const events = await page.evaluate(() => Array.from(window.dataLayer || []).filter(entry => entry[0] === 'event').map(entry => entry[1]));
  assert(!events.includes('generate_lead'), 'Gateway acknowledgement must not become an unverified primary conversion');
  console.log(JSON.stringify({ passed: true, liveModeMarkup: true, requiredFields: true, failurePreservesInput: true, retry: true, mockedPayloadAndAttribution: true, scopedConfirmation: true, responsiveWidths: [320, 390, 768, 1440], externalRequestsTransmitted: 0 }));
} finally {
  if (browser) await browser.close();
  if (server) server.kill('SIGTERM');
}
