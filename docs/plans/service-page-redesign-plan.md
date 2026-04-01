# Service Page Redesign Plan

## Based on Top 30 Research Recommendations + Current Page Analysis

**Date:** 2026-04-01
**Branch:** feature/v6-homepage
**Research source:** docs/research/b2b-service-page-recommendations.md

---

## Shared Template (Applied to All 4 Pages)

Before diving into per-page specifics, these elements should be consistent across all service pages:

### Page Structure (Story Arc — Recommendation #10)

```
1. Hero: Headline + subline + primary CTA + trust badges
2. "Is this you?" qualifier (empathy — #5)
3. Before → After gap visualization (#7)
4. How We Do It (3-4 step process — #12)
5. Service details (current FeatureDescription cards — reduced to 3-5 per page)
6. Case Study / Testimonial (#2)
7. FAQ / Objection Handling (#4)
8. Sticky CTA bar + bottom CTA section (#6, #18)
9. Risk reversal / guarantee (#14)
10. Lead magnet offer (#9)
```

### Shared Components Needed

| Component | Recommendation | Status |
|-----------|---------------|--------|
| **StickyCTA** — floating bottom bar on mobile, sidebar on desktop | #6, #18 | New |
| **ProcessSteps** — 3-4 step visual with icons | #12 | New |
| **BeforeAfter** — current vs future state card | #7 | New |
| **TestimonialCard** — named testimonial with photo, company, metric | #2 | New |
| **FAQAccordion** — expandable Q&A section | #4 | New |
| **TrustBar** — HubSpot badge + client logos + rating | #2, #21 | New |
| **LeadMagnet** — download offer (checklist, guide) | #9 | New |
| **ServiceHero** — headline + subline + CTA + trust indicators | #1, #3, #5 | New |

---

## Questions I Need Your Input On

Before creating per-page plans, I need answers to these:

### Testimonials & Case Studies (#2)
1. **Do you have 3-5 named client testimonials with specific metrics?** (e.g., "John Smith, VP Sales at Acme Corp — 'SWOTBee increased our pipeline by 34% in 3 months'")
2. **Can we use the testimonials already in TestimonialEmbla.astro?** (Terry Parmelee, Sarah Orlandi, Chen Wei, etc.) — are these real?
3. **Do you have any case studies with before/after metrics?** (e.g., "Client had 23% CRM adoption → we brought it to 90% in 4 months")

### Client Logos (#2, #21)
4. **Which client logos can we display?** The Logos.astro component has Wesco, Big Lots, Insteon, La Vie, Mytheresa — are we approved to show these?
5. **Do you have a HubSpot Partner badge** (official image/logo)?

### Pricing & Engagement Models (#4, #14)
6. **What are your engagement models?** (retainer, project-based, hourly?) — need this for FAQ
7. **Can we show starting prices or price ranges?** (e.g., "Starting from $X/month" or "Typical projects $X-$Y")
8. **What's your guarantee/risk reversal?** Options:
   - "Free initial consultation"
   - "30-day satisfaction guarantee"
   - "No long-term contracts"
   - "Money-back if no measurable improvement in 90 days"

### Process & Timeline (#12)
9. **What's your standard engagement process?** (The Steps component has Discovery → Strategy → Technical Setup → Training → Launch → Review — is this still accurate?)
10. **What are typical timelines per service?** (e.g., "CRM migration: 4-8 weeks", "Marketing setup: 2-4 weeks")

### Lead Magnets (#9, #24)
11. **What free resources can we offer?** Options:
   - "Free HubSpot audit"
   - "30-Day Onboarding Checklist (PDF)"
   - "CRM Migration Readiness Assessment"
   - "Revenue Leak Calculator"
   - "Marketing Attribution Template"
12. **Do you have any existing downloadable content?** (guides, templates, worksheets)

### Differentiation (#11, #26)
13. **What makes you different from other HubSpot partners?** Top 3 differentiators?
14. **What's your ideal client profile (ICP)?** (company size, industry, HubSpot tier, team size)
15. **What are the top 3 reasons clients choose you over competitors?**

### Video (#28)
16. **Do you have or plan to create video content?** (explainer videos, testimonial recordings, Loom-style demos)

---

## Page 1: HubSpot Onboarding (`/services/hubspot-onboarding`)

### Target Persona
**Who lands here:** VP Ops, Sales Ops, or IT lead who just purchased HubSpot (or is about to) and needs help getting started. They searched "HubSpot onboarding help" or "HubSpot implementation partner."

**Their mindset:** "We bought HubSpot but our team doesn't know how to use it. We need someone to set it up right and train our team."

**Top objections:**
1. "How long will this take?"
2. "Will my team actually adopt it?"
3. "What if we've already started and it's messy?"
4. "How much will this cost?"
5. "Can't we just do this ourselves with HubSpot Academy?"

### Current State
- 17 FeatureDescription cards (too many — overwhelming)
- No CTA buttons
- Some good validation stats ("23% to 90% adoption")
- No FAQ, no testimonials, no process steps

### Recommended Changes

| Priority | Change | Recommendation # | Effort |
|----------|--------|-------------------|--------|
| **P0** | Add ServiceHero with headline: "Get Your Team on HubSpot — Without the 6-Month Learning Curve" | #1, #3, #5 | Medium |
| **P0** | Add primary CTA: "Book a Free Onboarding Assessment" | #6 | Small |
| **P0** | Reduce from 17 cards to 5 focused sections: CRM Migration, Team Adoption, Lead Qualification, Automation, Reporting | #11, #29 | Medium |
| **P1** | Add "Is this you?" section: "You just bought HubSpot but... your team is still using spreadsheets / your data is in 3 different CRMs / you're 2 months in and only using 10% of features" | #5, #7 | Small |
| **P1** | Add 3-step process: "1. Audit your current setup → 2. Configure & migrate → 3. Train & launch" | #12 | Small |
| **P1** | Add FAQ: timeline, cost, DIY vs partner, data migration risks, team resistance | #4 | Medium |
| **P1** | Add testimonial: Terry Parmelee quote (if approved) | #2 | Small |
| **P2** | Add before/after: "Before: 23% adoption, data in spreadsheets → After: 90% adoption, single source of truth" | #7, #15 | Small |
| **P2** | Add lead magnet: "Download: 30-Day HubSpot Onboarding Checklist" | #9 | Medium |
| **P2** | Add sticky CTA bar on scroll | #18 | Small |
| **P2** | Add HubSpot Partner badge + client logos | #21 | Small |
| **P3** | Add video: "Watch how we onboard a team in 30 days" | #28 | Large |
| **P3** | Add pricing tiers: "Quick Start / Full Migration / Enterprise" | #4 | Medium (needs your input) |

### Proposed FAQ Questions
1. How long does HubSpot onboarding take?
2. What if we've already started setting up HubSpot ourselves?
3. How do you handle data migration from our old CRM?
4. What if our team resists the change?
5. Can't we just use HubSpot Academy's free training?
6. What does a typical engagement cost?
7. Do you provide ongoing support after onboarding?

---

## Page 2: Marketing (`/services/marketing`)

### Target Persona
**Who lands here:** Marketing Manager or VP Marketing at a company already using HubSpot but not getting results from it. They searched "HubSpot marketing automation help" or "email marketing not converting."

**Their mindset:** "We're paying for HubSpot Marketing Hub but our campaigns aren't converting. We need someone to fix our email, forms, attribution, and reporting."

**Top objections:**
1. "How do I know this will improve my numbers?"
2. "We've tried agencies before and got burned"
3. "Our data is a mess — can you still help?"
4. "How long until we see results?"
5. "What's the ROI?"

### Current State
- 7 cards (most focused of all pages — good)
- Good stat: "505% return on email marketing"
- Has StructuredData for SEO (only page with this)
- No CTA, no FAQ, no testimonials

### Recommended Changes

| Priority | Change | Recommendation # | Effort |
|----------|--------|-------------------|--------|
| **P0** | Add ServiceHero: "Your HubSpot Marketing Hub Should Be Generating Pipeline, Not Collecting Dust" | #1, #3 | Medium |
| **P0** | Add primary CTA: "Get a Free Marketing Audit" | #6 | Small |
| **P0** | Keep 5 focused sections: Forms & Landing Pages, Email Marketing, Attribution, Reporting, Data Cleansing | #11 | Small |
| **P1** | Add "Is this you?": "Your emails land in spam / You can't tell which campaign drove that deal / Your forms have 40% abandonment / Your data has 30% duplicates" | #5, #7 | Small |
| **P1** | Add 3-step process: "1. Marketing audit → 2. Fix & optimize → 3. Measure & scale" | #12 | Small |
| **P1** | Add FAQ: ROI timeline, what's included, reporting frequency, past agency disappointment | #4 | Medium |
| **P1** | Add before/after metrics: "Email open rate: 12% → 28% / Form conversion: 2% → 8% / Attribution: blind → full visibility" | #7, #15 | Small |
| **P2** | Add testimonial with marketing-specific result | #2 | Small |
| **P2** | Add lead magnet: "Download: Marketing Attribution Template" | #9 | Medium |
| **P2** | Add sticky CTA | #18 | Small |
| **P3** | Add StructuredData to other pages too (this page already has it) | SEO | Small |

### Proposed FAQ Questions
1. How long until we see measurable improvement in our marketing metrics?
2. What if our HubSpot data is full of duplicates and bad records?
3. Do you handle the actual campaign execution or just setup?
4. How do you measure success?
5. We've been burned by a marketing agency before — how are you different?
6. Can you work with our existing marketing team?
7. What reporting will we get?

---

## Page 3: Sales & RevOps (`/services/sales-revops`)

### Target Persona
**Who lands here:** VP Sales, Sales Ops Manager, or RevOps lead whose sales process is broken. They searched "HubSpot sales pipeline optimization" or "RevOps consulting" or "deal tracking HubSpot."

**Their mindset:** "Our pipeline is a mess. Deals are falling through cracks. Forecasting is unreliable. Our sales and marketing teams aren't aligned."

**Top objections:**
1. "Our sales team won't change their process"
2. "We need this to work with our existing workflow"
3. "How quickly can we see pipeline improvement?"
4. "Our data is too messy to fix"
5. "We've customized HubSpot so much that nothing works"

### Current State
- 15 cards (too many, significant overlap with onboarding)
- Good stat: "Misalignment costs B2B companies $1 trillion annually"
- Mentions "$8.7 million savings through tailored training"
- No CTA, no FAQ

### Recommended Changes

| Priority | Change | Recommendation # | Effort |
|----------|--------|-------------------|--------|
| **P0** | Add ServiceHero: "Stop Losing Deals to a Broken Pipeline — Predictable Revenue Starts Here" | #1, #3 | Medium |
| **P0** | Add primary CTA: "Book a Free Pipeline Assessment" | #6 | Small |
| **P0** | Reduce to 5 sections: Pipeline Optimization, Deal Tracking & Renewals, Sales Forecasting, RevOps Alignment, Activity Automation | #11 | Medium |
| **P1** | Add "Is this you?": "Your forecast is wrong every quarter / Deals go dark for weeks with no alerts / Marketing says they sent leads but sales says they're junk / You're tracking renewals in a spreadsheet" | #5, #7 | Small |
| **P1** | Add 3-step process: "1. Pipeline audit → 2. Configure deal tracking & automation → 3. Align teams & launch dashboards" | #12 | Small |
| **P1** | Add FAQ: timeline, team adoption, integration with existing tools, reporting | #4 | Medium |
| **P1** | Connect to Renewal Deal Builder product: "Our proprietary renewal automation tool catches every expiring contract 90 days before it lapses" | #26 | Small |
| **P2** | Add before/after: "Forecast accuracy: 40% → 85% / Missed renewals: 5-7% → 0% / Deal velocity: 45 days → 28 days" | #7, #15 | Small |
| **P2** | Add lead magnet: "Download: Revenue Leak Calculator" | #9 | Medium |
| **P2** | Add the HeroPipelineV6 animation (already built!) as visual proof | #7, #28 | Small |
| **P3** | Add case study with named company | #2 | Medium (needs your input) |

### Proposed FAQ Questions
1. How long does a pipeline optimization take?
2. Will this work with our custom HubSpot setup?
3. How do you handle resistance from sales reps?
4. What if we use Salesforce alongside HubSpot?
5. How do you define and measure "RevOps alignment"?
6. What dashboards will we get?
7. Can you help with renewal/subscription revenue tracking?

---

## Page 4: Integrations (`/services/integrations`)

### Target Persona
**Who lands here:** IT lead, Sales Ops, or VP Operations whose tools don't talk to each other. They searched "HubSpot integration services" or "connect Shopify to HubSpot" or "CRM data sync broken."

**Their mindset:** "Our systems are siloed. Data doesn't flow between HubSpot and our other tools. We're manually entering data or dealing with sync errors."

**Top objections:**
1. "Our integration needs are complex/custom"
2. "We've tried connecting tools before and it broke"
3. "Will this work with [specific tool]?"
4. "How do you handle data mapping between different schemas?"
5. "What happens when something breaks after you leave?"

### Current State
- 14 cards (significant overlap with other pages)
- Lists specific platforms: Shopify, Salesforce, Zapier, ZoomInfo, Clearbit
- Has 2 explicit CTAs (only page with them)
- Detailed integration list (Advertising, Email, Social, Webinars, Support, Billing, etc.)

### Recommended Changes

| Priority | Change | Recommendation # | Effort |
|----------|--------|-------------------|--------|
| **P0** | Add ServiceHero: "Make Your Tools Actually Talk to Each Other — Seamless HubSpot Integrations" | #1, #3 | Medium |
| **P0** | Add primary CTA: "Get a Free Integration Audit" | #6 | Small |
| **P0** | Reduce to 5 sections: Fix Broken Syncs, Data Enrichment, Workflow Automation, Reporting Integration, Custom Integrations | #11 | Medium |
| **P0** | Promote the integration platforms list prominently (this is unique value): Shopify, Salesforce, Zapier, ZoomInfo, etc. | #26 | Small |
| **P1** | Add "Is this you?": "Your HubSpot contacts don't match your billing system / You're copy-pasting between tools daily / Sync errors go unnoticed for weeks / Your team uses 5 tools but none share data" | #5, #7 | Small |
| **P1** | Add 3-step process: "1. Integration audit → 2. Build & test connections → 3. Monitor & maintain" | #12 | Small |
| **P1** | Add FAQ: supported platforms, custom integrations, monitoring, maintenance | #4 | Medium |
| **P1** | Add "Connected Systems Hub" visualization (from hero image concepts) | #7, #28 | Medium |
| **P2** | Add before/after: "Manual data entry: 4hrs/day → 0 / Sync errors: 12/month → 0 / Data accuracy: 72% → 99%" | #7, #15 | Small |
| **P2** | Add lead magnet: "Download: Integration Readiness Checklist" | #9 | Medium |
| **P2** | Add supported platforms grid with logos | #26 | Medium |
| **P3** | Add case study: "How we connected 7 tools to HubSpot for [Client]" | #2 | Medium (needs your input) |

### Proposed FAQ Questions
1. Which platforms do you integrate with HubSpot?
2. Can you build custom integrations for tools not on your list?
3. What happens if an integration breaks after setup?
4. How do you handle data mapping between different systems?
5. Do you provide ongoing monitoring and maintenance?
6. How long does a typical integration project take?
7. What about data security and compliance during integration?

---

## Implementation Priority Matrix

### Phase 1: Quick Wins (1-2 days per page)
- Add ServiceHero component with clear headline + CTA
- Add sticky CTA bar
- Reduce card count (17→5, 15→5, etc.)
- Add "Is this you?" qualifier section
- Add 3-step process visualization
- Add trust bar (HubSpot badge + logos)

### Phase 2: Content Depth (3-5 days per page)
- Add FAQ accordion with 7 questions per page
- Add before/after metrics section
- Add testimonials (pending your input on approved quotes)
- Add lead magnet offers (pending your input on available content)

### Phase 3: Advanced (1-2 weeks)
- Create case study pages with full before/after narratives
- Add pricing/engagement model section
- Add video content
- Add interactive tools (ROI calculator, readiness assessment)
- A/B test different headlines and CTAs

---

## Content Overlap Resolution

Currently ~60% of content is duplicated across pages. Proposed unique focus per page:

| Page | Unique Focus | Cards to Keep | Cards to Remove (Shared) |
|------|-------------|---------------|-------------------------|
| **Onboarding** | CRM migration, team adoption, initial setup, custom objects | 5 | 12 (moved to shared "capabilities" page or removed) |
| **Marketing** | Email, forms, attribution, campaigns, reporting | 5 | 2 |
| **Sales & RevOps** | Pipeline, forecasting, deal tracking, renewals, team alignment | 5 | 10 |
| **Integrations** | Platform connections, data syncs, enrichment, custom APIs | 5 | 9 |

Cross-cutting topics like "Dashboards" and "Data Cleansing" appear on 3-4 pages. These should either:
- Live on ONE page and be linked from others
- Become a shared "Capabilities" section in the footer or a separate page

---

## Next Steps

1. **You answer the 16 questions above** (testimonials, pricing, differentiators, etc.)
2. **I create the shared components** (ServiceHero, ProcessSteps, FAQAccordion, StickyCTA, etc.)
3. **I redesign one page as a pilot** (recommend Marketing — it's the most focused at 7 cards)
4. **You review and give feedback**
5. **I apply the pattern to remaining 3 pages**
6. **We iterate based on your feedback**

Which questions can you answer now?
