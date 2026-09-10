#!/usr/bin/env node
/**
 * Validate rendered blog social and technical SEO metadata.
 *
 * This runs after Astro and exits non-zero when a rendered article has missing,
 * duplicate, malformed, non-raster, or non-resolvable social metadata.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, 'dist');
const POSTS_DIR = path.join(DIST_DIR, 'posts');
const SITE_ORIGIN = 'https://swotbee.com';

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(entryPath));
    } else if (entry.isFile() && entry.name === 'index.html') {
      files.push(entryPath);
    }
  }

  return files;
}

function decodeHtml(value) {
  return value.replaceAll('&amp;', '&').replaceAll('&quot;', '"');
}

function parseAttributes(tag) {
  const attributes = {};
  for (const match of tag.matchAll(/([\w:-]+)="([^"]*)"/g)) {
    attributes[match[1]] = decodeHtml(match[2]);
  }
  return attributes;
}

function collectMetadata(html) {
  const values = new Map();
  const tags = html.match(/<(?:meta|link)\b[^>]*>/g) || [];

  for (const tag of tags) {
    const attributes = parseAttributes(tag);
    const key = attributes.property
      || attributes.name
      || (attributes.rel === 'canonical' ? 'canonical' : undefined);
    const value = attributes.content || attributes.href;
    if (!key || value === undefined) continue;

    const existing = values.get(key) || [];
    existing.push(value);
    values.set(key, existing);
  }

  return values;
}

function requireOne(metadata, key, relativePath, errors) {
  const values = metadata.get(key) || [];
  if (values.length !== 1) {
    errors.push(`${relativePath}: expected one ${key}, found ${values.length}`);
    return undefined;
  }
  return values[0];
}

async function validateArticle(filePath, errors) {
  const relativePath = path.relative(DIST_DIR, filePath);
  const html = await fs.readFile(filePath, 'utf8');

  if (!/<html(?:\s|>)/i.test(html)) {
    if (/http-equiv="refresh"/i.test(html)) return false;
    errors.push(`${relativePath}: rendered output has no html element`);
    return false;
  }

  const metadata = collectMetadata(html);
  const requiredKeys = [
    'description',
    'canonical',
    'og:title',
    'og:description',
    'og:image',
    'og:url',
    'og:type',
    'twitter:card',
    'twitter:title',
    'twitter:description',
    'twitter:image',
    'article:published_time',
  ];
  const required = Object.fromEntries(
    requiredKeys.map((key) => [key, requireOne(metadata, key, relativePath, errors)]),
  );

  if (required['og:type'] && required['og:type'] !== 'article') {
    errors.push(`${relativePath}: og:type must be article, found ${required['og:type']}`);
  }

  for (const key of ['canonical', 'og:image', 'og:url', 'twitter:image']) {
    const value = required[key];
    if (value && !/^https:\/\//.test(value)) {
      errors.push(`${relativePath}: ${key} must be an absolute HTTPS URL, found ${value}`);
    }
    if (value?.includes(`${SITE_ORIGIN}http`)) {
      errors.push(`${relativePath}: ${key} contains a duplicated origin, found ${value}`);
    }
  }

  for (const key of ['og:image', 'twitter:image']) {
    const value = required[key];
    if (!value || !value.startsWith(`${SITE_ORIGIN}/`)) continue;

    const pathname = new URL(value).pathname;
    if (!/\.(?:png|jpe?g|webp)$/i.test(pathname)) {
      errors.push(`${relativePath}: ${key} local image must be PNG, JPEG, or WebP, found ${pathname}`);
      continue;
    }

    const imagePath = path.join(DIST_DIR, pathname.slice(1));
    try {
      await fs.access(imagePath);
    } catch {
      errors.push(`${relativePath}: ${key} file is missing from dist: ${pathname}`);
    }
  }

  if (required['og:image'] && required['twitter:image']
      && required['og:image'] !== required['twitter:image']) {
    errors.push(`${relativePath}: og:image and twitter:image must match`);
  }

  return true;
}

async function run() {
  const articleFiles = await walk(POSTS_DIR);
  const errors = [];
  let checked = 0;

  for (const filePath of articleFiles) {
    if (await validateArticle(filePath, errors)) checked += 1;
  }

  if (errors.length > 0) {
    console.error(`[social-meta] failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`  - ${error}`);
    process.exit(1);
  }

  console.log(`[social-meta] checked=${checked} errors=0`);
}

run().catch((error) => {
  console.error(`[social-meta] ${error.message}`);
  process.exit(1);
});
