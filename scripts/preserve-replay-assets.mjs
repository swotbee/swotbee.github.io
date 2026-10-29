#!/usr/bin/env node
/** Preserve immutable CSS/fonts/images needed by historical analytics playback.
 * Usage: node scripts/preserve-replay-assets.mjs [--apply] [--offline] [--dist DIR]
 * Default is dry-run. CI uses --apply after build, before uploading Pages.
 * Existing hashed files must match their manifest hashes. Failures stop deployment.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ORIGIN = 'https://swotbee.com';
const MANIFEST = 'analytics-replay-assets.json';
const RETENTION_DAYS = 300;
const MAX_BYTES = 64 * 1024 * 1024;
const FILE_PATTERN = /^\/_astro\/[A-Za-z0-9_.-]+\.(css|woff2?|ttf|otf|png|jpe?g|webp|avif|svg)$/;
const digest = data => createHash('sha256').update(data).digest('hex');

export function validateManifest(value) {
  if (value?.version !== 1 || !Array.isArray(value.assets) || value.assets.length > 5000) {
    throw new Error('Unexpected replay asset manifest; deployment stopped');
  }
  const seen = new Set();
  for (const asset of value.assets) {
    if (!FILE_PATTERN.test(asset.path) || !/^[a-f0-9]{64}$/.test(asset.sha256)
        || !Number.isFinite(Date.parse(asset.lastBuilt)) || seen.has(asset.path)) {
      throw new Error('Unsafe or duplicate replay asset entry; deployment stopped');
    }
    seen.add(asset.path);
  }
  return value.assets;
}

export function retainedAssets(assets, now = Date.now()) {
  return assets.filter(asset => now - Date.parse(asset.lastBuilt) <= RETENTION_DAYS * 86400000);
}

export function cssDependencies(css) {
  return [...new Set([...css.matchAll(/\/_astro\/[A-Za-z0-9_.-]+\.(?:css|woff2?|ttf|otf|png|jpe?g|webp|avif|svg)/g)]
    .map(match => match[0]).filter(path => FILE_PATTERN.test(path)))];
}

async function download(path, allowMissing = false) {
  const response = await fetch(ORIGIN + path, { signal: AbortSignal.timeout(20000), redirect: 'error' });
  if (allowMissing && response.status === 404) return null;
  if (!response.ok) throw new Error(`Could not preserve ${path}: HTTP ${response.status}`);
  const data = Buffer.from(await response.arrayBuffer());
  if (data.length > 8 * 1024 * 1024) throw new Error(`Replay asset is unexpectedly large: ${path}`);
  if (path.endsWith('.css') && !response.headers.get('content-type')?.includes('text/css')) {
    throw new Error(`Expected CSS content type for ${path}`);
  }
  return data;
}

export async function preserve({ dist, apply = false, offline = false }) {
  const now = new Date().toISOString();
  const files = new Map();
  for (const name of await readdir(join(dist, '_astro'))) {
    const path = '/_astro/' + name;
    if (FILE_PATTERN.test(path)) {
      const data = await readFile(join(dist, path));
      files.set(path, { data, lastBuilt: now });
    }
  }
  const built = new Set(files.keys());
  if (!offline) {
    const previous = await download('/' + MANIFEST, true);
    if (previous) {
      for (const asset of retainedAssets(validateManifest(JSON.parse(previous.toString())))) {
        const existing = files.get(asset.path);
        const data = existing?.data ?? await download(asset.path);
        if (digest(data) !== asset.sha256) throw new Error(`Immutable asset changed: ${asset.path}`);
        if (!existing) files.set(asset.path, { data, lastBuilt: asset.lastBuilt });
      }
    } else {
      console.log('Bootstrap: preserve current live homepage CSS and its local dependencies.');
      const homepage = (await download('/')).toString();
      const queue = [...homepage.matchAll(/href=["'](\/_astro\/[^"']+\.css)["']/g)].map(match => match[1]);
      if (!queue.length) throw new Error('Could not find current live homepage CSS for bootstrap');
      const seen = new Set();
      while (queue.length) {
        const path = queue.shift();
        if (seen.has(path)) continue;
        seen.add(path);
        if (!FILE_PATTERN.test(path)) throw new Error('Unexpected bootstrap asset path');
        const data = await download(path);
        const existing = files.get(path);
        if (existing && digest(existing.data) !== digest(data)) throw new Error(`Immutable asset changed: ${path}`);
        if (!existing) files.set(path, { data, lastBuilt: now });
        if (path.endsWith('.css')) queue.push(...cssDependencies(data.toString()));
      }
    }
  }
  const total = [...files.values()].reduce((sum, entry) => sum + entry.data.length, 0);
  if (total > MAX_BYTES) throw new Error('Replay archive exceeds 64 MiB; inspect before deploying');
  const assets = [...files].sort(([a], [b]) => a.localeCompare(b)).map(([path, entry]) => ({
    path, sha256: digest(entry.data), lastBuilt: entry.lastBuilt,
  }));
  if (apply) {
    await mkdir(join(dist, '_astro'), { recursive: true });
    for (const [path, entry] of files) {
      if (!built.has(path)) await writeFile(join(dist, path), entry.data, { flag: 'wx' });
    }
    await writeFile(join(dist, MANIFEST), JSON.stringify({ version: 1, generatedAt: now,
      retentionDays: RETENTION_DAYS, assets }, null, 2) + '\n');
  }
  console.log(`SUMMARY: ${apply ? 'preserved' : 'would preserve'} ${assets.length} replay assets (${total} bytes); offline=${offline}`);
  return assets;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    console.log('Usage: node scripts/preserve-replay-assets.mjs [--apply|--dry-run] [--offline] [--dist DIR]');
    console.log('Example: node scripts/preserve-replay-assets.mjs --apply --offline --dist dist');
    return;
  }
  let dist = 'dist';
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--dist' && args[i + 1]) dist = args[++i];
    else if (!['--apply', '--dry-run', '--offline'].includes(args[i])) throw new Error('Unknown argument: ' + args[i]);
  }
  if (args.includes('--apply') && args.includes('--dry-run')) throw new Error('Choose --apply or --dry-run');
  await preserve({ dist: resolve(dist), apply: args.includes('--apply'), offline: args.includes('--offline') });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    console.error('FAIL replay asset preservation:', error.message);
    console.error('1. Fix/retry: check public asset availability and rerun the same command.');
    console.error('2. Pause safely: do not deploy the incomplete Pages artifact.');
    console.error('3. Debug: inspect the manifest and named asset; never replace an old hash with new CSS.');
    process.exitCode = 1;
  });
}
