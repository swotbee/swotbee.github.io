import { readFile, writeFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Source manifests preserve the original ImageGen paths. This exports the
// article/social rasters, keeps legacy SVG URLs working, and updates consumers.
const manifestPath = process.argv[2];
if (!manifestPath) throw new Error('Pass an ImageGen source manifest JSON path.');
const sources = JSON.parse(await readFile(manifestPath, 'utf8'));
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const jobs = [];
for (const item of sources) {
  if (!item.success || !item.path) throw new Error(`Missing generated source: ${item.slug}`);
  await access(item.path);
  const article = `src/pages/posts/${item.slug}.md`;
  const markdown = await readFile(article, 'utf8');
  const image = markdown.match(/^image:\s*["']([^"']+)["']/m)?.[1];
  if (!image?.startsWith('/assets/')) throw new Error(`Unexpected image path: ${article}`);
  const stem = image.replace(/\.(?:svg|png)$/, '');
  const title = markdown.match(/^title:\s*(.+)$/m)?.[1].replace(/^["']|["']$/g, '') || item.slug;
  jobs.push({ ...item, stem, title });
}

async function markdownFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(filename));
    else if (entry.name.endsWith('.md')) files.push(filename);
  }
  return files;
}

for (const job of jobs) {
  const stem = `public${job.stem}`;
  const source = await readFile(job.path);
  const article = await sharp(source).resize(1200, 675, { fit: 'contain', background: 'white' })
    .png({ palette: true, quality: 95, compressionLevel: 9 }).toBuffer();
  const social = await sharp(source).resize(1200, 630, { fit: 'contain', background: 'white' })
    .png({ palette: true, quality: 95, compressionLevel: 9 }).toBuffer();
  await writeFile(`${stem}.png`, article);
  await writeFile(`${stem}-share.png`, social);
  await writeFile(`${stem}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-labelledby="title desc"><title id="title">${escape(job.title)}</title><desc id="desc">SWOTBee editorial illustration of the article's customer-agreement workflow, with SWOTBee branding.</desc><image width="1200" height="675" href="data:image/png;base64,${article.toString('base64')}"/></svg>\n`);
  await writeFile(`${stem}.social.png`, social);
  console.log(`Exported ${job.slug}`);
}

for (const filename of await markdownFiles('src/pages/posts')) {
  const original = await readFile(filename, 'utf8');
  let markdown = original;
  for (const job of jobs) {
    const imageLine = markdown.match(/^image:\s*["']([^"']+)["']\s*$/m);
    if (!imageLine || ![`${job.stem}.svg`, `${job.stem}.png`].includes(imageLine[1])) continue;
    markdown = markdown.replace(/^image:.*$/m, `image: "${job.stem}.png"`);
    const socialLine = `socialImage: "${job.stem}-share.png"`;
    markdown = /^socialImage:/m.test(markdown)
      ? markdown.replace(/^socialImage:.*$/m, socialLine)
      : markdown.replace(/^image:.*$/m, line => `${line}\n${socialLine}`);
  }
  if (markdown !== original) await writeFile(filename, markdown);
}
