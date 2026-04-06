---
layout: ../../layouts/BlogPostLayout.astro
title: "Sales Commission Tracking in HubSpot: The Complete Guide for Growing Teams (2026)"
pubDate: "2026-04-17"
description: "The definitive guide to tracking sales commissions in HubSpot: from DIY calculated properties to enterprise software. Everything mid-market teams need to stop losing money, time, and trust to broken commission processes."
category:
  title: "Revenue Operations"
  href: "/categories/revenue-operations"
modifiedDate: "2026-04-17"
author:
  name: "SWOTBee Team"
  url: "https://swotbee.com"
  imageUrl: "/assets/ico/logo.png"
  bio: "HubSpot-certified consultants helping mid-market teams fix revenue operations, commission tracking, and CRM automation."
  linkedin: "https://linkedin.com/company/swotbee"
  expertise:
    - "HubSpot CRM"
    - "Sales Commission"
    - "Revenue Operations"
image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop"
tags:
  - "HubSpot"
  - "Sales Commission"
  - "Commission Tracking"
  - "Revenue Operations"
  - "Sales Compensation"
  - "CRM"
---

# Sales Commission Tracking in HubSpot: The Complete Guide for Growing Teams (2026)

It is the night before payroll. You have a spreadsheet open with 47 tabs. Three reps have already Slacked you asking about their numbers. Finance wants the payout file by 9am. And somewhere in column AQ, a formula is referencing a deleted row.

You are not alone. This is the reality for most mid-market sales teams running between 10 and 100 reps. HubSpot tracks your deals beautifully, pipeline stages, deal amounts, close dates, owner attribution, custom properties for every nuance of your sales motion. But the moment a deal closes and someone asks "so what does this rep actually earn?", HubSpot goes quiet. There is no commission module. No payout tracker. No automated comp plan engine.

That gap, between where your deal data lives and where your commission data lives, is costing you more than you think. And the cost is not just measured in dollars. It is measured in time, trust, and the talent you lose because of it.

The numbers tell a sobering story. Research from the Sales Management Association shows that roughly 80% of companies admit to paying commissions incorrectly at some point. A study by the Incentive Research Foundation found that 42% of sales reps who leave cite a compensation dispute as a contributing factor. And companies relying on manual spreadsheet processes lose an estimated 3-5% of their total incentive compensation to overpayments, errors that slip through because nobody has the time or the tooling to catch them. For a team paying $1 million in annual commissions, that is $30,000 to $50,000 walking out the door every year. Silently.

This guide is for the VP Sales who is tired of fielding Slack messages about payout discrepancies. It is for the RevOps lead who spends two days every month reconciling a spreadsheet that was never designed for the job. It is for the Sales Ops manager who knows the current process is fragile but does not have a clear picture of the alternatives.

We will cover everything: why HubSpot does not track commissions natively and what that means for your operations, how to build your own tracking system inside HubSpot for free, when to upgrade to dedicated software, how to evaluate the tools on the market, what commission structures work best for mid-market teams, and how to design a system that scales with you instead of against you.

Whether you have 5 reps or 500, there is a section here for you. Let us get into it.

---

## Why HubSpot Does Not Track Commissions (And What That Means for You)

The first thing to understand is that HubSpot's absence of a native commission feature is not an oversight. It is a design choice. HubSpot is built to manage customer relationships, the journey from lead to opportunity to closed deal. It is exceptional at that job. But compensation math is an entirely different domain, one that involves payroll integration, tax implications, plan versioning, retroactive adjustments, and approval workflows that have nothing to do with how a contact moves through your pipeline.

This distinction matters because it shapes how you should think about the problem. You are not looking for HubSpot to "add" commission tracking. You are looking for the best way to bridge the gap between the system that knows what your reps sold and the system that calculates what they earn.

For small teams, say, under 10 reps with a flat commission rate, this gap barely registers. Someone closes a deal, you multiply the deal amount by 8%, and you write it down. A spreadsheet handles this with minimal friction.

But the gap becomes a chasm as you scale past 10 reps. And it widens further when your commission plan adds any complexity: tiers, accelerators, split credits, clawbacks on churned deals, different rates for new business versus renewals, SPIFFs for strategic products, or quarterly quota attainment bonuses.

The consequences fall into three categories:

**Wasted time.** The average mid-market company spends 6 weeks of cumulative effort per year processing commission payouts manually. That is six weeks of a skilled ops person's time spent on data entry, formula validation, and dispute resolution instead of pipeline optimization, forecasting, or strategic work.

**Wasted money.** That 3-5% overpayment rate we mentioned is not a rounding error. It compounds. And underpayments are just as costly, not in direct dollars, but in the trust deficit they create. Reps who believe they have been shorted spend time auditing their own numbers instead of selling. They become skeptical of leadership. They start interviewing.

**Wasted trust.** This is the hardest to measure and the most expensive to repair. When a rep flags a discrepancy and the response is "let me check the spreadsheet and get back to you in a few days," you have already lost. Speed and transparency in commission processing are directly correlated with rep retention and engagement.

The good news is that you have options. Three paths, in fact, each suited to a different team size and complexity level. And all of them start with the deal data you already have in HubSpot.

For a deeper dive into why spreadsheets specifically become dangerous as you scale, read [Why Your Commission Spreadsheet Is a Ticking Time Bomb](/posts/sales-commission-spreadsheet-problems).

---

## The Three Paths to Commission Tracking in HubSpot

Every team we work with falls into one of three categories. Here is how to figure out which path fits you, and what each one actually involves.

### Path 1: DIY with HubSpot Properties and Workflows (Free)

**Best for:** Teams under 20 reps with flat-rate or simple tiered plans.

This is the "build it yourself" approach, and it is more capable than most people realize. HubSpot's calculated properties, combined with workflows and custom reports, can handle straightforward commission tracking without any additional software.

Here is what you build:

- **A "Commission Rate" property** on the deal object, either as a fixed value or a dropdown that maps to your plan tiers.
- **A "Commission Earned" calculated property** that multiplies the deal amount by the commission rate.
- **A "Commission Status" dropdown** (Unpaid, Approved, Paid, Disputed) that tracks where each commission sits in the payout cycle.
- **Workflows** that automatically set the commission rate when a deal closes, notify finance when commissions are ready for approval, and update the status after payout.
- **A dashboard** with reports showing total commissions by rep, by period, by status, and by deal source.

Time to set up: 30 minutes for a flat-rate plan, up to 2 hours for a simple tiered structure.

The limitations are real, though. Calculated properties cannot handle quota-based accelerators (where the rate changes based on cumulative attainment). They struggle with split credits across multiple reps. They cannot trigger automated payouts. And they offer no built-in audit trail, if someone changes a deal amount after the commission was calculated, you might never know.

For a complete step-by-step walkthrough of the DIY approach, see [How to Set Up Commission Tracking in HubSpot Without Buying New Software](/posts/hubspot-commission-tracking-setup-guide).

### Path 2: HubSpot Commission Power-Up ($499 One-Time)

**Best for:** HubSpot-committed teams that want more than DIY but less than monthly software fees.

A growing category of solutions offers one-time-purchase tools that extend HubSpot's native functionality specifically for commissions. These typically install as HubSpot apps and configure directly within your portal.

What you get:

- Multiple commission models (flat, tiered, percentage of margin) configurable through a UI instead of calculated property formulas.
- In-app reporting that goes beyond what standard HubSpot dashboards offer.
- Rep-facing views so salespeople can see their own earnings without asking ops.
- Basic approval workflows.

Time to set up: 1-2 hours.

The value proposition here is straightforward: more capability than DIY, lower total cost than monthly software. The trade-off is that these tools typically lack the depth of dedicated platforms, no real-time sync with payroll, limited support for extremely complex plans, and smaller support teams behind the product.

### Path 3: Dedicated Commission Software ($15-$75/user/month)

**Best for:** Teams with 20+ reps, complex plans (tiers + splits + accelerators), or compliance/audit requirements.

This is the full-featured approach. Dedicated commission platforms like QuotaPath, CaptivateIQ, Everstage, and others are purpose-built for compensation management. They integrate with HubSpot (and other CRMs) and handle the entire commission lifecycle.

What you get:

- Real-time dashboards where reps see projected and earned commissions as deals progress.
- Automated calculations that handle any plan complexity, tiered rates, accelerators, decelerators, splits, clawbacks, SPIFFs, and overrides.
- Approval workflows with role-based access for finance, sales management, and ops.
- Audit trails that log every calculation, adjustment, and override.
- Payroll integrations that export payout files in the format your payroll system needs.

Time to set up: 1-8 weeks depending on platform complexity and plan intricacy.

For a detailed comparison of 10 platforms with pricing, features, and real user reviews, see [10 Commission Tracking Tools for HubSpot Compared](/posts/hubspot-commission-tracking-tools-compared).

### Decision Framework

Use this table to quickly identify your starting point:

| Your Situation | Recommended Path | Monthly Cost (20 reps) |
|---|---|---|
| Under 10 reps, flat rate | DIY (Path 1) | $0 |
| 10-20 reps, simple tiers | DIY or Power-Up (Path 1-2) | $0-$25/one-time |
| 20-50 reps, tiered + splits | Lightweight software (Path 3) | $300-$600/mo |
| 50+ reps, complex plans | Full platform (Path 3) | $800-$1,500/mo |

The most common mistake we see is teams staying on Path 1 too long. The spreadsheet or DIY setup that worked for 8 reps becomes a liability at 25. The cost of switching is always lower than the cost of a major commission error during a growth sprint.

---

## What "Good" Commission Tracking Actually Looks Like

Before you evaluate tools or design workflows, you need a clear picture of the end state. What does a well-functioning commission process look like, regardless of the tool that powers it?

We have worked with dozens of mid-market teams on this exact question, and the answer consistently comes down to five pillars.

### 1. Real-Time Visibility

Your reps should be able to see their commission earnings at any time without sending a Slack message, opening a support ticket, or waiting for a monthly PDF. This means a live view, either inside HubSpot or in a connected dashboard, that shows what they have earned to date, what is pending approval, what has been paid, and what they are projected to earn based on pipeline deals.

Real-time visibility is not a nice-to-have. It is the single biggest factor in rep confidence and motivation. When a rep can see their commission tick up after a deal closes, the psychological connection between effort and reward is immediate. When they have to wait two weeks for a spreadsheet, that connection dissolves.

### 2. Automated Calculations

No manual spreadsheet formulas. When a deal closes in HubSpot, the commission should calculate instantly based on the plan rules. If the plan has tiers, the system should know which tier the rep is in based on their cumulative attainment. If there are splits, the system should divide credit according to pre-defined rules. If there are clawbacks, the system should reverse the commission automatically when a deal churns within the clawback window.

The goal is zero manual math. Every manual step is an error vector.

### 3. Audit Trail

Every change must be logged. When a deal amount is modified after close, the commission recalculation should be recorded with a timestamp, the old value, the new value, and who made the change. When a manager overrides a commission amount, that override should be visible to finance.

This is not about distrust. It is about dispute resolution speed. When a rep flags a discrepancy and you can pull up the full history in 30 seconds, the dispute is resolved in minutes instead of days. That speed is what preserves trust.

### 4. Dispute Resolution Process

Even the best system will produce questions. The difference between a healthy commission process and a toxic one is not the absence of disputes, it is the presence of a clear, fast resolution path.

That path should look like this: rep flags the issue, ops reviews within a defined SLA (24-48 hours is standard), the resolution is documented, and the outcome is communicated back to the rep. If you are handling disputes via Slack threads and email chains with no tracking, disputes will fester and erode confidence in the entire system.

### 5. Payout Integration

Commission data should flow to payroll without manual re-entry. Whether that means an API integration, an automated CSV export, or a scheduled data push, the handoff between "commission approved" and "commission paid" should require minimal human intervention. Every manual re-entry step is another opportunity for transposition errors, missed entries, and delayed payments.

If your current system does not deliver all five pillars, you are paying a "commission tax", an invisible surcharge on every pay cycle, measured in hours, errors, and the slow erosion of your team's trust in the process.

For more on how commission errors specifically destroy team trust and what to do about it, read [Commission Disputes Are Quietly Destroying Your Sales Team's Trust](/posts/sales-commission-disputes-trust).

---

## Commission Structures That Work for Mid-Market Teams

Choosing the right commission structure is as important as choosing the right tool to track it. The wrong structure creates misaligned incentives, gaming behavior, or resentment. The right one turns your compensation plan into a strategic lever that drives the behaviors you need.

Here are the five structures we see most often in mid-market teams, along with when each one fits and how difficult each is to implement in HubSpot.

### Flat Rate

A flat-rate structure pays the same percentage on every deal, regardless of deal size, product type, or cumulative performance. If your rate is 8%, a rep earns $8,000 on a $100,000 deal and $800 on a $10,000 deal.

**Pros:** Dead simple to understand, trivially easy to calculate, and virtually eliminates disputes because there is nothing to interpret. Reps always know exactly what they will earn before a deal closes.

**Cons:** No incentive to overperform. A rep who closes $500K in a quarter earns the same rate as a rep who closes $200K. Top performers may feel undervalued, and average performers have no financial motivation to push harder.

**Best for:** Teams under 10 reps, simple sales motions with relatively uniform deal sizes, or organizations in the early stages of building a sales function where simplicity matters more than optimization.

**HubSpot implementation difficulty:** Very low. A single calculated property handles it.

### Tiered / Graduated

A tiered structure pays different rates at different revenue thresholds. For example: 5% on the first $100K in closed revenue, 7% on the next $100K, and 10% on everything above $200K. This creates a staircase effect where higher volume earns a higher rate.

**Pros:** Rewards volume and creates natural milestones that motivate reps to push past each threshold. The psychological pull of "I'm $5K away from the next tier" is powerful.

**Cons:** More complex to calculate, especially mid-period when a rep crosses a tier boundary on a single deal. Requires clear documentation of tier definitions and period resets.

**Best for:** Teams that want to incentivize growth without exposing themselves to unlimited upside risk. The tiered model lets you control the maximum rate while still rewarding overperformance.

**HubSpot implementation difficulty:** Moderate. Achievable with nested IF logic in calculated properties, but gets unwieldy beyond three tiers.

For a detailed walkthrough of designing and implementing tiered structures, read [Tiered Commission Structures That Actually Motivate Your Sales Team](/posts/tiered-commission-structures-sales-motivation).

### Accelerator / Decelerator

This structure ties the commission rate to quota attainment. Below quota, the rep earns a base rate (or a reduced rate via decelerators). At 100% of quota, they earn the standard rate. Above quota, accelerators kick in, often 1.5x to 3x the base rate, creating a powerful flywheel for overperformance.

**Pros:** The most powerful motivator for driving above-quota performance. The accelerator creates an exponential reward curve that makes every deal above quota disproportionately valuable. This is the structure that turns good quarters into exceptional ones.

**Cons:** Requires accurate, real-time quota tracking. Most complex to implement. Can create sandbagging behavior if reps hold deals to push them into the next period's accelerator window. Requires careful design to prevent gaming.

**Best for:** SaaS and B2B teams with defined quotas, established sales motions, and enough historical data to set quotas accurately. This is the structure most venture-backed companies gravitate toward because it directly ties compensation to the growth metrics investors care about.

**HubSpot implementation difficulty:** High. HubSpot's calculated properties cannot natively track cumulative quota attainment across a period and adjust rates accordingly. This is where most teams outgrow DIY and move to dedicated software.

For a complete guide to designing accelerator and decelerator models, see [Commission Accelerators and Decelerators: A Complete Guide](/posts/commission-accelerators-decelerators-guide).

### Split Commission

Split commission divides credit for a single deal among multiple contributors. The most common split is between an SDR who sourced the meeting and an AE who closed the deal, but splits can also include solutions engineers, customer success managers, overlay specialists, or managers.

**Pros:** Recognizes all contributors to a deal, which is critical for morale and retention in team-selling environments. Without splits, SDRs who generate pipeline but do not close deals feel invisible. Solutions engineers who spend weeks on technical evaluations get nothing. That breeds resentment.

**Cons:** Complex to track, especially when split percentages vary by deal type, team configuration, or deal stage at handoff. Requires clear attribution rules documented before disputes arise, not after.

**Best for:** Teams with SDR/AE handoffs, overlay specialists, partner-assisted deals, or any sales motion where more than one person contributes meaningfully to a closed deal.

**HubSpot implementation difficulty:** Moderate to high. HubSpot's deal object associates with a single owner by default. Tracking splits requires custom properties or association labels, and the commission calculation must reference multiple contacts.

### Multi-Tiered / Affiliate

A multi-tiered structure pays commissions not only on your own sales but also on sales generated by people you recruit or manage. This is common in partner programs, channel sales, and referral-driven growth models.

**Pros:** Turns top performers into talent magnets. Creates a passive income stream that rewards relationship-building and mentorship, not just individual closing ability. Can dramatically accelerate partner channel growth.

**Cons:** Requires very careful design to prevent margin leaks. If the tiers are too generous, the company pays more in commissions than the deal is worth. Also carries legal considerations in some jurisdictions where multi-level structures face regulatory scrutiny.

**Best for:** Partner programs, channel sales organizations, and referral-driven growth models. Less common in direct sales teams but powerful when applied correctly.

**HubSpot implementation difficulty:** High. Requires custom objects or external tracking to map the referral chain and calculate commissions at each level.

For a deep dive into multi-tiered structures, read [Multi-Tiered Affiliate Incentive Structures: A Complete Guide](/posts/multi-tiered-affiliate-incentive-structure-guide).

### Structure Comparison

| Structure | Complexity | HubSpot DIY Feasible? | Best Team Size | Motivational Impact |
|---|---|---|---|---|
| Flat Rate | Very Low | Yes | Under 10 reps | Low |
| Tiered / Graduated | Moderate | Yes (up to 3 tiers) | 10-50 reps | Moderate-High |
| Accelerator / Decelerator | High | No (need software) | 20+ reps | Very High |
| Split Commission | Moderate-High | Partially | Any size | Moderate |
| Multi-Tiered / Affiliate | High | No (need software) | Partner programs | High |

For detailed guidance on implementing splits, clawbacks, and accelerators, the messy middle of compensation design, read [The Messy Middle of Sales Comp: Splits, Clawbacks, and Accelerators](/posts/commission-splits-clawbacks-accelerators-guide).

---

## When to Stop Using Spreadsheets

Spreadsheets are where every commission process starts, and there is no shame in that. Google Sheets and Excel are flexible, free, and familiar. The problem is not that you started with a spreadsheet. The problem is that you stayed too long.

Here are the five warning signs that your spreadsheet has become a liability:

**1. You have more than 10 commissioned reps.** At this point, the number of rows, formulas, and cross-references in your spreadsheet has exceeded what a single person can reasonably validate each pay cycle. Errors become statistical certainties.

**2. Your plan has tiers, splits, or accelerators.** These features require conditional logic that compounds quickly. A three-tier plan with split credits across two reps on a single deal requires nested IF statements that reference multiple sheets. One misplaced parenthesis and the numbers are wrong, silently.

**3. You have had three or more commission disputes in the last quarter.** Disputes are a symptom. If reps are regularly questioning their payouts, the issue is not that your reps are difficult. It is that your system lacks the transparency and accuracy to earn their trust.

**4. You spend more than four hours per pay period on commission calculations.** This is the "boiling frog" metric. The hours creep up gradually, an extra 30 minutes here, an additional reconciliation step there, until suddenly your ops team is spending a full day every two weeks on commission math.

**5. The person who built the spreadsheet is no longer on the team.** This is the most dangerous signal of all. Spreadsheet-based commission systems are almost always built by a single person who understood the business logic and encoded it in formulas that nobody else can interpret. When that person leaves, the spreadsheet becomes a black box. You know it produces numbers. You are not confident those numbers are right.

### The Spreadsheet Tax Calculation

Here is a simple way to calculate what your "free" spreadsheet is actually costing you:

**(Hours per pay cycle x Hourly cost of the person doing the work x Number of pay cycles per year) + (Total commissions paid x Estimated error rate) = Your real cost**

For a team spending 8 hours per bi-weekly cycle at a $75/hour fully loaded cost with $2 million in annual commissions and a 3% error rate:

(8 x $75 x 26) + ($2,000,000 x 0.03) = $15,600 + $60,000 = **$75,600 per year**

That is the cost of your "free" tool.

For the full breakdown of spreadsheet risks and costs, read [Why Your Commission Spreadsheet Is a Ticking Time Bomb](/posts/sales-commission-spreadsheet-problems).

For a step-by-step migration plan from spreadsheets to a proper system, see [Commission Tracking for Growing Teams: When to Graduate from Spreadsheets](/posts/commission-tracking-growing-teams-graduation).

---

## What to Look for in Commission Tracking Software

If you have decided it is time to move beyond spreadsheets and DIY HubSpot setups, the market has no shortage of options. The challenge is knowing what matters for your specific situation and what is just marketing noise.

Here are the six must-haves for HubSpot users evaluating commission software.

### 1. Integration Depth

Not all HubSpot integrations are created equal. The spectrum runs from deep to shallow:

- **Field-level sync (best):** The tool reads individual deal properties, amount, close date, owner, custom fields, and uses them directly in commission calculations. Changes in HubSpot automatically recalculate commissions.
- **Object-level sync (good):** The tool pulls deal records but may not map to every custom property you need. Some manual configuration required.
- **CSV import (last resort):** You export data from HubSpot and upload it to the commission tool. This reintroduces the manual handoff you were trying to eliminate.

Ask the vendor: "If I change a deal amount in HubSpot after close, does the commission automatically recalculate?" If the answer involves a CSV, keep looking.

### 2. Sync Frequency

How often does data flow between HubSpot and the commission tool? Real-time sync means reps see updated earnings within minutes of a deal closing. Hourly sync is acceptable for most teams. Daily sync creates a lag that frustrates reps and delays dispute resolution.

For fast-moving teams with high deal velocity, real-time matters. For teams closing a handful of deals per week, hourly or even daily may be fine.

### 3. Plan Flexibility

Your commission plan will change. It always does. Maybe you add accelerators next quarter. Maybe you introduce a SPIFF for a new product launch. Maybe you restructure territories and need to handle mid-period plan transitions.

The tool you choose needs to handle not just your current plan but the plan you will have in 12 months. Ask the vendor to demo a plan change, how do you add a new tier? How do you handle a mid-quarter rate adjustment? How do you version plans so you can audit historical calculations against the plan that was active at the time?

### 4. Rep Dashboards

Can reps see their earnings live, or only when you send a PDF? Self-service dashboards are the single fastest way to reduce commission inquiries and build trust. The best dashboards show earned commissions, pending commissions, projected earnings based on pipeline, and historical payouts, all without requiring admin access or ops intervention.

### 5. Approval Workflows

Commission calculations should flow through an approval chain before hitting payroll. At minimum, you need: calculated, reviewed by ops, approved by finance, exported to payroll. Role-based access ensures the right people see the right data at the right stage.

### 6. Total Cost

Per-user pricing is just the start. Get the full picture:

- Per-user monthly fee
- Platform or base fee (some tools charge this on top of per-user pricing)
- Implementation/onboarding cost
- Ongoing support tier (is support included, or do you pay extra for priority access?)
- Contract length and cancellation terms

A tool that costs $25/user/month but requires a $10,000 implementation fee and a 24-month contract has a very different total cost than one at $35/user/month with free onboarding and month-to-month terms.

### Quick Recommendations by Segment

**Under 20 reps:** Look at Commissionly (starting around $15/user/month) or Sales Cookie (around $30/user/month). These are lightweight, affordable, and integrate with HubSpot without requiring a dedicated admin.

**20-100 reps:** QuotaPath (starting around $25/user/month) and ElevateHQ (contact for pricing) offer more depth, better plan modeling, stronger dashboards, and more robust approval workflows.

**100+ reps:** Everstage (approximately $41K/year) and CaptivateIQ (custom pricing) are built for enterprise-scale complexity. They handle global compensation plans, advanced analytics, and deep compliance requirements.

For a full side-by-side comparison of 10 tools with pricing, HubSpot integration depth, and real user reviews, read [The 2026 Buyer's Guide to Commission Tracking Tools for HubSpot](/posts/hubspot-commission-tracking-tools-compared).

---

## Building a Tiered Commission System in HubSpot

For teams choosing the DIY path, a tiered commission structure is the most popular setup, and the most requested walkthrough we get. Here is the quick-start overview.

### Step 1: Create the Commission Properties

On the deal object, create the following custom properties:

- **Commission Rate (%)**. A number property. This will hold the applicable rate for each deal.
- **Commission Earned ($)**. A calculated property. The formula multiplies the deal amount by the commission rate.
- **Commission Status**. A dropdown with four options: Unpaid, Approved, Paid, Disputed.
- **Commission Period**. A text property (e.g. "2026-Q2") that tags each commission to a payout period for reporting.

### Step 2: Build the Tier Logic

For a three-tier structure, 5% on deals under $50K, 4% on deals between $50K and $150K, and 3% on deals above $150K, the calculated property formula uses nested IF logic:

```
if(deal_amount < 50000, deal_amount * 0.05,
  if(deal_amount < 150000, deal_amount * 0.04,
    deal_amount * 0.03))
```

This calculates the commission based on the total deal amount falling into a tier. If you need marginal tiers (where different portions of the deal are taxed at different rates, similar to income tax brackets), the formula becomes more complex and you may want to consider Path 2 or Path 3.

### Step 3: Automate with Workflows

Create a workflow triggered when a deal moves to "Closed Won":

- Set the Commission Status to "Unpaid."
- Send a notification to the finance team or ops lead.
- Optionally, set the Commission Period based on the close date.

Create a second workflow triggered when Commission Status changes to "Approved":

- Send a notification to the deal owner confirming the approved amount.
- Log the approval in a deal note for audit purposes.

### Step 4: Build the Dashboard

Create a commission dashboard with these reports:

1. **Total Commissions by Rep**. Bar chart, filtered by the current period.
2. **Commission Status Breakdown**. Pie chart showing the distribution of Unpaid, Approved, Paid, and Disputed commissions.
3. **Commission Trend**. Line chart showing total commissions paid per period over the last 12 months.
4. **Disputed Commissions**. Table listing all deals with a "Disputed" status, including deal owner, amount, and commission earned.
5. **Top Earners**. Leaderboard showing the top 10 reps by commission earned in the current period.

This setup takes 1-2 hours and covers the basics for a team with a simple tiered plan. It will not handle quota-based accelerators, automated payroll export, or complex splits, but it will get you off the spreadsheet and into a system with visibility, accountability, and a clear audit path.

For the full step-by-step guide with screenshots and advanced configurations, read [Building a Tiered Commission Model Inside HubSpot](/posts/hubspot-tiered-commission-model-setup).

---

## How SWOTBee Helps

We have set up commission tracking systems for dozens of mid-market teams running on HubSpot. What we have learned is that the tool is never the hard part. The hard part is understanding the business logic, the edge cases, the exceptions, the "but what about when a deal gets split between two reps and then the customer churns in month three?" scenarios that no software handles out of the box.

Our approach starts with your workflow, not the technology. We sit with your ops team, your finance team, and your sales leadership to map out exactly how commissions are calculated today, where the pain points are, and what the ideal state looks like. Only then do we recommend a path.

We do not push tools. If DIY HubSpot properties are the right answer for your team today, we will set them up and document them so anyone on your team can maintain them. If you need dedicated software, we will help you evaluate vendors, run the implementation, and configure the integration with your HubSpot portal. If you are somewhere in between, we will tell you that too.

Our services include:

- **Commission system design**. We help you define or refine your compensation plan structure, including tiers, accelerators, splits, clawbacks, and SPIFFs.
- **HubSpot property and workflow setup**. We build the calculated properties, workflows, and dashboards for DIY commission tracking inside your portal.
- **Software evaluation and implementation**. We evaluate third-party commission tools against your requirements, negotiate contracts, and manage the implementation.
- **Ongoing optimization**. Commission plans change. We provide quarterly reviews to ensure your tracking system evolves with your business.

**Ready to fix your commission tracking?** [Book a free consultation](/contactus), we will audit your current setup, identify the gaps, and recommend next steps. No pitch, no pressure. Just a clear-eyed assessment of where you are and what it would take to get where you need to be.

---

## Moving Forward

Commission tracking is not glamorous work. Nobody puts "fixed our commission spreadsheet" on a conference slide. It does not make the highlight reel at the annual sales kickoff. But the companies that get this right, the ones where reps trust their paychecks, finance closes the books in days instead of weeks, and leadership has real-time visibility into compensation costs as a percentage of revenue, those companies keep their best people and scale predictably.

The pattern we see repeatedly is this: teams that invest in commission infrastructure early grow faster and retain better than teams that treat it as an afterthought. The rep who trusts the system sells with confidence. The ops team that automates the process focuses on strategy instead of spreadsheets. The finance team that has clean data closes the books faster.

You do not need to fix everything at once. Start with Path 1 if you are small. Build the basic properties and workflows. Get your reps used to seeing their commissions in HubSpot instead of asking you for a number. Then evaluate Path 2 or Path 3 when the complexity outgrows what DIY can handle.

But do not wait for the spreadsheet to break at the worst possible moment. That moment is always a Friday afternoon before a holiday weekend, and the person who built the spreadsheet always left the company two months ago.

Start today. Your reps, your ops team, and your finance department will thank you.
