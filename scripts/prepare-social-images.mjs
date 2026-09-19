#!/usr/bin/env node
/**
 * Generate raster social-card derivatives for local SVG blog hero images.
 *
 * The script is idempotent and runs before every Astro build. Source SVGs stay
 * in place for article rendering; generated 1200 x 630 PNG files are ignored by
 * Git and copied into the static build for social crawlers.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, 'src/pages/posts');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SOCIAL_WIDTH = 1200;
const SOCIAL_HEIGHT = 630;

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '_prompts') {
        files.push(...await walk(entryPath));
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(entryPath);
    }
  }

  return files;
}

function extractFrontmatterImage(markdown) {
  const frontmatter = markdown.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!frontmatter) return undefined;

  return frontmatter[1].match(/^image:\s*["']([^"']+)["']\s*$/m)?.[1];
}

function socialPathFor(imagePath) {
  return imagePath.replace(/\.svg$/i, '.social.png');
}

async function isCurrent(sourcePath, outputPath) {
  try {
    const [sourceStat, outputStat, metadata] = await Promise.all([
      fs.stat(sourcePath),
      fs.stat(outputPath),
      sharp(outputPath).metadata(),
    ]);
    return outputStat.mtimeMs >= sourceStat.mtimeMs
      && metadata.width === SOCIAL_WIDTH
      && metadata.height === SOCIAL_HEIGHT;
  } catch {
    return false;
  }
}

async function run() {
  const markdownFiles = await walk(POSTS_DIR);
  let generated = 0;
  let reused = 0;

  for (const markdownPath of markdownFiles) {
    const markdown = await fs.readFile(markdownPath, 'utf8');
    const imagePath = extractFrontmatterImage(markdown);
    if (!imagePath || !/\.svg$/i.test(imagePath)) continue;

    if (!imagePath.startsWith('/')) {
      throw new Error(`SVG social image must be site-relative: ${imagePath}`);
    }

    const sourcePath = path.join(PUBLIC_DIR, imagePath.slice(1));
    const outputPath = path.join(PUBLIC_DIR, socialPathFor(imagePath).slice(1));

    await fs.access(sourcePath);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    if (await isCurrent(sourcePath, outputPath)) {
      reused += 1;
      continue;
    }

    await sharp(sourcePath, { density: 144 })
      .resize(SOCIAL_WIDTH, SOCIAL_HEIGHT, {
        fit: 'contain',
        background: '#f7f5f1',
      })
      .png({ compressionLevel: 9 })
      .toFile(outputPath);
    generated += 1;
  }

  console.log(`[social-images] generated=${generated} reused=${reused}`);
}

run().catch((error) => {
  console.error(`[social-images] ${error.message}`);
  process.exit(1);
});
