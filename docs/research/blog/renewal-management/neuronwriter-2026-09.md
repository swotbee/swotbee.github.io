# NeuronWriter Renewal Cluster Research

Date: 2026-09-10

Project: `swotbee.com` (`e2f67fbc778fd0f9`)

Search configuration: `google.com`, English, Top Intent competitors

## Decisions

- Keep the three-pillar structure in the execution plan. The analyses support focused
  HubSpot implementation pages and a separate seller-side renewal-strategy pillar.
- Do not create a broad `renewal management` pillar. The Semrush set contains unrelated
  tenant, subscription-procurement, and customer-retention intents.
- Treat NeuronWriter ranges as coverage guidance, not instructions to repeat terms.
- Exclude inspirational-quote intent from `hubspot renewal quotes`.
- Exclude searches about renewing, downgrading, or cancelling HubSpot's own subscription
  from the renewal-app comparison.
- Keep `saas renewal strategy` seller-side. Several ranking pages and questions concern
  buyer-side SaaS procurement, cost control, and auto-renewal surprises.

## Query Results And Execution Status

| Keyword | Query ID | Target words | Readability | Page | Score | Status |
|---|---|---:|---:|---|---:|---|
| hubspot renewal quotes | `5114bc4e0e2cf907` | 1,412 | 47 | `/posts/hubspot-contracts-renewal-quotes/` | 78 | Imported |
| hubspot renewal automation | `2fe31f820b95905a` | 1,592 | 35 | `/posts/hubspot-renewal-deal-workflow-automation/` | 76 | Imported |
| customer success renewal playbook | `c3d5fc19d19d4697` | 1,894 | 32 | `/posts/renewal-playbook-template/` | 78 | Imported |
| saas renewal strategy | `abd663556563a46a` | 2,511 | 38 | `/posts/renewal-strategy-365/` | 75 | Imported, with intent guard |
| hubspot arr reporting | `da5b9d3af30f3950` | 1,410 | 33 | `/posts/hubspot-renewal-nrr-grr-dashboard-reporting/` | 77 | Refreshed and imported |
| hubspot renewal apps | `1d431898a4087cf1` | 1,154 | 40 | `/compare/hubspot-renewal-apps/` | 61 | Refreshed and imported, with intent guard |
| hubspot contract management | `bd7252d9c7632d19` | 1,912 | 36 | `/posts/hubspot-contract-management/` | 89 | Existing query reused and imported |

NeuronWriter's competitor set reported the prior indexed renewal-app page at position 4
with a content score of 55. The refreshed page adds the missing native Contracts decision
path and scores 61. It intentionally excludes account-renewal terms even though they
appear in the mixed SERP.

## Article Briefs

### HubSpot Contracts And Renewal Quotes

Primary coverage: HubSpot, renewal quote, renewal deal, line item, billing, renewal date,
workflow, renewal pipeline, quote template, Revenue Hub.

Answer directly:

- Can HubSpot create renewal quotes?
- What does a renewal quote inherit from a Contract?
- Can a workflow create the quote and its associated deal?
- What happens after acceptance?
- Which legacy records can be imported or migrated?

Intent exclusion: inspirational renewal quotes and unrelated HubSpot employment questions.

### HubSpot Renewal Automation

Primary coverage: renewal automation, workflow, renewal date, renewal deal, renewal
pipeline, renewal process, customer success, churn, CRM, SaaS.

Answer directly:

- How do native Contract workflows differ from deal-based automation?
- What data must exist before a workflow can be trusted?
- How are tasks, alerts, deals, quotes, and reporting connected?
- When is a dedicated renewal pipeline necessary?

### Customer Success Renewal Playbook

Primary coverage: customer success, renewal playbook, renewal process, customer health,
health scores, renewal strategies, renewal rates, success metrics, customer feedback.

Required structure: ownership, timeline, health and risk segmentation, value evidence,
commercial conversation, escalation rules, metrics, common mistakes, and a reusable
template.

### SaaS Renewal Strategy

Primary coverage: SaaS renewal, renewal process, renewal rate, renewal strategies,
subscription, renewal date, churn, customer retention, customer success.

Intent guard: do not add vendor-consolidation, software-spend, procurement, or cancelling
auto-renewal sections merely to match contaminated competitors. The page owns the
seller-side strategy for securing and expanding customer contracts.

### HubSpot ARR Reporting

Primary coverage: HubSpot ARR reporting, recurring revenue, MRR, CRM, dashboards, churn,
Revenue Analytics, revenue reports, calculation, forecast, downgrade.

Answer directly:

- What is the difference between default ARR/MRR properties and Revenue Analytics fields?
- Which HubSpot subscriptions include Revenue Analytics?
- How should recurring revenue events be entered?
- How are NRR and GRR calculated and validated?
- What must remain in a spreadsheet or BI layer?

The refresh corrected a factual risk: HubSpot Revenue Analytics uses four separate,
manually populated recurring-revenue deal properties and does not derive its chart from
products, quotes, or the default ARR and MRR properties.

### HubSpot Native Renewals Vs Apps

Primary coverage: native Contracts, renewal quotes, renewal deals, line items, workflows,
renewal dates, automation, customer success, and reporting.

Decision frame:

1. Native Contracts for Revenue Hub quote-originated agreements with standard terms.
2. A cloning app for simple legacy-deal duplication.
3. A managed or hybrid system for mixed sources, custom uplift rules, co-terming,
   governance, and retention reporting.

Intent exclusion: HubSpot account pricing, plan renewal, cancellation, and downgrade
queries. Those searches describe buying HubSpot, not managing customers' renewals.

## Source Notes

- NeuronWriter API documentation confirms that each `new-query` request consumes one
  analysis and that `get-query` only retrieves an existing analysis.
- Product claims were checked against HubSpot's current Contracts, renewal quote, and
  recurring revenue documentation before the pages were refreshed.
- Raw API responses were kept in temporary local files and were not added to Git.
