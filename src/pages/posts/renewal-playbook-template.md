---
layout: ../../layouts/BlogPostLayout.astro
title: "The Customer Success Renewal Playbook: A Complete Template"
pubDate: "2026-07-06"
description: "A customer success renewal playbook template you can copy today: sales-to-CS handoff fields, risk-tiered plays, expansion triggers, and CRM automation."
category:
  title: "Revenue Operations"
  href: "/categories/revenue-operations"
modifiedDate: "2026-07-06"
author:
  name: "SWOTBee Team"
  url: "https://swotbee.com"
  imageUrl: "/assets/ico/logo.png"
  bio: "HubSpot-certified consultants specializing in deal automation, renewal pipelines, and CRM migration for mid-market B2B companies."
  linkedin: "https://linkedin.com/company/swotbee"
  expertise:
    - "HubSpot CRM"
    - "Renewal Automation"
    - "Revenue Operations"
image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop"
tags:
  - "HubSpot"
  - "Renewal Playbook"
  - "Customer Success"
  - "Sales Handoff"
  - "Revenue Operations"
seriesName: "Contract Renewal Management"
pillarUrl: "/posts/contract-renewal-management-complete-guide"
faqs:
  - q: "What is a renewal playbook?"
    a: "A short written spec defining owners, triggers, and plays for every contract renewal: who takes the account after sales, what happens at each date checkpoint from Closed Won to T-0, and how the motion changes for healthy versus at-risk accounts. Its job is consistency, so outcomes stop depending on which CSM caught the account."
  - q: "Who should own renewals: sales, CS, or account management?"
    a: "Pick one owner per stage and write it down; the specific choice matters less than its clarity. A common mid-market pattern: CSM owns the relationship and the renewal through T-60, with a manager co-owning negotiation on large or red-tier accounts. What fails is shared ownership, because shared means nobody."
  - q: "When should the renewal process start?"
    a: "The playbook starts at Closed Won with the handoff, because renewal likelihood is mostly set by onboarding and adoption. The active renewal motion starts at T-120 for at-risk or procurement-heavy accounts and T-90 for healthy ones."
  - q: "How do risk tiers change the renewal play?"
    a: "Green accounts get the standard timeline, full uplift, and an expansion audit. Yellow accounts start earlier and get a re-discovery call before any pricing conversation. Red accounts get a save plan owned above the CSM, executive engagement by T-90, and no uplift until the core issue is fixed."
  - q: "How is a renewal playbook different from a renewal checklist?"
    a: "The checklist is the task list inside one renewal cycle (T-120 to T-0). The playbook is the layer above it: ownership rules, handoff spec, risk tiers, uplift policy, and escalation paths that decide which tasks apply to which account. You need both; the checklist executes what the playbook decides."
  - q: "How do renewal playbooks differ from sales playbooks?"
    a: "A sales playbook moves a stranger toward a first purchase over weeks; a renewal playbook manages an existing relationship across an entire contract term. The inputs differ (health scores and adoption data instead of lead qualification), the owner differs (the CS team instead of sales teams), and the clock starts at Closed Won rather than at first contact. Copying sales stages into a renewal pipeline is how teams end up prospecting their own customers."
  - q: "How can customer success platforms help with renewals?"
    a: "Customer success platforms are strong at the signal layer: health scores, usage trends, automated playbook triggers, and CSM task queues. What they do not do is create the renewal deal in your CRM with line items and uplift applied, so plan for that gap explicitly. If your renewals live in HubSpot, weigh whether the platform's signal layer justifies its cost on top of what the CRM already covers."
  - q: "Where can I get a free customer success renewal playbook template?"
    a: "The template in this article is a complete free customer success renewal playbook: copy Sections 1 through 5 into your own document, set the bracketed thresholds, and wire the triggers into your CRM. It is deliberately short; a playbook your CSMs actually open under pressure beats a 40-page one they never do."
---

> This article is part of our [Complete B2B Guide to Contract Renewal Management](/posts/contract-renewal-management-complete-guide/).

**A renewal playbook is a written spec that defines, for every customer renewal, who owns it, when each play fires, and what "good" looks like at each checkpoint.** It has four load-bearing parts: the sales-to-CS handoff, the timeline of triggers and owners, risk-tiered plays (green, yellow, red), and an expansion motion built into the renewal itself. This article gives you the full template, section by section, ready to copy into your own doc and wire into your CRM.

Most teams do not have a renewal playbook. They have a renewal habit: whatever the most experienced CSM happens to do, undocumented, applied inconsistently, and lost the day that person leaves. The symptoms are familiar: every renewal is handled differently, the handoff from sales is a Slack message ("hey, FYI, Acme signed"), at-risk accounts get the same treatment as healthy ones, and expansion only happens when the customer asks for it.

A playbook fixes this by making the renewal motion boring: same triggers, same owners, same plays, every time. Boring renews.

---

## Why B2B SaaS Customer Success Teams Need a Renewal Playbook

At most B2B SaaS companies, the majority of each year's revenue now comes from existing customers, which makes managing customer renewals a core function of the customer success team rather than an admin task. Yet few CS teams run a structured renewal process. Renewal strategies live in individual heads, every customer success manager works their book differently, and the head of customer success cannot forecast because there is no consistent renewal management to forecast from.

Renewal playbooks fix three things at once:

- **Consistency across the customer base.** The same triggers and plays fire for every account, so outcomes stop depending on which CSM caught the renewal.
- **Speed for new CSMs.** A documented, repeatable playbook turns six months of tribal knowledge into something a new hire can execute in week one.
- **Customer retention through proactive touchpoints.** Structured check-ins across the customer journey (onboarding milestones, quarterly reviews, health checks) catch risk early instead of discovering it 30 days before contract end, when churn is already baked in. A successful renewal is usually decided months before the renewal date.

There is a customer experience benefit too: a predictable renewal process means no last-minute scramble, no surprise invoice, and no uplift the customer hears about for the first time on the order form. None of this requires exotic tooling; effective renewal management is mostly best practices, written down and applied every single time.

---

## What Belongs in a Renewal Playbook (and What Does Not)

A usable playbook answers exactly three questions for any renewal at any moment:

1. **Who owns this renewal right now?** One named role per stage, never "the team."
2. **What fires next, and when?** Triggers tied to dates and risk signals, not to memory.
3. **What is the play for this account's situation?** Different motions for healthy, wobbly, and at-risk accounts.

It should contain: the handoff spec, the timeline with owners, the risk-tier definitions and plays, the expansion checklist, the uplift policy (your default increase and who can approve exceptions), and the escalation path. Keep the whole thing under five pages.

It should not contain: product training, generic customer success philosophy, or aspirational health-score modeling you have not built yet. A playbook nobody can execute this quarter is a strategy memo wearing a costume.

---

## The Sales-to-CS Handoff Spec

Renewals are won or lost in the first 30 days of the contract, because that is when context either transfers from the sales team to customer success or evaporates. The handoff is the most important section of the playbook and the most commonly missing one.

### The handoff fields

Sales completes these before the handoff meeting. In a CRM, make them required properties on Closed Won; in a doc, make them the meeting's agenda.

| Field | Why CS needs it |
|---|---|
| Why they bought (top 2 pain points) | Renewal value story starts from the original pain |
| Success criteria the buyer stated | What the customer will measure you against at renewal |
| Decision maker and champion (names, roles) | Renewal conversations with the wrong person stall |
| Contract terms: ACV, term, end date, notice period, auto-renew | The renewal math and the real deadline |
| Uplift expectations set during the sale | Whether a price increase was signaled or promised away |
| Competitors evaluated | Who shows up again at renewal time |
| Landmines (concessions, custom terms, promised roadmap items) | The surprises that kill renewals in month 11 |
| Onboarding urgency and key dates | The first 90 days determine adoption |

### The handoff meeting

Thirty minutes, within five business days of Closed Won, mandatory attendance: selling rep, receiving CSM or account manager, and (for accounts above a threshold you set) the CS lead. The rep walks the fields above; the CSM leaves owning the account and the future renewal. The renewal deal itself should already exist in the pipeline by this point, created automatically at close, so the handoff attaches to a real record rather than a promise.

### Timing rule

The handoff is complete when the CSM has held the meeting AND logged their first customer touch. Until both happen, the rep still owns the account. This closes the gap where accounts float ownerless for their first month.

---

## The Renewal Playbook Template, Section by Section

Copy this structure into your own document and fill in the bracketed choices. It is deliberately complete; delete what you do not need rather than starting from a blank page.

### Section 1: Scope and owners

```
Applies to: all contracts >= [ACV threshold]. Below threshold: auto-renew
track with a 60-day notice check only.
Renewal owner: [CSM / Account Manager / Renewal Manager] from handoff to close.
Escalation owner: [CS Lead / VP CS] for all red-tier accounts.
Uplift policy: default [X]% annual increase. Exceptions below [Y]% need
[role] approval. No renewal goes out flat without a logged reason.
```

### Section 2: The timeline (triggers and owners)

| Trigger | Play | Owner |
|---|---|---|
| Day 0 (Closed Won) | Renewal deal auto-created; handoff fields completed | Sales rep |
| Day 5 | Handoff meeting held; CSM takes ownership | Rep + CSM |
| Day 30 | Onboarding checkpoint: success criteria confirmed with customer | CSM |
| Quarterly | Business review or health check; risk tier updated | CSM |
| T-120 (120 days before renewal) | Renewal kickoff: health review, risk tier locked, uplift number set | CSM + manager |
| T-90 (90 days before renewal) | Renewal conversation booked with decision maker; expansion audit run | CSM |
| T-60 | Terms and pricing in front of the customer | CSM |
| T-45 | Red-tier accounts: executive sponsor engaged | CS Lead |
| T-30 | Anything unsigned escalates to leadership; weekly standing check | CS Lead + RevOps |
| T-0 | Signed, or a documented churn reason logged | CSM |

Treat every row as a milestone with a named owner and a hard date; renewal reminders and tasks should fire from the CRM automatically at each one. For the granular task-level version of the T-120 to T-0 window, use our [contract renewal process checklist](/posts/contract-renewal-process-checklist/); the playbook references it rather than duplicating it.

### Section 3: Customer health scores and risk-tiered plays

Define tiers with criteria your customer data can actually evaluate today. Customer health scores are the ideal input; if you have not built health scores yet, engagement and support signals work as a starting indicator set. A customer health score is just those same signals (usage, engagement, support load, sentiment) formalized into one number.

| Tier | Criteria (any two) | The play |
|---|---|---|
| Green | Active usage steady or growing; champion engaged in last 60 days; no open escalations; success criteria being met | Standard timeline, full uplift, run the expansion audit (Section 4). Do not over-service green accounts into annoyance |
| Yellow | Usage declining; champion gone quiet or changed roles; NPS/CSAT dip; success criteria unclear | Start at T-120 instead of T-90. Re-discovery call to restate customer value in their own numbers and rebuild a mutual success plan for the next term. Consider trading uplift for a longer term or added scope. Manager reviews before terms go out |
| Red | Usage collapse; open escalation; champion departed; budget or vendor-consolidation signals; stated dissatisfaction | Save plan owned by CS lead, not the CSM alone. Executive-to-executive contact by T-90. Fix the top issue before discussing price; uplift is off the table. Weekly internal review until resolved. Define the walk-away point |

Tier assignment is not a feeling; it is a field, reviewed quarterly and locked at T-120. If you want to formalize the scoring behind these tiers, our guide to [renewal risk scoring in HubSpot](/posts/hubspot-renewal-risk-scoring/) covers building the signal model.

### Section 4: The expansion audit

Expansion belongs inside the renewal motion, not bolted on afterward. At T-90, for every green account, the owner answers five questions:

```
1. Seats/usage: are they near a limit or above their licensed tier?
2. Teams: which adjacent department has the same pain we solved?
3. Products: which module/add-on maps to a stated goal from the last QBR?
4. Term: would they trade a longer commitment for price protection?
5. Champion: who benefits career-wise from expanding this, and do we
   have a story for them?
```

Two or more "yes" answers means the renewal conversation is framed as a growth conversation: next year's plan first, continuation second. Structuring that conversation is exactly what a [strategic QBR ahead of the renewal](/posts/strategic-qbr-renewals/) is for.

### Section 5: Escalation and exceptions

```
Escalate to CS lead when: red tier assigned, T-30 reached unsigned,
uplift rejected outright, or procurement introduces new terms.
Escalate to exec sponsor when: champion departs at a red account, or
ACV >= [threshold] reaches T-45 unsigned.
Log every exception (flat renewal, discount, shortened term) with a
reason code. Review reason codes quarterly and refine the plays based
on what they show; the codes are your playbook's bug tracker.
```

---

## Common Renewal Risks and the Plays That Answer Them

Most churn is not a surprise; it follows a handful of common renewal risks that show early indicators. The playbook's job is to secure the renewal before the risk matures:

| Common renewal risk | Early indicator | The play |
|---|---|---|
| Champion departure | LinkedIn change, emails bouncing, meetings getting delegated | Multi-thread from day one so the renewal never depends on one stakeholder; re-sell the new contact within 30 days |
| Silent usage decay | Logins and feature usage trending down with no complaints | Treat as yellow tier immediately; run a re-discovery call and collect customer feedback before the decay hardens into a decision |
| Budget cut or vendor consolidation | Procurement enters early, CFO questions, headcount freezes | Build the ROI story with your champion; offer term or payment flexibility before discounting price |
| Uplift surprise | Customer first hears about the increase on the order form | Signal the uplift at the QBR two quarters out and anchor it to delivered customer value |
| Procurement stall | Verbal yes at T-45, no signature by T-30 | Escalate per Section 5; get the notice-period reality on the table and a signature date agreed in writing |

Silent usage decay deserves special attention because it produces no ticket, no complaint, and no signal in a CRM that only tracks emails; our guide to [detecting silent churn](/posts/silent-churn-detection/) covers the instrumentation. The pattern across all five risks is the same: the earlier the indicator is caught, the cheaper the play.

---

## Instrumenting the Playbook: CRM Workflows and Automation

A playbook in a doc is a suggestion; a playbook in the CRM is an operating system. Automate every trigger you can: the playbook should run itself instead of depending on CSMs remembering it under quarter-end pressure. The translation is direct:

- **Handoff fields** become required deal or company properties, enforced at Closed Won.
- **The timeline** becomes date-based workflows: each T-date trigger creates the task, sends the renewal reminder, notifies the owner, and escalates on schedule.
- **Risk tiers** become a property that gates which task sequence fires, so yellow and red accounts automatically get their heavier plays.
- **The renewal deal itself** is created automatically at close with line items and the default uplift applied, so every play attaches to a forecastable record from day one.
- **Reason codes** become a required property on Closed Lost and on any exception, feeding the quarterly review.

Whether this is one afternoon of setup or a quarter-long project depends mostly on whether your renewal pipeline and properties already exist. If your CS team runs inside HubSpot rather than a separate platform, our guide to [running customer success in HubSpot](/posts/customer-success-in-hubspot/) covers the surrounding toolkit; the playbook above drops into it directly.

One honest caveat: customer success platforms (Gainsight, ChurnZero, and similar) and CRMs alike will happily send the alerts, but the deal-building step (line items, uplift math, multi-year chains) is where HubSpot's native tooling needs help. Make sure your instrumentation covers deal creation, not just notification, or the playbook's timeline starts every cycle with manual work.

---

## Frequently Asked Questions

**What is a renewal playbook?**
A short written spec defining owners, triggers, and plays for every contract renewal: who takes the account after sales, what happens at each date checkpoint from Closed Won to T-0, and how the motion changes for healthy versus at-risk accounts. Its job is consistency, so outcomes stop depending on which CSM caught the account.

**Who should own renewals: sales, CS, or account management?**
Pick one owner per stage and write it down; the specific choice matters less than its clarity. A common mid-market pattern: CSM owns the relationship and the renewal through T-60, with a manager co-owning negotiation on large or red-tier accounts. What fails is shared ownership, because shared means nobody.

**When should the renewal process start?**
The playbook starts at Closed Won with the handoff, because renewal likelihood is mostly set by onboarding and adoption. The active renewal motion starts at T-120 for at-risk or procurement-heavy accounts and T-90 for healthy ones.

**How do risk tiers change the renewal play?**
Green accounts get the standard timeline, full uplift, and an expansion audit. Yellow accounts start earlier and get a re-discovery call before any pricing conversation. Red accounts get a save plan owned above the CSM, executive engagement by T-90, and no uplift until the core issue is fixed.

**How is a renewal playbook different from a renewal checklist?**
The checklist is the task list inside one renewal cycle (T-120 to T-0). The playbook is the layer above it: ownership rules, handoff spec, risk tiers, uplift policy, and escalation paths that decide which tasks apply to which account. You need both; the checklist executes what the playbook decides.

**How do renewal playbooks differ from sales playbooks?**
A sales playbook moves a stranger toward a first purchase over weeks; a renewal playbook manages an existing relationship across an entire contract term. The inputs differ (health scores and adoption data instead of lead qualification), the owner differs (the CS team instead of sales teams), and the clock starts at Closed Won rather than at first contact. Copying sales stages into a renewal pipeline is how teams end up prospecting their own customers.

**How can customer success platforms help with renewals?**
Customer success platforms are strong at the signal layer: health scores, usage trends, automated playbook triggers, and CSM task queues. What they do not do is create the renewal deal in your CRM with line items and uplift applied, so plan for that gap explicitly. If your renewals live in HubSpot, weigh whether the platform's signal layer justifies its cost on top of what the CRM already covers.

**Where can I get a free customer success renewal playbook template?**
The template in this article is a complete free customer success renewal playbook: copy Sections 1 through 5 into your own document, set the bracketed thresholds, and wire the triggers into your CRM. It is deliberately short; a playbook your CSMs actually open under pressure beats a 40-page one they never do.

---

**SWOTBee turns renewal playbooks into working HubSpot systems for mid-market teams: automated renewal deals with line items and uplifts, risk-tiered alerting, and NRR reporting, built in your portal, owned by you.**

[Book a free 30-minute discovery call →](/contactus/)
