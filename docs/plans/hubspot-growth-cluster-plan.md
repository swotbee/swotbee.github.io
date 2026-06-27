# HubSpot for Business Growth: Pillar + Cluster Content Plan

Built with the NeuronWriter pillar+cluster pipeline (`docs/plans/blog-creation-playbook.md`).
5th pillar cluster on swotbee.com. Research base:
`src/pages/posts/_prompts/research-resources/HubSpot and NetSuite/hubspot-growth-research.md`.

## 1. The winnability decision (why this set)

The earlier "hubspot growth" attempt scored poorly because its high-volume terms
("hubspot growth suite" KD 37, "hubspot for business growth") are HubSpot-owned SERPs we
cannot outrank. We pre-queried 8 candidate keywords and read the actual NeuronWriter
competitor ceilings. The winnable set is where competitors are stale (2018 "Growth Suite"
press releases) or evasive (agency pages with no pricing), so the ceilings are low:

| candidate | target wc | top competitor | median competitor | decision |
|-----------|-----------|----------------|-------------------|----------|
| hubspot product led growth | 1033 | 60 | 35 | BUILD |
| hubspot pricing at scale | 1122 | 61 | 46 | BUILD |
| does hubspot crm scale with business growth (110 vol, KD 0) | 1527 | 64 | 38 | BUILD (pillar) |
| hubspot growth strategy | 803 | 66 | 45 | BUILD |
| hubspot revenue growth | 2018 | 69 | 43 | DROP (investor/earnings SERP, contaminated) |
| growth driven design hubspot | 826 | 70 | 45 | BUILD |
| hubspot growth suite | 674 | 70 | 42 | BUILD (freshness) |
| hubspot for business growth | 1088 | 86 | 50 | DROP as pillar (HubSpot.com owns it) |

Change from the original outline: the pillar targets the winnable scalability keyword
(KD 0, ceiling 64), not the unwinnable broad "hubspot for business growth" (ceiling 86).
The case-studies post was dropped: bare "hubspot revenue growth" returns HubSpot's earnings
SERP (topic_matrix = "Is HubSpot making a profit?", "stock falling"), so it is contaminated;
the case-study numbers became a proof table inside the pillar instead.

## 2. Pillar + cluster map

| id | title | primary keyword | slug | final score (ceiling) |
|----|-------|-----------------|------|------------------------|
| P  | Does HubSpot CRM Scale With Business Growth? An Honest Guide to Grow Your Business on HubSpot in 2026 | does hubspot crm scale with business growth | `does-hubspot-crm-scale` | 62 (64) |
| C1 | HubSpot Growth Suite Is Now the Customer Platform | hubspot growth suite | `hubspot-growth-suite-customer-platform` | 63 (70) |
| C2 | HubSpot Pricing at Scale: The Bill Nobody Warns You About | hubspot pricing at scale | `hubspot-pricing-at-scale` | 64 (61) BEATS |
| C3 | HubSpot for Product-Led Growth | hubspot product led growth | `hubspot-product-led-growth` | 59 (60) |
| C4 | HubSpot Growth Strategy: The Frameworks Explained | hubspot growth strategy | `hubspot-growth-strategy` | 61 (66) |
| C5 | Growth-Driven Design on HubSpot in 2026 | growth driven design hubspot | `growth-driven-design-hubspot` | 55 (70) |

All six beat the median competitor (35 to 46) comfortably; C2 beats the top competitor;
C3 ties it. The wedge per the research: radical honesty (real pricing, real cons, real
decision framework) plus current 2026 naming, against a stale/evasive field.

## 3. Internal linking (hub and spoke)

- Pillar links out to all 5 clusters (scaling->C2 pricing & C1 naming; frameworks->C4 & C3;
  GDD->C5).
- Clusters link back to pillar; C1->C2, C3->C4, C4->C3 & C5, C5->C4 & pillar.

## 4. Diagrams (one unique per post)

- P: hubspot-scaling-ceiling.svg; C1: hubspot-naming-lineage.svg; C2: hubspot-tco-stack.svg;
  C3: hubspot-plg-funnel.svg; C4: hubspot-growth-frameworks.svg; C5: gdd-three-stages.svg.
- Unique hero photos verified unused across the repo (no collisions).

## 5. SwotBee angle

Honest cost-at-scale, RevOps foundation, and "when to migrate" map to SwotBee's consulting.
C2 (pricing) and the pillar are the natural lead-gen anchors (audit/TCO model CTA).

## 6. Status

Drafted, scored, imported to NeuronWriter editor, diagrams added, `npm run build` passes
(156 pages). pubDates spread Jun 10 to Jun 25. Commit/push pending explicit request.
