---
layout: ../../layouts/BlogPostLayout.astro
title: "How to Set Up Renewal Reminders and Alerts in HubSpot (Step-by-Step)"
pubDate: "2026-05-05"
description: "A step-by-step guide to building renewal reminders in HubSpot: track renewal dates, automate alerts and tasks 90/60/30 days before expiration, and stop renewals from slipping through the cracks."
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
image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=450&fit=crop"
tags:
  - "HubSpot"
  - "Renewal Pipeline"
  - "CRM Automation"
  - "Customer Success"
  - "Revenue Operations"
seriesName: "HubSpot Renewal Pipeline"
pillarUrl: "/posts/hubspot-renewal-pipeline-complete-guide"
faqs:
  - q: "Can HubSpot send renewal reminders automatically?"
    a: "Yes. A date-based workflow triggered on the renewal date can create tasks, send internal notifications, and email reminders without manual effort. This automated renewal reminder setup is the heart of renewal management in HubSpot."
  - q: "How far in advance should renewals be created in HubSpot?"
    a: "Create the renewal deal as soon as the original deal closes, and start reminders 90 days before the renewal date (120 days for procurement-heavy accounts)."
  - q: "Can HubSpot create renewal tasks automatically?"
    a: "Yes. The workflow can generate a task for the deal owner at each reminder checkpoint, with a due date tied to the renewal window."
  - q: "How does HubSpot make sure renewals are not missed?"
    a: "By watching the Renewal Date property and firing alerts at fixed intervals, so the deal owner is notified well before the contract ends rather than after."
  - q: "Do I need a custom object to track renewals?"
    a: "Not for most teams. A dedicated renewal pipeline with a Renewal Date property is enough to track renewals in HubSpot. Custom objects help only when you track multiple licenses or subscriptions per customer and need to manage license renewals individually."
---

> This article is part of our [Complete Guide to Building a Renewal Pipeline in HubSpot](/posts/hubspot-renewal-pipeline-complete-guide).

**Yes, HubSpot can automate renewal reminders and the tasks around them.** Using a renewal date property and a HubSpot workflow, you can notify the account owner, assign a task, and send email reminders a set number of days before a contract ends. This guide shows you the step-by-step workflow setup so no renewal is missed again.

Most teams do not lose renewals because the customer was unhappy. They lose them because a renewal date passed quietly and nobody got an alert in time. When your CRM does not track renewal dates and contract terms in one place, contract renewal turns into a last-minute scramble instead of a planned customer success motion. The good news: with a few date properties and automated workflows, you can use HubSpot to manage renewals end to end.

---

## Why Renewal Dates Get Missed

<img src="/assets/posts/diagrams/reminder-cadence.svg" alt="Renewal reminder cadence at 90, 60 and 30 days" width="640" height="165" loading="lazy" decoding="async" />

When renewal dates live in a spreadsheet, an inbox, or someone's memory, they slip. The expiration date arrives, the account manager is heads-down on new business, and the renewal becomes a fire drill (and one of the most avoidable churn risks you will ever face).

The fix is to make HubSpot watch the renewal date for you and trigger an alert automatically. The renewal is coming whether you track it or not; the only question is whether your team gets enough time to act. This is exactly the kind of repetitive, date-driven work HubSpot can automate.

---

## Prerequisites

Before you build a renewal reminder workflow, you need a few things in place:

- **A [dedicated renewal pipeline](/posts/hubspot-renewal-pipeline-vs-sales-pipeline)** with [defined stages](/posts/hubspot-renewal-pipeline-stages) such as Upcoming Renewal, so renewal deals sit in a separate pipeline from new business.
- **The right [custom properties](/posts/hubspot-renewal-pipeline-properties):** add the properties Renewal Date (or Contract End Date), Deal Owner, Contract Term, and Deal Type. These date properties are what every reminder workflow reads from.
- **[Sales Hub Professional or Enterprise](https://www.hubspot.com/pricing/sales)** for workflows (they are not available on Starter).
- **[Operations Hub Professional](https://www.hubspot.com/pricing/operations)** recommended, so you can create a calculated property like "Days to Renewal."

If your renewal deals are not being created automatically yet, set up [renewal deal creation](/posts/hubspot-renewal-deal-workflow-automation) first, so that when an original deal closes, HubSpot automatically creates a renewal deal in the renewal pipeline. Reminders work best when every renewal already lands in the renewal pipeline as a new deal, with the renewal value and owner already set.

---

## How to Track Renewal Dates in HubSpot

The simplest way to track renewals in HubSpot is a clean date property. Use a single **Renewal Date** property (a date picker) on the deal, populated either by your renewal workflows or on import from your billing system. Using a separate renewal pipeline plus this one date is enough for most teams to manage renewals; you rarely need a custom object unless you track multiple licenses per customer.

If you have Operations Hub, add a calculated property called **Days to Renewal**:

```
Days to Renewal = Renewal Date − today
```

This gives you a live countdown you can use in views, dashboards, and (most importantly) as a workflow trigger. A simple deal view filtered to "Days to Renewal is less than 90" instantly shows every renewal coming up this quarter.

---

## Building the Renewal Reminder Workflow (Step-by-Step)

This is the core of the system. The reminder workflow watches the renewal date and fires alerts at fixed intervals before the contract ends. These automated workflows are what turn renewal tracking from a manual chore into a reliable, hands-off process, and they are the foundation of automating reminders at scale.

### Trigger

**Object:** Deal-based workflow
**Enrollment trigger:** Deal Type is "Renewal" AND Renewal Date is known.

Use a **date-based trigger** so the workflow can act relative to the renewal date rather than a fixed calendar day. HubSpot lets you schedule actions "X days before" a date property.

### Actions: alerts at 90, 60, and 30 days

The reliable pattern is a 90/60/30 reminder cadence before expiration. Each checkpoint does three things: notify the owner, create a task, and (optionally) send an internal email.

| Days before renewal | Action | Who it goes to |
|---------------------|--------|----------------|
| 90 days | Create task: "Start renewal outreach" + in-app notification | Deal owner (CSM / account manager) |
| 60 days | Create task: "Confirm renewal terms and pricing" + Slack/email alert | Deal owner + manager |
| 30 days | Create task: "Renewal at risk if not closed" + escalation alert | Deal owner + RevOps |

For each checkpoint:

1. **Assign a task** to the deal owner, with a clear title and a due date tied to the renewal window. When the task is generated, the owner sees it in their queue immediately.
2. **Notify the account owner** with an internal notification (in-app or via the Slack integration) so the alert is seen even if HubSpot is not open.
3. **Set a property** like "Reminder Stage" to record which checkpoint has fired. This prevents duplicate alerts, helps improve reporting, and lets you report on the cadence.

At the 30 days before expiration mark, the alert should escalate, because a renewal still open this late is your highest churn risk.

### Routing alerts to the right person

Always notify the **deal owner** first, because that is the CSM or account manager responsible for the renewal. Add the manager at 60 days and RevOps at 30 days so escalation is built in. If ownership is unclear, route by company owner as a fallback. In teams where account managers carry many accounts, you can also create a follow-up task automatically at each stage so nothing depends on memory.

---

## Internal Alerts vs Customer Email Reminders

HubSpot workflows can power both internal and external reminders, but there are two distinct kinds of "renewal reminder," and mixing them up causes problems:

- **Internal alerts** tell your team a renewal is approaching (tasks, notifications, escalations). This is what the workflow above handles.
- **Customer-facing emails** remind the buyer their contract is ending. These belong in a separate, carefully timed sequence so you control tone and frequency.

Getting the contact into that customer-facing sequence automatically, at the same checkpoints as your internal alerts, needs one more piece: a workflow action that enrolls the contact the moment the renewal deal crosses a date threshold. HubSpot's own Sequences tool can do this natively on Professional tier through its Automation tab for simple cases. If you need pacing control on top of it, so a batch of renewals clustering around a fiscal year end does not enroll two hundred contacts into a sequence in the same hour, a dedicated enrollment app is worth it. See our comparison of [FlowNer vs Enrollem](/posts/flowner-vs-enrollem-comparison) for how the two leading options handle this.

Keep the two separate. Internal alerts are a shared responsibility across sales and customer success, so route them to whoever owns the account. For health-based escalations on accounts showing risk signals, layer in [health-triggered alerts](/posts/hubspot-churn-prevention-health-scores-workflows) on top of the date-based reminders.

---

## Preventing Reminder Mistakes

A few traps catch teams when they automate renewal reminders:

- **Notifying contacts who already renewed.** Add an unenrollment trigger or a filter so that once a renewal deal moves to "Closed Won," your reminder workflows stop. Nothing erodes trust like a "your contract is expiring" message sent the day after the customer renewed.
- **Duplicate reminders.** Use the "Reminder Stage" property so each checkpoint fires once.
- **No renewal date.** Reminders silently fail when the Renewal Date property is empty. Add a separate workflow that flags renewal deals missing a date.
- **Reminders too late.** Thirty days is often not enough for procurement-heavy contracts. For larger accounts, start the cadence at 120 days.

---

## Renewal Reminder Best Practices

- **Give your team enough time.** A 90-day head start turns renewals from a scramble into a planned motion and protects customer retention.
- **Tie reminders to tasks, not just emails.** A task in HubSpot creates accountability; an email gets buried.
- **Report on the cadence.** Track how many renewals hit each reminder stage so you can measure retention performance and spot accounts that go quiet.
- **Use a separate deal pipeline for renewals.** Reminders and reporting are far cleaner when renewal deals are not mixed in with new business, and it makes expansion revenue easier to attribute.
- **Hand strong accounts to account management for expansion.** A healthy renewal is also an upsell moment, so a successful renewal should flag expansion opportunities, not just protect existing revenue.

---

## Frequently Asked Questions

**Can HubSpot send renewal reminders automatically?**
Yes. A date-based workflow triggered on the renewal date can create tasks, send internal notifications, and email reminders without manual effort. This automated renewal reminder setup is the heart of renewal management in HubSpot.

**How far in advance should renewals be created in HubSpot?**
Create the renewal deal as soon as the original deal closes, and start reminders 90 days before the renewal date (120 days for procurement-heavy accounts).

**Can HubSpot create renewal tasks automatically?**
Yes. The workflow can generate a task for the deal owner at each reminder checkpoint, with a due date tied to the renewal window.

**How does HubSpot make sure renewals are not missed?**
By watching the Renewal Date property and firing alerts at fixed intervals, so the deal owner is notified well before the contract ends rather than after.

**Do I need a custom object to track renewals?**
Not for most teams. A dedicated renewal pipeline with a Renewal Date property is enough to track renewals in HubSpot. Custom objects help only when you track multiple licenses or subscriptions per customer and need to manage license renewals individually.

---

## Choosing Renewal Reminder Software

If you searched for "renewal reminder software," you will find three broad categories. Calendar reminders (Google Calendar, Outlook) are free but personal: they alert one person, hold no contract context, and vanish when that person leaves. Standalone reminder apps and contract trackers add shared visibility and document storage, but they live outside your CRM, so the reminder and the revenue sit in different systems. CRM-native workflows, the approach this guide covers, make the system of record do the reminding.

The CRM-native approach wins whenever the reminder has to do more than notify. A renewal is not just a date; it is a deal that needs an owner, a value, a stage, and a forecast. When the alert fires inside HubSpot, the same automation that notifies the CSM can also create the renewal deal, assign the task, and feed your retention reporting, with no copy-paste between a reminder tool and the CRM. Standalone tools can tell you a contract is expiring; they cannot open the renewal opportunity for you.

If you are still weighing the options, our [contract renewal reminder software comparison](/posts/contract-renewal-reminder-software) walks through the leading tools in each category, when a spreadsheet is genuinely enough, and includes customer-facing renewal email templates you can reuse.

---

A well-built reminder system streamlines renewal management: it keeps renewal data clean, improves automation and reporting, and means you rely on HubSpot workflows instead of a patchwork of spreadsheets and standalone software tools.

**Reminders are simple in theory and easy to get wrong in practice:** missing dates, duplicate alerts, and messages sent to customers who already renewed. SWOTBee has built renewal automation and contract management workflows for dozens of mid-market companies across Energy, Manufacturing, and SaaS.

[Book a free 30-minute discovery call →](/contactus)
