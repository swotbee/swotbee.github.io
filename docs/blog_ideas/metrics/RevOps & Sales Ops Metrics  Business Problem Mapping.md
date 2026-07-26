# RevOps & Sales Operations Metrics: Problem-to-Metric Mapping Research

## Section 1: Research Summary

This research synthesizes findings from 30+ independent sources spanning Reddit communities (r/revops, r/SalesOperations, r/sales, r/SaaS, r/b2bmarketing, r/FPandA, r/techsales, r/StartupsHelpStartups), HubSpot Community threads, LinkedIn posts from RevOps leaders and CROs, RevOps Co-op webinars, DailyRevOps, and industry benchmarking publications. Over 50 discrete practitioner-reported problems were identified and mapped to the ten target metrics.[^1][^2][^3]

**Most common pain points across communities:**
- Pipeline coverage looking healthy on paper while deals are stale, single-threaded, or unqualified — "coverage theater"[^4][^5][^6]
- Forecasts that are consistently wrong by week 6-8 of the quarter, undermining leadership trust[^7][^8]
- Quota attainment rates that are structurally low (30-53% of reps missing quota) yet management doesn't act[^9][^10][^11][^12]
- Marketing/Sales conflict over MQL definitions and low MQL-to-SQL conversion[^13][^14]
- Sales cycles lengthening and derailing forecast models[^15][^3]
- ACV compression or plateauing as companies try to scale into new segments[^16][^17][^18]
- Manual, spreadsheet-based deal velocity and stage-time reporting inside HubSpot that native reports don't fully support[^2][^19][^20]

## Section 2: Top 30 RevOps Problems Ranked

| Rank | Problem | Related Metric | Who Faces It | Frequency | Revenue Impact | Score |
|---|---|---|---|---|---|---|
| 1 | Forecast is wrong every quarter; leadership loses trust in numbers by week 6-8 | Forecast Accuracy | CRO/VP Sales | Very High | Critical | 96 |
| 2 | Coverage ratio looks healthy (3-5x) but is built on stale, single-threaded, unqualified deals | Pipeline Coverage Ratio | RevOps Manager/VP Sales | Very High | Critical | 94 |
| 3 | Majority of reps (50-63%) miss quota every quarter, yet leadership treats it as normal | Quota Attainment | CRO/VP Sales | Very High | Critical | 92 |
| 4 | Win rate varies wildly by rep (11% vs 55%) inside the same "aggregate" number, hiding root cause | Win Rate | RevOps Manager/Sales Manager | High | High | 88 |
| 5 | Sales cycles are lengthening ~22% YoY, breaking forecast models built on old cycle assumptions | Sales Cycle Length | RevOps Manager | High | High | 85 |
| 6 | Marketing hands off MQLs that Sales doesn't trust, causing SDR/Marketing finger-pointing | MQL to SQL Conversion Rate | Marketing Team/SDR Manager | High | Medium-High | 83 |
| 7 | Deals stall in the same stage for 60-90 days with no visibility into why | Pipeline Velocity | Sales Manager/RevOps | High | High | 82 |
| 8 | Revenue growth plateaus around $10-20M ARR despite functioning top-of-funnel | Revenue Growth (YoY/QoQ) | CRO/CEO | Medium-High | Critical | 80 |
| 9 | Actual bookings vs. plan diverge >15%, forcing repeated re-forecasting and compounding pressure | Revenue Attainment vs. Target | CFO/CRO | Medium-High | Critical | 79 |
| 10 | Reps and managers disagree on what "coverage" or "qualified" pipeline actually means | Pipeline Coverage Ratio | VP Sales/Finance | High | High | 78 |
| 11 | Deal size (ACV) can't scale without breaking the existing sales motion/cycle length | Average Deal Size (ACV) | VP Sales/RevOps | Medium | High | 76 |
| 12 | Native HubSpot reports can't natively calculate deal velocity or time-in-stage without custom builds | Pipeline Velocity | RevOps Manager | Medium-High | Medium | 74 |
| 13 | Sales reps sandbag or inflate forecasts to protect themselves, corrupting the roll-up | Forecast Accuracy | Sales Manager/RevOps | High | High | 74 |
| 14 | No shared definition of "committed" between reps, managers, and finance | Forecast Accuracy | RevOps Manager/CFO | Medium-High | High | 73 |
| 15 | Reps hitting quota due to inherited territory/product-market fit, not skill — quota design flawed | Quota Attainment | VP Sales/Sales Manager | Medium | Medium | 70 |
| 16 | MQL definitions too loose, causing SDRs to waste time on low-intent leads | MQL to SQL Conversion Rate | SDR Manager/Marketing | Medium-High | Medium | 70 |
| 17 | Board-level ARR/revenue targets set top-down without bottoms-up capacity validation | Revenue Attainment vs. Target | CRO/CFO | Medium | Critical | 69 |
| 18 | Win rate declining industry-wide (23%→19%) but no visibility into which stage is leaking | Win Rate | VP Sales/RevOps | Medium-High | High | 68 |
| 19 | Increasing headcount ("hire more reps") doesn't proportionally increase revenue due to falling attainment | Revenue Growth (YoY/QoQ) | CRO/CEO | Medium | Critical | 68 |
| 20 | Deals with no next step or decision-maker engagement inflate pipeline numbers artificially | Pipeline Coverage Ratio | Sales Manager | High | High | 67 |
| 21 | Finance and RevOps use different pipeline coverage models (stage/probability vs historical close rate), causing disputes | Pipeline Coverage Ratio | Finance/RevOps | Medium | Medium | 65 |
| 22 | Long enterprise sales cycles (6-24 months) make short-term forecasting nearly impossible | Sales Cycle Length | CRO/VP Sales | Medium | High | 64 |
| 23 | ACV/deal-size benchmarks vary so much by segment that "average ACV" is a misleading planning input | Average Deal Size (ACV) | RevOps Manager/Finance | Medium | Medium | 60 |
| 24 | Stage-to-stage conversion drop-off (Stage 2→3) not caught until it's too late to fix the quarter | Pipeline Velocity | RevOps Manager | Medium | High | 62 |
| 25 | Comp plans/quotas reward "attainment %" behavior that leads to overselling or underselling risk | Quota Attainment | VP Sales/HR/RevOps | Medium | Medium | 58 |
| 26 | Manual CRM data entry burden makes velocity and stage-time metrics unreliable | Pipeline Velocity | Sales Rep/RevOps | Medium | Medium | 57 |
| 27 | Territory design/capacity planning errors distort quota fairness and reported attainment | Quota Attainment | Sales Ops/VP Sales | Medium | Medium | 55 |
| 28 | SDR-to-AE handoff lacks context, weakening MQL-to-SQL follow-through | MQL to SQL Conversion Rate | SDR/AE | Medium | Medium | 54 |
| 29 | Revenue variance compounds quarter-to-quarter, creating unrealistic future targets | Revenue Attainment vs. Target | CFO/CRO | Medium | High | 60 |
| 30 | Lack of granular measurement (weekly cadence) leads to forecast surprises late in quarter | Forecast Accuracy | RevOps Manager | Medium-High | High | 66 |

*(30 problems shown; full dataset of 50+ problems is distributed across the metric mapping in Section 3.)*

## Section 3: Metric → Problem Mapping

**Pipeline Coverage Ratio** — Problems solved: lack of visibility into whether pipeline supports the target; "coverage theater" where a healthy ratio masks stale/low-quality deals; Finance vs. RevOps disagreement on coverage methodology; generic 3x benchmarks failing to reflect actual win-rate/deal-size/cycle inputs; unclear qualification criteria inflating the numerator artificially.[^21][^22][^5][^6][^1][^4]

**Win Rate** — Problems solved: inability to diagnose why deals are lost vs. won; wide rep-to-rep variance hidden inside one aggregate number; declining industry win rates (23%→19%) without visibility into cause; disqualifying weak-fit prospects too late in the cycle; measuring win rate from different funnel entry points (opportunity vs. demo) producing incomparable numbers.[^23][^24][^6][^3]

**Forecast Accuracy** — Problems solved: forecasts falling below 61% accuracy by week 8; sandbagging/inflating by reps to protect themselves; no shared "committed" definition between reps, managers, Finance; reliance on spreadsheets instead of systemized CRM fields; failure to model buyer-side risk signals (budget freezes, leadership churn) that aren't visible in the CRM.[^25][^26][^8][^7]

**Quota Attainment** — Problems solved: majority of reps missing quota without organizational response; quota-setting derived from top-down investor targets rather than bottoms-up capacity; distinguishing genuine underperformance from bad territory/product-market fit; comp-plan design intentionally targeting only 40-50% attainment to control costs.[^27][^11][^28][^12][^9]

**Revenue Growth (YoY/QoQ)** — Problems solved: plateauing growth around $10-20M ARR despite a working funnel; naive headcount-scaling assumptions ("add more reps = more revenue") failing due to falling attainment; internal misalignment (GTM strategy, systems, customer value delivery) masked as a "market size" problem.[^29][^30][^16]

**Pipeline Velocity** — Problems solved: deals stalling in stage with no visibility into where; native CRM tools lacking built-in velocity/time-in-stage reporting; identifying leading indicators of revenue miss 4-8 weeks before it happens; manual data entry undermining metric reliability.[^19][^31][^32][^20][^3][^2]

**Average Deal Size (ACV)** — Problems solved: benchmarking confusion since "average ACV" varies 10x+ by segment/vertical; attempts to move upmarket (raise ACV) breaking existing sales motion and cycle assumptions; weak correlation between headcount growth and ACV growth misleading capacity planning.[^33][^34][^17]

**Revenue Attainment vs. Target** — Problems solved: board-set targets lacking bottoms-up validation; revenue variance compounding quarter to quarter into unrealistic future targets; ARR vs. revenue-recognition mismatches distorting attainment tracking.[^3][^35]

**MQL to SQL Conversion Rate** — Problems solved: Marketing and Sales disagreement over lead quality/definitions; SDRs wasting time on low-intent MQLs due to loose scoring criteria; poor SDR-to-AE handoff context reducing follow-through; industry median conversion sitting at only ~15%, exposing systemic qualification issues.[^14][^13][^3]

**Sales Cycle Length** — Problems solved: cycles lengthening ~22% YoY breaking forecast model assumptions; enterprise deals (6-24 months) making short-term forecasting nearly impossible; failure to segment cycle-length benchmarks by deal size/vertical, producing misleading planning inputs.[^17][^3][^33]

**Pipeline Coverage Ratio, Win Rate, Pipeline Velocity (compound view)** — Problems solved: these three combine to answer "do we have enough good pipeline moving fast enough to hit the number," the core RevOps operating question flagged repeatedly across communities.[^3]

## Section 4: Voice of Customer Insights

**Problem: Coverage ratio masks pipeline quality**
Quote: "A 3x coverage ratio built from deals sitting in Stage 2 for ninety days... is closer to 1x with a lot of noise on top." — Source: DailyRevOps/industry blog[^5][^4]

**Problem: Forecast misses every quarter**
Quote: "Sales teams are under 61% accuracy by week eight on average... we have made it two full months into the quarter." — Source: RevOps Co-op webinar[^8]

**Problem: Win rate hides rep-level dysfunction**
Quote: "Win rates that average 30% in aggregate but are 55% for one rep and 11% for another." — Source: LinkedIn, RevOps practitioner[^6]

**Problem: Reps missing quota is treated as normal**
Quote: "Organizations often prefer that only 40-50% of their sales representatives meet their quotas... to reduce compensation costs." — Source: Reddit r/sales[^9]

**Problem: Marketing/Sales MQL conflict**
Quote: "Your MQL definition is probably too loose. If conversion to SQL dropped significantly, you're either qualifying leads too early or the scoring [is off]." — Source: Reddit r/b2bmarketing[^14]

**Problem: Pipeline coverage benchmark disconnected from reality**
Quote: "The 3x pipeline coverage benchmark is a myth. I've seen RevOps teams hit quota with a 1.8x coverage — and miss it with 4x." — Source: LinkedIn, Janis Zech[^22]

**Problem: Deal velocity reporting gap in HubSpot**
Quote: "If your pipeline report doesn't show deal velocity, you're flying blind." — Source: LinkedIn/Facebook practitioner post[^36]

## Section 5: Product Opportunity Analysis

| Problem | Current Workaround | Existing Tools Used | Gap in Current Solutions | Automation Opportunity |
|---|---|---|---|---|
| Coverage ratio doesn't reflect deal quality | Manual deal inspection in pipeline reviews | HubSpot, Salesforce, spreadsheets | No automated staleness/engagement scoring | AI-driven pipeline risk/quality scoring layered on coverage ratio[^5] |
| Forecast inaccuracy from sandbagging/inflation | Weekly manager overrides, "gut check" calls | Clari, BoostUp, spreadsheets | No systemic way to detect and adjust for rep bias | ML-based forecast normalization using historical rep-level bias correction[^7][^8] |
| Deal velocity/time-in-stage not natively reportable | Custom calculated properties, manual reports | HubSpot custom report builder | Requires technical setup per pipeline; not out-of-box | Pre-built, no-code velocity/time-in-stage dashboards native to CRM[^2][^19] |
| MQL/SQL handoff friction | SDR/Marketing weekly sync meetings | HubSpot lead scoring, Marketo | Static scoring models don't reflect real buying signals | Behavioral + firmographic dynamic lead scoring with feedback loop automation[^14] |
| Win rate variance across reps undiagnosed | Manual 1:1 coaching reviews | CRM win/loss fields, Gong | No systemic root-cause tagging at deal-loss level | Automated loss-reason clustering and coaching-alert triggers[^6] |
| Quota-territory mismatch | Manual territory redesign annually | Spreadsheets, Xactly | No dynamic capacity/territory rebalancing | AI-based dynamic territory and quota rebalancing tool[^12][^28] |

## Section 6: HubSpot Implementation Mapping

| Metric | HubSpot Object | Required Data | Native Report Available? | Custom Setup Needed |
|---|---|---|---|---|
| Pipeline Coverage Ratio | Deals | Deal amount, stage, close date, target | Partial | Custom dashboard combining Deals + Goals |
| Win Rate | Deals | Deal stage (Closed Won/Lost), owner | Partial | Custom formula field for win rate by stage/owner[^19] |
| Forecast Accuracy | Deals, Forecast object | Forecast category, amount, close date, actuals | Partial (Forecast tool in Enterprise) | Custom variance tracking dashboard |
| Quota Attainment | Deals, Goals | Deal amount, owner, quota targets | Yes (Goals tool) | Minor — goal setup per rep |
| Revenue Growth (YoY/QoQ) | Deals, Companies | Closed revenue by period | Yes | Custom period-over-period comparison report |
| Pipeline Velocity | Deals | Stage entry/exit dates, amount, win rate, cycle length | No (requires calculated properties) | Custom calculated properties + report[^2][^19][^20] |
| Average Deal Size (ACV) | Deals | Deal amount, close date | Yes | Minimal — average value report |
| Revenue Attainment vs. Target | Deals, Goals | Closed revenue, target/goal | Yes (Goals tool) | Minor customization for attainment % visualization |
| MQL to SQL Conversion Rate | Contacts, Deals | Lifecycle stage timestamps | Partial | Custom funnel report across lifecycle stages[^14] |
| Sales Cycle Length | Deals | Create date, close date, stage timestamps | Partial | Custom "time in stage" and cycle-length calculated properties[^32] |

---

## References

1. [How to stop guessing on pipeline and actually work ...](https://www.reddit.com/r/SalesOperations/comments/1sal23j/how_to_stop_guessing_on_pipeline_and_actually/) - The problem with pipeline coverage ratios is they tell you how much pipeline you need in aggregate b...

2. [Deal velocity and momentum - Dashboards & Reporting](https://community.hubspot.com/t/deal-velocity-and-momentum/130060) - We want to measure velocity by new Deals and Deal movement through the Pipeline. A Deal moving from ...

3. [Revenue Operations KPIs: The 12 Metrics Every RevOps ...](https://orm-tech.com/blog/revops-kpis/) - The 12 KPIs that define RevOps success, organized by function: pipeline health, forecast reliability...

4. [How RevOps Can Improve Pipeline Coverage Without More Tools](https://www.marketsandmarkets.com/AI-sales/how-revops-can-improve-pipeline-coverage-without-more-tools) - Pipeline coverage isn't a headcount problem or a tool problem. It's a signal problem. Learn how RevO...

5. [Why pipeline coverage is deceiving: DailyRevOps](https://dailyrevops.com/playbooks/pipeline-coverage-deceiving) - The problem is that a ratio can look healthy while the underlying pipeline is weakening. A team may ...

6. [Marius Murariu's Post - revops #salesforecast #b2bsaas](https://www.linkedin.com/posts/mariusmurariu_revops-salesforecast-b2bsaas-activity-7467458349979226112-vlge) - 𝗧𝗵𝗲 𝟯𝘅 𝗽𝗶𝗽𝗲𝗹𝗶𝗻𝗲 𝗰𝗼𝘃𝗲𝗿𝗮𝗴𝗲 𝗿𝘂𝗹𝗲 𝗼𝗻𝗹𝘆 𝘄𝗼𝗿𝗸𝘀 𝗶𝗳 𝗙𝗶𝗻𝗮𝗻𝗰𝗲 𝗰𝗮𝗻 𝗿𝗲𝗽𝗿𝗼𝗱𝘂𝗰𝗲 𝘁𝗵𝗲 𝟯𝟯% 𝘄𝗶𝗻 𝗿𝗮𝘁𝗲. Many teams do no...

7. [Sales forecast accuracy solutions : r/revops](https://www.reddit.com/r/revops/comments/1czx293/sales_forecast_accuracy_solutions/) - Accuracy depends on your forecast model fit. The key to forecasting accuracy is iterating the model ...

8. [How Leading Teams Get to 90% Forecasting Accuracy by Week 6](https://www.youtube.com/watch?v=2KMWRG0Zndk) - On average, sales forecasts are less than 61% accurate by week 8 in the quarter. 😱‍

Inaccurate sale...

9. [Missed quota : r/sales](https://www.reddit.com/r/sales/comments/1qvnofg/missed_quota/) - What actually happened in your company when reps miss quota? Historically, in mine, nothing really e...

10. [63% of sales reps missed quota in 3Q](https://www.reddit.com/r/sales/comments/y254up/63_of_sales_reps_missed_quota_in_3q/) - According to CEO of Bravado, a network for sales people Normally they see 53-54% miss on average any...

11. [How is everyone keeping their jobs if ~60% don’t hit quota?](https://www.reddit.com/r/sales/comments/1nfg4bn/how_is_everyone_keeping_their_jobs_if_60_dont_hit/) - How is everyone keeping their jobs if ~60% don’t hit quota?

12. [How honest should I be about 70–80% quota attainment ...](https://www.reddit.com/r/techsales/comments/1p2y6bb/how_honest_should_i_be_about_7080_quota/) - Conversely, amazing AEs might miss quota due to poor Product-Market Fit (PMF), unrealistic targets, ...

13. [Marketing responsible for SQLs? : r/marketing](https://www.reddit.com/r/marketing/comments/1bjqy8s/marketing_responsible_for_sqls/) - I do marketing at a company that for all of its history has grown via B2C marketing channels. About ...

14. [MQL to SQL : r/b2bmarketing](https://www.reddit.com/r/b2bmarketing/comments/1rdgaed/mql_to_sql/) - Your MQL definition is probably too loose. If conversion to SQL dropped significantly, you're either...

15. [Sales cycle too fucking long](https://www.reddit.com/r/sales/comments/bhnayt/sales_cycle_too_fucking_long/) - The key to killing a long sales cycle is to have a healthy pipeline. Doesn't matter how long the cyc...

16. [How to overcome the $20M ARR plateau in SaaS](https://www.linkedin.com/posts/guideforge-consulting_many-saas-companies-hit-a-plateau-around-activity-7369353252431167491-uFPL) - Many SaaS companies hit a plateau around $20M ARR. Median growth rates drop sharply to just 25 perce...

17. [B2B SaaS ACV Benchmarks 2026: By Vertical, Segment & GTM Motion](https://www.youtube.com/watch?v=8YZ3lpgaxfY) - Median B2B SaaS ACV across all company sizes sits around $26K — but that single number hides everyth...

18. [How to avoid the predictable growth plateau in SaaS startups](https://www.linkedin.com/posts/tonysternberg_90-of-saas-startups-hit-the-same-very-predictable-activity-7394396638737444864-W3RP) - 90% of SaaS startups hit the same (VERY predictable!) growth plateau, yet nearly 100% of business le...

19. [Deal Velocity - Dashboards & Reporting](https://community.hubspot.com/t/deal-velocity/133908) - I want to create a Deal Velocity Report with these metrics: avg time in each sales stage, win rate b...

20. [Increasing Deal Velocity And Preventing Stagnant Deals](https://community.hubspot.com/t/increasing-deal-velocity-and-preventing-stagnant-deals/143496) - This report shows the average time deals spend in each stage, showing you exactly where your pipelin...

21. [Why do RevOps and Finance disagree on pipeline ...](https://www.reddit.com/r/SaaS/comments/1u12fs4/why_do_revops_and_finance_disagree_on_pipeline/) - RevOps tends to look at pipeline coverage using deal stages and probabilities. Finance tends to mode...

22. [I've talked to 200+ RevOps leaders this… | Janis Zech | 20 comments](https://www.linkedin.com/posts/janiszech_the-3x-pipeline-coverage-benchmark-is-a-myth-activity-7376582450199822337-Kf2i) - The 3x pipeline coverage benchmark is a myth. I’ve seen RevOps teams hit quota with a 1.8x coverage ...

23. [How to improve win rate in sales](https://www.reddit.com/r/sales/comments/18c0dy9/how_to_improve_win_rate_in_sales/) - My manager just posted our 2023 performance by numbers so far on our team channel. In a team of 4 I ...

24. [What is your company's win rate? : r/sales](https://www.reddit.com/r/sales/comments/1k6prin/what_is_your_companys_win_rate/) - For context, my prior role had a win rate of 22-28% depending on the team member.

My current compan...

25. [Honest question for Sales/RevOps folks: What’s the REAL reason pipeline forecasting feels unpredictable?](https://www.reddit.com/r/StartupsHelpStartups/comments/1pc5ttm/honest_question_for_salesrevops_folks_whats_the/) - Honest question for Sales/RevOps folks: What’s the REAL reason pipeline forecasting feels unpredicta...

26. [Should I Hire a Fractional CRO If My Forecast and Actuals Never Match?](https://pulserevops.com/knowledge/tl0599) - A persistent forecast-to-actuals gap is usually a symptom of broken revenue process — inconsistent d...

27. [Why is missing quota now the norm in Saas and why ...](https://www.reddit.com/r/sales/comments/qcvo51/why_is_missing_quota_now_the_norm_in_saas_and_why/) - Quota gets missed because it is usually derived from outdated practices like taking a board/investor...

28. [Reps missing quota: Separating talent from quota structure](https://www.linkedin.com/posts/samfeldotto_the-quota-attainment-crisis-activity-7441903797964165120-01RZ) - Reps missing quota? That might be your fault. A rep sitting at 38% could be genuinely underperformin...

29. ["Fewer reps, doing better, is almost always the way to scale fastest ...](https://www.linkedin.com/posts/saastr_fewer-reps-doing-better-is-almost-always-activity-7289764124836696065-Dyh-) - "Fewer reps, doing better, is almost always the way to scale fastest." Lenny Rachitsky + Jason M. Le...

30. [B2B SaaS Plateau: An Orchestration Problem, Not Sales - LinkedIn](https://www.linkedin.com/posts/agazeeshan_most-b2b-saas-companies-hit-a-growth-plateau-activity-7461750813414121472-b4Wn) - Most B2B SaaS companies hit a growth plateau at roughly the same place. Direct sales is dialled in. ...

31. [Betreff: Sales velocity for 2025 report is wrong](https://community.hubspot.com/t5/Dashboards-Reporting/Sales-velocity-for-2025-report-is-wrong/m-p/1116967?profile.language=es) - Good day, colleagues, I took the prebuilt Deals velocity report and changed the pipeline to Land. I ...

32. [Re: Deal: Cumulative Time in Stage](https://community.hubspot.com/t5/CRM/Deal-Cumulative-Time-in-Stage/m-p/944262) - Hi , Good news, this was just released Deals Deal Stage Calculated Properties Mar 14, 2024 What is i...

33. [People selling ACV of $50K or higher, what is your process ...](https://www.reddit.com/r/sales/comments/1jbcoiv/people_selling_acv_of_50k_or_higher_what_is_your/) - Loaded question, I know. But we are trying to add an upmarket segment for our SAAS from current aver...

34. [ACV, Sales Cycles, and Sales Reps | HockeyStack Labs](https://www.hockeystack.com/lab-blog-posts/acv-sales-cycles-sales-reps) - Boost ACV by mastering sales cycle & B2B stages. Elevate your average contract value through strateg...

35. [ARR vs Revenue Targets : r/SalesOperations](https://www.reddit.com/r/SalesOperations/comments/1lzryme/arr_vs_revenue_targets/) - If you are half way through the year with no deals (just as a picture) then you would have to make 9...

36. [How to optimize HubSpot pipeline with deal stage duration ...](https://www.facebook.com/eLsqrd/posts/if-your-pipeline-report-doesnt-show-deal-velocity-youre-flying-blinda-lot-of-hub/1554101700054369/) - If your pipeline report doesn't show deal velocity, you're flying blind. A lot of HubSpot users look...

