#!/usr/bin/env node
/** Local CM-04 engagement regression. Safe to rerun; no external request or form
 * submission is transmitted. Build with test IDs, then run
 * pnpm check:contract-companions [--port 4474] [--preconsent-trial].
 * Uses controlled browser media traces for boundaries and actual encoded playback
 * for a decoder/event smoke check. These are not production analytics receipts.
 */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { contractCompanions } from '../src/scripts/contract-companion-engagement.js';

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('Usage: pnpm check:contract-companions [--port 4474] [--preconsent-trial]\nBuild first with G-TEST and fake Clarity/Umami IDs. The optional trial flag must match the build.\nLocal only; mocks or blocks third parties. Failure: rebuild and retry, inspect the assertion, or run existing consent/blog checks separately to isolate the issue.');
  process.exit(0);
}
const preconsentTrial = process.argv.includes('--preconsent-trial');
const args = process.argv.slice(2).filter(arg => arg !== '--preconsent-trial');
assert(!args.length || (args.length === 2 && args[0] === '--port'), 'Use --help for supported options');
const port = Number(args[1] || 4474);
assert(Number.isInteger(port) && port > 1024 && port < 65536, 'Invalid port');
const origin = `http://127.0.0.1:${port}`;
const firstPath = `/posts/${contractCompanions[0].slug}/`;
let browser;
let server;
const results = [];
const eventNames = new Set(['video_start', 'video_progress', 'video_complete', 'resource_download']);
async function context(choice = 'granted') {
  const ctx = await browser.newContext({ acceptDownloads: true });
  await ctx.addInitScript(consent => {
    if (consent) localStorage.setItem('sb_consent', consent);
    window.__cm04Umami = [];
  }, choice);
  await ctx.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.origin === origin) {
      // serve-dist intentionally has no byte-range support. Give native playback
      // the same unchanged MP4 bytes with range headers, as a media host would.
      if (contractCompanions.some(asset => url.pathname === `/videos/customer-contracts/${asset.slug}.mp4`)) {
        const bytes = await readFile('dist' + url.pathname);
        const requested = route.request().headers().range;
        const match = requested && /^bytes=(\d+)-(\d*)$/.exec(requested);
        if (match) {
          const start=Number(match[1]);const end=match[2]?Math.min(Number(match[2]),bytes.length-1):bytes.length-1;
          if(start>end||start>=bytes.length)return route.fulfill({status:416,headers:{'Content-Range':`bytes */${bytes.length}`},body:''});
          return route.fulfill({status:206,contentType:'video/mp4',headers:{'Accept-Ranges':'bytes','Content-Range':`bytes ${start}-${end}/${bytes.length}`},body:bytes.subarray(start,end+1)});
        }
        return route.fulfill({status:200,contentType:'video/mp4',headers:{'Accept-Ranges':'bytes'},body:bytes});
      }
      return route.continue();
    }
    if (url.href === 'https://umami-test.invalid/script.js') {
      return route.fulfill({ contentType: 'application/javascript', body: `window.umami={track:(name,data)=>{if(name){const p=window.__sbUmamiBeforeSend('event',{name,data,url:location.href});if(p)window.__cm04Umami.push(p);}}};` });
    }
    return route.abort();
  });
  return ctx;
}
async function events(page) {
  return page.evaluate(() => ({
    ga: Array.from(window.dataLayer || []).filter(x => x[0] === 'event' && ['video_start','video_progress','video_complete','resource_download'].includes(x[1])).map(x => ({ name: x[1], data: x[2] })),
    umami: window.__cm04Umami.map(x => ({ name: x.name, data: x.data })),
  }));
}
async function model(page) {
  // The production handlers remain attached to the real rendered element. Only
  // its native timing inputs are controlled for reproducible seeks and replay.
  await page.evaluate(() => {
    const video = document.querySelector('video');
    let wall = performance.now();
    Object.defineProperty(performance, 'now', { configurable: true, value: () => wall });
    const state = { time: 0, duration: 4, paused: false, seeking: false, ended: false, rate: 1, played: [] };
    Object.defineProperties(video, {
      currentTime: { configurable: true, get: () => state.time },
      duration: { configurable: true, get: () => state.duration },
      paused: { configurable: true, get: () => state.paused },
      seeking: { configurable: true, get: () => state.seeking },
      ended: { configurable: true, get: () => state.ended },
      playbackRate: { configurable: true, get: () => state.rate },
      played: { configurable: true, get: () => ({ length: state.played.length, start: i => state.played[i][0], end: i => state.played[i][1] }) },
    });
    window.__cm04Step = ({ time, elapsed = 250, event = 'timeupdate', ...changes }) => {
      wall += elapsed;
      Object.assign(state, changes);
      if (time !== undefined) state.time = time;
      video.dispatchEvent(new Event(event));
    };
  });
}
async function step(page, state) { await page.evaluate(input => window.__cm04Step(input), state); }
async function playAll(page) {
  await step(page, { time: 0, ended: false, paused: false, played: [], event: 'playing' });
  for (let i = 1; i <= 16; i++) await step(page, { time: i / 4, played: [[0, i / 4]] });
  // Explicit pause-before-ended covers browser ordering differences.
  await step(page, { paused: true, event: 'pause' });
  await step(page, { ended: true, event: 'ended' });
}
function assertParity(payload) {
  assert.equal(payload.ga.length, payload.umami.length, 'Both local adapters receive each engagement event');
  for (let i = 0; i < payload.ga.length; i++) {
    assert.equal(payload.ga[i].name, payload.umami[i].name);
    const { transport_type, ...data } = payload.ga[i].data;
    assert.equal(transport_type, 'beacon');
    const { source_page, ...properties } = payload.umami[i].data;
    assert.equal(source_page, origin + data.source_page, 'Umami normalizes source paths to clean absolute URLs');
    assert.deepEqual({ ...properties, source_page: data.source_page }, data);
    assert(eventNames.has(payload.ga[i].name));
    assert(!JSON.stringify(data).includes('@'), 'No email in event properties');
    assert(!JSON.stringify(data).includes('?'), 'No queries in event properties');
    assert(Object.keys(data).every(k => ['video_id','percent','resource_id','file_name','file_type','source_page','placement','method'].includes(k)));
  }
}
try {
  const html = await readFile(`dist${firstPath}index.html`, 'utf8');
  assert(html.includes('G-TEST') && html.includes('umami-test.invalid'), 'Build with the documented test analytics IDs first');
  assert(html.includes(`const preconsentTrial = ${preconsentTrial};`), 'Build mode must match --preconsent-trial');
  server = spawn(process.execPath, ['scripts/serve-dist.mjs', '--port', String(port)], { stdio: ['ignore', 'pipe', 'pipe'] });
  await Promise.race([once(server.stdout, 'data'), once(server, 'exit').then(([code]) => { throw new Error(`Preview exited ${code}; choose a free --port and retry`); })]);
  browser = await chromium.launch({ headless: true });

  for (const asset of contractCompanions) {
    const ctx = await context();
    const page = await ctx.newPage();
    await page.goto(`${origin}/posts/${asset.slug}/?private=never-send%40example.com`);
    await model(page);
    await playAll(page);
    assert(await page.evaluate(() => !document.querySelector('script[src$="/recorder.js"]')), 'Companion pages never load recordings');
    assert(await page.evaluate(() => window.__cm04Umami.every(event => !event.url.includes('private='))), 'Umami page URLs strip private queries');
    let payload = await events(page);
    assertParity(payload);
    assert.deepEqual(payload.ga.map(x => x.name), ['video_start','video_progress','video_progress','video_progress','video_complete']);
    assert.deepEqual(payload.ga.filter(x => x.name === 'video_progress').map(x => x.data.percent), [25,50,75]);
    assert.equal(payload.ga[4].data.percent, 100);
    assert(payload.ga.every(x => x.data.video_id === asset.id));
    await playAll(page);
    await step(page, { event: 'ended' });
    assert.equal((await events(page)).ga.length, 5, 'Replay and repeated end events do not duplicate milestones');
    results.push(`${asset.id}: full coverage, pause-before-end, replay deduplication and adapter parity`);
    await ctx.close();
  }
  // Seek to the end, then replay an already observed section. CurrentTime and
  // native played alone cannot substitute for continuous foreground observation.
  {
    const ctx = await context(); const page = await ctx.newPage();
    await page.goto(origin + firstPath); await model(page);
    await step(page, { event: 'playing' });
    await step(page, { time: 0.25, played: [[0,0.25]] });
    await step(page, { seeking: true, event: 'seeking' });
    await step(page, { time: 3.75, seeking: false, played: [[0,0.25]], event: 'seeked' });
    await step(page, { time: 4, ended: true, paused: true, played: [[0,0.25]], event: 'ended' });
    assert.deepEqual((await events(page)).ga.map(x => x.name), ['video_start'], 'Seeking to the end does not complete');
    await step(page, { time: 0, ended: false, paused: false, event: 'playing' });
    await step(page, { time: 0.25, played: [[0,0.25]] });
    assert.equal((await events(page)).ga.length,1,'Replaying an observed range adds no coverage');
    // A hidden tab must not accrue coverage even with frequent timing updates.
    await page.evaluate(()=>Object.defineProperty(document,'visibilityState',{configurable:true,value:'hidden'}));
    await step(page,{time:0.5,played:[[0,0.5]]});
    assert.equal((await events(page)).ga.length,1);
    await page.evaluate(()=>Object.defineProperty(document,'visibilityState',{configurable:true,value:'visible'}));
    await step(page,{time:0.75,played:[[0,0.75]]});
    // A long stalled/hidden scheduling gap also contributes no coverage.
    await step(page, { time: 3.75, elapsed: 4000, played: [[0,3.75]] });
    assert.equal((await events(page)).ga.length,1);
    await ctx.close(); results.push('Seek/replay overlap and long scheduling gaps cannot invent progress');
  }
  for (const consent of [null, 'denied']) {
    const ctx = await context(consent); const page = await ctx.newPage();
    await page.goto(origin + firstPath); await model(page); await playAll(page);
    assert.equal(await page.locator('script[src="https://umami-test.invalid/script.js"]').count(), 0, 'Companion routes require consent even during the pilot trial');
    const download = page.waitForEvent('download');
    await page.locator(`a[href="/templates/${contractCompanions[0].workbook}"]`).click(); await download;
    assert.deepEqual(await events(page), { ga: [], umami: [] });
    // Granting later does not backfill denied playback. Only new playback counts.
    await page.evaluate(() => { localStorage.setItem('sb_consent','granted'); window.__sbUmamiSetConsent(true); });
    await step(page, { event: 'timeupdate' });
    assert.equal((await events(page)).ga.length,0);
    await playAll(page);
    assert.equal((await events(page)).ga.length,5,'Consented replay of denied footage can count as new observed coverage');
    await ctx.close(); results.push(`${consent || 'undecided'}: zero engagement, working download, no consent backfill, consented replay works`);
  }
  {
    const ctx=await context('denied');const page=await ctx.newPage();
    await page.goto(origin+'/resources/contract-tracker-template/');
    assert.equal(await page.locator('script[src="https://umami-test.invalid/script.js"]').count(),preconsentTrial?1:0,'Existing pilot route keeps its configured trial behavior');
    await ctx.close();results.push('Existing pilot scope retains its selected consent/trial behavior');
  }
  // Stop credit immediately when consent is withdrawn in another tab, even before
  // the normal same-tab reload. Restore only from the next continuous interval.
  {
    const ctx = await context(); const page = await ctx.newPage();
    await page.goto(origin + firstPath); await model(page);
    await step(page,{event:'playing'});await step(page,{time:0.25,played:[[0,0.25]]});
    await page.evaluate(()=>{localStorage.setItem('sb_consent','denied');window.dispatchEvent(new StorageEvent('storage',{key:'sb_consent',newValue:'denied'}));});
    await playAll(page);assert.equal((await events(page)).ga.length,1);
    await ctx.close();results.push('Withdrawal stops new coverage and events');
  }
  {
    const ctx = await context(); const page = await ctx.newPage();
    await page.goto(origin + firstPath + '?sb_analytics_test=1');await model(page);await playAll(page);
    assert.deepEqual(await events(page),{ga:[],umami:[]});
    await ctx.close();results.push('QA exclusion suppresses all new engagement');
  }
  // The download handler never prevents browser navigation, including when a
  // collector is blocked or throws. One click listener means pointer and keyboard
  // each produce one event; intentional retries are counted as separate actions.
  {
    const ctx = await context(); const page = await ctx.newPage();await page.goto(origin+'/resources/');
    const workbook=page.locator('#contract-guides a[download]').first();
    for(const method of ['pointer','keyboard','pointer']) {
      const pending=page.waitForEvent('download');
      if(method==='keyboard'){await workbook.focus();await page.keyboard.press('Enter');}else await workbook.click();
      assert.equal((await pending).suggestedFilename(),contractCompanions[0].workbook);
    }
    const payload=await events(page);assertParity(payload);assert.equal(payload.ga.length,3);
    assert.deepEqual(payload.ga.map(x=>x.data.method),['pointer','keyboard','pointer']);
    assert(payload.ga.every(x=>x.data.placement==='resources_companions'));
    for(const asset of contractCompanions){
      for(const file of [asset.workbook,asset.pdf]){
        // Separate tabs avoid Chromium's rapid successive-download throttle.
        const downloadPage=await ctx.newPage();await downloadPage.goto(origin+'/resources/');
        const link=downloadPage.locator(`#contract-guides a[href="/templates/${file}"]`);
        const pending=downloadPage.waitForEvent('download');await link.click();assert.equal((await pending).suggestedFilename(),file);
        const downloaded=await events(downloadPage);assertParity(downloaded);assert.equal(downloaded.ga.length,1);
        await downloadPage.close();
      }
    }
    assert.equal((await events(page)).ga.length,3,'Separate tabs preserve this document activation count');
    // Reloading the module under a fresh URL must not bind a second listener.
    const scripts=await page.locator('script[src]').evaluateAll(nodes=>nodes.map(x=>x.src));
    for(const url of scripts){
      if(new URL(url).origin!==origin)continue;
      const body=await (await ctx.request.get(url)).text();
      if(body.includes('__sbContractEngagementBound'))await page.addScriptTag({type:'module',url:url+'?repeat=1'});
    }
    let pending=page.waitForEvent('download');await workbook.click();await pending;
    assert.equal((await events(page)).ga.length,4,'Reinitializing must not duplicate one click');
    await page.evaluate(()=>window.__sbTrack=()=>{throw new Error('mock blocked tracker');});
    pending=page.waitForEvent('download');await workbook.click();await pending;
    assert.equal((await events(page)).ga.length,4,'Tracker failure never blocks the download');
    await ctx.close();results.push('All eight downloads, mouse/keyboard, intentional retries, duplicate initialization and blocked tracker');
  }
  // Real encoded MP4 playback: not a synthetic dispatch. Start must follow actual
  // observed playback; seeking near the end cannot generate completion.
  {
    const ctx=await context();const page=await ctx.newPage();await page.goto(origin+firstPath);
    await page.evaluate(async()=>{const video=document.querySelector('video');video.muted=true;video.playbackRate=2;await video.play();});
    await page.waitForFunction(()=>Array.from(window.dataLayer||[]).some(x=>x[0]==='event'&&x[1]==='video_start'),{},{timeout:15000});
    await page.waitForFunction(()=>{const video=document.querySelector('video');return video.seekable.length&&video.seekable.end(video.seekable.length-1)>video.duration-1;},{},{timeout:15000});
    await page.evaluate(()=>{const video=document.querySelector('video');video.currentTime=video.duration-0.2;});
    await page.waitForFunction(()=>document.querySelector('video').ended,{},{timeout:10000});
    const payload=await events(page);assertParity(payload);assert.equal(payload.ga.filter(x=>x.name==='video_start').length,1);assert(!payload.ga.some(x=>x.name==='video_complete'));
    assert(await page.evaluate(()=>document.querySelector('video').played.length>0));
    await ctx.close();results.push('Actual published MP4 decodes, starts once, and seek-to-end does not complete');
  }
  console.log(JSON.stringify({passed:true,checks:results,externalRequestsTransmitted:0,productionReceiptVerified:false},null,2));
} catch (error) {
  console.error(error);
  console.error('Next steps: 1) Rebuild with test IDs/path scope and retry. 2) Run consent/blog checks separately to isolate shared behavior. 3) Inspect the failing assertion and local rendered page; never bypass the check for publication.');
  process.exitCode=1;
} finally { if(browser)await browser.close();if(server)server.kill('SIGTERM'); }
