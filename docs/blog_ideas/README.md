# Blog Ideas Backlog

> This folder is an **unscheduled idea backlog**, not active work. Files here are raw
> research, keyword dumps, or synthesized plans dropped in for later. Nothing in this
> folder should be turned into a published post without a deliberate pickup step: run the
> gap analysis in `docs/plans/seo-content-pipeline-neuronwriter-merged.md` (and the
> practical version in `docs/plans/blog-creation-playbook.md`) against `src/pages/posts/`
> first, since SWOTBee already has 33 published renewal/RevOps articles and several
> entries below overlap that ground.

## research_papers/ — academic and discussion-volume research (backlink-bait candidates)

Three AI-generated research dumps, useful as source material for data-driven "here's
what the research actually says" articles that other sites would want to cite/link to.
**None of these are SEO-keyword-researched** (no search volume, no SERP data) — they are
raw proof-point mining, so still run each chosen angle through NeuronWriter before
drafting.

**Caveat before citing anything from these as backlink bait:** treat every statistic as
needing independent verification against its primary source before it goes in a
published article. In particular, `B2B Marketing Research Analysis.md`'s stats read as
synthesized rather than sourced (some cited domains are non-canonical stand-ins for
Gartner/Forrester-style reports), and vendor stats surfaced across all three files
(e.g. ABM's "+171% ACV" claim) are explicitly flagged inside the docs themselves as
vendor benchmarks, not peer-reviewed evidence — which is actually a good contrarian
angle ("the stat everyone cites isn't real research") if verified and framed that way.

- **`B2B Marketing Research Analysis.md`** — a discussion-volume digest ranking ~20
  external B2B marketing publications from a 30-day window by a "Composite Discussion
  Score" across LinkedIn/Reddit/arXiv/Substack/podcasts. Net-new angles (low overlap with
  existing site content): AEO ("answer engine optimization" — AI search engines cite a
  source URL only 5-32% of the time), B2B buying committees growing to ~13+9
  stakeholders, agencies losing retainers to in-house AI, B2B influencer marketing ROI.
  Higher-overlap angles to gap-check first: CFO/finance-vs-marketing attribution gap, ABM
  vs. demand-gen convergence, predictive lead scoring by "persuadability."
- **`B2B Meta Research Opportunities Analysis.md`** — an academic meta-analysis
  opportunity scan (10 proposed literature-review papers, scored for journal
  publishability, not blog readability). Useful for proof points/citations on: customer
  success management → renewal, churn prediction (usage vs. relationship signals), ABM
  ROI (~30% sales-growth stat), sales-marketing alignment (cites the classic Homburg &
  Jensen "Thought Worlds" paper), product-usage metrics that predict SaaS renewal,
  executive sponsorship in enterprise renewals, B2B service-recovery paradox. Most
  overlap existing renewal-cluster content; ABM, content-format comparison, and service
  recovery are the least-covered.
- **`compass_artifact_wf-4b4bbf0c-...-text_markdown.md`** — a companion literature-gap
  scan (12 topics: switching costs, ABM, CSM, relationship quality, sales-marketing
  alignment, KAM, social selling, AI/ML in B2B sales, churn prediction, content
  marketing, brand equity, buying-center behavior). Strongest contrarian hooks: "social
  selling helps acquisition but not retention" (Terho et al. 2022), "add-ons at
  onboarding can hurt retention" (Palmatier et al. 2025), and the sales-marketing
  "208% more revenue" stat being a vendor benchmark, not peer-reviewed.
- **`meta-research-topic-synthesis-and-top10.md`** — the synthesized pickup plan built
  from the two meta-analysis docs above: all 15 unique proposed topics deduplicated into
  one table, three possible execution tracks (real academic meta-analysis vs. a
  practitioner narrative-synthesis pillar vs. hybrid original research using SwotBee's
  own client data), and a top-10 re-ranked for SwotBee's actual business rather than for
  journal publishability. Start here instead of re-deriving a ranking from the two raw
  docs.

**Suggested deliverable when picked up:** a short "state of the research" pillar or
recurring series (e.g. "What the research actually says about B2B renewal") that cites
the underlying peer-reviewed/primary studies these docs point to, framed for SWOTBee's
mid-market RevOps audience, not the academic audience the docs were originally written
for. Skip the CSM/churn/switching-cost/alignment angles that duplicate the existing
renewal cluster unless writing a deliberately contrarian take.

## metrics/ — RevOps & Sales Ops metrics content series

6 files for a RevOps & Sales Ops metrics LinkedIn/social content series. 5 are raw
research (each mapping ~50 practitioner-sourced problems to a specific metric, mined from
Reddit/RevOps Co-op/RevGenius/LinkedIn). The 6th, `LinkedIn Content Opportunity
Report...md`, is the actual synthesized plan built from the other 5 (100 ranked post
ideas, 10 frameworks, a 90-day calendar, a pillar strategy) — start there rather than
re-deriving a plan from the raw 5. Several ranked problems overlap already-published site
content (NRR/GRR, deal hygiene, renewal forecasting); gap-check before writing.

## 10-exact-hubspot-data-cleanup-methods.md

Future pillar article + a LinkedIn lead-magnet post pointing back to it. Overlaps with
the already-published `hubspot-deal-duplication-best-practices.md` (deduplication vs.
cloning distinction) — gap-check before writing.

## nonporfit/, nonprofit_keywords.md, webdesign/kanopi...md — nonprofit keyword research

Three files (`nonprofit_keywords.md`, `nonporfit/donorbox-Categorized Nonprofit-Related
Keywords.md`, `webdesign/kanopi -Nonprofit Website Keyword Classification.md`) filtering
and categorizing nonprofit-sector keywords (fundraising, board retreats, Giving Tuesday,
nonprofit website examples, etc.) from a keyword-research-tool export. **Off-strategy
flag:** SWOTBee's stated ICP is mid-market Energy/Utilities/SaaS/Construction/
Manufacturing (`CLAUDE.md`), not nonprofits — confirm there's an actual nonprofit
offering or persona before writing from these, otherwise this is backlog with no owner.

## starters/Keyword Filtering for HubSpot Starters.md

Beginner/free-tier HubSpot keyword categorization (onboarding, CRM setup, CMS basics,
starter tutorials). Feeds a "getting started with HubSpot" top-of-funnel cluster if
SWOTBee wants to target the free-tier/starter audience rather than only mid-market.

## 20 Trending Blog Topics for 2025.md

A generic, AI-generated 20-topic list (HubSpot/CRM innovation, ecommerce trends,
automation, marketing/content trends) sourced by prompting an AI for "trending 2025
topics," not from keyword or community research. Low specificity and no proof points —
use only as a topic checklist to sanity-check gaps, not as a primary source.

## When picking any of this up

1. Gap-check the chosen topic against `src/pages/posts/` (33 renewal/RevOps articles
   already published).
2. Run `docs/plans/seo-content-pipeline-neuronwriter-merged.md` /
   `docs/plans/blog-creation-playbook.md` — NeuronWriter query, research pass, draft,
   score, publish.
3. For `research_papers/` sources specifically, verify any cited statistic against its
   primary source before publishing (see caveat above).
