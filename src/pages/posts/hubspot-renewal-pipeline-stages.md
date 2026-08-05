---
layout: ../../layouts/BlogPostLayout.astro
title: "What Stages Should Your HubSpot Renewal Pipeline Have? 3 Proven Models"
pubDate: "2026-04-02"
description: "Three proven HubSpot renewal pipeline stage models: time-based, activity-based, and customer-journey: with exact stage definitions, probability weights, and when to use each."
category:
  title: "Revenue Operations"
  href: "/categories/revenue-operations"
author:
  name: "SWOTBee Team"
  url: "https://swotbee.com"
  imageUrl: "/assets/ico/logo.png"
image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&h=450&fit=crop"
tags:
  - "HubSpot"
  - "Renewal Pipeline"
  - "Deal Stages"
  - "Revenue Operations"
  - "Pipeline Management"
seriesName: "HubSpot Renewal Pipeline"
pillarUrl: "/posts/hubspot-renewal-pipeline-complete-guide"
modifiedDate: "2026-07-24"
funnelCta: "renewal-audit"
faqs:
  - q: "How many stages should a HubSpot renewal pipeline have?"
    a: "Six to eight for most mid-market teams. Fewer than that and stages stop mapping to a specific action; more than that and CSMs stop updating them accurately. The hybrid model above (10 to 12 stages) only makes sense once your team has the automation maturity to keep every stage current."
  - q: "Should renewal pipeline probabilities match my sales pipeline probabilities?"
    a: "No. Renewals close at 85 to 95 percent industry-wide; new business closes at 20 to 30 percent. Reusing sales-pipeline probability weights on a renewal pipeline understates your real forecast, sometimes by tens of thousands of dollars a month. See why your renewal forecast is wrong for the full breakdown."
  - q: "Can I combine time-based and activity-based renewal stages?"
    a: "Yes, this is the hybrid model covered above, and it is the most common setup once a team outgrows a single model. Customer-journey stages before the renewal window, time-based stages during the 90-day countdown, activity-based stages for the final negotiation."
  - q: "Do I need Operations Hub Professional to build a renewal pipeline?"
    a: "Only for the time-based model's calculated \"Days to Renewal\" property. The activity-based and customer-journey models work on any HubSpot tier since they trigger off manual updates and logged activities, not calculated date fields."
howto: true
howtoSteps:
  - name: "Create a separate renewal pipeline"
    text: "Go to Settings, Objects, Deals, Pipelines, and create a dedicated renewal pipeline rather than adding renewal stages to your existing new-business deal pipeline."
  - name: "Add each stage"
    text: "Click Add Stage for every stage in your chosen model (time-based, activity-based, customer-journey, or a hybrid), and set the win probability percentage for each."
  - name: "Order and configure stages"
    text: "Drag to reorder stages, then under each stage configure required properties, for example requiring Churn Reason on Closed Lost."
  - name: "Enable required-property rules"
    text: "Under pipeline rules, enable \"Require properties when moving to certain stages\" so data quality is enforced at the moments that matter."
---

The stages in your HubSpot renewal pipeline aren't just labels. They drive your automation triggers, your team's daily workflow, your forecast accuracy, and your ability to spot at-risk accounts before it's too late. Unlike [traditional sales pipeline stages](https://www.salesforce.com/sales/pipeline/management/) built around new business buyer intent, renewal pipeline stages are built around time and customer health.

Get stages wrong and everything downstream breaks: workflows fire at the wrong time, CSMs don't know what to do at each stage, and your forecast is a guess. This is also why a separate renewal pipeline, distinct from the deal pipeline your CRM ships with by default, matters before stage design even starts: SaaS and other recurring-revenue businesses that mix renewals into a new-business deal pipeline get stage definitions that fit neither motion well.

This article covers three proven stage models for your renewal pipeline setup, with exact definitions, probability weightings, and clear guidance on when to use each, so you're not guessing at best practices from scratch.

> This article is part of our [Complete Guide to Building a Renewal Pipeline in HubSpot](/posts/hubspot-renewal-pipeline-complete-guide).

---

## Renewal Pipeline Setup: Two Principles Before You Pick Stages

**Principle 1: Every stage should trigger a specific action.** If a stage doesn't tell the deal owner "do this now," it's dead weight. Remove it.

**Principle 2: Stages should be mutually exclusive and objectively measurable.** "Engaged" is subjective. "Renewal Proposal Sent" is objective. Prefer stages where you can automate the transition.

---

## Model 1: Time-Based Stages

The most common model. Stages are defined by how many days remain until the contract renewal date.

| Stage | Days to Renewal | Probability | Action Required |
|-------|----------------|------------|----------------|
| Active Contract | 180+ days | 80% | Monitor customer health signals |
| Upcoming Renewal | 90, 180 days | 82% | Schedule QBR or health check |
| 90-Day Check-In | 60, 90 days | 85% | Conduct renewal conversation |
| 60-Day Proposal | 30, 60 days | 88% | Send renewal terms/proposal |
| 30-Day Negotiation | 0, 30 days | 85% | Negotiate terms, escalate blockers |
| Overdue | Past renewal date | 50% | Escalate, high churn risk |
| Closed Won. Renewed |, | 100% | Create next year's deal |
| Closed Lost. Churned |, | 0% | Log churn reason, trigger win-back |

### When to Use This Model

- Your contracts have a fixed renewal date
- You want fully automated stage progression (workflows move deals based on date calculations)
- Your team is large enough that manual stage updates aren't realistic
- You need pipeline reports that show "what's coming due this month/quarter"

### Pros
- Easiest to automate, date-based workflows handle all stage transitions
- Visual pipeline shows upcoming renewal workload at a glance
- Works well with the [90-60-30 engagement cadence](/posts/hubspot-renewal-deal-workflow-automation)

### Cons
- Doesn't reflect whether the CSM has actually engaged the customer
- A deal at "60 days" could mean "proposal accepted, waiting on PO" or "haven't talked to them yet", same stage, very different situations
- Requires [Operations Hub Professional](https://www.hubspot.com/pricing/operations) for calculated "Days to Renewal" property

---

## Model 2: Activity-Based Stages

Stages advance when the CSM completes specific actions, not when time passes.

| Stage | Trigger | Probability | Action Required |
|-------|---------|------------|----------------|
| Scheduled | Renewal deal created | 80% | No action yet, auto-created |
| Health Check Booked | Meeting scheduled | 82% | Prepare account review |
| Health Check Complete | Meeting completed | 85% | Assess renewal readiness |
| Renewal Sent | Proposal/quote delivered | 90% | Wait for customer response |
| Negotiating | Customer responded with changes | 85% | Work through terms |
| Verbal Commit | Customer agreed, awaiting signature | 95% | Send contract |
| Closed Won. Renewed | Signed | 100% | Create next year's deal |
| Closed Lost. Churned | Customer declined | 0% | Log churn reason |

### When to Use This Model

- Your renewal process involves multiple conversations (not just "send and sign")
- You want accountability, stages prove the CSM actually engaged the account
- Contract terms vary significantly between customers
- You're in an industry (Energy, Manufacturing) where renewals are negotiated, not rubber-stamped

### Pros
- Each stage represents real progress, not just the passage of time
- Easier to identify stuck deals, a deal sitting at "Health Check Booked" for 3 weeks is clearly behind
- Works without [Operations Hub](https://www.hubspot.com/pricing/operations) (no calculated date fields needed)

### Cons
- Harder to automate, someone must update the stage manually or log a meeting/task
- Doesn't automatically surface upcoming renewals by date
- Requires CSM discipline (if they don't update stages, the pipeline is wrong)

---

## Model 3: Customer-Journey Stages

Stages mirror the full customer lifecycle, not just the renewal window. This model is popular with Customer Success teams who manage the entire post-sale relationship.

| Stage | Definition | Probability | Action Required |
|-------|-----------|------------|----------------|
| Onboarding | Post-sale, implementation in progress | 75% | Complete onboarding milestones |
| Adoption | Customer is actively using the product | 80% | Monitor usage, provide training |
| Value Realization | Customer has achieved their stated goals | 85% | Document ROI, prep case study |
| Renewal Conversation | Proactive discussion about renewal | 88% | Present renewal options |
| Renewal Sent | Formal proposal/quote delivered | 90% | Follow up on proposal |
| Closed Won. Renewed | Contract signed | 100% | Celebrate, create next deal |
| Closed Lost. Churned | Customer left | 0% | Log churn reason |

### When to Use This Model

- Customer Success owns the renewal pipeline end-to-end
- You have a long onboarding period (3+ months)
- Churn risk is highest during onboarding and adoption (your data shows this)
- You want one pipeline view from "new customer" to "renewed customer"
- Your health scoring is mature enough to automate stage transitions

### Pros
- Catches churn risk early, a customer stuck in "Onboarding" for 6 months is clearly at risk
- Aligns pipeline stages with customer success KPIs
- Makes it easy to correlate onboarding quality with renewal rates

### Cons
- Long pipeline, deals live here for the entire contract duration (12+ months)
- Not great for short-cycle renewals (monthly or quarterly contracts)
- Harder to use for revenue forecasting (early stages are too far from the renewal event)

---

## Hybrid: Combining Models

Many teams combine elements. A common hybrid:

- **Pre-renewal:** Customer-journey stages (Onboarding → Adoption → Value Realization)
- **Renewal window (90 days out):** Time-based stages (90-Day → 60-Day → 30-Day)
- **Outcome:** Activity-based (Renewal Sent → Negotiating → Closed)

This gives you lifecycle visibility AND date-driven urgency AND proof of engagement. The trade-off is more stages (10, 12 total) and more automation complexity.

---

## Setting Probability Weights

Renewal probabilities should be much higher than new business probabilities. If you're using the same 10%/20%/40%/60% scale for renewals, your forecast understates reality.

**How to set initial weights:**
1. Look at your historical renewal data (last 12, 24 months)
2. For each stage, calculate: (deals that eventually closed won from this stage) ÷ (total deals that entered this stage)
3. That's your probability

**If you don't have historical data,** start with the weights in the tables above and adjust quarterly based on actuals.

These probability weights power your [forecast accuracy](/posts/hubspot-renewal-forecasting-accuracy). Get them wrong and your forecast is wrong, it's that direct.

---

## Configuring Renewal Pipeline Stages in HubSpot

1. Go to **Settings → Objects → Deals → Pipelines**
2. Create a separate renewal pipeline if you haven't already, don't add these stages to your existing new-business deal pipeline
3. Click "Add Stage" for each stage
4. Set the "Win probability" percentage
5. Drag to reorder stages
6. Under each stage, configure required properties (e.g. require "Churn Reason" on Closed Lost)

**Key setting:** Under pipeline rules, enable "Require properties when moving to certain stages." This forces data quality at the moments that matter.

These stages power [your automation workflows](/posts/hubspot-renewal-deal-workflow-automation) that automate renewal deal creation from the prior period's Closed Won deal. Make sure your stage names match exactly what your workflows reference.

---

## Our Recommendation

For most mid-market SaaS and services teams building their first renewal pipeline in HubSpot:

**Start with the time-based model.** It's the easiest to automate, the most intuitive for teams new to renewal management, and it surfaces upcoming work by date, which is what your team needs most. This is also the best-practices default we recommend when a client's HubSpot CRM has never had a dedicated renewal pipeline before.

As your Customer Success operation matures, layer in activity-based elements (Renewal Sent, Negotiating) for the final stages. This gives you the best of both worlds: automated stage progression early, with manual checkpoints at the critical moments.

Assign probability weights to [improve your forecast accuracy](/posts/hubspot-renewal-forecasting-accuracy) from day one.

---

## Frequently Asked Questions

**How many stages should a HubSpot renewal pipeline have?**
Six to eight for most mid-market teams. Fewer than that and stages stop mapping to a specific action; more than that and CSMs stop updating them accurately. The hybrid model above (10 to 12 stages) only makes sense once your team has the automation maturity to keep every stage current.

**Should renewal pipeline probabilities match my sales pipeline probabilities?**
No. Renewals close at 85 to 95 percent industry-wide; new business closes at 20 to 30 percent. Reusing sales-pipeline probability weights on a renewal pipeline understates your real forecast, sometimes by tens of thousands of dollars a month. See [why your renewal forecast is wrong](/posts/hubspot-renewal-forecasting-accuracy) for the full breakdown.

**Can I combine time-based and activity-based renewal stages?**
Yes, this is the hybrid model covered above, and it is the most common setup once a team outgrows a single model. Customer-journey stages before the renewal window, time-based stages during the 90-day countdown, activity-based stages for the final negotiation.

**Do I need Operations Hub Professional to build a renewal pipeline?**
Only for the time-based model's calculated "Days to Renewal" property. The activity-based and customer-journey models work on any HubSpot tier since they trigger off manual updates and logged activities, not calculated date fields.

---

**Want help configuring your renewal stages?** SWOTBee sets up renewal pipelines with the right stage model for your team size, contract complexity, and reporting needs.

[Book a free 30-minute discovery call →](/contactus/)
