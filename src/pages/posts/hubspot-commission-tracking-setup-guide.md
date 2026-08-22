---
layout: ../../layouts/BlogPostLayout.astro
title: "How to Set Up Commission Tracking in HubSpot Without Buying New Software"
pubDate: "2026-04-14"
noindex: true
description: "You don't need expensive commission software to start tracking commissions in HubSpot. Here are three progressively powerful approaches: from a 10-minute setup to a full commission system."
category:
  title: "HubSpot Tips"
  href: "/categories/hubspot-tips/"
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
image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop"
tags:
  - "HubSpot"
  - "Commission Tracking"
  - "Calculated Properties"
  - "Workflows"
  - "Sales Operations"
  - "CRM"
seriesName: "Sales Commission Tracking"
pillarUrl: "/posts/hubspot-sales-commission-tracking-complete-guide/"
howto: true
howtoSteps:
  - name: "Navigate to Deal Properties"
    text: "Go to Settings, then Properties, and select Deal properties from the object dropdown."
  - name: "Create a calculated property"
    text: "Click Create property, name it Commission Earned, and set the field type to Calculation with Equation as the calculation type."
  - name: "Write the formula"
    text: "Multiply deal_amount by your commission rate, for example deal_amount * 0.10 for a 10 percent flat rate."
  - name: "Verify it works"
    text: "Open a few closed deals that already have an amount populated and confirm the Commission Earned value calculates correctly."
---

# How to Set Up Commission Tracking in HubSpot Without Buying New Software

Here is something HubSpot will not tell you on their pricing page: there is no native commission tracking feature. Not in Starter. Not in Professional. Not even in Enterprise. You can dig through every settings menu, every property category, every workflow template, and you will not find a "Commission" tab anywhere.

But that does not mean you cannot build one.

With calculated properties, a workflow or two, and about an hour of setup time, you can have a working commission tracking system living right inside HubSpot. No new software to evaluate. No monthly fees stacking on top of your existing HubSpot subscription. No fragile integrations that break when someone changes an API. No spreadsheets getting emailed around on the 15th of every month.

We have built these systems for dozens of mid-market sales teams, and the pattern is always the same. Someone on the ops team spends weeks researching commission tools like CaptivateIQ or Spiff, gets sticker shock at the per-rep pricing, and then asks: "Can we just do this in HubSpot?"

The answer is yes. Not perfectly. Not for every scenario. But for a surprisingly large number of teams, HubSpot's existing features are more than enough.

This guide walks you through three approaches, ordered from dead-simple to surprisingly powerful. Pick the one that matches where your team is right now, and know that you can always graduate to the next level when your needs grow.

---

## Before You Start: What You Actually Need

Before you touch a single setting in HubSpot, you need four things sorted out. Skipping this step is the number one reason these projects stall. People jump into HubSpot, start creating properties, realize halfway through that they do not actually know how their commission plan works, and then the whole thing sits unfinished for months.

**First, write down your commission plan.** Not the version in your head. The version on paper. What is the rate? Is it the same for every rep, or does it change based on deal size, product line, or tenure? Are there tiers that kick in at certain thresholds? If you cannot explain your commission plan in two paragraphs, simplify it before you build it in HubSpot.

**Second, make sure your deal pipeline is set up properly.** You need a clearly defined "Closed Won" stage. This sounds obvious, but we have seen pipelines where deals get marked as won in three different stages depending on who is entering the data. Pick one stage. Make it the official "this deal is done" stage. Everything downstream depends on this.

**Third, confirm that Deal Amount is populated on your deals.** Open ten recent closed deals and check. If half of them have blank amounts, you have a data quality problem that will make your commission numbers meaningless. Fix that first.

**Fourth, answer this question honestly: Is your commission plan flat-rate, tiered, or split between reps?** Your answer determines which approach you need:

- **Flat rate** (every rep earns the same percentage on every deal) -- go to Approach 1. You will be done in 10 minutes.
- **Tiered** (the rate changes based on deal size or cumulative attainment) -- go to Approach 2. Budget 30 minutes.
- **Split** (one person sets the meeting, another closes the deal, both earn commission) -- go to Approach 3. Set aside 1-2 hours.

If your plan combines elements of all three, start with Approach 2 and layer in the split logic from Approach 3 afterward.

---

## Approach 1: Flat-Rate Commission in 10 Minutes

This is the simplest version and it works remarkably well for teams with a straightforward commission plan. If every rep earns the same percentage on every deal, this is all you need.

### What you are building

A single calculated property that multiplies the Deal Amount by your commission rate. Once created, it shows up on every deal record automatically. No workflows. No maintenance. It just works.

### Step 1: Navigate to Deal Properties

Go to **Settings** (the gear icon in the top navigation), then click **Properties** in the left sidebar. Make sure you are looking at **Deal Properties** by selecting "Deal properties" from the object dropdown at the top.

### Step 2: Create a new property

Click **Create property**. Name it **Commission Earned**. For the group, choose "Deal information" (or create a custom group called "Commission" if you want to keep things organized). Set the **Field type** to **Calculation**. This is the important part. You want a calculated property, not a regular number field.

### Step 3: Write the formula

When you select the Calculation field type, HubSpot will give you a formula builder. Choose **Equation** as the calculation type. Your formula is simple:

```
deal_amount * 0.10
```

Replace `0.10` with your actual commission rate. If your team earns 8%, use `0.08`. If they earn 12%, use `0.12`. Click **Create** and you are done.

### Step 4: Verify it works

Open any closed deal that has an amount on it. Scroll to your new "Commission Earned" property. The commission value should already be calculated. Open a few more deals to confirm. If the value is blank, double-check that those deals have a Deal Amount populated.

### What this gives you

Every single deal in your CRM now has a commission amount attached to it. You can build reports filtered by deal owner to see each rep's earnings. You can add it to dashboards. You can filter deals by commission amount in lists. It updates automatically whenever the Deal Amount changes.

### What this does not give you

Tiered rates. Split tracking between setters and closers. Payout status tracking. Real-time dashboards that reps can check themselves. If you need any of those, keep reading.

### Who this is for

Teams with fewer than 10 reps, a single flat commission rate, and a plan that does not change based on deal size or role.

---

## Approach 2: Tiered Commission in 30 Minutes

Most commission plans are not flat. They have tiers. Maybe reps earn 5% on deals under $15,000, 4% on the portion between $15,000 and $50,000, and 3% on anything above $50,000. This is where calculated properties with conditional logic come in.

### What you are building

A calculated property with nested IF statements that applies different rates based on deal size. It sounds complicated, but the formula editor in HubSpot handles this cleanly once you understand the pattern.

### Step 1: Define your tiers on paper

Before you open HubSpot, write out your tiers clearly. Here is the example we will use:

| Deal Amount | Commission Rate |
|---|---|
| $0 -- $15,000 | 5% |
| $15,001 -- $50,000 | 4% |
| $50,001+ | 3% |

Important: these are marginal tiers, not flat tiers. A $60,000 deal does not earn 3% on the full amount. It earns 5% on the first $15,000, 4% on the next $35,000, and 3% on the remaining $10,000. This is how most real commission plans work, and getting this wrong is the most common mistake we see.

### Step 2: Create the calculated property

Follow the same steps as Approach 1 to create a new Deal property called **Commission Earned** with the Calculation field type and Equation calculation type. This time, your formula uses nested IF statements:

```
IF(deal_amount <= 15000,
  deal_amount * 0.05,
  IF(deal_amount <= 50000,
    (15000 * 0.05) + ((deal_amount - 15000) * 0.04),
    (15000 * 0.05) + (35000 * 0.04) + ((deal_amount - 50000) * 0.03)
  )
)
```

Read this from top to bottom. If the deal is $15,000 or less, multiply the whole thing by 5%. If the deal is between $15,001 and $50,000, take 5% on the first $15,000 and 4% on the rest. If the deal is over $50,000, calculate all three tiers separately and add them up.

### Step 3: Walk through the math

Let us verify this with a real example. Say you have a $60,000 deal:

- **Tier 1:** $15,000 at 5% = **$750**
- **Tier 2:** $35,000 at 4% (that is $50,000 minus $15,000) = **$1,400**
- **Tier 3:** $10,000 at 3% (that is $60,000 minus $50,000) = **$300**
- **Total Commission:** $750 + $1,400 + $300 = **$2,450**

Open a deal worth $60,000 in your CRM and confirm the calculated property shows $2,450. If it does, your formula is correct.

### Step 4: Set up recalculation via workflow

Calculated properties update when deal data changes, but to make absolutely sure your commission values stay current, create a workflow as a safety net. Go to **Automation > Workflows**, create a new **Deal-based workflow**, and set the enrollment trigger to "Deal Amount is known." Turn on **re-enrollment** so the workflow fires every time the deal amount changes. The workflow action itself can be as simple as a delay of one minute followed by a "Copy property value" action that copies Commission Earned to itself. This forces a recalculation.

### Bonus: Add a Commission Tier property

Create a **dropdown select** property called **Commission Tier** with three options: Tier 1, Tier 2, and Tier 3. In the same workflow, add branching logic:

- If Deal Amount is less than or equal to $15,000, set Commission Tier to "Tier 1"
- If Deal Amount is less than or equal to $50,000, set Commission Tier to "Tier 2"
- Otherwise, set Commission Tier to "Tier 3"

Now you can build reports grouped by Commission Tier. This is surprisingly useful for forecasting. You start to see patterns like "80% of our deals fall in Tier 1" which tells you a lot about whether your commission plan is actually motivating the right behavior.

### What this gives you

Automatic tiered commission calculation on every deal. Dashboard-ready data. Real-time updates when deal amounts change. Tier-level reporting for commission plan analysis.

### What this does not give you

Quota-based tiers where the rate depends on cumulative attainment over a period. Split credits between multiple reps. Payout management and approval workflows.

### Who this is for

Teams with 5-20 reps and a deal-level tiered commission plan where the rate depends on the size of the individual deal.

---

## Approach 3: Setter/Closer Split Commission (1-2 Hours)

If your team has SDRs setting meetings and AEs closing deals, you need to track who sourced the opportunity and who converted it. Both parties typically earn a portion of the commission, and both need visibility into what they have earned. This requires a bit more infrastructure, but the result is a clean split-tracking system.

### What you are building

A system that captures who set the meeting and who closed the deal, then calculates and assigns the correct commission amount to each person. Two separate commission values, two separate reports, one dashboard that shows both.

### Step 1: Create the attribution properties

You need two custom **Deal properties** to track the split:

- **Lead Source Rep** (single-line text or HubSpot User field) -- this captures the SDR or BDR who originally sourced the opportunity.
- **Closing Rep** -- this will usually match the Deal Owner, but having it as a separate property gives you flexibility when deals get reassigned.

Go to Settings, then Properties, then Deal Properties, and create both of these. If your HubSpot plan supports the "HubSpot User" field type, use that. It makes reporting cleaner because it links to actual user records. If not, single-line text works fine.

### Step 2: Automatically capture the setter

Create a **Contact-based workflow** that triggers when a contact's Lifecycle Stage changes to "Sales Qualified Lead" (SQL) for the first time. The workflow action should **copy the Contact Owner** value into a custom contact property called **Original Source Rep**.

Why a contact property? Because the setter is associated with the lead before a deal even exists. You capture it at the contact level, then pull it forward to the deal level in the next step.

### Step 3: Copy attribution to the deal and calculate the split

Create a **Deal-based workflow** that triggers when Deal Stage equals "Closed Won." This workflow does three things:

**Action 1:** Copy the associated contact's **Original Source Rep** value into the deal's **Lead Source Rep** property. This connects the setter to the closed deal.

**Action 2:** Copy the **Deal Owner** into the **Closing Rep** property. This locks in who actually closed the deal, even if ownership changes later.

**Action 3:** Set the commission amounts. Create two calculated deal properties beforehand:

- **Setter Commission** -- formula: `deal_amount * 0.02`
- **Closer Commission** -- formula: `deal_amount * 0.08`

In this example, total commission is 10% of deal value, split 20/80 between setter and closer. The setter earns 2% and the closer earns 8%. Adjust these percentages to match your actual split ratios.

### Step 4: Build the split commission dashboard

Create two reports:

- **Commission by Setter:** A bar chart showing total Setter Commission, grouped by Lead Source Rep, filtered by close date in the current quarter.
- **Commission by Closer:** A bar chart showing total Closer Commission, grouped by Closing Rep, filtered by the same date range.

Add both to a single dashboard. Now your SDR manager can see what the SDR team has earned, your AE manager can see the AE numbers, and leadership can see the full picture.

### What this gives you

Clear attribution of who sourced and who closed every deal. Separate commission calculations for each role. Reportable, dashboardable data that updates automatically when deals close.

### What this does not give you

Overlay splits where a third party (like a solutions engineer or channel partner) also earns a cut. Team-based splits. Automated payout management or integration with payroll.

### Who this is for

Teams with a formal SDR-to-AE handoff process where both parties earn commission and need visibility into their numbers.

---

## Bonus: Adding Commission Status Tracking

No matter which approach you chose above, you probably need a way to track whether commissions have actually been paid. A calculated property tells you what someone earned. A status property tells you whether they have received it yet.

### Set up the payout pipeline

Create a new **Deal property** called **Commission Status** with the field type **Dropdown select**. Add three options:

- **Unpaid** -- commission has been calculated but not yet reviewed
- **Approved** -- finance has reviewed and approved the payout
- **Paid** -- the money has been disbursed

Next, create a simple workflow: when a deal moves to Closed Won, automatically set Commission Status to **Unpaid**. This ensures every closed deal enters the payout queue without anyone having to remember to update it.

From here, the process is manual and intentional. Your finance team reviews deals in the "Unpaid" status, verifies the amounts, and changes the status to "Approved." After the actual payout runs, they update to "Paid." You can create a saved view in your deals table filtered to Commission Status equals "Unpaid" -- this becomes your finance team's working list.

Finally, build a dashboard widget showing **Total Unpaid Commission** (a sum of Commission Earned where Commission Status equals Unpaid). This gives leadership a real-time view of outstanding commission obligations. It is also useful for cash flow forecasting.

---

## Building a Commission Dashboard That People Actually Use

All of this data is useless if nobody looks at it. Here are four reports that, together, give you a complete commission picture. Create all four and add them to a single dashboard called "Commission Tracking."

**Report 1: Total Commission Earned by Rep.** This is a bar chart grouped by Deal Owner, showing the sum of Commission Earned, filtered by close date in the current quarter. This is the report your reps will check most often. It answers the question every salesperson asks: "How much have I earned this quarter?"

**Report 2: Commission by Month.** A line chart showing the sum of Commission Earned per month over the past 12 months. This reveals trends. Are commissions growing? Flat? Seasonal? This report is for leadership and helps with budgeting and forecasting payout obligations.

**Report 3: Unpaid vs. Paid Commission.** A pie chart breaking down Commission Status. At a glance, you can see how much commission is still outstanding versus how much has been paid. If the "Unpaid" slice keeps growing, that is a signal that your payout process needs attention.

**Report 4: Average Commission per Deal.** A single-value widget showing the average Commission Earned across all closed deals in the current quarter. This is a useful sanity check. If the number suddenly spikes or drops, something changed -- either deal sizes shifted, your commission formula has a bug, or someone closed an unusually large or small deal.

Share this dashboard with three audiences: sales leadership (who care about total payouts and trends), individual reps (who care about their own earnings), and finance (who care about unpaid obligations). HubSpot's dashboard permissions let you control who sees what.

---

## When This Approach Stops Working

Let us be honest about the limits. HubSpot is a CRM, not a commission management platform. The approaches in this guide work well for a specific range of complexity, but there are clear signs that you have outgrown them.

**You need quota-based accelerators.** If your commission rate changes based on cumulative attainment -- for example, reps earn 5% until they hit 100% of quota, then 8% on everything above -- HubSpot's calculated properties cannot track running totals across deals within a period. You would need external logic or a very complex set of workflows that are fragile and hard to maintain.

**You have three or more split scenarios per deal.** Setter/closer splits are manageable. But when you add overlay reps, channel partners, solutions engineers, and regional managers who all take a cut, the property and workflow infrastructure becomes unwieldy.

**Finance needs ASC 606 compliance.** If your company recognizes revenue over time and needs to amortize commission expense accordingly, you are in accounting territory that HubSpot was never designed to handle.

**Reps are demanding real-time earnings dashboards.** HubSpot dashboards update reasonably quickly, but they are not purpose-built for the "check my earnings on my phone" experience that dedicated commission platforms offer.

**You are spending more than two hours per pay period on commission admin.** If you are manually fixing data, reconciling numbers, or chasing down edge cases every pay cycle, the time cost has exceeded what a native HubSpot solution can efficiently support.

When you hit these walls, it is time to evaluate dedicated tools. Check out our [2026 buyer's guide to commission tools for HubSpot](/posts/hubspot-commission-tracking-tools-compared/) for a side-by-side comparison of what is available. If you are specifically struggling with tiered calculations, our guide on [setting up tiered commission models in HubSpot](/posts/hubspot-tiered-commission-model-setup/) goes deeper than what we covered here.

And if you would rather not figure this out alone: [we build commission systems in HubSpot for mid-market teams](/contactus/). The first consultation is free, and we can usually tell you within 30 minutes whether your commission plan can live natively in HubSpot or whether you need something more. No pitch, no pressure -- just an honest assessment from people who have done this dozens of times.
