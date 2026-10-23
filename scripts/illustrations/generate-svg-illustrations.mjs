// Historical generator: writes reference output only, never the live component.
import fs from 'node:fs';
import path from 'node:path';
const target='design-source/renewal-illustrations/historical-generated';
fs.mkdirSync(target,{recursive:true});
const css=fs.readFileSync('src/styles/global.css','utf8');
const tokens=Object.fromEntries([...css.matchAll(/--color-([\w-]+):\s*(#[\da-f]{6})\b/gi)].map(m=>[m[1],m[2]]));
const c={ink:tokens['ink-800'],blue:tokens['v6-blue'],lightBlue:tokens['v6-blue-100'],aqua:tokens['aqua-600'],mint:tokens['aqua-400'],pale:tokens['aqua-50'],orange:tokens['coral-600'],paper:tokens['coral-25'],white:'#FFFFFF',skin:'#C78D68',skinLight:'#E6B394',hair:tokens['ink-900']};
const component='design-source/renewal-illustrations/historical-generated/RenewalIllustration.astro';
const source=fs.readFileSync('design-source/renewal-illustrations/baseline/RenewalIllustration.astro','utf8');
const drawings=[...source.slice(source.indexOf('const drawings = ['),source.lastIndexOf('];')).matchAll(/`([\s\S]*?)`/g)].map(m=>m[1]);
if(drawings.length!==11)throw new Error('Expected eleven original vector icons');
const names=['line-items','escalation-clause','account-owner','sales-admin','late-escalation','workflow','forecast','renewal-rules','configuration','preview','automation'];
function resolve(s){return s.replace(/var\(--color-([\w-]+)\)/g,(_,name)=>{if(!tokens[name])throw new Error('Missing token '+name);return tokens[name];});}
for(let i=0;i<drawings.length;i++){
const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 96" width="112" height="96"><title>${names[i].replaceAll('-',' ')}</title><ellipse cx="57" cy="86" rx="26" ry="4" fill="${c.lightBlue}" opacity=".7"/><g fill="none" stroke="${c.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${resolve(drawings[i])}</g></svg>\n`;
fs.writeFileSync(`${target}/icon-${names[i]}.svg`,svg);
}
const check=(x,y,s=1,color=c.aqua)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="27" fill="${color}" stroke="${c.ink}" stroke-width="3"/><path d="m-13 0 9 9 18-21" stroke="white" stroke-width="6" fill="none"/></g>`;
const lines=(x,y,w,n=3,dy=32)=>Array.from({length:n},(_,i)=>`<path d="M${x} ${y+i*dy}h${w-(i%2)*40}"/>`).join('');
const person=()=>`<g stroke="${c.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
  <path d="m154 672-2 142-22 181 54 3 43-180 14-87 13 101 47 162 52-13-26-179-12-144Z" fill="${c.blue}"/>
  <path d="m192 715 35 16m27 101 22-128M158 790l33 8m92 0 37-6" fill="none"/>
  <path d="m132 987-22 24-31 16q-19 13-7 29l112-1 3-56Z" fill="${c.paper}"/>
  <path d="m299 986-1 29 47 35 59 1q15-11 0-23l-53-44Z" fill="${c.paper}"/>
  <path d="m76 1043 108-1m122-13 36 9m-186-24-22 12m37-11-22 14" fill="none"/>
  <path d="m168 384-42 48 15 158 8 102q74 29 154-3l-7-177 23-65-59-57Z" fill="${c.mint}"/>
  <path d="m170 382 29 63 56-60m-55 61-8 198m-33-172 12 66m76-75 22 97m-89 96 94-5" fill="none"/>
  <path d="m132 432-46 110q-14 29 8 46l74 42 24-37-62-37 43-82" fill="${c.mint}"/>
  <path d="m168 596 25 0 32 23q13 11 4 21-7 6-18-1l-21-12-4 13q-9 12-18-1l-12-20Z" fill="${c.skinLight}"/>
  <path d="m292 432 52 58 95-42 20 37-115 58q-20 10-35-6l-48-57" fill="${c.mint}"/>
  <path d="m438 450 19-17 34-6q17 0 17 10-1 10-16 10l-17 5 15 10q12 10 3 19-6 5-20-3l-22-1Z" fill="${c.skinLight}"/>
  <path d="m188 353 1 42 25 31 34-37-8-41Z" fill="${c.skinLight}"/>
  <path d="m187 373 53-18-1 15-30 25Z" fill="${c.skin}" stroke="none"/>
  <path d="M161 300q-4-67 57-70 61-2 64 58l-4 40q-5 44-43 49-40 4-62-33Z" fill="${c.skinLight}"/>
  <path d="M165 327q-35-28-24-62-11-25 13-40 0-29 30-29 17-26 43-9 27-11 41 15 30-3 34 25 27 18 12 45l-33 18-20-42-16 20-24-15-17 27-25-6Z" fill="${c.hair}"/>
  <path d="M167 305q-20-13-21 5 0 18 21 23" fill="${c.skinLight}"/>
  <path d="m219 304 1 1m39-4 1 1m-24 7 1 18 10 0m-27 19q17 10 29-2" fill="none"/>
  <circle cx="168" cy="333" r="5" fill="${c.orange}"/>
  <path d="m145 259 13-15m25-25 12 3m43-20 8 13m37 19-10 8" fill="none" stroke="${c.ink}"/>
</g>`;
const ground=`<ellipse cx="453" cy="1055" rx="366" ry="28" fill="${c.lightBlue}" opacity=".3"/>`;
const floating=`<g stroke="${c.aqua}" stroke-width="5" fill="none"><path d="M660 201v25m-12-12h25M763 342v20m-10-10h20"/><circle cx="368" cy="258" r="9"/><path d="m757 925 12 10 24-29"/></g>`;
const wrap=(title,body)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1125" width="900" height="1125"><title>${title}</title><desc>Original vector illustration with a transparent background. Coral, ocean blue and aqua from the SWOTbee theme.</desc>${ground}<g stroke="${c.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>\n`;
const calendar=`<g transform="rotate(-4 588 676)">
<rect x="353" y="391" width="444" height="548" rx="24" fill="${c.aqua}"/>
<rect x="368" y="366" width="421" height="548" rx="24" fill="${c.paper}"/>
<path d="M369 459h419v-69q0-24-24-24H394q-25 0-25 24Z" fill="${c.aqua}"/>
${[420,510,600,690,750].map(x=>`<path d="M${x} 393v-46q0-22 13-22t13 22v41" stroke="${c.orange}" stroke-width="15" fill="none"/>`).join('')}
${Array.from({length:4},(_,r)=>Array.from({length:4},(_,i)=>`<rect x="${402+i*86}" y="${493+r*85}" width="62" height="59" rx="6" fill="${(r+i)%3===0?c.mint:c.pale}" stroke="none"/>${(r+i)%3===0?`<path d="m${414+i*86} ${523+r*85} 12 11 21-27" fill="none" stroke="${c.aqua}" stroke-width="7"/>`:''}`).join('')).join('')}
</g><g transform="rotate(7 580 915)"><rect x="477" y="852" width="238" height="154" rx="15" fill="${c.white}"/>${check(594,901,.8)}<path d="M529 956h130" stroke="${c.lightBlue}" stroke-width="9"/></g>`;
fs.writeFileSync(`${target}/renewal-results.svg`,wrap('Renewal accuracy: a calendar and approved deal',`${floating}${calendar}${person()}`));
const quote=`<g transform="rotate(5 599 669)"><rect x="375" y="382" width="393" height="572" rx="20" fill="${c.mint}"/></g>
<g transform="rotate(-3 589 646)"><rect x="369" y="350" width="393" height="572" rx="20" fill="${c.paper}"/>
<path d="M369 437h393v-65q0-22-22-22H391q-22 0-22 22Z" fill="${c.blue}"/><path d="M404 393h146" stroke="white" stroke-width="11"/>
<g stroke="${c.lightBlue}" stroke-width="9">${lines(409,494,280,4,49)}</g>
<rect x="409" y="721" width="309" height="105" rx="18" fill="${c.orange}" stroke="none"/>
<path d="M445 774h176m-18-18 19 18-19 18" stroke="white" stroke-width="9" fill="none"/>
<path d="M558 807v79l20-17 20 33 24-15-21-33 29-5Z" fill="${c.white}"/>
</g>${check(750,365,1.3)}<g stroke="${c.orange}" stroke-width="5" fill="none"><path d="m752 287 17-25m23 55 30-7m-46-30 15-10"/></g>`;
fs.writeFileSync(`${target}/quote-effort.svg`,wrap('Less quote effort: prepared documents and one simple action',`${floating}${quote}${person()}`));
const stopwatch=`<g transform="rotate(8 590 580)"><path d="M563 344v-42h70v42" fill="${c.aqua}"/><rect x="550" y="285" width="96" height="31" rx="10" fill="${c.orange}"/><path d="m748 398 33-34 30 29-33 35" fill="${c.aqua}"/>
<circle cx="596" cy="566" r="211" fill="${c.aqua}"/><circle cx="596" cy="566" r="181" fill="${c.paper}"/>
${Array.from({length:12},(_,i)=>`<path d="M596 405v18" transform="rotate(${i*30} 596 566)" fill="none"/>`).join('')}
<path d="m596 566 90-96m-90 96 0-110" stroke="${c.orange}" stroke-width="12" fill="none"/><circle cx="596" cy="566" r="13" fill="${c.ink}"/>
</g><g transform="rotate(-6 605 869)"><rect x="420" y="756" width="355" height="237" rx="18" fill="${c.white}"/><path d="M451 805h156m-156 42h124m-124 42h105" stroke="${c.lightBlue}" stroke-width="8"/>${check(698,870,1.3)}</g>
<g fill="none" stroke="${c.blue}" stroke-width="6"><path d="M346 358h76m-103 49h75m-60 49h33"/></g>`;
fs.writeFileSync(`${target}/response-speed.svg`,wrap('Faster response: an oversized stopwatch and approved quote',`${floating}${stopwatch}${person()}`));
const board=`<g transform="rotate(-3 589 635)"><rect x="352" y="362" width="455" height="590" rx="22" fill="${c.paper}"/><path d="M352 452h455v-67q0-23-23-23H376q-24 0-24 24Z" fill="${c.blue}"/>
<path d="M389 408h228" stroke="white" stroke-width="10"/><path d="M580 478v417" stroke="${c.lightBlue}" stroke-width="3"/>
<rect x="382" y="479" width="167" height="53" rx="10" fill="${c.mint}" stroke="none"/><rect x="607" y="479" width="167" height="53" rx="10" fill="${c.mint}" stroke="none"/>
<text x="465" y="515" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" font-weight="bold" fill="${c.ink}" stroke="none">WEEK 1</text><text x="690" y="515" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" font-weight="bold" fill="${c.ink}" stroke="none">WEEK 2</text>
${[0,1,2].map(r=>[0,1].map(col=>`<rect x="${382+col*225}" y="${560+r*101}" width="167" height="79" rx="10" fill="${c.white}"/>${check(409+col*225,586+r*101,.45)}<path d="M${434+col*225} ${582+r*101}h86m-86 23h65" stroke="${c.lightBlue}" stroke-width="5"/>`).join('')).join('')}
<path d="M455 902h241m-23-21 24 21-24 21" fill="none" stroke="${c.orange}" stroke-width="8"/>
</g>${check(766,354,1.25)}`;
fs.writeFileSync(`${target}/first-results.svg`,wrap('First results: a two-week implementation board',`${floating}${board}${person()}`));
const componentText=`---\ninterface Props { variant: number }\nconst { variant } = Astro.props;\nconst files = ${JSON.stringify(names)};\nconst file = files[variant] ?? files[0];\n---\n<img data-renewal-illustration={variant} src={\`/assets/illustrations/renewals/icon-\${file}.svg\`} width="96" height="84" alt="" aria-hidden="true" class="renewal-illustration" loading="lazy" decoding="async" />\n`;
fs.writeFileSync(component,componentText);
console.log('Created eleven transparent SVG icons and four original vector scenes.');
