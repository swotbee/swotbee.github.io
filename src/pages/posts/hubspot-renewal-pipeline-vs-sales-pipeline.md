---
layout: ../../layouts/BlogPostLayout.astro
title: "Renewal Pipeline vs. Sales Pipeline in HubSpot: Should You Separate Them?"
pubDate: "2026-04-02"
description: "The #1 HubSpot community debate: should renewals live in your sales pipeline or get their own? A decision framework based on team size, contract complexity, and reporting needs."
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
  - "Sales Pipeline"
  - "Revenue Operations"
  - "CRM Strategy"
seriesName: "HubSpot Renewal Pipeline"
pillarUrl: "/posts/hubspot-renewal-pipeline-complete-guide"
---

"Should we have a separate pipeline for renewals, or just use a Deal Type property?"

This question appears in every HubSpot community thread, Reddit discussion, and RevOps Slack channel about renewals. And the answer is almost always the same frustrating response: "It depends."

This article replaces "it depends" with a concrete decision framework. By the end, you'll know exactly which approach fits your team, and why.

> This article is part of our [Complete Guide to Building a Renewal Pipeline in HubSpot](/posts/hubspot-renewal-pipeline-complete-guide).

---

## The Two Approaches

### Approach 1: Unified Pipeline with Deal Type Property

Keep all deals in one pipeline. Add a "Deal Type" dropdown property with values like New Business, Renewal, and Expansion. Filter views and reports by Deal Type.

**When this works:**
- Your team is small (under 10 reps)
- Renewals are simple (same amount, same terms, auto-renew)
- One person handles both new business and renewals for an account
- You have fewer than 50 renewals per quarter
- Your reporting needs are basic

### Approach 2: Dedicated Renewal Pipeline

Create a separate pipeline with renewal-specific stages, properties, and automation. New business and renewals live in different pipelines with different owners.

**When this works:**
- You have dedicated CSMs or Account Managers handling renewals
- Contract renewals involve negotiation, upsell conversations, or term changes
- You need accurate forecasting separated by revenue type
- You're tracking NRR, GRR, and churn rate at the board level
- You have 50+ renewals per quarter

---

## The Decision Framework

Answer these five questions:

### 1. Do different people own new business vs. renewals?

If yes → **separate pipeline**. When AEs own new business and CSMs own renewals, a single pipeline creates ownership confusion. Deals get stuck because nobody knows whose job it is.

If the same rep handles everything → **unified pipeline** may work, but you'll outgrow it.

### 2. Are your renewal stages different from your sales stages?

If your [sales pipeline](https://www.salesforce.com/sales/pipeline/management/) has "Discovery → Demo → Proposal → Negotiation" and your renewals need "Active Contract → 90-Day Check-In → Renewal Sent → Negotiating" → **separate pipeline**. Forcing renewals into sales stages means stages carry no useful information.

If renewals follow roughly the same process → **unified pipeline** is fine.

### 3. Do you need to forecast renewal revenue separately?

If your CFO, board, or investors want to see new business revenue vs. renewal revenue vs. expansion revenue in separate forecasts → **separate pipeline**. HubSpot's forecast tool works per-pipeline. Mixing deal types in one pipeline makes accurate forecasting nearly impossible because renewal close rates (85, 95%) are completely different from new business close rates (20, 30%).

If you only need total pipeline value → **unified pipeline** works.

### 4. Do you have more than 50 renewals per quarter?

Volume matters. At low volume, you can manually manage renewals in a shared pipeline. At scale, you need automation, and automation works much better in a dedicated pipeline where triggers and conditions don't have to constantly filter by deal type.

50+ per quarter → **separate pipeline**.

### 5. Do renewals involve negotiation, upsell, or term changes?

If most renewals are "same terms, auto-renew, done" → a unified pipeline is fine. If renewals involve pricing discussions, multi-year options, scope changes, or competitive displacement → **separate pipeline** with stages that reflect that complexity.

---

## The Deal Type Property: Still Essential Either Way

Even if you create a separate pipeline, you should still use a Deal Type dropdown property. Here's why:

- **Cross-pipeline reporting.** You'll want reports that show total revenue across all pipelines, segmented by deal type.
- **Workflow routing.** Automation can use Deal Type to route deals correctly even if someone creates a deal in the wrong pipeline.
- **Revenue attribution.** When calculating NRR, you need to know which closed-won deals are renewals vs. expansions vs. new business.

Recommended values: `New Business`, `Renewal`, `Expansion`, `Contraction`, `Re-activation`.

---

## What About Expansion Deals?

This is the follow-up question everyone asks. If you separate renewals, where do expansions live?

Three common approaches:

1. **Expansion amount on the renewal deal.** Simple, but muddles reporting.
2. **Separate expansion pipeline.** Clean reporting, but more pipeline overhead.
3. **Expansion in the sales pipeline.** Treats upsells like new sales. Works if AEs handle expansion.

The right answer depends on who owns expansion revenue and how complex your upsell motion is. We cover this in depth in [How to Structure Multiple Pipelines](/posts/hubspot-renewal-expansion-pipeline-structure).

---

## Migration: Moving Renewals Into Their Own Pipeline

If you're splitting an existing unified pipeline, here's the process:

1. **Create the new renewal pipeline** with appropriate stages.
2. **Bulk-update existing renewal deals.** Use a list filtered by Deal Type = Renewal, then bulk-edit to move them to the new pipeline. Map old stages to new stages.
3. **Update automations.** Any workflow that creates or modifies deals needs to target the correct pipeline.
4. **Update reports.** Existing reports will lose renewal data when those deals move. Build new reports that cover the renewal pipeline.
5. **Communicate the change.** Your team needs to know where to create renewal deals going forward.

---

## Our Recommendation

For most mid-market companies with dedicated CS/AM teams and 50+ annual renewals: **create a separate renewal pipeline**.

The upfront effort is a few hours of setup. The long-term payoff is:

- Clean forecasting that separates new revenue from recurring revenue
- Automation that works without constant Deal Type filters
- Clear ownership with no "whose deal is this?" confusion
- Reporting that tracks NRR, GRR, and [churn rate](https://en.wikipedia.org/wiki/Churn_rate) properly

Once you decide to separate, [choose your stage model](/posts/hubspot-renewal-pipeline-stages). If your organization also handles significant expansion revenue, your [pipeline architecture](/posts/hubspot-renewal-expansion-pipeline-structure) needs to account for that too.

---

**Need help deciding?** SWOTBee builds renewal pipeline architectures for mid-market teams. We've seen dozens of configurations across Energy, Manufacturing, and SaaS, and we'll help you pick the right one for your team.

[Book a free 30-minute discovery call →](/contactus)
