---
layout: ../../layouts/BlogPostLayout.astro
title: "The Complete Guide to Building a Renewal Pipeline in HubSpot"
pubDate: "2026-04-02"
description: "The definitive guide to building a HubSpot renewal pipeline: from architecture and automation to dashboards and churn prevention. Everything mid-market teams need to stop losing renewals."
category:
  title: "Revenue Operations"
  href: "/categories/revenue-operations"
modifiedDate: "2026-07-24"
funnelCta: "renewal-audit"
author:
  name: "SWOTBee Team"
  url: "https://swotbee.com"
  imageUrl: "/assets/ico/logo.png"
  bio: "HubSpot-certified consultants specializing in renewal pipeline architecture, RevOps automation, and CRM migration for mid-market B2B companies."
  linkedin: "https://linkedin.com/company/swotbee"
  expertise:
    - "HubSpot CRM"
    - "Renewal Pipelines"
    - "Revenue Operations"
image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop"
tags:
  - "HubSpot"
  - "Renewal Pipeline"
  - "Revenue Operations"
  - "Customer Retention"
  - "CRM Automation"
  - "SaaS Renewals"
howto: true
howtoSteps:
  - name: "Create the pipeline"
    text: "Go to Settings, Objects, Deals, Pipelines, and click Create Pipeline. Name it something your team will recognize, like Renewal Pipeline."
  - name: "Configure stages with probability weights"
    text: "Add stages and assign probability weights that reflect renewal reality, not new-business reality, since renewal probabilities should be much higher across the board."
  - name: "Add required properties"
    text: "Make critical fields required at specific stages, for example requiring Churn Reason when a deal moves to Closed Lost, and Renewal Amount when a deal enters Renewal Sent."
  - name: "Check your HubSpot tier"
    text: "Confirm you have Sales Hub Professional or higher for workflow automation, and add Operations Hub Professional if you need calculated properties like Days to Renewal."
---

If you manage recurring revenue (subscriptions, annual contracts, retainers) and you're running renewals through your sales pipeline, you're almost certainly losing deals you shouldn't be.

The reason is simple: new business and renewals are fundamentally different motions. New business is intent-driven ("this prospect wants to buy"). Renewals are time-driven ("this contract expires in 90 days"). Mixing them in the same pipeline muddies your forecasting, confuses your team, and lets renewals slip through the cracks.

This guide covers everything you need to build a dedicated renewal pipeline in HubSpot, from architecture decisions and stage definitions to automation workflows and executive dashboards. It's the resource we wish existed when we started building renewal systems for our clients in Energy, Manufacturing, and SaaS.

> **This is the pillar article in our HubSpot Renewal Pipeline series.** Each section links to a deeper cluster article where we go step-by-step. Bookmark this page and use it as your reference.

---

## Why Renewals Deserve Their Own Pipeline

Between 70% and 80% of SaaS revenue comes from existing customers. [Research by Bain & Company, published in Harvard Business Review](https://hbr.org/2014/10/the-value-of-keeping-the-right-customers), found that increasing customer retention by just 5% boosts profits by 25, 95%. For companies with annual contracts (energy services, manufacturing suppliers, B2B SaaS) the math is even more lopsided. A missed renewal doesn't just cost you one deal. It costs you every future year of that contract.

Here's what goes wrong when renewals share a pipeline with new business:

**Forecasting breaks.** New business deals close at 20, 30%. Renewals close at 85, 95%. When both live in the same pipeline, your weighted forecast is fiction. A VP of Sales looking at pipeline value has no idea what's real.

**Renewals get deprioritized.** Sales teams chase new logos. Renewal deals sitting at "Upcoming Renewal" don't get the same urgency as a hot inbound lead. Without a dedicated pipeline, renewals are invisible until they're overdue.

**Stage definitions don't fit.** A new business pipeline has stages like "Discovery," "Demo," "Proposal Sent." Renewals need stages like "6+ Months Out," "90-Day Check-In," "Renewal Sent," "Negotiating." Forcing renewals into sales stages means your pipeline stages carry no useful information.

**Ownership is unclear.** Is the renewal the AE's responsibility? The CSM's? When there's one pipeline, nobody owns it.

Not sure if you need a separate pipeline? Read our [decision framework for separating vs. unifying pipelines](/posts/hubspot-renewal-pipeline-vs-sales-pipeline).

---

## What a HubSpot Renewal Pipeline Looks Like


A well-built renewal pipeline has four components working together:

### Pipeline Stages

There are three proven stage models. The right one depends on your sales cycle and team size:

1. **Time-based stages:** 12+ Months Out → 6, 12 Months → 3, 6 Months → 90 Days → 60 Days → 30 Days → Renewal Sent → Closed Won / Closed Lost
2. **Activity-based stages:** Active Contract → Health Check Scheduled → Health Check Complete → Renewal Proposal Sent → Negotiating → Closed Won / Closed Lost
3. **Customer-journey stages:** Onboarding → Adoption → Value Realization → Renewal Conversation → Renewal Sent → Closed Won / Closed Lost

See our [deep dive on stage definitions](/posts/hubspot-renewal-pipeline-stages) for all three models with probability weightings and pros/cons.

### Essential Properties

Every renewal deal needs custom properties that standard HubSpot deal properties don't cover: deal type, renewal date, contract term, renewal year, auto-renew flag, days-to-renewal, health score, and churn reason.

See the [complete list of 15 properties](/posts/hubspot-renewal-pipeline-properties) your renewal pipeline needs.

### Ownership Model

The most common model: **Customer Success owns the renewal pipeline**, Sales owns the new business pipeline. If there's an expansion opportunity during renewal, it either stays in the renewal deal (simple upsell) or spawns a separate deal in an expansion pipeline (complex multi-product upsell).

RevOps should own the pipeline architecture, automation, and reporting, regardless of who owns individual deals. For the full decision framework and how to automate the CS-to-sales handoff, see [who should own renewals: CS vs sales](/posts/hubspot-renewal-ownership-cs-vs-sales).

### Automation Layer

This is where HubSpot shines, and where most implementations break. The core automations are:

- **Auto-create renewal deals** when a new business deal closes as Won
- **Time-based stage progression** as the renewal date approaches
- **90-60-30 day engagement cadence** with tasks and emails
- **Multi-year renewal chains** that create next year's deal when this year closes
- **Churn/at-risk alerts** when health signals deteriorate

For the deeper builds, see [renewal reminders and alerts](/posts/hubspot-renewal-reminders), [renewal email sequences](/posts/hubspot-renewal-email-sequence), and [renewal risk scoring](/posts/hubspot-renewal-risk-scoring).

Want a head start? Use our [copy-paste renewal pipeline template](/posts/hubspot-renewal-pipeline-template) for the stages, properties, and automation checklist.

---

## Setting Up Your Renewal Pipeline Step-by-Step

### Step 1: Create the Pipeline

In HubSpot, go to **Settings → Objects → Deals → Pipelines** and click "Create Pipeline." Name it "Renewal Pipeline" (or "Customer Renewals", whatever your team will recognize).

### Step 2: Configure Stages with Probability Weights

Add your stages and assign probability weights that reflect renewal reality, not new business reality:

| Stage | Probability | Notes |
|-------|------------|-------|
| Active Contract | 80% | Post-onboarding, healthy account |
| 90-Day Check-In | 85% | Engagement started |
| 60-Day Renewal Sent | 90% | Proposal delivered |
| 30-Day Negotiating | 85% | Terms under discussion |
| Closed Won. Renewed | 100% | Done |
| Closed Lost. Churned | 0% | Log churn reason |

Notice these are much higher than new business probabilities. That's the point: if your renewal probabilities look like sales probabilities, your pipeline isn't reflecting reality.

### Step 3: Add Required Properties

Make critical fields required at specific stages. For example, require "Churn Reason" when a deal moves to Closed Lost. Require "Renewal Amount" when a deal enters "Renewal Sent."

### Step 4: HubSpot Tier Check

You need **[Sales Hub Professional](https://www.hubspot.com/pricing/sales)** or higher for workflow automation. Enterprise gives you advanced permissions and predictive scoring. **[Operations Hub Professional](https://www.hubspot.com/pricing/operations)** adds calculated properties (essential for "Days to Renewal"). **[Service Hub Professional](https://www.hubspot.com/pricing/service)** gives you native health scores via the [Customer Success Workspace](https://knowledge.hubspot.com/customer-success/set-up-and-manage-the-customer-success-workspace).

---

## Automating the Renewal Lifecycle

Automation is the difference between a renewal pipeline that works and a glorified spreadsheet. [HubSpot Academy's lesson on automating renewals](https://academy.hubspot.com/lessons/maximizing-customer-retention-automate-your-renewal-process) covers the basics, here we go deeper with the five workflows every renewal pipeline needs:

### Workflow 1: Auto-Create Renewal Deal on Closed Won

When a new business deal closes, a workflow creates the renewal deal, pre-populated with the renewal date (close date + contract term), deal amount, associated company and contacts, and the CSM as deal owner.

Follow our [step-by-step automation guide](/posts/hubspot-renewal-deal-workflow-automation) for the full workflow setup. The part teams get wrong most often is line items: native HubSpot cloning drops them, and a renewal deal without line items isn't ready to quote or report on. See our [complete guide to cloning deals in HubSpot](/posts/hubspot-clone-deal-complete-guide) and the [line-item cloning fix](/posts/hubspot-clone-deal-line-items) for the workarounds, and the [deal-cloning apps comparison](/posts/hubspot-deal-cloning-apps-compared) if you'd rather use a marketplace app than build the workflow yourself.

### Workflow 2: Time-Based Stage Progression

A date-based workflow moves renewal deals forward automatically. When "Days to Renewal" drops below 90, the deal moves to "90-Day Check-In." Below 60, it moves to "60-Day" stage. And so on.

### Workflow 3: The 90-60-30 Engagement Cadence

At each milestone, the workflow creates tasks for the CSM:
- **90 days:** Schedule a health check meeting
- **60 days:** Send the renewal proposal
- **30 days:** Follow up if unsigned, escalate if at-risk

Pair this internal cadence with a customer-facing [renewal email sequence](/posts/hubspot-renewal-email-sequence) so outreach and reminders work together.

### Workflow 4: Multi-Year Renewal Chain

When a renewal deal closes as Won, a new workflow creates next year's renewal deal. This is where HubSpot's re-enrollment blocking causes the infamous infinite loop problem.

Hit the infinite loop? Here's [how to fix it](/posts/hubspot-renewal-workflow-infinite-loop-fix).

### Workflow 5: Churn/At-Risk Alerts

When an account's health score drops or a renewal deal sits too long without progress, alert the CSM and their manager. Build a [churn prevention workflow](/posts/hubspot-churn-prevention-health-scores-workflows) that catches risk early.

---

## Handling Expansions, Downgrades, and Churn

Renewals rarely happen in isolation. Customers expand, downgrade, add products, or cancel specific services, often during the renewal conversation.

**Simple upsell (same product, higher tier):** Update the renewal deal amount. Keep it in the renewal pipeline.

**Complex expansion (new product line):** Create a separate deal in an expansion pipeline. This keeps revenue tracking clean and avoids double-counting.

**Downgrade:** Update the renewal deal amount to reflect the lower value. Track contraction revenue with a "Revenue Change Reason" property.

**Churn:** Move to Closed Lost with a required churn reason. Feed this into your churn analysis.

How to [handle expansions and downgrades](/posts/hubspot-renewal-expansion-pipeline-structure) alongside renewals.

Clean deal ownership and Deal Type data here also determines whether commission calculations for the renewal are even possible: see [commission tracking tools compared](/posts/hubspot-commission-tracking-tools-compared) for how renewal and expansion commission depends on the pipeline data above being accurate.

For the commercial side, see how to [build renewal quotes and price increases](/posts/hubspot-renewal-quote-price-increase), and how to [co-term renewals onto a single date](/posts/hubspot-co-terming-renewals) when a customer has multiple contracts.

---

## Measuring Success: Dashboards and KPIs

HubSpot doesn't have a native NRR report. You have to build it yourself using custom properties and reports. For the metrics themselves (how to calculate renewal rate, NRR, GRR, and forecast churn), see our [guide to SaaS renewal metrics](/posts/renewal-metrics-explained).

### The Four Metrics That Matter

**Renewal Rate:** (Renewed deals ÷ Total deals up for renewal) × 100. Target: 90%+. [SaaS Capital's benchmark data](https://www.saas-capital.com/blog-posts/what-is-a-good-retention-rate-for-a-private-saas-company/) shows median NRR of 104% for private SaaS companies.

**Net Revenue Retention (NRR):** (Starting MRR + Expansion − Contraction − Churn) ÷ Starting MRR × 100. Target: 110%+ (meaning expansion outpaces churn). [A SaaS Capital survey of 1,500 companies found high-NRR startups grow twice as fast](https://www.saastr.com/saas-capital-survey-of-1500-saas-companies-high-nrr-high-growth/).

**Gross Revenue Retention (GRR):** (Starting MRR − Contraction − Churn) ÷ Starting MRR × 100. Target: 90%+.

**Churn Rate:** (Churned MRR ÷ Starting MRR) × 100. Target: <5% annual.

### Building Your Dashboards

Build three dashboards:

1. **Operational dashboard** (for CSMs): Deals by stage, days-to-renewal, at-risk accounts
2. **Revenue dashboard** (for leadership): NRR trend, renewal rate by quarter, churn by reason
3. **Forecast dashboard** (for finance): Predicted renewal revenue by month, pipeline velocity

Build your first [renewal dashboard with NRR tracking](/posts/hubspot-renewal-nrr-grr-dashboard-reporting).

Learn why your [renewal forecast is wrong](/posts/hubspot-renewal-forecasting-accuracy) and how to fix it.

Renewal deals aren't the only recurring-revenue asset worth tracking on a schedule. If your team also manages standalone service contracts (not just HubSpot deals), see our guide to [contract renewal reminder software](/posts/contract-renewal-reminder-software/) for the 90-60-30 reminder cadence applied outside the pipeline itself.

---

## Common Mistakes to Avoid

After building renewal pipelines for dozens of mid-market companies, these are the mistakes we see most often:

1. **Mixing deal types in one pipeline.** Your reports, forecasts, and automation all break.
2. **The infinite loop.** Year 1 creates Year 2, but Year 2 never creates Year 3 because of HubSpot's re-enrollment blocking.
3. **No churn reason taxonomy.** "Lost to competitor" tells you nothing. You need 10, 15 specific reasons.
4. **Treating silence as satisfaction.** A customer who isn't complaining isn't necessarily happy. They might just be quietly evaluating alternatives.
5. **Starting renewal conversations at 90 days.** For enterprise contracts, 90 days is too late. Start at 6 months.

Avoid the [12 most common mistakes](/posts/hubspot-renewal-pipeline-mistakes-costing-revenue) we see in renewal pipelines.

---

## What HubSpot Tier Do You Need?

| Capability | Free/Starter | Professional | Enterprise |
|-----------|-------------|-------------|-----------|
| Manual renewal pipeline | Yes | Yes | Yes |
| Workflow automation | No | Yes | Yes |
| Sequences (email cadence) | No | Yes | Yes |
| Calculated properties | No | Ops Hub Pro | Ops Hub Pro |
| Multiple pipelines | Yes (2) | Yes (15) | Yes (50) |
| Advanced permissions | No | No | Yes |
| Predictive scoring | No | No | Yes |
| Native health scores | No | Service Pro | Service Enterprise |

**Minimum for a functional renewal pipeline:** [Sales Hub Professional](https://www.hubspot.com/pricing/sales) + [Operations Hub Professional](https://www.hubspot.com/pricing/operations).

**Recommended:** [Sales Hub Enterprise](https://www.hubspot.com/pricing/sales) + [Service Hub Professional](https://www.hubspot.com/pricing/service) + [Operations Hub Professional](https://www.hubspot.com/pricing/operations).

---

## Glossary

| Term | Definition |
|------|-----------|
| **ARR** | Annual Recurring Revenue, the annualized value of all active contracts |
| **MRR** | Monthly Recurring Revenue. ARR ÷ 12 |
| **NRR** | [Net Revenue Retention](https://baremetrics.com/blog/what-is-net-revenue-retention), includes expansion, contraction, and churn |
| **GRR** | [Gross Revenue Retention](https://chartmogul.com/blog/gross-vs-net-retention/), excludes expansion (only contraction and churn) |
| **[Churn Rate](https://en.wikipedia.org/wiki/Churn_rate)** | Percentage of revenue or customers lost in a period |
| **Expansion Revenue** | Additional revenue from existing customers (upsells, cross-sells) |
| **Contraction Revenue** | Revenue lost from downgrades (customer stays but pays less) |
| **[Pipeline Velocity](https://blog.hubspot.com/sales/sales-velocity)** | How fast deals move through stages, measured in days |
| **Deal Type** | Custom property: New Business, Renewal, Expansion |
| **Renewal Date** | The date the current contract expires |
| **Days to Renewal** | Calculated field: Renewal Date minus today |
| **Health Score** | Composite metric of account health (usage, support, engagement) |
| **QBR** | Quarterly Business Review, structured account review meeting |

---

## Next Steps

Building a renewal pipeline isn't a weekend project. It requires alignment between Sales, Customer Success, and RevOps on ownership, process, and metrics.

But the payoff is real: predictable revenue, fewer missed renewals, and a team that knows exactly which accounts need attention and when.

The pipeline architecture above is the mechanics. For the surrounding strategy, how to make the renewal conversation itself go well, when to negotiate versus escalate, and what a healthy renewal rate actually looks like, see our [year-round SaaS renewal strategy guide](/posts/renewal-strategy-365/).

**Need help building this?** SWOTBee sets up renewal pipelines for mid-market teams in Energy, Manufacturing, SaaS, and more. We handle the pipeline architecture, workflow automation, dashboard setup, and team training, so your team can focus on actually renewing customers.

[Book a free 30-minute discovery call →](/contactus)
