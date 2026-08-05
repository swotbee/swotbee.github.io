---
layout: ../../layouts/BlogPostLayout.astro
title: "How to Clone a Deal in HubSpot for Renewals: Complete Guide (2026)"
pubDate: "2026-04-02"
description: "How to clone HubSpot deals for renewals without losing line items, ARR fields, owners, dates, or audit history. Covers native cloning, workflows, apps, and API options."
category:
  title: "Revenue Operations"
  href: "/categories/revenue-operations"
modifiedDate: "2026-07-14"
author:
  name: "SWOTBee Team"
  url: "https://swotbee.com"
  imageUrl: "/assets/ico/logo.png"
  bio: "HubSpot-certified consultants specializing in deal automation, renewal pipelines, and CRM migration for mid-market B2B companies."
  linkedin: "https://linkedin.com/company/swotbee"
  expertise:
    - "HubSpot CRM"
    - "Deal Automation"
    - "Revenue Operations"
reviewedBy:
  name: "Sharmi"
  title: "Co-Founder, SWOTBee"
  linkedin: "https://www.linkedin.com/in/sharm1la/"
  date: "July 2026"
image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"
tags:
  - "HubSpot"
  - "Deal Cloning"
  - "CRM Automation"
  - "Revenue Operations"
  - "Sales Productivity"
seriesName: "HubSpot Deal Cloning"
faqs:
  - q: "How do I duplicate a deal in HubSpot?"
    a: "Open the deal record, click the Actions dropdown (top-left), and select Clone. HubSpot creates a copy with the same properties and associations; update the name, close date, and stage before saving. Line items are not copied, so if the deal has products you'll need a marketplace app or the API."
  - q: "Can you bulk duplicate deals in HubSpot?"
    a: "Not natively; HubSpot's Clone action works one deal at a time. For bulk duplication, use a marketplace app (Deal Duplicator batch-clones 200 deals in about 10 seconds, and CloneNer handles batches via templates) or a workflow-triggered cloning action. High-volume teams (500+ clones per month) often go straight to the HubSpot API."
  - q: "Is there a way to duplicate a deal with its line items?"
    a: "Yes, but not with native cloning or workflows; line items are the number one gap. You need a marketplace app (CloneNer, Deal Duplicator, Clone a Deal, and Clone Attack all copy line items) or a custom API integration that reads the source deal's line items and recreates them on the copy."
  - q: "Can I clone a deal in HubSpot without an app?"
    a: "Yes. HubSpot added native deal cloning. Click Actions then Clone on any deal. But it doesn't copy line items, can't be automated, and doesn't work in workflows."
  - q: "Does cloning a deal copy line items?"
    a: "Not natively. You need a marketplace app (CloneNer, Deal Duplicator, Clone a Deal) or a custom API integration to copy line items."
  - q: "Can I clone deals inside a HubSpot workflow?"
    a: "Not with native actions. The Create Record action creates a new deal but doesn't clone one. Marketplace apps like CloneNer and Clone a Deal add workflow actions for cloning."
  - q: "Does cloning a deal copy emails and notes?"
    a: "No current tool fully clones engagements. Deal Duplicator has it on their roadmap. Some integrations can clone tasks and notes but not emails."
  - q: "How do I prevent infinite loops when cloning renewal deals?"
    a: "Use the boolean toggle pattern or the dual-workflow (odd/even) pattern, covered in detail in our guide to fixing the renewal workflow infinite loop."
  - q: "What HubSpot tier do I need to clone deals?"
    a: "Native cloning works on all tiers. Workflow automation requires Sales Hub Professional or higher. Marketplace apps have their own separate pricing."
  - q: "How do I clone a deal across pipelines?"
    a: "Native cloning keeps the deal in the same pipeline. To clone to a different pipeline, use a workflow with a Create Record action specifying the target pipeline, or use a marketplace app that supports cross-pipeline cloning."
  - q: "What's the best deal cloning app for HubSpot?"
    a: "It depends on your use case: CloneNer for the most features, Clone a Deal for value at $9.99/mo flat, and Deal Duplicator for engagement cloning."
funnelCta: "renewal-audit"
pillarUrl: "/posts/hubspot-clone-deal-complete-guide"
howto: true
howtoSteps:
  - name: "Navigate to the deal record"
    text: "Open the deal you want to clone from your pipeline."
  - name: "Open the Actions menu"
    text: "Click the Actions dropdown in the top-left of the deal record."
  - name: "Select Clone"
    text: "HubSpot creates a copy of the deal's properties and associations, but not its line items, engagements, or quotes."
  - name: "Review and adjust the clone"
    text: "Update the name, close date, stage, and owner before saving. Native cloning is manual and one deal at a time; for automation or line items, see the marketplace app and API methods covered below."
---

Cloning a deal in HubSpot means creating an exact copy of an existing deal (with its properties, associations, and ideally line items) so you don't have to rebuild it from scratch. It's one of the [most-requested features in HubSpot history](https://community.hubspot.com/t5/HubSpot-Ideas/Cloning-a-Deal/idi-p/28845), with 500+ upvotes on the Ideas forum.

The problem: HubSpot's native cloning is limited, workflows can't copy line items, and every existing guide is written by a vendor promoting their own app. This guide is different. We cover all four methods: native, workflows, marketplace apps, and API, with honest pros and cons for each.

> **This is the pillar article in our HubSpot Deal Cloning series.** Each section links to deeper guides where we go step-by-step.


## Renewal Operations Angle: Why Deal Cloning Becomes A Revenue Problem

Deal cloning is rarely just a productivity shortcut. For recurring-revenue teams, it decides whether the renewal deal has the right contract value, product line items, renewal date, owner, and original deal reference. When those fields are recreated manually, NRR and GRR reporting starts from incomplete data.

If you are cloning deals for renewals, connect this guide with the [renewal deal workflow automation guide](/posts/hubspot-renewal-deal-workflow-automation/), the [renewal pipeline properties checklist](/posts/hubspot-renewal-pipeline-properties/), and the [HubSpot renewal apps comparison](/compare/hubspot-renewal-apps/). The goal is not just a copied deal; it is a renewal system that can create the next opportunity, preserve line items, and report revenue without spreadsheet cleanup.

---

## Can You Clone a Deal in HubSpot? (The Current State in 2026)

Yes, but with significant limitations. HubSpot added native deal cloning in a [private beta in late 2023](https://community.hubspot.com/t5/Tips-Tricks-Best-Practices/Cloning-a-deal/td-p/949228), and it's now available to most portals. You can click the "Clone" button on any deal record to create a copy.

What native cloning copies:
- Deal properties (name, amount, stage, pipeline, custom properties)
- Company and contact associations

What native cloning does NOT copy:
- **Line items** (products, pricing, quantities). This is the #1 gap
- **Engagements** (emails, notes, calls, meetings)
- **Quotes** attached to the deal
- **Automation triggers**. You can't clone deals inside workflows natively

And there's no way to automate native cloning. It's a manual, one-at-a-time click. For teams managing renewals, upsells, or multi-location deals at scale, that's a dealbreaker.

According to [Salesforce's State of Sales](https://www.salesforce.com/news/stories/sales-research-2023/), sales reps spend only 29% of their workweek actually selling; the rest goes to admin, data entry, and prep. Every manually recreated deal adds to that 71%.

---

## Method 1: Native Deal Cloning (Manual)

HubSpot's built-in cloning works for one-off situations where you need a quick copy.

**How to do it:**

1. Navigate to the deal record you want to clone
2. Click the **Actions** dropdown (top-left)
3. Select **Clone**
4. Review the cloned deal and adjust the name, close date, and stage as needed
5. Save

**When this works:**
- Ad-hoc deal duplication (occasional, not systematic)
- Deals without line items or with simple pricing
- Teams with fewer than 20 deals per month that need cloning

**When it doesn't:**
- Renewal deals that need to be created automatically when a contract closes
- Deals with complex line items (products, quantities, discounts)
- Any process that needs to happen at scale or on a schedule

**Verdict:** Useful for quick one-offs. Useless for automation, renewals, or anything at scale.

---

## Method 2: Cloning Deals via Workflows (Native HubSpot)

HubSpot workflows can create new deals, but they can't truly "clone" them. The **Create Record** action creates a deal in a specified pipeline and sets properties you define. It does NOT copy properties from the triggering deal automatically.

**How to build a deal-cloning workflow:**

1. Create a deal-based workflow
2. Set your trigger (e.g. Deal Stage = Closed Won AND Deal Type = New Business)
3. Add a **Create Record → Deal** action
4. Manually map each property: set "Amount" to the enrolled deal's Amount, "Company" to the enrolled deal's Company, etc.
5. Set the new deal's pipeline, stage, and deal name

**The property-copying trap:** HubSpot's "Copy Property" action updates the *enrolled* deal, not the newly created one. This [confuses nearly every HubSpot user](https://community.hubspot.com/t5/CRM/Copy-property-of-and-original-deal-to-a-renewal-deal/m-p/1233479) who tries it. The workarounds:

- **Company record pass-through:** Copy the value from the original deal to the Company record, then from the Company to the new deal. Fragile and risks workflow loops.
- **Sync properties:** HubSpot's newer sync properties feature can keep two deal properties in sync, but it's limited in scope.
- **Custom code action:** Write a short script in the workflow that reads the source deal's properties via API and sets them on the new deal.

We cover these workarounds in depth in [How to Copy Deal Properties Between Deals in HubSpot Workflows](/posts/hubspot-copy-deal-properties-workflow).

**What workflows CANNOT do:**
- Copy line items (products, pricing). This is a [platform limitation with 500+ upvotes](https://community.hubspot.com/t5/HubSpot-Ideas/Copy-line-items-from-one-deal-to-another-in-order-to-manage/idi-p/722785) requesting a fix
- Copy engagements (emails, notes, calls)
- Copy quotes

For the full workflow setup for renewal deals, see our [step-by-step automation guide](/posts/hubspot-renewal-deal-workflow-automation). If your Year 2 renewal workflow stops creating deals, see [fixing the infinite loop](/posts/hubspot-renewal-workflow-infinite-loop-fix).

**Verdict:** Good for creating new deals with basic properties. Not a true "clone"; you lose line items and engagements.

---

## Method 3: HubSpot Marketplace Apps Compared

Four main apps solve the deal cloning gap. Here's an honest comparison, and we're not affiliated with any of them.

| Feature | [CloneNer](https://ecosystem.hubspot.com/marketplace/apps/clonener-2156213) | [Deal Duplicator](https://ecosystem.hubspot.com/marketplace/apps/deal-duplicator-201603) | [Clone a Deal](https://ecosystem.hubspot.com/marketplace/listing/clone-a-deal-workflow-action) | [Clone Attack](https://ecosystem.hubspot.com/marketplace/apps/appchemist-clone-attack-229629) |
|---------|----------|-----------------|---------------|--------------|
| **Vendor** | 4CRMs | Instrumental | Baskey | hapily |
| **Pricing** | Free-/mo | -/mo | $9.99/mo flat | Tiered, free tier |
| **Clone deals** | Yes | Yes | Workflow-only | Yes |
| **Clone line items** | Yes | Yes | Yes (checkbox) | Yes |
| **Clone associations** | Yes | Yes; tickets on Pro+ | Configurable | Yes |
| **Clone engagements** | No | Coming soon | Not mentioned | Unconfirmed |
| **Workflow action** | $49+/mo | $35+/mo | Core feature | Higher tiers |
| **Auto-rules** | All paid plans | Pro+ | N/A | Workflow-based |
| **Templates** | 1 free-unlimited | No | No | Presets |
| **Installs** | 1,500+ | 1,300+ | Not disclosed | Not disclosed |
| **HubSpot Certified** | Yes | Yes | Unconfirmed | Unconfirmed |

For a detailed breakdown with use-case recommendations, see our [full app comparison guide](/posts/hubspot-deal-cloning-apps-compared).

**Quick recommendation:**
- **Best overall:** CloneNer: most features, best reviews, HubSpot certified
- **Best value:** Clone a Deal: .99/mo flat, unlimited, workflow-native
- **Best for engagement cloning:** Deal Duplicator: only one with engagement cloning on the roadmap

---

## Method 4: Cloning Deals via the HubSpot API

For teams with developer resources, the [HubSpot Deals API](https://developers.hubspot.com/docs/api/crm/deals) gives you complete control over deal cloning, including line items.

**Basic approach:**

1. **Read the source deal:** `GET /crm/v3/objects/deals/{dealId}?properties=all`
2. **Read its line items:** `GET /crm/v3/objects/deals/{dealId}/associations/line_items`
3. **Create the new deal:** `POST /crm/v3/objects/deals` with the properties from step 1
4. **Create line items on the new deal:** `POST /crm/v3/objects/line_items` for each line item
5. **Associate everything:** Link contacts, companies, and the new line items to the new deal

**When this makes sense:**
- Complex multi-product contracts where apps can't handle the logic
- Custom pricing rules (tiered, usage-based, variable-term)
- Integration with external billing systems ([Chargebee](https://www.chargebee.com/integrations/hubspot/), [Stripe](https://docs.stripe.com/billing/subscriptions/overview))
- High-volume operations (500+ clones per month)

**When it doesn't:**
- Your team doesn't have a developer
- The cloning logic is simple enough for an app to handle
- You need a quick win, not a multi-week project

---

## The Line Item Problem: Why Cloned Deals Are Incomplete

This is the single biggest frustration with HubSpot deal cloning. Whether you use native cloning, workflows, or most third-party apps, **line items don't come along for the ride**.

A deal without its line items is incomplete. The CSM or AE opening a renewal deal doesn't know what products the customer has, at what price, in what quantities. They have to dig through the original deal, cross-reference quotes, and manually re-enter everything.

According to [Validity's 2025 State of CRM Data report](https://www.validity.com/resource-center/the-state-of-crm-data-management-in-2025/), 76% of organizations say less than half their CRM data is accurate. Every manual re-entry is another opportunity for error.

We wrote an entire guide on solving this: [How to Clone HubSpot Deals with Line Items](/posts/hubspot-clone-deal-line-items).

---

## 10 Use Cases for Deal Cloning

Deal cloning isn't just for renewals. Here's every use case we see across our clients:

### 1. Renewal Deals
**Who:** CSMs, Account Managers at subscription/contract businesses
**What:** Auto-create next year's renewal deal when the current one closes as Won
**Why clone:** Same customer, same products, same associations, just different dates
**Related:** [Complete Guide to Renewal Pipelines](/posts/hubspot-renewal-pipeline-complete-guide)

### 2. Upsell / Expansion Deals
**Who:** AEs at land-and-expand companies
**What:** Clone the existing deal structure, add new products to the line items
**Why clone:** Customer context (associations, notes, pricing history) is already there

### 3. Multi-Location Deals
**Who:** Enterprise sales teams in energy, construction, manufacturing
**What:** Same deal structure replicated across 5 to 50+ customer locations
**Why clone:** Identical product mix and pricing, different delivery site

### 4. Template Deals
**Who:** Sales Managers, RevOps with standardized offerings
**What:** Pre-built deal structures cloned for each new customer
**Why clone:** Ensures consistent data entry, correct pipeline stages, and standard line items

### 5. Pipeline-to-Pipeline Handoff
**Who:** Organizations with multi-pipeline strategies (sales → implementation → renewal)
**What:** Clone the deal from the sales pipeline into the renewal or implementation pipeline
**Why clone:** Preserves all customer context during the handoff
**Related:** [How to Structure Multiple Pipelines](/posts/hubspot-renewal-expansion-pipeline-structure)

### 6. Cross-Sell Deals
**Who:** Multi-product companies
**What:** Clone the existing deal structure, swap the product line
**Why clone:** Customer associations and account data are already correct

### 7. Win-Back / Re-Engagement Deals
**Who:** Sales reps running win-back campaigns
**What:** Clone the churned deal as a starting point for re-engagement
**Why clone:** Historical pricing, products, and churn reason provide context

### 8. Recurring Service / Retainer Deals
**Who:** Agencies, MSPs, consulting firms
**What:** Create a new deal every month or quarter for recurring services
**Why clone:** Nearly identical to the previous period's deal

### 9. Seasonal / Campaign Replication
**Who:** Industries with seasonal patterns (energy, construction, retail)
**What:** Clone last year's deal as a blueprint for this year
**Why clone:** Same products, similar pricing, adjusted for annual increases

### 10. Deal Splitting
**Who:** Enterprise RevOps, complex structures
**What:** Split a large deal into sub-deals by product, phase, or business unit
**Why clone:** Start with the parent deal and remove irrelevant line items from each sub-deal

---

## Deal Cloning Best Practices

Cloning saves time, but cloning carelessly creates a mess. Follow these rules:

**1. Naming conventions:** Use a consistent format. `[Company]: [Type]: [Year/Period]`. Example: "Acme Corp: Renewal: 2027". Never leave the default cloned name.

**2. Reset date fields.** Cloned deals inherit the original's close date and renewal date. Always update these. A deal with last year's close date corrupts your forecast.

**3. Choose which properties to clone carefully.** Clone deal amount, contract term, associated company and contacts. Reset deal stage (start at the beginning of the pipeline), deal owner (route to the correct person), and any status fields.

**4. Audit trail.** Add an "Original Deal ID" property that links back to the source deal. This lets you trace deal lineage for reporting and troubleshooting. See our [15 Custom Properties guide](/posts/hubspot-renewal-pipeline-properties) for the full property setup.

**5. Don't clone into the same pipeline.** If you're cloning a deal for a different purpose (renewal, upsell), put it in the correct pipeline. Same-pipeline clones confuse forecasting.

**6. Verify line items.** After cloning, always check that line items are correct: right products, right quantities, right prices. Pricing changes between the original and cloned deal are common.

For the full best practices framework, see [HubSpot Deal Duplication Best Practices: A RevOps Guide](/posts/hubspot-deal-duplication-best-practices).

---

## FAQ: Common Questions About Cloning Deals in HubSpot

**How do I duplicate a deal in HubSpot?**
Open the deal record, click the **Actions** dropdown (top-left), and select **Clone**. HubSpot creates a copy with the same properties and associations; update the name, close date, and stage before saving. Line items are not copied, so if the deal has products you'll need a [marketplace app](/posts/hubspot-deal-cloning-apps-compared) or the API (Methods 3 and 4 above).

**Can you bulk duplicate deals in HubSpot?**
Not natively; HubSpot's Clone action works one deal at a time. For bulk duplication, use a marketplace app (Deal Duplicator batch-clones 200 deals in about 10 seconds, and CloneNer handles batches via templates) or a workflow-triggered cloning action that fires as deals meet your criteria. High-volume teams (500+ clones per month) often go straight to the HubSpot API.

**Is there a way to duplicate a deal with its line items?**
Yes, but not with native cloning or workflows; line items are the number one gap. You need a marketplace app (CloneNer, Deal Duplicator, Clone a Deal, and Clone Attack all copy line items) or a custom API integration that reads the source deal's line items and recreates them on the copy. We cover every option in [How to Clone HubSpot Deals with Line Items](/posts/hubspot-clone-deal-line-items).

**Can I clone a deal in HubSpot without an app?**
Yes. HubSpot added native deal cloning. Click Actions → Clone on any deal. But it doesn't copy line items, can't be automated, and doesn't work in workflows.

**Does cloning a deal copy line items?**
Not natively. You need a [marketplace app](/posts/hubspot-deal-cloning-apps-compared) (CloneNer, Deal Duplicator, Clone a Deal) or a custom API integration to copy line items.

**Can I clone deals inside a HubSpot workflow?**
Not with native actions. The "Create Record" action creates a new deal but doesn't clone one. Marketplace apps like CloneNer ($49+/mo) and Clone a Deal ($9.99/mo) add workflow actions for cloning.

**Does cloning a deal copy emails and notes?**
No current tool fully clones engagements. Deal Duplicator has it on their roadmap. [Integration Glue's Workflow Clone action](https://ecosystem.hubspot.com/marketplace/listing/workflow-clone-merge-actions) can clone tasks and notes but not emails.

**How do I prevent infinite loops when cloning renewal deals?**
Use the boolean toggle pattern or the dual-workflow (odd/even) pattern. We cover this in detail in [Fixing the Infinite Loop](/posts/hubspot-renewal-workflow-infinite-loop-fix).

**What HubSpot tier do I need?**
Native cloning works on all tiers. Workflow automation requires [Sales Hub Professional](https://www.hubspot.com/pricing/sales) or higher. Marketplace apps have their own pricing.

**How do I clone a deal across pipelines?**
Native cloning keeps the deal in the same pipeline. To clone to a different pipeline, use a workflow with a "Create Record" action specifying the target pipeline, or use a marketplace app that supports cross-pipeline cloning.

**What's the best deal cloning app for HubSpot?**
It depends on your use case. See our [full comparison](/posts/hubspot-deal-cloning-apps-compared): CloneNer for features, Clone a Deal for value, Deal Duplicator for engagement cloning.

---

## Next Steps

Deal cloning is the operational foundation of any recurring revenue process. Whether you're building a renewal pipeline, scaling upsells, or standardizing deal templates, getting cloning right saves hours per week and keeps your data clean.

**Evaluating apps for renewals specifically?** Cloning is only step one of a renewal system. See our [honest comparison of HubSpot renewal apps](/compare/hubspot-renewal-apps), including the capabilities a copy button cannot reach.

**Need help setting this up?** SWOTBee builds deal cloning automation for mid-market teams in Energy, Manufacturing, SaaS, and Construction. We handle the workflow architecture, app selection, line item setup, and team training.

[Book a free 30-minute discovery call →](/contactus/)
