# HubSpot supporting articles: website draft review

Prepared 2026-10-10. Status: website-format drafts awaiting editorial and publication approval. Four provider articles support the existing pillars; the fifth article refreshes an existing native setup guide.

## Scope and review assets

Website sources: `src/pages/posts/_drafts/`. Final names and intended slugs are retained. The existing public native Contracts file is preserved. No live offer, deployment, push, dependency or shared layout change is part of this work.

The accepted research is in the workspace's `docs/research/hubspot-contract-management-acquisition/article-drafts/supporting-batch-1/`. Its briefs, keyword provenance, original drafts and NeuronWriter evaluations remain unchanged. No overlapping variants are summed. No additional search volume is invented.

| Draft | SEO title length | Description length | Visible/schema FAQs | Existing NeuronWriter score |
| --- | ---: | ---: | ---: | ---: |
| `hubspot-docusign-integration.md` | 53 | 155 | 5 | 72 |
| `hubspot-pandadoc-integration.md` | 55 | 155 | 5 | 67 |
| `hubspot-quickbooks-integration.md` | 50 | 152 | 5 | 66 |
| `stripe-hubspot-integration.md` | 54 | 154 | 6 | 66 |
| `hubspot-contracts-renewal-quotes.md` | 49 | 154 | 6 | 62 |

Scores above are the 2026-10-09 research-body evaluations in the authorized NeuronWriter project. They have not been presented as new scores for the website rendering. Conversion removes the duplicate H1/manual contents, converts sibling links to final routes, makes FAQ questions headings, wraps tables and adds diagrams. The researched explanatory text and selected SEO titles/descriptions are retained. Scores are an optimization diagnostic, not a ranking guarantee or proof of Google/Bing intent agreement.

Update after the reader-takeaway edits: [the 2026-10-10 website rescore](hubspot-supporting-articles-neuronwriter-rescore-2026-10-10.md) returned the same scores, 72/67/66/66/62. All five exceed their returned competitor medians; all remain below the maximum. The existing published native guide scored 63 on the same query. See that report for methodology, historical pillar comparisons and a prioritized SEO polish recommendation.

Latest update: the [authorized SEO polish](hubspot-supporting-articles-seo-polish-2026-10-10.md) is complete. Fresh scores for the four edited provider drafts are **82/72/72/75** in the same order; the native guide remains unchanged at its last score of **62**. All three takeaways, FAQ data and keyword boundaries are preserved. The revised build and five-article browser checks passed again.

## Article boundaries and cannibalization guards

- DocuSign and PandaDoc own provider-specific setup, supported mappings, approvals/signing and required CRM return. The document integration pillar retains its comparison and end-to-end workflow.
- QuickBooks owns Online connector setup, invoice ownership and reconciliation. Stripe owns the distinction between payment processing, existing data sync and migration. The HubSpot quote-to-cash pillar retains the complete commercial and finance handoff.
- The native guide owns creation/import/renewal-quote setup at the existing `hubspot-contracts-renewal-quotes` route. Broad architecture remains with `hubspot-contract-management`; pipeline design remains with `hubspot-renewal-pipeline-complete-guide`.
- Established reminders, properties, deal automation and reporting owners remain linked. No competing new articles for those intents are created.

## Reciprocal links to apply at promotion

These links are prepared and tested in the separate local review checkout. They have not been added to the working website's published pillar files, where they would lead to excluded drafts.

The exact four-link change is saved in [the reciprocal-link patch](hubspot-supporting-articles-reciprocal-links-2026-10-10.patch). Apply it only when its destination articles are promoted, and update those parents' `modifiedDate` to their actual edit date. The patch targets published baseline `006f666266b85810a0693927cfba1249b7718963`; check current parent text before applying it to a newer branch.

| Published parent section | New child link and anchor |
| --- | --- |
| Document integrations: PandaDoc section | `/posts/hubspot-pandadoc-integration/`, HubSpot PandaDoc setup and writeback guide |
| Document integrations: DocuSign section | `/posts/hubspot-docusign-integration/`, HubSpot DocuSign setup and CRM writeback guide |
| HubSpot quote-to-cash: QuickBooks section | `/posts/hubspot-quickbooks-integration/`, HubSpot QuickBooks invoice sync and reconciliation guide |
| HubSpot quote-to-cash: Stripe section | `/posts/stripe-hubspot-integration/`, Stripe HubSpot connection decision guide |

Insert each after the section's existing direct answer. Preserve useful parent summaries. The renewal pillar already links to the native guide's existing route. Each child links near its opening to its primary pillar, with further contextual links to relevant existing owners. Accounting siblings link to each other where the handoff requires it.

## Review checks

- [x] Convert all five complete articles into the website's Markdown/frontmatter format.
- [x] Preserve final names, native route and original native publication date.
- [x] Mark each as a draft and use the router-excluded `_drafts` directory.
- [x] Exclude editorial research briefs from reader-facing copy.
- [x] Let `BlogPostLayout.astro` supply the single H1 and automatic contents.
- [x] Mirror 27 visible FAQ answers in frontmatter without inventing a reviewer.
- [x] Add five distinct hero diagrams and five separate explanatory workflow diagrams, labelled as conceptual models.
- [x] Ignore only this batch's five build-generated social PNG derivatives; preserve SVG sources in Git.
- [x] Keep 21 tables inside labelled, keyboard-focusable horizontal scroll regions.
- [x] Retain copyable worksheets, concrete examples, limitations and acceptance checks.
- [x] Keep the provisional CTA neutral and link to `/contactus/`.
- [x] Reopen the primary official DocuSign, PandaDoc, QuickBooks, Stripe and Contract import documentation on 2026-10-10. Retain the prior detailed licensing/beta checks and their citations.
- [x] Complete rendered preview validation and record the result below.
- [ ] Obtain editorial approval and publication authorization for this new batch.

## Completed website validation

Validation used an isolated website checkout based on published commit `006f666266b85810a0693927cfba1249b7718963`, rather than the working checkout's older content baseline and unrelated modified files.

- Normal `pnpm verify`, Node 22.12.0: passed. The build produced 271 HTML pages. All four new article routes and the `_drafts` route were absent; none of the new article URLs appeared in the sitemap. The existing native Contracts route remained present. The post globs exclude `_drafts`, preventing draft listing and related-post exposure.
- Separate local-only review build, `pnpm verify`: passed, with 275 HTML pages and 542 validated social image tags. It temporarily promoted the five copies and applied the prepared parent links for review. Every review article carried `noindex, follow` and a visible draft notice.
- Real Chromium checks: all five articles passed at 1280, 640, 390 and 320 CSS pixels, with no page-level horizontal overflow. The 640px check covers the reflow equivalent of 200% zoom on a 1280px viewport. Tables retain their own labelled, keyboard-focusable scroll regions.
- Each preview had one correct H1, the expected description, the intended canonical URL, Article and Breadcrumb schema, the correct pillar relationship and working contents links. All 27 FAQ schema answers matched visible answers after normalizing typographic quotation marks. All article-body internal routes resolved, with trailing slashes.
- Ten hero/inline image references loaded with alt text. Desktop and mobile screenshots were captured for every article; visual inspection covered each article and the native/Stripe/DocuSign workflow diagrams. All five rendered acceptance checklists remained present.
- No forms, live payment actions, envelope sends, integration configuration changes or third-party browser requests were made. No additional NeuronWriter credits were consumed for this format conversion.
- The existing working-checkout edits remained intact. Scoped draft whitespace checks and repository `git diff --check` passed. No build errors were found.

The local preview is served at `http://127.0.0.1:4396/` while the review server is running. Open the intended `/posts/<filename-without-md>/` routes there. The preview is a local build, not a publication. Evidence and screenshots are local at `/tmp/swotbee-supporting-blog-review/validation.json` and the adjacent PNG files; production-exclusion evidence is `/tmp/supporting-blog-exclusion.json`. Those temporary files are not committed artifacts.

The isolated checkout is `/tmp/swotbee-supporting-drafts-20261010` on `codex/supporting-blog-drafts-20261010`. Temporary routed source copies and parent edits were removed after validation; the local review build remains in its generated `dist/`. Rebuilding that checkout normally will exclude the drafts again. The authoritative website drafts are in the workspace's `website/src/pages/posts/_drafts/`.

## Reader-value audit, 2026-10-10

All five articles already contained usable implementation assets. Their initial single takeaway paragraph made the separate outputs less clear. It has been replaced with three numbered, section-linked takeaways and a concrete first action in each website draft. The original shared research drafts remain unchanged.

| Article | Reader's question addressed | Three usable outputs |
| --- | --- | --- |
| DocuSign | How do I connect the correct senders and get signed information onto the correct CRM record? | Setup brief; envelope/version/agreement mapping worksheet; signing/writeback acceptance checklist |
| PandaDoc | How do I create the right document, preserve pricing and return approved terms? | Workspace/template/approval plan; recurring versus one-time worked example; CRM return worksheet and tests |
| QuickBooks | Which app and invoice owner should I use, and how do I reconcile or repair sync? | Invoice ownership policy; filled reconciliation worksheet; failed-match recovery and rollout checks |
| Stripe | Do I need payment processing, existing subscription visibility or billing migration? | Connection decision; billing-controller/CRM handoff specification; payment-event and reconciliation tests |
| Native Contracts | Which native path can my account use, and how do I test imports and renewal quotes? | Access decision table; two-agreement setup/import pilot; renewal acceptance checks |

Editorial judgment: each draft satisfies the requested minimum of two or three takeaways, with three distinct outputs. Each output has supporting instructions, a concrete example or a copyable checklist in the body. This is a content audit, not a claim that readers have been usability-tested or that the worksheets configure an integration automatically.

The takeaway edit itself introduced no new capability or outcome claims, keyword ownership changes or paid API calls. A subsequent user-authorized rescore of all five rendered drafts on 2026-10-10 returned unchanged scores; results and comparisons are recorded in the linked rescore report above.

Takeaway-edit validation: the Node 22 `pnpm verify` review build passed. All five Chromium previews rendered exactly three introductory takeaways; every new section link resolved. The existing FAQ/schema, image, internal-route and 1280/640/390/320px overflow checks passed again with zero failures. Draft flags, filenames, metadata and publication exclusions are preserved. Temporary routed review copies were restored after validation, leaving only the excluded drafts as source changes.

## Practical limits

These are documentation-backed implementation guides. No connected customer portal, live invoice, payment, envelope or provider workflow has been tested in this content session. Product entitlements, rollout access, regional conditions, accounting treatment and exact configured synchronization still require portal-specific acceptance checks. No claim of a fresh manual Bing first-page audit is made.

New article dates are provisional draft dates. The native guide's original publication date is preserved, but its proposed refresh date must be changed to the actual publication date when promoted.

The existing published four pillars are unchanged by this draft integration. The next step is reviewing the article text and rendered preview, then approving promotion, reciprocal links, a fresh production build and a scoped website commit/push.
