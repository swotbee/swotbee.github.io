---
layout: ../../layouts/BlogPostLayout.astro
title: "Net Dollar Retention (NDR): Formula, GRR vs NRR, and the Valuation Multiplier"
pubDate: "2026-05-19"
description: "Net dollar retention (NDR) explained: the formula, a worked calculation, how NDR compares to NRR and GRR, what good benchmarks look like, and why investors reward NDR over 115%."
category:
  title: "Revenue Operations"
  href: "/categories/revenue-operations/"
modifiedDate: "2026-08-18"
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
pillarUrl: "/posts/renewal-metrics-explained/"
faqs:
  - q: "What is net dollar retention (NDR)?"
    a: "Net dollar retention is the percentage of recurring revenue you keep and grow from your existing customer base over a period, including expansion from upgrades and cross-sell. It is the same metric as net revenue retention (NRR); NDR and NRR are two names for one number."
  - q: "What is the net dollar retention formula?"
    a: "NDR = (Starting MRR − churn − downgrades + expansion revenue) ÷ Starting MRR × 100, measured on existing customers only, excluding any revenue from new logos."
  - q: "How do you calculate net dollar retention?"
    a: "Take your recurring revenue from existing customers at the start of the period, subtract churn and downgrades, add expansion revenue from upgrades and cross-sell, then divide by the starting figure and multiply by 100."
  - q: "What is the difference between net dollar retention and net revenue retention?"
    a: "None. Net dollar retention (NDR) and net revenue retention (NRR) are the same calculation. Some companies say NDR, others say NRR; SaaS earnings calls use both interchangeably."
  - q: "What is the difference between GRR and NRR?"
    a: "GRR measures recurring revenue retained after churn and downgrades (capped at 100%); NRR (also called NDR) adds expansion revenue on top, so it can exceed 100%. The difference is expansion."
  - q: "What is a good net dollar retention rate?"
    a: "110% is healthy and 120%+ is best-in-class for B2B SaaS; investors particularly reward net dollar retention over 115%."
  - q: "What does 120% NDR mean?"
    a: "Your existing customer base grew its recurring revenue 20% over the period, with expansion outpacing all churn and downgrades."
  - q: "Is net revenue retention the same as net dollar retention?"
    a: "Yes. NRR and NDR are two names for the same metric."
---

> This article is part of our [guide to SaaS renewal metrics](/posts/renewal-metrics-explained/).

**Net dollar retention (NDR), also called net revenue retention (NRR), is the percentage of recurring revenue you keep and grow from your existing customer base over a period: it starts from churn and downgrades, then adds back expansion revenue, so it can climb well above 100%.** Gross revenue retention (GRR) is the stricter sibling metric: it measures the same base after churn and downgrades but without adding expansion back, so it caps at 100%. The gap between GRR and NDR is your expansion engine, and NDR is the metric investors use as a valuation multiplier.

If you track only one revenue retention rate, you are missing half the story. GRR and net dollar retention together tell you whether your recurring revenue base is leaking, holding, or compounding.

Net dollar retention indicates, in one number, whether a company's NDR is increasing revenue from current customers faster than it loses it. An NDR above 100% means revenue from its existing customer base is growing without needing to acquire new customers; an NDR below 100% means the opposite, and it is often called by its performance indicator alongside net income and pricing as one of the metrics a software as a service board reviews every quarter. A higher NDR is unambiguously better than a lower NDR, and Corporate Finance Institute (CFI) and Wall Street Prep both treat it as a core valuation input.

---

## The Net Dollar Retention Formula

```
NDR = (Starting MRR − churn − downgrades + expansion revenue) ÷ Starting MRR × 100
```

Net dollar retention takes the total recurring revenue from your existing customers at the start of a period, subtracts what you lost to churn (the customer churn rate applied to revenue) and downgrades, adds back what you gained from expansion (upselling, cross-selling, seat growth), and divides by the starting figure. It is calculated only on existing customers; revenue from newly acquired customers never enters the formula to calculate NDR, which is what makes it a pure measure of how well a SaaS business grows the base it already has, independent of customer acquisition cost or new-logo growth.

Net dollar retention, net revenue retention, and NDR vs NRR are all names for this same number, and "net dollar retention" is also referred to as net revenue retention interchangeably in most SaaS reporting. There is no calculation difference between them: a company reporting "a company's NDR of 118%" and one reporting "NRR of 118%" are describing an identical result. A close cousin, gross dollar retention, is the same calculation as GRR below: recurring revenue retained without adding expansion back.

### Why Net Dollar Retention Matters for SaaS Companies

For a subscription business model, revenue does not reset to zero each period the way it does for a one-time-purchase company: existing customers carry forward, so change in revenue from that base compounds. A high NDR means a SaaS company can grow its total recurring revenue even in a quarter where it fails to acquire new customers at all, because additional revenue from existing accounts, delivered by customer success driving adoption and expansion, more than replaces churn. An NDR greater than 100% is the clearest proof that a customer success motion is working, independent of how many new logos sales brings in. That is why net dollar retention is treated as a measure of customer retention and of financial stability at once: it captures customer satisfaction and retention (do customers stay and grow) in a single, auditable number, and it correlates with customer lifetime value, since a high-NDR account is worth more over its lifetime than the same account with flat or negative retention. Investors reading a valuation multiple look at NDR before customer acquisition cost, because NDR tells them whether growth compounds or has to be bought again every quarter.

---

## GRR vs NRR (Net Dollar Retention): The Core Difference

<img src="/assets/posts/diagrams/grr-vs-nrr.svg" alt="GRR caps at 100% while NRR adds expansion and can exceed 100%" width="640" height="250" loading="lazy" decoding="async" />

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

The only difference between the two formulas is the `+ expansion revenue` term. Note that neither uses new-customer revenue: both measure only revenue from existing customers, not new logos. To track these in your CRM, see [how to build NRR and GRR dashboards in HubSpot](/posts/hubspot-renewal-nrr-grr-dashboard-reporting/).

### Is NRR the Same as Net Dollar Retention?

Yes. Net revenue retention and net dollar retention (NDR) are the same metric with two names, and the net dollar retention formula and the NRR formula are identical. You will see both in board decks; they measure the same percentage of recurring revenue retained including expansion.

### A Worked Example: Calculating Net Dollar Retention

Take a cohort with $100,000 in recurring revenue at the start of the period (you can use monthly recurring revenue or annual recurring revenue, as long as you are consistent). Over the year:

- Churn: $8,000 lost to cancellations
- Downgrades: $4,000 of contraction
- Expansion revenue during the period: $22,000 from upgrades and cross-sell

The math:

```
GRR = (100,000 − 8,000 − 4,000) ÷ 100,000 = 88%
NDR = (100,000 − 8,000 − 4,000 + 22,000) ÷ 100,000 = 110%
```

Here the gross retention rate is 88% and the net dollar retention rate is 110%. The 22-point gap is pure expansion. This is the difference between net dollar retention and gross retention in one example: gross revenue retention focuses on what you kept, while net dollar retention considers expansion on top. Note the number of customers is irrelevant to the math; both are revenue retention rates measured on the recurring revenue at the start, not on logos.

### NDR vs NRR vs GRR at a Glance

| | Gross revenue retention (GRR) | Net dollar retention (NDR / NRR) |
|---|---|---|
| Formula | (Starting MRR − churn − downgrades) ÷ Starting MRR | (Starting MRR − churn − downgrades + expansion) ÷ Starting MRR |
| Includes expansion revenue | No | Yes |
| Can exceed 100% | Never | Yes, routinely for healthy SaaS |
| What it answers | How much did we not lose? | Did the base we kept also grow? |
| Who asks for it | Product and CS leadership, tracking retention in isolation | Investors and the board, as a growth-durability signal |
| How to get it in HubSpot | Filter closed-won renewal deals by prior-period amount | Same filter, plus expansion deals tagged to the same account |

Same underlying data, two different questions. GRR alone can look fine while NDR (also written NRR) tells the growth story; report both, not one.

---

## What a 120% Net Dollar Retention Rate Means

A 120% NDR (or NRR, same number) means that, ignoring all new customers, your existing customer base grew its recurring revenue by 20% over the period. Expansion revenue more than replaced everything lost to churn and downgrades. That is the holy grail: a business that grows even if it stops acquiring new customers.

By contrast, a 95% GRR with 120% net dollar retention tells a precise story: you are losing 5% of core revenue to churn and downgrades, but expansion adds 25 points on top.

---

## Net Dollar Retention Benchmarks: What Counts as Good NDR

Benchmarks vary by segment, but as a guide for B2B SaaS:

| Metric | Weak | Good | Best-in-class |
|--------|------|------|---------------|
| Gross revenue retention | <85% | 90% | 95%+ |
| Net dollar retention (NDR/NRR) | <100% | 110% | 120%+ |
| Logo retention rate | <80% | 90% | 95%+ |

Enterprise SaaS retains higher than self-serve. Investors treat net dollar retention as a valuation multiplier: companies with NDR over 115% command materially higher revenue multiples, because high net retention signals durable, compounding revenue growth. This is why NDR is often the single most scrutinized retention metric in a funding round, and why "net dollar retention" is the phrase you will hear on a SaaS earnings call more often than "NRR."

A strong NDR means your existing customers, as a group, are worth more each period; a low or shrinking NDR means the base is contracting even before you count logo churn. NDR sits alongside net promoter score and customer acquisition cost as one of the three numbers a SaaS board reviews every quarter, and it is the one hardest to fake: unlike NPS, it comes straight out of the revenue ledger and measures the percentage of revenue actually retained, not a survey response.

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

## How to Improve NDR and GRR

- **Lift GRR** by reducing revenue churn: better onboarding, proactive [renewal risk scoring](/posts/hubspot-renewal-risk-scoring/), and catching [silent churn](/posts/silent-churn-detection/) early. This is also how you improve gross dollar retention, since it is the same calculation.
- **Lift NDR** by engineering expansion: track [cross-sell vs upsell](/posts/cross-sell-vs-upsell/) separately and use [product-qualified signals](/posts/product-qualified-signals-expansion/) to time the offer, and use retention strategies that target accounts below their usage ceiling before they think to ask for a downgrade.
- **Improve customer lifetime value alongside NDR.** The two move together: an account with strong net dollar retention is, by definition, growing its lifetime value; user retention strategies aimed at satisfaction and adoption move both numbers at once.
- **Measure it cleanly** by separating new, expansion, and churned revenue streams in your pipeline so the calculation to calculate retention is trustworthy and audit-proof.

---

## Common Mistakes When Measuring Revenue Retention

- **Mixing new logos into the base.** Both metrics measure only revenue from existing customers. Including new-customer revenue inflates your revenue retention rates and hides churn.
- **Counting expansion in GRR.** Gross retention must exclude expansion revenue. If expansion sneaks in, GRR can read above 100%, which is mathematically impossible and a sign of a broken calculation.
- **Inconsistent periods.** Compare annual recurring revenue at the start of the period against the same cohort at the end. Switching windows mid-analysis corrupts the trend.
- **Reporting NRR without GRR.** A strong net revenue retention rate can mask a poor gross retention rate when a few large accounts expand. Always show both so leadership sees the leakage behind the growth.
- **Ignoring logo retention.** Revenue retention metrics weight large accounts heavily. Pair them with logo retention rate to see whether you are losing many small customers while big ones expand.

Avoiding these keeps your retention reporting trustworthy and your board decks honest.

## Frequently Asked Questions

**What is net dollar retention (NDR)?**
Net dollar retention is the percentage of recurring revenue you keep and grow from your existing customer base over a period, including expansion from upgrades and cross-sell. It is the same metric as net revenue retention (NRR); NDR and NRR are two names for one number.

**What is the net dollar retention formula?**
NDR = (Starting MRR − churn − downgrades + expansion revenue) ÷ Starting MRR × 100, measured on existing customers only, excluding any revenue from new logos.

**How do you calculate net dollar retention?**
Take your recurring revenue from existing customers at the start of the period, subtract churn and downgrades, add expansion revenue from upgrades and cross-sell, then divide by the starting figure and multiply by 100.

**What is the difference between net dollar retention and net revenue retention?**
None. Net dollar retention (NDR) and net revenue retention (NRR) are the same calculation. Some companies say NDR, others say NRR; SaaS earnings calls use both interchangeably.

**What is the difference between GRR and NRR?**
GRR measures recurring revenue retained after churn and downgrades (capped at 100%); NRR (also called NDR) adds expansion revenue on top, so it can exceed 100%. The difference is expansion.

**What is a good net dollar retention rate?**
110% is healthy and 120%+ is best-in-class for B2B SaaS; investors particularly reward net dollar retention over 115%.

**What does 120% NDR mean?**
Your existing customer base grew its recurring revenue 20% over the period, with expansion outpacing all churn and downgrades.

**Is net revenue retention the same as net dollar retention?**
Yes. NRR and NDR are two names for the same metric.

---

Net dollar retention and GRR are two of the core numbers in our [SaaS renewal metrics guide](/posts/renewal-metrics-explained/); the [HubSpot NRR/GRR dashboard guide](/posts/hubspot-renewal-nrr-grr-dashboard-reporting/) shows how to report them.

**Retention metrics are easy to misread and easy to game:** one big expansion can flatter a leaky base. SWOTBee builds clean retention reporting and churn-risk scoring for mid-market companies across Energy, Manufacturing, and SaaS.

[Get your 1-page renewal leakage estimate →](/resources/renewal-leakage-estimate/)

No call needed. Prefer to talk it through first? [Book a free 30-minute discovery call →](/renewal-audit-call/)
