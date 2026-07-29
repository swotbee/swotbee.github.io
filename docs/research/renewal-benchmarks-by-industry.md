# Renewal ROI Calculator: Sourced Industry Benchmarks

Research pass to replace the placeholder assumptions in `RenewalRoiCalculator.astro`
(the "Start here" industry-pill calculator on `renewal-operations-animated-v3.astro`)
with citable market data. The component's own header comment currently says these are
"typical mid-market estimates, not measured data": this document is the attempt to make
them measured, or to honestly flag where they cannot be.

Research run 2026-07-27, one pass per industry pill, via parallel web research agents.
Every figure below carries a source and a confidence rating. Where no usable data
existed, that is stated explicitly rather than filled with a guess.

## How to read this

- **Current** = what's live in the component today
- **Finding** = what the research surfaced, with source and confidence
- **Gap** = what could not be sourced at all

Confidence: **High** = primary/authoritative source (analyst report, vendor benchmark
survey, industry association). **Medium** = reasonable proxy or single-source case
study. **Low** = inferred/interpolated, not a direct benchmark.

---

## Cross-cutting finding (read this first)

The calculator currently applies **one shared ladder** for slip rate by tracking
maturity across all seven industries (no tracking = 12%, spreadsheets = 10%, partial
system = 7%, custom workflows = 5%) and **one shared flat recovery rate** (70% of
at-risk revenue is recoverable, `RECOVERABLE = 0.7` in the script).

Both assumptions turn out to be industry-dependent, not universal:

- **Slip-rate ladder**: reasonably close to reality for Energy, Manufacturing, and MSP's
  "no tracking" tier, but badly *understates* the problem for **Field Service**, where
  ServiceTitan's real aggregated data shows manual tracking produces a **70.2% slip
  rate** (not 12%), dropping to ~50.9% with auto-renew + reminders. IoT hardware
  renewals show a similar pattern (~25% slip at baseline, vs. 12% assumed). Only Energy
  and general B2B benchmarks land close to the current numbers.
- **Recovery rate**: the flat 70% is well-supported for **SaaS** (60-70% at-risk
  recovery, up to 85% with optimized dunning workflows) but is **too optimistic** for
  MSP (real range 10-15% conservative to 73% aggressive, with 70% only defensible at the
  aggressive end), IoT (35-45% pre-cancellation, only 6% post-cancellation), Proptech
  (60% with 90-day advance warning, likely lower without it), and Energy (15-30% recovery
  from automation studies specifically).

**Implication for the code change**: both the slip-rate ladder and the recovery rate
probably need to become per-industry data (not shared constants) if the goal is
defensible numbers, not just a directional feel. See "Recommended values" per industry
below.

---

## Energy & Utilities

**Current**: 300 renewals/yr, $50,000 ACV, shared 12/10/7/5% slip ladder, shared 70% recovery

| Metric | Finding | Source | Confidence |
|---|---|---|---|
| Renewal rate (general B2B, best-in-class) | 85-95% | Industry benchmark aggregate | Medium |
| Renewal rate (actual energy broker portfolio) | 84% (16% slip) | Energy brokerage case data | Medium |
| Revenue lost to process gaps | 5-9% of contract value | Contract-management studies | Medium |
| Missed renewal deadlines (orgs) | 56% miss monthly, 20% miss weekly | Contract management industry data | Medium |
| Renewal-process ROI | 3-5x ROI; 25-95% profit uplift per 5% retention gain | Aggregate B2B retention studies | Medium |
| Revenue recovered via automation | 15-30% more recurring revenue annually | SMB automation case studies | Medium |
| Admin time savings from FSM systems | 40% reduction | Field service management studies | Medium |

**Gaps**: No energy/utilities-specific data exists for annual contract count or ACV.
HVAC (adjacent, not energy) suggests ~500 contracts and $500-$2,000/yr ACV, far below
the $50,000 placeholder, but energy service agreements are frequently
outcome/savings-based (not a flat annual fee), which makes a single ACV figure
genuinely hard to defend for this vertical. No published case study ties renewal
process ROI specifically to energy/utilities companies.

**Recommended values**: Keep renewals/year (300) as directional only, explicitly
flagged as unvalidated. Do not assert a precise ACV; either keep as a labeled
"representative range" or gather 3-5 real customer data points before publishing a
number. Slip rate: 16% is closer to reality than today's 10-12% band. Recovery rate:
15-30% (conservative, sourced) rather than 70%; NOT 70%, this vertical does not
support that.

**Sources**:
- [BaaDigi HVAC Business Benchmarks 2026](https://www.baadigi.com/blog/hvac-business-benchmarks-2026-revenue-profit-margins-conversion-rates)
- [HVACProfitMath Benchmarks](https://hvacprofitmath.com/benchmarks.html)
- [BizMetricsHQ Electrical Industry Benchmarks](https://www.bizmetricshq.com/industries/electrical/)
- [NECA Financial Survey & Benchmarking Results](https://www.constructionbusinessowner.com/resources/neca-cfma-announce-financial-survey-and-online-benchmarking-results)
- [Future Market Insights Facility Management Services Market Report](https://www.futuremarketinsights.com/reports/facility-management-services-market)
- [AZ Comfort Experts: Commercial HVAC Maintenance Contracts](https://azcomfortexperts.com/blog/commercial-hvac-maintenance-contracts/)
- [EnergyLink: Operations and Maintenance Costs](https://goenergylink.com/blog/operations-and-maintenance-cost/)
- [PV-Maps: Solar O&M Costs Per MW](https://pv-maps.com/en/blog/solar-om-costs-per-mw)
- [ScienceDirect: Operation and Maintenance Cost Overview](https://www.sciencedirect.com/topics/engineering/operation-and-maintenance-cost)
- [DOE Better Buildings Solutions Center: RILA ESA Primer](https://betterbuildingssolutioncenter.energy.gov/sites/default/files/news/attachments/RILA%20ESA%20Primer.pdf)
- [Energy Star: Introduction to Performance Contracting](https://www.energystar.gov/ia/partners/spp_res/Introduction_to_Performance_Contracting.pdf)
- [Umbrex Contract Renewal Rate Playbook](https://umbrex.com/resources/company-analysis/legal-compliance/contract-renewal-rate/)
- [ExpirationReminder: Real-World Failures from Missed Contract Renewals](https://www.expirationreminder.com/blog/real-world-failures-missed-contract-renewals)
- [Sirion: Utility Contract Management Research](https://www.sirion.ai/library/contract-management/utility-contract-management/)
- [Sirion: Contract Renewal and Expiration Management with AI](https://www.sirion.ai/library/contract-insights/contract-renewal-and-expiration-management-with-ai/)
- [Hyperstart: Revenue Leakage Guide](https://www.hyperstart.com/blog/revenue-leakage/)
- [DeskDay: Revenue Leakage in Mid-Market MSPs](https://deskday.com/revenue-leakage-in-mid-market-msps/)
- [Icertis: What is Revenue Leakage](https://www.icertis.com/learn/revenue-leakage/)
- [Fullcast: Contract Renewal Management & Optimization](https://www.fullcast.com/content/contract-renewal/)
- [HubSpot: Customer Success Renewals Strategies](https://blog.hubspot.com/service/customer-success-renewals)
- [ServiceNow: Field Service Management Use Cases](https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/resource-center/solution-brief/sb-field-service-management-use-cases.pdf)
- [FieldEdge: Field Service Management Software ROI](https://fieldedge.com/blog/field-service-management-software-roi/)
- [CT Acquisitions: Energy Brokerage Business Valuation Guide](https://ctacquisitions.com/guides/energy-brokerage-business-valuation/)
- [CT Acquisitions: Underground Utility Contracting Business Valuation](https://ctacquisitions.com/guides/underground-utility-contracting-business-valuation/)

---

## Field Service

**Current**: 800 renewals/yr, $12,000 ACV, shared 12/10/7/5% slip ladder, shared 70% recovery

| Metric | Finding | Source | Confidence |
|---|---|---|---|
| Renewal rate, manual/spreadsheet tracking | 29.8% (70.2% slip) | ServiceTitan aggregated customer data | High |
| Renewal rate, auto-renew enabled | 42.4% (57.6% slip) | ServiceTitan | High |
| Renewal rate, auto-renew + email reminders | 49.1% (50.9% slip) | ServiceTitan | High |
| Residential HVAC ACV | $150-$500/yr | Industry pricing guides | Medium |
| Commercial HVAC ACV | $1,000-$10,000+/yr, clustering $2,000-$5,000 | Industry pricing guides | Medium |
| Active contracts (industry benchmark) | ~500 typical | HVAC sustainability benchmark | Medium |
| Contract volume, mid-market field service | 400-1,200 agreements | Interpolated from revenue/tech productivity data | Low |
| Value of contract-attached repair work | $1 maintenance contract → $2 pull-through repair revenue | Field service industry studies | Medium |
| Example ROI | 30-tech HVAC shop, 25%→40% agreement penetration → $750K/yr gain | Field service case study | Medium |

**Gaps**: No vendor (ServiceTitan, FieldEdge, Jobber) publishes a "contracts per
employee" or "contracts per company size" metric, so the 800/yr figure can't be
directly validated, though it's in a plausible range. No source separates slip rate by
tracking system beyond the three ServiceTitan tiers above (there's no clean "partial
system" vs. "custom workflows" distinction in the source data).

**Recommended values**: This is the highest-confidence, most important correction in
the whole set. **ACV**: lower from $12,000 to roughly $3,000-$8,000 (commercial HVAC
range) unless SwotBee is deliberately targeting enterprise-only field service. **Slip
rate**: replace the shared ladder with ServiceTitan's real numbers for this
industry — roughly 70% (manual), 58% (auto-renew), 51% (auto-renew + reminders) — a
dramatically different story than today's 12%/10%/7%/5%. **Recovery rate**: ~65%
(29.8% → 49.1% is a 65% closure of the gap between worst and best observed state),
reasonably close to today's 70% for this one specific vertical.

**Sources**:
- [BaaDigi HVAC Business Benchmarks 2026](https://www.baadigi.com/blog/hvac-business-benchmarks-2026-revenue-profit-margins-conversion-rates)
- [OxMaint: Commercial HVAC Maintenance Cost 2026](https://oxmaint.com/industries/hvac/commercial-hvac-maintenance-cost-2026-pricing-benchmarks-roi)
- [Construction Cost Accounting: HVAC Maintenance Plans Pricing & Profitability](https://www.constructioncostaccounting.com/post/hvac-maintenance-plans-pricing-profitability)
- [FieldEdge: Technician Utilization Benchmarks](https://fieldedge.com/blog/technician-utilization-benchmarks/)
- [HVACProfitMath: HVAC Industry Benchmarks & KPIs](https://hvacprofitmath.com/benchmarks.html)
- [OxMaint: HVAC Service Contract Renewal & Retention Tracking](https://oxmaint.com/industries/hvac/hvac-service-contract-renewal-retention-tracking)
- [Provalet: Field Service Software ROI Case Studies](https://www.provalet.io/guides-posts/field-service-software-roi-case-studies)
- [Repair-CRM: ROI of Field Service Management System 2026](https://www.repair-crm.com/2026/04/24/roi-of-a-field-service-management-system-2026)
- [ServiceTitan: Commercial Service Agreement Renewal & Automation](https://www.servicetitan.com/toolbox/state-of-the-trades/trends/commercial-service-agreement-renewal-automation)
- [ServiceTitan: Field Service Trends](https://www.servicetitan.com/blog/field-service-trends)
- [US Tech Automations: Best Service Agreement Renewal Software 2026](https://ustechautomations.com/resources/blog/best-service-agreement-renewal-software-for-pest-control-companies-2026)
- [Velosio: 12 Field Service Performance Metrics](https://www.velosio.com/blog/12-field-service-performance-metrics-every-provider-should-track)
- [WorkYard: 75+ HVAC Industry Facts and Statistics 2026](https://www.workyard.com/construction-management/hvac-facts-statistics)

---

## Industrial / Manufacturing

**Current**: 200 renewals/yr, $80,000 ACV, shared 12/10/7/5% slip ladder, shared 70% recovery

| Metric | Finding | Source | Confidence |
|---|---|---|---|
| Service contract attach rate, industry average | 25-30% of installed base | SmartServiceOps, Entytle | High |
| Service contract attach rate, best-in-class | 50-80% of installed base | TSIA, Middlesex Consulting | High |
| Attach rate by channel: direct sales | 70-100% | Middlesex Consulting | High |
| Attach rate by channel: distributor | 30-50% | Middlesex Consulting | High |
| PM contract, small facility | $6,000-$18,000/yr | Launch Advisor, Advanced Tech | High |
| PM contract, large plant | $30,000-$96,000/yr | Launch Advisor, Advanced Tech | High |
| Renewal rate, industrial maintenance (by value) | 80-92% | ServiceXRG | High |
| Renewal rate, best-in-class annual | 56% of agreements renew | Aberdeen Group (via ServiceXRG) | High |
| Renewal rate, struggling companies | <25% of agreements renew annually | Aberdeen Group (via ServiceXRG) | High |
| Case: automated 90/60/30-day touchpoints | 68% → 91% renewal within 12 months | Industry case study | Medium |
| Revenue lost to poor contract management | 9-20% of annual revenue | Multiple (Hyperstart, Ironclad, BCG) | High |
| Attach-rate ROI | 5-point attach-rate increase → 9% service revenue increase | Aberdeen Group (via ServiceTitan) | High |
| Cost of new-customer acquisition vs. retention | 5-25x more expensive to acquire | Entytle | High |
| Year-3+ CRM/CPQ renewal gap | Confirmed real: CPQ automation and bundle updates commonly break silently until year 2-3 renewal | Salesforce CPQ docs, iMark InfoTech | High |

**Gaps**: No source gives an absolute contract-count-per-company-size figure (industry
reports quote attach *rates*, not counts). No source states a clean "average" ACV
across mid-market industrial companies. No source breaks slip rate down by tracking
maturity tier. No source states a specific recovery-rate percentage; 70% is
unattributed anywhere in this vertical's public data.

**Recommended values**: Renewals/year (200) and ACV ($80,000) cannot be independently
confirmed but are not contradicted by the PM-contract range data either; treat as
"plausible, unvalidated" rather than sourced. Slip rate: 80-92% renewal (8-20% slip) is
close to today's 10-12% band, keep roughly as-is. Recovery rate: no direct source; 70%
sits within the range implied by the 68%→91% case study, defensible as a stated
assumption but should be labeled as such rather than presented as measured. The
"year-3 CRM loop protection" leak copy is well-supported qualitatively even without a
precise number attached.

**Sources**:
- [Industrial Equipment Aftermarket Intelligence and Service Optimization Market](https://www.futuremarketinsights.com/articles/aftermarket-intelligence-in-industrial-equipment-services)
- [Manufacturing AfterMarket Growth Driven by 6.84% CAGR by 2035](https://www.globalgrowthinsights.com/market-reports/manufacturing-after-market-124435)
- [BCG: Aftermarket Services Drive Growth and Higher Margins for Industrial Manufacturers](https://www.bcg.com/publications/2025/aftermarket-services-drive-growth-for-industrial-manufacturers)
- [Wallstreet Prep: Average Contract Value (ACV)](https://www.wallstreetprep.com/knowledge/annual-contract-value-acv/)
- [Entytle: Customer Retention in Manufacturing](https://entytle.com/customer-retention-manufacturing-oems/)
- [Industrial Maintenance Services Market Size, Share, Trends Report 2025-2035](https://www.marketresearchfuture.com/reports/industrial-maintenance-services-market-12074)
- [Launch Advisor: Industrial Equipment Repair Pricing Guide 2026](https://www.launchadvisor.co/guides/pricing-strategy-industrial-equipment-repair-service)
- [Middlesex Consulting: Service Contract Attachment At Time Of Sale](https://middlesexconsulting.com/service-contract-attachment-time-sale-team-effort/)
- [TSIA: Top KPIs for Field Service Organizations](https://www.tsia.com/blog/top-kpis-for-field-service-organizations/)
- [SmartServiceOps: The $100M Opportunity Hiding in Your Installed Base](https://smartserviceops.com/the-dollar100m-opportunity-hiding-in-your-installed-base/)
- [Entytle: Service Revenue Growth Strategies for Industrial OEMs](https://entytle.com/service-revenue-growth-industrial-oem/)
- [Hyperstart: Contract Renewal 2026 Guide](https://www.hyperstart.com/blog/contract-renewal/)
- [ExpirationReminder: Real-World Failures Caused by Missed Contract Renewals](https://www.expirationreminder.com/blog/real-world-failures-missed-contract-renewals)
- [ServiceXRG: Moving Beyond Industry Average Renewal Performance](https://www.servicexrg.com/blog/beyond-average-renewal/)
- [Ironclad: Contract Renewal — How Much Revenue Can You Recover?](https://ironcladapp.com/journal/contract-process/increase-renewals-using-contract-data)
- [CustomerGauge: Average Customer Retention Rate by Industry (2025)](https://customergauge.com/blog/average-customer-retention-rate-by-industry)
- [Sci-Tech Today: Customer Churn Statistics By Industry and Prevention (2026)](https://www.sci-tech-today.com/stats/customer-churn-statistics/)
- [Makula: CRM for the Machinery Industry](https://www.makula.io/blog/crm-for-machinery-oems)
- [iMark InfoTech: Salesforce CPQ Customization Pitfalls That Break Renewals](https://www.imarkinfotech.com/salesforce/blogs/salesforce-cpq-customization-pitfalls-that-break-renewals/)
- [Salesforce Help: Contract generation fails in CPQ](https://help.salesforce.com/s/articleView?id=000381761&language=en_US&type=1)
- [Advanced Tech: Benefits of Annual Maintenance Contracts for Your Plant](https://www.advancedtech.com/blog/benefits-of-annual-maintenance-contracts-for-your-plant/)
- [PTC: ServiceMax Asset 360 for Salesforce](https://www.ptc.com/en/products/servicemax)
- [MS Bureau: B2B Debt Recovery Rates by Industry — 2026 Benchmark Report](https://msbureau.com/blog/b2b-debt-recovery-rates-by-industry-2026/)

---

## MSP (Managed Services)

**Current**: 600 renewals/yr, $18,000 ACV, shared 12/10/7/5% slip ladder, shared 70% recovery

| Metric | Finding | Source | Confidence |
|---|---|---|---|
| Average client count, mid-market MSP | ~122 clients | Kaseya / Datto aggregate | High |
| Renewal touchpoints per client per year | 1.7-3.3x (implies ~300-400/yr at 122 clients) | RetainerHub benchmark | Medium |
| MRR band distribution: $1,001-$2,500 (largest segment) | 26% of MSPs, $12k-$30k annualized | Kaseya 2026 State of the MSP | High |
| MRR band: $2,501-$5,000 | 23% of MSPs, $30k-$60k annualized | Kaseya 2026 | High |
| Deal-size compression trend | 55% of MSPs now report typical customer spend <$25k/yr (up from 24% a year prior) | Kaseya 2026 | High |
| Baseline churn, no formal tracking | 12% annual | Xurrent aggregate benchmark | High |
| Churn reduction, dedicated renewal system | 40% fewer missed renewals vs. manual | RetainerHub survey | Medium |
| Churn reduction, proactive 90-day QBR vs. reactive 30-day | 15% → 4% churn (73% reduction) | Cuoral case study | Medium |
| Immediate leakage recovery via PSA automation | 10-15% | Mosaic aggregate | Medium |
| Cycle time improvement | 40% faster | BluLogix case study | Medium |
| Missed-renewal cost example | $4,500 lost on a $3k/month contract from a 6-week slip | RetainerHub | Medium |

**Gaps**: No source breaks ACV down specifically by 50-100 vs. 100-250 employee MSPs.
The 10% (spreadsheets) and 7% (partial system) intermediate slip-rate tiers have no
direct source; only the 12% (no tracking) baseline and <5% (best-practice target) are
grounded.

**Recommended values**: Renewals/year: lower from 600 to 300-500 (client-count-derived).
ACV: raise from $18,000 to $24,000-$30,000 to better match the largest 2026 MRR
segment, while noting the deal-compression trend as a real caveat worth keeping in
mind if this number needs revisiting again next year. Slip ladder: keep 12% for "no
tracking" (validated), but the 10%/7% middle tiers should be labeled as reasonable
estimates rather than sourced figures. Recovery rate: 70% is defensible only at the
aggressive/QBR-maturity end of the range (10-15% conservative up to 73% aggressive);
consider showing a range or footnoting that 70% assumes disciplined proactive renewal
management, not just having a tracking tool.

**Sources**:
- [Kaseya: MSP Pricing / Managed IT Services Pricing Guide](https://www.kaseya.com/resource/msp-pricing-managed-it-services-pricing/)
- [Kaseya: 2026 State of the MSP Report Insights](https://www.kaseya.com/resource/2026-kaseya-state-of-the-msp-report-insights/)
- [LTVplus: 10 Takeaways from the Kaseya 2026 State of the MSP Report](https://www.ltvplus.com/msp/kaseya-2026-msp-report-findings/)
- [Xurrent: The MSP customer retention challenge — combating the 12% annual churn rate](https://www.xurrent.com/blog/the-msp-customer-retention-challenge-combating-the-12-annual-churn-rate)
- [Datto: Global State of the MSP Report 2024](https://www.datto.com/resources/dattos-global-state-of-the-msp-report-2024/)
- [Datto Blog: Datto Launches 2024 Global State of the MSP Report](https://www.datto.com/blog/datto-launches-global-state-of-the-msp-report-trends-and-forecasts-for-2024/)
- [CompTIA: Trends in Managed Services 2022](https://connect.comptia.org/content/research/trends-in-managed-services-2022)
- [Customer Thermometer: Combating MSP Churn](https://www.customerthermometer.com/customer-retention-ideas/combating-msp-churn/)
- [MSP Success: Profitable MSP Clients Have These Things in Common (2025)](https://mspsuccess.com/2025/07/survey-says-profitable-msp-clients-have-these-things-in-common-do-yours/)
- [RetainerHub: MSP Contract Management](https://www.retainerhub.io/blog/msp-contract-management)
- [Better Tracker: How Do MSPs Track Vendor Contracts and Renewals?](https://blog.bettertracker.com/how-do-msps-track-vendor-contracts-and-renewals-and-stop-losing-money-to-auto-renewals)
- [Mosaic: PSA Adoption & ROI Statistics in Professional Services](https://www.mosaicapp.com/post/psa-adoption-roi-statistics-in-professional-services)
- [Cuoral: Proactive Churn Prevention — 7 Proven Tactics](https://cuoral.com/blog/proactive-churn-prevention-7-tactics)
- [BluLogix: Contract & Renewal Management for MSPs](https://blulogix.com/solutions/use-case/contract-and-renewal-management-optimization/)
- [Expert Insights: 30+ Stats And Trends MSPs Should Know In 2025](https://expertinsights.com/it-management/30-msp-stats)
- [Flamingo: MSP Statistics 2026 and Industry Analysis](https://www.flamingo.run/blog/msp-pricing-models)

---

## IoT

**Current**: 350 renewals/yr, $30,000 ACV, shared 12/10/7/5% slip ladder, shared 70% recovery

| Metric | Finding | Source | Confidence |
|---|---|---|---|
| IoT monthly churn (aggregate) | 5.88% monthly | ZipIt Wireless | Medium |
| Equipment-as-a-Service annual churn | ~7% | EaaS industry data | Medium |
| Hardware renewal rate, typical | 75% (25% slip) | Hardware/asset-management industry data | Medium |
| Hardware renewal rate, with asset-management best practices | 97% (3% slip) | Same source | Medium |
| Missed renewals, manual/spreadsheet tracking | 8.4% | Asset management studies | Medium |
| Missed renewals, automated systems | 0.5% (94% improvement) | Same | Medium |
| Mid-market ACV range | $15,000-$50,000 (typically $15k-$50k) | Industry pricing data | Medium |
| Telematics per-device pricing | $4-$50/month on 3-year contracts | Telematics industry pricing | Medium |
| Recovery, at-risk window (pre-cancellation) | 35-45% | Renewal automation industry data | Medium |
| Recovery, post-cancellation | 6% | Same | Medium |
| Recovery, one automation case study | 68% conversion of at-risk outreach | Single case study | Low-Medium |

**Gaps**: No source gives IoT-specific renewal counts by company size (350/yr is
unvalidated, plausible order-of-magnitude only). No source breaks slip rate down by
the four tracking-maturity tiers used in the code. No IoT-specific renewal-process ROI
case study; findings above are from adjacent hardware/EaaS categories, explicitly
flagged by the research as proxies, not direct IoT data.

**Recommended values**: ACV ($30,000) is reasonable, keep as-is or note it's on the
conservative side of a $15k-$50k range. Renewals/year (350): flag as an unvalidated
assumption. Slip rate: use the 75%→97% hardware-renewal progression as the primary
maturity curve instead of the generic percentages — this vertical's "no tracking"
baseline is genuinely much worse than 12%. Recovery rate: this is the clearest
"too optimistic" flag in the whole set — real data supports 35-45% (conservative,
pre-cancellation) rather than 70%; only use a number near 68% if explicitly caveated
as a single best-case study, not a typical outcome.

**Sources**:
- [ZipIt Wireless: IoT Subscriber Churn](https://www.zipitwireless.com/blog/iot-subscriber-churn-what-it-is-how-to-measure-it-and-why-it-matters)
- [SubJolt: Churn Rate Benchmarks by Industry 2026](https://www.subjolt.com/guides/churn-rate-benchmarks/)
- [Zluri: Renewal Management Software](https://www.zluri.com/blog/renewal-management-software)
- [Eightx: Subscription Churn by Billing Period 2026](https://eightx.co/blog/average-ecommerce-subscription-churn-by-billing-period-2026)
- [Martal: Annual Contract Value Guide 2026](https://martal.ca/annual-contract-value-lb/)
- [GPS Insight: Telematics Cost Guide 2026](https://www.gpsinsight.com/blog/what-is-the-cost-of-telematics/)
- [Expedite Commerce: Subscription Renewal Automation](https://www.expeditecommerce.com/subscription-renewal-automation-stop-revenue-slippage-now/)
- [Salesforce: Revenue Leakage Prevention](https://www.salesforce.com/sales/revenue-lifecycle-management/revenue-leakage/)
- [UMA Technology: Revenue Leakage in Contracts](https://umatechnology.org/revenue-leakage-how-much-money-are-you-losing-in-your-contracts/)
- [Mordor Intelligence: IoT Analytics Market](https://www.mordorintelligence.com/industry-reports/iot-analytics-market)
- [GetMonetizely: IoT Device Pricing & Hardware+Software Bundling](https://www.getmonetizely.com/articles/maximizing-value-through-iot-device-pricing-the-art-of-hardware-software-bundling)
- [Emergen Research: IoT Platform Market Report](https://www.emergenresearch.com/industry-report/internet-of-things-platform-market)
- [Zuora: 2025 Subscription Economy Index](https://www.zuora.com/resource/the-2025-subscription-economy-index/)
- [US Tech Automations: Contract Renewal Automation 2026](https://ustechautomations.com/resources/blog/automate-contract-renewal-reminder-small-business-2026)

---

## SaaS

**Current**: 700 renewals/yr, $15,000 ACV, shared 12/10/7/5% slip ladder, shared 70% recovery

This is the best-documented vertical by a wide margin.

| Metric | Finding | Source | Confidence |
|---|---|---|---|
| Typical customer count, mid-market | 200-400 (lower end), up to 563 median at larger mid-market | SaaS Capital / Velocity Partners | Medium |
| Median ACV, all private SaaS | $26,265 | SaaS Capital 2025 | High |
| Median ACV, $5-10M ARR band | $30,592 | SaaS Capital 2025 | High |
| Median ACV, $10-20M ARR band | $56,101 | SaaS Capital 2025 | High |
| Vertical SaaS ACV | $25,000-$50,000 median | Optifai | High |
| Horizontal SaaS ACV | $8,000-$15,000 median | Optifai | High |
| Voluntary churn, B2B SaaS average | 2.6-3.5% | Aggregate SaaS benchmarks | High |
| Involuntary churn (payment failure) share of total churn | 20-40% | Zuora Subscription Economy Index 2025 | High |
| Healthy renewal-rate target | 85-95%+ | Klipfolio, Hubifi | High |
| NRR, mid-market ($25k-$100k ACV) median | 108% | Optifai / SaaS Capital | High |
| NRR, SMB (<$25k ACV) | 97% | ChartMogul | High |
| NRR, enterprise ($100k+ ACV) | 118% | ChartMogul | High |
| Expansion share of total growth | 35-40% | OpenView / SaaS Capital | High |
| Churn reduction from renewal-workflow automation | 15-22% (case examples) | HubSpot case study compilation | Medium |
| At-risk account recovery rate | 60-70% | Chargify / industry standard | Medium |
| Optimized dunning recovery rate | 70-85% | Chargify / Mondaymorning | High |
| Failed-payment recovery, industry median | 47.6% | Recurflux SaaS Payment Failure Report | High |
| Failed-payment recovery, top performers | 80%+ | Recurly / Chargify | High |

**Gaps**: No source ties slip/renewal-failure rate specifically to tracking-system
maturity (spreadsheets vs. partial system vs. custom workflows) — available data
separates voluntary vs. involuntary churn instead, which is a different cut than the
calculator's model. The 700 renewals/year figure is likely too high for a true 50-100
employee company (200-400 is better supported) unless the business is self-serve/PLG.

**Recommended values**: Renewals/year: lower from 700 to 250-400. ACV: raise from
$15,000 towards $25,000-$40,000 if positioning as vertical/operations SaaS (SwotBee's
own ICP is closer to vertical SaaS than horizontal/SMB self-serve); keep $15,000 only
if deliberately targeting the SMB/self-serve end. Recovery rate: **this is the one
industry where the current flat 70% is genuinely well-supported** (60-70% at-risk
recovery, up to 85% optimized) — no change needed here. Consider a follow-up scope
item (out of this pass): modeling involuntary/payment-failure churn as a distinct,
highly recoverable (70-85%) sub-category, since it's 20-40% of total SaaS churn and
the current model doesn't separate it.

**Sources**:
- [SaaS Capital: Average Deal Size for Private SaaS Companies](https://www.saas-capital.com/blog-posts/what-is-the-average-deal-size-for-private-saas-companies/)
- [Optifai: B2B SaaS ACV Benchmark](https://optif.ai/learn/questions/b2b-saas-acv-benchmark/)
- [Optifai: B2B SaaS Net Revenue Retention Benchmark](https://optif.ai/learn/questions/b2b-saas-net-revenue-retention-benchmark/)
- [Vitally.io: SaaS Churn Benchmarks](https://www.vitally.io/post/saas-churn-benchmarks)
- [ChartMogul: SaaS Retention Report — The AI Churn Wave](https://chartmogul.com/reports/saas-retention-the-ai-churn-wave/)
- [KeyBanc Capital Markets SaaS Survey 2025 (via Younium)](https://www.younium.com/blog/saas-churn-rate)
- [HubSpot: Automated Subscription Renewal Workflows](https://blog.hubspot.com/service/automated-subscription-renewal-workflows)
- [Planhat: AI for Renewals — Spreadsheet to Predictable Revenue](https://www.planhat.com/editorial/ai-for-renewals)
- [Zuora: Subscription Economy Index 2025](https://www.zuora.com/resource/subscription-economy-index/)
- [Recurflux: SaaS Payment Failure Report 2026](https://recurflux.com/resources/saas-payment-failure-report)
- [Velocity Partners: B2B SaaS Metrics Based on 200+ Private Companies](https://medium.com/velocity-partners/b2b-saas-metrics-based-on-200-private-companies-977cf417dee5)
- [US Tech Automations: ChurnZero vs Gainsight Customer Success 2026](https://ustechautomations.com/resources/blog/churnzero-alternative-saas-churn-reduction-2026)
- [ChurnZero: VitalSource Case Study](https://churnzero.com/case-studies/vitalsource/)
- [OpenView / Orb: B2B SaaS Benchmarks](https://www.withorb.com/blog/b2b-saas-benchmarks)
- [Maxio: 2025 B2B SaaS Benchmarks Report](https://www.maxio.com/resources/2025-saas-benchmarks-report)
- [Vendr: SaaS Trends Report 2025](https://www.vendr.com/insights/saas-trends-report)
- [Subscription Insider: Zuora's 2025 Subscription Economy Index Analysis](https://www.subscriptioninsider.com/article-type/news/zuoras-2025-subscription-economy-index-reveals-growth-resilience-but-signals-a-new-playbook-is-needed)

---

## Proptech

**Current**: 300 renewals/yr, $22,000 ACV, shared 12/10/7/5% slip ladder, shared 70% recovery

| Metric | Finding | Source | Confidence |
|---|---|---|---|
| Proptech-specific monthly churn | 3-5% monthly (36-60% annualized) | Qubit Capital PropTech SaaS KPI Benchmarks | High |
| Vertical SaaS churn (proxy) | 9% annual (91% gross retention) | SaaS Mag | High |
| General SaaS churn (proxy) | 10-15% annual | SaaS Capital | High |
| Manual-process renewal penalty | 20-30% lower renewal rates vs. automated | Saber / Monetizely | Medium |
| Property-management software ACV, 50-200 units | $4,800-$18,000 first-year | OnGraph | High |
| Proptech LTV proxy | $5,000-$15,000 lifetime | Qubit Capital | Medium |
| General mid-market SaaS ACV (proxy) | $15,000-$50,000 | Martal | High |
| Spreadsheet lease-tracking error rate | 88% of spreadsheets contain at least one calculation error | Black Owl Systems | Medium |
| Missed-renewal cost | 12 months of lost income + $1,000-$5,000 turnover cost/unit | Yardi | High |
| At-risk recovery with 90-day advance warning | 60% | Revenue Institute case study | Medium |
| Renewal-rate lift from QBRs | +20% | Saber / Monetizely | Medium |
| Renewal-rate lift from predictive health scores | +18% | Saber / Monetizely | Medium |
| Automation impact vs. manual | 40% faster processing, 75% less admin time | Yardi | High |

**Gaps**: No direct source for renewal count per mid-market proptech company; 300/yr
is an inference from typical 100-500 managed units, not a direct benchmark. No
proptech-specific recovery-rate study exists; 60% (general SaaS, with 90-day warning)
is the closest proxy, and the research flags proptech likely runs *lower* than generic
SaaS because of the specific PMS/CRM data-silo problem this page's copy already calls
out.

**Recommended values**: Renewals/year (300): plausible but genuinely unvalidated,
flag accordingly. ACV: the $22,000 placeholder sits above the proptech-specific LTV
proxy ($5k-$15k) but within the general mid-market SaaS range ($15k-$50k) — consider
testing $15,000-$25,000. Slip rate: this vertical's "renewal dates tracked off-CRM"
pain point is well-documented and likely means the "no tracking"/"spreadsheets" tiers
should run higher than today's 12%/10% (research suggests 15-20% / 12-15%). Recovery
rate: lower from 70% to roughly 40-60%, since the best available evidence (60% with a
90-day warning system already in place) is a best-case, not a baseline.

**Sources**:
- [Qubit Capital: PropTech SaaS KPI Benchmarks](https://qubit.capital/blog/proptech-saas-kpi-benchmarks)
- [SaaS Mag: Vertical SaaS Is Winning — Why Niche Beats Horizontal in the 2026 Market](https://www.saasmag.com/vertical-saas-niche-beats-horizontal-2026/)
- [OnGraph: Property Management Software Costs in 2025](https://www.ongraph.com/property-management-software-costs/)
- [Martal: Annual Contract Value (ACV) — The Complete 2026 Guide](https://www.martal.ca/annual-contract-value-lb/)
- [Saber / Monetizely: Manual Renewal Rate in SaaS](https://www.getmonetizely.com/articles/manual-renewal-rate-in-saas-key-to-understanding-customer-retention)
- [Revenue Institute: Renewal Risk Detection](https://revenueinstitute.com/industries/software/renewal-risk-detection)
- [Yardi: Missed Lease Renewals Cost Revenue](https://www.yardi.com/blog/cre-lease-renewal-management/)
- [Black Owl Systems: Spreadsheets vs Lease Software](https://blackowlsystems.com/spreadsheets-vs-lease-software-which-wins/)
- [AppFolio: Streamlining Leasing Operations — CRM Integration](https://www.appfolio.com/blog/leasing-crm)
- [SaaS Mag: SaaS Capital Efficiency Metrics — 2026 Benchmarks Guide](https://www.saasmag.com/saas-capital-efficiency-metrics/)
- [Appcues: Customer Retention Metrics (citing Bain & Company)](https://www.appcues.com/blog/customer-retention-metrics)
- [Tango Analytics: 10 Challenges in Lease Management](https://tangoanalytics.com/blog/lease-management-challenges/)
- [Enterprise DNA: How to Automate the Lease Renewal Process](https://enterprisedna.co/resources/guides/real-estate-automate-lease-renewal-process/)

---

## Summary: recommended changes at a glance

| Industry | Renewals/yr | ACV | Slip ladder | Recovery rate |
|---|---|---|---|---|
| Energy & Utilities | Keep 300 (unvalidated) | No confident number — flag as range, not point estimate | ~16% baseline (vs. today's 10-12%) | Lower to 15-30% (from flat 70%) |
| Field Service | Keep 800 (plausible) | **Lower to $3,000-$8,000** (from $12,000) | **Replace with ~70% / 58% / 51%** (from 12/10/7%) | Keep ~65% (close to today's 70%) |
| Industrial/Manufacturing | Keep 200 (unvalidated) | Keep $80,000 (unvalidated but not contradicted) | Keep ~10-12% (close to sourced 8-20%) | Keep 70% but label as assumption, not measured |
| MSP | **Lower to 300-500** (from 600) | **Raise to $24,000-$30,000** (from $18,000) | Keep 12% baseline; label 10/7% as estimates | Label 70% as "aggressive/QBR-maturity" case, not typical |
| IoT | Keep 350 (unvalidated) | Keep $30,000 (reasonable) | **Replace with 75%→97% hardware curve** (from 12/10/7/5%) | **Lower to 35-45%** (from flat 70%) |
| SaaS | **Lower to 250-400** (from 700) | Consider raising to $25,000-$40,000 if vertical-SaaS positioned | Keep as labeled estimate (no direct source either way) | **Keep 70%** — best-supported figure in the whole set |
| Proptech | Keep 300 (unvalidated) | Consider lowering to $15,000-$25,000 | Raise "no tracking"/"spreadsheets" tiers to 15-20%/12-15% | **Lower to 40-60%** (from flat 70%) |

## What this means for the code change (Option 3: full preset)

If the industry pill is restructured to set every field (company size, tracking
method, renewals, ACV, slip%) as a true per-industry template, the slip% and recovery
rate almost certainly need to stop being shared global constants (`TRACKING` object
and `RECOVERABLE = 0.7`) and become per-industry data, since the research above shows
they vary by 2-5x across verticals. That's a larger change than today's architecture
(`INDUSTRY` currently only supplies `renewals`/`acv`/copy; `TRACKING` and
`RECOVERABLE` are shared across all industries in the script).

## What's still missing before the graph can run on fully sourced presets

This research pass covered four fields: renewals/year, ACV, slip rate, and recovery
rate. It did **not** cover two fields the full-preset pill would also need to set:

- **Company size default per industry** — the code's `SIZE` multipliers (0.5x/1x/2x/4x
  for renewals, 0.85x/1x/1.3x/1.6x for ACV) are applied generically on top of whatever
  industry base is chosen; no industry has a "typical" company-size band established by
  this research.
- **Tracking-method default per industry** — same gap. Nothing here establishes
  whether, say, a typical mid-market MSP is more likely on spreadsheets vs. a partial
  system.

Neither is really a "look it up" fact the way churn or ACV are — there's no benchmark
report that says "MSPs are typically on spreadsheets." Setting these per industry would
be an illustrative authoring choice, not a sourced one, and should be labeled as such if
used.

Additionally, most of the four researched fields above came back as **ranges**, not
single point values a slider needs (e.g. Energy's recovery rate is "15-30%," not a
specific number). Turning a range into the single number the code requires is a
judgment call on top of the research, not an additional research question.

## What actually shipped (2026-07-27)

`RenewalRoiCalculator.astro` was rewritten to model a growth ceiling rather than a
flat linear projection: churn scales with the size of the renewal book, new business
does not, so the book converges on a ceiling of `new business / churn rate`, and
recovering part of that churn raises the ceiling. Company size (50-100 employees) and
tracking method (spreadsheets) are illustrative defaults every industry pill resets to,
not sourced per-industry claims. Point values chosen from the ranges above (midpoint
unless noted):

| Industry | Renewals/yr | ACV | Slip: nothing / spreadsheets / system / custom | Recovery |
|---|---|---|---|---|
| Energy & Utilities | 300 (kept, unvalidated) | $50,000 (kept, unvalidated) | 20% / 16% / 12% / 8% | 22% (midpoint of 15-30%) |
| Field Service | 800 (kept) | $5,000 (midpoint of $3k-$8k) | 72% / 70% / 58% / 51% (from ServiceTitan's real 3-tier data) | 65% (sourced gap-closure calc) |
| Industrial/Manufacturing | 200 (kept, unvalidated) | $80,000 (kept, unvalidated) | 20% / 16% / 12% / 8% | 70% (kept; no better source, labeled as assumption) |
| MSP | 400 (midpoint of 300-500) | $27,000 (midpoint of $24k-$30k) | 12% / 10% / 7% / 5% (kept; endpoints validated) | 45% (moderate case, not the aggressive 70%) |
| IoT | 350 (kept, unvalidated) | $30,000 (kept) | 25% / 18% / 10% / 3% (from the 75%-97% hardware-renewal curve) | 40% (midpoint of 35-45%) |
| SaaS | 325 (midpoint of 250-400) | $28,000 (within $25k-$40k suggested range) | 15% / 11% / 8% / 5% (no direct source; kept close to general renewal-rate target) | 70% (kept; best-supported figure in the whole set) |
| Proptech | 300 (kept, unvalidated) | $20,000 (midpoint of $15k-$25k) | 18% / 13% / 9% / 5% (raised from the original ladder per research) | 50% (midpoint of 40-60%) |

The chart's Y-axis zooms to the range the two lines actually occupy rather than
starting at $0, since several industries' gap is a small slice of a large book (e.g.
Energy's default view is a $2M gap on a $15-19M scale) and a 0-based axis compressed it
to near-invisibility.

**Update (2026-07-28)**: reworked further to match the "elephant curve" shape from
Jason Cohen's MicroConf US 2026 talk (the source for the growth-ceiling framing above):
both paths now start from today's actual renewal volume and genuinely diverge, instead
of the "if nothing changes" line being flat from year 0. Today's book is illustrated at
`START_FRACTION_OF_CEILING = 0.8` (80%) of the way to the ceiling its current churn
implies — another illustrative dramatization constant, not a sourced figure, same
category as the company-size/tracking defaults. This makes the "if nothing changes"
line rise briefly then visibly stall (dramatically so for high-slip industries like
Field Service, which flattens almost entirely by Year 1-2; more gradually for low-slip
industries like Energy), while "if you fix the leak" keeps climbing throughout, since
its effective churn rate is always lower by construction. A draw-in animation
(CSS `stroke-dashoffset`) plays once per session when the calculator scrolls into view,
then uses a fast crossfade for subsequent industry/dropdown changes; researched a range
of charting libraries first and confirmed none beat the zero-dependency approach for a
chart this small.
