---
layout: ../../layouts/BlogPostLayout.astro
title: "Building a Tiered Commission Model Inside HubSpot: A Step-by-Step Guide"
pubDate: "2026-05-01"
description: "The HubSpot Community threads on tiered commissions are Q&A fragments. This is the complete, structured walkthrough: from creating properties to building dashboards."
category:
  title: "HubSpot Tips"
  href: "/categories/hubspot-tips"
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
  - "Tiered Commission"
  - "Calculated Properties"
  - "Workflows"
  - "Commission Setup"
  - "Revenue Operations"
seriesName: "Multi-Tiered Affiliate Incentives"
pillarUrl: "/posts/multi-tiered-affiliate-incentive-structure-guide"
---

# Building a Tiered Commission Model Inside HubSpot: A Step-by-Step Guide

If you have ever searched "tiered commission HubSpot," you know what you found: a handful of community forum threads with half-answers, a suggestion to "just use a calculated property" with no explanation of the formula, and a few posts recommending third-party tools that cost more per month than the commissions you are trying to track. Nothing complete. Nothing you could actually follow from start to finish.

This guide fills that gap.

By the end of this walkthrough, you will have a working 3-tier commission system inside HubSpot that does the following: it automatically calculates the correct commission when a deal closes, it adjusts when the deal amount changes, it tracks whether each commission has been paid out, and it feeds everything into a reporting dashboard your finance team and sales leadership can use every week.

No third-party software. No custom code. No developer required.

You will use HubSpot properties, one calculated field, one workflow, and about an hour of focused setup time. That is it.

There is one requirement before you start. You need **HubSpot Sales Hub Professional or Enterprise**. The free and Starter tiers do not include calculated properties or deal-based workflows, and both are essential for this build. If you are on Professional or above, you have everything you need. Open HubSpot in another tab, and let us get started.

## What You Are Building

Before touching any settings, here is the finished picture so you know exactly where this is heading.

When a sales rep closes a deal, HubSpot will automatically calculate the commission owed using a tiered rate structure. For this guide, we will use three tiers as our example:

- **Tier 1:** 5% on the first $15,000 of deal value
- **Tier 2:** 4% on deal value between $15,001 and $50,000
- **Tier 3:** 3% on everything above $50,000

So a $60,000 deal does not earn a flat 3% on the whole amount. Instead, it earns 5% on the first $15K, 4% on the next $35K, and 3% on the remaining $10K. This is how most real commission plans work, and it is exactly what HubSpot will calculate for you automatically.

Every closed-won deal will also receive a **Commission Status** label that moves through three stages: Unpaid, Approved, and Paid. This gives your finance team a simple, filterable pipeline to manage payouts without leaving HubSpot.

Finally, you will build a dashboard with five reports that answer the questions your VP of Sales asks every month: How much commission did we pay this quarter? How does it break down by rep? What is still unpaid?

When a deal amount changes after closing, because of a contract amendment, a discount applied late, or a data correction, the commission recalculates automatically. No manual updates. No spreadsheet reconciliation.

That is the system. Now let us build it.

## Prerequisites

Gather these before you begin. There is nothing worse than getting halfway through a setup and realizing you are missing a key decision.

**HubSpot access:** You need Sales Hub Professional or Enterprise, and you need admin permissions to create properties and workflows. If you are not an admin, ask your HubSpot admin to either grant you access or sit with you during the setup.

**Your commission tiers on paper:** Write down your exact rates and thresholds. How many tiers do you have? What percentage applies to each? At what dollar amounts do the tiers change? For this guide, we use 5% / 4% / 3% with breakpoints at $15,000 and $50,000. Yours may be different, and that is fine. Section 8 covers how to adapt the formula.

**A working deal pipeline:** You need a pipeline with a "Closed Won" stage, and your deals need the **Amount** property filled in. If your reps are not entering deal amounts, fix that first. No amount means no commission calculation.

**About 60 minutes of uninterrupted time:** This is not something to do between meetings. Set aside a focused block, and you will finish in one sitting.

## Step 1 -- Create the Custom Properties

You need six new deal properties. Each one serves a specific purpose in the commission system. Here is what to create and why.

Navigate to **Settings** (gear icon, top right) then **Properties** in the left sidebar. Make sure you are viewing **Deal properties** using the dropdown at the top. Click **Create property** to begin.

Create each of the following properties. For all of them, set the Group to something descriptive like "Commission Tracking", this keeps them organized and easy to find later.

**Commission Tier 1 Threshold**
- Property type: Number
- Field type: Number (use currency formatting if available)
- Description: The revenue cap for Tier 1
- Default value: 15000 (or whatever your Tier 1 ceiling is)

This property stores the dollar amount where your first tier ends. You might wonder why this is a property instead of a hardcoded number in the formula. The answer is flexibility. When leadership changes the thresholds next quarter, you update one property value instead of rewriting the formula.

**Commission Tier 2 Threshold**
- Property type: Number
- Field type: Number (use currency formatting if available)
- Description: The revenue cap for Tier 2
- Default value: 50000

Same logic. This is where Tier 2 ends and Tier 3 begins.

**Commission Tier**
- Property type: Dropdown select
- Options: Tier 1, Tier 2, Tier 3
- Description: Which commission tier this deal falls into based on its amount

This property is set automatically by the workflow you will build in Step 3. It makes filtering and reporting much easier, you can create a report showing "all Tier 3 deals this quarter" with one click.

**Commission Rate Applied**
- Property type: Number
- Field type: Number (formatted as percentage)
- Description: The blended commission rate applied to this deal

This stores the effective blended rate after the tiered calculation. For a $60,000 deal using our example tiers, the blended rate is about 4.08% ($2,450 / $60,000). This property is useful for reporting and for spot-checking that the formula is working correctly.

**Commission Earned**
- Property type: Calculation
- Equation type: Custom equation
- Description: The actual commission dollar amount, calculated automatically

This is the most important property. We will write the formula in the next section. Leave this one partially created for now, set the name, type, and description, then move on. We will come back to enter the formula.

**Commission Status**
- Property type: Dropdown select
- Options: Unpaid, Approved, Paid
- Description: Tracks payout status for finance

This is your commission pipeline. Every closed deal starts as Unpaid, gets reviewed and marked Approved by a finance manager, and then marked Paid after the check goes out or the direct deposit hits.

Once all six properties are created, you are ready for the formula.

## Step 2 -- Write the Commission Formula

This is the heart of the entire system. The formula goes into the **Commission Earned** calculated property you created in Step 1.

Go back to **Settings, then Properties, then Deal properties**. Find "Commission Earned" and click to edit it. In the calculation editor, you will enter a custom equation.

Here is the formula for a 3-tier commission structure with rates of 5%, 4%, and 3%, and thresholds at $15,000 and $50,000:

```
IF(deal_amount <= 15000,
  deal_amount * 0.05,
  IF(deal_amount <= 50000,
    750 + ((deal_amount - 15000) * 0.04),
    750 + 1400 + ((deal_amount - 50000) * 0.03)
  )
)
```

That might look intimidating if you have never written a formula in HubSpot. Let us break it down line by line.

**Line 1: `IF(deal_amount <= 15000,`**
This is the first check. If the deal amount is $15,000 or less, the entire deal falls within Tier 1.

**Line 2: `deal_amount * 0.05,`**
If the deal is within Tier 1, multiply the full amount by 5%. A $10,000 deal earns $500. Simple.

**Line 3: `IF(deal_amount <= 50000,`**
If the deal is more than $15,000, we check whether it falls within Tier 2 (up to $50,000).

**Line 4: `750 + ((deal_amount, 15000) * 0.04),`**
Here is where the tiering happens. The first $15,000 always earns 5%, which equals $750. That is a fixed number for any deal above $15K. Then we take whatever is above $15,000 and multiply it by the Tier 2 rate of 4%.

**Line 5: `750 + 1400 + ((deal_amount, 50000) * 0.03)`**
For deals above $50,000, you earn the full Tier 1 amount ($750), plus the full Tier 2 amount. Tier 2 covers $35,000 of revenue ($50,000 minus $15,000), and $35,000 at 4% equals $1,400. Then everything above $50,000 earns 3%.

### Testing the Formula With Real Numbers

Always verify with manual math before you trust the formula. Here are three examples.

**Example 1: A $10,000 deal (Tier 1 only)**
- The deal is under $15,000, so only Line 2 applies
- $10,000 x 0.05 = **$500**
- Blended rate: 5.0%

**Example 2: A $25,000 deal (spans Tier 1 and Tier 2)**
- Tier 1: $15,000 x 0.05 = $750
- Tier 2: ($25,000 - $15,000) = $10,000 x 0.04 = $400
- Total: **$1,150**
- Blended rate: 4.6%

**Example 3: A $100,000 deal (spans all three tiers)**
- Tier 1: $15,000 x 0.05 = $750
- Tier 2: $35,000 x 0.04 = $1,400
- Tier 3: ($100,000 - $50,000) = $50,000 x 0.03 = $1,500
- Total: **$3,650**
- Blended rate: 3.65%

Notice how the blended rate decreases as deal size increases. This is the defining feature of a tiered model, larger deals earn a lower effective rate because the higher tiers carry lower percentages.

### Entering the Formula in HubSpot

In the calculated property editor, HubSpot provides a formula builder with a text input area. Type or paste the formula exactly as shown above. Use the property name `deal_amount`. HubSpot may display this differently in their UI. When you start typing "deal," the editor will suggest the built-in Amount property. Select it.

After entering the formula, click **Save**. HubSpot will validate the syntax. If you get an error, check for mismatched parentheses, every opening parenthesis needs a closing one, and the nested IF structure requires careful counting. The formula above has three opening parentheses in the IF/IF structure and three closing ones at the end.

Once saved, HubSpot will retroactively calculate commissions for all existing deals that have an Amount value. Check a few deals to confirm the numbers match your manual calculations.

## Step 3 -- Build the Workflow

The calculated property handles the math, but you need a workflow to set the Commission Tier label and manage the Commission Status. This is what ties the system together.

Navigate to **Automation, then Workflows**. Click **Create workflow** and select **Deal-based** as the type. Choose **Blank workflow** to start from scratch.

### Set the Enrollment Trigger

Click **Set up triggers**. Choose the filter type **Deal properties** and select **Amount**. Set the condition to "is known", meaning any deal that has an amount value will enter this workflow.

Now, and this is critical, turn on **re-enrollment**. Click the Re-enrollment toggle and enable it. This means that whenever a deal's Amount property changes, the deal will re-enter the workflow and get its Commission Tier updated. Without re-enrollment, a deal that changes from $12,000 to $55,000 would keep its original Tier 1 label. That defeats the purpose.

### Add the IF/THEN Branch

Click the **+** button to add an action. Select **IF/THEN branch**.

**Branch 1:** If Deal Amount is less than or equal to 15,000
- Action: Set property value, set **Commission Tier** to "Tier 1"
- Action: Set property value, set **Commission Rate Applied** to 5

**Branch 2:** If Deal Amount is less than or equal to 50,000
- Action: Set property value, set **Commission Tier** to "Tier 2"
- Action: Set property value, set **Commission Rate Applied** to 4

**Branch 3 (the "None met" or default branch):** This catches everything above $50,000
- Action: Set property value, set **Commission Tier** to "Tier 3"
- Action: Set property value, set **Commission Rate Applied** to 3

Note on the Commission Rate Applied: setting it to the tier's base rate (5, 4, or 3) is a simplification. The actual blended rate varies by deal size, but storing the tier rate here is useful for quick filtering. If you want the true blended rate, you would need a second calculated property that divides Commission Earned by Amount.

### Add the Commission Status Trigger

Below the IF/THEN branch, add another **IF/THEN branch** that checks the deal's **Deal Stage** property. If it equals "Closed Won," add an action to set **Commission Status** to "Unpaid."

This ensures that every deal reaching Closed Won automatically enters the commission payout queue.

### Activate the Workflow

Review your workflow. The full flow should be: deal enters because Amount is known, the IF/THEN branch sets the tier and rate, and if the deal is Closed Won, the status is set to Unpaid.

Give the workflow a clear name like "Commission Tier Assignment and Status" and click **Turn on**. HubSpot will ask if you want to enroll existing deals that meet the criteria. Say yes, this backfills your historical deals.

## Step 4 -- Add Commission Status Tracking

The Commission Status dropdown you created earlier is a lightweight commission pipeline. Here is how it works in practice.

**Stage 1 -- Unpaid:** The workflow sets this automatically when a deal reaches Closed Won. This is the starting state. It means "commission has been earned but not yet reviewed or paid."

**Stage 2 -- Approved:** A finance team member reviews the deal, confirms the commission amount is correct, and manually changes the status to Approved. This is the review gate. It catches edge cases like deals that were closed-won by mistake, deals with unusual discount structures, or deals where the commission needs to be split (which you would handle manually at this stage).

**Stage 3 -- Paid:** After the commission is paid out, whether through payroll, a separate commission run, or a direct transfer, finance changes the status to Paid. This is the final state.

This three-step process gives you a clear audit trail. At any point, you can filter all deals by Commission Status to see exactly what is pending, what has been approved, and what has been paid.

### Optional: Automate Finance Notifications

If you want to take this a step further, create a second workflow that triggers when Commission Status is set to "Unpaid." Add an action to send an internal notification email to your finance team or create a task assigned to your finance manager with the deal name, commission amount, and a link to the deal record.

This eliminates the need for someone to remember to check for new commissions. The system tells finance whenever there is money to review.

You can also create a HubSpot list of "all deals where Commission Status is Unpaid" and share it with your finance team as a saved view. They open it every Friday, review the deals, flip the ones that look correct to Approved, and flag anything that needs investigation.

## Step 5 -- Build the Commission Dashboard

Properties and workflows are the engine. The dashboard is where your leadership team sees the results.

Navigate to **Reporting, then Dashboards**. Click **Create dashboard** and name it "Commission Tracking." Add the following five reports.

### Report 1: Total Commission by Rep

- Report type: Bar chart
- Data source: Deals
- Measure: Sum of Commission Earned
- Group by: Deal Owner
- Filter: Close date is this quarter (or this month, depending on your payout cycle)
- Filter: Commission Status is any of Unpaid, Approved, Paid

This is the report your VP of Sales will look at first. It shows, at a glance, who earned what.

### Report 2: Commission by Month

- Report type: Line chart
- Data source: Deals
- Measure: Sum of Commission Earned
- Group by: Close date (monthly)
- Date range: Last 12 months

This shows commission trends over time. Useful for budgeting and for spotting seasonal patterns in sales performance.

### Report 3: Commission by Tier

- Report type: Pie chart (or donut chart)
- Data source: Deals
- Measure: Count of deals
- Group by: Commission Tier

This tells you what percentage of your deals fall into each tier. If 80% of your deals are Tier 1, your tiered structure might not be motivating reps to pursue larger deals. That is a conversation for sales leadership, and this report starts it.

### Report 4: Unpaid Commission Total

- Report type: Single number (KPI)
- Data source: Deals
- Measure: Sum of Commission Earned
- Filter: Commission Status is "Unpaid"

This is the number your CFO cares about. It shows the total outstanding commission liability at any point in time. If this number is growing faster than your payout cycle, you have a cash flow conversation to have.

### Report 5: Average Commission per Deal

- Report type: Single number (KPI)
- Data source: Deals
- Measure: Average of Commission Earned
- Filter: Close date is this quarter

Useful for forecasting. If your average commission per deal is $1,200 and your pipeline has 40 deals expected to close this quarter, you can estimate roughly $48,000 in commission expense.

Add all five reports to your "Commission Tracking" dashboard. Share it with sales leadership and finance using HubSpot's dashboard permissions. Sales leaders get view access. Finance gets edit access so they can add their own filters and views as needed.

## Customizing for Your Tiers

The formula and workflow in this guide use a 3-tier model with specific rates. Your plan is almost certainly different. Here is how to adapt.

### 2-Tier Example

If you have a simpler structure, say 8% on the first $25,000 and 5% above that:

```
IF(deal_amount <= 25000,
  deal_amount * 0.08,
  2000 + ((deal_amount - 25000) * 0.05)
)
```

The fixed number 2,000 comes from $25,000 x 0.08. One IF statement, one threshold.

### 4-Tier Example

For a more complex plan, 6% up to $10K, 5% from $10K-$30K, 4% from $30K-$75K, 3% above $75K:

```
IF(deal_amount <= 10000,
  deal_amount * 0.06,
  IF(deal_amount <= 30000,
    600 + ((deal_amount - 10000) * 0.05),
    IF(deal_amount <= 75000,
      600 + 1000 + ((deal_amount - 30000) * 0.04),
      600 + 1000 + 1800 + ((deal_amount - 75000) * 0.03)
    )
  )
)
```

The pattern is always the same. Each tier adds the cumulative fixed amounts from all previous tiers, plus the variable amount for the current tier. The fixed amounts are: Tier 1 max ($10,000 x 0.06 = $600), Tier 2 max ($20,000 x 0.05 = $1,000), Tier 3 max ($45,000 x 0.04 = $1,800).

### The General Principle

Each additional tier adds one more nested IF to the formula. The structure is always:

1. Check if the amount falls within the current tier
2. If yes, calculate the fixed sum from all lower tiers plus the variable amount for this tier
3. If no, move to the next tier check

**Before going live,** test your formula with at least five example deals: one clearly in each tier, one right at each threshold boundary, and one well above the highest tier. Threshold boundary testing is especially important, a $15,000 deal and a $15,001 deal should produce noticeably different commission amounts with our example tiers.

## When This Approach Hits Its Limits

The system you just built handles a specific and common scenario: per-deal tiered commissions based on deal size. It works well for straightforward commission plans. But there are things it cannot do, and you should know where the walls are before you run into them.

**Quota-based tiers** are the most common limitation. Many commission plans change the rate based on cumulative attainment, for example, 5% on your first $100K of total closed revenue this quarter, then 8% after you hit quota. This requires summing across multiple deals, and HubSpot's calculated properties operate on a single deal record. They cannot reference other deals.

**Commission splits** between multiple reps on the same deal are another gap. If two reps co-sell a deal and split the commission 60/40, you need manual intervention or a custom property for each rep's share.

**Accelerators based on quarterly performance**, where the rate increases after a rep hits a certain total, face the same cross-deal limitation as quota-based tiers.

**Automated payout processing** is outside HubSpot's scope entirely. HubSpot can track that a commission is owed, but it cannot send money.

**ASC 606 compliance reporting**, the accounting standard for revenue recognition that affects how commissions are amortized, requires specialized software.

When you hit these walls, you have two paths forward. If you have developer resources, **Operations Hub** with custom-coded workflow actions can solve the cross-deal calculations like quota attainment and cumulative tiers. This requires JavaScript and API knowledge but keeps everything inside HubSpot.

If you need a dedicated solution, third-party commission software integrates with HubSpot and handles the complexity that native tools cannot. See our [comparison of HubSpot commission tracking tools](/posts/hubspot-commission-tracking-tools-compared/) for a detailed breakdown of your options.

For guidance on more advanced commission scenarios within HubSpot, including multi-rep splits and clawback handling, read our [commission splits, clawbacks, and accelerators guide](/posts/commission-splits-clawbacks-accelerators-guide/).

**Need help setting this up, or need something more advanced?** [We build commission systems in HubSpot](/contactus/) for mid-market teams. Free consultation, no lock-in, and we can usually get a tiered commission model live in your portal within a week.
