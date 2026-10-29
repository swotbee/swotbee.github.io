import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, writeFile, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { validateManifest, retainedAssets, cssDependencies, preserve } from './preserve-replay-assets.mjs';

test('rejects untrusted paths, duplicate entries and malformed hashes', () => {
  const asset = { path: '/_astro/site.ABC.css', sha256: 'a'.repeat(64), lastBuilt: '2026-10-29T00:00:00Z' };
  assert.equal(validateManifest({ version: 1, assets: [asset] }).length, 1);
  for (const assets of [[{ ...asset, path: '/../../secret.css' }], [{ ...asset, path: '/_astro/app.js' }],
    [{ ...asset, sha256: 'bad' }], [asset, asset]]) {
    assert.throws(() => validateManifest({ version: 1, assets }));
  }
});

test('expires only old archived entries and finds same-origin CSS dependencies', () => {
  const now = Date.parse('2026-10-29T00:00:00Z');
  assert.equal(retainedAssets([{ lastBuilt: '2026-10-28T00:00:00Z' }, { lastBuilt: '2025-01-01T00:00:00Z' }], now).length, 1);
  assert.deepEqual(cssDependencies('url(/_astro/font.ABC.woff2) url(data:abc) url(/_astro/font.ABC.woff2)'), ['/_astro/font.ABC.woff2']);
});

test('dry-run leaves output untouched; apply creates a bounded reproducible manifest', async () => {
  const dist = await mkdtemp(join(tmpdir(), 'replay-assets-test-'));
  await mkdir(join(dist, '_astro'));
  await writeFile(join(dist, '_astro/site.ABC.css'), 'body{color:black}');
  await writeFile(join(dist, '_astro/app.ABC.js'), 'private implementation');
  const first = await preserve({ dist, offline: true });
  assert.equal(first.length, 1);
  await assert.rejects(readFile(join(dist, 'analytics-replay-assets.json')));
  await preserve({ dist, apply: true, offline: true });
  const manifest = JSON.parse(await readFile(join(dist, 'analytics-replay-assets.json')));
  assert.equal(validateManifest(manifest).length, 1);
  assert.equal(manifest.retentionDays, 300);
});

test('retains an older deployment asset and refuses a changed immutable response before writing', async () => {
  const dist = await mkdtemp(join(tmpdir(), 'replay-assets-network-test-'));
  await mkdir(join(dist, '_astro'));
  await writeFile(join(dist, '_astro/current.NEW.css'), 'body{color:black}');
  const css = 'body{color:blue}';
  const asset = { path: '/_astro/previous.OLD.css',
    sha256: createHash('sha256').update(css).digest('hex'), lastBuilt: new Date().toISOString() };
  const originalFetch = globalThis.fetch;
  let corrupt = true;
  globalThis.fetch = async url => String(url).endsWith('.json')
    ? new Response(JSON.stringify({ version: 1, assets: [asset] }))
    : new Response(corrupt ? 'incorrect styles' : css, { headers: { 'content-type': 'text/css' } });
  try {
    await assert.rejects(preserve({ dist, apply: true }), /Immutable asset changed/);
    await assert.rejects(readFile(join(dist, '_astro/previous.OLD.css')));
    corrupt = false;
    await preserve({ dist, apply: true });
    assert.equal(await readFile(join(dist, '_astro/previous.OLD.css'), 'utf8'), css);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
