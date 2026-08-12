---
layout: ../../layouts/BlogPostLayout.astro
title: "TCV vs ARR: Forecasting Multi-Year Contracts the Right Way"
pubDate: "2026-05-20"
description: "TCV vs ARR vs ACV explained: how to calculate each, how to derive ARR from TCV, and why blending Total Contract Value with Annual Recurring Revenue ruins your renewal forecasting accuracy."
category:
  title: "Revenue Operations"
  href: "/categories/revenue-operations"
modifiedDate: "2026-06-23"
author:
  name: "SWOTBee Team"
  url: "https://swotbee.com"
  imageUrl: "/assets/ico/logo.png"
  bio: "HubSpot-certified consultants specializing in deal automation, renewal pipelines, and CRM migration for mid-market B2B companies."
  linkedin: "https://linkedin.com/company/swotbee"
  expertise:
    - "Revenue Operations"
    - "SaaS Metrics"
    - "Renewal Forecasting"
image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop"
tags:
  - "SaaS Metrics"
  - "Renewal Forecasting"
  - "Revenue Operations"
  - "ARR"
  - "Renewal Pipeline"
seriesName: "Renewal Metrics"
pillarUrl: "/posts/renewal-metrics-explained"
faqs:
  - q: "What is the difference between TCV and ARR?"
    a: "TCV is the total value of a contract over its full term including one-time fees; ARR is the recurring revenue normalized to one year. TCV is a total; ARR is an annual run-rate."
  - q: "Is TCV the same as ARR?"
    a: "No. For any contract longer than a year or with one-time fees, TCV is larger than ARR. They match only for a one-year, purely recurring deal."
  - q: "How do you calculate ARR from TCV?"
    a: "Subtract one-time fees from TCV, then divide by the contract term in years."
  - q: "What is the difference between TCV and revenue?"
    a: "TCV is the contracted total value; recognized revenue is earned over time as the service is delivered. TCV is committed, not yet all earned."
  - q: "When should you use TCV versus ARR?"
    a: "Use ARR for forecasting, run-rate, and valuation; use TCV for total deal size, bookings, and commissions."
---

> This article is part of our [guide to SaaS renewal metrics](/posts/renewal-metrics-explained/).

**TCV (Total Contract Value) is the total value of a contract over its entire term, including one-time fees; ARR (Annual Recurring Revenue) is the recurring subscription revenue normalized to a single year.** They are not the same, and blending them is the fastest way to ruin your renewal forecasting. A three-year, $300,000 deal has a TCV of $300,000 but an ARR of $100,000. Forecast renewals off TCV and your numbers will be wrong by multiples.

Contract value is a critical SaaS metric, but only if you keep TCV, ARR, and ACV separate. This guide defines each, shows how to calculate them, and explains when to use which.

---

## TCV vs ARR vs ACV: The Difference

<img src="/assets/posts/diagrams/tcv-arr-acv.svg" alt="TCV vs ARR vs ACV for a three-year 300k dollar contract" width="640" height="250" loading="lazy" decoding="async" />

Three metrics, three jobs:

- **TCV (Total Contract Value):** the total amount of revenue a customer contract is worth over its full length, including recurring subscription revenue plus one-time fees (onboarding, services). It answers "how much is this whole deal worth?"
- **ARR (Annual Recurring Revenue):** the recurring revenue normalized to one year. It excludes one-time fees. It answers "how much predictable annual revenue does this customer represent?"
- **ACV (Annual Contract Value):** the average recurring revenue per year of a contract. For a single-year deal, ACV and ARR match; for multi-year deals with ramps, ACV is the average annual value.

So in the TCV vs ARR vs ACV comparison: TCV is the total, ARR is the annualized recurring run-rate, and ACV measures the average annual value of a customer contract. Each is a distinct revenue metric for a subscription business, and SaaS companies that treat ACV vs ARR vs TCV as interchangeable end up reporting numbers that do not reconcile. ACV vs TCV is a question of average-per-year versus total; ARR vs ACV is a question of run-rate versus contracted average; and ACV vs ARR only diverges on multi-year or ramped deals.

---

## How to Calculate TCV, ARR, and ACV

**Calculate TCV:**

```
TCV = (monthly recurring revenue × contract term in months) + one-time fees
```

**Calculate ARR:**

```
ARR = monthly recurring revenue × 12
```

**Calculate ACV:**

```
ACV = (TCV − one-time fees) ÷ contract term in years
```

### How to Calculate ARR From TCV

A common question: how do you get ARR from TCV? Strip out one-time fees, then divide by the number of years:

```
ARR = (TCV − one-time fees) ÷ contract term in years
```

For a 3-year deal with TCV of $330,000 that includes a $30,000 onboarding fee: ARR = (330,000 − 30,000) ÷ 3 = $100,000. The TCV would overstate annual recurring revenue by more than 3x if used directly.

---

## Why Blending TCV and ARR Ruins Forecasting

Forecasting renewals means projecting recurring revenue that comes up for renewal. TCV includes money that is not recurring and not up for renewal this year:

- **One-time fees** (onboarding, services) never renew, but they sit inside TCV.
- **Future contract years** are already committed, so they are not "at risk" in this period's renewal forecast.

If your pipeline reports deal amount as TCV but your forecast assumes that figure recurs annually, every multi-year deal inflates the forecast. Separate the two in your pipeline: store ARR (or ACV) for run-rate and forecasting, and TCV for total deal size. This is the single biggest fix for the errors covered in [why your renewal forecast is wrong](/posts/hubspot-renewal-forecasting-accuracy/).

---

## When to Use TCV vs ARR

Each metric has its moment:

| Use case | Best metric |
|----------|-------------|
| Renewal forecasting and run-rate | ARR (or ACV for multi-year) |
| Sizing total deal value / commissions | TCV |
| Comparing deals of different lengths | ACV |
| Valuation and growth metrics | ARR |
| Cash and bookings | TCV |

Use TCV when the question is "how big is this deal in total." Use ARR when the question is "how much predictable annual revenue do we have, and how much renews." Using TCV where ARR belongs is how forecasts drift.

---

## What ACV Tells You (and When to Use It)

ACV helps when you compare deals of different lengths. Because ACV measures the average annual value, it normalizes a 1-year and a 3-year deal onto the same scale, so you can rank reps, segments, and cohorts fairly. Use ACV when the question is "what is the typical annual revenue generated per customer," and use TCV when the question is total deal size. ACV may also feed commission and quota models, because it reflects the annual revenue a deal contributes rather than the full multi-year total. In short: ACV tells you per-year value, ARR tells you run-rate, and TCV is the total amount across the length of the contract.

## TCV, Deferred Revenue, and Revenue Recognition

Contract value is not the same as recognized revenue. When a customer signs, the future revenue across the term is contracted (that is the TCV), but you have not earned it yet. Under revenue recognition rules, you recognize earned revenue as you deliver the service each month; the rest sits as deferred revenue on the balance sheet. So TCV measures the total revenue expected from the contract, while recognized revenue measures how much revenue you have actually earned to date. Mixing contracted value (TCV), run-rate (ARR and TCV viewed annually), and recognized revenue is a classic reporting error: each answers a different question about the same deal.

## How TCV Relates to LTV and Other SaaS Metrics

TCV is a contracted figure: the total revenue expected across the signed term. Customer lifetime value (LTV) is a projected figure: the total revenue expected across the entire relationship, including future renewals beyond the current contract. ACV often feeds LTV models (LTV is roughly ACV times expected customer lifetime), while ARR drives growth and retention metrics like [net revenue retention](/posts/gross-vs-net-revenue-retention/). Keeping each metric in its lane keeps your SaaS revenue reporting honest.

---

## Frequently Asked Questions

**What is the difference between TCV and ARR?**
TCV is the total value of a contract over its full term including one-time fees; ARR is the recurring revenue normalized to one year. TCV is a total; ARR is an annual run-rate.

**Is TCV the same as ARR?**
No. For any contract longer than a year or with one-time fees, TCV is larger than ARR. They match only for a one-year, purely recurring deal.

**How do you calculate ARR from TCV?**
Subtract one-time fees from TCV, then divide by the contract term in years.

**What is the difference between TCV and revenue?**
TCV is the contracted total value; recognized revenue is earned over time as the service is delivered. TCV is committed, not yet all earned.

**When should you use TCV versus ARR?**
Use ARR for forecasting, run-rate, and valuation; use TCV for total deal size, bookings, and commissions.

---

TCV vs ARR is one piece of clean renewal forecasting; see the full picture in our [SaaS renewal metrics guide](/posts/renewal-metrics-explained/) and how to [measure at-bat renewal rate](/posts/at-bat-renewal-rate/).

**Multi-year deals quietly break most forecasts:** TCV masquerading as ARR, one-time fees inflating run-rate. SWOTBee builds clean renewal forecasting and pipeline reporting for mid-market companies across Energy, Manufacturing, and SaaS.

[Book a free 30-minute discovery call →](/contactus/)
