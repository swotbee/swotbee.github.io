---
layout: ../../layouts/BlogPostLayout.astro
title: "HubSpot Contracts and Renewal Quotes: Complete Setup Guide"
pubDate: "2026-09-10"
modifiedDate: "2026-09-10"
description: "Set up HubSpot Contracts, renewal alerts, renewal deals and renewal quotes in Revenue Hub, with a practical migration checklist and the limits to plan around."
category:
  title: "Revenue Operations"
  href: "/categories/revenue-operations/"
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
reviewedBy:
  name: "Sharmi"
  title: "Co-Founder, SWOTBee"
  linkedin: "https://www.linkedin.com/in/sharm1la/"
  date: "September 2026"
image: "/assets/blog/hubspot-contracts-renewal-quotes-hero.svg"
tags:
  - "HubSpot"
  - "Revenue Hub"
  - "Contracts"
  - "Renewal Quotes"
  - "Renewal Automation"
seriesName: "HubSpot Renewal Pipeline"
pillarUrl: "/posts/hubspot-renewal-pipeline-complete-guide/"
funnelCta: "renewal-audit"
faqs:
  - q: "Does HubSpot have a native contract object?"
    a: "Yes. HubSpot now has a Contracts object in Revenue Hub Professional and Enterprise. It stores committed revenue, dates, line items, billing details, renewal information, activities and contract history."
  - q: "Can HubSpot create a renewal quote automatically?"
    a: "Yes. A deal-based workflow can use the Create renewal quote from contract action. You select the associated contract and renewal quote template, then create a new deal or use an existing deal."
  - q: "Do HubSpot renewal quotes copy line items?"
    a: "Yes, when the renewal quote is created from a HubSpot contract. It inherits the contract's line items, including changes previously accepted through change quotes. This is different from a generic workflow-created deal, which does not copy source-deal line items by itself."
  - q: "What happens when a HubSpot renewal quote is accepted?"
    a: "HubSpot creates a new contract and associates it with the previous contract. The renewed contract appears in the contract activity and history, and future changes are managed from the new contract."
  - q: "Can existing contracts be imported into HubSpot?"
    a: "Yes. HubSpot's current documentation supports importing contracts with a unique custom contract property and associations to line items and deals. Existing subscriptions cannot currently be migrated to contracts."
  - q: "Which HubSpot subscription is required for contract renewals?"
    a: "The Contracts and renewal quote features require Revenue Hub Professional or Enterprise. Creating and managing renewal quotes also requires the relevant seat and object permissions."
---

> This article is part of our [Complete Guide to Building a Renewal Pipeline in HubSpot](/posts/hubspot-renewal-pipeline-complete-guide/).

**HubSpot can now run a native contract renewal path in Revenue Hub Professional and Enterprise: an accepted quote creates a Contract, a contract workflow opens the renewal motion, a renewal quote reuses the contract's line items and terms, and acceptance creates the next associated Contract.** This is a meaningful change from the older deal-only approach. It also introduces a decision: use native Contracts for revenue that originates in Revenue Hub quotes, keep a deal-based path for legacy or external contracts, or run both into one renewal pipeline.

This guide shows the full setup, the exact handoffs between Contract, Deal and Quote, and the limits to test before migrating a live renewal book.

---

## What HubSpot Contracts Changed for Renewals

HubSpot describes Contracts as the centralized source of truth for committed revenue. A Contract can expose contract value, ACV, MRR, ARR, start and end dates, billing information, current and upcoming line items, associated records, renewal status, activities and change history.

That closes an important old gap. Before Contracts, most HubSpot teams represented an active agreement with a closed-won deal plus custom properties. That model still works and remains useful, but it is no longer accurate to say HubSpot has no native contract object or no native renewal path.

The native lifecycle is now:

1. A buyer accepts a Revenue Hub quote.
2. HubSpot creates a Contract associated with the quote, deal, company and contacts.
3. The Contract stores the committed revenue and line-item schedule.
4. A renewal-date workflow creates tasks, a renewal deal, or a renewal quote.
5. The renewal quote inherits the existing Contract's commercial context.
6. When the quote is accepted, HubSpot creates the next Contract and associates it with the previous one.

HubSpot documents the details in [Understand contracts in HubSpot](https://knowledge.hubspot.com/contracts/understand-contracts-in-hubspot) and [Create a renewal quote on a contract](https://knowledge.hubspot.com/quotes/create-a-renewal-quote-on-a-contract).

![Two supported HubSpot renewal architectures: native Contracts and custom deal workflows](/assets/blog/hubspot-native-vs-deal-renewal-paths.svg)

---

## Before You Turn It On: Requirements and Limits

The native route is not available in every portal or for every historical agreement.

| Check | Current requirement or behavior |
|---|---|
| Subscription | Revenue Hub Professional or Enterprise |
| Contract creation and editing | Revenue Hub seat plus the relevant Contract permissions |
| Renewal quote creation | Revenue Hub seat plus Contract and Deal permissions |
| Workflow publishing | Workflow edit and publish permissions |
| Automatic Contract creation | Accepted Revenue Hub quotes when the setting is enabled |
| Legacy quotes | Accepted legacy quotes do not create Contracts |
| Existing Contracts | Can be imported with a unique Contract property and associations |
| Existing subscriptions | Cannot currently be migrated to Contracts |
| Customer access | Customers do not view the CRM Contract record; they receive quotes, invoices and receipts |

Feature documentation changed quickly during the 2026 rollout. For example, early setup guidance said Contract imports were unavailable, while the current [Create and import contracts](https://knowledge.hubspot.com/contracts/create-contracts) article documents the import procedure. Check the live documentation and test in a sandbox before treating any rollout-era limitation as permanent.

---

## Step 1: Choose the Source of Truth

Do this before configuring a workflow. A portal with two competing renewal sources will create duplicate deals, conflicting dates and reports nobody trusts.

Use the native Contracts path when:

- new agreements originate from Revenue Hub quotes;
- you want line items, recurring revenue and billing context on a Contract record;
- Revenue Hub Professional or Enterprise is already justified;
- change quotes and renewal quotes match your commercial process.

Keep or add a deal-based path when:

- contracts originate in an ERP, billing platform, CLM or signed PDF;
- legacy deals do not map cleanly to Revenue Hub Contracts;
- custom pricing, co-terming or renewal creation rules exceed the native flow;
- the team is not licensed for Revenue Hub Professional or Enterprise.

A hybrid is often the honest answer. New Revenue Hub quotes can use Contracts, while imported or externally managed agreements continue to produce renewal deals from canonical date properties. Both paths should feed the same [dedicated renewal pipeline](/posts/hubspot-renewal-pipeline-vs-sales-pipeline/) so ownership, forecasting and reporting stay consistent.

---

## Step 2: Configure Contract Creation

In HubSpot, go to **Settings, Objects, Contracts** and enable **Create contracts from accepted quotes**. Contracts then inherit the accepted quote's line items, terms and associated records.

Test the date behavior with all three product patterns you sell:

- **Fixed-term recurring line items:** the Contract end date is the latest line-item end date.
- **Automatically renewing line items:** the Contract is evergreen and does not receive an end date. MRR and ARR remain available, but TCV and ACV are not calculated for evergreen Contracts.
- **One-time-only line items:** the Contract does not receive an end date.

That distinction matters because a renewal-date workflow cannot trigger from a date that does not exist. Evergreen agreements need a different review trigger, usually a notice date, anniversary date or scheduled commercial review date.

---

## Step 3: Configure Renewal Management

Under the Contract object's **Renewals** settings, choose when the approaching-renewal alert appears. HubSpot also supports Contract-based workflow enrollment using the Renewal date property.

For a normal fixed-term B2B contract, use the alert as a visible warning and a workflow as the accountable process:

| Timing | Workflow action | Owner output |
|---|---|---|
| T-120 | Create or verify the renewal deal | Named owner, amount and close date |
| T-90 | Create health and stakeholder review tasks | Written risk tier and account plan |
| T-60 | Create the renewal quote and approval task | Approved pricing and term |
| T-30 | Escalate if the quote is not sent or accepted | Manager-visible recovery plan |
| T-0 | Close, record outcome and schedule the next cycle | Clean renewal history and forecast |

For auto-renewing agreements, trigger operational work from the contractual notice date rather than the end date. Store the notice period and calculated notice date as custom properties if the native Contract does not represent your decision deadline. The broader timing model is in our [T-120 contract renewal checklist](/posts/contract-renewal-process-checklist/).

---

## Step 4: Build the Renewal Quote Template

Go to **Settings, Objects, Quotes, Quote templates**, open the template library and create a Renewal Quote Template. HubSpot lets you configure and lock the modules sellers should not change, including the cover letter, executive summary, terms, payment options and acceptance method.

A practical template should lock the legal and billing baseline while leaving the commercial variables editable:

| Template area | Recommended control |
|---|---|
| Seller and buyer details | Pre-fill from the Contract |
| Billing contact and address | Allow buyer update only if finance approves the process |
| Line items | Inherit, then require seller review |
| Effective date | Require an explicit confirmation |
| Term length | Show it and prevent accidental removal |
| Payment terms | Inherit unless finance approves a change |
| Uplift or discount | Require approval above a defined threshold |
| Acceptance method | Standardize by deal value and region |

This is the difference between automation and blind copying. Inheritance saves time; the review gate prevents last year's quantities, contacts or discounts from becoming this year's mistake.

---

## Step 5: Create Renewal Deals and Quotes

A renewal quote must be associated with a deal. You can create the deal during the manual renewal quote process, automatically create a new deal through Contract settings, or select a new or existing deal in the **Create renewal quote from contract** workflow action.

The recommended reporting pattern is a dedicated renewal pipeline. It keeps renewable revenue separate from new business and gives every renewal a commercial owner, stage, forecast category and close date.

When the renewal quote is created from a Contract, it includes:

- the associated company and contacts;
- billing contacts from the current Contract;
- the current Contract's line items, including accepted mid-term changes;
- the same term length by default;
- matching payment terms.

This solves a different problem from generic deal cloning. A normal workflow-created deal still does not automatically recreate another deal's line items. The native inheritance occurs because the renewal quote is built from the Contract. If your process starts with a legacy deal rather than a Contract, use the [deal-based renewal automation path](/posts/hubspot-renewal-deal-workflow-automation/) and plan explicitly for line-item creation.

---

## Step 6: Define What Happens After Acceptance

When the customer accepts the renewal quote, HubSpot creates a new Contract and associates it with the previous Contract. The relationship and renewal event appear in Contract activities and history. From the renewal effective date, future changes are managed from the new Contract.

Add a post-acceptance control workflow even when the core lifecycle is native:

1. Confirm the new Contract association exists.
2. Mark the renewal deal Closed Won.
3. Compare renewed ARR with prior ARR and classify expansion, contraction or flat renewal.
4. Notify finance and the CSM of the effective date and billing terms.
5. Create the next account review or notice-date task.
6. Flag any mismatch for RevOps review instead of silently updating the source data.

That final verification is what makes [NRR and GRR reporting](/posts/hubspot-renewal-nrr-grr-dashboard-reporting/) dependable. Contract history explains what changed; the renewal deal explains the commercial outcome.

---

## A Copy-Paste Pilot Checklist

Run a five-contract pilot before enabling the flow across the book:

- [ ] One fixed-term contract with a single recurring line item
- [ ] One contract with several recurring line items and different quantities
- [ ] One contract changed mid-term through a change quote
- [ ] One evergreen contract with a notice or review date
- [ ] One imported historical contract associated with line items and a deal
- [ ] Renewal alert appears at the configured time
- [ ] Workflow creates or selects the correct renewal deal
- [ ] Renewal quote uses the intended template
- [ ] Company, contacts, billing contacts, line items, term and payment terms are correct
- [ ] Approval rules catch an unexpected discount or uplift
- [ ] Accepted quote creates and associates the new Contract
- [ ] Renewal deal and retention reports show the expected outcome

Do not use a production customer as the first test. A renewal workflow can create a real deal and quote, so keep the pilot records clearly labeled and exclude them from executive reporting.

---

## Native Contracts vs a Renewal App

Native Contracts are enough when the quote is the clean source of truth and the renewal follows a standard term, pricing and approval path. An app or custom automation becomes useful when you need to normalize legacy data, apply product-specific uplift rules, filter one-time line items, handle complex co-terming, create renewals in bulk, or maintain a mixed architecture across billing and contract systems.

The decision should now be based on those specific gaps, not on the old statement that HubSpot has no Contract object. Review the [HubSpot renewal apps comparison](/compare/hubspot-renewal-apps/) against the exact exceptions found in your pilot.

---

## Frequently Asked Questions

**Does HubSpot have a native contract object?**

Yes. HubSpot now has a Contracts object in Revenue Hub Professional and Enterprise. It stores committed revenue, dates, line items, billing details, renewal information, activities and contract history.

**Can HubSpot create a renewal quote automatically?**

Yes. A deal-based workflow can use the Create renewal quote from contract action. You select the associated Contract and a renewal quote template, then create a new deal or use an existing deal.

**Do HubSpot renewal quotes copy line items?**

Yes, when the renewal quote is created from a HubSpot Contract. It inherits the Contract's line items, including changes previously accepted through change quotes. A generic workflow-created deal still does not copy source-deal line items by itself.

**Can existing contracts be imported into HubSpot?**

Yes. Current HubSpot documentation supports importing Contracts with a unique custom Contract property and associations to line items and deals. Existing subscriptions cannot currently be migrated to Contracts.

**What should we implement first?**

Choose the source of truth and pilot the complete acceptance loop first. Do not start by building every reminder. Prove that an accepted renewal quote creates the correct next Contract and retention outcome, then add the T-120 cadence around it.

---

**SWOTBee designs the renewal architecture around the contracts you actually have: native Revenue Hub Contracts where they fit, deal-based automation where they do not, and one renewal forecast across both.**

[Book a free 30-minute discovery call →](/contactus/)
