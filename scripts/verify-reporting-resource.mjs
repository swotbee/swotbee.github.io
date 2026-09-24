#!/usr/bin/env node
/**
 * Verify the management reporting resource page, downloads, and GA4 payloads.
 *
 * Serves the current ./dist build, drives one local browser page, checks each
 * file over HTTP, and asserts one approved event per simulated activation.
 * Read-only and safe to rerun. Build with PUBLIC_GA4_ID first so window.gtag
 * and the event dataLayer are present.
 *
 * Usage: node scripts/verify-reporting-resource.mjs
 */

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const SCRIPT_DIR = resolve(fileURLToPath(new URL('.', import.meta.url)));
const DIST_DIR = resolve(SCRIPT_DIR, '..', 'dist');
const PORT = 4401;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const PAGE_PATH = '/resources/hubspot-management-reporting-starter-pack/';

const files = [
  ['complete_pack', 'hubspot-management-reporting-starter-pack.zip'],
  ['workbook', 'hubspot-management-reporting-starter-pack.xlsx'],
  ['board_deck', 'hubspot-management-reporting-board-deck.pptx'],
];

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.zip': 'application/zip',
  '.txt': 'text/plain; charset=utf-8',
};

function fail(message) {
  console.error(`[reporting-resource] FAIL: ${message}`);
  console.error('\nWhat next:');
  console.error('  1) Fix and retry');
  console.error('     why: the local build or its event contract does not match the approved specification');
  console.error('     how: PUBLIC_GA4_ID=G-TEST PUBLIC_CLARITY_ID=test pnpm build && pnpm check:reporting-resource');
  console.error('  2) Inspect the built page');
  console.error('     why: this distinguishes missing markup from a browser event issue');
  console.error(`     how: rg -n "resource_download|reporting_link_click" dist${PAGE_PATH}index.html`);
  console.error('  3) Inspect the source event handler');
  console.error('     why: use this when the page renders but a parameter is missing or duplicated');
  console.error('     how: rg -n "sendReportingEvent|data-resource-download" src/pages/resources/hubspot-management-reporting-starter-pack.astro');
  process.exitCode = 1;
}

function serveDist() {
  return new Promise((resolveServer, rejectServer) => {
    const server = createServer(async (request, response) => {
      try {
        let pathname = decodeURIComponent(new URL(request.url, ORIGIN).pathname);
        if (pathname.endsWith('/')) pathname += 'index.html';
        const filePath = resolve(DIST_DIR, `.${pathname}`);
        if (!filePath.startsWith(`${DIST_DIR}/`)) {
          response.writeHead(403).end('forbidden');
          return;
        }
        const body = await readFile(filePath);
        response.writeHead(200, { 'content-type': mime[extname(filePath)] || 'application/octet-stream' });
        response.end(body);
      } catch (error) {
        if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
          response.writeHead(404).end('not found');
          return;
        }
        response.writeHead(500).end('server error');
      }
    });
    server.once('error', rejectServer);
    server.listen(PORT, '127.0.0.1', () => resolveServer(server));
  });
}

async function readEvents(page) {
  return page.evaluate(() =>
    Array.from(window.dataLayer || [])
      .map((entry) => {
        try {
          return Array.from(entry);
        } catch {
          return [];
        }
      })
      .filter((entry) => entry[0] === 'event')
      .map((entry) => ({ name: entry[1], params: entry[2] || {} })),
  );
}

async function main() {
  await stat(join(DIST_DIR, 'index.html'));
  const server = await serveDist();
  const browser = await chromium.launch({ headless: true });

  try {
    for (const [, fileName] of files) {
      const response = await fetch(`${ORIGIN}/downloads/${fileName}`);
      const bytes = (await response.arrayBuffer()).byteLength;
      if (!response.ok || bytes < 1000) {
        fail(`${fileName} returned ${response.status} with ${bytes} bytes`);
        return;
      }
    }

    const page = await browser.newPage({ acceptDownloads: true });
    await page.goto(`${ORIGIN}${PAGE_PATH}`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      document.addEventListener('click', (event) => event.preventDefault(), true);
    });

    for (const [assetType] of files) {
      await page.locator(`[data-resource-download="${assetType}"]`).dispatchEvent('click');
    }
    await page.locator('[data-reporting-link]').first().dispatchEvent('click');

    const events = await readEvents(page);
    const views = events.filter((event) => event.name === 'resource_view');
    const downloads = events.filter((event) => event.name === 'resource_download');
    const links = events.filter((event) => event.name === 'reporting_link_click');

    if (views.length !== 1) {
      fail(`expected 1 resource_view event, found ${views.length}`);
      return;
    }
    if (downloads.length !== 3) {
      fail(`expected 3 resource_download events, found ${downloads.length}`);
      return;
    }
    if (links.length !== 1) {
      fail(`expected 1 reporting_link_click event, found ${links.length}`);
      return;
    }

    const expectedFile = new Map(files);
    for (const event of downloads) {
      const expected = expectedFile.get(event.params.asset_type);
      if (
        event.params.resource_id !== 'management_reporting_starter_pack' ||
        event.params.file_name !== expected ||
        event.params.source_page !== PAGE_PATH ||
        !['resource_hero', 'resource_file_card'].includes(event.params.cta_placement)
      ) {
        fail(`invalid resource_download payload: ${JSON.stringify(event.params)}`);
        return;
      }
    }

    if (
      views[0].params.resource_id !== 'management_reporting_starter_pack' ||
      views[0].params.source_page !== PAGE_PATH
    ) {
      fail(`invalid resource_view payload: ${JSON.stringify(views[0].params)}`);
      return;
    }

    if (
      links[0].params.destination_type !== 'pillar' ||
      links[0].params.destination_slug !== '/posts/hubspot-management-reporting/' ||
      links[0].params.source_page !== PAGE_PATH ||
      links[0].params.link_placement !== 'related'
    ) {
      fail(`invalid reporting_link_click payload: ${JSON.stringify(links[0].params)}`);
      return;
    }

    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto(`${ORIGIN}${PAGE_PATH}`, { waitUntil: 'domcontentloaded' });
    const mobileLayout = await mobilePage.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      primaryDownloadVisible: Boolean(
        document.querySelector('[data-resource-download="complete_pack"]')?.getBoundingClientRect().height,
      ),
    }));
    await mobilePage.close();
    if (mobileLayout.scrollWidth > mobileLayout.clientWidth || !mobileLayout.primaryDownloadVisible) {
      fail(`mobile layout overflow or hidden primary download: ${JSON.stringify(mobileLayout)}`);
      return;
    }

    console.log('[reporting-resource] PASS: page rendered and all three downloads returned non-empty files');
    console.log('[reporting-resource] PASS: 1 resource_view, 3 resource_download, and 1 reporting_link_click event');
    console.log('[reporting-resource] PASS: required low-cardinality parameters match the approved contract');
    console.log('[reporting-resource] PASS: 390px viewport has no horizontal overflow and shows the primary download');
  } finally {
    await browser.close();
    await new Promise((resolveClose) => server.close(resolveClose));
  }
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
