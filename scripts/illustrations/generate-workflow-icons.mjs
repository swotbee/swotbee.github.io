// Small native SVG scenes for the existing 24px workflow icon slots.
import fs from 'node:fs';
const directory = 'public/assets/illustrations/renewals';
const { palette: p } = JSON.parse(fs.readFileSync(`${directory}/character-reference.json`, 'utf8'));
const icons = [
  ['closed-won', 'Closed won contract', `
    <path d="M7 3h13l5 5v19H7Z" fill="${p.paper}"/>
    <path d="M20 3v6h5" fill="${p.blue}"/>
    <path d="M11 12h8m-8 4h6m-6 4h4" fill="none"/>
    <circle cx="23" cy="24" r="6" fill="${p.tealLight}"/>
    <path d="m20 24 2 2 4-5" stroke="${p.white}" stroke-width="2.2" fill="none"/>
  `],
  ['renewal-created', 'New renewal record', `
    <path d="M5 5h15v21H5Z" fill="${p.blue}"/>
    <path d="M10 9h16v20H10Z" fill="${p.paper}"/>
    <path d="M14 14h8m-8 4h5" fill="none"/>
    <circle cx="24" cy="24" r="6" fill="${p.orange}"/>
    <path d="M24 21v6m-3-3h6" stroke="${p.white}" stroke-width="2" fill="none"/>
  `],
  ['rules-applied', 'Renewal rule controls', `
    <rect x="4" y="4" width="24" height="24" rx="3" fill="${p.paper}"/>
    <path d="M4 10h24V7q0-3-3-3H7q-3 0-3 3Z" fill="${p.blue}"/>
    <path d="M8 15h16M8 23h16" fill="none"/>
    <rect x="11" y="12" width="5" height="6" rx="1" fill="${p.orange}"/>
    <rect x="19" y="20" width="5" height="6" rx="1" fill="${p.tealLight}"/>
  `],
  ['risk-growth', 'Renewal risk and growth signals', `
    <rect x="3" y="7" width="25" height="21" rx="2" fill="${p.paper}"/>
    <path d="M7 23l6-6 4 3 7-9m-6 0h6v6" fill="none" stroke="${p.blue}" stroke-width="2.2"/>
    <circle cx="9" cy="8" r="6" fill="${p.orange}"/>
    <path d="M9 5v3m0 3v.1" fill="none" stroke="${p.white}" stroke-width="2.3"/>
  `],
  ['confident-forecast', 'Validated renewal forecast', `
    <path d="M5 3h17l5 5v21H5Z" fill="${p.paper}"/>
    <path d="M22 3v6h5" fill="${p.tealLight}"/>
    <path d="M9 24v-7h4v7Zm6 0V13h4v11Z" fill="${p.blue}"/>
    <circle cx="24" cy="23" r="6" fill="${p.tealLight}"/>
    <path d="m21 23 2 2 4-5" fill="none" stroke="${p.white}" stroke-width="2.2"/>
  `],
  ['repeat-renewals', 'Recurring renewal calendar', `
    <rect x="4" y="6" width="24" height="23" rx="3" fill="${p.paper}"/>
    <path d="M4 13h24V9q0-3-3-3H7q-3 0-3 3Z" fill="${p.blue}"/>
    <path d="M10 3v6m12-6v6" stroke="${p.orange}" stroke-width="2.5" fill="none"/>
    <path d="M11 21a5 5 0 0 1 9-3m-1-4 2 5-5-1" fill="none" stroke="${p.teal}" stroke-width="2"/>
    <path d="M21 22a5 5 0 0 1-9 3m1 4-2-5 5 1" fill="none" stroke="${p.orange}" stroke-width="2"/>
  `],
];
for (const [name, title, drawing] of icons) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24"><title>${title}</title><g stroke="${p.outline}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${drawing}</g></svg>\n`;
  fs.writeFileSync(`${directory}/workflow-${name}-v1.svg`, svg);
  console.log(`workflow-${name}-v1.svg`);
}
