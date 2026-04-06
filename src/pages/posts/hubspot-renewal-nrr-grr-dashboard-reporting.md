---
layout: ../../layouts/BlogPostLayout.astro
title: "How to Track NRR, GRR & Renewal Rate in HubSpot Dashboards"
pubDate: "2026-04-02"
description: "HubSpot has no native NRR report. Here's how to build renewal dashboards using custom properties, calculated fields, and custom reports: including board-ready metrics."
category:
  title: "Revenue Operations"
  href: "/categories/revenue-operations"
author:
  name: "SWOTBee Team"
  url: "https://swotbee.com"
  imageUrl: "/assets/ico/logo.png"
image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"
tags:
  - "HubSpot"
  - "Renewal Pipeline"
  - "NRR"
  - "GRR"
  - "Revenue Reporting"
  - "Dashboards"
seriesName: "HubSpot Renewal Pipeline"
pillarUrl: "/posts/hubspot-renewal-pipeline-complete-guide"
---

Your board wants to see NRR. Your CFO wants GRR. Your CS leader wants renewal rate by segment. And HubSpot doesn't have a native report for any of them.

This isn't a gap in your HubSpot setup, it's a gap in HubSpot itself. The platform tracks deal revenue beautifully, but it doesn't natively calculate the retention metrics that recurring-revenue businesses need.

The good news: you can build these dashboards with custom properties, calculated fields, and HubSpot's custom report builder. This article shows you how.

> This article is part of our [Complete Guide to Building a Renewal Pipeline in HubSpot](/posts/hubspot-renewal-pipeline-complete-guide).

---

## The Four Metrics You Need

Before building anything, let's align on definitions:

### Renewal Rate

**Formula:** (Number of renewed deals ÷ Total deals up for renewal) × 100

**What it tells you:** What percentage of customers who could have renewed actually did. This is a count-based metric, it treats a $500/month customer the same as a $50,000/month customer.

**Benchmark:** 85, 95% for B2B SaaS according to [ChartMogul's SaaS Retention Report](https://chartmogul.com/reports/saas-retention-report/). Lower for transactional businesses, higher for enterprise contracts.

### Gross Revenue Retention (GRR)

**Formula:** (Starting MRR − Contraction − Churn) ÷ Starting MRR × 100

**What it tells you:** How much revenue you're retaining from existing customers, ignoring expansion. GRR can never exceed 100%. If your GRR is 95%, you're losing 5% of revenue to downgrades and churn. For a deeper comparison, see [ChartMogul's breakdown of gross vs. net retention](https://chartmogul.com/blog/gross-vs-net-retention/).

**Benchmark:** 90%+ is healthy. Below 85% is a red flag.

### Net Revenue Retention (NRR)

**Formula:** (Starting MRR + Expansion − Contraction − Churn) ÷ Starting MRR × 100

**What it tells you:** Your total revenue trajectory from existing customers, including upsells. NRR above 100% means you're growing from existing customers alone, even without new business. [Baremetrics' guide to net revenue retention](https://baremetrics.com/blog/what-is-net-revenue-retention) walks through the formula in detail.

**Benchmark:** 110%+ is excellent. 100, 110% is solid. Below 100% means you're shrinking. [SaaS Capital's benchmark data](https://www.saas-capital.com/blog-posts/what-is-a-good-retention-rate-for-a-private-saas-company/) shows a median NRR of 104% for private SaaS companies. But [as Jason Lemkin warns](https://www.saastr.com/high-nrr-can-mask-a-lot-of-problems/), high NRR can mask serious retention problems if a few large accounts expand while many small ones churn.

### Churn Rate

**Formula:** (Churned MRR ÷ Starting MRR) × 100

**What it tells you:** How fast you're losing revenue. Track monthly and annually.

**Benchmark:** <2% monthly / <5% annual for healthy B2B businesses. [Vitally's SaaS churn benchmarks](https://www.vitally.io/post/saas-churn-benchmarks) break this down further by company size and segment.

---

## Properties You Need First

These dashboards depend on [clean property data](/posts/hubspot-renewal-pipeline-properties). Make sure you have:

| Property | Type | Used For |
|----------|------|---------|
| Deal Type | Dropdown (New Business, Renewal, Expansion, Contraction) | Segmenting revenue by type |
| Renewal Date | Date | Tracking when renewals were due |
| Previous Contract Value | Currency | Calculating expansion/contraction |
| Revenue Change Reason | Dropdown | Understanding why amounts changed |
| Churn Reason | Dropdown | Analyzing lost revenue |
| Contract Term | Number (months) | Annualizing MRR calculations |
| Renewal Year | Number | Tracking cohort performance |

---

## Dashboard 1: The Operational Dashboard (For CSMs)

This dashboard answers: "What needs my attention today?"

### Report 1: Renewal Pipeline by Stage

**Type:** Deal funnel report
**Data source:** Deals in Renewal Pipeline
**Visualization:** Horizontal bar chart
**Breakdown:** Deal stage
**Filter:** Close date is this quarter

Shows how many deals are at each stage and total pipeline value per stage.

### Report 2: Upcoming Renewals (Next 30/60/90 Days)

**Type:** Custom report
**Data source:** Deals
**Filters:** Pipeline = Renewal, Deal Stage is not Closed Won or Closed Lost
**Columns:** Company name, Deal amount, Renewal date, Days to renewal, Deal owner, Health score
**Sort:** Days to renewal (ascending)

This is your CSM's daily worklist.

### Report 3: Overdue Renewals

**Type:** Deal list
**Filters:** Pipeline = Renewal, Renewal Date < Today, Stage is not Closed Won or Closed Lost
**Visualization:** Table with red highlighting
**Columns:** Company, Amount, Days overdue, Owner

Any deal on this list needs immediate attention.

### Report 4: At-Risk Accounts

**Type:** Custom report
**Filters:** Pipeline = Renewal, Health Score = "At Risk" or "Passive"
**Columns:** Company, Health score, Renewal date, Last activity date, Open support tickets

---

## Dashboard 2: The Revenue Dashboard (For Leadership)

This dashboard answers: "Are we retaining and growing revenue?"

### Report 5: Renewal Rate by Quarter

**Type:** Custom report
**Calculation:** Count of Closed Won renewals ÷ Count of all closed renewals (Won + Lost) per quarter
**Visualization:** Line chart with quarterly data points
**How to build it in HubSpot:**

1. Create a report → Custom Report Builder
2. Data source: Deals
3. Filter: Deal Type = Renewal, Pipeline = Renewal Pipeline
4. Rows: Close Date (quarterly)
5. Columns: Count of deals, segmented by "Deal Stage" (Closed Won vs Closed Lost)
6. Calculate percentage in a downloaded spreadsheet (HubSpot can't do the division natively in the report builder)

**Workaround for in-platform calculation:** Use [Operations Hub](https://www.hubspot.com/pricing/operations) to create a "Renewal Outcome" calculated property that flags Won/Lost, then build a report that counts each value per quarter.

### Report 6: Revenue Segmentation by Deal Type

**Type:** Custom report
**Data source:** Deals
**Visualization:** Stacked bar chart
**Rows:** Close Date (monthly or quarterly)
**Columns:** Sum of Amount, broken down by Deal Type (New Business, Renewal, Expansion, Contraction)

This one chart tells leadership: "How much of our closed revenue is new vs. recurring vs. growth?"

### Report 7: NRR Trend (Manual Calculation)

HubSpot can't calculate NRR natively. Here's the workaround:

1. **Export data monthly:** All deals closed this month, segmented by Deal Type
2. **Spreadsheet formula:**
   - Starting MRR = Sum of all active contracts at month start
   - Expansion = Sum of closed-won Expansion deals
   - Contraction = Sum of Contraction deals (or renewal deals where Amount < Previous Contract Value)
   - Churn = Sum of closed-lost Renewal deals
   - NRR = (Starting MRR + Expansion − Contraction − Churn) ÷ Starting MRR
3. **Track monthly** in a spreadsheet or BI tool
4. **Display in HubSpot** using a custom report that shows the component parts (even if the final calculation is manual)

For teams with [Operations Hub Enterprise](https://www.hubspot.com/pricing/operations), you can use datasets and calculated fields to get closer to an automated NRR report, but it still requires some manual setup.

### Report 8: Churn Analysis by Reason

**Type:** Custom report
**Data source:** Deals
**Filters:** Deal Type = Renewal, Stage = Closed Lost
**Visualization:** Pie chart or horizontal bar
**Breakdown:** Churn Reason property
**Time range:** Last 12 months

This tells you *why* you're losing customers, which is more actionable than just knowing *that* you're losing them.

---

## Dashboard 3: The Forecast Dashboard (For Finance)

This dashboard answers: "What revenue can we expect next quarter?"

### Report 9: Renewal Revenue Forecast by Month

**Type:** Deal forecast report
**Data source:** Deals in Renewal Pipeline
**Visualization:** Bar chart
**Rows:** Renewal Date (monthly)
**Columns:** Weighted deal amount (amount × stage probability)

**Critical:** Make sure your stage probabilities reflect renewal reality (85, 95%), not sales reality (20, 40%). See [why your renewal forecast is wrong](/posts/hubspot-renewal-forecasting-accuracy).

### Report 10: Pipeline Velocity

**Calculation:** (Number of deals × Average deal value × Win rate) ÷ Average days in pipeline

This tells you how fast revenue moves through your renewal pipeline. Track monthly and watch for slowdowns.

Segment your dashboard by [revenue type: renewal vs. expansion](/posts/hubspot-renewal-expansion-pipeline-structure) to keep the numbers clean.

---

## HubSpot's Built-In Revenue Analytics

If you have **[Sales Hub Enterprise](https://www.hubspot.com/pricing/sales)**, HubSpot offers a "[Revenue Analytics](https://knowledge.hubspot.com/reports/track-recurring-revenue-with-revenue-analytics)" tool under Reports. It provides:

- Recurring revenue tracking (if you use HubSpot's native recurring revenue properties)
- Renewal forecasting
- Churn tracking

**The catch:** It requires you to use HubSpot's specific recurring revenue properties and line item setup. If you've been tracking renewals with custom properties (which most teams do), you may need to migrate your data model to use it.

It's worth evaluating, but most mid-market teams find custom dashboards more flexible.

---

## Pro Tips

1. **Automate the data, not the math.** Use workflows to ensure Deal Type, Renewal Date, and Previous Contract Value are always populated. The math can happen in reports or spreadsheets.
2. **Snapshot monthly.** Create a monthly workflow that captures "MRR as of [date]" in a custom property on the company record. This gives you historical data points for trend analysis.
3. **Don't mix pipeline reports.** Always filter by Pipeline = Renewal Pipeline. Cross-pipeline reports are useful for total revenue, but they'll double-count if you're not careful.
4. **Report on cohorts.** Filter by "Renewal Year" to see if Year 2 customers renew at higher or lower rates than Year 1. This tells you whether your product is getting stickier over time.
5. **Benchmark externally.** Compare your NRR against public cloud companies using the [BVP Nasdaq Emerging Cloud Index](https://cloudindex.bvp.com/), or against private SaaS using [David Skok's SaaS Metrics 2.0 framework](https://www.forentrepreneurs.com/saas-metrics-2/).

---

**Building renewal dashboards that your board can actually use is harder than it looks.** SWOTBee builds NRR/GRR reporting for mid-market teams in Energy, Manufacturing, and SaaS, from property setup to executive-ready dashboards.

[Book a free 30-minute discovery call →](/contactus)
