// Run from the website root. Pass the isolated SVGO module URL as the first argument.
import fs from 'node:fs';
const moduleUrl = process.argv[2];
if (!moduleUrl) throw new Error('Pass the installed SVGO module URL. See README.md.');
const { optimize } = await import(moduleUrl);
const suffix = process.argv[3] ?? 'traced-v1';
if (!/^[a-z0-9-]+$/.test(suffix)) throw new Error('Use a simple SVG version suffix.');
for (const name of ['renewal-results', 'quote-effort', 'response-speed', 'first-results']) {
  const directory = suffix === 'clean-v3' ? 'public/assets/illustrations/renewals' : 'design-source/renewal-illustrations/homepage-v3-sharmi';
  const file = `${directory}/${name}-${suffix}.svg`;
  const before = fs.readFileSync(file, 'utf8');
  const result = optimize(before, { multipass: true, floatPrecision: 3 });
  if (/<image\b|data:image|<foreignObject\b/i.test(result.data)) throw new Error(`Non-vector content in ${file}`);
  fs.writeFileSync(file, result.data);
  console.log(JSON.stringify({ name, bytes: result.data.length, paths: (result.data.match(/<path\b/g) ?? []).length }));
}
