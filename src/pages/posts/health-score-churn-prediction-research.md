---
layout: ../../layouts/BlogPostLayout.astro
title: "Does a Customer Health Score Actually Predict Churn? What the Research Shows"
pubDate: "2026-07-29"
description: "Customer health scores are the standard tool for predicting churn, but the research on what actually predicts it is more specific than most health score models assume. What peer-reviewed studies and practitioner data both show about which signals work."
category:
  title: "Revenue Operations"
  href: "/categories/revenue-operations"
modifiedDate: "2026-07-29"
author:
  name: "SWOTBee Team"
  url: "https://swotbee.com"
  imageUrl: "/assets/ico/logo.png"
  bio: "HubSpot-certified consultants specializing in deal automation, renewal pipelines, and CRM migration for mid-market B2B companies."
  linkedin: "https://linkedin.com/company/swotbee"
  expertise:
    - "Revenue Operations"
    - "Customer Success"
    - "Renewal Strategy"
reviewedBy:
  name: "Sharmi"
  title: "Co-Founder, SWOTBee"
  linkedin: "https://www.linkedin.com/in/sharm1la/"
  date: "July 2026"
image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=450&fit=crop"
tags:
  - "Customer Success"
  - "Churn Prediction"
  - "B2B Research"
  - "Revenue Operations"
  - "Renewal Strategy"
seriesName: "What the Research Actually Says"
funnelCta: "renewal-audit"
faqs:
  - q: "Do customer health scores actually predict churn?"
    a: "Some inputs predict it well, others poorly. Mirkovic et al.'s 2022 peer-reviewed study in Applied Sciences found that invoice-level LRFM data alone (Length, Recency, Frequency, Monetary) built robust B2B churn models, with Random Forest significantly outperforming logistic regression. The predictive power comes from specific signal types, not from having a health score at all."
  - q: "Do relationship signals or usage telemetry predict SaaS churn better?"
    a: "A 2024 Aalto University research study comparing the two in a Nordic B2B SaaS company found relation-strength metrics outperformed usage telemetry at predicting churn, though as a single institutional study (not yet a peer-reviewed meta-analysis), this should be treated as a strong data point rather than a settled finding."
  - q: "Is NPS a reliable input for a customer health score?"
    a: "Practitioner data pushes back on this harder than most health score frameworks assume. A widely-discussed analysis by CS consultant Greg Daines reported that satisfaction and NPS scores showed close to zero correlation with retention in his data, and that survey non-respondents churned at more than twice the rate of respondents, a genuinely counterintuitive finding worth testing against your own data before leaning on NPS as a health signal."
  - q: "Why do health scores sometimes fail to catch churn in time?"
    a: "Because most are built on lagging indicators like usage drop-off, which show up after a customer has already disengaged. The practical critique from CS practitioners is that by the time usage has fallen meaningfully, intervention success rates fall sharply, the alert arrives too late to change the outcome."
---

> This is a research-evidence companion to our guides on [renewal risk scoring](/posts/hubspot-renewal-risk-scoring) and [churn-prevention health-score workflows](/posts/hubspot-churn-prevention-health-scores-workflows) in HubSpot, and to our [research on customer success management ROI](/posts/customer-success-management-roi-research). Start there for the operating playbook; this piece checks which health score inputs the evidence actually supports.

**Health scores are the default tool for predicting B2B churn, but the research on what predicts it is narrower and more specific than most health score models assume.** Peer-reviewed studies point to particular signal types, transactional patterns and relationship strength, as the strongest predictors, while a widely-cited practitioner critique argues the satisfaction surveys many health scores lean on show close to zero correlation with actual retention.

---

## What Actually Predicts B2B Churn: The Evidence

Mirkovic et al.'s 2022 peer-reviewed study in *Applied Sciences* tested whether B2B churn could be predicted using nothing but invoice-level data: no support tickets, no NPS, no product usage telemetry, just Length, Recency, Frequency, and Monetary (LRFM) features derived from billing history. The finding: robust churn prediction models can be built from invoice data alone, and Random Forest classifiers significantly outperformed both logistic regression and support vector machines on AUC and detection rate. That's a meaningful data point for any B2B company without mature product analytics: you don't need usage telemetry to start predicting churn, transactional patterns you already have in your billing system carry real predictive signal.

A separate 2024 research study out of Aalto University, conducted inside a Nordic B2B SaaS company, tested a more direct question: does relationship strength or product usage telemetry predict churn better? The finding favored relationship strength metrics over usage data. As a single institutional study rather than a peer-reviewed meta-analysis, this is a strong data point, not a settled fact, but it lines up with the broader pattern our [research on switching costs and B2B renewal](/posts/switching-costs-b2b-renewal-research) already surfaced: relational signals consistently outpredict transactional or usage-only signals across the B2B retention literature.

## What Customer Health Actually Is, According to the Research

The most developed academic framework for what should go into a health score comes from Hochstein et al.'s 2023 study in the *International Journal of Research in Marketing* (covered in more depth in our [CSM research piece](/posts/customer-success-management-roi-research)): customer health as a formative metric built from three distinct dimensions, relationship quality, product usage, and customer value realization, not a single number pulled from one data source. Most commercial health score tools weight product usage and support-ticket sentiment heavily, treating customer engagement almost entirely as a usage metric. The research suggests relationship quality and value realization deserve equal weight, and the evidence above suggests relational signals may carry more predictive power than usage alone, not less.

## The Practitioner Pushback: Lagging Indicators and the NPS Problem

Academic literature isn't the only source of skepticism about health scores. A widely-circulated analysis by customer success consultant Greg Daines makes two specific, testable claims worth taking seriously even though they come from practitioner data rather than a peer-reviewed study: first, that satisfaction and NPS scores show close to zero correlation with retention in his analysis, with survey non-respondents actually churning at more than twice the rate of respondents; second, that most health scores rely on lagging indicators, especially product usage drop-off, that only become visible after a customer has already disengaged, by which point intervention success rates fall sharply.

A parallel Reddit thread among customer success practitioners raises the same concern independently: that health scores frequently fail to flag accounts that go on to churn, and flag accounts that go on to renew just fine. None of this is peer-reviewed evidence, and it should be weighed as practitioner signal, not proof. But it converges with the academic finding above in a specific, useful way: the inputs an off-the-shelf health score defaults to (NPS, usage, support tickets) are not the inputs the evidence most consistently supports.

## Building a Customer Health Score That Reflects the Evidence

Most health scores fail not because the underlying idea is wrong, but because of what feeds them. A customer health score is a composite score, not a single input, and a health score is a predictive metric only when what feeds it actually predicts churn, which is exactly what generic, usage-only defaults fail to do. Health scores built this way behave very differently from the single-signal versions most teams start with.

Most teams don't build a customer health score from scratch, they inherit one from whatever CRM or customer success platform they're already running, Gainsight, Totango, or a native HubSpot property. Building a customer health score that actually reflects what the evidence supports means treating the vendor default as a starting point, not the finished product.

Start with what actually feeds the score. If your dashboard weights product usage metrics at 70% and everything else at 30%, you've built an automated health score that mirrors the lagging-indicator problem the practitioner data flags for customer churn, not a scoring model that reflects the three-dimension framework the research supports. A composite score built from relationship quality, transactional patterns, and value realization will move before usage metrics do, giving customer success teams and customer success managers real time to act instead of reacting after a score drops.

Segment matters here too. A single universal tier of thresholds rarely fits both an SMB account and an enterprise account, since what counts as good account health looks different at each tier of your customer base. SaaS companies with a wide range of contract sizes usually need at least two scoring bands, not one model applied uniformly.

None of this has to be complicated to operationalize. A CRM that already tracks billing history, support tickets, and engagement can surface most of these signals without a separate platform purchase, the evidence above suggests the inputs matter more than the tool. What matters is building in triggers for customer success teams to act proactively, before usage metrics fall and a score drops, not after.

## How This Shows Up in a HubSpot Health-Score Workflow

In HubSpot specifically, this means the health-score property shouldn't be a single usage-based number pulled from one integration. A workflow that blends billing and transactional data (invoice recency, payment consistency), relationship signals (multi-threading depth, executive engagement, meeting cadence), and product usage into one weighted score gets closer to the three-dimension framework than a usage-only score ever will. See our [churn-prevention health-score workflows guide](/posts/hubspot-churn-prevention-health-scores-workflows) for the exact property and workflow setup.

The practical failure mode to avoid is building the score once and never revisiting the weights. Pull your own churned and renewed accounts every quarter and check which inputs actually separated them, the same validation Mirkovic et al. ran on their invoice data. If billing patterns predicted churn better than usage in your business too, the weighting should reflect that, not the vendor default your CRM shipped with. Most teams start with a single property on a basic dashboard and refine it over each quarterly review, a reasonable onboarding path for the model itself, as long as the weighting keeps moving toward the evidence above and not toward whatever was easiest to wire up first.

## What This Means for Your Health Score Model

- **Weight relationship and transactional signals, not just product usage or adoption.** If your [HubSpot health score](/posts/hubspot-churn-prevention-health-scores-workflows) leans mainly on usage telemetry and support ticket volume, the evidence above suggests you're underweighting the categories (relationship strength, billing/transactional patterns) that predict churn best.
- **Treat NPS and customer satisfaction as one input, not the anchor.** Given the practitioner data questioning NPS's correlation with customer retention, validate it against your own churned-account history before trusting it as a primary alert trigger.
- **Build in leading indicators, not just lagging ones.** A score that only reacts once usage has already dropped is, by definition, late. Behavior change and relationship signals that shift before usage does give a CSM more time to act on an at-risk account.
- **Don't assume a low-effort survey response rate is neutral.** If non-respondents churn at meaningfully higher rates, as the practitioner data suggests, silence itself may be a churn risk signal your current model isn't capturing.
- **Segment by customer segment and account value, not one universal score.** An account likely to churn in an SMB segment doesn't necessarily share the same risk profile, or customer lifetime value stakes, as an enterprise account, so a single model weighting can miss both.
- **Validate your own model against your own churned accounts**, the same way Mirkovic et al. validated theirs: pull your last year of churned and renewed accounts and check which inputs actually separated them, don't assume the vendor-default weighting is right for your business. This is also the fastest way to actually reduce churn with the model you already have, rather than waiting on a new tool.

## Frequently Asked Questions

**Do customer health scores actually predict churn?**
Some inputs predict it well, others poorly. Mirkovic et al.'s 2022 peer-reviewed study in *Applied Sciences* found that invoice-level LRFM data alone (Length, Recency, Frequency, Monetary) built robust B2B churn models, with Random Forest significantly outperforming logistic regression. The predictive power comes from specific signal types, not from having a health score at all.

**Do relationship signals or usage telemetry predict SaaS churn better?**
A 2024 Aalto University research study comparing the two in a Nordic B2B SaaS company found relation-strength metrics outperformed usage telemetry at predicting churn, though as a single institutional study (not yet a peer-reviewed meta-analysis), this should be treated as a strong data point rather than a settled finding.

**Is NPS a reliable input for a customer health score?**
Practitioner data pushes back on this harder than most health score frameworks assume. A widely-discussed analysis by CS consultant Greg Daines reported that satisfaction and NPS scores showed close to zero correlation with retention in his data, and that survey non-respondents churned at more than twice the rate of respondents, a genuinely counterintuitive finding worth testing against your own data before leaning on NPS as a health signal.

**Why do health scores sometimes fail to catch churn in time?**
Because most are built on lagging indicators like usage drop-off, which show up after a customer has already disengaged. The practical critique from CS practitioners is that by the time usage has fallen meaningfully, intervention success rates fall sharply, the alert arrives too late to change the outcome.

---

This piece pairs with our guides to [renewal risk scoring](/posts/hubspot-renewal-risk-scoring) and [churn-prevention health-score workflows](/posts/hubspot-churn-prevention-health-scores-workflows) in HubSpot, and with our research on [customer success management ROI](/posts/customer-success-management-roi-research) and [switching costs and B2B renewal](/posts/switching-costs-b2b-renewal-research).

**Most health scores are built on assumptions, not validation. SWOTBee builds HubSpot health-score and risk-scoring workflows grounded in what the evidence and your own churned-account history actually show, not just the default inputs a template ships with.**

[Book a free 30-minute discovery call →](/contactus)
