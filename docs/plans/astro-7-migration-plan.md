# Astro 7 migration plan

## Objective

Upgrade the static SwotBee website from Astro 6.4.8 to a patched Astro 7 release without changing its copy, page layout, discoverability, conversion paths, analytics behavior, or GitHub Pages deployment contract.

The migration is successful only when the generated site behaves the same in the areas that matter. A successful build alone is not enough.

Known-good starting point: `d032204d9fa026dd9f32cad8f20fe2e0123c9bbc`.

## Decision: replace `astro-seo-plugin` with a local component

Use a repository-owned `SeoHead.astro` component. Keep the existing `BaseLayout.astro` input contract and reproduce the current generated output before upgrading Astro.

Do not create a custom Astro integration for this migration.

### Why native metadata needs a wrapper

Astro can render ordinary `<title>`, `<meta>`, `<link>`, and `<script type="application/ld+json">` elements, but it does not manage the complete SEO policy for the site. If tags are written directly into layouts, the project must handle these concerns itself:

- one canonical URL per page and consistent trailing-slash normalization
- absolute Open Graph and Twitter image URLs
- omission of optional tags instead of rendering empty or `undefined` values
- consistent defaults for site name, locale, Twitter account, description, and image
- safe JSON-LD serialization
- prevention of duplicate title, canonical, social, and robots tags
- a stable typed interface shared by normal pages and Markdown posts
- regression checks that catch silent metadata loss

A local component solves these problems without depending on Astro integration hooks. It also keeps metadata visible in the page template and testable in generated HTML.

### Why a custom Astro integration is not worth maintaining here

A custom integration is technically possible, but integrations are intended for build lifecycle behavior such as changing configuration, injecting global scripts, adding routes, or transforming build output. SwotBee's metadata is page-specific and already flows through one central layout. An integration would add an Astro-version-sensitive hook layer while still needing a page-level API for titles, descriptions, images, robots directives, and schema.

The local component is the useful part of an in-house SEO package without the packaging and lifecycle overhead. It can retain the current behavior by accepting the same values currently passed to `AstroSEO` and emitting the same normalized tags. If SwotBee later needs the same implementation across several Astro sites, the component and its utilities can then be extracted into a tested package.

Reconsider a custom integration only if a future requirement genuinely needs a build hook, such as automatically validating every generated route, injecting site-wide output into pages that do not use `BaseLayout.astro`, or sharing one published implementation across multiple repositories.

## Migration strategy

1. Record the Astro 6 output and behavior before changing the SEO implementation or framework.
2. Replace `astro-seo-plugin` on Astro 6 and require metadata equivalence.
3. Upgrade Astro and its official integrations together.
4. Preserve Astro 6 whitespace behavior initially with `compressHTML: true`.
5. Adopt Astro 7's Satteri Markdown processor only if the normalized content comparison passes. Otherwise use the supported unified processor temporarily and migrate Markdown separately.
6. Fix only demonstrated compatibility regressions. Do not redesign pages or rewrite copy during this migration.
7. Run static-output, browser, conversion, analytics, security, visual, and performance gates before requesting deployment authorization.
8. Verify production and keep `d032204` as the known-good rollback point until production checks pass.

## Before and after test contract

| Area | Before-change evidence | After-change gate | Mitigation if different |
| --- | --- | --- | --- |
| Routes | Record the complete generated route set and count from Astro 6 | Exact route-set comparison | Restore missing routes or document and approve an intentional route change |
| SEO metadata | Normalize title, description, canonical, robots, Open Graph, Twitter, and JSON-LD on representative page types | Exact semantic comparison plus existing metadata checks | Fix the local SEO component; do not accept silent tag loss |
| Social images | Record absolute image URLs and verify local image files exist | `check-social-metadata` and generated-file checks pass | Correct URL normalization or image generation before continuing |
| Markdown | Record meaningful text, heading levels and IDs, links, tables, code blocks, and raw HTML for all posts | Normalized full-post comparison and representative visual inspection | Fix the processor/configuration or temporarily retain unified processing |
| Whitespace | Record text around adjacent inline elements on representative pages | Assertions show no joined words; visual review confirms spacing | Keep `compressHTML: true` or add explicit spaces only where verified necessary |
| Sitemap | Record URL set, exclusions, and `lastmod` values | Exact semantic comparison | Fix integration/config behavior before release |
| Redirects | Record each generated redirect stub, canonical, refresh target, and destination response | Exact destination comparison | Repair redirect configuration or generated output |
| RSS and search | Record RSS entry URLs and Pagefind page and word inventory | No missing entries or unexpected content loss | Trace Markdown or route changes and rebuild indexes |
| Images | Run Sharp native processing and record representative generated formats and dimensions | Native processing and representative image requests succeed | Resolve Sharp/libvips or Astro image changes before browser testing |
| Astro templates | Astro 6 build establishes accepted output | Astro 7 build has no compiler errors and invalid nesting is corrected | Make focused markup fixes without changing copy or layout |
| React and Alpine | Record representative interactive controls and console behavior | Hydration, navigation, accordions, and carousels work without new errors | Align integration peers or fix only the affected component |
| Forms and booking | Record invalid-form behavior, CTA navigation, scheduler load, booking messages, and attribution events | Browser checks reproduce the event and validation contract | Fix the conversion path before security cleanup or release |
| Consent and analytics | Build with test GA4 and Clarity IDs and run all consent states | `pnpm check:consent` passes and network activity stays gated | Restore script order or integration behavior; never weaken consent rules |
| Security | Record the Astro 6 `pnpm audit` result and resolved dependency paths | No critical or high findings after Astro 7 | Upgrade or pin the affected transitive dependency and retest |
| Visual output | Capture representative desktop and mobile pages | No material copy, spacing, layout, focus, or responsive regression | Fix the responsible compiler/config/component change |
| Performance | Record production-like compressed Lighthouse and asset sizes with test analytics | LCP below 2.5 seconds, CLS below 0.1, and material bundle changes explained | Investigate asset, hydration, font, or script changes before release |
| Deployment | Record the known-good Pages workflow and production smoke results | GitHub Pages succeeds and production passes route, metadata, interaction, and network checks | Roll back to `d032204` if a release-blocking issue cannot be corrected promptly |

Comparison tooling must ignore hashed asset filenames and documented cosmetic CSS serialization changes. It must not ignore visible text spacing, route differences, metadata values, link targets, structured-data semantics, or asset availability.

## Dependency-ordered task list

### 1. `TASK-557b45b21940`: Capture the Astro 6 migration baseline and regression contract

Depends on the completed security patch task `TASK-3fed148100fc`.

Build the known-good Astro 6 revision with test analytics identifiers. Add reproducible capture and comparison tooling for routes, metadata, representative HTML, sitemap, redirects, Markdown, RSS, Pagefind, images, asset sizes, and browser-visible behavior. Prove the comparator detects a controlled change.

No framework or SEO implementation starts before this baseline is accepted.

### 2. `TASK-29635a9140e7`: Replace `astro-seo-plugin` with a local typed SEO head component

Depends on task 1.

Implement `SeoHead.astro` while still on Astro 6. Preserve the current `BaseLayout.astro` inputs and generated metadata. Remove `astro-seo-plugin` only after normalized metadata and JSON-LD match the baseline and the existing social and SEO checks pass.

### 3. `TASK-15bf9d07fb34`: Upgrade Astro, Node baseline, Vite, and official integrations

Depends on task 2.

Upgrade Astro and the official React, Alpine, sitemap, Vite, and peer dependencies together using pnpm. Pin a Node 22 version that satisfies Astro 7 locally and in CI. Explicitly preserve old whitespace handling during the first upgrade. Make the Markdown processor choice visible in configuration and documentation.

### 4. `TASK-5463b2100314`: Resolve Astro 7 compiler, template, CSS, and image build regressions

Depends on task 3.

Classify and fix errors from the Rust compiler, Vite 8, integrations, Tailwind, and image pipeline. Correct invalid markup without redesigning pages. Verify the production build, route inventory, social image generation, Sharp native processing, and representative hydration.

### 5. `TASK-cd1d534f33b9`: Validate Markdown, SEO, sitemap, redirects, RSS, and search output

Depends on task 4.

Run the normalized full-site comparison. Inspect every semantic difference in Markdown and discoverability output. Fix unexpected changes and document only differences that are intentionally equivalent.

Validation decision: retain the supported unified Markdown processor because the
Astro 7 Satteri default changed published text and reduced indexed content. Unified
preserves the Astro 6 words, headings, anchors, links, metadata, structured data,
sitemap, redirects, and RSS output. It intentionally corrects only malformed curly
quote direction on six posts. The semantic comparator treats left and right curly
quotes as typographically equivalent, while the visual comparison still exposes any
rendering change. Six representative Pagefind queries must return the same result
counts and top-ten URL order on the Astro 6 and Astro 7 builds.

### 6. `TASK-1c7a851ac014`: Validate interactive UI, forms, booking, analytics, consent, and attribution

Depends on task 5.

Use a production-like local server and real browser checks at mobile and desktop sizes. Verify Astro pages, React islands, Alpine controls, forms, booking, CTA events, scheduler events, GA4, GTM, Clarity, consent, and session attribution. Real external form submission remains opt-in and needs separate approval.

The cross-version browser matrix covers the homepage React demo modal and focus
return, testimonial carousel, mobile navigation, Alpine initialization, CTA event,
Cal.com readiness/error/success callbacks, booking redirect payload, FAQ controls,
last-touch session attribution, invalid contact-form rejection, and the interactive
scorecard. External requests are blocked and the scorecard endpoint is fulfilled
locally, so the test never creates a lead, booking, or production scorecard record.

### 7. `TASK-71e038abf6d4`: Reconcile Astro 7 dependency security and remove obsolete overrides

Depends on task 6.

Run `pnpm audit`, inspect the resolved dependency graph, and test each temporary override. Remove only overrides made unnecessary by Astro 7. Require a frozen install, build, Sharp smoke test, and zero critical or high findings.

### 8. `TASK-416704001c57`: Run the Astro 7 release-candidate regression and performance gate

Depends on task 7.

Validate from a clean frozen install. Run all checks, review representative visual differences, compare production-like performance and bundles, inspect the final Git diff, and write a go or no-go report with exact versions, intentional differences, remaining advisories, and rollback point.

### 9. `TASK-ad40801a8e7f`: Deploy Astro 7 and verify production behavior

Depends on task 8 and explicit push authorization.

Push the reviewed commits, monitor GitHub Pages, and verify production routes, metadata, images, redirects, sitemap, RSS, search, forms, booking, consent-gated analytics, browser console, network behavior, and performance. Keep the previous commit available for rollback until the production gate passes.

## Stop conditions

Stop and report before proceeding when any of these occurs:

- normalized canonical, robots, social, or JSON-LD output is missing or materially different
- a route, sitemap entry, redirect, RSS entry, or Pagefind page disappears unexpectedly
- Markdown text or heading anchors change in a way that can affect readers or inbound links
- words join because of whitespace compression
- browser hydration, navigation, booking, form, consent, analytics, or attribution behavior regresses
- `pnpm audit` reports a critical or high finding
- Lighthouse exceeds the agreed LCP or CLS limits or a material asset increase has no explanation
- unrelated working-tree changes overlap a migration file
- deployment would be required without current authorization

## Rollback

Before deployment, rollback means reverting only the migration commits while keeping unrelated work intact. After deployment, the known-good code point is `d032204d9fa026dd9f32cad8f20fe2e0123c9bbc`. Use a normal revert or corrective commit rather than destructive Git history changes. A production rollback does not replace root-cause analysis or the before-and-after regression report.
