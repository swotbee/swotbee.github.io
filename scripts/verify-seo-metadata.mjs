import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const distDirectory = path.resolve('dist');
const socialImageTagPattern = /<meta\b[^>]*(?:property|name)="(?:og:image|twitter:image)"[^>]*>/gi;
const contentPattern = /content="([^"]*)"/i;

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return listHtmlFiles(entryPath);
    }
    return entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : [];
  }));
  return nested.flat();
}

const htmlFiles = await listHtmlFiles(distDirectory);
const failures = [];
let checkedTags = 0;

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, 'utf8');
  const tags = html.match(socialImageTagPattern) ?? [];

  for (const tag of tags) {
    const value = tag.match(contentPattern)?.[1] ?? '';
    checkedTags += 1;

    if (!/^https?:\/\//i.test(value)) {
      failures.push(`${path.relative(distDirectory, htmlFile)}: relative social image ${value || '(missing)'}`);
      continue;
    }

    if (/^https?:\/\/[^/]+https?:\/\//i.test(value)) {
      failures.push(`${path.relative(distDirectory, htmlFile)}: concatenated social image ${value}`);
    }
  }
}

if (failures.length > 0) {
  console.error('SEO metadata validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(`SEO metadata validation passed for ${checkedTags} social image tags across ${htmlFiles.length} HTML files.`);
}
