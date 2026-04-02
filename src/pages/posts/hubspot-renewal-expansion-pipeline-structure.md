---
layout: ../../layouts/BlogPostLayout.astro
title: "Renewals, Expansions & Downgrades: How to Structure Multiple Pipelines in HubSpot"
pubDate: "2026-04-02"
description: "Where should expansion revenue live in HubSpot? How do you prevent double-counting? This guide covers multi-pipeline architecture for renewals, expansions, and downgrades."
category:
  title: "Revenue Operations"
  href: "/categories/revenue-operations"
author:
  name: "SWOTBee Team"
  url: "https://swotbee.com"
  imageUrl: "/assets/ico/logo.png"
image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop"
tags:
  - "HubSpot"
  - "Renewal Pipeline"
  - "Expansion Revenue"
  - "Pipeline Architecture"
  - "Revenue Operations"
seriesName: "HubSpot Renewal Pipeline"
pillarUrl: "/posts/hubspot-renewal-pipeline-complete-guide"
---

You've built a renewal pipeline. Renewals flow through it. Then a customer wants to add a product during their renewal. Or downgrade one service but upgrade another. Or expand mid-contract, outside the renewal window.

Where do those deals go?

This is the second most common HubSpot pipeline architecture question after "should I separate renewals?" — and getting it wrong leads to double-counted revenue, confused ownership, and reports that nobody trusts. As [Tomasz Tunguz demonstrates](https://tomtunguz.com/negative-churn/), companies with strong expansion revenue (negative net churn) generate 73% more revenue over time — but only if that expansion is tracked cleanly.

> This article is part of our [Complete Guide to Building a Renewal Pipeline in HubSpot](/posts/hubspot-renewal-pipeline-complete-guide).

---

## The Three Architecture Options

### Option 1: Everything on the Renewal Deal

Update the renewal deal's amount to reflect the new total contract value. If the customer was paying $100K/year and adds $20K in new services, the renewal deal becomes $120K.

**Pros:**
- Simplest approach — one deal per customer per renewal cycle
- Easy to understand for CSMs
- No duplicate association issues

**Cons:**
- You can't distinguish renewal revenue from expansion revenue in reports
- NRR calculation becomes impossible without a "Previous Contract Value" property
- If the expansion happens mid-cycle (not at renewal), it's awkward to adjust a deal that's 6 months from closing

**Best for:** Teams with simple contracts, low expansion volume, or CSMs who handle everything.

### Option 2: Separate Expansion Pipeline

Create a third pipeline specifically for expansion deals. When a customer wants to add services — whether at renewal time or mid-contract — create a new deal in the Expansion Pipeline.

**Stages might look like:**
| Stage | Definition |
|-------|-----------|
| Opportunity Identified | CSM or AE identified upsell potential |
| Proposal Sent | Expansion quote delivered |
| Negotiating | Terms under discussion |
| Closed Won | Expansion signed |
| Closed Lost | Customer declined |

**Pros:**
- Clean revenue attribution: you can report New Business vs. Renewal vs. Expansion separately
- NRR calculation is straightforward (sum of expansion deals - contraction - churn)
- Different teams can own different pipelines

**Cons:**
- More pipeline overhead — three pipelines to manage, automate, and report on
- One customer might have deals in all three pipelines simultaneously
- Risk of double-counting if the expansion is also reflected in the renewal amount

**Best for:** Companies where expansion is a significant revenue motion, where AEs (not CSMs) drive expansion, or where investors/board require clean revenue segmentation. Tunguz outlines [three proven strategies for achieving negative churn](https://tomtunguz.com/engendering-negative-churn/) — all of which benefit from a dedicated expansion pipeline.

### Option 3: Expansion in the Sales Pipeline

Treat expansion deals exactly like new business — they go through the sales pipeline with Deal Type = "Expansion."

**Pros:**
- AEs manage expansion the same way they manage new business
- No new pipeline to create or maintain
- Works well if your expansion motion looks like a sales cycle (discovery, demo, proposal)

**Cons:**
- Renewal pipeline doesn't reflect the full customer picture
- CSMs may not have visibility into expansion deals in the sales pipeline
- Reporting requires Deal Type filtering on every report

**Best for:** Companies where AEs handle expansion and the expansion process closely mirrors new business sales.

---

## Ownership Models

Who owns what is as important as where deals live.

### Model A: CSM Owns Everything

- CSM owns renewal deals AND expansion deals
- Works when: Expansions are small, predictable, and don't require a full sales cycle
- Risk: CSMs are relationship managers, not salespeople. Complex upsells may stall.

### Model B: Split Ownership

- CSM owns the renewal deal in the Renewal Pipeline
- AE owns the expansion deal in the Expansion (or Sales) Pipeline
- Works when: Expansion involves significant new product evaluation or multi-stakeholder buying
- Risk: Communication gaps between CSM and AE. The customer gets contacted by two people about overlapping topics.

### Model C: Account Manager Owns Both

- A dedicated Account Manager (hybrid CSM/AE) handles all post-sale revenue
- Works when: Your team structure has AMs who are quota-carrying customer managers
- Risk: AMs may prioritize expansion (which earns commission) over retention (which doesn't). This trade-off directly impacts [customer lifetime value](https://en.wikipedia.org/wiki/Customer_lifetime_value)

**The key rule:** Whatever model you choose, make sure every deal has exactly one owner who is accountable for the outcome. Shared ownership = no ownership.

---

## Preventing Revenue Double-Counting

This is the most common reporting problem in multi-pipeline setups. It happens when:

1. **The renewal deal amount includes the expansion** AND there's a separate expansion deal. Revenue gets counted twice in total revenue reports.
2. **A deal appears in two pipelines** — someone creates it in both Sales and Renewal pipeline.
3. **Cross-pipeline reports sum everything** without filtering for Deal Type.

### Prevention Rules

**Rule 1: Renewal deal = same-terms renewal only.** The renewal deal amount should equal the prior contract value. Any increase goes to an Expansion deal. Any decrease goes to a Contraction deal (or is reflected as "Revenue Change Reason = Downgrade" on the renewal deal with a reduced amount).

**Rule 2: Use Deal Type religiously.** Every deal must have a Deal Type value. Build a workflow that alerts RevOps when a deal is created without a Deal Type.

**Rule 3: Build revenue reports with Deal Type filters.** Never create a "total closed revenue" report that simply sums all pipelines. Always segment by Deal Type or filter by a single pipeline.

**Rule 4: Audit monthly.** Run a report that shows all Closed Won deals by company this quarter. Flag any company with both a renewal and expansion deal where the combined amount exceeds expectations.

---

## Handling Downgrades and Contraction

Downgrades are the awkward middle ground between renewal and churn. The customer stays, but pays less.

### Simple Downgrade (at Renewal)

Update the renewal deal amount to reflect the lower value. Set Deal Type = "Renewal" and Revenue Change Reason = "Downgrade — [Reason]." The difference between Previous Contract Value and the new Amount is your contraction revenue.

### Complex Downgrade (Dropping a Product Line)

If the customer is dropping one product but keeping another, you may need:
- A renewal deal for the remaining products (at the new, lower amount)
- A "Contraction" deal or line item that records the lost revenue

Some teams create a "Contraction" Deal Type for this. Others just track it as a negative Revenue Change on the renewal deal. Choose based on how granular your reporting needs to be.

### Mid-Cycle Downgrade

If a customer downgrades mid-contract (not at renewal), create a Contraction deal with the effective date. Don't modify the renewal deal — it should still reflect the full-year value until it closes.

---

## The Multi-Pipeline Architecture Diagram

For a typical mid-market company:

```
New Customer Closes → Sales Pipeline (Closed Won)
                          │
                          ▼
              ┌─ Renewal Pipeline ─── Closed Won (same terms) ─── Next Renewal
              │                  └── Closed Lost (churn)
              │
              ├─ Expansion Pipeline ─── Closed Won (upsell revenue)
              │                    └── Closed Lost (not now)
              │
              └─ (Contraction tracked on renewal deal or separate deal)
```

This builds on the [pipeline separation decision](/posts/hubspot-renewal-pipeline-vs-sales-pipeline). If you haven't decided whether to separate yet, start there.

Track expansion revenue in your [renewal dashboards](/posts/hubspot-renewal-nrr-grr-dashboard-reporting) for complete NRR reporting.

---

## Our Recommendation

For most mid-market teams:

1. **Start with two pipelines:** Sales (new business) and Renewal. Track expansion as a Deal Type within the Sales Pipeline. If you use subscription billing platforms like [Chargebee](https://www.chargebee.com/integrations/hubspot/), their HubSpot integration can automatically create expansion deals when subscription amendments occur.
2. **When expansion volume hits 20+ deals/quarter**, split it into its own pipeline for cleaner reporting and dedicated ownership.
3. **Track contraction on the renewal deal** using Previous Contract Value and Revenue Change Reason properties — don't create a separate pipeline for it unless you have very complex product-level churn.
4. **Always use Deal Type.** On every deal. No exceptions.

Expansion confusion is one of the [12 common mistakes](/posts/hubspot-renewal-pipeline-mistakes-costing-revenue) we see — see the full list.

---

**Multi-pipeline architecture is one of those things that's easy to set up and hard to get right.** SWOTBee designs pipeline architectures for mid-market companies across Energy, Manufacturing, and SaaS — including the reporting and automation that make multiple pipelines actually work.

[Book a free 30-minute discovery call →](/contactus)
