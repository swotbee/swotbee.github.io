# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SWOTBee is a HubSpot & Shopify consulting firm targeting mid-sized companies (50–100 employees) in Energy, Utilities, SaaS, Construction, and Manufacturing. The website is deployed as a static site to GitHub Pages at swotbee.com.

**What SWOTBee does:**
- HubSpot onboarding, marketing automation, sales/RevOps optimization, and third-party integrations (NetSuite, Xero, DocuSign, Zoom, Shopify, etc.)
- Builds proprietary HubSpot marketplace apps: Smart Company Picker, Smart Deal Inspector, Renewal Deal Builder, and Deal Copilot (separate `hubspot-dev` repo)
- Key differentiators: workflow-first approach (adapts HubSpot to client processes), day-one results, data quality obsession, industry-specific tooling

**ICP:** VP Sales, VP Ops, RevOps/Sales Ops leads at mid-market companies. Messaging emphasizes empathy ("Is this you?" pain points), anonymous case studies, and a risk-free engagement model (free consultation, no lock-in, 30-day satisfaction checkpoint).

## Commands

**This repo is pnpm-only.** `AGENTS.md` is the authoritative rule and says never to run
`npm install`, `npm ci`, or Yarn here. `package.json` pins `packageManager: pnpm@9.12.3`,
`pnpm-lock.yaml` is the only lockfile, and `package-lock.json` is gitignored.

```bash
corepack enable                  # One-time, if pnpm is not on PATH
pnpm install --frozen-lockfile   # Install exactly what CI installs
pnpm dev                         # Dev server at localhost:4321 (binds to all interfaces)
pnpm build                       # Production build to ./dist/
pnpm preview                     # Preview production build locally
pnpm check:consent               # Verify nothing tracks before consent (needs ./dist)
```

`pnpm check:consent` drives a real headless browser through five visitor states and
asserts what happened on the wire. Run it after any change to analytics, the consent
banner, or a third-party embed, and before adding a pixel. It needs a build made **with**
the analytics IDs present, otherwise the banner is correctly absent and it cannot test
anything:

```bash
PUBLIC_GA4_ID=G-TEST PUBLIC_CLARITY_ID=test pnpm build && pnpm check:consent
```

Do not substitute reading the code. Two separate consent bugs on this site survived a
careful read and were caught only by watching the network: a footer withdrawal control
whose listener sat below an early `return`, so it was dead for everyone who had already
chosen, and analytics cookies that reappeared after being cleared, because GA4 rewrites
its cookie during unload.

## Measuring performance locally

**Use `pnpm serve:dist`, never `python -m http.server`.** Both serve the same files, but
python sends everything uncompressed while GitHub Pages gzips. That single difference read
as a 16-point Lighthouse gap and a doubled LCP:

| | uncompressed | gzip (production-like) |
|---|---|---|
| Mobile performance | 81 | **97** |
| LCP | 4.0s | **2.1s** |
| CSS transferred | 164 KB | 27 KB |

The uncompressed run sent me hunting a "slow LCP" that does not exist in production, and
produced a recommendation to optimise an image that was not even the LCP element. Verify
against the real thing when it matters: `curl -sI -H 'Accept-Encoding: gzip'
https://swotbee.com/` shows `content-encoding: gzip`.

Also build with analytics ids before measuring, or the tag stack is absent and the numbers
flatter the page:

```bash
PUBLIC_GA4_ID=G-TEST PUBLIC_CLARITY_ID=test pnpm build
pnpm serve:dist            # then run Lighthouse against http://127.0.0.1:4395/
```

## Analytics, consent and attribution

**Read `docs/analytics-consent-and-attribution.md` before adding any tag, pixel, third-party
embed, or form field.** It is the source of truth for what loads when, and it records
researched behaviour that is expensive to rediscover and in places contradicts the popular
belief (HubSpot's Forms API silently drops undefined fields rather than rejecting the
submission; Consent Mode does nothing at all for LinkedIn or Meta pixels, so they must be
gated by not loading them).

The short version: analytics and session recording are gated behind
`src/components/astro/ConsentBanner.astro` and only load on accept; reCAPTCHA is not gated
but loads on first form focus rather than page load; campaign attribution is captured into
`sessionStorage` by `src/components/astro/AttributionCapture.astro` and attached to form
submissions, because that is the only attribution that survives someone declining cookies.

A `Justfile` wraps the same recipes (`just dev`, `just build`, `just install`, `just audit`,
`just astro check`). `just` is a convenience only and is not installed on every machine; the
`pnpm` commands above always work.

**Why this matters, not just style.** npm does not fail loudly here. `npm run dev` and
`npm run build` both succeed and produce a working site against an npm-built `node_modules`,
so nothing tells you the tree has diverged from what CI installs. The divergence is real
(no `.pnpm` store, a resurrected `package-lock.json`) and it is what CI will not reproduce.
If a stray `package-lock.json` appears, someone ran npm: delete it, remove `node_modules`,
and re-run `pnpm install --frozen-lockfile`.

### `504 (Outdated Optimize Dep)` in dev is NORMAL, not a bug

You will see this in the browser console on a cold dev server, typically for
`/@id/astro/runtime/client/dev-toolbar/entrypoint.js`. **It is Vite working as designed and
needs no fix.** Do not go hunting for it.

Vite pre-bundles dependencies and then serves them only at a URL carrying the current
optimizer hash, `?v=<browserHash>`. The HTML references the module bare, with no `?v=`. So the
first request after Vite optimizes a dep returns `504 Outdated Optimize Dep` with an empty
body, which is Vite's signal to the client to reload; the reload then requests the module with
the correct hash and gets `200`. Proven on this repo:

```
/@id/astro/runtime/client/dev-toolbar/entrypoint.js?v=275048bb   200
/@id/astro/runtime/client/dev-toolbar/entrypoint.js              504
```

Two consequences worth knowing before anyone repeats this investigation:

- **Do not diagnose it with `curl`.** curl never performs Vite's reload, so it sees `504`
  forever and makes a self-healing mechanism look like a hard failure. Judge it in a browser:
  if the page renders, there is nothing wrong. This 504 is unrelated to npm vs pnpm, to Node
  version, to `--host`/`--verbose`, and to the Astro 6 upgrade. All were tested and cleared.
- It appears to "come and go" because a bare URL returns `200` before Vite has optimized that
  module and `504` after. That is the same mechanism, not two different states.

To silence it entirely, set `devToolbar: { enabled: false }` in `astro.config.mjs`. That
removes the toolbar script, and with it the console noise. Cosmetic only.

Genuinely worth avoiding, for a different reason: running `pnpm build`/`pnpm preview` while
`pnpm dev` is live, and leaving orphaned dev servers around. They share one
`node_modules/.vite`, so they force needless re-optimization. Run one server at a time.
Killing them is fiddlier than it looks: the process is
`node .../astro/bin/astro.mjs dev`, so `pkill -f "astro dev"` matches nothing, and killing the
`sh -c`/`npx` wrapper leaves the node child holding port 4321. Use `pkill -f "astro.mjs"`,
then confirm with `ss -ltnp | grep 4321`.

No test runner or linter is configured. Validate changes with `pnpm build` — Astro's build will catch type errors, broken imports, and template issues.

## Tech Stack

- **Framework**: Astro 6.4.8 (static output) with React 19 and Alpine.js integrations. The Astro 6 upgrade is DONE (Sharmi, Aug 2026); CI runs Node 22. Alpine is started by the `@astrojs/alpinejs` integration alone — never add a second `Alpine.start()`.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin (NOT the older `@astrojs/tailwind` integration)
- **Tailwind plugins**: Loaded via `@plugin` in `src/styles/global.css` — flowbite, flowbite-typography, tailwind-scrollbar
- **UI Libraries**: Flowbite, Embla Carousel, Framer Motion
- **Fonts**: Lexend Deca, Vollkorn, DM Sans, Hanken Grotesk, Rokkitt (loaded via `@fontsource` in BaseLayout)
- **Deployment**: GitHub Actions → GitHub Pages (triggers on push to `main`)

## Architecture

- **Layouts**: `BaseLayout.astro` is the primary layout (handles SEO, fonts, global CSS). `BlogPostLayout.astro` wraps markdown blog posts. `Layout.astro` is a simpler alternative.
- **Components split**: `src/components/astro/` for Astro components (server-rendered), `src/components/react/` for React components (client-side interactive). Astro components are the primary UI layer; React duplicates (Navbar, Hero, Footer) exist but the Astro versions are what pages use.
- **Pages**: Astro file-based routing in `src/pages/`. Blog posts are markdown files in `src/pages/posts/`. Service pages are in `src/pages/services/`.
- **Styling**: Tailwind v4 config lives in two places — `tailwind.config.js` (legacy v3 format) and `src/styles/global.css` (v4 `@theme` directives with the canonical color definitions). The v4 CSS `@theme` block is what's active.
- **SEO**: Handled via `astro-seo-plugin` with utility functions in `src/utils/seo.ts`. Sitemap generated via `@astrojs/sitemap`.

## Typography

Defined in `src/styles/global.css`:
- **Body**: `'Hanken Grotesk Variable', 'DM Sans Variable', 'Lexend Deca', sans-serif` — weight 400
- **Headings** (h1–h4): `'Rokkitt Variable', 'Vollkorn', serif` — weight 500

## Color System

The brand palette is defined in `src/styles/global.css` under `@theme`. Core colors:
- **primary**: dark navy (#213343) — main brand color
- **secondary**: yellow (#ffe066)
- **highlight**: orange-red (#ff5c35)
- **status**: indigo (#5C62D6)
- **neutral**: teal (#70c1b3)

Extended palettes also exist: `purple`, `xanthous-yellow`, `persian-rose`, `other-orange`, `accent1`.

**V6 design system** (prefixed `v6-`): A newer mid-tone palette used on v6 sample/service pages:
- `v6-blue` (#1A7AB5), `v6-teal` (#5AAB9D), `v6-copper` (#C47A2A, CTA color), `v6-amber` (#D4960A)
- V6 neutrals: `v6-dark`, `v6-text`, `v6-text-muted`, `v6-bg` (#f7f5f1), `v6-bg-warm`, `v6-border`

All colors have full shade scales (50–950). Use Tailwind classes like `text-v6-blue-600` or `bg-highlight-50`.

## Service Page Template

All 4 service pages (`src/pages/services/`) follow the same 10-section conversion template (established in `marketing.astro`):

1. **Hero** — headline + badge pills + primary CTA + secondary anchor
2. **Trust bar** — HubSpot Partner badge + 5 approved client logos (Wesco, Big Lots, Insteon, La Vie, Mytheresa)
3. **"Sound Familiar?"** — 6 pain point cards in 2-col grid
4. **Before/After** — gray (current state) vs teal (future state) comparison
5. **How We Work** — 3 numbered steps with copper circle badges
6. **Services** — 5 cards with emoji, title, desc, metric in 3-col grid
7. **Testimonial** — anonymous blockquote with industry attribution
8. **Why SWOTBee** — 4 numbered differentiators
9. **FAQ accordion** — 7 questions using native `<details>` elements
10. **Risk Reversal CTA** — copper gradient with white CTA button

All service pages use V6 color tokens (`v6-copper`, `v6-teal`, `v6-dark`, `v6-text-muted`, `v6-bg`, `v6-border`). CTAs link to `/contactus/`. New service pages should follow this template.

## Key Content Documents

- `docs/plans/positioning-and-differentiators-v3.md` — approved positioning, differentiators, headlines, "Is This You?" sections, testimonials, case studies, FAQ, risk reversal copy
- `docs/plans/service-page-redesign-plan.md` — shared template spec and component requirements
- `docs/plans/service-page-answers.md` — client decisions on pricing (no prices on site), engagement models, timelines, and deferred items
- `docs/hubspot-apps-copy-brief.md` — copy brief for 4 HubSpot marketplace apps (Smart Company Picker, Deal Inspector, Renewal Builder, Deal Copilot)

## Video Assets and Embeds

If work in this repo involves creating, editing, or embedding a video, use the workspace
video project template first:

`../marketing/content/video-project-template/`

The copied project folder should hold intake, decisions/Q&A, asset inventory, script,
storyboard, production plan, QA, publish package, drafts, and final exports. Do not infer
or invent missing video decisions inside site components; record them in the copied
project folder's `02-decisions.md`, then embed the approved final asset in the site.

For the broader runbook, read:

`../research/video-creation-framework/Video Creation Automation Playbook.md`

## SEO Blog Content Pipeline

Blog posts are produced with a repeatable, research-driven pipeline that merges three frameworks. Use this process for every new article or cluster. The full spec lives in `docs/plans/seo-content-pipeline-neuronwriter-merged.md`, and the practical step-by-step playbook (with real learnings and improvements from building 3 pillar clusters) is in `docs/plans/blog-creation-playbook.md`; read both before starting.

**The three frameworks (sources in `src/pages/posts/_prompts/`):**
- Research Strategist (`advanced SEO Research Strategist find sources.md`): discover, validate, score sources and mine community insight.
- Autonomous Content System (`Autonomous SEO Content System Agent Framework.md`): turn a topic into a pillar + cluster architecture, internal linking graph, semantic model, and executable article seeds.
- NeuronWriter (`NeuronWriter: Agent task sequence.md`): real SERP terms, competitor scores, content scoring, editor sync.

### Per-article process (run for the pillar first, then each cluster)
1. **Gap analysis.** Inventory existing posts in `src/pages/posts/` for the topic so new clusters are net-new, not duplicates. Note cannibalization guards (which existing post each new one should cross-link rather than repeat).
2. **Architecture.** Draft the pillar + cluster map, intents, priorities, and the internal linking graph. Write it to `docs/plans/<topic>-content-plan.md`.
3. **NeuronWriter analysis (per seed).** Run a query for each article keyword (see API below). Capture `terms`, `ideas.topic_matrix` (importance-ranked questions), `ideas.content_questions`, `competitors` (the score to beat), and `metrics.word_count` (the length target).
4. **Research.** Mine web + Reddit + community automatically; reuse existing dumps in `src/pages/posts/_prompts/research-resources/` when present. Write a scored insight bank to `docs/research/blog/<topic>/`.
5. **Write.** Cover the NeuronWriter terms, use the `topic_matrix` questions as H2/FAQ, write answer-first passages, and match house style (below).
6. **Optimize.** Score the draft with `/evaluate-content` and revise (add missing terms, hit the word-count target) until it beats the top competitor score. NeuronWriter scoring rewards both term coverage and reaching the word-count target.
7. **Publish.** Push the final draft to the NeuronWriter editor with `/import-content`, write the `.md` to `src/pages/posts/`, apply the internal linking graph (and add back-links from the pillar), then run `pnpm build` to validate.

### NeuronWriter API
- Base URL: `https://app.neuronwriter.com/neuron-api/0.5/writer`; auth header `X-API-KEY` (pass as an env var at call time, never commit the key); `Content-Type: application/json`.
- Endpoints: `POST /list-projects`, `POST /new-query` (params `project`, `keyword`, `engine`, `language`), `POST /get-query` (poll `status` until `ready`, ~90s+), `POST /evaluate-content` (score a draft, params `query`, `html`, `title`, `description`), `POST /import-content` (push to editor).
- Requires the Gold plan; each query and each evaluation consumes the monthly limit, so be deliberate.
- Convert the markdown body to HTML for `/evaluate-content` and `/import-content` (Python `markdown` with the `tables` extension is available).
- Watch for contaminated keywords: some "hubspot ..." keywords return SERP intent about HubSpot's own pricing/subscription rather than the customer use case (e.g. "hubspot renewal quote price increase", "turn off auto-renewal"). Keep the article on-brand for the ICP and accept a lower score, or retarget to a cleaner keyword.

### Blog post house style
- Frontmatter: `layout: ../../layouts/BlogPostLayout.astro`, `title`, `pubDate`, `description`, `category` (title + href), `modifiedDate`, `author` (SWOTBee Team block), `image` (Unsplash), `tags`. For cluster posts add `seriesName` and `pillarUrl` (the pillar's `/posts/...` path).
- Open with a blockquote linking to the pillar, then an answer-first bold paragraph.
- Use `---` between sections, descriptive H2/H3, tables for property/step references, a `## Frequently Asked Questions` block (bold question + short answer) for passage ranking.
- Internal links: contextual, descriptive keyword anchors to other `/posts/...` pages; verify every link resolves to an existing file before building.
- Close with a bold differentiator line plus the CTA `[Book a free 30-minute discovery call →](/contactus/)`.
- Follow the global no em/en dash rule in all generated content.

### Where things live
- Prompts and research material: `src/pages/posts/_prompts/` (prefixed with `_` so Astro excludes it from routing; do NOT rename back to `prompts/` or the raw research dumps break the build). Large research dumps are kept local and not committed.
- Plans: `docs/plans/`. Research output: `docs/research/`.

## File Versioning Convention

When iterating on page designs, old versions are kept as `*-old.astro` files (e.g., `hubspot-onboarding-old.astro`). Create new versioned files rather than overwriting previous designs.

## Branches

- `main` — active branch, auto-deploys to GitHub Pages
- `origin/new-website` — diverged from main. Contains: navbar redesign (dark sea-blue background, social links top bar, SVG logo, search bar removed), 4 new icon color palettes, and updated favicon assets. Potential merge conflicts in `Navbar.astro`, `global.css`, and `tailwind.config.js`.
- `origin/v1.1` – `origin/v1.9` — versioned historical branches
- `origin/old_swotbee`, `origin/master` — legacy branches

## Deployment

Pushes to `main` auto-deploy via `.github/workflows/pages-deploy.yml`: `pnpm/action-setup@v4`
(pnpm 9.12.3), Node 22, `pnpm install --frozen-lockfile`, then `pnpm build`. Output goes to
`./dist/` (gitignored, built in CI, never committed) and is deployed to GitHub Pages.

Two consequences worth knowing:

- `--frozen-lockfile` **fails the build** if `package.json` and `pnpm-lock.yaml` disagree. Any
  dependency change must commit the regenerated `pnpm-lock.yaml` alongside it. Content-only
  and component-only changes never touch the lockfile and are always safe.
- `PUBLIC_GA4_ID` and `PUBLIC_CLARITY_ID` are injected from repo secrets **at build time**.
  Local builds have neither, so GA4 and Clarity are absent locally. Local Lighthouse scores
  are therefore optimistic: production loads ~195 KB of third-party analytics that local
  builds do not. Measure the live URL before trusting a performance number.

There is no `.nvmrc`/`.node-version`, so local Node is not pinned to CI's Node 22. Adding one
is worth doing; until then, check `node -v` if local behaviour diverges from CI.
