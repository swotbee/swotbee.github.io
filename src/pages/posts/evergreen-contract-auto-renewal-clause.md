---
layout: ../../layouts/BlogPostLayout.astro
title: "Evergreen Contracts and Auto-Renewal Clauses: The Seller's Guide"
pubDate: "2026-08-31"
description: "What an evergreen contract is, how it differs from a fixed auto-renewal, why the notice date matters more than the end date, and how to track both in your CRM."
category:
  title: "Revenue Operations"
  href: "/categories/revenue-operations/"
modifiedDate: "2026-08-31"
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
image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=450&fit=crop"
tags:
  - "Contract Management"
  - "Renewal Reminders"
  - "CRM Automation"
  - "Revenue Operations"
seriesName: "Contract Renewal Management"
pillarUrl: "/posts/contract-renewal-management-complete-guide/"
funnelCta: "renewal-audit"
faqs:
  - q: "What is an evergreen contract?"
    a: "An evergreen contract is one that continues automatically after its initial term ends, with no fixed stop date, until one party gives notice to end it. The word evergreen refers to the fact that the agreement never expires on its own. It is also called an evergreen clause, an evergreen provision, or an automatic renewal clause, though that last term is used loosely and often means something slightly different."
  - q: "What is the difference between an evergreen contract and an auto-renewal contract?"
    a: "A true evergreen contract rolls on indefinitely, usually converting to a month-to-month or rolling arrangement after the initial term. A fixed auto-renewal contract renews for another defined term, normally the same length as the original, and then faces the same decision again. The practical difference is the exit: an evergreen agreement can usually be ended with short notice at any point, while a fixed auto-renewal locks both sides in for another full term once the notice window closes."
  - q: "Are evergreen contracts legal?"
    a: "Yes, in business-to-business agreements they are generally enforceable. The complications are mostly consumer-facing. At least 30 states have automatic renewal laws with disclosure and notice requirements, and several apply to some business contracts too. New York requires the provider to notify the customer between 15 and 30 days before renewal, and failure to do so can make the renewal unenforceable. Illinois has similar rules under its Automatic Contract Renewal Act. Take legal advice on your own contracts rather than relying on a general article."
  - q: "What is a notice period in an auto-renewal clause?"
    a: "The notice period is the window before the contract end date in which either party must say they do not want to renew. Thirty, sixty, and ninety days are the common values. If nobody gives notice inside that window, the contract renews itself. The important consequence is that the real deadline is not the contract end date, it is the end date minus the notice period."
  - q: "How much notice do most auto-renewal contracts require?"
    a: "Most software contracts with an auto-renewal clause use a notice period between 30 and 90 days. Sixty days is the most common single value in mid-market business software. Enterprise agreements and multi-year deals more often use 90 days, and occasionally 120."
  - q: "Can a company automatically renew a contract without telling you?"
    a: "In a business-to-business contract, usually yes, if the clause is in the signed agreement and the notice window passes without objection. That is the whole point of the clause. Consumer contracts are different, and several states require an advance reminder before the renewal takes effect. Even where no reminder is legally required, sending one is normal commercial practice and protects the relationship."
  - q: "What is the difference between contract renewal and contract extension?"
    a: "A renewal starts a new term under the existing agreement, usually on the same or slightly adjusted commercial terms. An extension lengthens the current term without starting a new one, and is normally used as a short bridge while something else is being negotiated. Renewals reset the clock; extensions push it back."
  - q: "How do you track evergreen contracts in a CRM?"
    a: "Store two dates, not one: the contract end date and the notice date. Calculate the notice date as the end date minus the notice period, store it as its own property, and drive every alert and task from it. Most teams only store the end date, which is why alerts fire after the decision has already been made for them."
  - q: "What is a perpetual contract, and is it the same as evergreen?"
    a: "No. A perpetual agreement, most often a perpetual software licence, grants a right that does not expire at all. An evergreen contract does expire, repeatedly, and simply renews each time unless somebody stops it. Perpetual means no end; evergreen means no automatic end."
---

> This article is part of our [Complete B2B Guide to Contract Renewal Management](/posts/contract-renewal-management-complete-guide/).

**An evergreen contract is one that keeps renewing itself after the initial term, with no fixed stop date, until one side gives notice to end it.** Almost everything written about them is written for the buyer trying to get out. This guide is written for the other side of the table: the company whose revenue those clauses quietly protect, and which loses that protection the moment it stops tracking notice dates.

If you sell on subscription or on annual service agreements, a meaningful share of your recurring revenue probably renews without anyone doing anything. That is not a problem. It is the clause working as designed. The problem is that most companies cannot say which contracts those are, when the notice windows close, or what would happen next quarter if a handful of customers started giving notice on time.

---

## What an evergreen contract actually is

An evergreen contract runs for an initial fixed term, and then, rather than ending, continues automatically. There is no second signature and no new paperwork. The agreement simply carries on under the same terms until somebody formally ends it.

The name comes from the evergreen tree, which does not shed its leaves. The clause that creates the effect is called an evergreen clause or an evergreen provision. You will also see it called an automatic renewal clause, which is where most of the confusion starts.

A simple example of evergreen contract language:

> This Agreement shall commence on the Effective Date and continue for an initial term of twelve (12) months. Thereafter, this Agreement shall automatically continue on a month-to-month basis until terminated by either party on not less than sixty (60) days' written notice.

Three things are doing work in that paragraph. The initial term sets the first commitment. The continuation language removes the end date. The notice requirement is the only exit, and it is the part everybody forgets.

### Evergreen contract vs auto renewal: the distinction that matters

These two terms get used interchangeably, and in casual conversation that is harmless. In your contract data it is not, because the two structures behave completely differently at the moment of decision.

| | Evergreen (rolling) | Fixed auto-renewal |
|---|---|---|
| What happens after the initial term | Converts to rolling, usually month-to-month | Renews for another full term, usually the same length |
| When you can next exit | Any time, subject to notice | Only in the notice window before the next term ends |
| Cost of missing the notice window | One notice period of extra service | An entire additional term |
| Typical use | Ongoing services, support agreements, retainers | Annual software subscriptions, licensing |
| Revenue predictability for the seller | Lower. Cancellable at any point | Higher. Locked for the full term |

The practical difference is the cost of inattention. Miss the notice window on a rolling evergreen agreement and you owe another sixty days. Miss it on a twelve-month fixed auto-renewal and you owe another twelve months.

That asymmetry is why buyers have become much more organised about this in the last few years, and it is why sellers should assume the easy renewals are getting harder.

### How an evergreen contract actually ends

Because evergreen agreements have no expiration date, termination is the only way they end, and the termination clause does work that an expiration date would otherwise do.

Three routes out, and it is worth knowing which ones your contracts contain:

**Termination for convenience.** Either party ends the agreement for no stated reason, on notice. This is the route the notice period governs, and on most evergreen agreements it is the only one available in normal circumstances. Typical language requires notice "not less than sixty (60) days prior" to the intended end date.

**Termination for cause.** One party has breached, and usually there is a cure period first: a defined window in which the breaching party can fix the problem before the termination takes effect. Faster than convenience, but you have to be able to evidence the breach.

**Non-renewal notice.** On a fixed auto-renewal rather than a rolling evergreen, this is the normal route. The contract does have an expiration date, and you are simply declining to let it renew for another term. Give notice inside the window and the agreement ends on its existing end date.

The distinction that trips people up: on a rolling evergreen agreement there is no expiration to decline, so "non-renewal" is not a thing. You terminate, or it continues. On a one-year contract with a fixed auto-renewal, you decline the renewal and the contract expires on schedule.

Both structures are common in service contracts, software subscriptions and leases. A lease is often the clearest example most people have met: a one-year term that either converts to month-to-month or renews for another full year, depending entirely on which clause the landlord used.

### Perpetual vs evergreen contract

A third term gets pulled into this conversation and does not belong there. A perpetual licence grants a right that never expires. There is no term, no renewal and no notice, though there is often a separate annual support and maintenance fee that does renew.

Evergreen is not perpetual. An evergreen agreement expires constantly. It just renews itself every time it does.

### Contract renewal vs extension

One more distinction worth keeping straight in your CRM, because the two get recorded as the same thing and then forecast badly.

A **renewal** starts a new term under the existing agreement. The clock resets. In most systems this should create a new deal.

An **extension** lengthens the current term without starting a new one. It is normally a short bridge, thirty or sixty days, while a renegotiation finishes or a procurement process catches up. It should not reset the clock, and it usually should not create a new deal, because the revenue was already counted.

Teams that record extensions as renewals systematically overstate their renewal count and understate their average contract value.

---

## The notice date is the real deadline

This is the single most useful idea in this article, and it is the thing most renewal processes get wrong.

Take a contract that ends on 31 December with a sixty-day notice period. The end date is 31 December. The **decision** date is 1 November. After 1 November, the renewal has happened whether anyone intended it or not.

Now consider what most companies do. They set an alert for ninety days before the end date, which fires on 2 October, and they feel organised. On a sixty-day notice period that leaves a thirty-day working window, which is tight but survivable.

Then consider the same alert on a contract with a ninety-day notice period. The alert fires on 2 October. The notice deadline is also 2 October. The alert and the deadline are the same day. The team receives a notification about a decision that has already been made for them.

Research on software agreements puts around 69% of them in the auto-renewal category, with notice periods between 30 and 90 days. If your alerting is anchored to the end date, then for a meaningful part of your book you are being told about renewals after the window has closed.

### The fix, stated as arithmetic

Store two dates, and drive everything from the second one:

```
notice_date = contract_end_date - notice_period_days
alert_date  = notice_date - lead_time_days
```

A contract ending 31 December, with a 60-day notice period and a 90-day lead time, gives a notice date of 1 November and a first alert on 3 August. That is a real working window.

Work out the dates for a single contract with our [notice date calculator](/notice-date-calculator/), or hold your whole book in the free [contract tracker template](/resources/contract-tracker-template/), which calculates the notice date for every row.

Most CRMs will happily store all three values. Almost nobody sets them up, because the contract end date is the number that appears on the contract and the notice date is the one you have to calculate.

If you are running renewals in HubSpot, this is a deal property and a calculation, not a new tool. Our guide to [HubSpot contract management](/posts/hubspot-contract-management/) covers the property setup, and the [renewal reminder cadence](/posts/contract-renewal-reminder-software/) piece covers what to do once the dates are right.

---

## Why sellers should care, not just buyers

Search for evergreen clauses and nearly every result is a warning. Watch out for lock-in. Diarise your notice dates. Do not get trapped. That advice is written for procurement, and it is good advice.

What almost nobody writes is the other half. If you sell on evergreen or auto-renewing terms, those clauses are a real part of your revenue base, and they behave in ways worth understanding.

### They make your revenue look better than your relationships are

An auto-renewal converts an absence of action into revenue. That is genuinely valuable. It also means a contract can renew for two or three consecutive terms while the relationship quietly decays, nobody logs in, and the champion who signed it leaves.

The renewal rate says everything is fine. The account is not fine. It is simply not being cancelled, which is a different thing.

This is the mechanism behind what most teams call silent churn, and we have written about [detecting it before the cancellation arrives](/posts/silent-churn-detection/). Auto-renewal is what hides it. The revenue keeps arriving right up until the moment it does not, and then it vanishes in one step rather than degrading visibly over several quarters.

### They concentrate risk into a single date

On a negotiated renewal, a struggling relationship shows up gradually. There are conversations, pushback, a difficult quarterly review.

On an auto-renewing contract, none of that is required. A customer who has decided to leave has one job: send an email before the notice date. Everything before that date can look completely normal.

The practical consequence for forecasting is that auto-renewing accounts need health signals that are not derived from renewal behaviour, because renewal behaviour tells you nothing until it is over. Product usage, support volume and stakeholder changes all move earlier. We cover the modelling in [health scores and churn prediction](/posts/health-score-churn-prediction-research/).

### They set your price increases for you, badly

Most evergreen clauses renew on the same commercial terms. No uplift, no inflation adjustment, no repricing.

Over three years of automatic renewals that is a substantial real-terms discount granted by default to your least engaged customers. The accounts that renegotiate get scrutinised and repriced. The accounts that quietly roll over do not.

If your renewal price uplift only ever gets applied when somebody opens a negotiation, you are systematically undercharging the customers who cause you the least trouble. Our guide to [renewal quotes and price increases](/posts/hubspot-renewal-quote-price-increase/) covers how to apply uplift to a rolling book without triggering a review of every account at once.

---

## Where evergreen contracts are used, and why

Companies frequently use evergreen clauses in agreements where the business relationship is expected to be ongoing and the administrative cost of renewing it repeatedly is not worth paying.

The common cases:

- **Subscription services and software.** The contract continues indefinitely, or renews for successive renewal periods, unless one side gives timely notice.
- **Supply contracts.** Ongoing delivery where stopping and restarting is disruptive to both parties.
- **Support and maintenance agreements.** Often attached to perpetual contracts, where the licence never expires but the support renews annually.
- **Retainers and managed services.** A rolling arrangement with a short exit.
- **Leases.** Frequently the clearest example, converting to month-to-month at the end of the contract term.

Evergreen contracts offer real advantages to both sides. Continuity is automatic, there is no renegotiation cost each cycle, and the renewal terms are known in advance. The disadvantage is symmetrical: contracts automatically renew whether or not either party still wants them to, and an automatic renewal provision that nobody is tracking converts inattention into commitment.

### How an evergreen contract works in the document

Understanding evergreen contracts means reading three renewal provisions together:

1. **The initial term.** How long the first commitment runs.
2. **The continuation language.** Whether the contract may continue on a rolling basis, or renew automatically for further fixed renewal periods.
3. **The notice requirement.** How much warning, in what form. Most agreements require written notice of termination a set number of days prior to the renewal date, commonly 30, 60 or 90 days before the renewal date.

That third provision is the only one that lets you terminate the contract or extend the contract on different terms. Miss it and the terms of the contract carry forward unchanged.

Contract extensions are worth distinguishing here again: an extension prolongs the current contract period, while a renewal starts a new contract term. Recording them identically is what corrupts renewal reporting.

Examples of evergreen contracts in your own book are usually easy to find. Search your agreements for "unless either party", "month-to-month", "successive", and "automatically renew".

---

## Are evergreen contracts legal

In business-to-business agreements, generally yes. The clause is a normal commercial term and courts enforce it.

The complications sit in three places, and all three are worth a conversation with your own counsel rather than a paragraph in an article.

**State automatic renewal laws.** At least 30 US states have enacted legislation governing automatic renewals. Most are aimed at consumer subscriptions, but several reach some business contracts. The common requirements are clear and conspicuous disclosure of the renewal term, affirmative consent, and a straightforward cancellation route.

**Advance notice requirements.** New York requires a service provider to notify the customer not less than 15 and not more than 30 days before the renewal takes effect, served personally or by certified mail. Failure to comply can render the automatic renewal unenforceable. Illinois has comparable rules under its Automatic Contract Renewal Act, which can make an evergreen provision unenforceable where it is not clear and conspicuous or where notice was not properly given.

**Conspicuousness.** Across most of these statutes, a renewal clause buried in dense boilerplate is more vulnerable than one that is clearly presented. The drafting question is not only whether the clause exists but whether a court would accept the customer knew about it.

The commercial point underneath the legal one: a renewal you have to defend in a dispute is worth much less than a renewal the customer expected. Sending a courtesy reminder before the notice window closes costs you almost nothing and removes the entire argument. Some of your competitors treat the silent renewal as a win. It is a win that is one angry email away from becoming a refund, a bad review and a lost account.

---

## Pros and cons of evergreen contracts

For the seller, honestly assessed.

**In favour**

- Revenue continues without a sales cycle, which lowers the cost of retention considerably.
- No renegotiation means no routine opportunity for the customer to ask for a discount.
- Administrative load drops. There is no paperwork on a contract that renews itself.
- Forecasting is simpler for the base case, since the default outcome is continuation.

**Against**

- Relationship decay is invisible until the cancellation arrives.
- Price uplift rarely gets applied, so your margin erodes on exactly the accounts you touch least.
- Cancellations arrive without warning and in full, rather than gradually.
- If a customer feels trapped by a clause they had forgotten, you have converted a renewal into a complaint.
- On rolling month-to-month terms, your revenue is far less committed than an annual contract value figure suggests.

The balanced position most mid-market companies land on: keep the auto-renewal, keep the notice period, and stop relying on it. Treat every auto-renewing contract as though it required a negotiated renewal, run the same account review, and let the clause be the safety net rather than the plan.

---

## What to do about it, in order

### 1. Find out which contracts auto-renew

Most companies cannot answer this. The information is in the signed PDFs, and the CRM records only an end date.

Start with the largest twenty contracts by annual value. For each one, record three fields: does it auto-renew, is the renewal rolling or a fixed term, and what is the notice period. Twenty contracts is an afternoon and it will tell you whether this is a real problem for you or a theoretical one.

### 2. Add the notice date as a real field

Not a note. A date property, on the deal or the company record, calculated from the end date and the notice period.

Everything downstream depends on this one existing. Alerts, tasks, reporting and forecasting all need to reference the notice date rather than the end date.

### 3. Re-anchor every alert

Move the whole cadence to count back from the notice date. If you were running 90, 60 and 30 days before the end date, you are now running 90, 60 and 30 days before the notice date, which on a 60-day notice period means 150, 120 and 90 days before the contract actually ends.

That will feel early. It is not. It is the first time the sequence has been correct.

### 4. Report on notice windows, not end dates

A renewal report sorted by contract end date is showing you the wrong quarter. Sort by notice date. The revenue that is genuinely still winnable is the revenue whose notice window has not yet closed.

This one change tends to surprise people, because a chunk of what looked like next quarter's renewal pipeline turns out to have been decided already.

### 5. Send the courtesy reminder

Ready-to-send wording for this, and for the notice you send when you are the one not renewing, is in our [renewal and non-renewal notice templates](/resources/renewal-notice-templates/).


Sixty to ninety days before the notice date, a short note from the account owner confirming the renewal date and terms. Not a marketing email.

It costs you a small number of renewals that would have happened by inattention. It buys you an early warning on every account that was going to leave anyway, and it removes the entire class of dispute where a customer claims they did not know.

Most companies find the trade is clearly worth it, because a customer who was going to churn silently at the end of the term is much cheaper to save at day 90 than at day 0.

---

## Where this usually breaks

**Nobody owns the notice date.** Sales owns the deal, customer success owns the relationship, finance owns the invoice, and the notice date belongs to none of them. Assign it explicitly.

**The notice period is stored as text.** "60 days written notice" in a text field cannot be used in a calculation. It needs to be a number.

**Notice periods are assumed to be uniform.** They are usually not, particularly if contracts were signed over several years or by different people. Check rather than assume.

**Alerts fire to a shared inbox.** A renewal alert with no named owner is a renewal alert that gets ignored. Route to a person and escalate if nothing happens.

**Extensions get recorded as renewals.** This corrupts renewal rate and average contract value at the same time. Keep them separate.

---

## The short version

An evergreen contract renews itself until somebody stops it. A fixed auto-renewal renews for another full term. The difference matters because of what it costs to miss the window.

The end date on the contract is not the deadline. The notice date is, and it is the end date minus the notice period. If your renewal process is anchored to the end date, part of your book is being decided without you.

Store the notice period as a number, calculate the notice date, and drive every alert, task and report from it. That single change is worth more than any tool you could buy.

If you want to know how much of your own renewal book is currently governed by clauses nobody is tracking, that is exactly what a [renewal audit](/renewal-audit-call/) looks at: your real contracts, your real dates, and the gap between when your alerts fire and when the decisions actually get made.

---

## Frequently Asked Questions

**What is an evergreen contract?**
An evergreen contract is one that continues automatically after its initial term ends, with no fixed stop date, until one party gives notice to end it. The word evergreen refers to the fact that the agreement never expires on its own. It is also called an evergreen clause, an evergreen provision, or an automatic renewal clause, though that last term is used loosely and often means something slightly different.

**What is the difference between an evergreen contract and an auto-renewal contract?**
A true evergreen contract rolls on indefinitely, usually converting to a month-to-month or rolling arrangement after the initial term. A fixed auto-renewal contract renews for another defined term, normally the same length as the original, and then faces the same decision again. The practical difference is the exit: an evergreen agreement can usually be ended with short notice at any point, while a fixed auto-renewal locks both sides in for another full term once the notice window closes.

**Are evergreen contracts legal?**
Yes, in business-to-business agreements they are generally enforceable. The complications are mostly consumer-facing. At least 30 states have automatic renewal laws with disclosure and notice requirements, and several apply to some business contracts too. New York requires the provider to notify the customer between 15 and 30 days before renewal, and failure to do so can make the renewal unenforceable. Illinois has similar rules under its Automatic Contract Renewal Act. Take legal advice on your own contracts rather than relying on a general article.

**What is a notice period in an auto-renewal clause?**
The notice period is the window before the contract end date in which either party must say they do not want to renew. Thirty, sixty, and ninety days are the common values. If nobody gives notice inside that window, the contract renews itself. The important consequence is that the real deadline is not the contract end date, it is the end date minus the notice period.

**How much notice do most auto-renewal contracts require?**
Most software contracts with an auto-renewal clause use a notice period between 30 and 90 days. Sixty days is the most common single value in mid-market business software. Enterprise agreements and multi-year deals more often use 90 days, and occasionally 120.

**Can a company automatically renew a contract without telling you?**
In a business-to-business contract, usually yes, if the clause is in the signed agreement and the notice window passes without objection. That is the whole point of the clause. Consumer contracts are different, and several states require an advance reminder before the renewal takes effect. Even where no reminder is legally required, sending one is normal commercial practice and protects the relationship.

**What is the difference between contract renewal and contract extension?**
A renewal starts a new term under the existing agreement, usually on the same or slightly adjusted commercial terms. An extension lengthens the current term without starting a new one, and is normally used as a short bridge while something else is being negotiated. Renewals reset the clock; extensions push it back.

**How do you track evergreen contracts in a CRM?**
Store two dates, not one: the contract end date and the notice date. Calculate the notice date as the end date minus the notice period, store it as its own property, and drive every alert and task from it. Most teams only store the end date, which is why alerts fire after the decision has already been made for them.

**What is a perpetual contract, and is it the same as evergreen?**
No. A perpetual agreement, most often a perpetual software licence, grants a right that does not expire at all. An evergreen contract does expire, repeatedly, and simply renews each time unless somebody stops it. Perpetual means no end; evergreen means no automatic end.

---

**SWOTBee builds HubSpot-native contract and renewal operations for mid-market teams: contract dates and notice periods as real properties, alerts anchored to the date that actually decides the renewal, scheduled renewal deals with line items and uplifts, and NRR reporting, all inside your portal, and you own everything we build.**

[Book a free 30-minute discovery call →](/contactus/)
