---
layout: ../../layouts/BlogPostLayout.astro
title: "How to Automate Renewal Deal Creation in HubSpot (Step-by-Step)"
pubDate: "2026-04-02"
description: "Step-by-step guide to automating renewal deals in HubSpot — from auto-creating deals on Closed Won to the 90-60-30 day engagement cadence. Includes workflow logic and property mappings."
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
---

The moment a new business deal closes as Won, the renewal clock starts ticking. If your team manually creates renewal deals — or worse, tracks renewals in a spreadsheet — you're guaranteeing that some will slip through the cracks.

This article walks through the foundational HubSpot workflows for renewal automation: auto-creating deals, copying the right properties, setting the correct dates, and building the 90-60-30 day engagement cadence that keeps renewals on track. ([HubSpot Academy covers the basics](https://academy.hubspot.com/lessons/maximizing-customer-retention-automate-your-renewal-process) — here we go much deeper.)

> This article is part of our [Complete Guide to Building a Renewal Pipeline in HubSpot](/posts/hubspot-renewal-pipeline-complete-guide).

---

## Prerequisites

Before building these workflows, you need:

- **[Sales Hub Professional or Enterprise](https://www.hubspot.com/pricing/sales)** (workflows aren't available on Starter)
- A [dedicated renewal pipeline](/posts/hubspot-renewal-pipeline-vs-sales-pipeline) with [defined stages](/posts/hubspot-renewal-pipeline-stages)
- [Custom properties](/posts/hubspot-renewal-pipeline-properties) set up: Deal Type, Renewal Date, Contract Term, Renewal Year
- [Operations Hub Professional](https://www.hubspot.com/pricing/operations) recommended (for calculated properties like Days to Renewal)

---

## Workflow 1: Auto-Create Renewal Deal on Closed Won

This is the foundation. Everything else builds on it.

### Trigger

**Object:** Deal-based workflow
**Enrollment trigger:** Deal Stage is "Closed Won" AND Deal Pipeline is "Sales Pipeline" (your new business pipeline)

Add a filter: **Deal Type is "New Business"** — this prevents renewal deals from triggering the same workflow (critical for avoiding the [infinite loop](/posts/hubspot-renewal-workflow-infinite-loop-fix)).

### Actions (in order)

**Step 1: Create a Deal**

Set these properties on the new deal:

| Property | Value | Notes |
|----------|-------|-------|
| Deal Name | `[Company Name] — Renewal [Year]` | Use personalization tokens |
| Pipeline | Renewal Pipeline | Your dedicated pipeline |
| Deal Stage | Active Contract (or first stage) | Starting stage |
| Deal Type | Renewal | Distinguishes from new business |
| Amount | Copy from enrolled deal | Same contract value |
| Renewal Date | Close Date + Contract Term | If 12-month contract closed Jan 15, renewal is Jan 15 next year |
| Contract Term | Copy from enrolled deal | Months (12, 24, 36) |
| Renewal Year | 1 | Increment for subsequent renewals |
| Deal Owner | CSM/Account Manager | Route to the right person |

**Step 2: Associate the new deal** with the same Company and Contacts as the original deal.

**Step 3: Create a task** for the new deal owner: "Review new renewal deal — [Company Name]" due in 7 days. This gives the CSM a heads-up that a new account has entered the renewal pipeline.

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
2. Calculate delay: `Renewal Date - 180 days`
3. After delay → move to Upcoming Renewal
4. Wait until `Renewal Date - 90 days` → move to 90-Day Check-In
5. Continue for each milestone

The downside: delays are set when the deal enrolls. If the renewal date changes, the delays don't update automatically.

---

## Workflow 3: The 90-60-30 Engagement Cadence

This is where automation meets human outreach. At each milestone, the workflow creates tasks and sends notifications to ensure the CSM takes action.

### 90 Days Out

- **Create task:** "Schedule renewal check-in with [Contact Name]" — due in 5 business days
- **Send internal notification:** Email to deal owner with account context (deal amount, contract term, any open support tickets)
- **Optional:** Enroll primary contact in a "Renewal Nurture" email sequence (product updates, case studies, ROI summaries)

### 60 Days Out

- **Create task:** "Send renewal proposal to [Company Name]" — due in 5 business days
- **If health score is "At Risk":** Escalate — create task for CS manager, skip proposal, schedule a save meeting
- **Send internal notification:** Include any engagement data (email opens, meeting attendance, support ticket status)

### 30 Days Out

- **Check deal stage:** If still at "90-Day Check-In" or earlier → **escalation alert**. This deal is behind.
- **Create task:** "Follow up on unsigned renewal — [Company Name]" — due in 3 business days
- **If no response after 2 follow-ups:** Create task for CS manager: "Intervene — renewal at risk"

### Overdue (Past Renewal Date)

- **Send alert to deal owner AND manager:** "Renewal overdue — [Company Name]"
- **Create task:** "Urgent: Contact [Company Name] about expired contract" — due immediately
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

When Year 1 works but Year 2 breaks, see [Fixing the Infinite Loop: Multi-Year Renewal Automation That Actually Works](/posts/hubspot-renewal-workflow-infinite-loop-fix).

---

## Preventing Duplicate Deals

One common problem: if a deal owner manually creates a renewal deal AND the workflow fires, you get duplicates.

**Prevention strategies:**

1. **Use a "Renewal Deal Created" boolean property.** The workflow checks this property before creating a new deal. If it's already "Yes," the workflow skips.
2. **Lock down manual deal creation** in the renewal pipeline. Use team permissions (Enterprise) or training to ensure only workflows create renewal deals.
3. **Weekly audit workflow.** Create a workflow that identifies duplicate renewal deals (same company, same renewal year) and alerts RevOps.

---

## Property Mapping Reference

These workflows require [specific custom properties](/posts/hubspot-renewal-pipeline-properties) — set them up first.

| Source Deal Property | Renewal Deal Property | Notes |
|---------------------|----------------------|-------|
| Amount | Amount | Copy as-is (adjust if upsell) |
| Close Date | (used to calculate Renewal Date) | Add contract term |
| Contract Term | Contract Term | Copy as-is |
| Associated Company | Associated Company | Maintain the association |
| Associated Contacts | Associated Contacts | Maintain the associations |
| Deal Owner | Deal Owner (or CSM) | Route to renewal owner |
| — | Deal Type = "Renewal" | Set explicitly |
| — | Renewal Year = 1 | Set for first renewal |
| — | Renewal Date | Calculated from close date |

---

## Testing Before Go-Live

Before enabling these workflows on live data:

1. **Create a test company** with a test deal in your new business pipeline
2. Set the close date to today and contract term to 1 month (so the renewal date is next month)
3. Close the test deal as Won
4. Verify: renewal deal created in the right pipeline, with correct properties, right owner, correct renewal date
5. Manually move the renewal deal through stages — verify tasks and notifications fire correctly
6. Close the renewal deal as Won — verify the next year's deal is created

If the chain breaks at Year 2, that's the [infinite loop problem](/posts/hubspot-renewal-workflow-infinite-loop-fix).

Add [health-triggered alerts](/posts/hubspot-churn-prevention-health-scores-workflows) to your renewal cadence for accounts showing risk signals.

**Pro tip:** If you use subscription billing platforms like [Chargebee](https://www.chargebee.com/integrations/hubspot/) or [Stripe](https://docs.stripe.com/billing/subscriptions/overview), you can trigger HubSpot workflows from billing events — creating renewal deals automatically when subscriptions approach their renewal date.

---

**This is where most teams get stuck.** Workflow automation looks simple in theory but breaks in subtle ways — wrong dates, missing associations, duplicate deals, infinite loops. SWOTBee has built renewal automation for dozens of mid-market companies across Energy, Manufacturing, and SaaS.

[Book a free 30-minute discovery call →](/contactus)
