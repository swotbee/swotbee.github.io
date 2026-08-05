---
layout: ../../layouts/BlogPostLayout.astro
title: "Clone HubSpot Deals With Line Items For Renewal Automation"
pubDate: "2026-04-02"
modifiedDate: "2026-07-14"
description: "HubSpot workflows cannot copy deal line items into renewal deals. Compare marketplace apps, Zapier, custom code, and API options for preserving products, pricing, and quantities."
category:
  title: "Revenue Operations"
  href: "/categories/revenue-operations"
author:
  name: "SWOTBee Team"
  url: "https://swotbee.com"
  imageUrl: "/assets/ico/logo.png"
  bio: "HubSpot-certified consultants who solve line item automation for mid-market renewal and sales teams."
  linkedin: "https://linkedin.com/company/swotbee"
  expertise:
    - "HubSpot CRM"
    - "Deal Automation"
    - "Line Item Management"
image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=450&fit=crop"
tags:
  - "HubSpot"
  - "Line Items"
  - "Deal Cloning"
  - "Workflow Automation"
  - "Revenue Operations"
seriesName: "HubSpot Deal Cloning"
funnelCta: "renewal-audit"
pillarUrl: "/posts/hubspot-clone-deal-complete-guide"
howto: true
howtoSteps:
  - name: "Choose your line item cloning method"
    text: "Evaluate marketplace apps (CloneNer, Deal Duplicator, Clone a Deal), Zapier, custom code, or API based on your budget and technical resources."
  - name: "Install and configure your chosen tool"
    text: "For apps: install from HubSpot Marketplace. For Zapier: create a multi-step Zap. For custom code: add a coded action to your workflow."
  - name: "Map which line items to copy"
    text: "Decide whether to copy all line items or selectively filter by product, recurring status, or amount."
  - name: "Test with a sample deal"
    text: "Clone a test deal and verify all line items transferred correctly: products, quantities, prices, discounts."
---

HubSpot workflows cannot copy line items from one deal to another. This means every automatically-created renewal deal, upsell deal, or cloned deal is missing its products, pricing, and quantities. Someone has to manually re-add them, or you need one of the four solutions below.

This is the [#2 most-requested feature in HubSpot's Ideas forum](https://community.hubspot.com/t5/HubSpot-Ideas/Copy-line-items-from-one-deal-to-another-in-order-to-manage/idi-p/722785), and as of 2026, there's still no native fix.

> This article is part of our [Complete Guide to Cloning Deals in HubSpot](/posts/hubspot-clone-deal-complete-guide).


## Why Line Items Matter Most On Renewal Deals

A renewal deal without line items is not ready for a quote, forecast, or CSM handoff. The amount may look correct, but the product mix, quantity, discounts, and recurring terms are missing. That forces the team to rebuild the renewal from the original deal and creates the exact manual work automation was supposed to remove.

If line items are the blocker, read this with the [renewal deal workflow guide](/posts/hubspot-renewal-deal-workflow-automation/) and the [renewal apps comparison](/compare/hubspot-renewal-apps/). The practical test is simple: can the new renewal deal be quoted and reported without someone opening the old deal in another tab?

---

## Why HubSpot Workflows Can't Copy Line Items

Line items in HubSpot are separate objects; they're associated with deals but not properties of deals. When a workflow creates a new deal via the "Create Record" action, it copies deal *properties* (amount, stage, name). Line items are a different object entirely, and the workflow engine has no action to duplicate them.

This is a fundamental platform architecture choice, not a bug. But the impact is real:

- **Renewal deals are incomplete.** A CSM opens a renewal deal and sees the right amount but no products. They have to find the original deal, check the line items, and manually re-add each one.
- **Pricing errors compound.** According to [Plauti's 2025 research](https://www.plauti.com/blog/hidden-costs-poor-data-quality-crm-fixes), 44% of businesses lose more than 10% of annual revenue from bad CRM data. Manual line item re-entry is one of the biggest error sources.
- **Quotes can't be generated.** HubSpot quotes pull from line items. A deal without line items = no quote = the renewal proposal has to be built manually.

For context on how this fits into renewal automation, see our [renewal deal workflow automation guide](/posts/hubspot-renewal-deal-workflow-automation).

**This isn't unique to renewals.** Any HubSpot use case that needs to copy line items between deals, whether that's duplicating a deal in another pipeline, splitting one deal into multiple deals for different customers, or building a renewal from an associated deal, hits the same platform limitation. The question is never "is it possible to clone a deal", cloning the deal itself is a solved problem, it's specifically whether the line items across those deals carry over automatically or need to be manually re-added from the product library each time.

---

## Solution 1: Marketplace Apps (Fastest to Implement)

The simplest fix. Install an app that handles line item cloning natively.

### [CloneNer](https://ecosystem.hubspot.com/marketplace/apps/clonener-2156213) (-/mo)

CloneNer copies all line items: products, quantities, unit prices, discounts, and custom line item properties. It works both manually (CRM card button) and via workflow actions (Professional plan, $49/mo).

**Setup:** Install → configure which properties and line items to include → add the CloneNer action to your renewal workflow.

**Limitation:** No selective line item filtering (it copies all or nothing). If a deal has 10 line items and you only want 3 on the renewal, you'll need to manually remove the extras.

### [Deal Duplicator](https://ecosystem.hubspot.com/marketplace/apps/deal-duplicator-201603) (-/mo)

Similar to CloneNer for line items. Deal Duplicator copies products and associations in a single operation. The Pro tier ($35/mo) adds automation rules with if/then logic.

**Limitation:** Free tier is manual-only, single user. No template feature for predefined line item sets.

### [Clone a Deal](https://ecosystem.hubspot.com/marketplace/listing/clone-a-deal-workflow-action) ($9.99/mo)

A workflow-native action with a checkbox to include line items. Best value at a flat $9.99/month with no per-deal limits.

**Limitation:** Workflow-only, with no manual CRM card cloning. If your team also needs ad-hoc cloning outside workflows, you'll need a second tool.

For the full comparison, see [Best HubSpot Deal Cloning Apps Compared](/posts/hubspot-deal-cloning-apps-compared).

---

## Solution 2: Zapier + HubSpot Line Items API

[Zapier](https://zapier.com/apps/hubspot/integrations) can read line items from a source deal and create them on a new deal, but it requires a multi-step Zap with API calls.

**How it works:**

1. **Trigger:** HubSpot deal moves to "Closed Won"
2. **Action 1:** Look up the deal's associated line items using a Webhooks by Zapier step that calls `GET /crm/v3/objects/deals/{dealId}/associations/line_items`
3. **Action 2:** For each line item, call `GET /crm/v3/objects/line_items/{lineItemId}` to get properties
4. **Action 3:** Create the new deal in HubSpot
5. **Action 4:** For each line item, call `POST /crm/v3/objects/line_items` with the new deal ID

**Pros:** No HubSpot marketplace app required. Works with any Zapier plan that supports multi-step Zaps.

**Cons:** Fragile: if the Zap breaks, line items silently fail. [Zapier cannot access quote associations](https://community.zapier.com/how-do-i-3/how-do-i-clone-line-items-from-a-published-quote-in-a-sales-pipeline-to-a-renewal-pipeline-using-zapier-44248), so you can't pull line items from quotes. Each line item requires a separate API call, which burns Zapier tasks.

**Best for:** Teams already using Zapier who don't want another app subscription.

---

## Solution 3: Custom Code Action in HubSpot Workflows

HubSpot Professional and Enterprise plans support custom code actions in workflows, specifically JavaScript or Python snippets that run within the workflow.

**How it works:**

Add a custom code action after the "Create Record" action in your renewal workflow. The code:
1. Reads the source deal's line items via the HubSpot API
2. Creates each line item on the newly created deal
3. Associates the line items with the new deal

**Example (JavaScript pseudocode):**

```javascript
// Inside a HubSpot workflow custom code action
const hubspot = require('@hubspot/api-client');
const client = new hubspot.Client({ accessToken: process.env.PRIVATE_APP_TOKEN });

// Get source deal's line items
const associations = await client.crm.deals.associationsApi
  .getAll(event.inputFields.sourceDealId, 'line_items');

for (const assoc of associations.results) {
  const lineItem = await client.crm.lineItems.basicApi.getById(assoc.id);

  // Create line item on new deal
  await client.crm.lineItems.basicApi.create({
    properties: {
      name: lineItem.properties.name,
      quantity: lineItem.properties.quantity,
      price: lineItem.properties.price,
      hs_product_id: lineItem.properties.hs_product_id,
    },
    associations: [{
      to: { id: event.inputFields.newDealId },
      types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 20 }]
    }]
  });
}
```

**Pros:** No third-party app. Full control over which line items to copy and how to transform them (adjust pricing, change quantities, filter by product type).

**Cons:** Requires developer skills. Custom code actions have a 20-second timeout and might fail for deals with many line items. Debugging is harder than app-based solutions.

**Best for:** Teams with developer resources who need custom logic (price adjustments, selective filtering, conditional line items).

---

## Solution 4: External API Integration

For the most control, build a standalone integration using HubSpot's [Deals API](https://developers.hubspot.com/docs/api/crm/deals) and [Line Items API](https://developers.hubspot.com/docs/api/crm/line-items).

**When this makes sense:**
- You have variable-term contracts where line item pricing changes at renewal
- You need to apply price escalation rules (e.g. +5% annually)
- You're integrating with external billing systems like [Chargebee](https://www.chargebee.com/integrations/hubspot/) or [Stripe](https://docs.stripe.com/billing/subscriptions/overview)
- You need to handle complex product bundles or tiered pricing
- Volume exceeds what workflow custom code actions can handle (20-second timeout)

**Architecture:** A webhook listener (Node.js, Python, or serverless function) that fires when a deal closes, reads the source deal's line items, applies business logic, and creates line items on the new deal.

**Best for:** Enterprise teams with engineering resources and complex pricing models.

---

## Which Solution Fits Your Team?

| Factor | App (CloneNer/DD) | Zapier | Custom Code | API Integration |
|--------|-------------------|--------|-------------|-----------------|
| **Setup time** | 30 min | 2-4 hours | 4-8 hours | 2-4 weeks |
| **Technical skill** | None | Low | Medium | High |
| **Monthly cost** | $10-$149 | $20-$70 (Zapier plan) | $0 (included) | $0 (but dev time) |
| **Line item filtering** | All or nothing | Possible | Full control | Full control |
| **Price adjustments** | No | Possible | Yes | Yes |
| **Reliability** | High | Medium | Medium | High |
| **Maintenance** | Vendor maintains | You maintain Zaps | You maintain code | You maintain code |

**Our recommendation:** Start with a marketplace app. If your needs outgrow it (custom pricing logic, selective filtering, external system integration), graduate to custom code or API.

---

## Testing Your Line Item Cloning

Before going live with any solution:

1. **Create a test deal** with 3-5 line items covering different scenarios: standard product, discounted item, recurring line item, zero-quantity placeholder
2. **Trigger the clone** (via workflow, app, or API)
3. **Verify on the new deal:** correct product names, quantities, unit prices, discounts, and total amount
4. **Check edge cases:** What happens with a $0 line item? A line item with a deleted product? A line item with custom properties?
5. **Verify associations:** Are the line items properly associated with the new deal (not the old one)?

If line items aren't copying correctly, check our [infinite loop troubleshooting guide](/posts/hubspot-renewal-workflow-infinite-loop-fix), since the same re-enrollment rules that break renewal automation can also affect line item copying workflows.

**Evaluating apps for renewals specifically?** Cloning is only step one of a renewal system. See our [honest comparison of HubSpot renewal apps](/compare/hubspot-renewal-apps), including the capabilities a copy button cannot reach.

---

**Line item cloning is one of the trickiest HubSpot automation challenges.** SWOTBee has solved it for dozens of mid-market companies with contracts from 1 to 100+ line items per deal. We handle the tool selection, configuration, testing, and edge cases.

[Book a free 30-minute discovery call →](/contactus/)
