# Astro 7 migration release-candidate report

Date: 2026-10-04

## Decision

**GO for review and push.** The Astro 7 candidate passes the local release gate with no user-visible regression in the tested pages, conversion paths, discoverability output, search results, or performance.

This report does not authorize or record a push, deployment, or production change. Production verification remains task `TASK-ad40801a8e7f` and requires explicit push authorization.

## Candidate

- Branch: `codex/astro-7-migration`
- Comparison base and rollback point: `d032204d9fa026dd9f32cad8f20fe2e0123c9bbc`
- Reviewed commit range: `d032204d9fa026dd9f32cad8f20fe2e0123c9bbc..56792c5`
- Astro: `7.3.5`
- Node requirement: `>=22.12.0`
- Vite: `8.3.2`
- React integration: `@astrojs/react@7.0.0`
- Alpine integration: `@astrojs/alpinejs@1.0.0`
- Sitemap integration: `@astrojs/sitemap@3.7.4`
- Markdown integration: `@astrojs/markdown-remark@7.3.1`
- React Vite plugin: `@vitejs/plugin-react@6.1.1`

## Release-gate results

| Gate | Result |
| --- | --- |
| Clean dependency install | `pnpm install --frozen-lockfile` passed |
| Full repository verification | `pnpm verify` passed |
| Generated site | 269 HTML files and 267 built pages |
| Social metadata | 159 checks passed |
| Pagefind | 267 documents and 9,913 indexed words |
| Routes and discoverability | Routes, metadata, JSON-LD, sitemap, redirects, RSS, headings, anchors, links, and forms passed semantic comparison |
| Search parity | Six queries retained identical result counts and top-ten URL order |
| Visual parity | 18 of 18 desktop and mobile screenshots had exact image hashes across nine representative page types |
| Browser behavior | Cross-version interaction snapshots matched with zero browser errors and zero external submissions |
| Consent | All 17 consent and analytics checks passed |
| Reporting forms | All four report signup pages passed read-only checks |
| Reporting resource | Download, event-contract, and 390 px overflow checks passed |
| Image pipeline | Sharp generated the expected 96 x 97 WebP image |
| Dependency audit | `pnpm audit --json` reported zero findings across 695 dependencies |

The baseline comparator also detected simulated route and canonical regressions, which confirms that the comparison is capable of failing on the main release-blocking differences.

## Performance comparison

Both versions were served as production builds with compressed local responses and measured with Lighthouse 13.0.1 using its mobile profile.

| Metric | Astro 6.4.8 | Astro 7.3.5 | Result |
| --- | ---: | ---: | --- |
| Performance score | 96 | 96 | No regression |
| First Contentful Paint | 2,030.3 ms | 2,029.7 ms | Equivalent |
| Largest Contentful Paint | 2,480.3 ms | 2,479.7 ms | Passes the 2.5 s gate |
| Cumulative Layout Shift | 0.0294 | 0.0294 | Passes the 0.1 gate |
| Total Blocking Time | 12.0 ms | 11.5 ms | Equivalent |
| Speed Index | 2,030.3 ms | 2,029.7 ms | Equivalent |
| Page transfer | 721,182 bytes | 718,865 bytes | 2,317 bytes lower |

## Built asset comparison

| Asset group | Astro 6.4.8 | Astro 7.3.5 | Difference |
| --- | ---: | ---: | ---: |
| All `_astro` assets | 116,186,992 bytes | 116,180,930 bytes | -6,062 bytes (-0.01%) |
| CSS | 219,565 bytes | 217,011 bytes | -2,554 bytes |
| JavaScript | 281,792 bytes | 278,284 bytes | -3,508 bytes |
| Images and fonts | Unchanged | Unchanged | 0 bytes |

## Intentional differences

- The unsupported `astro-seo-plugin` is replaced by the repository-owned, typed `SeoHead.astro` component. Normalized metadata and structured-data output remain semantically equivalent.
- The supported unified Markdown processor is retained. Astro 7's Satteri default changed published text and reduced Pagefind content in the comparison build.
- Curly quote direction is corrected on six Markdown posts. The words and meaning are unchanged.
- Literal backslashes before ampersands are removed from three old service pages. This corrects visible punctuation without changing their copy or layout.
- Twelve obsolete dependency overrides are removed because Astro 7 resolves the same safe versions without them. Active pins remain for `esbuild@0.28.2` and `http-cache-semantics@4.3.0`.

## Existing non-blocking warnings

- Existing typography CSS contains duplicate `!important !important` declarations.
- Pagefind reports two existing routes without an outer `<html>` element: `/renewal-operations-animated-v3/` and `/posts/Pendo HubSpot Integration_ Boost Customer Insights/`.

These warnings predate the migration and did not create a measured output, interaction, or performance regression. They should be handled separately rather than expanding the migration scope.

## Diff and workspace review

The reviewed migration contains 17 tracked files across seven local commits before this report. Changes are confined to dependency and Astro configuration, migration tooling and evidence, the SEO compatibility component, and three verified punctuation fixes.

The unrelated uncommitted edit in `src/pages/resources/contract-tracker-template.astro` is not staged and is not included in any migration commit.

## Production gate still required

After explicit push authorization:

1. Push the reviewed branch and monitor the GitHub Pages workflow to completion.
2. Verify production routes, canonical and social metadata, JSON-LD, images, redirects, sitemap, RSS, and Pagefind search.
3. Exercise navigation, forms, booking, consent, attribution, and analytics while checking the browser console and network requests.
4. Recheck production performance and compare it with this local baseline.
5. Keep `d032204d9fa026dd9f32cad8f20fe2e0123c9bbc` available as the rollback point until the production gate passes.
