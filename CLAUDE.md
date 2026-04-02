# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SWOTBee is a HubSpot & Shopify consulting firm targeting mid-sized companies (50–100 employees) in Energy, Utilities, SaaS, Construction, and Manufacturing. The website is deployed as a static site to GitHub Pages at swotbee.github.io.

**What SWOTBee does:**
- HubSpot onboarding, marketing automation, sales/RevOps optimization, and third-party integrations (NetSuite, Xero, DocuSign, Zoom, Shopify, etc.)
- Builds proprietary HubSpot marketplace apps: Smart Company Picker, Smart Deal Inspector, Renewal Deal Builder, and Deal Copilot (separate `hubspot-dev` repo)
- Key differentiators: workflow-first approach (adapts HubSpot to client processes), day-one results, data quality obsession, industry-specific tooling

**ICP:** VP Sales, VP Ops, RevOps/Sales Ops leads at mid-market companies. Messaging emphasizes empathy ("Is this you?" pain points), anonymous case studies, and a risk-free engagement model (free consultation, no lock-in, 30-day satisfaction checkpoint).

## Commands

```bash
npm install --legacy-peer-deps   # Install dependencies (--legacy-peer-deps required due to peer dep conflicts)
npm run dev                      # Dev server at localhost:4321 (binds to all interfaces)
npm run build                    # Production build to ./dist/
npm run preview                  # Preview production build locally
```

No test runner or linter is configured. Validate changes with `npm run build` — Astro's build will catch type errors, broken imports, and template issues.

## Tech Stack

- **Framework**: Astro 5 (static output) with React and Alpine.js integrations
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

All service pages use V6 color tokens (`v6-copper`, `v6-teal`, `v6-dark`, `v6-text-muted`, `v6-bg`, `v6-border`). CTAs link to `/contactus`. New service pages should follow this template.

## Key Content Documents

- `docs/plans/positioning-and-differentiators-v3.md` — approved positioning, differentiators, headlines, "Is This You?" sections, testimonials, case studies, FAQ, risk reversal copy
- `docs/plans/service-page-redesign-plan.md` — shared template spec and component requirements
- `docs/plans/service-page-answers.md` — client decisions on pricing (no prices on site), engagement models, timelines, and deferred items
- `docs/hubspot-apps-copy-brief.md` — copy brief for 4 HubSpot marketplace apps (Smart Company Picker, Deal Inspector, Renewal Builder, Deal Copilot)

## File Versioning Convention

When iterating on page designs, old versions are kept as `*-old.astro` files (e.g., `hubspot-onboarding-old.astro`). Create new versioned files rather than overwriting previous designs.

## Branches

- `main` — active branch, auto-deploys to GitHub Pages
- `origin/new-website` — diverged from main. Contains: navbar redesign (dark sea-blue background, social links top bar, SVG logo, search bar removed), 4 new icon color palettes, and updated favicon assets. Potential merge conflicts in `Navbar.astro`, `global.css`, and `tailwind.config.js`.
- `origin/v1.1` – `origin/v1.9` — versioned historical branches
- `origin/old_swotbee`, `origin/master` — legacy branches

## Deployment

Pushes to `main` auto-deploy via `.github/workflows/pages-deploy.yml`. The workflow uses `npm ci --legacy-peer-deps` and Node 18. Output goes to `./dist/` and is deployed to GitHub Pages.
