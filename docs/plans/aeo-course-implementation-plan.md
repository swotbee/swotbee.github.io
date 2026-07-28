# AEO Course Framework — Implementation Plan

## Overview

This plan closes the gaps identified in the AEO readiness audit (2026-07-28), which scored
the site against `docs/research/AEO/YouTube Course Implementation Strategy.md` (the Ahrefs
AEO Masterclass framework). It covers every idea in that framework end to end: the six
phases below map to its four execution stages (technical unblocking, research, on-page
execution, off-site authority, telemetry) plus a governance phase to keep the system
running.

The audit found two very different kinds of work mixed into one course document:
- **On-site technical items** (schema, crawl access, content structure, analytics) that
  this team can just ship. Most of this category was already 65% done, mainly from the
  earlier `seo-aeo-implementation-plan.md` work in April, before this course document
  existed.
- **Off-site/operational items** (brand-gap research, citation outreach, bot monitoring)
  that are 0% started and are gated on a paid tool subscription and outreach time, not
  code.

Phases are ordered by **value versus time**, not by the course's own numbering. Phase 1 is
the "real gaps" set already confirmed live-broken or missing during the audit, done first
per direct instruction. Phases 2 and 3 can run in parallel (different people, different
skills: content authoring versus a subscription decision). Phase 4 depends on Phase 3's
output. Phase 5 runs alongside anything. Phase 6 is deliberately deferred.

## Priority Order (value vs. time)

| Phase | Value | Time | Blocked by | Priority |
|---|---|---|---|---|
| 1. Quick technical wins | High | ~3-4 hours total | Nothing — start immediately | **P1** |
| 2. Content & schema depth | Medium-High | Days (content authoring pace) | Nothing — parallel to Phase 3 | **P2** |
| 3. Research infrastructure (Ahrefs) | High (unlocks Phase 4) | ~1-2 hrs setup once approved | A subscription decision | **P2** |
| 4. Off-site authority building | High | Weeks, ongoing | Phase 3's gap report | **P3** |
| 5. Governance & automation | Medium | Low, ongoing | Nothing — parallel to 3/4 | **P3** |
| 6. Multimodal / YouTube | Low today | Medium-High, later | An actual YouTube video library | **P4 (deferred)** |

---

## Phase 1: Quick Technical Wins (the real gaps)

**Goal**: Close every item the audit confirmed missing or broken on the live site, using
infrastructure that already exists in the codebase. No new tools, no new spend.

**Items covered**: explicit AI-crawler robots.txt rules, `/llms-full.txt`, GA4 AI-referral
channel grouping, BreadcrumbList on blog posts, font preload + GTM preconnect.

**Files to create/modify**:
- `public/robots.txt`
- `public/llms-full.txt` — new file
- `src/layouts/BlogPostLayout.astro`
- `src/layouts/BaseLayout.astro`
- `public/fonts/` — new directory (two woff2 files)

**Tasks**:

1. **Explicit AI-crawler allow rules in `robots.txt`.** Insert a new block after the
   existing `Bingbot` block and before the `AhrefsBot` disallow block:
   ```
   User-agent: GPTBot
   Allow: /

   User-agent: ChatGPT-User
   Allow: /

   User-agent: ClaudeBot
   Allow: /

   User-agent: PerplexityBot
   Allow: /

   User-agent: OAI-SearchBot
   Allow: /

   User-agent: Google-Extended
   Allow: /

   User-agent: Applebot-Extended
   Allow: /
   ```
   Verify with `curl -I -A "GPTBot" https://swotbee.com/robots.txt` (expect `200`) after
   deploy. This is currently a no-op functionally (the wildcard `Allow: /` already permits
   these bots) — it's written insurance against a future WAF/CDN rule silently blocking one
   by name.

2. **Generate `public/llms-full.txt`.** Reuse the existing hand-curated `llms.txt` link
   list and structure (do not run the course's generic sitemap-scraping script against
   it — that would produce a worse, genericized version of a file that's already
   well-curated). For each linked page, add a short paragraph underneath pulled from that
   page's actual meta description or opening paragraph, separated by `---`. Follow the
   same H1/blockquote/H2 structure `llms.txt` already uses.

3. **GA4 "AI Referral" custom channel grouping.** Not a code task — a GA4 Admin Console
   setting (Admin → Data display → Channel groups). Turned out simpler than the course's
   static-regex approach: GA4 already ships a built-in **AI Assistants** channel that
   inherits Google's own centrally-maintained AI-referrer definition
   (`Default channel group matches exactly (=) AI Assistants`) rather than a regex we'd
   have to keep updating ourselves. The actual bug was ranking — the stock list puts
   "Referral" at position 15 and "AI Assistants" at position 19, so AI-driven sessions
   were being caught by the generic Referral rule first and never reaching AI Assistants.
   Fix: created a group named "AI Referral Tracking", used Reorder to move AI Assistants
   to position 15 (just above Referral), and saved. Set as the "Session default channel
   group" in Reports → Acquisition → Traffic acquisition to view traffic through it.
   (GA4 base tracking is already live and firing with ID `G-6X3GTENZTW` — this step only
   reorders the channel-grouping rule on top of it.)

4. **BreadcrumbList schema on blog posts.** In `src/layouts/BlogPostLayout.astro`, after
   the existing FAQ schema block (lines 112-116), add:
   ```astro
   <StructuredData
     type="breadcrumb"
     data={{
       breadcrumbs: [
         { name: "Home", url: "https://swotbee.com" },
         { name: "Blog", url: "https://swotbee.com/blog" },
         { name: frontmatter.title, url: canonicalURL },
       ],
     }}
   />
   ```
   `canonicalURL` is already in scope (defined at line 15) and `StructuredData` is already
   imported (line 5) — this reuses the exact helper already wired into all 7 service
   pages, just never added here.

5. **Font preload + GTM preconnect in `BaseLayout.astro`.** Near the existing preconnect
   block (lines 152-156):
   - Copy `node_modules/@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2`
     and `node_modules/@fontsource-variable/rokkitt/files/rokkitt-latin-wght-normal.woff2`
     into `public/fonts/`.
   - Add before `<AstroSEO>`:
     ```html
     <link rel="preload" as="font" type="font/woff2" href="/fonts/hanken-grotesk-latin-wght-normal.woff2" crossorigin="anonymous" />
     <link rel="preload" as="font" type="font/woff2" href="/fonts/rokkitt-latin-wght-normal.woff2" crossorigin="anonymous" />
     ```
   - Add alongside the existing Unsplash preconnect:
     ```html
     <link rel="preconnect" href="https://www.googletagmanager.com" />
     <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
     <link rel="preconnect" href="https://www.google-analytics.com" />
     ```

**Acceptance criteria**:
- [x] `npm run build` completes with no errors — 191 pages built clean
- [x] `robots.txt` now carries explicit `Allow: /` blocks for GPTBot, ChatGPT-User,
      ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, Applebot-Extended (verify
      live with `curl -A "GPTBot" -I https://swotbee.com/robots.txt` after deploy)
- [x] `dist/llms-full.txt` exists (10KB, full section-by-section descriptions) — will
      resolve at `https://swotbee.com/llms-full.txt` after deploy
- [x] **GA4 "AI Referral Tracking" channel group configured** — done differently than
      planned, and better: GA4's Admin → Data display → Channel groups already ships a
      built-in **AI Assistants** channel that inherits Google's own centrally-maintained
      AI-referrer definition (`Default channel group matches exactly (=) AI Assistants`),
      rather than a static regex we'd have to maintain ourselves. The real fix was that
      "Referral" outranked it in the default channel order (position 15 vs. 19), so
      AI-driven sessions were being swallowed by the generic Referral channel before ever
      reaching the AI Assistants rule. Reordered AI Assistants to position 15 (just above
      Referral) inside a new "AI Referral Tracking" group and saved it. Set as the
      "Session default channel group" in Reports → Acquisition → Traffic acquisition to
      view traffic through it; confirm AI-referred sessions appear within 24h.
- [x] Every blog post now emits a `BreadcrumbList` JSON-LD block (confirmed in the built
      HTML for `hubspot-renewal-pipeline-complete-guide`, alongside its existing
      Article/HowTo/Person schema, which are unaffected)
- [x] Every page now shows font `<link rel="preload">` tags (Hanken Grotesk + Rokkitt,
      copied into `public/fonts/`) and GTM/GA `preconnect` tags, confirmed in the built
      `index.html`
- [ ] Lighthouse performance recheck — not run this pass; none of these changes should
      regress it (preload/preconnect only help, schema is invisible weight), but worth a
      spot-check after deploy

**Dependencies**: None

---

## Phase 2: Content & Schema Depth

**Goal**: Extend the schema and content patterns that are already proven to work (Phase 1
of the April plan, plus the answer-first house style) to the content that doesn't have
them yet, and activate the category taxonomy that's already authored in frontmatter but
never rendered anywhere.

**Items covered**: FAQ schema expansion, comparison-table expansion, category pages,
ReviewedBy adoption, AI-crawler verification script.

**Files to create/modify**:
- `src/pages/posts/*.md` (the ~47 posts without a FAQ section)
- `src/pages/categories/[slug].astro` — new dynamic route
- `src/utils/posts.ts` — add `getPostsByCategory(slug)`
- `docs/content-guidelines/answer-first-pattern.md` — already exists; extend with a
  category-page checklist item

**Tasks**:

1. **Expand FAQ schema coverage.** 77 of 124 posts have a `## Frequently Asked Questions`
   section wired to `frontmatter.faqs` → FAQPage schema. The remaining ~47 don't have the
   section at all (not a broken pipe — nothing to wire). Following the existing blog house
   style (`CLAUDE.md`'s blog pipeline section), add a genuine FAQ block to posts where real
   reader questions exist, prioritizing the highest-traffic pillar and cluster posts first.

2. **Expand comparison tables.** 63 of 124 posts (~51%) have a markdown table. Audit the
   remaining narrative-only posts for ones that are implicitly making a comparison
   (tool A vs tool B, model 1 vs model 2, before vs after) and convert that comparison into
   an explicit table — this is exactly the extraction pattern the course's "Method 1"
   on-page procedure asks for.

3. **Build category pages.** Nine distinct category slugs already exist in post
   frontmatter (`revenue-operations`, `crm-comparisons`, `crm-fundamentals`,
   `feature-deep-dives`, `hubspot-tips`, `implementation-tutorials`, `industry-specific`,
   `sales-compensation`, `sales-leadership`) but `category.href` is never rendered as a
   link anywhere — `blog.astro` only shows `category.title` as a plain badge. Create
   `src/pages/categories/[slug].astro` with `getStaticPaths()` deriving one path per
   distinct `category.href` found across all posts, a short intro paragraph per category,
   a post grid (reuse the `blog.astro` card pattern), and BreadcrumbList schema
   (Home > Blog > Category). Then make the badge in `blog.astro` an `<a href={post.category.href}>`
   so the taxonomy that's already authored actually becomes navigable and linkable —
   both for readers and for AI crawlers building a topic model of the site.

4. **Decide on `ReviewedBy` adoption.** The component (`src/components/astro/ReviewedBy.astro`)
   and its wiring in `BlogPostLayout.astro` (line 201) were built in an earlier phase but
   zero posts use it. This needs a decision, not code: does SwotBee have a named person
   (certified HubSpot partner, subject expert) willing to be publicly attributed as the
   reviewer of specific posts? If yes, add `reviewedBy` frontmatter to the cornerstone
   pillar posts first. If no one is ready to be named, leave the component in place
   unused rather than forcing a placeholder attribution — a real name is the entire point
   of E-E-A-T signaling; a fake one is worse than none.

5. **AI-crawler verification script.** Adapt the course's Script 2 (a Python script that
   sends GET requests with GPTBot/ClaudeBot/PerplexityBot/OAI-SearchBot user agents and
   checks for `200`) as a one-off manual check first: run the four `curl -A "<bot>"`
   commands against `/`, `/llms.txt`, and `/robots.txt` right after Phase 1 ships. Only
   turn it into a real recurring script if you want it in CI — if so, run it through the
   intake process in `docs/scripts-style-guide.md` first (who runs it, how often, what
   failure notification path) rather than writing it ad hoc.

**Acceptance criteria**:
- [ ] `npm run build` completes; `dist/categories/revenue-operations/index.html` exists
- [ ] Category badges on `/blog` are clickable and resolve to a real page
- [ ] Category pages include BreadcrumbList JSON-LD
- [ ] A decision is recorded (in this file or `docs/plans/service-page-answers.md`-style)
      on whether `ReviewedBy` gets a named person or stays dormant
- [ ] FAQ schema coverage and comparison-table coverage percentages have measurably
      increased from the 2026-07-28 audit baseline (62% and 51%)

**Dependencies**: None — can run in parallel with Phase 3

---

## Phase 3: Research Infrastructure (Ahrefs Brand Radar)

**Goal**: Stand up the actual measurement and gap-finding layer this framework depends on.
Everything in Phase 4 (off-site outreach) needs this phase's output first.

**Items covered**: Ahrefs Brand Radar subscription decision, brand + competitor setup,
Brand Gap Analysis, conversational prompt-cluster mapping.

**Tasks**:

1. **Decision gate: subscribe to Ahrefs Brand Radar ($199/mo)?** This is the one item on
   the whole list that is purely a business call, not an engineering one. Nothing else in
   Phase 3 or Phase 4 can start without it. If the budget isn't approved yet, stop here and
   revisit — don't let Phase 4 tasks get scheduled against a dependency that doesn't exist.

2. **Configure Brand Radar.** Add "SwotBee" brand name variations, and name 3 direct
   competitors (reuse whatever competitor list already exists from the HubSpot Marketplace
   positioning work in `research/hubspot app launch/` if one is already defined there,
   rather than re-deriving competitors from scratch).

3. **Run the Brand Gap Analysis (SOP-AEO-001).** Mention Gaps tab → filter "My Brand =
   Unmentioned, Competitor Brands = Mentioned" → sort by prompt demand → export CSV →
   assign the top 20 prompts to Bucket A (on-page fixes, feeds back into Phase 2's content
   work) or Bucket B (off-site outreach, feeds Phase 4).

4. **Conversational prompt-cluster mapping.** This is a distinct research motion from the
   NeuronWriter keyword research already running for SEO (`docs/plans/seo-content-pipeline-neuronwriter-merged.md`),
   which targets search-volume keywords. This targets the zero-volume conversational
   sub-queries an AI assistant fans a single prompt out into. Use Ahrefs Keywords Explorer
   seeded from the same core service/product terms, expanded into natural-language
   question form.

**Acceptance criteria**:
- [ ] Brand Radar project exists with SwotBee + 3 named competitors
- [ ] A brand_gap_analysis.csv export exists with at least 20 prioritized prompt gaps
- [ ] Gaps are split into Bucket A (feeds Phase 2 content work) and Bucket B (feeds
      Phase 4 outreach)

**Dependencies**: A subscription decision. Can otherwise run in parallel with Phase 2.

---

## Phase 4: Off-Site Authority Building

**Goal**: Close the gaps Phase 3 identified by earning third-party citations AI assistants
actually pull from — the single highest-value, highest-effort item on this whole list.

**Items covered**: Tier 1 listicle outreach, Tier 2 editorial citations, Tier 3 community
participation.

**Tasks**:

1. **Tier 1: listicle/roundup outreach.** Pitch inclusion on the top 15 highest-prompt-volume
   third-party "best of" articles identified in Phase 3's Bucket B.

2. **Tier 2: original-data editorial citations.** SwotBee already has market research
   assets under `research/` (SEO/AEO/GEO intelligence, renewal benchmarks, LinkedIn
   research) that could be repackaged into a citable original-data report and pitched to
   higher-authority publications — this reuses existing research rather than commissioning
   new studies.

3. **Tier 3: community participation.** The repo already has Reddit research
   (`src/pages/posts/_prompts/research-resources/revops-reddit-discussions-ALL.md`)
   mapping where RevOps conversations already happen. Use that map to participate
   genuinely in relevant threads rather than cold-pitching new ones.

**Acceptance criteria**:
- [ ] At least 15 Tier 1 pitches sent, tracked with outcome (accepted/declined/no response)
- [ ] At least one original-data asset repackaged and pitched for Tier 2 citation
- [ ] A documented (not ad hoc) presence in at least 3 Tier 3 community threads

**Dependencies**: Phase 3's Bucket B gap list

---

## Phase 5: Governance & Automation

**Goal**: Keep the system from decaying once phases 1-4 ship, without over-automating
things that are currently higher quality by being hand-maintained.

**Items covered**: SOP documentation, llms.txt/llms-full.txt maintenance cadence, monthly
Brand Radar re-audit, AI-SOV tracking.

**Tasks**:

1. **Write SOP-AEO-001 and SOP-AEO-002** as real docs (not just course-doc excerpts):
   monthly Brand Gap Analysis procedure and bi-weekly on-page structuring procedure, each
   with an owner and a trigger, matching the pattern already established in this repo's
   `docs/scripts-style-guide.md` and `docs/content-guidelines/`.

2. **Decide against full automation of `llms.txt`/`llms-full.txt`.** The course's Python
   cron script would regenerate these from a sitemap crawl, but the hand-curated version
   already reads richer than what that script would produce. Recommendation: keep them
   hand-maintained, and instead add a lightweight recurring reminder (quarterly) to review
   both files against the current top pages and lead magnets, rather than building
   automation that would flatten their quality.

3. **Set a monthly Brand Radar re-audit cadence** (first business day of each month, per
   the course's own SOP-AEO-001 trigger) to track AI Share of Voice movement over time and
   feed fresh gaps back into Phase 2/4.

**Acceptance criteria**:
- [ ] SOP-AEO-001 and SOP-AEO-002 exist as committed docs with a named owner
- [ ] A quarterly llms.txt/llms-full.txt review reminder is scheduled somewhere durable
      (calendar, project tracker) rather than left to memory
- [ ] First monthly Brand Radar re-audit is scheduled

**Dependencies**: Phase 3 (Brand Radar must exist to re-audit)

---

## Phase 6: Multimodal / YouTube (deferred)

**Goal**: Optimize video assets for multimodal AI extraction — deferred until it's
actually relevant.

**Items covered**: YouTube title/description/chapter optimization, VTT transcript files.

**Tasks**: Not started. SwotBee doesn't currently run an active YouTube channel with a
published video library — this phase is downstream of the video-creation-framework work
(`research/video-creation-framework/`). Revisit once there's a real library of published
videos to optimize; building this now would mean optimizing nothing.

**Dependencies**: A published YouTube video library

---

## Summary

| Phase | Priority | Depends on | Estimated time |
|---|---|---|---|
| 1. Quick technical wins | P1 | Nothing | ~3-4 hours |
| 2. Content & schema depth | P2 | Nothing (parallel to 3) | Days, content-authoring pace |
| 3. Research infrastructure | P2 | Ahrefs subscription decision | ~1-2 hrs setup + monthly cadence |
| 4. Off-site authority building | P3 | Phase 3's gap report | Weeks, ongoing |
| 5. Governance & automation | P3 | Phase 3 (for re-audit) | Low, ongoing |
| 6. Multimodal / YouTube | P4 (deferred) | A YouTube video library | Not scheduled |
