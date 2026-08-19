# Pillar 4: Renewal Services (Who Runs Your Renewals) Cluster Plan

Applies the merged SEO pipeline (`seo-content-pipeline-neuronwriter-merged.md`) and the
`blog-creation-playbook.md` workflow to a fourth renewal pillar. Unlike Pillars 1 to 3,
the source brief is not a prompt doc: it is first-party Search Console evidence mined in
`marketing/ads/research/gsc/` (365-day window) plus the ad-side keyword work in
`marketing/ads/23-keyword-conversion-review.md`.

Status 2026-08-19: 15 `new-query` + 2 `evaluate-content` credits spent. Keyword research
is COMPLETE. Confirmed: P0-S, S2, S3, S4, S5, S6, S8. Dropped: S1 (merged), S7 (no clean
keyword exists). S4 is written and scored (63). Nothing else drafted.

---

## Why a fourth pillar exists

The three renewal pillars cover three intents:

- **Pillar 1** `hubspot-renewal-pipeline-complete-guide` (17 clusters): how to BUILD renewals.
- **Pillar 2** `renewal-metrics-explained` (11 clusters): how to MEASURE renewals.
- **Pillar 3** `renewal-strategy-365` (12 clusters): how to WIN renewals.

All three address a reader who is going to do the work themselves. None address the
reader deciding **who does the work**. That reader is the person who buys the $600 audit
and the build engagement, which is where SwotBee's revenue actually comes from.

**Pillar 4 owns the "who does it" axis: in-house, outsourced, or software.**

## The evidence

Search Console, 365 days, queries with service intent and the page currently answering them:

| Query | Impressions | Position | Currently answered by |
|---|---|---|---|
| `customer retention consultants` | 35 | 6.1 | `customer-retention-consulting` (orphan post) |
| `who provides customer retention management consulting services` | 33 | 9.7 | `customer-retention-consulting` (orphan post) |
| `outsourcing renewal management` | 27 | **45.8** | `contract-renewal-management-complete-guide` (generic) |
| `help implementing hubspot crm hubspot onboarding support for team` | 8 | 15.2 | nothing dedicated |
| `quote-to-cash software vs diy hubspot + stripe + zapier setup` | 8 | 6.4 | `quote-to-cash` |
| `affordable strategic crm implementation options` | 5 | 9.0 | nothing dedicated |
| `small business crm implementation guide without consultants` | 5 | 18.2 | generic CRM post |
| `outsourcing renewals` | 1 | 74.0 | `contract-renewal-management-complete-guide` (generic) |
| `how long does it take to set up a free crm like hubspot ...` (8 variants) | 51 combined | 9.5 to 16.3 | generic CRM post |

Two structural problems this pillar fixes:

1. `customer-retention-consulting` is the **best-matched page to SwotBee's actual offer**
   and it has no `seriesName`, no `pillarUrl`, and no cluster. It is an orphan ranking at
   position 6.1 by accident.
2. `outsourcing renewal management` sits at position 45.8 because a generic management
   guide is absorbing a service query. Google half-recognises the site and finds no page
   for the intent.

## The volume caveat, stated up front

This pillar will never produce the impression counts the comparison posts do
(`HubSpot Free CRM vs Competitors` earns 7,988 impressions). The service queries above
total a few hundred impressions a year. It is chosen for **buyer match, not volume**.
The judgement being made is that 27 impressions from someone looking to hire is worth
more than 7,988 from someone shopping for a free CRM.

The supporting fact: over 365 days the site earned 17,242 impressions and **3 clicks**,
with **zero clicks at positions 1 to 3**. Ranking is not the constraint here and more
volume of the wrong kind does not help.

---

## System context (Framework B)

- **core_topic:** deciding who operates B2B renewal processes, and what each option costs.
- **audience_persona:** RevOps lead, VP Ops/Finance, or COO at a mid-market B2B company on
  HubSpot Pro/Enterprise, who has concluded the current renewal process is failing and is
  now scoping whether to fix it internally, hire, or buy.
- **authority_goal:** own "who should run our renewals" the way Pillar 1 owns "how to run them."
- **differentiation_strategy:** publish real numbers (cost, timeline, scope) that
  consultancies deliberately withhold, and state honestly when the answer is "do not hire
  anyone." Naming non-fits is what makes the page citable.

## Cannibalization map

Cross-link these, do NOT duplicate:

| Existing page | Relationship |
|---|---|
| `customer-retention-consulting` | **Already a cluster of `b2b-saas-customer-retention`.** Do NOT rehome. P0-S links to it. Expanded 2026-08-19 to 1,855 words, score 63. |
| `contract-renewal-management-complete-guide` | Its own pillar. S1 takes `outsourcing renewal management` off it; the guide cross-links to S1. |
| `renewal-tracking-software-vs-spreadsheet` | S2 must argue **who does the work**, not which tool. Cross-link, do not restate. |
| `quote-to-cash` | Already catches the DIY-vs-buy query at position 6.4. S2 cross-links rather than competing. |
| `hubspot-contract-management`, `contract-renewal-process-checklist`, `renewal-playbook-template` | Pillar 1/Contract Renewal Management clusters. Link from S3 and S7 as "the work an engagement performs." |

## Pillar

- **id:** P0-S
- **title:** "Who Should Run Your Renewals: In-House, Outsourced, or Software"
- **primary_keyword:** `outsourced renewal management` **(CONFIRMED clean, 2026-08-19)**.
  The alternative `renewal management services` was tested and rejected as contaminated.
- **word_count target:** 1,166 (NeuronWriter, query `5dca6c59f6ab73c1`)
- **role:** core authority page; links to all 8 clusters, to Pillars 1 to 3, and to the
  conversion surfaces.

**Intent pre-check: DONE.** Results in the section below. Bare `renewal management` and
`renewal management services` are both contaminated with buy-side procurement and CLM
intent. `outsourced renewal management` is clean and is the confirmed pillar keyword.

---

## Cluster set

| ID | Working title | Primary keyword (NW query) | Evidence | Decision |
|----|---------------|----------------------------|----------|----------|
| ~~S1~~ | Outsourced Renewal Management: What It Costs and When It Beats Hiring | - | - | **MERGED into P0-S** (same keyword, same question) |
| S2 | HubSpot Renewals: Do It Yourself, Hire Help, or Buy an App? | `hubspot renewal setup help` **(clean, 1,129w)** | 8 @ 15.2; 8 @ 6.4 | NET-NEW |
| S3 | What a Renewal Operations Audit Actually Finds (and What It Costs) | `revenue operations audit` **(clean; scope to renewals)** | maps to the paid audit; no page exists | NET-NEW |
| S4 | How to Choose a HubSpot Renewal Consultant: 9 Questions to Ask | `customer retention consultants` | 35 @ 6.1 + 33 @ 9.7 | REHOME + EXPAND existing orphan |
| S5 | The Real Cost of Broken Renewal Operations: a CFO-Ready Model | `renewal revenue leakage` **(clean, 1,858w)** | pairs with the leakage estimate offer | NET-NEW, heavy competition |
| S6 | How Long Does a HubSpot Renewal Build Take? A Realistic Timeline | `hubspot implementation timeline` **(clean, 1,106w)** | 51 impr combined, 9.5 to 16.3 | NET-NEW |
| ~~S7~~ | Renewal Operations Health Check: 12 Signs Your HubSpot Setup Is Leaking | - | - | **DROPPED as an SEO target** after 3 failed keywords. Keep as support content for `/renewal-scorecard/` |
| S8 | Fractional RevOps vs a Full-Time Hire vs an Agency | `fractional revops vs full time hire` **(clean, 2,232w)** | 5 @ 9.0 | NET-NEW |

Final: **Pillar P0-S + 6 writable clusters.** S1 merged into the pillar; S7 dropped as an SEO target; S4 stays in its existing pillar and is already written.

## Internal linking graph

This pillar links differently from Pillars 1 to 3, and that difference is the point.

- **P0-S ->** all 8 clusters, plus Pillar 1 (build), Pillar 2 (measure), Pillar 3 (win),
  plus `contract-renewal-management-complete-guide`.
- **Each cluster ->** P0-S + 2 to 3 siblings + the most relevant existing post.
- **Conversion terminals (new for this pillar):** where Pillars 1 to 3 link post-to-post,
  every P0-S cluster ends at a service surface:
  - S1, S2, S4, S8 -> `/renewal-audit-call/`
  - S3, S7 -> `/pay-renewal-audit/` and `/renewal-scorecard/`
  - S5 -> `/resources/renewal-leakage-estimate/` and `/renewal-leakage-tool/`
  - S6 -> `/services/sales-revops/` and `/services/hubspot-onboarding/`
- **Reverse link:** add a P0-S link to `contract-renewal-management-complete-guide` so the
  page currently absorbing `outsourcing renewal management` hands that intent onward.

## Linkable assets / hooks

- A published price and scope table on S1 and S3. Competitors gate this behind a call,
  which is exactly why an assistant cannot cite them and can cite us.
- The 12-signal checklist on S7, reusable as the existing scorecard's written companion.
- The CFO leakage model on S5, with the arithmetic shown rather than asserted.

## Execution order

1. **S4 first** (not the pillar). It is a 954 -> 1,707 word expansion of a page already
   ranking 6th on a clean SERP, so it is the cheapest win and needs no new keyword.
2. **P0-S pillar** (keyword confirmed; write to the 1,166 target -> optimize -> import -> build).
3. **S3, S5** (closest to the paid offer).
4. **S2, S6, S7, S8**.
5. Pillar back-links, conversion-terminal links, final build.

---

## Intent pre-check results (2026-08-19)

Three `new-query` credits spent on the `swotbee.com` project, engine `google.com`.
Query IDs: P0-S-A `88e5d7cdb470467f`, P0-S-B `5dca6c59f6ab73c1`, S4 `054b4417c0f1a771`.

### P0-S-A `renewal management services` -> REJECTED, contaminated

The SERP is buy-side IT procurement and contract lifecycle management, not vendor-side
renewal revenue. Who ranks: Insight.com ("Software Renewal Management: Track Contracts &
Cut Costs"), CDW ("Hardware & Software Renewal Management"), Pramata, Sirion.ai,
mydock365, articsledge. The h1 zone demands `contract lifecycle`,
`contract lifecycle management` and `software renewal`.

This is the same contamination the Google Ads negative list blocks (`vendor`,
`procurement`, `supplier`, `spend management`, `saas management`, `license management`,
`it asset`, `software asset management`), and the same trap playbook learning #1 records
for "saas renewal strategy". Do not use this keyword. Word count target was 1,897 for the
wrong topic.

### P0-S-B `outsourced renewal management` -> ACCEPTED as the pillar keyword

Clean, and on the correct side of the table. Who ranks: iAsset ("Is It a Bad Idea to
Outsource Renewals Management?"), Concentrix, CGS Nexus, SupportNinja ("8 Benefits of
Outsourcing SaaS Renewal Management"), 1Point1, Invensis ("Subscription Renewal
Outsourcing Services"). These are providers selling renewal management as a service to
software vendors, which is SwotBee's side.

The topic matrix maps almost exactly onto the planned pillar: "Why should a company
outsource renewal management?", "What factors should a company consider when choosing an
outsourcing partner for renewals?", "Is outsourcing renewal management suitable for
businesses of all sizes?"

**Word count target 1,166**, which is short and very achievable. Playbook learning #3
notes that concise articles cap out in the 45 to 60 band only when competitor targets run
1,500 to 2,700. At 1,166 a properly built article can score well.

Two caveats to carry into drafting:
- **The ranking competitors are large BPOs selling outsourced renewal *teams*, not
  systems work.** SwotBee builds the renewal system, it does not staff a calling desk.
  The article must state that difference plainly. Framed well it is the differentiator
  ("fix the system" versus "rent a team"); ignored, it attracts the wrong enquiry.
- PAA contains generic outsourcing noise ("Is outsourcing a dying concept?", "Is
  outsourcing illegal in the US?", "Is outsourcing medical billing a good idea?"). Per
  playbook learning #5, do not chase these.

### S4 `customer retention consultants` -> ACCEPTED, and already ranking

Clean SERP of consulting marketplaces and boutique consultancies: Consultport, Toptal,
Beyond Philosophy, Umbrex (twice), Simon-Kucher, Sand Cherry, Prime 8. No software
vendors, no procurement intent.

**swotbee.com already ranks 6th on this SERP** with the orphan
`customer-retention-consulting` post, which independently matches the Search Console
position of 6.1.

**Word count target 1,707. The existing post is 954 words**, a 44% shortfall against a
SERP it already ranks page-one on. Per playbook learning #3 this is the cheapest
available win in the plan: expand an already-ranking page to target length rather than
write anything new.

One judgement call for drafting: this SERP is generalist retention consulting, not
HubSpot-specific. Keep the HubSpot qualifier in the page anyway. Organic impressions cost
nothing, so qualifying in the copy filters the enquiry without any downside, which is the
same reasoning applied to the pinned ad headline.

### S3 `revenue operations audit` -> ACCEPTED, with a scope warning

Query `7f6455a505ecb139`. Word count target 1,350.

The core SERP is RevOps agencies selling audits, which is exactly the offer: Nomad GTM
Consulting ("RevOps Audit Services"), SmartBug Media, Elevate Labs, Growth Sutra, RevOps
Co-op, RevBlack, SaaScend. Topic matrix is on point: "What is a revenue operations
audit?", "What are the key steps or phases in conducting a revenue operations audit?",
"When should a company consider implementing or auditing revenue operations?"

Two problems to design around rather than reasons to reject:

- **Scope mismatch is the real risk, not contamination.** `revenue operations audit` is
  broader than what SwotBee sells. The paid deliverable is a renewal-scoped audit, not a
  full RevOps audit covering marketing ops, sales ops and the whole funnel. Ranking here
  without stating the boundary invites enquiries for work SwotBee does not do. The article
  must scope itself explicitly to renewal operations.
- **SmartBug Media ranks on this term.** They are a major HubSpot partner selling the
  adjacent service, so this is the one keyword in the plan with direct, well-resourced
  competition on the actual offer.

Minor noise to ignore per playbook learning #5: accounting-audit intent bleeding in
("What are the 5 C's of auditing?", Hubifi "Auditing Revenue Recognition") and generic
definitional pages (Salesforce, productive.io).

### S8 `fractional revops` -> ACCEPTED ONLY IF RETARGETED

Query `759cdcf96048008d`. Word count target 1,262.

The hire-side demand is strongly confirmed. The top two topic-matrix questions are almost
the planned article verbatim: "What is fractional RevOps and how does it differ from
full-time RevOps or a consultant?" and "How much does fractional RevOps cost?" Buy-side
competitors rank well: RevPartners, Revenue Wizards, First Page Sage, Hyperscayle, Skaled,
RevOps On-Demand.

**But roughly half this SERP is career intent, not hiring intent.** Three Reddit r/revops
threads rank, two of them explicitly career-oriented ("Fractional Revops..good place to
invest my time??"), plus revopscareers.com ("Curated Fractional (Contractor) RevOps
Jobs"). The PAA block is dominated by it: "How much do rev ops make?", "Is RevOps a good
career?" The topic matrix carries "Is RevOps a good career path?" directly.

Writing one article for both audiences serves neither. **Recommendation: retarget to a
hire-side long-tail** such as `fractional revops vs full time hire` or
`hiring fractional revops`, per playbook improvement #3 (retarget to more specific
long-tail, never broader). That costs one more credit to verify and should be spent
before drafting.

### Note on competitor scores

All five pre-checks returned `score: null` for every ranking URL. Playbook learning #5
attributes null scores to forum-heavy SERPs, but five out of five across very different
SERP types suggests the account is simply not returning competitor scores rather than
anything SERP-specific. Do not treat "no score to beat" as "easy keyword". Fall back to
the playbook's absolute target of roughly 65+ and confirm on the first `evaluate-content`
call.

### Second batch, 2026-08-19 (6 credits)

| Seed | Keyword | Target | Verdict |
|---|---|---|---|
| S8r1 | `hiring fractional revops` | 2,256 | **REJECTED**, still job-seeker intent |
| S8r2 | `fractional revops vs full time hire` | 2,232 | **ACCEPTED**, clean buy-side decision SERP |
| S2 | `hubspot renewal setup help` | 1,129 | **ACCEPTED**, with a scope note |
| S5 | `cost of missed renewals` | 1,148 | **REJECTED**, buy-side auto-renewal intent |
| S6 | `hubspot implementation timeline` | 1,106 | **ACCEPTED** |
| S7 | `renewal process audit checklist` | 1,765 | **REJECTED**, accreditation-audit intent |

**S8 resolved.** Adding the word "hiring" did not fix the career contamination:
revopscareers.com ranks first, alongside gofractional.com ("Fractional Jobs"),
captivatetalent.com and revvise.com ("Revenue Operations Manager | Jobs"). The comparison
phrasing does fix it. `fractional revops vs full time hire` returns Desert West Digital
("Fractional RevOps vs. Full-Time Hire: How to Know Which One You Need"), Activated Scale
("Fractional RevOps Cost vs In-House Hiring"), Domestique ("Fractional vs Full-Time
RevOps"), and Fractional C-Suite ("Hiring Timeline: Fractional vs Full-Time Executive").
All buy-side. **Use `fractional revops vs full time hire`.** Note the 2,232-word target,
the longest in the plan.

**S2 accepted with a caveat.** The SERP is the most on-brand in the whole set (HubSpot
Knowledge Base, HubSpot Community twice, Arrows, Campaign Creators, Automation
Strategists, Thinkfuel, ConsultEvo) and the target is only 1,129 words. But the SERP wants
a **how-to**, not a **who-should-do-it**. Written naively this becomes a build article and
cannibalises Pillar 1's renewal-pipeline cluster. The article must answer the how briefly
and spend its length on the three-way decision. Also note four of the top ten are
HubSpot's own properties, which cannot realistically be outranked.

**S5 rejected, needs a retarget.** `cost of missed renewals` returns the buy-side of the
transaction: Sirion.ai, Contracts365 ("Auto-Renewing Contracts: Risks, Hidden Costs, and
How to Prevent Unwanted..."), Oblispace ("Auto-Renewal Cost Calculator"), Renewly
("Auto-Renewal Notice Windows"), Expiration Reminder. Every one is about **avoiding being
auto-renewed on contracts you bought**, the exact inverse of the vendor losing renewal
revenue. Candidate retargets, untested: `renewal revenue leakage`, `lost renewal revenue`,
`revenue leakage saas`.

**S7 rejected, needs a retarget.** `renewal process audit checklist` is not a commercial
term at all. It returns accreditation and compliance auditing: Texas Comptroller
("Auditing Fundamentals"), Aged Care Quality and Safety Commission ("Renewal of
registration audit guide"), NDIS renewal audit, IACET, an employee-benefit-plan audit
checklist, and a CCRN-E nursing recertification form. Wrong domain entirely. Candidate
retargets, untested: `renewal pipeline health check`, `revops health check`.

### Correction: S4 was never an orphan

An earlier note in this plan stated that `customer-retention-consulting` has no
`seriesName` or `pillarUrl`. That was wrong, caused by reading only the first 25 lines of
a frontmatter block that runs longer. It already carries
`seriesName: "B2B SaaS Customer Retention"` and
`pillarUrl: /posts/b2b-saas-customer-retention/`, and that home is topically correct.

**Revised handling: leave S4 where it is.** P0-S should link to it rather than claim it.
Moving a page that already ranks 6th, to satisfy a plan drawn up afterwards, is not worth
the risk, and a post can only carry one `pillarUrl`.

### S4 expansion: done

Expanded 954 -> 1,855 words against the 1,707 target. Content score **63** (first pass 61,
then on-brand missing terms woven in). Three new sections, all answering topic-matrix
questions the post did not previously address: what the consulting costs (with the $600
audit fee published), what counts as a good retention rate, and when **not** to hire a
consultant. Three FAQs added.

Off-brand terms deliberately left uncovered per playbook learning #1: `machine learning`,
`machine learning algorithms`, `content marketing`, `e-commerce`, `customer experience
design`, `funnel`, `innovative strategies`.

Not yet done for S4: `import-content` to the editor, a unique inline image check, and
`pnpm build`.

### Third batch: S5 and S7 retargets, 2026-08-19 (4 credits)

| Seed | Keyword | Target | Verdict |
|---|---|---|---|
| S5r1 | `renewal revenue leakage` | 1,858 | **ACCEPTED** |
| S5r2 | `lost renewal revenue saas` | 1,562 | Rejected, diffuse SERP |
| S7r1 | `renewal pipeline health check` | 467 | Rejected, incoherent SERP |
| S7r2 | `revops health check` | 1,253 | Rejected, brand collision |

**S5 solved. Use `renewal revenue leakage`.** The SERP is vendor-side throughout, which
is the side we are on: Salesforce, Sirion, BillingPlatform, Pramata, Turnstile, Recurly
("How to Stop Subscription Revenue Leakage"), Zuora ("How to detect and prevent revenue
leakage in your SaaS business"), Maxio, Oracle. It also maps cleanly onto the existing
`/resources/renewal-leakage-estimate/` offer.

Two warnings. This is **by far the most competitive keyword in the plan**: Salesforce,
Oracle, Zuora, Recurly and Maxio all rank, and none of them are beatable on domain
authority. Expect to win only the long tail of it. And "revenue leakage" is broader than
renewals, covering billing, pricing and contract leakage too, so the article carries the
same scope-discipline requirement as S3.

The alternative `lost renewal revenue saas` was rejected as unfocused: the SERP mixes
leakage, ARR metrics, revenue *recognition* (LogiSense, GoodSign, r/FPandA) and churn,
which means Google has no settled intent for it.

**S7 should be dropped as an SEO target.** Three keywords have now failed for three
different reasons, which is enough evidence that the "health check" framing has no clean
commercial SERP:

- `renewal process audit checklist` returns accreditation and compliance auditing.
- `renewal pipeline health check` returns a **three-way ambiguous** SERP: a healthcare
  company (pipelinehealth.us), **data-engineering** pipeline monitoring (Palantir,
  "Maintaining pipelines, Recommended health checks"), and sales pipelines. Instagram also
  ranks. The 467-word target is the tell: Google has no idea what this query means.
- `revops health check` collides with an exact-match brand. **revops.health is a
  healthcare revenue-cycle-management company** and owns 5 of the top 11 results, joined
  by micromd and elion.health. Entering this SERP means competing with a company whose
  domain is the keyword.

**Recommendation: do not write S7 as a keyword-targeted post.** The underlying asset
already exists as `/renewal-scorecard/` and `/resources/renewal-health-scorecard.astro`.
Keep the 12-signal checklist as supporting content for that tool, reachable from P0-S and
S3, and stop spending credits looking for a keyword that does not exist.

Worth noting: the LinkedIn result "The RevOps Health Check: 12 Signals Your Revenue System
Is Leaking" is almost exactly the planned S7 title. That content works as a LinkedIn post,
which is probably where it belongs.

### Final keyword status

| Seed | Keyword | Target words | Status |
|---|---|---|---|
| P0-S | `outsourced renewal management` | 1,166 | Confirmed |
| S2 | `hubspot renewal setup help` | 1,129 | Confirmed, scope caution |
| S3 | `revenue operations audit` | 1,350 | Confirmed, scope caution |
| S4 | `customer retention consultants` | 1,707 | **Written, score 63** |
| S5 | `renewal revenue leakage` | 1,858 | Confirmed, heavy competition |
| S6 | `hubspot implementation timeline` | 1,106 | Confirmed |
| S7 | none found | - | **Dropped as an SEO target** |
| S8 | `fractional revops vs full time hire` | 2,232 | Confirmed |

Pillar plus 6 writable clusters. 15 `new-query` and 2 `evaluate-content` credits spent.

### Consequence for the cluster map

The pillar now owns `outsourced renewal management`, which was S1's keyword. **S1 is
merged into the pillar rather than kept as a separate post**, because the pillar question
and the S1 question are the same question, and shipping both would be the exact
cannibalization this plan exists to prevent. If a cost-specific keyword
(e.g. `renewal management outsourcing cost`) later tests clean, S1 can be split back out.

Revised total: **Pillar P0-S + 7 clusters** (6 net-new, 1 rehomed).

Still untested: S2, S5, S6, S7. None of these carry the contamination profile of the
keywords already checked, but each should still be pre-checked before drafting.

S8 needs one further credit to validate a retargeted hire-side keyword before it can be
scheduled.

## Notes / watch-items

- **Intent contamination risk is high on this pillar.** `outsourced renewal management`,
  `revenue operations audit` and `fractional revops` can all pull agency-marketing SERPs
  or buyer-side procurement intent. Pre-check every seed per playbook improvement #1.
- **Do not call S3 or S7 a "free audit."** Per the D1 pricing decision, "audit" always
  means the paid deliverable. Free is the 1-page leakage estimate plus the 30-minute
  discovery call.
- **Do not source S5 or S7 from the State of HubSpot Renewals corpus.** That report and
  its 545 records are internal only by decision.
- Expect lower NeuronWriter scores than Pillar 1. These are service keywords on
  agency-heavy SERPs, which the playbook records as the 45 to 60 band. A 55 here is fine.
- **NeuronWriter project config, corrected 2026-08-19 against a live `/list-projects` call.**
  Use `swotbee.com` -> `NEURON_PROJECT_ID = 81bb975056569ae2`, engine `google.com`,
  English. Both older docs are wrong: `blog-creation-playbook.md` names
  `reputebee.com` / `4dbab1e6a21ced91` / `google.co.uk` (still exists, wrong site and
  wrong engine), and `seo-content-pipeline-neuronwriter-merged.md` names
  `3dcebed4e4031ff3`, which **no longer exists in the account at all**. A dedicated
  `swotbee.com` project now exists and is the correct home for this and all future work.
  Both companion docs should be corrected on the next pass.
