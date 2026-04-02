---
layout: ../../layouts/BlogPostLayout.astro
title: "How to Copy Deal Properties Between Deals in HubSpot Workflows"
pubDate: "2026-04-02"
description: "HubSpot's 'Copy Property' action updates the wrong deal. Here are 4 workarounds — company pass-through, sync properties, custom code, and Operations Hub — with step-by-step instructions."
category:
  title: "Revenue Operations"
  href: "/categories/revenue-operations"
author:
  name: "SWOTBee Team"
  url: "https://swotbee.com"
  imageUrl: "/assets/ico/logo.png"
  bio: "HubSpot-certified consultants specializing in workflow automation and deal pipeline architecture for mid-market B2B companies."
  linkedin: "https://linkedin.com/company/swotbee"
  expertise:
    - "HubSpot CRM"
    - "Workflow Automation"
    - "Deal Properties"
image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800&h=450&fit=crop"
tags:
  - "HubSpot"
  - "Deal Properties"
  - "Workflow Automation"
  - "CRM Automation"
  - "Revenue Operations"
seriesName: "HubSpot Deal Cloning"
pillarUrl: "/posts/hubspot-clone-deal-complete-guide"
howto: true
howtoSteps:
  - name: "Understand the Copy Property limitation"
    text: "HubSpot's Copy Property action in workflows updates the enrolled (original) deal, not a newly created deal. This is the root cause of the problem."
  - name: "Choose your workaround method"
    text: "Select from company pass-through, sync properties, custom code, or Operations Hub based on your HubSpot tier and technical resources."
  - name: "Implement the property copying logic"
    text: "Build the workflow with your chosen method, mapping each property from the source deal to the new deal."
  - name: "Test with a sample deal"
    text: "Create a test deal, trigger the workflow, and verify all properties transferred to the new deal correctly."
---

You build a workflow that creates a renewal deal when the original closes as Won. You add a "Copy Property" action to carry the contract value forward. You test it — and the property updates on the *original* deal, not the new one.

This [trips up nearly every HubSpot user](https://community.hubspot.com/t5/CRM/Copy-property-of-and-original-deal-to-a-renewal-deal/m-p/1233479) who builds renewal automation. The "Copy Property" action operates on the enrolled record — the deal that triggered the workflow. Not the deal the workflow just created.

Here are four workarounds, from simplest to most powerful.

> This article is part of our [Complete Guide to Cloning Deals in HubSpot](/posts/hubspot-clone-deal-complete-guide).

---

## Why HubSpot's "Copy Property" Updates the Wrong Deal

When a deal-based workflow triggers, the "enrolled record" is the deal that matched the trigger criteria — the *original* deal. Every action in that workflow operates on the enrolled record by default.

The "Create Record" action creates a new deal — but it doesn't change which deal the workflow is operating on. The next action still targets the original deal. So "Copy Property Value" copies a value from one property to another *on the original deal*, not the new one.

This is by design. HubSpot workflows are object-scoped — they operate on one record throughout the workflow. There's no "switch context to the newly created record" action.

According to [Validity's 2025 State of CRM Data report](https://www.validity.com/resource-center/the-state-of-crm-data-management-in-2025/), 47% of reps say inaccurate data is worse than a year ago. Workarounds that introduce intermediate steps create more opportunities for data inconsistency — so pick the simplest method that works for your situation.

---

## Workaround 1: The Company Record Pass-Through

Use the associated Company record as an intermediary to shuttle property values from the original deal to the new deal.

**How it works:**

1. **Workflow A** (triggers on original deal Closed Won):
   - Copy "Amount" from the deal to a custom Company property (e.g., "Temp — Last Deal Amount")
   - Copy "Contract Term" from the deal to another Company property (e.g., "Temp — Last Contract Term")
   - Create the new deal in the Renewal Pipeline
   - Set the new deal's "Previous Contract Value" = the Company's "Temp — Last Deal Amount"

2. **Workflow B** (triggers on new deal creation in Renewal Pipeline):
   - Copy "Temp — Last Deal Amount" from the associated Company to the new deal's "Amount"
   - Copy "Temp — Last Contract Term" from the Company to the new deal's "Contract Term"

**Pros:**
- No third-party tools or custom code
- Works on any HubSpot tier with workflows (Professional+)
- Conceptually simple

**Cons:**
- **Fragile.** If the Company has multiple deals closing simultaneously, the "temp" properties get overwritten by the wrong deal.
- **Workflow loop risk.** Workflow B triggers on deal creation, which happens inside Workflow A. You need careful re-enrollment settings to prevent loops. See our [infinite loop fix guide](/posts/hubspot-renewal-workflow-infinite-loop-fix).
- **Clutters the Company record** with "temp" properties that have no business meaning.
- **Timing-sensitive.** Workflow B must fire *after* Workflow A updates the Company properties. HubSpot doesn't guarantee execution order.

**Best for:** Teams with simple renewal structures (1 deal per company at a time) and no developer resources.

---

## Workaround 2: Sync Properties (Newer HubSpot Feature)

HubSpot introduced property syncing that can keep properties in sync between associated records. If configured correctly, a deal property can automatically reflect its associated Company's property value — and vice versa.

**How it works:**

1. Create corresponding properties on both Deal and Company objects
2. Enable property sync between them in HubSpot Settings → Properties → Sync
3. When the original deal closes, its values sync to the Company
4. When the new deal is created and associated with the same Company, the synced properties populate automatically

**Pros:**
- No workflow needed for the data transfer
- Real-time sync (no timing issues)
- Native HubSpot feature

**Cons:**
- **Limited scope.** Not all property types support sync. Calculated properties, multi-select, and some field types are excluded.
- **Bidirectional risk.** If the new deal's amount changes (upsell), it might sync back to the Company and overwrite the original value.
- **Doesn't work cross-pipeline.** Sync applies to the *most recent* associated deal, which may not be the right one if the customer has deals in multiple pipelines.

**Best for:** Teams with simple 1:1 company-to-deal relationships where property values don't diverge.

---

## Workaround 3: Custom Code Action (Most Flexible Native Solution)

HubSpot [Sales Hub Professional+](https://www.hubspot.com/pricing/sales) supports custom code actions in workflows. Write a short JavaScript snippet that reads the source deal's properties and sets them on the newly created deal.

**How it works:**

1. Your workflow triggers on the original deal closing as Won
2. The "Create Record" action creates the new deal and outputs its ID
3. A custom code action runs next, reading properties from the original deal (available as `event.inputFields`) and writing them to the new deal via the HubSpot API

**Implementation:**

In your workflow:
1. Add a **Create Record → Deal** action. Note the property where the new deal's ID is stored.
2. Add a **Custom Code** action (Node.js 18):

```javascript
const hubspot = require('@hubspot/api-client');

exports.main = async (event) => {
  const client = new hubspot.Client({
    accessToken: process.env.PRIVATE_APP_ACCESS_TOKEN
  });

  const sourceDealId = event.object.objectId;
  const newDealId = event.inputFields['newDealId']; // From the Create Record output

  // Read source deal properties
  const sourceDeal = await client.crm.deals.basicApi.getById(sourceDealId, [
    'amount', 'contract_term', 'renewal_date', 'auto_renew',
    'deal_type', 'hs_line_item_global_term'
  ]);

  // Calculate new renewal date (add contract term months)
  const contractTerm = parseInt(sourceDeal.properties.contract_term) || 12;
  const currentRenewalDate = new Date(sourceDeal.properties.renewal_date);
  const newRenewalDate = new Date(currentRenewalDate);
  newRenewalDate.setMonth(newRenewalDate.getMonth() + contractTerm);

  // Update the new deal with source properties
  await client.crm.deals.basicApi.update(newDealId, {
    properties: {
      amount: sourceDeal.properties.amount,
      contract_term: sourceDeal.properties.contract_term,
      renewal_date: newRenewalDate.toISOString().split('T')[0],
      auto_renew: sourceDeal.properties.auto_renew,
      previous_contract_value: sourceDeal.properties.amount,
      original_deal_id: sourceDealId,
    }
  });

  return { outputFields: { success: true } };
};
```

**Pros:**
- Full control over which properties to copy and how to transform them
- Can calculate new dates, increment counters, apply business logic
- No third-party dependency
- No "temp" properties cluttering the Company record

**Cons:**
- Requires developer skills (JavaScript + HubSpot API knowledge)
- 20-second execution timeout — may fail for complex operations
- Harder to debug than visual workflow actions
- Requires a [Private App](https://developers.hubspot.com/docs/api/private-apps) for API authentication

**Best for:** Teams with developer resources who need custom logic (date calculations, conditional property copying, price adjustments).

---

## Workaround 4: Operations Hub Data Quality Automation

If you have [Operations Hub Professional](https://www.hubspot.com/pricing/operations), you can use Data Quality Automation to format, calculate, and transform property values — then feed them into your workflow.

**How it works:**

1. Use a **Format Data** action to read a property from the enrolled deal and output it as a formatted value
2. Use **Copy Property Value** to set that formatted value on the new deal (via the Company pass-through, or combined with custom code)

**What Ops Hub adds:**
- **Calculated properties** — compute Renewal Date = Close Date + Contract Term without custom code
- **Format Data actions** — extract, transform, and combine property values within workflows
- **Data quality rules** — validate property values before they're copied

**Best for:** Teams already on Operations Hub who want to minimize custom code.

---

## Which Properties Should You Copy?

Not every property should be carried forward. Here's the checklist:

**Always copy:**
- [ ] Amount / Contract Value
- [ ] Contract Term (months)
- [ ] Associated Company
- [ ] Associated Contacts
- [ ] Deal Type (set to "Renewal")
- [ ] Auto-Renew Flag
- [ ] Original Deal ID (for audit trail)

**Always recalculate:**
- [ ] Renewal Date (Close Date + Contract Term)
- [ ] Deal Name (new naming convention)
- [ ] Renewal Year (increment by 1)

**Always reset:**
- [ ] Deal Stage (first stage of target pipeline)
- [ ] Deal Owner (route to correct person)
- [ ] Renewal Created Boolean (set to "No" — for [loop prevention](/posts/hubspot-renewal-workflow-infinite-loop-fix))
- [ ] Health Score (start fresh)

For the full property setup, see [The 15 Custom Properties Every Renewal Pipeline Needs](/posts/hubspot-renewal-pipeline-properties).

---

## Testing Property Copying End-to-End

Before enabling your workflow on live data:

1. **Create a test deal** in the source pipeline with all properties populated
2. **Close it as Won** to trigger the workflow
3. **Check the new deal:** Does it have the correct amount, contract term, renewal date, associations?
4. **Check the original deal:** Did any properties get incorrectly overwritten?
5. **Check timing:** If using the Company pass-through, are both workflows completing in the right order?
6. **Test edge cases:** What happens with a $0 deal? A deal with no associated company? A deal already in the renewal pipeline?

These workflows also power [the 90-60-30 engagement cadence](/posts/hubspot-renewal-deal-workflow-automation) — if properties aren't copying correctly, the entire downstream automation breaks.

---

**Property copying between deals is deceptively simple in theory and surprisingly hard in practice.** SWOTBee has built deal property workflows for dozens of mid-market companies — handling the edge cases, timing issues, and data integrity challenges that trip up most teams.

[Book a free 30-minute discovery call →](/contactus)
