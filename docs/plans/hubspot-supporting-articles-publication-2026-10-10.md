# HubSpot supporting article publication, 2026-10-10

The user authorized publication after validation. This release adds four provider supporting articles and refreshes the existing native Contracts guide at the same URL. It complements the four published pillars rather than creating new competing pillars.

## Release scope

| Article | Route | Latest NeuronWriter score | Reader outputs |
| --- | --- | --- | --- |
| DocuSign | /posts/hubspot-docusign-integration/ | 82 | Setup brief, CRM mapping worksheet, acceptance checklist |
| PandaDoc | /posts/hubspot-pandadoc-integration/ | 72 | Template/approval plan, pricing example, writeback test plan |
| QuickBooks | /posts/hubspot-quickbooks-integration/ | 72 | Invoice ownership policy, reconciliation worksheet, recovery plan |
| Stripe | /posts/stripe-hubspot-integration/ | 75 | Connection-path decision, handoff specification, event test plan |
| Native Contracts refresh | /posts/hubspot-contracts-renewal-quotes/ | 62 | Access decision, import pilot worksheet, renewal acceptance plan |

Scores are editorial checks, not ranking guarantees. The native score uses a broad mixed-intent query. Provider article bodies are unchanged from the scored drafts; promotion changes only layout and draft metadata. The native original publication date remains 2026-09-10. All new publication dates and refresh dates are 2026-10-10.

The document integration and quote-to-cash pillars now link to their two provider children. The renewal pillar already links to the existing native guide URL. All five guides link to their owning pillar. Ten original SVG diagrams are included; generated social cards remain build artifacts. The provisional CTA remains the existing contact destination, without new offer claims.

## Publication checks

- Isolated release from production main at 006f666; concurrent working-tree edits preserved.
- Node 22 and pnpm 9.12.3 production verification passed: 275 HTML pages, 542 validated social image tags and Pagefind indexing.
- All five production browser checks passed with zero failures: single H1, correct canonical and description, indexable robots, no draft banner, Article/Breadcrumb/series schema, matching visible FAQ answers, internal routes and section links, loaded imagery and three takeaways.
- Twenty-one labelled scrollable tables passed at 1280, 640, 390 and 320 CSS pixels with no page overflow.
- All five routes are present in the blog listing and sitemap; native publication date preserved.
- Scoped source and whitespace diffs reviewed. No dependency, global offer, integration-account or shared research changes.

Local build log: /tmp/swotbee-supporting-publication-build.log. Browser evidence: /tmp/swotbee-supporting-publication-review/validation.json and adjacent screenshots. These are local validation artifacts, not committed exports.

The three earlier review reports describe historical draft stages and are superseded by this publication record. The reciprocal-link patch is retained as evidence and has already been applied; do not apply it again. Excluded local draft references and original research remain preserved. Production Markdown files are now the authoritative website sources.

The release commit is the commit adding this record. GitHub Pages deploys on push to main. Confirm deployment success and the five live URLs before reporting publication complete. Search rankings and impressions require post-publication observation rather than a pre-publication guarantee.
