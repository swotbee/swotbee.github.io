import { readFile, writeFile } from 'node:fs/promises';

// Editorial copy stays separate so agreement identities and example arithmetic
// can be reviewed without changing layout code. No product interface is implied.
const specs = JSON.parse(await readFile(new URL('./blog-workflow-content.json', import.meta.url), 'utf8'));
const logo = (await readFile('public/assets/brand/logo-lockup.png')).toString('base64');
const ink = '#2E2A31';
const aqua = '#247F76';
const coral = '#CA3C22';
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
function wrap(value, limit) {
  const lines = [];
  let line = '';
  for (const word of value.split(' ')) {
    if (line && `${line} ${word}`.length > limit) { lines.push(line); line = ''; }
    line += `${line ? ' ' : ''}${word}`;
  }
  if (line) lines.push(line);
  return lines;
}
function text(x, y, value, size = 24, color = ink, weight = 400) {
  return `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}">${escape(value)}</text>`;
}
function icon(type, x, y, color = aqua) {
  const paths = {
    document: '<path d="M4 0H25L35 10V43H4Z M25 0V11H35 M11 21H28 M11 29H28 M11 36H23"/>',
    invoice: '<path d="M4 0H35V44L29 40L23 44L17 40L11 44L4 40Z M11 10H28 M11 18H28 M11 26H22 M24 33H28"/>',
    folder: '<path d="M0 10V3H15L21 10H40V40H0Z M0 16H40 M8 25H29 M8 32H23"/>',
    calendar: '<rect x="1" y="5" width="39" height="36" rx="4"/><path d="M10 0V11 M31 0V11 M1 16H40 M10 24H15 M24 24H30 M10 32H15"/>',
    chart: '<path d="M1 0V42H42 M9 31V23H16V31 M22 31V13H29V31 M35 31V5H42V31"/>',
  };
  return `<g transform="translate(${x} ${y})" fill="none" stroke="${color}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">${paths[type] || paths.document}</g>`;
}

for (const spec of specs) {
  let svg = `<image x="38" y="28" width="174" height="46" href="data:image/png;base64,${logo}"/>`;
  let y = 126;
  for (const line of wrap(spec.title, 36)) { svg += text(38, y, line, 34, ink, 700); y += 42; }
  y += 1;
  for (const line of wrap(spec.subtitle, 51)) { svg += text(38, y, line, 24); y += 31; }
  y += 26;
  const connected = ['timeline', 'evidence'].includes(spec.layout);
  for (const [index, [label, value, detail]] of spec.rows.entries()) {
    const labelLines = wrap(label, 33);
    const valueLines = wrap(value, 34);
    const detailLines = wrap(detail, 43);
    const rowHeight = 27 + labelLines.length * 33 + valueLines.length * 37 + detailLines.length * 30 + 21;
    const highlight = /late|excluded|unchanged|one-time/i.test(`${label} ${value}`);
    const accent = highlight ? coral : aqua;
    const fill = highlight ? '#FFF4F1' : '#FFFFFF';
    if (connected && index < spec.rows.length - 1) svg += `<path d="M65 ${y + 45}V${y + rowHeight + 20}" stroke="${aqua}" stroke-width="3" stroke-dasharray="5 6"/>`;
    svg += `<rect x="102" y="${y}" width="620" height="${rowHeight}" rx="14" fill="${fill}" stroke="${accent}" stroke-opacity="0.25"/>`;
    svg += `<rect x="102" y="${y + 19}" width="4" height="${rowHeight - 38}" rx="2" fill="${accent}"/>`;
    svg += `<circle cx="65" cy="${y + 45}" r="29" fill="white" stroke="${accent}" stroke-opacity="0.25"/>`;
    svg += `<g transform="translate(48 ${y + 27}) scale(.8)">${icon(spec.icon, 0, 0, accent)}</g>`;
    let rowY = y + 35;
    for (const line of labelLines) { svg += text(126, rowY, line, 26, accent, 700); rowY += 33; }
    for (const line of valueLines) { svg += text(126, rowY, line, 29, ink, 700); rowY += 37; }
    for (const line of detailLines) { svg += text(126, rowY, line, 24); rowY += 30; }
    y += rowHeight + 18;
  }
  y += 12;
  const resultLines = wrap(spec.result, 44);
  const resultHeight = resultLines.length * 34 + 35;
  svg += `<rect x="38" y="${y}" width="684" height="${resultHeight}" rx="14" fill="${aqua}"/>`;
  for (const [index, line] of resultLines.entries()) svg += text(60, y + 36 + index * 34, line, 27, 'white', 700);
  y += resultHeight + 34;
  for (const line of wrap(spec.note, 57)) { svg += text(38, y, line, 23); y += 30; }
  y += 30;
  const desc = `${spec.subtitle} ${spec.rows.map(row => row.join(': ')).join('. ')}. ${spec.result} ${spec.note}`;
  const output = `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="${y}" viewBox="0 0 760 ${y}" role="img" aria-labelledby="title desc"><title id="title">${escape(spec.title)}</title><desc id="desc">${escape(desc)}</desc><rect width="760" height="${y}" fill="white"/><g font-family="Arial,sans-serif">${svg}</g></svg>\n`;
  await writeFile(spec.target, output);
  console.log(`Rendered ${spec.slug}`);
}
