#!/usr/bin/env node
/** Notify IndexNow only after an explicit --submit, with live verification. */
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const root = fileURLToPath(new URL('../', import.meta.url));
const host = 'swotbee.com';
const keyLocation = `https://${host}/indexnow-verification.txt`;
const endpoint = 'https://api.indexnow.org/indexnow';
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log('Usage: node scripts/notify-indexnow.mjs --urls FILE [--dry-run | --submit --receipt FILE]');
  console.log('FILE: newline URLs or JSON array of URL strings / objects with a url field.');
  console.log('Default is dry-run. Preflight checks live URLs without submitting.');
  process.exit(0);
}
function parse() {
  const options = { submit: false, urls: undefined, receipt: undefined };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--urls' || arg === '--receipt') {
      const value = args[++i];
      if (!value || value.startsWith('--')) throw new Error(`Missing value for ${arg}`);
      options[arg.slice(2)] = value;
    } else if (arg === '--submit') options.submit = true;
    else if (arg !== '--dry-run') throw new Error(`Unknown argument ${arg}`);
  }
  if (!options.urls) throw new Error('--urls FILE is required');
  if (args.includes('--submit') && args.includes('--dry-run')) throw new Error('Choose either --submit or --dry-run');
  if (options.submit && !options.receipt) throw new Error('--submit requires --receipt FILE');
  return options;
}
async function get(url) {
  return fetch(url, { redirect: 'error', signal: AbortSignal.timeout(30000) });
}
async function main() {
  const options = parse();
  if (options.submit && existsSync(options.receipt)) throw new Error('Receipt already exists. Inspect it before retrying; choose a new receipt only for a new authorized release.');
  const key = (await readFile(`${root}public/indexnow-verification.txt`, 'utf8')).trim();
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error('Invalid public verification file');
  const input = (await readFile(options.urls, 'utf8')).trim();
  const records = input.startsWith('[') ? JSON.parse(input) : input.split(/\r?\n/);
  if (!Array.isArray(records)) throw new Error('URL input must be an array or newline list');
  const urlList = [...new Set(records.map(item => typeof item === 'string' ? item : item.url))];
  if (!urlList.length || urlList.length > 1000) throw new Error('Provide between 1 and 1000 changed public URLs');
  for (const value of urlList) {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.hostname !== host || url.port || url.username || url.password || url.search || url.hash || !url.pathname.endsWith('/')) throw new Error(`Invalid canonical SwotBee URL: ${value}`);
  }
  for (const url of urlList) {
    const response = await get(url);
    if (response.status !== 200) throw new Error(`Preflight HTTP ${response.status}: ${url}`);
    const html = await response.text();
    if (!response.headers.get('content-type')?.includes('text/html')) throw new Error(`Not an HTML page: ${url}`);
    const robotTags = html.match(/<meta\b[^>]*name=["']robots["'][^>]*>/gi) ?? [];
    if (/noindex/i.test(response.headers.get('x-robots-tag') ?? '') || robotTags.some(tag => /noindex/i.test(tag))) throw new Error(`Noindex page: ${url}`);
    const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1];
    if (canonical !== url) throw new Error(`Canonical differs or is absent: ${url}`);
  }
  console.log(`Preflight passed for ${urlList.length} distinct live canonical URLs.`);
  if (!options.submit) {
    console.log('Dry-run: no notification sent. Deploy the public verification file before an authorized --submit.');
    return;
  }
  const verification = await get(keyLocation);
  if (verification.status !== 200 || (await verification.text()).trim() !== key) throw new Error('Live public verification file does not match this checkout. Do not submit before deployment.');
  const payload = JSON.stringify({ host, key, keyLocation, urlList });
  const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: payload, signal: AbortSignal.timeout(30000) });
  const receipt = { at: new Date().toISOString(), endpoint, keyLocation, urlList, payloadSha256: createHash('sha256').update(payload).digest('hex'), httpStatus: response.status, accepted: [200,202].includes(response.status), indexingConfirmed: false };
  await writeFile(options.receipt, JSON.stringify(receipt, null, 2)+'\n', { flag: 'wx' });
  if (!receipt.accepted) throw new Error(`IndexNow HTTP ${response.status}; inspect the receipt. Do not retry automatically.`);
  console.log(`IndexNow accepted notification (${response.status}); indexing and rankings are not confirmed.`);
}
main().catch(error => {
  console.error(error.message);
  console.error('Next steps: fix the input or live prerequisite and retry dry-run; inspect an existing receipt before a retry; or leave notification pending and use Bing Webmaster Tools.');
  process.exitCode = 1;
});
