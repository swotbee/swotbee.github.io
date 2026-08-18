---
layout: ../../layouts/BlogPostLayout.astro
title: "HubSpot Renewal Deal Automation: Create Renewal Deals Without Leakage"
pubDate: "2026-04-02"
modifiedDate: "2026-07-29"
description: "Build HubSpot workflows that auto-create renewal deals, copy the right properties, trigger 90-60-30 tasks, and stop leakage in NRR and GRR reporting."
howto: true
howtoSteps:
  - name: "Set the enrollment trigger"
    text: "Create a deal-based workflow that enrolls when Deal Stage is Closed Won and Deal Pipeline is your new-business Sales Pipeline. Add a filter for Deal Type is New Business so renewal deals cannot re-trigger the same workflow."
  - name: "Create the renewal deal"
    text: "Set Deal Name, Pipeline to Renewal Pipeline, Deal Stage to the first stage, Deal Type to Renewal, Amount and Contract Term copied from the enrolled deal, Renewal Date as Close Date plus Contract Term, and Deal Owner routed to the CSM."
  - name: "Associate the new deal"
    text: "Associate the new renewal deal with the same Company and Contacts as the original deal."
  - name: "Create a review task"
    text: "Create a task for the new deal owner to review the renewal deal, due in 7 days."
category:
  title: "Revenue Operations"
  href: "/categories/revenue-operations"
author:
  name: "SWOTBee Team"
  url: "https://swotbee.com"
  imageUrl: "/assets/ico/logo.png"
image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=450&fit=crop"
tags:
  - "HubSpot"
  - "Renewal Pipeline"
  - "Workflow Automation"
  - "Deal Automation"
  - "Revenue Operations"
seriesName: "HubSpot Renewal Pipeline"
funnelCta: "renewal-audit"
pillarUrl: "/posts/hubspot-renewal-pipeline-complete-guide"
faqs:
  - q: "Can HubSpot automate contract renewals for recurring services?"
    a: "Yes, with custom workflows, not a native recurring-services feature. Set a workflow to fire on Deal Won that clones the deal (or creates a new one) into a renewal pipeline, copies the properties that matter (previous contract value, renewal date, owner, line items), and sets a stage-based reminder cadence. HubSpot has no built-in recurring renewal object, everything described here is workflow logic on top of standard deals."
  - q: "Does HubSpot have a native renewal automation feature?"
    a: "No. There is no dedicated renewal object or automatic recurring-deal creation in HubSpot. The workflows in this guide (auto-create on Closed Won, time-based stage progression, the 90-60-30 cadence, and the loop that creates next year's deal) are how mid-market teams build renewal automation on the standard CRM."
  - q: "What breaks most often in HubSpot renewal deal automation?"
    a: "Two things: line items not carrying over to the new deal (native cloning can't copy them, workflows need explicit property-copy actions), and loop protection silently stopping a workflow from re-enrolling the deal it just created, which breaks the chain at year two or three without an obvious error."
---

The moment a new business deal closes as Won, the renewal clock starts ticking. If your team manually creates renewal deals, or worse, tracks renewals in a spreadsheet, you're guaranteeing that some will slip through the cracks.

This article walks through the foundational HubSpot workflows for renewal automation: auto-creating deals, copying the right properties, setting the correct dates, and building the 90-60-30 day engagement cadence that keeps renewals on track. ([HubSpot Academy covers the basics](https://academy.hubspot.com/lessons/maximizing-customer-retention-automate-your-renewal-process); here we go much deeper.)

> This article is part of our [Complete Guide to Building a Renewal Pipeline in HubSpot](/posts/hubspot-renewal-pipeline-complete-guide/).


## The Revenue Leakage Test

Before building this workflow, ask one question: if a customer renewed tomorrow, would HubSpot already know the renewal owner, date, amount, products, original contract value, and next task? If the answer is no, the gap is not cosmetic. It will show up later as late outreach, missing renewal deals, weak forecasts, and NRR/GRR numbers that finance does not trust.

Use this workflow with the [deal-cloning guide](/posts/hubspot-clone-deal-complete-guide/), [line-item cloning guide](/posts/hubspot-clone-deal-line-items/), and [renewal dashboard guide](/posts/hubspot-renewal-nrr-grr-dashboard-reporting/) so automation, quoting, and reporting share the same data model.

---

## Why Sales And Customer Success Both Need This

Renewal automation is not a sales-only concern. In most B2B SaaS teams, customer success owns the day-to-day renewal process (health scores, churn risk signals, expansion revenue conversations) while sales or RevOps owns the deal record and contract data. If those two functions work from different sources of truth, contract management gets messy fast: the customer success team can see churn risk but not the actual renewal deal, and the sales team can see the deal stage but not the health signals driving it.

Automating renewal deal creation is what lets both sides work off the same HubSpot record. A well-built renewal workflow tracks contract end date, renewal term, and renewal value automatically, so customer success can flag churn risk early and sales can see it reflected in the deal stages without a separate handoff meeting. That shared record is also what makes net revenue retention and renewal rate reportable at all, see the [NRR/GRR dashboard guide](/posts/hubspot-renewal-nrr-grr-dashboard-reporting/) for how the metric layer consumes this data.

---

## Prerequisites

Before building these workflows, you need:

- **[Sales Hub Professional or Enterprise](https://www.hubspot.com/pricing/sales)** (workflows aren't available on Starter)
- A [dedicated renewal pipeline](/posts/hubspot-renewal-pipeline-vs-sales-pipeline/) with [defined stages](/posts/hubspot-renewal-pipeline-stages/)
- [Custom properties](/posts/hubspot-renewal-pipeline-properties/) set up: Deal Type, Renewal Date, Contract Term, Renewal Year
- [Operations Hub Professional](https://www.hubspot.com/pricing/operations) recommended (for calculated properties like Days to Renewal)

---

## Workflow 1: Auto-Create Renewal Deal on Closed Won

This is the foundation. Everything else builds on it.

### Trigger

**Object:** Deal-based workflow
**Enrollment trigger:** Deal Stage is "Closed Won" AND Deal Pipeline is "Sales Pipeline" (your new business pipeline)

Add a filter: **Deal Type is "New Business"**. This prevents renewal deals from triggering the same workflow (critical for avoiding the [infinite loop](/posts/hubspot-renewal-workflow-infinite-loop-fix/)).

### Actions (in order)

**Step 1: Create a Deal**

Set these properties on the new deal:

| Property | Value | Notes |
|----------|-------|-------|
| Deal Name | `[Company Name]: Renewal [Year]` | Use personalization tokens |
| Pipeline | Renewal Pipeline | Your dedicated pipeline |
| Deal Stage | Active Contract (or first stage) | Starting stage |
| Deal Type | Renewal | Distinguishes from new business |
| Amount | Copy from enrolled deal | Same contract value |
| Renewal Date | Close Date + Contract Term | If 12-month contract closed Jan 15, renewal is Jan 15 next year |
| Contract Term | Copy from enrolled deal | Months (12, 24, 36) |
| Renewal Year | 1 | Increment for subsequent renewals |
| Deal Owner | CSM/Account Manager | Route to the right person |

**Step 2: Associate the new deal** with the same Company and Contacts as the original deal.

**Step 3: Create a task** for the new deal owner: "Review new renewal deal, [Company Name]" due in 7 days. This gives the CSM a heads-up that a new account has entered the renewal pipeline.

### Important: The Renewal Date Calculation

HubSpot workflows can't natively add months to a date. You have two options:

**Option A ([Operations Hub Pro](https://www.hubspot.com/pricing/operations)):** Use a custom-coded action or calculated property. Create a property "Renewal Date" that equals "Close Date + Contract Term (months)."

**Option B (No Ops Hub):** Set a static date based on the enrolled deal's close date. For 12-month contracts, use a "Copy property value" action to set Renewal Date = Close Date, then use a "Format Data" action to add 365 days. This is approximate but works for standard annual contracts.

---

## Workflow 2: Time-Based Stage Progression

This workflow automatically moves renewal deals through stages as the renewal date approaches.

### Trigger

**Object:** Deal-based workflow
**Enrollment trigger:** Deal Pipeline is "Renewal Pipeline" AND Deal Stage is "Active Contract"

Enable re-enrollment so deals can re-enter if moved backward.

### Actions

Use **If/Then branches** based on a calculated "Days to Renewal" property (or use date-based delays):

**Branch 1:** If Days to Renewal ≤ 180 AND > 90 → Move to "Upcoming Renewal"
**Branch 2:** If Days to Renewal ≤ 90 AND > 60 → Move to "90-Day Check-In"
**Branch 3:** If Days to Renewal ≤ 60 AND > 30 → Move to "60-Day Proposal"
**Branch 4:** If Days to Renewal ≤ 30 AND > 0 → Move to "30-Day Negotiation"
**Branch 5:** If Days to Renewal ≤ 0 → Move to "Overdue" → Send alert to CS manager

### Alternative: Delay-Based Approach

If you don't have [Operations Hub](https://www.hubspot.com/pricing/operations) for calculated fields, use delays instead:

1. Enroll deal when created in Renewal Pipeline
2. Calculate delay: `Renewal Date, 180 days`
3. After delay → move to Upcoming Renewal
4. Wait until `Renewal Date, 90 days` → move to 90-Day Check-In
5. Continue for each milestone

The downside: delays are set when the deal enrolls. If the renewal date changes, the delays don't update automatically.

---

## Workflow 3: The 90-60-30 Engagement Cadence

This is where automation meets human outreach. At each milestone, the workflow creates tasks and sends notifications to ensure the CSM takes action.

### 90 Days Out

- **Create task:** "Schedule renewal check-in with [Contact Name]", due in 5 business days
- **Send internal notification:** Email to deal owner with account context (deal amount, contract term, any open support tickets)
- **Optional:** Enroll primary contact in a "Renewal Nurture" email sequence (product updates, case studies, ROI summaries)

### 60 Days Out

- **Create task:** "Send renewal proposal to [Company Name]", due in 5 business days
- **If health score is "At Risk":** Escalate: create task for CS manager, skip proposal, schedule a save meeting
- **Send internal notification:** Include any engagement data (email opens, meeting attendance, support ticket status)

### 30 Days Out

- **Check deal stage:** If still at "90-Day Check-In" or earlier → **escalation alert**. This deal is behind.
- **Create task:** "Follow up on unsigned renewal, [Company Name]", due in 3 business days
- **If no response after 2 follow-ups:** Create task for CS manager: "Intervene: renewal at risk"

### Overdue (Past Renewal Date)

- **Send alert to deal owner AND manager:** "Renewal overdue, [Company Name]"
- **Create task:** "Urgent: Contact [Company Name] about expired contract", due immediately
- **Move deal stage** to "Overdue"
- **If still no response after 14 days:** Move to "At Risk" or "Closed Lost" depending on your process

---

## Workflow 4: Renewal Closed Won → Create Next Year's Deal

When a renewal deal closes as Won, you need to create next year's renewal deal automatically. This creates a chain: Year 1 → Year 2 → Year 3 → and so on.

### The Basic Setup

**Trigger:** Deal Stage is "Closed Won" AND Deal Pipeline is "Renewal Pipeline"

**Actions:** Same as Workflow 1, but:
- Increment the "Renewal Year" property by 1
- Set the new Renewal Date to the current Renewal Date + Contract Term
- Copy all relevant properties from the closing deal

### The Problem: Year 2 Never Creates Year 3

HubSpot's workflow enrollment rules prevent a deal from triggering the same workflow twice. So Workflow 4 creates the Year 2 deal, but when Year 2 closes as Won, the workflow doesn't fire again.

This is the infamous "infinite loop" problem, and it's the #1 reported issue in the [HubSpot Community](https://community.hubspot.com/) for renewal automation.

When Year 1 works but Year 2 breaks, see [Fixing the Infinite Loop: Multi-Year Renewal Automation That Actually Works](/posts/hubspot-renewal-workflow-infinite-loop-fix/).

---

## Preventing Duplicate Deals

One common problem: if a deal owner manually creates a renewal deal AND the workflow fires, you get duplicates.

**Prevention strategies:**

1. **Use a "Renewal Deal Created" boolean property.** The workflow checks this property before creating a new deal. If it's already "Yes," the workflow skips.
2. **Lock down manual deal creation** in the renewal pipeline. Use team permissions (Enterprise) or training to ensure only workflows create renewal deals.
3. **Weekly audit workflow.** Create a workflow that identifies duplicate renewal deals (same company, same renewal year) and alerts RevOps.

---

## Property Mapping Reference

These workflows require [specific custom properties](/posts/hubspot-renewal-pipeline-properties/). Set them up first.

| Source Deal Property | Renewal Deal Property | Notes |
|---------------------|----------------------|-------|
| Amount | Amount | Copy as-is (adjust if upsell) |
| Close Date | (used to calculate Renewal Date) | Add contract term |
| Contract Term | Contract Term | Copy as-is |
| Associated Company | Associated Company | Maintain the association |
| Associated Contacts | Associated Contacts | Maintain the associations |
| Deal Owner | Deal Owner (or CSM) | Route to renewal owner |
| (none) | Deal Type = "Renewal" | Set explicitly |
| (none) | Renewal Year = 1 | Set for first renewal |
| (none) | Renewal Date | Calculated from close date |

---

## Testing Before Go-Live

Before enabling these workflows on live data:

1. **Create a test company** with a test deal in your new business pipeline
2. Set the close date to today and contract term to 1 month (so the renewal date is next month)
3. Close the test deal as Won
4. Verify: renewal deal created in the right pipeline, with correct properties, right owner, correct renewal date
5. Manually move the renewal deal through stages and verify tasks and notifications fire correctly
6. Close the renewal deal as Won and verify the next year's deal is created

If the chain breaks at Year 2, that's the [infinite loop problem](/posts/hubspot-renewal-workflow-infinite-loop-fix/).

Add [health-triggered alerts](/posts/hubspot-churn-prevention-health-scores-workflows/) to your renewal cadence for accounts showing risk signals.

**Pro tip:** If you use subscription billing platforms like [Chargebee](https://www.chargebee.com/integrations/hubspot/) or [Stripe](https://docs.stripe.com/billing/subscriptions/overview), you can trigger HubSpot workflows from billing events, creating renewal deals automatically when subscriptions approach their renewal date.

---

## Frequently Asked Questions

**Can HubSpot automate contract renewals for recurring services?**
Yes, with custom workflows, not a native recurring-services feature. Set a workflow to fire on Deal Won that clones the deal (or creates a new one) into a renewal pipeline, copies the properties that matter (previous contract value, renewal date, owner, line items), and sets a stage-based reminder cadence. HubSpot has no built-in recurring renewal object, everything above is workflow logic on top of standard deals.

**Does HubSpot have a native renewal automation feature?**
No. There is no dedicated renewal object or automatic recurring-deal creation in HubSpot. The workflows above (auto-create on Closed Won, time-based stage progression, the 90-60-30 cadence, and the loop that creates next year's deal) are how mid-market teams build renewal automation on the standard CRM.

**What breaks most often in HubSpot renewal deal automation?**
Two things: line items not carrying over to the new deal (native cloning can't copy them, workflows need explicit property-copy actions), and loop protection silently stopping a workflow from re-enrolling the deal it just created, which breaks the chain at year two or three without an obvious error.

---

**This is where most teams get stuck.** Workflow automation looks simple in theory but breaks in subtle ways: wrong dates, missing associations, duplicate deals, infinite loops. SWOTBee has built renewal automation for dozens of mid-market companies across Energy, Manufacturing, and SaaS.

[Get your 1-page renewal leakage estimate →](/resources/renewal-leakage-estimate/)

No call needed. Prefer to talk it through first? [Book a free 30-minute discovery call →](/renewal-audit-call/)
