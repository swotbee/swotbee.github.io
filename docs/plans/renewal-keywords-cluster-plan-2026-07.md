# Cluster Plan: Covering the Google Ads Renewal Keyword Set (July 2026)

Source keyword set: `marketing/seo/google-ads-renewal-keywords.md` (252 keywords, 5 angles)
Volume data: `marketing/seo/semrush/google-ads-renewal-keywords-top100 semrush-export-100.csv`
and `...top100to200 semrush-export-100.csv` (200 checked; 57 with volume, all KD <= 35)
Search Console baseline: `marketing/seo/search-console-2026-06-30/`

Status: PLAN, awaiting approval before firing NeuronWriter queries.

## What the data says

1. The clone angle (Angle 1) and the NetSuite core (Angle 3) are ALREADY covered by
   existing clusters and are already ranking (positions 6 to 9 in Search Console).
   Action there is UPDATE, not new posts.
2. Two whole angles have zero blog coverage and excellent numbers:
   - Contract renewal management: 210 + 170 + 140 + 140 + 90 vol, KD 11 to 16, CPC up
     to 70 USD. The single best money cluster in the set.
   - CS platform conquest: churnzero pricing (390, KD 19), gainsight pricing (260,
     KD 25), plus a bed of KD 0 to 9 "alternative" and "hubspot integration" terms with
     CPCs from 22 to 99 USD.
3. One orphan quick win: "hubspot erp integration" (110 vol, KD 3), the best
   volume-to-difficulty ratio in the entire set.
4. The three new landing pages (/compare/hubspot-renewal-apps,
   /integrations/hubspot-netsuite-renewals, /renewals-for-msps) are conversion pages.
   Blog clusters must feed them links, not compete with them.

## New Pillar A: Contract Renewal Management (PRIORITY 1)

Pillar title: **"Contract Renewal Management: The Complete B2B Guide (Process, Software, and Templates)"**
Slug: `/posts/contract-renewal-management-complete-guide`
Primary keyword: contract renewal management software (140, KD 14, CPC 69.86);
secondary: renewal management software (170, KD 14), contract renewal software (140,
KD 16), contract renewal management (50, KD 14).

| ID | Cluster title (working) | Slug | Primary keyword (vol/KD) | Also absorbs |
|---|---|---|---|---|
| A1 | How to Manage Contracts in HubSpot: Renewals, Reminders, and Reporting | hubspot-contract-management | hubspot contract management (210/11, CPC 38.66) | manage contracts in hubspot (20/5), hubspot contract renewal tracking, hubspot contract renewal automation, track contract end dates in hubspot, hubspot contract end date property |
| A2 | The Contract Renewal Process: Steps, Checklist, and Timeline | contract-renewal-process-checklist | contract renewal process (90/13) | contract renewal checklist (20/5), renewal management process (40/17), b2b contract renewal best practices |
| A3 | Renewal Tracking: Spreadsheet Template vs Software (and When to Switch) | renewal-tracking-software-vs-spreadsheet | renewal tracking software (40/4, CPC 24.73) | contract renewal tracking spreadsheet (20/4), renewal tracker templates, contract expiration tracking software, client renewal tracker, move renewals from spreadsheet to crm |
| A4 | Renewal Reminder Systems: Software, Workflows, and Email Templates | contract-renewal-reminder-software | contract renewal reminder software (40/8) | renewal reminder email template (20/11), renewal reminder automation, contract expiry reminder software, renewal calendar software, renewal date reminder app |
| A5 | The Renewal Playbook: Templates, Handoffs, and Cadence | renewal-playbook-template | renewal playbook template (20/8) | customer success renewal process (20/5), renewal handoff from sales to customer success, csm renewal tracking, account management renewal process |

Cannibalization guards: A4 must cross-link `hubspot-renewal-reminders` (which owns the
in-HubSpot how-to) and target the software-category intent instead. A1 links to the
pillar and to `/renewal-operations` as conversion page. A3 ships the spreadsheet template
as the lead magnet (matches the Angle 5 ads landing strategy).

## New Pillar B: Customer Success Inside HubSpot / CS Platform Conquest (PRIORITY 2)

Pillar title: **"Customer Success in HubSpot: Run Renewals Without a Separate CS Platform"**
Slug: `/posts/customer-success-in-hubspot`
Primary keyword: customer success in hubspot (20/35); secondary: customer success
software for hubspot, hubspot for customer success teams, customer success inside hubspot.
(The pillar's own terms are modest; its job is to anchor the conquest clusters below,
which carry the volume.)

| ID | Cluster title (working) | Slug | Primary keyword (vol/KD) | Also absorbs |
|---|---|---|---|---|
| B1 | ChurnZero Pricing: What It Costs and When HubSpot Is Enough | churnzero-pricing-alternatives | churnzero pricing (390/19, CPC 37.87) | churnzero alternative (10/2, CPC 99!), churnzero hubspot integration (20/9) |
| B2 | Gainsight Pricing and Alternatives for HubSpot Teams | gainsight-pricing-alternatives-hubspot | gainsight pricing (260/25, CPC 22.24) | gainsight alternative (30/0), affordable gainsight alternative, gainsight alternatives for small business, gainsight for hubspot, gainsight hubspot integration (30/7) |
| B3 | HubSpot Customer Success Workspace: Setup, Limits, and Renewal Use | hubspot-customer-success-workspace | hubspot customer success workspace (90/19) | customer success in hubspot support terms, hubspot native customer success app |
| B4 | CS Platform HubSpot Integrations Compared: Vitally, Planhat, Totango, Catalyst, ClientSuccess | cs-platform-hubspot-integrations-compared | planhat hubspot integration (30/2) | vitally hubspot integration (20/0), totango hubspot, catalyst hubspot integration, clientsuccess hubspot integration, planhat alternative (10/0), totango alternative (10/2), vitally alternative, customer success platform hubspot integration |

Note on B1/B2: pricing pages from third parties rank well because vendors hide pricing.
These are the highest-volume terms in the whole keyword set and they carry the exact
"priced out of CS platforms" narrative from the validation wedge (research/validation/03).
Cannibalization guard: B3 vs existing `hubspot-churn-prevention-health-scores-workflows`;
the health-score post keeps "hubspot customer health score" (30/20) via an update, B3
does not repeat health scoring.

## New Pillar C: HubSpot Billing and ERP Integrations (PRIORITY 3, extends NetSuite cluster)

Pillar title: **"HubSpot ERP Integration: The Complete Guide (NetSuite, Sage, Dynamics, and Billing Systems)"**
Slug: `/posts/hubspot-erp-integration`
Primary keyword: hubspot erp integration (110, KD 3, CPC 13.73). Best KD-to-volume ratio
in the set. Positioned as the umbrella above the existing NetSuite pillar; links down
into it and into `/integrations/hubspot-netsuite-renewals`.

| ID | Cluster title (working) | Slug | Primary keyword (vol/KD) | Also absorbs |
|---|---|---|---|---|
| C1 | Chargebee HubSpot Integration: Sync Subscriptions, Renewals, and MRR | chargebee-hubspot-integration | chargebee hubspot integration (70/8, CPC 20.68) | chargebee renewal hubspot |
| C2 | HubSpot Billing Integrations Compared: Stripe, Chargebee, Maxio, Zuora, Recurly | hubspot-billing-integrations-compared | hubspot billing integration (20/9) | hubspot recurring billing (40/24), maxio hubspot integration (20/9, CPC 43), zuora hubspot integration (20/2), recurly hubspot integration (20/0), hubspot stripe subscription sync, hubspot subscription management integration, hubspot invoice automation |
| C3 | HubSpot Sage Intacct Integration: A Practical Guide | hubspot-sage-intacct-integration | hubspot sage intacct integration (20/7, CPC 18.66) | hubspot xero recurring invoices, quickbooks recurring invoices hubspot, hubspot quickbooks integration renewals |

## Updates to existing posts (no new post needed)

| Post | Update | Keywords captured |
|---|---|---|
| hubspot-deal-cloning-apps-compared | Add Clone Attack + hapily section; retitle to include Clone Attack; add comparison-table row; link to /compare/hubspot-renewal-apps as "the renewal-specific comparison" | clone attack hubspot (20/5), clone attack alternative/app/pricing, hapily clone attack, clonener alternative, deal duplicator alternative |
| hubspot-clone-deal-complete-guide | Refresh (already pos ~8.6, 576 impressions); add FAQ entries for "duplicate" phrasing variants; add links to /compare/hubspot-renewal-apps and renewal pillar | how to duplicate a deal in hubspot (20/13), hubspot duplicate deal (20/15), duplicate deal in hubspot (40/15), bulk/mass variants |
| hubspot-netsuite-connector-comparison | Verify Celigo, Boomi, Workato, Zapier each have a scannable section; add link to /integrations/hubspot-netsuite-renewals | celigo hubspot netsuite (20/3), boomi hubspot netsuite, zapier hubspot netsuite, hubspot netsuite middleware |
| hubspot-renewal-reminders | Add a "choosing reminder software" section that links to new A4; keep the how-to ownership | contract renewal reminder software overflow, renewal notification workflow |
| hubspot-churn-prevention-health-scores-workflows | Sharpen H2 + FAQ around "hubspot customer health score"; link to new B3 | hubspot customer health score (30/20), renewal health score |
| hubspot-renewal-nrr-grr-dashboard-reporting | Already gets clicks; add sections for recurring revenue tracking and revenue analytics phrasing | hubspot recurring revenue tracking (20/25), hubspot revenue analytics (20/19), revenue retention dashboard |
| crm-erp-integration | Add prominent link down to new Pillar C (hubspot erp integration owns the HubSpot-specific intent) | crm erp integration renewals, erp crm renewal sync |
| netsuite-crm-vs-hubspot | Light refresh only; already targets netsuite crm vs hubspot (50/0) | keep |

## Removals

No renewal-relevant post should be removed; every overlapping post is better updated
and cross-linked. Separate observation (not this plan's scope): the legacy off-ICP
posts (free-CRM comparisons, Hootsuite/RecurPost comparisons, beverage marketing) pull
thousands of impressions with near-zero clicks and dilute topical authority; consider a
prune/redirect review as its own task.

## Landing page linking rules

- Every Pillar A and B post links to `/renewal-operations` (primary CTA) and, where
  app-comparison intent appears, to `/compare/hubspot-renewal-apps`.
- Every Pillar C / NetSuite post links to `/integrations/hubspot-netsuite-renewals`.
- `/renewals-for-msps` has no keyword coverage in this set; an MSP-specific keyword
  batch (agreement renewals, co-term, true-up terms) is a follow-up research task.
  Interim: add contextual links from hubspot-co-terming-renewals and A1.

## Execution order (by opportunity score = volume x intent value / difficulty)

1. Pillar A + A1 (contract renewal management + hubspot contract management): ~700
   combined monthly searches, KD 4 to 17, CPCs 20 to 70 USD.
2. Pillar C pillar post alone (hubspot erp integration, 110/3): fastest single win.
3. B1 + B2 (churnzero/gainsight pricing): 650 combined volume, conquest narrative.
4. A2 to A5 (process, tracking, reminders, playbook).
5. B3 + B4, then C1 to C3.
6. Existing-post update pass (can run parallel to any phase; cheapest wins first:
   cloning-apps-compared and clone-deal-complete-guide are already on page 1).

NeuronWriter budget: 3 pillars + 12 clusters = 15 new-query credits, plus evaluate
loops. Updates re-use existing queries where they exist; net-new queries only for the
update posts if credits allow.

## NeuronWriter run log (2026-07-07)

Project reputebee.com (NEURON_PROJECT_ID 3dcebed4e4031ff3), engine google.com, English.
All 15 drafts scored via /evaluate-content and pushed to the NeuronWriter editor via /import-content.
Scores lifted from an initial 30 to 54 range to 69 to 81 after two term-coverage rounds.

| Slug | Keyword | Query ID | Final score | Top competitor |
|---|---|---|---|---|
| contract-renewal-management-complete-guide | contract renewal management software | c097579d4303064b | 79 ✓ | 79 |
| hubspot-contract-management | hubspot contract management | d58c90d6694839be | 74 | 87 |
| contract-renewal-process-checklist | contract renewal process | 2157aeb10543dd41 | 77 | 83 |
| renewal-tracking-software-vs-spreadsheet | renewal tracking software | 1ed31a999d5b10cb | 79 | 80 |
| contract-renewal-reminder-software | contract renewal reminder software | cab085d834583905 | 74 | 75 |
| renewal-playbook-template | renewal playbook template | c9f58566bfbbac9e | 78 ✓ | 77 |
| customer-success-in-hubspot | customer success in hubspot | ea0d3f4ba0b982d8 | 74 ✓ | 69 |
| churnzero-pricing-alternatives | churnzero pricing | 7b8d47f17a45a0f2 | 75 ✓ | 74 |
| gainsight-pricing-alternatives-hubspot | gainsight pricing | 247ef69dc8cfb92c | 81 ✓ | 81 |
| hubspot-customer-success-workspace | hubspot customer success workspace | f1042d58bdadfa49 | 80 | 84 |
| cs-platform-hubspot-integrations-compared | planhat hubspot integration | 4513cda6f6f0b4a9 | 73 | 76 |
| hubspot-erp-integration | hubspot erp integration | 2045165bf0fb2a45 | 79 | 85 |
| chargebee-hubspot-integration | chargebee hubspot integration | a7a567bda8a7b579 | 70 ✓ | 68 |
| hubspot-billing-integrations-compared | hubspot billing integration | 44dd5e0f34f63a5f | 77 | 83 |
| hubspot-sage-intacct-integration | hubspot sage intacct integration | 16a92a1c5df7d61f | 69 ✓ | 66 |