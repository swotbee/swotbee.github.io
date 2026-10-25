import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

// Supply the three original ImageGen PNG paths in this order. Preserve their
// originals outside public; the article PNGs and legacy SVGs are web exports.
const heroes = [
  ['hubspot-clone-deal-line-items', 'A RevOps professional selects recurring support for a renewal and reviews onboarding separately.'],
  ['hubspot-contract-amendments', 'Two colleagues review an accepted change, its effective date and a separate invoice.'],
  ['hubspot-contract-record-responsibilities', 'Three colleagues connect one agreement to document, deal, Contract and billing records.'],
];
const sources = process.argv.slice(2);
if (sources.length !== heroes.length) {
  throw new Error('Pass the line-item, amendment and record-responsibility source PNG paths.');
}

for (const [index, [slug, description]] of heroes.entries()) {
  const source = await readFile(sources[index]);
  const stem = `public/assets/blog/${slug}-hero`;
  await sharp(source).resize(1200, 675, { fit: 'contain', background: 'white' })
    .png({ palette: true, quality: 95, compressionLevel: 9 }).toFile(`${stem}.png`);
  // Keep the existing SVG URLs functional and self-contained, including when
  // rasterised by prepare-social-images.mjs. The scene is a generated bitmap.
  const bitmap = await readFile(`${stem}.png`);
  await writeFile(`${stem}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-labelledby="title desc"><title id="title">${description}</title><desc id="desc">Editorial illustration with the SWOTBee logo.</desc><image width="1200" height="675" href="data:image/png;base64,${bitmap.toString('base64')}"/></svg>\n`);
  const social = await sharp(source).resize(1200, 630, { fit: 'contain', background: 'white' })
    .png({ palette: true, quality: 95, compressionLevel: 9 }).toBuffer();
  // The share image is tracked; .social.png is a generated compatibility URL.
  await writeFile(`${stem}-share.png`, social);
  await writeFile(`${stem}.social.png`, social);
}
