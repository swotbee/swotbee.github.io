# B2B SaaS Customer Retention: Pillar + Cluster Content Plan

Built with the NeuronWriter pillar+cluster pipeline (`docs/plans/blog-creation-playbook.md`).
6th pillar cluster on swotbee.com. Optimized for TRAFFIC (top-of-Google on winnable keywords),
not for the NeuronWriter score in isolation.

## 1. The winnability decision (data-backed)

Sweep of 7 SemRush exports (renewals/retention/churn): 6,435 unique keywords, 577 with real
metrics, filtered to net-new + on-ICP = 195 winnable. Head terms are walled off: live SERPs for
"customer retention" (IBM, Zendesk, NetSuite, Salesforce), "customer churn" (IBM, Paddle,
Mailchimp), "net revenue retention" (Netflix + dictionaries). A young domain cannot crack those.

The chink is the B2B-SaaS + CRM-specific long-tail underneath, where KD drops to single digits
to low-20s and competitors are weak. We target THOSE, aiming to beat the specific pages on each
SERP (not an abstract score of 80). Expected NeuronWriter band here: ~65 to 75 (thinner SERPs =
sparser term models); the trade is deliberate, ranking probability over vanity score.

## 2. Pillar + cluster map (all net-new, KD <= ~24)

| id | working title | primary keyword | vol / KD | slug |
|----|---------------|-----------------|----------|------|
| P  | B2B SaaS Customer Retention: The Complete Guide | b2b customer retention | 170 / 19 | `b2b-saas-customer-retention` |
| C1 | CRM for Customer Retention (the HubSpot edge) | crm customer retention | 320 / 21 | `crm-customer-retention` |
| C2 | Customer Retention Software and Predictive Tools | customer retention software | 260 / 9 | `customer-retention-software` |
| C3 | SaaS Customer Retention Strategies | saas customer retention strategies | 90 / 23 | `saas-customer-retention-strategies` |
| C4 | SaaS Churn Rate: Formula, Benchmarks, and How to Reduce It | saas churn rate | 480 / 24 | `saas-churn-rate` |
| C5 | Shopify Customer Retention Strategies | shopify customer retention strategies | 40 / 6 | `shopify-customer-retention` |
| C6 | Customer Retention KPIs and Metrics | customer retention kpis | 140 / 17 | `customer-retention-kpis` (score 60, median 56) |
| C7 | Customer Retention Consulting (commercial) | customer retention consulting | 30 / 4 | `customer-retention-consulting` (score 59, median 46) |

Note: C6/C7 were initially written unscored when the first NeuronWriter key hit its monthly
query limit. They were later scored and optimized using a second key (different account), with
the queries run under an available project using engine/language override (google.co.uk / English).

Build order (priority): P -> C1 (CRM/HubSpot edge) -> C2 (software, KD 9) -> C4 (churn, biggest
volume) -> C3 -> C5.

Deferred to next month (NeuronWriter monthly query limit reached this run):
- Customer Retention KPIs and Metrics (customer retention kpis 140/17), also overlaps existing
  renewal-metrics posts, so lower priority.
- Commercial service-page terms (customer retention consulting 30/4, customer retention agency
  40/2): buyer intent, belong on a SERVICE page, not a blog post. Recommend a /services page.

## 3. Cannibalization map (vs existing posts)

This pillar is RETENTION-led, not renewal-led. Cross-link, do not repeat:
- Metrics: existing `renewal-metrics-explained`, `gross-vs-net-revenue-retention`,
  `hubspot-renewal-nrr-grr-dashboard-reporting` -> cross-link from pillar + C4, do not duplicate.
- Churn: existing `silent-churn-detection`, `cohort-retention-analysis-churn`,
  `hubspot-churn-prevention-health-scores-workflows` -> C4 (churn rate = formula/benchmark intent)
  cross-links these (detection/prevention intent), no overlap.
- Expansion/CS: existing `whitespace-analysis-expansion`, `customer-success-qualified-leads`,
  `product-qualified-signals-expansion` -> cross-link from pillar.

## 4. Internal linking (hub and spoke)

- Pillar links out to all 5 clusters + to existing renewal/churn/expansion posts as supporting refs.
- Clusters link back to pillar; C1<->C2 (CRM + software), C3->C1 & C4, C4->C2, C5->C1.

## 5. Diagrams (one unique per post)

- P: retention pillars/levers map; C1: CRM retention loop; C2: retention software stack/quadrant;
  C3: SaaS retention strategy timeline; C4: churn rate formula + benchmark bars; C5: Shopify
  repeat-purchase loop.

## 6. SwotBee angle

CRM-for-retention (C1) and retention software (C2) are the HubSpot differentiator; Shopify (C5)
is the Shopify-consulting differentiator. Commercial consulting/agency terms -> service page.

## 7. Status

Plan drafted 2026-06-27. 6 NeuronWriter queries fired (kpis hit the monthly limit, deferred).
Pipeline: write -> cover terms/length -> diagrams -> interlink -> build. Commit/push pending request.
