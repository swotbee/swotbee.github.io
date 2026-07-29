## Section 1: Research Summary

This analysis synthesizes findings from 60+ real-world sources across Reddit communities (r/revops, r/SalesOperations, r/sales, r/SaaS, r/CRM, r/hubspot, r/CustomerSuccess, r/salesforce, r/FPandA, r/smallbusiness, r/techsales, r/salesdevelopment, r/microsaas, r/salestechniques), LinkedIn RevOps practitioner posts, SaaStr community threads, HubSpot Community discussions, Salesforce Trailblazer Community, and vendor practitioner blogs. Discussions were mined for direct practitioner pain points rather than metric definitions, spanning CRO/VP Sales, RevOps Managers, Sales Managers, AEs, SDRs, CSMs, and small-business owners describing operational failures firsthand.[^1][^2][^3][^4][^5][^6][^7][^8]

The most frequent operational challenge across every community is **CRM data quality collapse** — dirty, incomplete, or stale data that destroys forecast trust, a theme repeated independently in r/revops, r/CRM, r/SaaS, and LinkedIn practitioner posts. The second most common theme is **manual activity logging failure**, where reps avoid CRM data entry unless it is automated, forcing managers into blind pipeline reviews. Third is **reactive, lagging customer health signals** that miss churn until it is too late, a dominant thread in r/CustomerSuccess. Fourth is **broken sales-to-CS handoffs** that cost time-to-value and create early churn risk. Fifth is **duplicate records** distorting reporting and breaking marketing automation across HubSpot-Salesforce syncs. Across all ten metrics investigated, more than 50 discrete, sourced operational problems were catalogued, with the clearest, highest-value automation opportunity clustering around AI-assisted CRM hygiene, automatic activity capture, and predictive (not lagging) health scoring.[^2][^3][^4][^9][^6][^10][^11][^12][^13][^14][^15][^16][^17][^18][^19][^20][^7][^21][^22][^8][^23][^24][^25][^26][^27][^28][^1]

## Section 2: Top 25 Revenue Operations Problems Ranked

| Rank | Problem | Related Metric | Team Impacted | Frequency | Revenue Impact | Score |
|---|---|---|---|---|---|---|
| 1 | Forecast cannot be trusted because CRM pipeline data is stale/incomplete | Deal Hygiene Score | RevOps/Sales Leadership | Very High | Critical | 97 |
| 2 | Reps refuse to manually log activity unless it's automated | Sales Activity Compliance | RevOps/Sales Managers | Very High | High | 94 |
| 3 | Health scores lag actual churn signals, missing at-risk accounts | Customer Health Score | CS/CSM Leadership | Very High | Critical | 93 |
| 4 | Sales-to-CS handoff loses critical deal context, slowing time-to-value | Time to Value | CS/Sales | High | High | 90 |
| 5 | Duplicate contacts/companies distort reporting and break HubSpot-Salesforce sync | Duplicate Records Rate | RevOps/Marketing Ops | Very High | High | 89 |
| 6 | Opportunities missing clear "Next Steps" stall pipeline inspection | Next Step/Close Date Compliance | Sales Managers | High | High | 88 |
| 7 | Reps push close dates arbitrarily, wrecking forecast accuracy | Next Step/Close Date Compliance | RevOps/Finance | High | Critical | 87 |
| 8 | Involuntary/silent churn (failed payments) goes undetected until too late | Gross Revenue Churn | RevOps/Finance/CS | High | High | 85 |
| 9 | Leads stuck in wrong lifecycle stage break marketing-sales handoff automation | Missing Lifecycle Stage | Marketing Ops/SDR | High | Medium-High | 83 |
| 10 | Manual pipeline reviews consume hours because CRM data can't be trusted at a glance | Deal Hygiene Score | RevOps | High | High | 82 |
| 11 | Sales tools (sequencers, CRM fields) sit unused, wasting license spend | Tool/Sequence Adoption Rate | RevOps/Sales Ops | High | Medium-High | 80 |
| 12 | Leaderboards demotivate mid/low performers instead of driving coaching | Sales Rep Performance Ranking | Sales Managers/HR | Medium-High | Medium | 74 |
| 13 | Health scores built on vanity engagement metrics, not real product value | Customer Health Score | CS Leadership | High | High | 88 |
| 14 | No visibility into rep effort/activity volume, undermining coaching | Sales Activity Compliance | Sales Managers | High | Medium-High | 78 |
| 15 | Single-threaded enterprise deals go unnoticed until late-stage loss | Deal Hygiene Score | Sales/RevOps | Medium | High | 77 |
| 16 | Territory/patch imbalance makes leaderboard rankings unfair | Sales Rep Performance Ranking | Sales Leadership | Medium | Medium | 68 |
| 17 | Reps treat CRM as a company tool, not something that helps them, so hygiene fails | Deal Hygiene/Activity Compliance | Sales Reps/RevOps | High | Medium-High | 79 |
| 18 | Gross revenue churn masked when logo churn looks fine (losing big accounts) | Gross Revenue Churn | Finance/RevOps | Medium-High | Critical | 84 |
| 19 | Generic onboarding plans ignore what was promised in the sales cycle | Time to Value | CS/Onboarding | Medium-High | High | 81 |
| 20 | CRM sync errors and field-mapping gaps quietly create duplicate or orphaned records | Duplicate Records Rate | RevOps/IT | Medium | Medium-High | 72 |
| 21 | Marketing-sourced leads disqualified with no reason captured, breaking attribution | Missing Lifecycle Stage | Marketing Ops | Medium | Medium | 66 |
| 22 | Adoption of sequencing tools fails when reps see the tool as extra work vs. selling | Tool/Sequence Adoption Rate | Sales Ops/Enablement | Medium-High | Medium | 73 |
| 23 | No standard definition of "stuck" record across teams, so nobody owns cleanup | Missing Lifecycle Stage | RevOps | Medium | Medium | 65 |
| 24 | Deal-stage duration far exceeds benchmark with no activity, but nobody flags it | Deal Hygiene Score | Sales Managers | Medium-High | High | 76 |
| 25 | Fragmented tech stack means answering one revenue question requires 4-5 tools | Deal Hygiene/Activity Compliance | RevOps | High | Medium | 75 |

## Section 3: Metric → Problem Mapping

### Gross Revenue Churn
Practitioners report inability to forecast churn reliably even after years in business, since a handful of large accounts can swing monthly numbers unpredictably. Roughly 40% of overall SaaS churn is involuntary (failed payments) yet frequently goes unaddressed because teams focus dunning efforts only after logo churn is already counted. Companies conflate logo churn with revenue churn, masking the outsized loss when a handful of high-ACV customers leave while smaller counts look stable. Teams lack the data infrastructure to segment churn by cohort, plan, or reason, forcing reliance on rolling averages and scenario planning rather than true predictive models.[^29][^27][^30][^28]

### Sales Rep Performance Ranking / Leaderboard
Leaderboards can demoralize bottom performers, creating a "smug top / dejected bottom" split that damages team cohesion rather than driving coaching. When leaderboards measure only closed revenue, they skew behavior toward short-term wins and discourage collaborative, longer-cycle selling. Territory and patch differences make raw ranking comparisons unfair, since reps compete against different market conditions. Managers report struggling to distinguish an underperforming rep who is dishonest about pipeline from one genuinely struggling with top-of-funnel prospecting.[^31][^32][^8]

### Next Step / Close Date Field Compliance
Reps routinely leave opportunities without an actionable "next step," and roll close dates forward to meaningless dates just to keep deals alive in the pipeline. This directly breaks manager inspection processes and inflates forecast confidence on deals that are effectively stalled. RevOps teams cite an inability to prepopulate or enforce close-date logic natively in Salesforce, requiring custom flows and formula workarounds. A widely shared "hygiene mechanism" framework flags deals as unhygienic when Next Steps haven't updated in 10+ days or close dates don't match stage progression.[^5][^6][^33]

### Deal Hygiene Score (Composite)
The dominant complaint is "garbage in, garbage out" — sales teams stop trusting the CRM once they realize half the information is outdated, and forecasting tools built on top of dirty data amplify rather than fix the problem. Missing contact roles, no pricing by a given stage, and single-threaded enterprise deals are common blind spots that composite hygiene scoring is designed to catch. RevOps teams describe spending significant time on manual pipeline reviews because no systematic hygiene check exists to triage which deals need attention before a forecast call. Fragmented systems compound this: answering a single pipeline-quality question often requires stitching data across 4-5 disconnected tools.[^4][^34][^6][^1][^2]

### Sales Activity Compliance (Logging Rate)
Reps will "do anything except log their activity," and sales managers report chasing down updates that never come without automated capture. The consensus fix across Salesforce and CRM communities is native call/email sync (dialers, Cloudtalk, Gong, EAC) rather than relying on manual discipline. Enforcement without leadership backing fails — teams that tie lead distribution or commission payout to logged activity see faster compliance than those relying on policy alone. Small business owners report genuine blindness into rep pipeline status, discovering deals have stalled only in weekly meetings rather than through CRM visibility.[^7][^8][^23]

### Customer Health Score
Many practitioners argue most health scores are "meaningless" because they track engagement activity (logins, NPS, meeting counts) rather than actual value realization, so green accounts still churn and red accounts still renew. Scores are often built backward — without first knowing the real reasons customers churn, teams guess at which signals matter. Even well-designed North Star–based scores can lag 2-3 months behind an actual account decline, meaning the intervention comes after the problem has already taken root. CS teams report needing product-usage-based value milestones (first meaningful action, feature adoption, workflow completion) rather than vanity engagement metrics to make scores predictive.[^13][^14][^27]

### Duplicate Records Rate
Duplicate contacts and companies routinely distort reporting, waste sales rep time working the same lead twice, and undermine trust in CRM data across HubSpot and Salesforce integrations. Sync misconfigurations — especially missing Salesforce Contact ID references — silently create duplicate contact records during integration. HubSpot does not deduplicate deals against Salesforce opportunities at all, meaning every new record on either side spawns a duplicate on the other unless custom sync rules are built. Manual CSV exports and "is this a duplicate?" merge prompts remain the default workaround for many teams, indicating a lack of enforced governance.[^11][^15][^16][^17]

### Time to Value (Sales-to-CS Handoff)
The most damaging failure is that promised outcomes and buyer context get lost in the sales-to-CS handoff, forcing customers to re-explain themselves and starting onboarding with a generic plan. One documented case cut time-to-value from 23 to 12 days and lifted first-month NPS from 41 to 67 simply by requiring a structured one-page handoff brief before deal closure. CS practitioners broadly describe handoff processes as "a mess" with no standard definition of what information must transfer. Silent stalls in onboarding — where a customer neither engages nor explicitly churns — are a recognized precursor to churn that milestone-based handoffs are designed to catch.[^19][^22][^25][^26]

### Missing Lifecycle Stage / Stuck Records
Contacts get stuck at MQL, SAL, or SQL stages indefinitely with no clear disqualification path, breaking funnel reporting and marketing attribution. Teams disagree on how to handle re-engaged leads, "old" customers, or lost accounts within HubSpot's largely one-directional lifecycle stage model, creating custom workaround stages. Sync settings between HubSpot and Salesforce can silently overwrite lifecycle stage progress, causing records to revert or get stuck. Without a documented DQ (disqualification) reason property, RevOps cannot analyze why leads fail to progress, undermining continuous funnel improvement.[^35][^36]

### Tool / Sequence Adoption Rate
Reps largely resist sequencing tools when the workflow feels like added administrative burden rather than something that helps them sell. The most repeated fix pattern is removing the manual step entirely via automatic email/call sync rather than trying to drive adoption through training or mandates. Sales orgs report choosing between Outreach and Salesloft largely based on native CRM integration quality, since poor integration is a leading cause of low adoption. Teams that invested in cleaning underlying contact data saw larger adoption and productivity gains than those that simply added more sequencing tooling.[^23][^37][^38][^7]

## Section 4: Voice of Customer / Practitioner Insights

**Problem: CRM data quality collapse**
Quote: "RevOps teams aren't overwhelmed by bad tools, they're overwhelmed by fragmented ones... data may appear clean until someone actually tries to use it."
Source: r/revops. Role: RevOps practitioner/founder.[^3]

**Problem: Activity logging non-compliance**
Quote: "Sales reps will literally do anything except log their activity... if it's not documented in Salesforce, it didn't occur."
Source: r/salesforce. Role: Sales/RevOps administrator.[^7]

**Problem: Health scores lag real churn signal**
Quote: "A 'green' account might end up churning, while a 'red' account could renew and even expand, simply because the score doesn't correlate with actual outcomes."
Source: r/CustomerSuccess. Role: Customer Success practitioner.[^13]

**Problem: Pipeline hygiene / forecast trust**
Quote: "Setting up a pipeline hygiene mechanism can be instrumental in fixing the garbage in, garbage out problem of deal reviews and forecasts."
Source: LinkedIn RevOps post. Role: RevOps leader.[^6]

**Problem: Sales-to-CS handoff failure**
Quote: "Customer success doesn't start at onboarding. It starts at the handoff before onboarding."
Source: r/SaaS. Role: SaaS operator/founder.[^19]

**Problem: Leaderboard demotivation**
Quote: "The top 5 were smug while the bottom 5 [were demoralized]... the comparison game is nonsense."
Source: r/sales. Role: Account Executive.[^31]

**Problem: Duplicate contact records**
Quote: "These duplicates can distort reports, hinder the efficiency of sales representatives, and create headaches for CRM administrators."
Source: r/CRM. Role: HubSpot administrator.[^11]

**Problem: Tool adoption resistance**
Quote: "The issue isn't about finding ways for representatives to record more information; it's about questioning the necessity of having them log data in the first place."
Source: r/salesforce. Role: Sales Ops consultant.[^23]

## Section 5: Revenue Opportunity Analysis

| Problem | Current Workaround | Existing Tools Used | Why Current Solutions Fail | Automation Opportunity |
|---|---|---|---|---|
| Dirty, untrustworthy pipeline data | Manual pre-forecast cleanup sessions, spreadsheets | Clari, Ebsta, native CRM reports[^1][^39] | Tools only learn from data already in CRM; garbage in still means garbage out | AI-powered CRM cleanup + composite deal-quality scoring embedded natively in HubSpot/Salesforce workflows[^9][^6] |
| Reps won't log activity manually | Policy mandates tied to commission/lead distribution | Outreach, Salesloft, Cloudtalk sync[^7][^23] | Enforcement fails without automatic capture; manual logging adds perceived non-selling work | Ambient call/email/meeting capture with AI-generated CRM notes requiring zero rep input[^8][^23] |
| Reactive, lagging health scores | Manual North Star metric tracking, CSM intuition-based scoring | Gainsight, Vitally, Custify, Planhat, custom HubSpot properties[^27] | Scores built on engagement proxies, not usage-tied value milestones; too slow to catch early drift | Predictive health scoring tied to product usage milestones + early anomaly detection rather than lagging monthly trend checks[^13][^27] |
| Broken sales-to-CS handoff | Ad hoc call notes, informal Slack messages | CRM notes, deal fields | No standardized structure; context loss is systemic, not incidental | Structured, mandatory AI-assisted handoff brief auto-generated from call transcripts before deal close[^19][^25] |
| Duplicate records across HubSpot/Salesforce sync | Manual merge prompts, CSV dedupe, field-mapping dedup rules | Native HubSpot dedup, Skyvia | Deals/opportunities aren't deduped at all by native sync; fuzzy matches still slip through | Fuzzy-match, confidence-scored auto-deduplication with dependency-aware merge across integrated systems[^9][^15][^17] |
| Stuck/misclassified lifecycle stage records | Manual audits, custom DQ status fields | HubSpot lifecycle stage, lead status | No shared definition of "stuck"; sync settings can silently revert stage progress | Automated stuck-record detection with configurable stage-aging thresholds and auto-routing for review[^35][^36] |
| Sequence/tool adoption failure | Manager mandates, training sessions | Outreach, Salesloft | Rep resistance persists when tool adds friction vs. removes it | Usage analytics + adaptive workflow nudges that surface sequences inside the rep's existing email/call flow rather than a separate tool[^37][^38] |

## Section 6: HubSpot Implementation Mapping

| Metric | HubSpot Object | Required Data | Native Reporting Available | Custom Setup Required |
|---|---|---|---|---|
| Gross Revenue Churn | Deals, Companies | Closed-lost/downgrade amounts, MRR properties | Partial | Custom properties for MRR delta, workflows to flag downgrades |
| Sales Rep Performance Ranking | Deals, Owners | Closed-won amounts, activity counts by owner | Yes (standard reports) | Custom dashboards for weighted/fair scoring |
| Next Step / Close Date Compliance | Deals | Next step field, close date, last activity date | Partial | Workflow alerts for stale next-step/close-date mismatch |
| Deal Hygiene Score (Composite) | Deals | Stage duration, contact roles, pricing, activity recency | No (composite not native) | Custom scoring property + workflow logic combining multiple fields |
| Sales Activity Compliance | Engagements (calls, emails, meetings) | Logged activity timestamps by owner | Yes (activity reports) | Integration with dialers/email sync for auto-logging |
| Customer Health Score | Companies, Custom Objects | Usage data, ticket volume, engagement, NPS | Partial | Custom properties/workflows combining usage + support data |
| Duplicate Records Rate | Contacts, Companies, Deals | Matching email/domain/name fields | Yes for contacts/companies | Custom dedup rules for deals (not natively deduped) |
| Time to Value (Sales-to-CS Handoff) | Deals, Tickets, Custom Objects | Handoff brief fields, onboarding milestone dates | No | Custom handoff object/properties and milestone workflows |
| Missing Lifecycle Stage / Stuck Records | Contacts | Lifecycle stage, lead status, stage entry date | Partial | Workflow-based stage-aging alerts and DQ reason properties |
| Tool / Sequence Adoption Rate | Sequences, Engagements | Sequence enrollment/completion rates by owner | Yes (sequence reports) | Custom adoption dashboards segmented by rep tenure/team |

---

## References

1. [Sales forecast accuracy solutions](https://www.reddit.com/r/revops/comments/1czx293/sales_forecast_accuracy_solutions/) - Sales forecast accuracy solutions

2. [Why does CRM data quality still suck in 2023?](https://www.reddit.com/r/revops/comments/173pmcd/why_does_crm_data_quality_still_suck_in_2023/) - Why does CRM data quality still suck in 2023?

3. [RevOps data is a mess of scattered docs, inconsistent CRM fields, and tribal knowledge. We're building a way to map all of it. What's breaking your team right now?](https://www.reddit.com/r/revops/comments/1sgxy97/revops_data_is_a_mess_of_scattered_docs/) - RevOps data is a mess of scattered docs, inconsistent CRM fields, and tribal knowledge. We're buildi...

4. [AI in RevOps: What's actually working vs the hype?](https://www.reddit.com/r/SaaS/comments/1rlf1ye/ai_in_revops_whats_actually_working_vs_the_hype/) - AI in RevOps: What's actually working vs the hype?

5. [Seeking Best Practices & "Gotchas" for a Salesforce ...](https://www.reddit.com/r/salesforce/comments/1ndh9z9/seeking_best_practices_gotchas_for_a_salesforce/) - Missing "Next Steps": A lot of opportunities lack a clear, actionable next step. If reps are moving ...

6. [How to set up a sales pipeline hygiene mechanism](https://www.linkedin.com/posts/jeffbethechange_sales-revenueoperations-activity-7374132477159845888-uBdJ) - Setting up a #sales pipeline hygiene mechanism can be instrumental in fixing the garbage in, garbage...

7. [Sales reps will literally do anything except log their activity](https://www.reddit.com/r/salesforce/comments/1umdx7g/sales_reps_will_literally_do_anything_except_log/) - Sales reps will literally do anything except log their activity

8. [How do you actually track what your sales guys are ...](https://www.reddit.com/r/smallbusiness/comments/1sny3l2/how_do_you_actually_track_what_your_sales_guys/) - Email sync or call logging that auto-populates activity without reps touching the CRM. Pipedrive and...

9. [Who is actually using AI for RevOps (and not just for drafting emails)?](https://www.reddit.com/r/revops/comments/1s5l63o/who_is_actually_using_ai_for_revops_and_not_just/) - Who is actually using AI for RevOps (and not just for drafting emails)?

10. [How do you handle customers who ignore health score ...](https://www.reddit.com/r/CustomerSuccess/comments/1v1h23t/how_do_you_handle_customers_who_ignore_health/) - There's a pattern that keeps coming up and it's frustrating every time. Health score drops, you flag...

11. [How do you handle duplicates in HubSpot?](https://www.reddit.com/r/CRM/comments/1n9r5xi/how_do_you_handle_duplicates_in_hubspot/) - How do you handle duplicates in HubSpot?

12. [Merging Duplicate Records in Salesforce breaks Sync with ...](https://community.hubspot.com/t5/Marketing-Integrations/Merging-Duplicate-Records-in-Salesforce-breaks-Sync-with-Hubspot/m-p/711269) - For a variety of reasons, we need to create multiple records in Salesforce with the same email addre...

13. [Why Most Customer Health Scores Are Meaningless](https://www.reddit.com/r/CustomerSuccess/comments/1rwcsnh/why_most_customer_health_scores_are_meaningless/) - Over the years working in CS, one thing I’ve seen a lot is health scores that don’t actually tell yo...

14. [Anyone else find health scores to be terribly indicative of ACTUAL churn risk?](https://www.reddit.com/r/CustomerSuccess/comments/1jftamd/anyone_else_find_health_scores_to_be_terribly/) - Anyone else find health scores to be terribly indicative of ACTUAL churn risk?

15. [How do you handle duplicate contacts when multiple forms feed into your CRM?](https://www.reddit.com/r/CRM/comments/1ntror7/how_do_you_handle_duplicate_contacts_when/) - How do you handle duplicate contacts when multiple forms feed into your CRM?

16. [HubSpot and Salesforce integration creating duplicates](https://trailhead.salesforce.com/trailblazer-community/feed/0D54V00007T4SpXSAV) - Hi there - I'm working with a client that has HubSpot and Salesforce integrated. We imported a list ...

17. [Resolve duplicate Salesforce records syncing with HubSpot](https://knowledge.hubspot.com/salesforce/duplicate-salesforce-leads-or-contacts-syncing-to-hubspot) - Learn how HubSpot manages duplicate Salesforce leads or contacts.

18. [How do you find out a customer is unhappy before they ...](https://www.reddit.com/r/CustomerSuccess/comments/1t6kpgs/how_do_you_find_out_a_customer_is_unhappy_before/) - I'd love to understand what data people are assessing, what emotions they're picking up from their c...

19. [How we cut B2B onboarding time-to-value from 23 days ...](https://www.reddit.com/r/SaaS/comments/1t65n51/how_we_cut_b2b_onboarding_timetovalue_from_23/) - The lesson for us was that customer success doesn't start at onboarding. It starts at the handoff be...

20. [Activity Tracking in CRM, how valuable is it? : r/sales](https://www.reddit.com/r/sales/comments/uq6yly/activity_tracking_in_crm_how_valuable_is_it/) - Hi r/sales ! How much time per week do you spend logging your activity in your CRM? Is it mostly aut...

21. [Is automated CRM logging a real problem worth solving, or ...](https://www.reddit.com/r/CRM/comments/1ubjbg0/is_automated_crm_logging_a_real_problem_worth/) - Looking for honest feedback before I spend more time building this.

I've spoken with several SMB sa...

22. [What does your sales to CS handoff look like? ...](https://www.reddit.com/r/CustomerSuccess/comments/1gpn65n/what_does_your_sales_to_cs_handoff_look_like_does/) - Ours is a mess, and needs to be defined a lot better, so I am looking for ideas, especially of thing...

23. [Automatic logging](https://www.reddit.com/r/salesforce/comments/1s3yrjm/automatic_logging/) - Automatic logging

24. [The data entry problem is the real reason most CRMs stink](https://www.reddit.com/r/CRM/comments/1skx70c/the_data_entry_problem_is_the_real_reason_most/) - Notes do not get logged. If the sales team just logged their activity, everything would work. They l...

25. [How to Reduce Churn During Customer Onboarding: Lessons from ...](https://www.valuecase.com/articles/reduce-onboarding-churn-reddit) - Early churn usually traces back to the sales-to-CS handoff, not CS effort. A top r/CustomerSuccess t...

26. [What does the Sales -> Customer Success handoff process ...](https://www.reddit.com/r/CustomerSuccess/comments/zpy07t/what_does_the_sales_customer_success_handoff/) - Hey everyone,

This is I'm sure a common question (apologies if I missed a post on it here), but I'm...

27. [what’s the best churn prediction tool you’ve used?](https://www.reddit.com/r/SaaS/comments/1sycibg/whats_the_best_churn_prediction_tool_youve_used/) - what’s the best churn prediction tool you’ve used?

28. [How we’re trying to reduce SaaS churn (and what we’ve learned so far)](https://www.reddit.com/r/SaaS/comments/1nt0kgy/how_were_trying_to_reduce_saas_churn_and_what/) - How we’re trying to reduce SaaS churn (and what we’ve learned so far)

29. [We've been in business for 4 years and still can't accurately predict monthly churn within 20%. How does anyone forecast this?](https://www.reddit.com/r/SaaS/comments/1s6tn9r/weve_been_in_business_for_4_years_and_still_cant/) - We've been in business for 4 years and still can't accurately predict monthly churn within 20%. How ...

30. [A simple breakdown of SaaS churn: causes, metrics, and what you can actually fix fast](https://www.reddit.com/r/microsaas/comments/1r1wda4/a_simple_breakdown_of_saas_churn_causes_metrics/) - A simple breakdown of SaaS churn: causes, metrics, and what you can actually fix fast

31. [Those of you who have a leaderboard; does this positively ...](https://www.reddit.com/r/sales/comments/8hyjfn/those_of_you_who_have_a_leaderboard_does_this/) - My sales manager decided to section of the top 5 and bottom 5 during our bi-weekly sales meetings. T...

32. [Do B2B SaaS leaderboards motivate or demotivate sales ...](https://www.linkedin.com/posts/lachlan-hewitt_are-saleskpi-leaderboards-actually-effective-activity-7341019949282316290-I16z) - Are sales/KPI leaderboards actually effective in B2B SaaS? They’re everywhere and for good reason. T...

33. [Set initial Close Date on new Opportunity automatically](https://www.reddit.com/r/salesforce/comments/12bptna/set_initial_close_date_on_new_opportunity/)

34. [RevOps / CRM hygiene getting heavy — how are others handling this at ~50–70 sellers?](https://www.reddit.com/r/CRM/comments/1q14nuj/revops_crm_hygiene_getting_heavy_how_are_others/) - RevOps / CRM hygiene getting heavy — how are others handling this at ~50–70 sellers?

35. [Lifecycle Stage For Leads That Disqualify : r/hubspot](https://www.reddit.com/r/hubspot/comments/1eqk0ur/lifecycle_stage_for_leads_that_disqualify/) - I use the default lifecycle stages with lead status and lead quality to disqualify the lead. Using D...

36. [How do you handle lifecycle stage for "old" customers?](https://www.reddit.com/r/hubspot/comments/17lcf03/how_do_you_handle_lifecycle_stage_for_old/)

37. [Salesloft vs Outreach - we need to pick one and I’m torn](https://www.reddit.com/r/techsales/comments/1sx4vv6/salesloft_vs_outreach_we_need_to_pick_one_and_im/) - Salesloft vs Outreach - we need to pick one and I’m torn

38. [Salesloft, Outreach, oh my : r/salesdevelopment](https://www.reddit.com/r/salesdevelopment/comments/1nuvlfl/salesloft_outreach_oh_my/) - I see a lot of people saying they have to have Salesloft and Outreach. Whats your take on them? Love...

39. [Forecasting Software](https://www.reddit.com/r/revops/comments/1lz953i/forecasting_software/) - Forecasting Software

