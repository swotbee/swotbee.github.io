---
layout: ../../layouts/BlogPostLayout.astro
title: "The 15 Custom Properties Every HubSpot Renewal Pipeline Needs"
pubDate: "2026-04-02"
description: "Complete property setup guide for HubSpot renewal pipelines: deal type, renewal date, contract term, churn reason, health score, and 10 more. Exact field types, dropdown values, and where each lives."
category:
  title: "Revenue Operations"
  href: "/categories/revenue-operations"
author:
  name: "SWOTBee Team"
  url: "https://swotbee.com"
  imageUrl: "/assets/ico/logo.png"
image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop"
tags:
  - "HubSpot"
  - "Renewal Pipeline"
  - "CRM Properties"
  - "Deal Properties"
  - "Revenue Operations"
seriesName: "HubSpot Renewal Pipeline"
pillarUrl: "/posts/hubspot-renewal-pipeline-complete-guide"
modifiedDate: "2026-07-24"
funnelCta: "renewal-audit"
faqs:
  - q: "What custom properties does a HubSpot renewal pipeline need that aren't built in?"
    a: "HubSpot's default deal properties are built for new business, not renewals. At minimum, add Deal Type, Renewal Date, Contract Term, and Previous Contract Value; the full list of 15 above covers reporting, forecasting, and churn analysis too, not just the basics."
  - q: "Do I need Operations Hub to track Days to Renewal?"
    a: "Only for the calculated version that updates automatically. Without Operations Hub, use a manually-maintained \"Days to Renewal Range\" dropdown updated by date-comparison workflows instead. Less precise, but it works on any tier."
  - q: "How do I calculate expansion and contraction revenue without Previous Contract Value?"
    a: "You can't, reliably. Expansion and contraction are both a comparison between this renewal's amount and the prior contract's amount; without storing that prior value on the deal, NRR and GRR calculations have no baseline to compare against. See our NRR/GRR dashboard guide for how this property feeds the reporting layer."
  - q: "Should Health Score live on the Deal or the Company record?"
    a: "Company, when a customer can have multiple concurrent deals, since health reflects the account relationship, not any single contract. Put it on the Deal only if your business is strictly one-deal-per-customer."
howto: true
howtoSteps:
  - name: "Go to Properties settings"
    text: "Navigate to Settings, then Properties, and select the object (Deal or Company) you're adding a property to."
  - name: "Create the property"
    text: "Click Create property, choose a group (or create a Renewal Properties group to keep them organized), and set the field type and dropdown options."
  - name: "Make it required where it matters"
    text: "For properties like Churn Reason, configure it as required at the relevant pipeline stage under Settings, Deals, Pipelines, Edit stage, Required properties."
---

Your HubSpot renewal pipeline is only as good as the data feeding it. Workflows need properties to trigger on. Forecast and ARR reports need properties to calculate from. CSMs need properties to understand what's happening with a SaaS account and whether churn or expansion revenue is the more likely outcome at contract renewal.

HubSpot includes [a set of default deal properties](https://knowledge.hubspot.com/properties/hubspots-default-deal-properties) on every deal pipeline out of the box, but they're built for new business, not a separate renewal pipeline. This article lists the 15 custom properties you need to add, with exact field types, recommended dropdown values, and explanations of where each one is used, the property setup best practices we apply on every renewal pipeline we build.

> This article is part of our [Complete Guide to Building a Renewal Pipeline in HubSpot](/posts/hubspot-renewal-pipeline-complete-guide).

---

## The Properties

### 1. Deal Type

**Object:** Deal
**Field type:** Dropdown select
**Values:** `New Business` | `Renewal` | `Expansion` | `Contraction` | `Re-activation`
**Required:** Yes, on deal creation

**Why:** This is the single most important property for renewal reporting. Every cross-pipeline report, every revenue segmentation, every forecast filter depends on Deal Type being accurate.

**How it's used:**
- Workflow triggers (only create renewal deals from New Business or Renewal deals)
- Revenue reports segmented by deal type
- Forecast separation (new vs. renewal vs. expansion)

---

### 2. Renewal Date

**Object:** Deal
**Field type:** Date picker
**Required:** Yes, on all renewal deals

**Why:** This is the anchor for everything time-based: stage progression workflows, the 90-60-30 cadence, forecast timing, and the "Days to Renewal" calculation.

**How to set it:** For the first renewal, Renewal Date = Original Close Date + Contract Term. For subsequent renewals, it's the previous Renewal Date + Contract Term.

**How it's used:**
- [Stage progression workflows](/posts/hubspot-renewal-deal-workflow-automation) use this to move deals
- Dashboards show renewals by upcoming date
- Forecast reports use this (not Close Date) for timing

---

### 3. Contract Term (Months)

**Object:** Deal
**Field type:** Number
**Default values:** 12 (most common), but should accommodate 1, 3, 6, 12, 24, 36

**Why:** Needed to calculate the next renewal date, annualize MRR from deal amount, and determine how far out the renewal pipeline extends.

---

### 4. Renewal Year

**Object:** Deal
**Field type:** Number
**Default:** 1

**Why:** Tracks which renewal cycle this deal represents. Year 1 = first renewal after original purchase. Year 2 = second renewal. Essential for the [dual-workflow pattern](/posts/hubspot-renewal-workflow-infinite-loop-fix) that solves the infinite loop problem.

**How it's used:**
- Workflow routing (odd vs. even year patterns)
- Cohort analysis (do Year 3 customers renew at higher rates than Year 1?)
- Audit trail

---

### 5. Days to Renewal (Calculated)

**Object:** Deal
**Field type:** Calculated property (requires [Operations Hub Professional](https://www.hubspot.com/pricing/operations))
**Formula:** `Renewal Date. Today`

**Why:** This is the metric that drives urgency. It powers time-based stage progression, report filters ("show me all deals within 30 days"), and CSM dashboards.

**Alternative without Ops Hub:** Create a "Days to Renewal Range" dropdown (180+, 90, 180, 60, 90, 30, 60, 0, 30, Overdue) and use workflows to update it based on date comparisons. Less precise but works on any tier.

---

### 6. Auto-Renew Flag

**Object:** Deal
**Field type:** Dropdown select
**Values:** `Auto-Renew` | `Manual Renewal` | `Opt-Out Window`

**Why:** Auto-renewing contract renewal deals need different handling. You still want a renewal deal in the pipeline (for forecast accuracy and customer health monitoring), but the urgency and outreach cadence is different. A CSM doesn't need to "close" an auto-renewal, they need to ensure the customer doesn't cancel before the auto-renew date.

**How it's used:**
- Different workflow branches for auto-renew vs. manual
- Different task cadence (auto-renew = check-in only, manual = full proposal process)

---

### 7. Previous Contract Value

**Object:** Deal
**Field type:** Currency

**Why:** Essential for calculating expansion revenue and contraction revenue against ARR. If the renewal amount is $120K and the previous contract was $100K, that's $20K of expansion revenue. Without this property, you can't calculate NRR.

**How to set it:** When the renewal deal is created by a workflow, copy the Amount from the prior deal to this property. The current deal's Amount field then reflects the new contract value (which may be higher or lower).

---

### 8. Revenue Change Reason

**Object:** Deal
**Field type:** Dropdown select
**Values:** `Same Terms` | `Price Increase` | `Volume Increase` | `Product Upsell` | `Downgrade (Budget` | `Downgrade) Usage` | `Downgrade. Feature Removed` | `Partial Churn`

**Why:** When the renewal amount differs from the previous contract, this property explains why. Critical for understanding whether expansion is organic (usage growth) or strategic (upsell motion), and whether contraction is preventable.

---

### 9. Churn Reason

**Object:** Deal
**Field type:** Dropdown select
**Values:** `Budget/Cost` | `Competitor, [Name field]` | `Product Fit` | `No Longer Needed` | `Acquisition/Merger` | `Champion Left` | `Support Issues` | `Implementation Failed` | `Never Fully Adopted` | `No Response (Auto-Churn)` | `Other`
**Required:** Yes, when deal moves to Closed Lost

**Why:** "Lost to competitor" isn't specific enough. A proper churn reason taxonomy enables quarterly analysis that drives product, pricing, and retention strategy decisions.

**Pro tip:** Add a companion text field "Churn Details" for freeform context. The dropdown gives you reportable categories; the text field gives you the story.

---

### 10. Health Score

**Object:** Company (preferred) or Deal
**Field type:** Dropdown select
**Values:** `Healthy` | `Passive` | `At Risk`

**Why:** Health signals should influence renewal strategy. An "At Risk" account needs executive intervention, not a standard renewal email.

**Native option:** If you have [Service Hub Professional+](https://www.hubspot.com/pricing/service), use HubSpot's built-in health scoring in the [Customer Success Workspace](https://knowledge.hubspot.com/customer-success/set-up-and-manage-the-customer-success-workspace). It supports weighted scoring across multiple categories (engagement, product usage, support tickets).

**Custom option:** For teams without Service Hub, a simple 3-value dropdown updated by workflows or manually is better than nothing.

Health score properties feed [churn prevention workflows](/posts/hubspot-churn-prevention-health-scores-workflows).

---

### 11. Renewal Created (Boolean)

**Object:** Deal
**Field type:** Yes/No (boolean)
**Default:** No

**Why:** Used by the boolean toggle pattern to [solve the infinite loop problem](/posts/hubspot-renewal-workflow-infinite-loop-fix). When a renewal deal creates the next year's deal, this property flips to "Yes", preventing the workflow from firing again on the same deal.

---

### 12. CSM/Account Manager

**Object:** Deal
**Field type:** HubSpot user (deal owner) or custom user picker

**Why:** In many organizations, the CSM who manages the relationship is different from the deal owner. This property ensures the right person gets renewal tasks and notifications.

**Alternative:** If your CSM always = Deal Owner on renewal deals, you don't need a separate property. Just ensure your automation assigns the correct owner when creating the renewal deal.

---

### 13. Last QBR Date

**Object:** Company
**Field type:** Date picker

**Why:** Quarterly Business Reviews are a leading indicator of renewal health. A customer who hasn't had a QBR in 6+ months is harder to renew. This property powers workflows that alert CSMs when a QBR is overdue.

---

### 14. Original Deal ID

**Object:** Deal
**Field type:** Single-line text

**Why:** Links the renewal deal back to the original new business deal. Useful for tracing the full customer journey: "This renewal came from deal #12345, which closed on [date] for [amount]."

**How to set it:** The workflow that creates the renewal deal copies the enrolled deal's Record ID to this property.

---

### 15. Renewal Outcome Notes

**Object:** Deal
**Field type:** Multi-line text

**Why:** A catch-all for context that doesn't fit into structured properties. "Customer mentioned budget concerns in Q3 QBR." "New CTO wants to evaluate alternatives." "Expanding to 3 new locations, upsell opportunity."

This isn't for reporting, it's for the CSM who opens this deal in 6 months and needs to know the story.

---

## Property Setup Checklist

| # | Property | Object | Type | Required? |
|---|----------|--------|------|----------|
| 1 | Deal Type | Deal | Dropdown | On creation |
| 2 | Renewal Date | Deal | Date | On renewal deals |
| 3 | Contract Term | Deal | Number | On creation |
| 4 | Renewal Year | Deal | Number | Auto-set |
| 5 | Days to Renewal | Deal | Calculated | Auto-calc |
| 6 | Auto-Renew Flag | Deal | Dropdown | On creation |
| 7 | Previous Contract Value | Deal | Currency | Auto-set |
| 8 | Revenue Change Reason | Deal | Dropdown | When amount changes |
| 9 | Churn Reason | Deal | Dropdown | On Closed Lost |
| 10 | Health Score | Company | Dropdown | Auto-set or manual |
| 11 | Renewal Created | Deal | Boolean | Auto-set |
| 12 | CSM/Account Manager | Deal | User | On creation |
| 13 | Last QBR Date | Company | Date | Manual |
| 14 | Original Deal ID | Deal | Text | Auto-set |
| 15 | Renewal Outcome Notes | Deal | Multi-line text | Optional |

---

## Creating Renewal Pipeline Custom Properties in HubSpot

1. Go to **Settings → Properties**
2. Select the object (Deal or Company)
3. Click "Create property"
4. Choose the group (create a "Renewal Properties" group to keep them organized)
5. Set the field type and options
6. For required properties, configure this in the pipeline stage settings (Settings → Deals → Pipelines → Edit stage → Required properties)

These properties power [your automation workflows](/posts/hubspot-renewal-deal-workflow-automation). Set them up before building any workflows.

---

## Frequently Asked Questions

**What custom properties does a HubSpot renewal pipeline need that aren't built in?**
HubSpot's default deal properties are built for new business, not renewals. At minimum, add Deal Type, Renewal Date, Contract Term, and Previous Contract Value; the full list of 15 above covers reporting, forecasting, and churn analysis too, not just the basics.

**Do I need Operations Hub to track Days to Renewal?**
Only for the calculated version that updates automatically. Without Operations Hub, use a manually-maintained "Days to Renewal Range" dropdown updated by date-comparison workflows instead. Less precise, but it works on any tier.

**How do I calculate expansion and contraction revenue without Previous Contract Value?**
You can't, reliably. Expansion and contraction are both a comparison between this renewal's amount and the prior contract's amount; without storing that prior value on the deal, NRR and GRR calculations have no baseline to compare against. See our [NRR/GRR dashboard guide](/posts/hubspot-renewal-nrr-grr-dashboard-reporting) for how this property feeds the reporting layer.

**Should Health Score live on the Deal or the Company record?**
Company, when a customer can have multiple concurrent deals, since health reflects the account relationship, not any single contract. Put it on the Deal only if your business is strictly one-deal-per-customer.

---

**Need help setting up your renewal properties?** SWOTBee configures renewal pipelines end-to-end for mid-market teams, including all 15 properties, workflow automation, and reporting dashboards.

[Book a free 30-minute discovery call →](/contactus/)
