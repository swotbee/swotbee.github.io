# HubSpot customer-contract pillar publication

Prepared October 9, 2026. The user authorized website implementation, validation, commit, push and publication after reviewing four drafts and the native-feature/cannibalization audit.

## Article ownership

| Article | Publication action | Reader takeaway |
|---|---|---|
| `/posts/hubspot-contract-management/` | Refresh existing owner; preserve July 6 publication date | Architecture decision brief and agreement field dictionary |
| `/posts/hubspot-contract-document-integrations/` | New HubSpot integration hub | Signed-document writeback specification and matching tests |
| `/posts/hubspot-renewal-pipeline-complete-guide/` | Refresh existing owner; preserve April 2 publication date | Agreement-level renewal control sheet and notice/ownership checks |
| `/posts/hubspot-quote-to-cash/` | New HubSpot implementation guide | Accepted-agreement-to-invoice reconciliation worksheet |

New articles use the actual October 9 publication date. All four use the actual update date. Review notes, local draft links and provisional-offer wording are excluded from public content. The existing `/contactus/` page receives neutral discovery enquiries; no new pricing, duration, deliverable or offer terms are introduced. The refreshed pipeline does not retain its old leakage-estimate funnel setting because the approved article uses the discovery invitation. Other pages and live offers are unchanged.

The source research and review drafts remain in the SwotBee workspace at `docs/research/hubspot-contract-management-acquisition/`. Keyword volume/KD provenance remains there; estimates are not combined or added to the articles as audience totals.

## Boundaries and links

The architecture article owns record selection. The native Contracts/renewal-quotes child owns native configuration. The renewal pillar owns notices, ownership and pipeline operations; the deal-workflow article remains one implementation path. The document hub owns creation-to-writeback decisions; future PandaDoc/DocuSign children are not published in this release. Generic CLM/CRM controls remain with the existing cross-platform framework.

The new QTC article owns HubSpot implementation. Generic QTC, CPQ comparison and software/billing comparisons retain process, distinction and buying intent. Provider-specific articles remain separate owners. No redirects, noindex changes or competing refresh URLs are introduced.

Contextual incoming links were added from:

- `how-to-integrate-clm-and-crm.md` and `contract-management-automation-workflow.md` to the document hub.
- `hubspot-contracts-renewal-quotes.md` to the document and QTC hubs.
- `quote-to-cash.md`, `quote-to-cash-vs-cpq.md`, `quote-to-cash-software.md` and `hubspot-billing-integrations-compared.md` to HubSpot QTC.

The four pillars link to one another and appropriate existing supporting articles. At release preparation, incoming article counts were architecture 12, document hub 5, renewal pillar 39 and QTC 8. These are repository link counts, not ranking or traffic metrics.

## Native-feature reconciliation

Related local corrections from the approved audit are included: native CPQ and quote approvals, direct-create beta versus quote-based access, external billing migration versus record import, calculation-property entitlement and native Contract retention reporting. Visible answers and FAQ metadata were reconciled. Commercial Contracts remain distinct from signed legal documents, deals and Subscriptions.

The ten original correction targets include the two refreshed owners. Eight other corrected sources are `contract-renewal-management-complete-guide.md`, `hubspot-billing-integrations-compared.md`, `hubspot-contracts-renewal-quotes.md`, `hubspot-renewal-deal-workflow-automation.md`, `hubspot-renewal-nrr-grr-dashboard-reporting.md`, `quote-to-cash.md`, `quote-to-cash-vs-cpq.md` and `quote-to-cash-software.md`. Two additional generic articles receive contextual links only. No service-page or early-access app rewrite is included.

## Visual assets

Eight original SVG sources live in `public/assets/posts/hubspot-customer-contracts/`: a distinct hero and worksheet diagram per pillar. They are illustrations, not product screenshots or customer results. Accessible descriptions and article alt text explain the content. The build generates ignored raster social-card derivatives; generated output is not committed.

Wide article tables have labelled, keyboard-focusable horizontal scroll regions. The renewal forecasting expression wraps as prose rather than overflowing as inline code. No shared layout or global stylesheet change was needed.

## Prepublication validation

- Frozen pnpm install from the production lockfile succeeded; no dependency or lockfile change.
- `pnpm verify` passed, including a Node 22 run matching CI: 269 pages built; social and SEO metadata checks passed; Pagefind completed.
- All four rendered pages passed desktop (1440 pixels), mobile (390 pixels) and narrow-screen (320 pixels) checks.
- Single H1, correct canonical, title/description, visible FAQ/schema agreement, Article/Breadcrumb schema, populated contents navigation, local images and absence of editorial notes were checked.
- All 36 article-body internal links across the four pillars resolved, with local anchors checked. All four canonical routes appeared in the sitemap.
- All 22 distinct official external documentation URLs returned HTTP 200 at review time. Beta/tier/seat conditions were rechecked against official documentation. Actual customer-portal availability still requires implementation testing.
- Original refresh dates and routes were preserved. No fabricated reviewer, certification, customer result or guaranteed benefit was introduced.
- Eight original illustration sources had distinct hashes. Generated social cards were validated by the standard build.
- Final diff and `git diff --check` passed. Release preparation used an isolated checkout of production `main`; unrelated working-tree changes were preserved.

The build still reports existing duplicate `!important` CSS optimizer warnings and two unrelated HTML files without an outer HTML element. No changes to those sources are included.

The previous NeuronWriter scores (69, 73, 78, 76) belong to the October 8 review bodies, not to a new evaluation of the publication rendering. Publication removes editorial scaffolding, converts links/CTAs, adds diagrams and responsive table wrappers; no new score is claimed.

## Deployment acceptance

After pushing the scoped commit to `main`, verify the GitHub Pages workflow for that exact commit and check the four live routes, canonical URLs, social-card assets and representative internal links. Do not infer deployment from a successful push alone. Monitor query/page ownership after publication; small historical overlaps did not establish harmful cannibalization.
