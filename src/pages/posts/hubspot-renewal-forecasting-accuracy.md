---
layout: ../../layouts/BlogPostLayout.astro
title: "HubSpot Renewal Forecasting: Why Your Numbers Are Wrong (And How to Fix Them)"
pubDate: "2026-04-02"
description: "Renewal deals close at 85-95% while new business closes at 20-30%. If you're using the same forecast model for both, your numbers are fiction. Here's how to fix HubSpot renewal forecasting."
category:
  title: "Revenue Operations"
  href: "/categories/revenue-operations"
author:
  name: "SWOTBee Team"
  url: "https://swotbee.com"
  imageUrl: "/assets/ico/logo.png"
image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=450&fit=crop"
tags:
  - "HubSpot"
  - "Renewal Pipeline"
  - "Revenue Forecasting"
  - "Pipeline Analytics"
  - "Revenue Operations"
seriesName: "HubSpot Renewal Pipeline"
pillarUrl: "/posts/hubspot-renewal-pipeline-complete-guide"
---

If your forecast includes both new business and renewal deals using the same probability weights, your number is wrong. It's not "a little off." It's structurally broken.

Here's why: new business deals close at 20, 30%. Renewal deals close at 85, 95% ([KeyBanc's annual SaaS Survey](https://investor.key.com/press-releases/news-details/2025/PRIVATE-SAAS-COMPANY-SURVEY-REVEALS-AI-DRIVEN-TRANSFORMATION-AND-SUSTAINED-OPERATIONAL-EXCELLENCE/default.aspx) puts gross retention approaching 90% industry-wide). When HubSpot multiplies deal value by stage probability, a $100K renewal at "Proposal Sent" (let's say 40% probability) shows as $40K weighted value. In reality, that renewal has a 90%+ chance of closing, the real weighted value is $90K.

Your forecast just understated that deal by $50K. Multiply that across your pipeline and your CFO is making decisions on fantasy numbers.

> This article is part of our [Complete Guide to Building a Renewal Pipeline in HubSpot](/posts/hubspot-renewal-pipeline-complete-guide).

---

## Why Standard HubSpot Forecasting Fails for Renewals

HubSpot's forecast tool works well for new business. It takes each deal's amount, multiplies by the stage probability, and sums the result. Simple and effective, when every deal behaves similarly.

Renewals break this model in three ways:

### 1. Close Rates Are Fundamentally Different

| Deal Type | Typical Close Rate | Standard HubSpot Probability |
|-----------|-------------------|---------------------------|
| New Business | 20, 30% | 10%-60% across stages |
| Renewal | 85, 95% | Same 10%-60% (wrong!) |
| Expansion | 40, 60% | Varies |

Using new business probabilities on renewal deals systematically understates your forecast.

### 2. Renewal Timing Is Predictable

New business deals close when the buyer is ready (unpredictable. Renewals close near the contract renewal date) highly predictable. A renewal 90 days out is far more certain than a new business deal at "Demo Completed."

Your forecast model should reflect this certainty.

### 3. Loss Signals Are Different

New business "stalls" in mid-pipeline stages. Renewals rarely stall, they either renew or they churn, and churn is usually visible through health signals well before the renewal conversation.

A renewal sitting at "60-Day Proposal" isn't stalling, the customer just hasn't signed yet. Don't discount it the way you'd discount a stalled sales deal.

---

## How to Fix It: Renewal-Specific Probabilities

### Step 1: Set Renewal Pipeline Probabilities

Go to **Settings → Objects → Deals → Pipelines → Renewal Pipeline** and set stage probabilities that reflect renewal reality:

| Stage | Probability | Rationale |
|-------|------------|-----------|
| Active Contract | 80% | Baseline, most customers renew |
| Upcoming Renewal (180 days) | 82% | Slightly higher, no churn signals yet |
| 90-Day Check-In | 85% | Engagement started, positive signal |
| 60-Day Proposal Sent | 90% | Proposal delivered, high confidence |
| 30-Day Negotiating | 85% | Terms under discussion, slight uncertainty |
| Overdue | 50% | Significant risk, contract has lapsed |
| Closed Won | 100% | Done |
| Closed Lost | 0% | Done |

**Note:** The "Negotiating" stage drops slightly from "Proposal Sent", if a customer pushes back on terms, there's real churn risk. This is counterintuitive but reflects the data.

### Step 2: Calibrate Against Historical Data

After one quarter, pull your actual renewal data:

1. For each stage, count: how many deals that entered this stage eventually closed as Won?
2. That's your actual probability.
3. Update your stage probabilities to match.

Repeat this calibration quarterly. Your probabilities should converge on reality within 2, 3 quarters.

Forecast accuracy starts with [correct stage probabilities](/posts/hubspot-renewal-pipeline-stages), set these when you configure your pipeline.

---

## Segmenting Your Forecast

Never combine new business and renewal forecasts into one number. HubSpot's forecast tool lets you view forecasts per pipeline, use this.

### Forecast View 1: New Business Revenue

Pipeline: Sales Pipeline
Use: Planning hiring, marketing spend, growth targets

### Forecast View 2: Renewal Revenue

Pipeline: Renewal Pipeline
Use: Baseline revenue prediction, retention targets, CS resource planning

### Forecast View 3: Expansion Revenue

Pipeline: Expansion Pipeline (or filter by Deal Type = Expansion)
Use: Growth from existing customers, product adoption indicators

### The Combined View

Your total revenue forecast = New Business + Renewal + Expansion − Contraction − Churn

This requires pulling data from multiple pipelines. Use HubSpot's custom report builder to create a single view, or export to a spreadsheet for the final calculation.

---

## Building a Predictable Renewal Revenue Model

Since renewals are time-driven, you can forecast with unusual accuracy if you have three data points:

1. **Total renewal value coming due** (sum of all renewal deals in the pipeline)
2. **Historical renewal rate** (what percentage actually renew)
3. **Average expansion/contraction rate** (how much revenue changes at renewal)

**Example:**
- $2M in renewals due next quarter
- 90% historical renewal rate → $1.8M expected renewals
- 5% average expansion rate → +$90K
- 3% average contraction rate → −$54K
- **Predicted renewal revenue: $1,836K**

This is far more accurate than summing weighted pipeline values, because the probabilities are based on portfolio-level data rather than deal-level guesses. You can benchmark your model against public SaaS companies tracked in the [BVP Nasdaq Emerging Cloud Index](https://cloudindex.bvp.com/).

---

## Common Forecasting Mistakes

### Mistake 1: Using the Same Probabilities for All Pipelines

This is the #1 mistake. If your renewal pipeline uses the same 10%/20%/40%/60% probability scale as your sales pipeline, your forecast understates renewal revenue by 30, 50%.

### Mistake 2: Not Segmenting by Deal Type in Reports

Even with separate pipelines, your board report might combine all closed-won revenue. Make sure leadership can see: "Of the $5M we closed this quarter, $3M was renewals, $1.5M was new business, and $500K was expansion."

### Mistake 3: Ignoring Overdue Deals

A deal past its renewal date with no outcome is a forecasting black hole. It's not "Closed Won" and it's not "Closed Lost", it's just sitting there, distorting your pipeline value. Set a deadline: if a renewal is 30+ days overdue with no engagement, move it to Closed Lost.

### Mistake 4: Forecasting Too Far Out

Renewal forecasts are highly accurate for next quarter and reasonably accurate for the quarter after. Beyond that, customer situations change too much. Forecast 1, 2 quarters out for renewals, not 12 months.

### Mistake 5: Not Accounting for Multi-Year Contracts

If a customer signed a 3-year contract, there's no renewal due for 3 years. Make sure these aren't showing up in your near-term renewal forecast. Filter by Renewal Date, not Close Date.

---

## Using HubSpot's Native Forecast Tool

HubSpot's [forecast tool](https://knowledge.hubspot.com/forecast/use-the-forecast-tool) ([Sales Hub Professional+](https://www.hubspot.com/pricing/sales)) lets you:

- View forecasts by pipeline
- Set manual forecast amounts per rep (useful when you want human judgment layered on top of weighted calculations)
- Compare "most likely," "best case," and "commit" categories

**Setup for renewals:**

1. Go to **Reports → Forecasts**
2. Select your Renewal Pipeline
3. Set the time period (this quarter)
4. Ask each CSM to categorize their deals into Commit / Best Case / Pipeline

This gives you a human-calibrated forecast alongside the weighted calculation. The best forecasts use both.

Visualize your forecast in [custom dashboards](/posts/hubspot-renewal-nrr-grr-dashboard-reporting) for executive reporting.

---

## The RevOps Forecast Cadence

For the most accurate renewal forecasts:

**Weekly:** CSMs review their pipeline and update deal stages + forecast categories
**Monthly:** RevOps pulls actual vs. forecast for the prior month, identifies gaps
**Quarterly:** Calibrate stage probabilities against actuals, adjust for next quarter

This cadence catches drift early. Without it, your forecast degrades over time as deal stages and probabilities fall out of sync with reality.

---

**Accurate renewal forecasting is the difference between hitting your number and being surprised.** SWOTBee builds renewal forecasting models for mid-market teams in Energy, Manufacturing, and SaaS, from pipeline setup to board-ready reports.

[Book a free 30-minute discovery call →](/contactus)
