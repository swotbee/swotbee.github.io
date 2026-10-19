---
layout: ../../layouts/BlogPostLayout.astro
title: "HubSpot Renewal and Expansion Revenue: Count Each Once"
pubDate: "2026-10-19"
modifiedDate: "2026-10-19"
description: "HubSpot renewal and expansion revenue need separate definitions. Reconcile recurring growth and one-time fees with a worked example and reporting workbook."
category:
  title: Revenue Operations
  href: /categories/revenue-operations/
author:
  name: SWOTBee Team
  url: https://swotbee.com
  imageUrl: /assets/ico/logo.png
  bio: SwotBee works on HubSpot customer contract workflows, renewal operations and integrations.
  expertise: [HubSpot CRM, Renewal Reporting, Revenue Operations]
image: "/assets/blog/hubspot-renewal-expansion-revenue-reporting-hero.svg"
tags: [HubSpot, Renewal Reporting, Expansion Revenue, Revenue Operations]
seriesName: HubSpot Renewal Reporting
pillarUrl: /posts/hubspot-renewal-nrr-grr-dashboard-reporting/
---

> This worked example supports our [HubSpot renewal reporting guide](/posts/hubspot-renewal-nrr-grr-dashboard-reporting/).

**For HubSpot renewal and expansion revenue reporting, separate the retained recurring baseline, additional recurring value and one-time charges. Reconcile the customer's purchase separately from the change in recurring revenue. Count each contribution once, even when one purchase spans several associated records.**

Calling the whole purchase new sales overstates growth. Calling the whole purchase renewal hides expansion. The distinction needs to survive the sales process, deal structure and report filters.

Download the <a href="/templates/hubspot-renewal-expansion-reporting.xlsx" download>reconciliation and reporting workbook (Excel)</a> and <a href="/templates/hubspot-renewal-expansion-reporting.pdf" download>classification dictionary and test pack (PDF)</a>. They accompany both renewal-and-expansion videos and include the example, editable calculations and expected-versus-observed tests.

<figure aria-label="Renewal and expansion revenue reporting">
<video controls playsinline preload="none" width="1920" height="1080" poster="/videos/customer-contracts/hubspot-renewal-expansion-revenue-reporting.poster.webp" aria-label="Renewal and expansion revenue reporting" style="display:block;width:100%;height:auto;aspect-ratio:16/9;background:#111;border-radius:12px;">
  <source src="/videos/customer-contracts/hubspot-renewal-expansion-revenue-reporting.mp4" type="video/mp4" />
  <track src="/videos/customer-contracts/hubspot-renewal-expansion-revenue-reporting.en.vtt" kind="captions" srclang="en" label="English" />
  Your browser cannot play this video. Use the download link below.
</video>
<figcaption><strong>Watch: Renewal and expansion revenue reporting</strong> (5:13). Fictional reporting example and expected tests; an executed account report is not demonstrated. <a href="/videos/customer-contracts/hubspot-renewal-expansion-revenue-reporting.mp4" download>Download video</a> or <a href="/videos/customer-contracts/hubspot-renewal-expansion-revenue-reporting.transcript.txt">read the transcript</a>.</figcaption>
</figure>

## What belongs in renewal, expansion and one-time revenue?

Retained renewal carries forward existing recurring service. Expansion adds recurring value above that retained amount. A one-time fee belongs in purchase consideration but contributes nothing to recurring revenue under this example's definitions.

Cedar Vale's fictional purchase covers January through December 2027. The previous annual recurring baseline is $12,000. The customer retains that service, adds $3,000 of annual recurring service and buys $1,500 of commissioning work. There is no tax, discount or proration in this example.

<div style="max-width:100%; overflow-x:auto;" tabindex="0" role="region" aria-label="Renewal expansion and one-time purchase components">

| Component | Current-term purchase | Closing ARR contribution | Recurring growth |
| --- | ---: | ---: | ---: |
| Retained renewal | $12,000 | $12,000 | $0 |
| Recurring expansion | $3,000 | $3,000 | +$3,000 |
| One-time commissioning | $1,500 | $0 | $0 |
| **Total** | **$16,500** | **$15,000** | **+$3,000** |

</div>

Give each component a stable identity and source. Compare the previous and new services before classifying an item as expansion. Existing revenue should not become new growth simply because a new deal or quote was created.

## How do you reconcile recurring revenue in HubSpot?

The purchase total includes all three components. Closing ARR includes the recurring services active at the measurement date. Recurring growth compares that closing amount with the opening baseline.

For this full-year example:

- Purchase consideration: $12,000 + $3,000 + $1,500 = **$16,500**.
- Closing ARR: $12,000 retained + $3,000 effective expansion = **$15,000**.
- Recurring growth: $15,000 closing minus $12,000 opening = **$3,000**.

Adding the old $12,000 to the entire new $15,000 produces an incorrect $27,000. The new recurring total already includes the retained baseline. Neither ARR nor purchase consideration establishes invoice cash or accounting revenue recognized.

According to [HubSpot's deal-property guide](https://knowledge.hubspot.com/properties/hubspots-default-deal-properties), deal ARR uses recurring line-item terms and values, while TCV includes recurring and one-time charges. These totals do not automatically classify the retained and incremental portions of a renewal purchase.

## Which HubSpot revenue analytics route should you use?

Choose the report's inputs and definitions before building the dashboard. Deal ARR, Enterprise Revenue Analytics and custom reports use different data and access conditions.

Deal ARR/MRR require Sales Hub Professional or Enterprise. The separate [recurring-revenue analytics guide](https://knowledge.hubspot.com/reports/track-recurring-revenue-with-revenue-analytics) describes an Enterprise route using manually maintained recurring-revenue properties. Its amount is monthly and is not calculated from associated products or quotes. Follow that report's documented event lifecycle rather than copying the annual figures directly into its monthly field.

A custom report can use deliberately classified components, subject to account access. Define what one row represents, such as one authoritative purchase component. [HubSpot's custom-report guidance](https://knowledge.hubspot.com/reports/understand-the-custom-report-builder) explains how associated records affect the result. Adding contacts or activities must not multiply the money being summed.

Use the workbook for a controlled reconciliation if the native reporting route is not yet established. It verifies arithmetic and definitions; it does not create a HubSpot dashboard.

Before configuring revenue reporting, copy this report brief for the CRM administrator and Finance reviewer:

- **Measure:** annual recurring revenue at a stated measurement date, in one reporting currency.
- **Source:** one authoritative set of component rows from the accepted agreement, with previous baseline retained separately.
- **Status:** won renewal deals and accepted expansion opportunities; exclude lost proposals and future expansion from active recurring value.
- **Dates:** distinguish the renewal date, opportunity close date and service effective date.
- **Owner:** name who maintains the revenue properties, reviews revenue data and resolves differences.

For a SaaS renewal pipeline, this brief keeps subscription revenue, revenue movement and one-time services distinguishable. Monthly recurring revenue needs monthly units. Revenue recognition requires a separate accounting policy.

## Should renewal and expansion use one deal or separate deals?

One deal can keep a shared purchase together if the components remain distinguishable. Separate linked opportunities can help when owners or outcomes differ. The reporting design must account for either structure.

With one deal, record retained recurring value, expansion and one-time value separately. Those are proposed categories, not guaranteed native properties. With separate opportunities, preserve the shared purchase identity and never sum a combined parent amount with the same child amounts.

For the broader architecture choice, see [renewal and expansion pipeline structure](/posts/hubspot-renewal-expansion-pipeline-structure/). A reporting relationship alone does not prove that quoting or invoicing across multiple deals is automatically supported.

## What tests should pass before you trust the report?

Test outcomes, effective dates and duplicated associations against known expected totals. Keep actual report results separate from the example arithmetic.

1. **Expansion lost:** the $12,000 renewal succeeds but the $3,000 expansion is lost. Closing ARR remains $12,000. Preserve the lost proposal in history.
2. **Contraction:** retained service falls to $10,000 and expansion adds $3,000. Closing ARR is $13,000 and net growth is $1,000.
3. **Future start:** signed expansion has not reached its effective date. Exclude it from active ARR at the earlier measurement date.
4. **Extra associations:** add another contact or activity. The component total must remain unchanged.
5. **Parent and child overlap:** include a combined deal and its components in a test extract. Confirm the money is counted at only one defined level.

Record the report version, filters, observed result, evidence and owner in the workbook. Commission inputs can reuse the classifications, but payout rates and eligible revenue must follow your company's actual policy. ARR growth is not a universal commission base.

Sources checked 19 October 2026. The video and workbook show fictional expected outcomes, not an executed account report. Use the [renewal reporting guide](/posts/hubspot-renewal-nrr-grr-dashboard-reporting/) for the wider dashboard design.
