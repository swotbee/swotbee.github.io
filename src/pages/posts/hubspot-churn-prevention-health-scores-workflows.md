---
layout: ../../layouts/BlogPostLayout.astro
title: "Building a Churn Prevention Workflow in HubSpot: Health Scores, Alerts & Playbooks"
pubDate: "2026-04-02"
modifiedDate: "2026-06-23"
description: "From health score setup to at-risk alert workflows, churn reason taxonomies, and win-back sequences. A practical guide to preventing churn before the renewal conversation starts."
category:
  title: "Revenue Operations"
  href: "/categories/revenue-operations"
author:
  name: "SWOTBee Team"
  url: "https://swotbee.com"
  imageUrl: "/assets/ico/logo.png"
image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=450&fit=crop"
tags:
  - "HubSpot"
  - "Churn Prevention"
  - "Health Scores"
  - "Customer Success"
  - "Renewal Pipeline"
  - "Revenue Operations"
seriesName: "HubSpot Renewal Pipeline"
pillarUrl: "/posts/hubspot-renewal-pipeline-complete-guide"
---

By the time a CSM opens a renewal deal and sees that the customer is unhappy, it's usually too late. The decision to leave was made months ago: after a bad support experience, after the champion left, after product usage dropped to zero.

Churn prevention isn't a renewal-stage activity. It's a continuous process that starts the day after onboarding and feeds into your renewal pipeline through health signals, automated alerts, and structured playbooks.

This article shows you how to build that system in HubSpot.

> This article is part of our [Complete Guide to Building a Renewal Pipeline in HubSpot](/posts/hubspot-renewal-pipeline-complete-guide).

---

## Building a Customer Health Score in HubSpot


The foundation of churn prevention is a customer health score in HubSpot: a single number that summarizes the health of each account. To build a customer health score, decide your score criteria and the customer data that feeds it, then store the result on the company record so the whole team shares one view of customer health.

Typical inputs and where they live:

- **Product usage and customer engagement** (logins, feature adoption), often synced from your product or HubSpot's Service Hub.
- **Support signals** (ticket volume and severity) from Service Hub.
- **Relationship signals** (executive engagement, champion changes) tracked on company properties.
- **Customer outcomes** (are they hitting their goals).

Combine these into a weighted health score using a workflow, then map the number to a health status (for example, Healthy, Neutral, At Risk). As the underlying data changes, the workflow updates the score, so score changes surface automatically. Report the health status across customer segments so you can see which segments are at risk, and copy the score onto the renewal deal. For the renewal-pipeline application of this score, see [renewal risk scoring](/posts/hubspot-renewal-risk-scoring); for the behavioral angle, see [detecting silent churn](/posts/silent-churn-detection); and for how it fits the wider metrics picture, our [SaaS renewal metrics guide](/posts/renewal-metrics-explained).

---

## Why Renewals Fail Before the Renewal Conversation

The "silence = satisfaction" myth is the most dangerous assumption in customer success. [Research by Bain & Company](https://hbr.org/2014/10/the-value-of-keeping-the-right-customers) shows acquiring new customers costs 5 to 25x more than retaining existing ones, yet most teams invest far more in acquisition than retention. A customer who isn't complaining is not necessarily a customer who plans to renew.

[Churn](https://en.wikipedia.org/wiki/Churn_rate) signals typically appear 3 to 6 months before the contract ends:
- Product usage declines
- Key contacts stop engaging with emails and meeting invitations
- Support tickets increase, or stop entirely (disengagement)
- The champion who bought your product leaves the company
- QBR attendance drops or QBRs get canceled

The research suggests 10-20% churn reduction is achievable with proactive automation that catches these signals early.

---

## Health Score Option 1: HubSpot's Native CS Workspace

If you have **[Service Hub Professional or Enterprise](https://www.hubspot.com/pricing/service)**, HubSpot offers built-in health scoring through the [Customer Success Workspace](https://knowledge.hubspot.com/customer-success/set-up-and-manage-the-customer-success-workspace). [HubSpot Academy's lesson on account health checks](https://academy.hubspot.com/lessons/customer-success-and-account-health-checks) covers the fundamentals. For a deeper framework on building health scores, [ChurnZero's Customer Health Score Handbook](https://churnzero.com/guides/the-customer-health-score-handbook/) is an excellent resource.

### What You Get

- **Professional:** 1 active health score, up to 5 drafts
- **Enterprise:** Up to 10 active health scores, 20 drafts

### How to Configure

1. Go to **Service → Customer Success → Workspace Settings → Health Scores**
2. Create score groups with weighted categories

**Example Configuration:**

| Category | Weight | Signals |
|----------|--------|---------|
| Engagement | 40% | Email opens, meeting attendance, portal logins |
| Product Usage | 30% | Key feature adoption, login frequency, active users |
| Support Health | 30% | Open ticket count, CSAT score, response satisfaction |

Each signal gets a point value. The weighted total produces a color-coded health indicator: Green (Healthy), Yellow (Passive), Red (At Risk).

### Pros
- Native integration with no custom properties needed
- Visual health indicators on company records
- Can trigger workflows based on health changes

### Cons
- Requires [Service Hub Professional](https://www.hubspot.com/pricing/service) ($450+/month)
- Limited to signals HubSpot can access natively (product usage data often requires integration with tools like [Totango](https://www.totango.com/integrations/hubspot-customer-success))
- Configuration options are less flexible than custom approaches

Set up the [health score properties](/posts/hubspot-renewal-pipeline-properties) before building workflows.

---

## Health Score Option 2: Custom Property Approach (Any Tier)

If you don't have [Service Hub Professional](https://www.hubspot.com/pricing/service), build a simpler version using custom properties and workflows.

### Setup

**Create a Company property:** "Account Health" (Dropdown: `Healthy` | `Passive` | `At Risk`)

### Automated Health Signals

Build workflows that update Account Health based on available data:

**Set to "At Risk" when:**
- 3+ open support tickets AND any are high priority
- No email opens in the last 60 days from any contact at the company
- No meetings logged in the last 90 days
- Primary contact's email bounces (champion may have left)
- NPS or CSAT score below 6

**Set to "Passive" when:**
- 1-2 open support tickets
- Email engagement declining (opened fewer than 25% of last 10 emails)
- No meetings in the last 60 days
- No response to last QBR invitation

**Set to "Healthy" when:**
- No open support tickets (or all are low priority)
- Active email engagement
- Meeting logged in last 45 days
- NPS/CSAT above 8

### When This Is Enough

For teams with under 200 accounts and limited product usage data, a 3-tier health dropdown driven by CRM signals (email, meetings, tickets) is surprisingly effective. [Gainsight's Customer Success Maturity Model](https://www.gainsight.com/maturity-model/) outlines four stages of CS maturity; most teams start at "Reactive" and evolve from there. You don't need a fancy scoring algorithm. You need visibility into which accounts need attention.

Health signals determine [which pipeline stage](/posts/hubspot-renewal-pipeline-stages) a deal belongs in, especially for activity-based and journey-based models.

---

## Building the At-Risk Alert Workflow

This workflow fires when an account's health deteriorates.

### Trigger

**Object:** Company-based workflow
**Enrollment:** "Account Health" property changes to "At Risk"

### Actions

**Step 1: Immediate notification**
- Send internal email to the company owner (CSM/AM)
- Include: Company name, current contract value, renewal date, days to renewal, recent support tickets

**Step 2: Slack notification** (if using the [HubSpot-Slack integration](https://ecosystem.hubspot.com/marketplace/apps/productivity/internal-tools/slack))
- Post to #customer-health or the CSM's channel
- Include a link to the company record

**Step 3: Create a task**
- Assigned to company owner
- "Review at-risk account: [Company Name], within 24 hours"
- Due: tomorrow

**Step 4: Check renewal proximity**
- **If renewal within 90 days:** Create an escalation task for CS manager: "At-risk account approaching renewal, [Company Name]"
- **If renewal 90+ days out:** Standard CSM task (no escalation yet)

**Step 5: Enroll primary contact in a "Save" sequence** (optional)
- Personalized email from the CSM
- Focus: "We noticed [signal]. We'd love to schedule a call to make sure you're getting full value."
- Not a marketing email, a genuine 1:1 outreach

**Step 6: Weekly digest** (separate workflow)
- Every Monday, send CS leadership a summary of all companies currently at "At Risk"
- Include: company name, account value, days to renewal, days at "At Risk"

This connects to the [90-60-30 cadence](/posts/hubspot-renewal-deal-workflow-automation) in your renewal automation.

---

## Building a Churn Reason Taxonomy

When a customer churns despite your best efforts, you need to capture *why* in a structured way that enables analysis.

"Lost to competitor" tells you almost nothing. A proper taxonomy tells you what to fix.

### Recommended Churn Reasons (Dropdown Values)

| Value | When to Use |
|-------|-------------|
| Budget / Cost | Customer cited price as the primary factor |
| Competitor (add name in text field) | Switching to a named competitor |
| Product Fit | Our solution doesn't solve their problem well enough |
| No Longer Needed | Business model or need changed |
| Acquisition / Merger | Company was acquired; new parent has different tools |
| Champion Left | The internal advocate who bought us left the company |
| Support Issues | Unresolved support problems drove the decision |
| Implementation Failed | Never successfully deployed or adopted |
| Never Fully Adopted | Deployed but usage was always low |
| Involuntary (Payment Failure) | Failed payment, dunning exhausted. [Recurly's research](https://recurly.com/blog/what-is-involuntary-churn-what-you-can-do-about-it/) shows this can account for up to 6% of churn |
| No Response (Auto-Churn) | Contract lapsed with no engagement from the customer |
| Other | Doesn't fit above categories (explain in details field) |

### Making It Actionable

- **Require Churn Reason** when a deal moves to Closed Lost (configure in pipeline stage settings)
- Add a companion text field: "Churn Details" for freeform context
- **Quarterly analysis:** Pull a report of all churned deals, grouped by Churn Reason. If "Champion Left" accounts for 30% of your churn, your retention strategy needs to address multi-threading (building relationships with multiple contacts at each account).

Build [churn analysis dashboards](/posts/hubspot-renewal-nrr-grr-dashboard-reporting) that slice this data by reason, segment, and time period.

---

## Proactive Signals Beyond Health Scores

Health scores catch problems, but proactive monitoring prevents them.

### Signal 1: Open Support Tickets During Renewal Window

If a customer has open support tickets AND their renewal is within 90 days, pause the standard renewal outreach. Sending a renewal proposal while they're frustrated with a support issue is tone-deaf and accelerates churn.

**Workflow:** If Renewal Date is within 90 days AND Open Ticket Count > 0 → create task for CSM: "Resolve open tickets before renewal outreach, [Company Name]"

### Signal 2: Champion / Contact Changes

When a primary contact's email starts bouncing or they're marked as "No longer at company," that's a red flag. The person who bought your product is gone, and their replacement may not see the value.

**Workflow:** If primary contact's email status changes to "Bounced" → Alert CSM → Create task: "Identify new champion at [Company Name]"

### Signal 3: Product Usage Decline

If you can integrate product usage data into HubSpot (via API, [Segment](https://segment.com/), or a product analytics tool), watch for usage decline trends:
- Monthly Active Users drops 50%+ from 3-month average
- Key feature adoption drops significantly
- Login frequency drops to zero

### Signal 4: QBR Coverage

Track whether each account has had a QBR in the last quarter. Low QBR coverage correlates directly with higher churn; it's one of the strongest leading indicators. [Vitally's SaaS churn benchmarks](https://www.vitally.io/post/saas-churn-benchmarks) show that SMBs churn at 3-5% monthly vs. enterprise at 1-2%, and QBR coverage is one of the biggest differentiators.

**Workflow:** If "Last QBR Date" is more than 120 days ago AND Account Health is not "At Risk" → Create task: "Schedule QBR with [Company Name]"

---

## The Win-Back Sequence

Not every churn is permanent. Some customers leave because of a temporary budget constraint, a leadership change, or a competitor that over-promised.

### Setup

**Create a property:** "Win-Back Potential" (Dropdown: `High` | `Medium` | `Low` | `None`)

Set this when a deal closes as Lost:
- **High:** Customer liked the product but left for budget/cost/champion reasons
- **Medium:** Fixable product fit issues, or competitor may disappoint
- **Low:** Fundamental mismatch (wrong industry, wrong product)
- **None:** Acquisition, company closed, or hostile departure

### Win-Back Cadence

**Trigger:** Deal Stage changes to Closed Lost AND Win-Back Potential is "High" or "Medium"

1. **Day 30 post-churn:** Personalized email from CSM: "We hope [competitor] is working out. If not, we'd love to chat."
2. **Day 60 post-churn:** Value reminder. Share a case study or product update relevant to their use case
3. **Day 90 post-churn:** Direct offer: "We've made [improvements] since you left. Would a 15-minute call make sense?"

**Track:** Win-back conversion rate. Even a 5-10% win-back rate represents meaningful revenue recovery.

---

## Connecting Health to the Renewal Pipeline

Health scores aren't useful if they exist in isolation. They need to influence what happens in your renewal pipeline.

**At-Risk + 90 days to renewal:** Move the deal to a special "At Risk: Renewal" stage. This triggers a different playbook than the standard renewal cadence.

**Passive + 180 days to renewal:** Flag for proactive QBR. You have time to fix the relationship before the renewal window opens.

**Healthy + 60 days to renewal:** Standard process. Send renewal proposal with confidence.

Set up the [health score properties](/posts/hubspot-renewal-pipeline-properties) before building these workflows.

---

**SWOTBee builds churn prevention systems for mid-market teams in Energy, Utilities, Manufacturing, and SaaS, including health scoring, alert workflows, churn analysis dashboards, and renewal automation.**

[Book a free 30-minute discovery call →](/contactus)
