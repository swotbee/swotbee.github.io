# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SWOTBee is a marketing/consulting website for a HubSpot & Shopify consulting business, deployed as a static site to GitHub Pages at swotbee.github.io.

## Commands

```bash
npm install --legacy-peer-deps   # Install dependencies (--legacy-peer-deps required due to peer dep conflicts)
npm run dev                      # Dev server at localhost:4321 (binds to all interfaces)
npm run build                    # Production build to ./dist/
npm run preview                  # Preview production build locally
```

## Tech Stack

- **Framework**: Astro 5 (static output) with React and Alpine.js integrations
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin (NOT the older `@astrojs/tailwind` integration)
- **UI Libraries**: Flowbite, Embla Carousel, Framer Motion
- **Fonts**: Lexend Deca, Vollkorn, DM Sans, Hanken Grotesk, Rokkitt (loaded via `@fontsource` in BaseLayout)
- **Deployment**: GitHub Actions → GitHub Pages (triggers on push to `main`)

## Architecture

- **Layouts**: `BaseLayout.astro` is the primary layout (handles SEO, fonts, global CSS). `BlogPostLayout.astro` wraps markdown blog posts. `Layout.astro` is a simpler alternative.
- **Components split**: `src/components/astro/` for Astro components (server-rendered), `src/components/react/` for React components (client-side interactive). Astro components are the primary UI layer; React duplicates (Navbar, Hero, Footer) exist but the Astro versions are what pages use.
- **Pages**: Astro file-based routing in `src/pages/`. Blog posts are markdown files in `src/pages/posts/`. Service pages are in `src/pages/services/`.
- **Styling**: Tailwind v4 config lives in two places — `tailwind.config.js` (legacy v3 format) and `src/styles/global.css` (v4 `@theme` directives with the canonical color definitions). The v4 CSS `@theme` block is what's active.
- **SEO**: Handled via `astro-seo-plugin` with utility functions in `src/utils/seo.ts`. Sitemap generated via `@astrojs/sitemap`.

## Color System

The brand uses a specific palette defined in `src/styles/global.css` under `@theme`:
- **primary**: dark navy (#213343) — main brand color
- **secondary**: yellow (#ffe066)
- **highlight**: orange-red (#ff5c35)
- **status**: indigo (#5C62D6)
- **neutral**: teal (#70c1b3)

Additional icon color palettes exist in `origin/new-website` (not yet merged to main):
- **icon-blue** (#1ec7ff), **icon-orange** (#fe3511), **icon-gold** (#efbb03), **icon-seablue** (#00b5de)

## Branches

- `main` — active branch, auto-deploys to GitHub Pages
- `origin/new-website` — diverged from main. Contains: navbar redesign (dark sea-blue background, social links top bar, SVG logo, search bar removed), 4 new icon color palettes, and updated favicon assets. Potential merge conflicts in `Navbar.astro`, `global.css`, and `tailwind.config.js`.
- `origin/v1.1` – `origin/v1.9` — versioned historical branches
- `origin/old_swotbee`, `origin/master` — legacy branches

## Deployment

Pushes to `main` auto-deploy via `.github/workflows/pages-deploy.yml`. The workflow uses `npm ci --legacy-peer-deps` and Node 18. Output goes to `./dist/` and is deployed to GitHub Pages.
