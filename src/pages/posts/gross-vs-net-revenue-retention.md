---
layout: ../../layouts/BlogPostLayout.astro
title: "Gross vs Net Revenue Retention: The Valuation Multipliers"
pubDate: "2026-06-23"
description: "GRR vs NRR explained: how to calculate gross and net revenue retention, what good benchmarks look like, why investors demand NRR over 115%, and how net dollar retention drives SaaS valuation."
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
    - "Net Revenue Retention"
image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&h=450&fit=crop"
tags:
  - "SaaS Metrics"
  - "Net Revenue Retention"
  - "Revenue Operations"
  - "Churn"
  - "Renewal Pipeline"
seriesName: "Renewal Metrics"
pillarUrl: "/posts/renewal-metrics-explained"
---

> This article is part of our [guide to SaaS renewal metrics](/posts/renewal-metrics-explained).

**Gross revenue retention (GRR) measures how much recurring revenue you keep from existing customers after churn and downgrades; net revenue retention (NRR) adds expansion revenue on top, so it can exceed 100%.** GRR shows how well you patch leaks; NRR shows whether your existing customers fund growth on their own. The gap between the two is your expansion engine, and NRR is the metric investors use as a valuation multiplier.

If you track only one revenue retention rate, you are missing half the story. GRR and NRR together tell you whether your recurring revenue base is leaking, holding, or compounding.

---

## GRR vs NRR: The Core Difference

![GRR caps at 100% while NRR adds expansion and can exceed 100%](/assets/posts/diagrams/grr-vs-nrr.svg)

Both metrics measure the percentage of recurring revenue retained from your existing customer base over a period, but they treat expansion revenue differently:

- **Gross revenue retention** counts only revenue loss: churn and downgrades. It is capped at 100% because it ignores expansion. Gross retention focuses on how much of your core revenue you simply did not lose.
- **Net revenue retention** starts from the same base, subtracts churn and contraction, then adds expansion revenue from upgrades and cross-sell during the period. Because it includes expansion revenue, NRR can climb well above 100%.

So the difference between gross revenue retention and net revenue retention is expansion: GRR is retention before growth, NRR is retention and growth combined.

---

## How to Calculate NRR and GRR

Both start from the monthly recurring revenue (or ARR) of a cohort at the start of the period.

**Gross revenue retention rate:**

```
GRR = (Starting MRR − churn − downgrades) ÷ Starting MRR × 100
```

**Net revenue retention rate:**

```
NRR = (Starting MRR − churn − downgrades + expansion revenue) ÷ Starting MRR × 100
```

The only difference between the two formulas is the `+ expansion revenue` term. Note that neither uses new-customer revenue: both measure only revenue from existing customers, not new logos. To track these in your CRM, see [how to build NRR and GRR dashboards in HubSpot](/posts/hubspot-renewal-nrr-grr-dashboard-reporting).

### Is NRR the Same as Net Dollar Retention?

Yes. Net revenue retention and net dollar retention (NDR) are the same metric with two names. You will see both in board decks; they measure the same percentage of recurring revenue retained including expansion.

### A Worked Example

Take a cohort with $100,000 in recurring revenue at the start of the period (you can use monthly recurring revenue or annual recurring revenue, as long as you are consistent). Over the year:

- Churn: $8,000 lost to cancellations
- Downgrades: $4,000 of contraction
- Expansion revenue during the period: $22,000 from upgrades and cross-sell

The math:

```
GRR = (100,000 − 8,000 − 4,000) ÷ 100,000 = 88%
NRR = (100,000 − 8,000 − 4,000 + 22,000) ÷ 100,000 = 110%
```

Here the gross retention rate is 88% and the net retention rate is 110%. The 22-point gap is pure expansion. This is the difference between net revenue retention and gross retention in one example: gross revenue retention focuses on what you kept, while net revenue retention considers expansion on top. Note the number of customers is irrelevant to the math; both are revenue retention rates measured on the recurring revenue at the start, not on logos.

---

## What a 120% Net Revenue Retention Rate Means

A 120% NRR means that, ignoring all new customers, your existing customer base grew its recurring revenue by 20% over the period. Expansion revenue more than replaced everything lost to churn and downgrades. That is the holy grail: a business that grows even if it stops acquiring new customers.

By contrast, a 95% GRR with 120% NRR tells a precise story: you are losing 5% of core revenue to churn and downgrades, but expansion adds 25 points on top.

---

## Good Benchmarks for GRR and NRR

Benchmarks vary by segment, but as a guide for B2B SaaS:

| Metric | Weak | Good | Best-in-class |
|--------|------|------|---------------|
| Gross revenue retention | <85% | 90% | 95%+ |
| Net revenue retention | <100% | 110% | 120%+ |
| Logo retention rate | <80% | 90% | 95%+ |

Enterprise SaaS retains higher than self-serve. Investors treat NRR as a valuation multiplier: companies with NRR over 115% command materially higher revenue multiples, because high net retention signals durable, compounding revenue growth. This is why NRR is often the single most scrutinized retention metric in a funding round.

---

## Why Both Metrics Matter

NRR alone can hide a problem. A company can post a healthy net revenue retention rate while its gross retention is quietly poor, because a few large expansions mask broad churn. Watching gross retention and net retention together prevents that blind spot:

- **GRR** tells you about product value and customer satisfaction: are customers staying?
- **NRR** tells you about growth efficiency: are the customers who stay spending more?

A wide gap (high NRR, lower GRR) means you are growing on the backs of a few accounts while leaking many. A narrow gap with high GRR is healthier and more durable.

---

## What Each Metric Actually Tells You

It helps to state plainly what each revenue retention metric measures:

- **Gross revenue retention tells** you the ceiling on how much of your existing recurring revenue you defended. Because revenue retention doesn't count expansion in the gross version, GRR is the honest measure of leakage: revenue retained from existing customers, nothing added back.
- **Net revenue retention measures** how much revenue from your existing base you both kept and grew. It measures how much revenue you retain and grow without any new logos, so a strong NRR means you can grow revenue and increase revenue from the customers you already have.

Put together, these revenue retention metrics give you insights into customer retention that a single number cannot. The recurring revenue retained from existing customers (GRR) plus the expansion layer (NRR) shows both durability and momentum. Looking at net revenue retention vs gross revenue retention side by side is the fastest way to read the health of your base.

## How to Improve GRR Specifically

To improve GRR you have to stop revenue loss at the source, because gross retention cannot be fixed with expansion. Reduce churn and downgrades through onboarding, value reviews, and early risk detection. Every point you improve GRR raises the floor under your NRR, so the total revenue you retain and grow compounds. Teams that improve GRR first, then layer expansion, build the most durable revenue base.

## Which Metric Is More Important, and When?

It depends on the audience and stage:

- **Early-stage and product teams** should obsess over GRR first. You cannot expand a leaky bucket, and improving GRR (fixing churn and downgrades) is the foundation.
- **Growth-stage and investors** weight NRR, because it shows whether the revenue base compounds. Net retention vs gross retention becomes the headline once churn is under control.

In practice, track both. GRR is your floor; NRR is your ceiling.

---

## How to Improve Gross and Net Revenue Retention

- **Lift GRR** by reducing revenue churn: better onboarding, proactive [renewal risk scoring](/posts/hubspot-renewal-risk-scoring), and catching [silent churn](/posts/silent-churn-detection) early.
- **Lift NRR** by engineering expansion: track [cross-sell vs upsell](/posts/cross-sell-vs-upsell) separately and use [product-qualified signals](/posts/product-qualified-signals-expansion) to time the offer.
- **Measure it cleanly** by separating new, expansion, and churned revenue streams in your pipeline so the math is trustworthy.

---

## Common Mistakes When Measuring Revenue Retention

- **Mixing new logos into the base.** Both metrics measure only revenue from existing customers. Including new-customer revenue inflates your revenue retention rates and hides churn.
- **Counting expansion in GRR.** Gross retention must exclude expansion revenue. If expansion sneaks in, GRR can read above 100%, which is mathematically impossible and a sign of a broken calculation.
- **Inconsistent periods.** Compare annual recurring revenue at the start of the period against the same cohort at the end. Switching windows mid-analysis corrupts the trend.
- **Reporting NRR without GRR.** A strong net revenue retention rate can mask a poor gross retention rate when a few large accounts expand. Always show both so leadership sees the leakage behind the growth.
- **Ignoring logo retention.** Revenue retention metrics weight large accounts heavily. Pair them with logo retention rate to see whether you are losing many small customers while big ones expand.

Avoiding these keeps your retention reporting trustworthy and your board decks honest.

## Frequently Asked Questions

**What is the difference between GRR and NRR?**
GRR measures recurring revenue retained after churn and downgrades (capped at 100%); NRR adds expansion revenue on top, so it can exceed 100%. The difference is expansion.

**How do you calculate net revenue retention?**
NRR = (starting MRR − churn − downgrades + expansion) ÷ starting MRR × 100, measured on existing customers only.

**What is a good NRR benchmark?**
110% is healthy and 120%+ is best-in-class for B2B SaaS; investors particularly reward NRR over 115%.

**What does 120% NRR mean?**
Your existing customer base grew its recurring revenue 20% over the period, with expansion outpacing all churn and downgrades.

**Is net revenue retention the same as net dollar retention?**
Yes. NRR and NDR are two names for the same metric.

---

GRR and NRR are two of the core numbers in our [SaaS renewal metrics guide](/posts/renewal-metrics-explained); the [HubSpot NRR/GRR dashboard guide](/posts/hubspot-renewal-nrr-grr-dashboard-reporting) shows how to report them.

**Retention metrics are easy to misread and easy to game:** one big expansion can flatter a leaky base. SWOTBee builds clean retention reporting and churn-risk scoring for mid-market companies across Energy, Manufacturing, and SaaS.

[Book a free 30-minute discovery call →](/contactus)
