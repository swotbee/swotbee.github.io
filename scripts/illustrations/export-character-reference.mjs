// Export a native SVG portrait and a PNG reference for scene briefs.
import fs from 'node:fs';
import sharp from 'sharp';
const directory = 'public/assets/illustrations/renewals';
const source = fs.readFileSync(`${directory}/renewal-results-clean-v3.svg`, 'utf8');
const portrait = source.replace(/<svg\b[^>]*>/, tag => tag
  .replace(/width="[^"]+"/, 'width="330"')
  .replace(/height="[^"]+"/, 'height="340"')
  .replace(/viewBox="[^"]+"/, 'viewBox="360 180 990 1020"'));
fs.writeFileSync(`${directory}/nia-portrait-reference.svg`, portrait);
await sharp(Buffer.from(portrait)).resize({ width: 660 }).png().toFile(`${directory}/nia-portrait-reference.png`);
console.log('Exported SVG and PNG character portrait references.');
