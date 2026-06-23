# HubSpot Renewal Pipeline: Cluster Extension Plan

Applies the merged SEO pipeline (`seo-content-pipeline-neuronwriter-merged.md`) to extend
the existing "HubSpot Renewal Pipeline" cluster with net-new, non-overlapping clusters.

## System context (Framework B)
- core_topic: HubSpot renewal pipeline operations for mid-market B2B RevOps/CS teams.
- pillar (existing, P0): `/posts/hubspot-renewal-pipeline-complete-guide`
  ("The Complete Guide to Building a Renewal Pipeline in HubSpot").
- audience_persona: VP Sales/Ops, RevOps and CS leads (swotbee ICP).
- authority_goal: own the full "how to run renewals in HubSpot" topic, end to end.
- differentiation_strategy: workflow-first, real community pain points, anonymized
  client patterns, copy-paste assets. NeuronWriter terms + community insight drive depth.

## Already published (baseline, do NOT duplicate)
1. Pillar: Complete guide to building a renewal pipeline
2. Renewal deal workflow automation (auto-create renewal deals)
3. Multi-pipeline structure (renewals / expansions / downgrades)
4. Renewal forecasting accuracy
5. NRR / GRR / renewal-rate dashboards
6. 12 renewal pipeline mistakes
7. 15 custom properties for renewals
8. Renewal pipeline stages (3 models)
9. Renewal pipeline vs sales pipeline
10. Infinite-loop fix (multi-year renewal automation)

## Gap clusters (net-new) proposed

| ID | Working title | Primary keyword (NW query) | Intent | Funnel | Priority | Cannibalization guard |
|----|---------------|----------------------------|--------|--------|----------|-----------------------|
| C11 | How to Set Up Renewal Reminders & Alerts in HubSpot | `hubspot renewal reminders` | Tactical how-to | Consideration | HIGH (validated quick win, top competitor score 72) | Scope = notifying humans/tasks before renewal date; the existing "deal workflow automation" post = creating deals. Cross-link, don't repeat. |
| C12 | HubSpot Renewal Email Sequences & CSM Cadences | `hubspot renewal email sequence` | How-to + templates | Consideration | HIGH | Distinct from reminders (C11 = internal alerts; C12 = customer-facing email cadence). |
| ~~C13~~ | DROPPED (auto-renewal/contract terms): PAA intent ambiguous (HubSpot's own subscription vs customer contracts). | - | - | - | DROPPED | - |
| C14 | Renewal Risk Scoring & Health Signals in the HubSpot Pipeline | `hubspot renewal risk scoring` | How-to | Consideration | MEDIUM | Cross-link existing churn-prevention/health-scores post; scope to renewal-pipeline-stage risk, not general churn. |
| C15 | Building Renewal Quotes & Handling Price Increases in HubSpot | `hubspot renewal quote price increase` | How-to | Decision | MEDIUM | Cross-link deal line-items / clone-deal posts; scope to renewal uplift + quoting, not generic line items. |
| C16 | Co-Terming & Consolidating Renewal Dates in HubSpot | `co-terming renewals hubspot` | Advanced how-to | Consideration | LOW-MEDIUM | Niche, high-authority; no overlap. |
| C17 | Renewal Ownership & CS-to-Sales Handoff in HubSpot | `renewal ownership cs vs sales hubspot` | Process / org | Consideration | MEDIUM | Distinct from "renewal vs sales pipeline" (C9 = pipeline structure; C17 = who owns the renewal + handoff rules). |
| C18 | The HubSpot Renewal Pipeline Template (Free, Copy-Paste Setup) | `hubspot renewal pipeline template` | Resource / linkable asset | Decision | HIGH (backlink magnet) | Asset-led; links to most clusters. Avoid duplicating the pillar; this is the downloadable companion. |

## Internal linking graph (additions)
- Pillar P0 -> add outbound links to C11 through C18 (descriptive keyword anchors).
- Every new cluster -> link up to P0 (must) + 2 to 3 contextual sibling links:
  - C11 <-> C12 (reminders feed email cadence), C11 -> C14 (risk-triggered reminders)
  - C14 -> existing churn-prevention post + C11
  - C15 -> existing deal line-items post + C18
  - C16 -> C18
  - C17 -> C9 (renewal vs sales pipeline), C14
  - C18 (template) -> P0, C11, C14, C15 (hub asset)
- Anchor rules: descriptive keyword anchors, vary per target, contextual placement, no
  "click here", one anchor per target closely matching its primary keyword.

## Linkable-asset / differentiator hooks (Framework B authority engine)
- C11: a reminder-workflow blueprint (trigger logic + timing offsets).
- C12: copy-paste renewal email sequence (3 to 5 touches with timing).
- C18: the downloadable renewal pipeline template (the backlink magnet).
- Throughout: anonymized mid-market client patterns + the community pain points mined
  from `research-resources/renewals-reddit-discussions-ALL.md`.

## Execution order
1. C11 (validated quick win) -> full pipeline run (analysis already done).
2. C12, C18 (HIGH).
3. C13, C14, C15, C17 (MEDIUM).
4. C16 (LOW-MEDIUM).
5. Iterative linking updates + pillar refresh after each batch.

## Per-cluster NeuronWriter status
- C11 `hubspot renewal reminders`: analysis DONE (query_id 3a9db52787e0c4a1, target ~908
  words, top competitor score 72).
- C12 to C18: queries to be created on approval (1 credit each).
