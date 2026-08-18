---
layout: ../../layouts/BlogPostLayout.astro
title: "How to Calculate Renewal Rate: The At-Bat Method"
pubDate: "2026-05-22"
description: "How to calculate renewal rate correctly: the count-based, revenue, gross and net renewal rate formulas, and why the at-bat method (only the cohort up for renewal) gives you the true number."
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
    - "Customer Success"
image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=450&fit=crop"
tags:
  - "SaaS Metrics"
  - "Renewal Pipeline"
  - "Revenue Operations"
  - "Customer Success"
  - "Churn"
seriesName: "Renewal Metrics"
pillarUrl: "/posts/renewal-metrics-explained"
faqs:
  - q: "How do you calculate renewal rate?"
    a: "Divide the customers (or ARR) that renewed by the customers (or ARR) up for renewal in the period, then multiply by 100. Use only the cohort actually up for renewal (at-bat)."
  - q: "How do you calculate net renewal rate?"
    a: "Include expansion revenue from renewing customers in the numerator: net renewal rate = renewed revenue (with expansion) ÷ revenue up for renewal. It can exceed 100%."
  - q: "What is the difference between renewal rate and retention rate?"
    a: "Renewal rate measures customers up for renewal in a window; retention rate measures the overall customer base over time."
  - q: "What is a good renewal rate?"
    a: "Around 90%+ for annual B2B SaaS on a count basis; below 80% signals a retention problem."
  - q: "How can you improve your renewal rate?"
    a: "Start renewals early, detect at-risk and silent-churn accounts, deliver continuous value, and measure the correct at-bat cohort."
---

> This article is part of our [guide to SaaS renewal metrics](/posts/renewal-metrics-explained/).

**The renewal rate measures the percentage of customers (or revenue) that renew their subscriptions out of those actually up for renewal in a period.** The renewal rate formula is renewed ÷ up-for-renewal × 100. The trick most teams miss: only count the cohort whose contracts are genuinely expiring in the window (the "at-bat" customers), not your entire customer base. Get the denominator wrong and your renewal rate is fiction.

Renewal rate is crucial because it is the cleanest read on whether customers renew, and it feeds retention, forecasting, and valuation. Here is how to calculate it correctly.

---

## The Renewal Rate Formula

<img src="/assets/posts/diagrams/renewal-rate-formula.svg" alt="At-bat renewal rate: renewed divided by customers up for renewal" width="640" height="245" loading="lazy" decoding="async" />

At its simplest, the renewal rate measures the percentage of customers who renew:

```
Renewal rate = (customers who renewed ÷ customers up for renewal) × 100
```

The denominator is everything. It must be the total number of customers up for renewal in the period, not your total customer count. This "at-bat" approach (only counting customers whose subscriptions are at the end of their term) is what separates a true renewal rate from a flattering one.

If a customer's contract is not expiring this period, they are not "at bat," so they do not belong in the calculation. Including them inflates the rate of renewal and hides churn among the cohort that actually had to decide.

---

## Count-Based vs Revenue Renewal Rate

There are two main ways to calculate your renewal rate, and they answer different questions:

- **Count-based (logo) renewal rate** = customers who renew ÷ customers up for renewal. It treats every customer equally.
- **Revenue (dollar) renewal rate** = renewed ARR ÷ ARR up for renewal. It weights by value, so losing one big account hurts more than losing several small ones.

Most SaaS companies track both. The count-based rate tells you about customer satisfaction across the base; the dollar renewal rate (sometimes called the MRR renewal rate) tells you about revenue risk.

---

## Gross vs Net Renewal Rate

Just like retention, renewal rate has a gross and net version:

- **Gross renewal rate** caps at 100%: it measures only renewed revenue against up-for-renewal revenue, ignoring expansion.
- **Net renewal rate** includes expansion from renewing customers, so it can exceed 100% when upsells outweigh churn within the cohort.

The difference mirrors [gross vs net revenue retention](/posts/gross-vs-net-revenue-retention/): gross shows what you kept, net shows what you kept and grew.

---

## A Worked Renewal Rate Calculation

Say 50 customers were up for renewal last quarter, carrying $500,000 in ARR. Of those, 45 renewed, carrying $480,000 (including $30,000 of expansion):

```
Count-based renewal rate = 45 ÷ 50 = 90%
Gross dollar renewal rate = (480,000 − 30,000) ÷ 500,000 = 90%
Net dollar renewal rate   = 480,000 ÷ 500,000 = 96%
```

Notice the at-bat denominator is 50, not your whole customer base. If you had 500 total customers and used that as the denominator, your renewal rate would look like an absurd 9%, or if inverted, a meaningless 99%. Only the cohort up for renewal counts.

---

## Renewal Rate vs Retention Rate

People use these interchangeably, but they differ. Renewal rate tracks the specific customers whose contracts came up for renewal; retention and renewal rates diverge because retention rate measures the broader customer base over time. Renewal rate is the sharper operational metric for the renewal process; retention is the longer arc. See the distinction in our [renewal metrics guide](/posts/renewal-metrics-explained/).

---

## What Is a Good Renewal Rate?

Benchmarks depend on segment, but for B2B SaaS, high renewal rates sit around 90% or above on a count basis and higher on a dollar basis for healthy businesses. Below 80% signals a retention problem. Measuring across customer cohorts (by segment, plan, or signup quarter) reveals where renewal rates differ, which a single blended number hides. See [cohort retention analysis](/posts/cohort-retention-analysis-churn/) for why cohorts matter.

---

## Why Renewal Rate Matters

The renewal rate is the percentage that tells you, at the rate at which a company's customers renew their subscriptions, whether the business is sustainable. It sits alongside churn and renewal rates as the core renewal rate metrics every SaaS business watches, because renewals from existing customers are far cheaper than new acquisition.

A strong SaaS renewal rate signals that you are meeting customers' needs and delivering a good customer experience; a weak one is an early warning that shows up before churn fully lands. Tracking subscription renewal rates over time, and across different customer segments, turns a single number into a diagnostic: you can see which plans, cohorts, or segments drive the number of customer renewals up or down. Pairing renewal and retention rates gives the complete picture, and a renewal rate calculator or dashboard makes it repeatable. If you want to learn how to calculate the renewal rate cleanly, the at-bat method above is the foundation; calculate the renewal rate on the right cohort and every downstream metric improves.

## How to Improve Your Renewal Rate

- **Start early.** Open renewal conversations 90 days out so there is time to address concerns.
- **Catch risk before the deadline.** Use [renewal risk scoring](/posts/hubspot-renewal-risk-scoring/) and watch for [silent churn](/posts/silent-churn-detection/).
- **Deliver value continuously.** Improving renewal rates comes from meeting customers' needs all year, not a renewal-week push.
- **Measure the right cohort.** Track the at-bat renewal rate so improving renewal rates is grounded in real numbers, not vanity math.

Track all of this in your [renewal pipeline dashboards](/posts/hubspot-renewal-nrr-grr-dashboard-reporting/).

---

## Frequently Asked Questions

**How do you calculate renewal rate?**
Divide the customers (or ARR) that renewed by the customers (or ARR) up for renewal in the period, then multiply by 100. Use only the cohort actually up for renewal (at-bat).

**How do you calculate net renewal rate?**
Include expansion revenue from renewing customers in the numerator: net renewal rate = renewed revenue (with expansion) ÷ revenue up for renewal. It can exceed 100%.

**What is the difference between renewal rate and retention rate?**
Renewal rate measures customers up for renewal in a window; retention rate measures the overall customer base over time.

**What is a good renewal rate?**
Around 90%+ for annual B2B SaaS on a count basis; below 80% signals a retention problem.

**How can you improve your renewal rate?**
Start renewals early, detect at-risk and silent-churn accounts, deliver continuous value, and measure the correct at-bat cohort.

---

The at-bat renewal rate is one metric in our [SaaS renewal metrics guide](/posts/renewal-metrics-explained/).

**Renewal rate is the metric teams most often miscalculate:** wrong denominator, blended cohorts, count-vs-dollar confusion. SWOTBee builds accurate renewal reporting for mid-market companies across Energy, Manufacturing, and SaaS.

[Get your 1-page renewal leakage estimate →](/resources/renewal-leakage-estimate/)

No call needed. Prefer to talk it through first? [Book a free 30-minute discovery call →](/renewal-audit-call/)
