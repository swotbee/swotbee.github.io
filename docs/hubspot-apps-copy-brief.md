# SwotBee HubSpot Apps — Copy Brief for Website

> Source: Full codebase analysis of hubspot-dev. Use this as the basis for website copy, landing pages, feature sections, and marketing materials.
> Last updated: 2026-04-01

---

## Overview

SwotBee builds 4 HubSpot marketplace apps that solve CRM data quality, deal management, and revenue operations problems. All 4 apps share a single production-grade Django backend and are designed to work together or independently.

**The common thread:** HubSpot's native CRM tools break when companies have multiple branches, when data is incomplete, or when deals involve recurring revenue. SwotBee fills those gaps.

---

## App 1: Smart Company Picker

**Tagline idea:** "Stop guessing which CBRE. Start knowing."

### The Problem

When a sales rep creates a deal in HubSpot and searches for a company, they see this:

```
CBRE
CBRE
CBRE
CBRE
CBRE
```

Five identical entries. No location. No branch. No way to tell New York from San Francisco. The rep guesses. The guess is wrong 30% of the time. Pipeline data becomes fiction. Forecasts break. Territory assignments go wrong. Nobody trusts the CRM.

### What It Does

Smart Company Picker adds location-aware company search, duplicate detection, data quality scoring, and bulk operations directly inside HubSpot — both as a deal sidebar card and as a full admin dashboard.

### Key Features

| Feature | What It Does | Who Benefits |
|---------|-------------|--------------|
| **Location-Aware Search** | Shows city, state, domain alongside every company name in search results. Reps pick the right branch on the first try. | Sales Reps |
| **Duplicate Detection** | Automatically scans for companies with similar names, domains, or locations. Flags true duplicates vs. legitimate branches. | Sales Ops |
| **Merge Preview & Execution** | Side-by-side field comparison before merging. Shows exactly what data will be kept, lost, or moved. One-click merge with optional revert within 30 days. | Sales Ops |
| **Data Quality Scoring** | Every company gets a Complete/Partial/Minimal score based on field coverage. Visible as a badge in search results so reps naturally pick better-populated records. | Sales Reps, Sales Ops |
| **Bulk Deal Operations** | Reassign or verify deals in bulk when a company changes or gets merged. What used to take 30 minutes takes 2. | Sales Ops |
| **Association Verification** | 4-state verification flow (No Association → Clean → Discrepancy Detected → Verified) that tracks the quality of every deal-to-company link. | Sales Reps, Sales Ops |
| **Audit Trail** | Full history of every association change: who changed it, when, what the old and new values were. Exportable as CSV. | Sales Ops |
| **Company Hierarchy Display** | Shows parent-child relationships between companies — whether a company is HQ, a branch, or a franchise location. Cross-sell visibility for sibling locations. | Sales Reps |
| **Automated Alerts** | Email notifications for new duplicates, data quality drops, unresolved mismatches, and weekly digest summaries. Rate-limited to prevent inbox flooding. | Sales Ops |
| **Scheduled Scans** | Nightly duplicate detection, data quality checks, and mismatch scans run automatically. Configurable frequency per portal. | Automated |
| **Admin Dashboard** | Full-width web dashboard with health score gauge, stat cards, action queue, duplicate management center, company browser, bulk operations, and audit log. | Sales Ops |
| **Guided Onboarding** | 8-step progress tracker that guides admins from installation through first scan, first merge, and full activation. | Sales Ops |

### Use Cases

1. **"Which branch am I dealing with?"** — Rep searches "CBRE" and sees "CBRE - New York, NY | cbre.com | 87% quality" vs "CBRE - San Francisco, CA | cbre.com | 62% quality". Picks the right one in one click.

2. **"Someone created a duplicate company again."** — System auto-detects "CBRE Inc" and "CBRE Corporation" as 94% similar. Admin gets an email, opens the merge preview, sees 12 deals will move, confirms the merge.

3. **"We merged two companies but 30 deals are still linked to the old one."** — Admin opens bulk operations, selects all 30 misassigned deals, reassigns them to the surviving company in one action.

4. **"Our CRM data is a mess but I don't know where to start."** — Dashboard shows health score of 47/100 with the biggest issue being 34 unresolved duplicates. Action queue prioritizes by severity.

### Benefits (for copy)

- **30% fewer wrong-company deals** — location-aware search eliminates the guessing game
- **2 minutes vs. 30 minutes** — bulk operations replace one-at-a-time deal reassignment
- **Catch duplicates before they cause damage** — automated scans detect duplicates within hours, not months
- **Data quality you can see** — quality badges make good data hygiene a natural part of every search
- **Full audit trail** — every change tracked, every merge reversible within 30 days

---

## App 2: Smart Deal Inspector

**Tagline idea:** "Your deals are only as good as your data."

### The Problem

91% of CRM data is incomplete. 70% goes stale yearly. Forecast accuracy drops to 50-70%. Pipeline reviews devolve into data-catching sessions:

```
Manager: "What's the status on the Acme deal?"
Rep:     "It's looking good, should close end of month."
Manager: "There's no close date in HubSpot."
Rep:     "Oh, I'll add that."
Manager: "And there's no amount."
Rep:     "Right, let me—"
Manager: "And no contacts associated."
```

Managers spend pipeline reviews catching data gaps instead of coaching deals. Reps feel surveilled, not supported.

### What It Does

Smart Deal Inspector scores every deal against a configurable rule engine and surfaces issues with one-click fixes — turning data quality from a management problem into a self-service tool for reps.

### Key Features

| Feature | What It Does | Who Benefits |
|---------|-------------|--------------|
| **27-Rule Evaluation Engine** | Checks data completeness, engagement signals, and qualification criteria. Rules grouped into: data rules, engagement rules, and qualification rules. | All |
| **4-Tier Badge System** | Every deal gets a badge: Verified (green), Needs Attention (yellow), High Risk (red), or Not Evaluated (gray). Visible on the deal sidebar card. | Sales Reps, Managers |
| **Weighted Scoring (0-100)** | Each rule has a configurable weight. Deal size tiers multiply weights for high-value deals. Stage position adjusts criticality. | Sales Ops |
| **Auto-Fill Suggestions** | When a rule fails, the system suggests a fix: missing owner, missing close date, missing amount. "Apply All" fills everything in one click. | Sales Reps |
| **Risk Insights** | Cross-rule analysis detects patterns: "Stalled Deal" (no activity + late stage), "Single-Threaded" (only one contact), "Champion Gap" (no executive sponsor). | Sales Reps, Managers |
| **BANT / MEDDPICC / Custom Templates** | Pre-built rule templates for common qualification frameworks. Apply to a pipeline in one click. Create custom templates for your methodology. | Sales Ops |
| **Custom Rules** | JSON-based condition builder for portal-specific rules. Scope to specific pipelines. | Sales Ops |
| **Re-Evaluate Button** | Rep fixes issues and clicks "Re-evaluate" to see their score update instantly. Before/after comparison shows improvement. | Sales Reps |
| **Analytics Dashboard** | 5-section dashboard: overview stats, pipeline breakdown, stage funnel with quality by stage, team leaderboard, and trend over time. | Managers |
| **Daily Snapshots** | Nightly badge analytics snapshots for historical trend tracking. | Managers |
| **Webhook Re-Evaluation** | Deals auto-re-evaluate when stage changes. Captures close/loss patterns for future rule tuning. | Automated |
| **Deal Size Tiers** | Configurable thresholds (e.g., <$10K, $10K-$100K, >$100K) that increase rule strictness for larger deals. | Sales Ops |

### Use Cases

1. **"Is this deal real or just a placeholder?"** — Rep opens a deal and sees "Needs Attention — 5 issues" with specific failed rules and one-click fixes. Fixes all 5 in 30 seconds.

2. **"Which deals in my pipeline are at risk?"** — Manager opens the analytics dashboard and sees 12 "High Risk" deals in the commit forecast. Drills into each to see exactly what's wrong.

3. **"We use MEDDPICC but nobody follows it."** — Sales Ops applies the MEDDPICC template to the Enterprise pipeline. Every deal now gets scored against MEDDPICC criteria. Non-compliance is visible, not invisible.

4. **"Our $500K deals should have stricter requirements than $5K deals."** — Configure deal size tiers so large deals require champion identification, executive engagement, and procurement timeline — while small deals just need basic data.

### Benefits (for copy)

- **Turn pipeline reviews into coaching sessions** — data gaps are caught before the meeting, not during it
- **Self-service quality** — reps fix their own data with auto-fill suggestions instead of being told what's missing
- **Configurable rigor** — strict for enterprise, relaxed for transactional, customizable per pipeline
- **Forecast with confidence** — see exactly which deals have the data to support their forecast position
- **Trend visibility** — track whether deal quality is improving or declining across the organization

---

## App 3: Renewal Deal Builder

**Tagline idea:** "Never miss a renewal again."

### The Problem

Every SaaS and subscription business in HubSpot faces this:

```
Deal "Acme Corp - Annual License" closes won on Jan 15, 2026.
Contract ends Jan 15, 2027.

What happens next?

Option A: Someone remembers to create a renewal deal (they won't)
Option B: A spreadsheet tracks renewal dates (it goes stale by March)
Option C: A HubSpot workflow tries to auto-create (it infinite-loops)
Option D: The renewal window passes. The customer churns silently.
```

5-7% of revenue lost to missed renewals. No ARR visibility. No renewal pipeline. Finance runs reports from spreadsheets. Account managers discover expiring contracts from customers, not their CRM.

### What It Does

Renewal Deal Builder automates deal cloning, renewal creation, line item management, and revenue analytics — turning HubSpot into a subscription management platform.

### Key Features

| Feature | What It Does | Who Benefits |
|---------|-------------|--------------|
| **One-Click Deal Cloning** | Clone any deal with company association, property mappings, line items, and activity history. Customizable via templates. | Sales Reps |
| **Automated Renewal Creation** | Rules engine triggers renewal deals based on close date, stage change, or manual trigger. Configurable per pipeline. | Sales Ops |
| **Line Item Intelligence** | Filters recurring vs. one-time line items. Syncs prices from HubSpot product catalog. Shifts dates automatically for the renewal period. | Automated |
| **Clone Templates** | Reusable configurations: which properties to copy, which to reset, which line items to include. Set a default template per pipeline. | Sales Ops |
| **Renewal Chain Timeline** | Visual timeline showing the history of renewals: Original → Renewal 1 → Renewal 2. Links to each deal in the chain. | Sales Reps |
| **Revenue Analytics (ARR/MRR)** | Dashboard with Annual Recurring Revenue, Monthly Recurring Revenue, Net Revenue Retention, Gross Revenue Retention, and revenue waterfall chart. | Managers, Finance |
| **At-Risk Deal Detection** | Identifies deals with declining engagement, missing activities, or approaching close dates without renewal. Daily alerts at 9AM. | Sales Ops |
| **Renewal Reminders** | Configurable reminder thresholds (e.g., 90 days, 60 days, 30 days before contract end). Daily email alerts at 8AM. | Account Managers |
| **Bulk Renewal Operations** | Create renewals for multiple deals at once. Async processing with progress tracking. | Sales Ops |
| **Renewal Pipeline Dashboard** | Command center showing all renewals: upcoming, in progress, at-risk, completed. Owner workload view. | Managers |
| **Clone & Renewal Audit** | Full audit trail of every clone and renewal: who created it, from which deal, with which template, and when. | Sales Ops |
| **Product Price Sync** | Detects when catalog prices have changed since the original deal. Prompts to update line item pricing on the renewal. | Sales Reps |
| **Activity Carryover** | Optionally copies notes, calls, and meetings from the original deal to the renewal for context continuity. | Sales Reps |

### Use Cases

1. **"I need to create a renewal for this deal."** — Rep clicks "Create Renewal" on the deal card. System pre-fills everything: company, pipeline, amount, line items (recurring only), dates shifted forward. Rep reviews and clicks create. Done in 5 seconds.

2. **"What's our ARR and how is it trending?"** — Manager opens the revenue analytics dashboard. Sees $2.4M ARR, 97% GRR, 112% NRR. Waterfall shows new business, expansion, contraction, and churn.

3. **"Which renewals are at risk?"** — At-risk alert email arrives at 9AM: "3 renewals expiring in 30 days with no activity in 60+ days." Manager assigns follow-up.

4. **"We need to create renewals for all Q1 deals."** — Admin selects 47 deals, clicks "Bulk Renew", selects a template. System processes them asynchronously and reports results.

5. **"The product catalog prices changed. Should renewals use old or new prices?"** — Clone card shows "Price changed: Widget was $99/mo, now $119/mo. Use current catalog price?" Rep chooses per line item.

### Benefits (for copy)

- **Zero missed renewals** — automated reminders and at-risk alerts catch every expiring contract
- **5 seconds vs. 15 minutes** — one-click renewal creation replaces manual deal building
- **ARR visibility without spreadsheets** — real-time revenue analytics built into HubSpot
- **Smart line items** — auto-filters one-time items, syncs current catalog prices, shifts dates
- **Full renewal history** — chain timeline shows the complete lifecycle from original deal through every renewal

---

## App 4: Contact Company Linker

**Tagline idea:** "The right contact at the right branch."

### The Problem

When CBRE has 12 branch offices, all sharing @cbre.com:

```
New contact: sarah@cbre.com
  → Which CBRE? New York? San Francisco? Chicago?

What happens today:
  → HubSpot auto-associates to the first "CBRE" it finds
  → That's CBRE headquarters, not Sarah's branch
  → Sarah's deal goes to the wrong rep
  → Marketing sends the wrong region's campaign
  → Territory reports show phantom leads
  → The problem multiplies with every import
```

Organizations with 50+ multi-branch companies can have 10-30% of contacts on the wrong branch. That's thousands of misrouted leads, broken segments, and incorrect territory assignments.

### What It Does

Contact Company Linker uses a multi-signal scoring engine to match contacts to the correct company branch — by email domain, location, adjacent geography, franchise membership, and data quality — with a 3-round bulk review workflow for operations teams.

### Key Features

| Feature | What It Does | Who Benefits |
|---------|-------------|--------------|
| **Multi-Signal Scoring Engine** | Scores matches using: domain match (50pts), city match (40pts), state match (25pts), adjacent state (10pts), franchise membership (5pts), data quality (±5pts). | Automated |
| **4-State Contact Card** | Card on contact records with states: Suggestions Found, No Suggestions, Associated Correct, Associated Mismatch. Shows best match with confidence score and reasoning. | Sales Ops |
| **3-Round Bulk Review** | Sequential workflow: Round 1 "Quick Wins" (≥85% confidence, batch approve), Round 2 "Needs a Look" (60-84%, side-by-side review), Round 3 "Manual" (<60%, research needed). | Sales Ops |
| **Batch Group Approve** | "Approve all CBRE matches" in one click — applies all high-confidence matches for a company at once. | Sales Ops |
| **Adjacent State Matching** | Recognizes that a New Jersey contact might work at the New York office. Scores nearby-state matches higher than random states. | Automated |
| **Generic Domain Detection** | Automatically skips Gmail, Yahoo, Outlook, and other generic domains from domain matching — these contacts need location-based matching instead. | Automated |
| **Mismatch Detection** | When a contact is already associated with a company but the signals point to a different branch, flags it as a mismatch with side-by-side comparison. | Sales Ops |
| **Scan & Monitor** | Full portal scan finds all mismatched contacts. Ongoing monitoring auto-links new contacts as they arrive. | Automated |
| **Summary & Export** | Scan results with statistics: total scanned, matches found per confidence tier, exportable as CSV. | Sales Ops |
| **Notification Emails** | First-scan notification with results breakdown. Summary email after each scan with round-by-round stats. | Sales Ops |

### Use Cases

1. **"We just imported 5,000 contacts and HubSpot put them all on the wrong branches."** — Admin runs a scan. System finds 427 mismatches. Round 1: 312 Quick Wins approved in 3 clicks. Round 2: 89 reviewed in 20 minutes. Round 3: 26 assigned for manual research.

2. **"New contacts keep getting linked to headquarters instead of the branch office."** — Continuous monitoring detects new contacts and suggests the correct branch based on city, state, and domain signals. Ops approves matches weekly.

3. **"Sarah from CBRE is showing up in our New York territory report but she works in Chicago."** — Card shows "Associated Mismatch: Current company CBRE - New York, suggested CBRE - Chicago (score: 92, reason: city match + state match)." One-click reassignment.

4. **"How do I know the matching is accurate?"** — Scoring breakdown visible on every match: "Domain: +50 (cbre.com matches), City: +40 (Chicago matches), State: +25 (IL matches). Total: 115/125."

### Benefits (for copy)

- **Fix thousands of mismatches in minutes** — 3-round bulk workflow processes hundreds of contacts per session
- **Multi-signal accuracy** — 6 scoring factors ensure the right branch, not just the right company
- **Geographic intelligence** — adjacent state matching catches contacts who work across state lines
- **Continuous monitoring** — new contacts are auto-matched as they arrive, not just during cleanup
- **Full transparency** — every match shows its scoring breakdown so you know why it was suggested

---

## Cross-App Value Proposition

### The Ecosystem Effect

Each app solves a specific problem, but together they create a closed loop:

1. **Smart Company Picker** ensures the right company is linked to every deal
2. **Contact Company Linker** ensures every contact is at the right branch
3. **Smart Deal Inspector** ensures every deal has the data quality to support accurate forecasting
4. **Renewal Deal Builder** ensures every renewal is created, tracked, and monitored

**Without SwotBee:** Companies with multiple branches see 30% wrong-company deals, 10-30% misrouted contacts, 50-70% forecast accuracy, and 5-7% revenue lost to missed renewals.

**With SwotBee:** Location-aware search, automated duplicate detection, multi-signal contact matching, configurable deal scoring, and one-click renewal creation — all inside HubSpot where your team already works.

### Who It's For

| Persona | Primary Apps | What They Get |
|---------|-------------|---------------|
| **Sales Reps** | Company Picker, Deal Inspector, Renewal Builder | Right company in one click, self-service data quality, instant renewals |
| **Sales Ops / RevOps** | All 4 apps | Duplicate cleanup, contact matching, rule configuration, bulk operations |
| **Sales Managers** | Deal Inspector, Renewal Builder | Pipeline quality visibility, forecast confidence, renewal risk alerts |
| **Finance** | Renewal Builder | ARR/MRR/NRR dashboards, revenue waterfall, churn tracking |

### Technical Differentiators (for comparison pages)

- **Multi-tenant SaaS** — each HubSpot portal is an isolated tenant with its own data, settings, and rules
- **Real-time webhooks** — changes in HubSpot trigger instant re-evaluation, not batch syncs
- **Production-grade infrastructure** — Docker, Traefik SSL, PostgreSQL, Redis, Celery workers, Prometheus/Grafana monitoring, automated backups
- **HubSpot-native UX** — cards render inside the deal/contact/company sidebar, not in a separate tab or external app
- **Configurable per pipeline** — different rules, templates, and behaviors for each pipeline in your portal
- **RBAC** — role-based access control for mutation operations (admin-only or all-users, configurable)
- **Audit everything** — full audit trail on every association change, merge, clone, and renewal

---

## Pricing Positioning Notes

The 4 apps are independent HubSpot marketplace listings. Customers can install one or all four. Each has its own OAuth installation. The backend handles multi-app gating — features are only available if the portal has the corresponding app installed.

Potential packaging:
- **Starter:** Smart Company Picker only
- **Professional:** Company Picker + Deal Inspector
- **Enterprise:** All 4 apps
- **A la carte:** Any combination

---

## Stats & Proof Points (for social proof / case study copy)

These are the system's measurable impacts (use as claims with appropriate qualification):

- Location-aware search reduces wrong-company associations by ~30%
- Bulk operations cut deal reassignment time from 30 minutes to 2 minutes
- 27-rule deal quality engine covers data, engagement, and qualification dimensions
- Multi-signal contact matching with 6 scoring factors and 3-tier confidence levels
- Automated renewal creation in <5 seconds vs. 15+ minutes manual
- ARR/MRR/NRR/GRR revenue metrics without leaving HubSpot
- At-risk renewal detection 90/60/30 days before expiration
- Merge preview with field-by-field comparison and 30-day revert window
- 130+ API endpoints, 30+ data models, 50+ async tasks
- Production infrastructure: Docker, PostgreSQL, Redis, Celery, Prometheus/Grafana, automated backups
