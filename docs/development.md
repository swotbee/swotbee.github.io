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
- `src/styles/global.css`: active Tailwind 4 theme and brand tokens
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
```

A `Justfile` wraps the same commands when `just` is installed. The pnpm commands are
the canonical interface.

No general unit-test runner or linter is currently configured. `pnpm verify` runs the
production build and is the normal validation command.

For analytics, consent-banner, attribution, or third-party embed changes, also run:

```bash
PUBLIC_GA4_ID=G-TEST PUBLIC_CLARITY_ID=test pnpm build
pnpm check:consent
```

`check:consent` uses a real headless browser and requires a build containing the test
analytics identifiers. Code inspection is not a substitute for this check.

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
- Use the active brand tokens in `src/styles/global.css`.
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
