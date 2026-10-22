# Website development

This is the canonical development guide for the SWOTBee public website. `CLAUDE.md`
and `AGENTS.md` are thin agent adapters and must reference this file rather than repeat
its contents.

## Project

The site is a static Astro 6 application deployed to GitHub Pages at
`https://swotbee.com/`. Astro components are the primary UI layer. React components are
used for client-side interaction, and Alpine.js is provided by the Astro integration.

Important locations:

- `src/pages/`: file-based routes
- `src/pages/posts/`: Markdown blog posts
- `src/pages/services/`: service pages
- `src/components/astro/`: Astro components
- `src/components/react/`: React components
- `src/layouts/BaseLayout.astro`: primary page layout
- `src/styles/global.css`: Tailwind 4 utilities and original palette baseline
- `src/styles/site-theme.css`: active Coral + aqua presentation
- `src/utils/homepageAccentPalettes.ts`: shared default and comparison palette tokens
- `src/utils/seo.ts`: SEO helpers
- `docs/analytics-consent-and-attribution.md`: analytics and consent rules
- `docs/content-guidelines/`: shared content rules
- `docs/plans/`: approved content and page plans

## Requirements and package management

- Use Node.js 22, matching `.node-version` and CI.
- Use pnpm 9.12.3 through Corepack. `package.json` pins the version.
- `pnpm-lock.yaml` is the only lockfile.
- Never run `npm install`, `npm ci`, Yarn, or another package manager here.
- When dependencies change, update and commit `pnpm-lock.yaml`.
- CI installs with `pnpm install --frozen-lockfile`.

Setup:

```bash
corepack enable
pnpm install --frozen-lockfile
```

## Development and validation

```bash
pnpm dev                 # development server at http://localhost:4321/
pnpm build               # production build and Pagefind index in dist/
pnpm preview             # preview Astro's production build
pnpm verify              # standard repository validation
pnpm serve:dist          # gzip-enabled production-like server on port 4395
pnpm check:report-signups # read-only smoke checks against deployed report pages
```

A `Justfile` wraps the same commands when `just` is installed. The pnpm commands are
the canonical interface.

No general unit-test runner or linter is currently configured. `pnpm verify` runs the
production build and is the normal validation command.

To compare homepage color palettes, run `pnpm dev` and open
`/homepage-colors-prototype/`. The temporary, noindex preview supports
`?variant=raspberry|iris|orchid|wine|graphite|plum|mauve|checked-in|raspberry-iris|balanced-orange|bright-orange|coral-red|coral-aqua`;
its controls also switch the coordinated backgrounds and supporting colors.
The checked-in option restores the original copper palette and styling. The
raspberry-iris option uses iris throughout while retaining raspberry's warm ivory
backgrounds and original supporting colors.
Balanced orange uses `#D86329` action buttons; bright orange uses `#FF8C52`.
Both orange variants use white button labels.
Both use green section highlights, a mint hero gradient, and warm ivory backgrounds.
Coral red uses `#E65E5E` buttons with light labels, a full coral shade scale,
warm cream surfaces, and coordinated teal, slate blue, and amber supporting colors.
Coral + aqua uses a pure white homepage canvas, charcoal headings, and aqua
(`#247F76`) supporting accents. Pale aqua (`#F7FFFD`), mint (`#EFF6F4`), and
golden yellow details stay inside components rather than full-width section washes,
with crisp 1px `#E2E8E6` borders around white cards. Divs using the pale aqua
background have a 1px `#F1FFFC` border; the three consulting roadmap cards use
a stronger slate-gray `#CBD8E5` border.
Coral (`#DF462A`) is reserved for primary actions. The eight problem-grid icons
use neutral mint (`#EFF6F4`) containers with deep spruce (`#133E39`) strokes;
other supporting icons retain their existing colors. The dark metrics bar uses
white statistics with muted mint (`#9FD3C7`) descriptive labels.
Cookie Accept and footer Subscribe remain
secondary outline buttons. The existing charcoal footer is preserved. Outcome
metrics sit in a contained dark card immediately after the hero's integration strip
and architecture sentence. The closing aqua CTA is also a contained card.
Consulting sections use engineering slate blue (`#526F91`) cues and buttons;
deep spruce (`#133E39`) is reserved for future forecasting product modules.
The site default and this variant use self-hosted Bricolage Grotesque for headings, with
optical size fixed at 14, main headings at weight 700, and card headings at 600.
The hero uses `-0.025em` tracking and `1.08` line height; section headings use
`-0.015em` tracking, while uppercase kickers and badges use `0.1em`.
Hanken Grotesk is retained for body text. Other variants retain their original headings.
Its bold hero title sits in a `max-w-7xl` container aligned with the navigation;
the navigation has no inner side padding and shares the hero's responsive gutters.
Its desktop hero uses a 44–48px title with a wider text column and one concise
supporting paragraph; other variants keep the original two-paragraph hero copy.
That paragraph lists renewal dates, recurring line items, companies, contacts,
custom properties and account ownership. Demo and renewal-estimate actions use
2px neutral-gray outlines with charcoal text and visible hover and keyboard-focus states.
Both hero badges use the same aqua highlight.
Coral + aqua is the default across the site and the default comparison selection.
`BaseLayout.astro` applies its shared token map through `SiteTheme.astro` without
JavaScript; normal pages do not include comparison controls or their bottom spacing.
The regular homepage uses the compact supporting paragraph above. Historic preview
variants still inherit the original `global.css` baseline before applying their tokens.

For analytics, consent-banner, attribution, or third-party embed changes, also run:

```bash
PUBLIC_GA4_ID=G-TEST PUBLIC_CLARITY_ID=test pnpm build
pnpm check:consent
pnpm check:blog-measurement
```

`check:consent` uses a real headless browser and requires a build containing the test
analytics identifiers. Code inspection is not a substitute for this check.

`check:blog-measurement` checks the contract tracker CSV, download event, mouse and
keyboard enquiry events, and original landing/referrer values in the contact form
after internal navigation. It blocks third-party requests and submits no form.
Use `--port 4404` if its default preview port 4403 is occupied. It verifies browser
event payloads and first-party attribution, not GA4's processed channel assignment.

After a deployment, verify that every report-signup page renders and rejects invalid
email without calling the webhook:

```bash
pnpm check:report-signups -- --url https://www.swotbee.com
```

A real submission creates or updates a HubSpot contact and posts a Slack notification,
so it is deliberately opt-in and requires an explicit test email. One representative
submission covers the shared `ReportSignup.astro` behavior used by all four pages:

```bash
pnpm check:report-signups -- --url https://www.swotbee.com \
  --submit --headed --email info+report-signup-smoke@swotbee.com
```

Install the browser once with `pnpm exec playwright install chromium` if Playwright
reports that its Chromium executable is missing.

Production reCAPTCHA v3 can reject headless automation with `verification_failed` even
when the page and webhook are healthy. Run the live mode with `--headed` on a workstation.
A reliable unattended positive-path test would require a separate, authenticated test
route; do not weaken or bypass the production reCAPTCHA threshold for CI.

## Local performance checks

Use `pnpm serve:dist` for Lighthouse. Do not use `python -m http.server`, because it
does not reproduce GitHub Pages compression. Build with test analytics identifiers when
measuring the cost of the production tag stack.

A cold Vite development server can return `504 Outdated Optimize Dep` and reload with a
new optimizer hash. If the page renders after the reload, this is expected. Avoid running
build or preview concurrently with the development server because they share Vite cache
state.

## Architecture and design conventions

- Tailwind CSS 4 is configured through `@tailwindcss/vite` and the `@theme` block in
  `src/styles/global.css`. Do not treat the legacy `tailwind.config.js` as canonical.
- Alpine.js is started by `@astrojs/alpinejs`. Do not add another `Alpine.start()`.
- Use `BaseLayout.astro` for normal pages and `BlogPostLayout.astro` for posts.
- Use the `v6` brand utilities from `src/styles/global.css`; their active values come
  from `defaultSitePalette` in `src/utils/homepageAccentPalettes.ts`. Primary actions
  use separate `--color-action` tokens in `src/styles/site-theme.css`.
- Follow `docs/content-guidelines/page-imagery.md` for landing-page visuals:
  use PNG or JPEG content illustrations, with editable SVG sources kept separately.
- Follow [homepage color and proof principles](content-guidelines/homepage-color-system.md)
  for the white canvas, contained color, product roles, and early proof placement.
- For user-facing changes, follow the workspace UX framework at
  `../docs/ux/UX_FRAMEWORK.md`.
- Read `docs/analytics-consent-and-attribution.md` before adding a tag, pixel,
  third-party embed, or form attribution field.
- Keep internal links compatible with `trailingSlash: "always"`.

Service-page structure and approved copy decisions remain in:

- `docs/plans/service-page-redesign-plan.md`
- `docs/plans/service-page-answers.md`
- `docs/plans/positioning-and-differentiators-v3.md`

Blog creation uses:

- `docs/plans/seo-content-pipeline-neuronwriter-merged.md`
- `docs/plans/blog-creation-playbook.md`
- `docs/content-guidelines/answer-first-pattern.md`

These workflow documents are canonical. Do not copy their detailed rules into agent
instruction files.

## Generated output and deployment

- `dist/` is generated and must not be committed.
- Pushes to `main` run `.github/workflows/pages-deploy.yml`.
- CI uses Node 22, pnpm 9.12.3, a frozen install, and `pnpm build`.
- Production analytics identifiers are supplied through GitHub Actions secrets.
- Do not deploy, push, or change repository secrets unless explicitly requested.

## Completion

Follow `../docs/development-workflow.md`. At minimum, run `pnpm verify`, inspect the
website repository's diff, and report any additional focused check such as
`pnpm check:consent`.
