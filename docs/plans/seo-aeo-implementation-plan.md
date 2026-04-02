# SEO/AEO Technical Improvements — Implementation Plan

## Overview

This plan implements 30 SEO and Answer Engine Optimization improvements across the SWOTBee website. The work is organized into 7 phases that build on each other: schema infrastructure first, then content features that consume it, then performance hardening, then discovery surfaces (RSS, search, resources hub).

Each phase is independently testable with `npm run build` plus a visual browser check. Phases 1 and 2 can be started simultaneously since they touch different layers (schema utilities vs. static files/config). Phases 3–5 are sequential. Phases 6 and 7 are independent of each other and can be parallelized.

Items 22 (answer-first content guidance) is a content authoring pattern, not code — it is addressed in Phase 7 as a documentation artifact rather than a code change.

## Tech Stack

- Astro 5 (static output, file-based routing)
- Tailwind CSS v4 via `@tailwindcss/vite` (V6 design tokens: `v6-copper`, `v6-teal`, `v6-dark`, `v6-text-muted`, `v6-bg`, `v6-border`)
- Alpine.js for interactive UI behavior
- `@astrojs/sitemap` (already installed)
- `@astrojs/rss` (to be installed in Phase 2)
- Pagefind (to be installed in Phase 7 for blog search)
- Typography: Rokkitt Variable for headings, Hanken Grotesk Variable for body
- Deploy: GitHub Pages at `https://swotbee.com`

---

## Phase 0: Web Vitals & Accessibility — Target 95%+ All Categories

**Goal**: Fix all Lighthouse accessibility failures to bring scores from 77-81% to 95%+. Performance (97-99%), Best Practices (100%), and SEO (100%) are already near-perfect — this phase focuses entirely on accessibility.

**Baseline (April 2026):**

| Page | Performance | Accessibility | Best Practices | SEO |
|------|------------|---------------|----------------|-----|
| Homepage | 99 | 77 | 100 | 100 |
| Blog post (pillar) | 97 | 81 | 100 | 100 |
| Service page | 98 | 80 | 100 | 100 |

**Items covered**: Accessibility audit findings (4 failures)

**Files to modify**:
- `src/components/astro/Navbar.astro` — add `aria-label` to mobile menu button
- `src/layouts/BaseLayout.astro` — add `<main>` landmark
- `src/layouts/BlogPostLayout.astro` — add `<main>` landmark
- `src/layouts/Layout.astro` — add `<main>` landmark
- `src/styles/global.css` — fix contrast issues, add link underlines in prose
- `src/pages/services/marketing.astro` (and other service pages) — wrap content in `<main>`

**Steps**:

1. **Fix `button-name`**: In `Navbar.astro`, add `aria-label="Open menu"` to the mobile menu toggle button (`#v6-mobile-menu-btn`).

2. **Fix `landmark-one-main`**: In `BaseLayout.astro`, wrap the `<slot />` with `<main>`. In `BlogPostLayout.astro`, ensure the article content is inside a `<main>` element. In `Layout.astro`, add `<main>` around the slot. This gives screen readers a main content landmark.

3. **Fix `color-contrast`**: Address each failing element:
   - `text-gray-400` (used in trust bar/footer) → change to `text-gray-500` (passes 4.5:1 on white)
   - v6-teal text on white backgrounds — check if the issue is in the Navbar logo span. If v6-teal (#5AAB9D) fails on white, use `text-v6-teal-700` or a darker shade for text-on-white contexts
   - v6-copper CTA (`bg-v6-copper text-white`) — verify contrast ratio. #C47A2A on white text should pass; if Lighthouse flags it, test `bg-v6-copper-600` which is darker

4. **Fix `link-in-text-block`**: Add underline styling to links inside markdown prose content (blog posts). In `global.css`, add:
   ```css
   .prose a {
     text-decoration: underline;
     text-decoration-color: var(--color-v6-teal-300);
     text-underline-offset: 2px;
   }
   .prose a:hover {
     text-decoration-color: var(--color-v6-copper);
   }
   ```
   This makes links distinguishable by more than just color, while keeping the design elegant with a subtle teal underline that shifts to copper on hover.

5. **Fix table link contrast**: For links inside `<table>` elements in blog posts, ensure they also get underline treatment via the prose styles above.

6. **Validation**: Run Lighthouse on all three page types (homepage, blog post, service page) and verify all categories are 95%+.

**Acceptance criteria**:
- [ ] `npm run build` completes
- [ ] Homepage Lighthouse accessibility ≥ 95
- [ ] Blog post Lighthouse accessibility ≥ 95
- [ ] Service page Lighthouse accessibility ≥ 95
- [ ] Performance scores do not regress below 95
- [ ] No visual design regressions (colors still look good, links are elegant not garish)

**Dependencies**: None — this is the first phase

---

## Phase 1: Schema Infrastructure — FAQ, HowTo, Person, and BreadcrumbList

**Goal**: Extend `StructuredData.astro` and `seo.ts` with four new schema types (FAQPage, HowTo, Person, BreadcrumbList for service pages). No visible UI changes — all changes are in `<head>` JSON-LD. This is the foundation that later phases and service pages consume.

**Items covered**: 1, 2, 3, 4

**Files to create/modify**:
- `src/components/astro/StructuredData.astro` — add `faq`, `howto`, `person` cases to the switch
- `src/utils/seo.ts` — add `generateFAQStructuredData()`, `generateHowToStructuredData()`, `generatePersonStructuredData()`, `generateServiceBreadcrumbStructuredData()` helper functions
- `src/pages/services/marketing.astro` — add `<StructuredData type="faq">` and `<StructuredData type="breadcrumb">` using existing `faqs` array
- `src/pages/services/hubspot-onboarding.astro` — same FAQ + breadcrumb additions
- `src/pages/services/sales-revops.astro` — same
- `src/pages/services/integrations.astro` — same
- `src/pages/posts/hubspot-renewal-deal-workflow-automation.md` — add `howto: true` frontmatter flag
- `src/pages/posts/hubspot-renewal-pipeline-stages.md` — add `howto: true` frontmatter flag
- `src/layouts/BlogPostLayout.astro` — conditionally render `<StructuredData type="howto">` when `frontmatter.howto === true`; conditionally render `<StructuredData type="person">` when `frontmatter.author.linkedin` exists

**Steps**:

1. In `src/utils/seo.ts`, add four new generator functions after the existing `generateBreadcrumbStructuredData`:

   `generateFAQStructuredData(faqs: Array<{q: string; a: string}>)` — returns `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"...","acceptedAnswer":{"@type":"Answer","text":"..."}},...]}`.

   `generateHowToStructuredData(data: {name: string; description: string; steps: Array<{name: string; text: string}>})` — returns `{"@context":"https://schema.org","@type":"HowTo","name":"...","description":"...","step":[{"@type":"HowToStep","name":"...","text":"..."},...]}`.

   `generatePersonStructuredData(data: {name: string; url?: string; linkedin?: string; jobTitle?: string; worksFor?: string})` — returns `{"@context":"https://schema.org","@type":"Person",...}`.

   `generateServiceBreadcrumbStructuredData(pageTitle: string, pageUrl: string)` — convenience wrapper calling the existing `generateBreadcrumbStructuredData` with `[{name:"Home",url:"https://swotbee.com"},{name:"Services",url:"https://swotbee.com/services"},{name:pageTitle,url:pageUrl}]`.

2. In `src/components/astro/StructuredData.astro`, add three new cases to the switch statement:

   `case 'faq'`: builds FAQPage schema from `data.faqs` (array of `{q, a}`).
   `case 'howto'`: builds HowTo schema from `data.name`, `data.description`, `data.steps`.
   `case 'person'`: builds Person schema from `data.name`, `data.url`, `data.linkedin`, `data.jobTitle`, `data.worksFor`.

   Update the `Props` interface `type` union to include `'faq' | 'howto' | 'person'`.

3. In each of the four service page `.astro` files, import nothing new (StructuredData is already imported). After the existing `<StructuredData type="service" ...>` call, add two new calls:

   ```astro
   <StructuredData type="faq" data={{ faqs }} />
   <StructuredData
     type="breadcrumb"
     data={{
       breadcrumbs: [
         { name: "Home", url: "https://swotbee.com" },
         { name: "Services", url: "https://swotbee.com/services" },
         { name: title, url: `https://swotbee.com${Astro.url.pathname}` },
       ],
     }}
   />
   ```

   The `faqs` variable already exists in each service page as a const array of `{q, a}` objects.

4. In `src/layouts/BlogPostLayout.astro`, after the existing Article schema `<script>` tag, add conditional HowTo schema:

   ```astro
   {frontmatter.howto && frontmatter.howtoSteps && (
     <StructuredData
       type="howto"
       data={{
         name: frontmatter.title,
         description: frontmatter.description,
         steps: frontmatter.howtoSteps,
       }}
     />
   )}
   ```

   And conditional Person schema:
   ```astro
   {frontmatter.author?.linkedin && (
     <StructuredData
       type="person"
       data={{
         name: frontmatter.author.name,
         url: frontmatter.author.url,
         linkedin: frontmatter.author.linkedin,
         jobTitle: frontmatter.author.jobTitle || "HubSpot Consultant",
         worksFor: "SWOTBee",
       }}
     />
   )}
   ```

5. In `hubspot-renewal-deal-workflow-automation.md` frontmatter, add:
   ```yaml
   howto: true
   howtoSteps:
     - name: "Create a Closed Won trigger workflow"
       text: "In HubSpot, navigate to Automation > Workflows and create a deal-based workflow triggered when Deal Stage = Closed Won."
     - name: "Auto-create the renewal deal"
       text: "Use the 'Create record' action to generate a new deal in the Renewals pipeline, copying key properties from the original deal."
     - name: "Set the contract end date as the close date"
       text: "Map the original deal's contract end date to the renewal deal's close date so it surfaces in the 90-60-30 day cadence."
     - name: "Enroll in the engagement cadence"
       text: "Add the renewal deal to a sequence-based workflow that sends check-in tasks and emails at 90, 60, and 30 days before close."
   ```

   Add the same `howto: true` flag and appropriate `howtoSteps` to `hubspot-renewal-pipeline-stages.md` covering the three model selection steps.

**Acceptance criteria**:
- [ ] `npm run build` completes with no errors
- [ ] Viewing page source on any service page shows three distinct `<script type="application/ld+json">` blocks: Service, FAQPage, BreadcrumbList
- [ ] Pasting a service page URL into Google's Rich Results Test (or schema.org validator) shows valid FAQPage and BreadcrumbList entries
- [ ] Viewing source on `hubspot-renewal-deal-workflow-automation` shows a HowTo JSON-LD block with at least 4 steps
- [ ] No TypeScript errors in `seo.ts` or `StructuredData.astro`

**Dependencies**: None

---

## Phase 2: New Endpoints and Static Files

**Goal**: Add the four new files/endpoints that require no dependencies on other phases: `llms.txt`, RSS feed, 404 page, and Google Search Console verification meta tag. These can be developed in parallel with Phase 1.

**Items covered**: 7, 8, 9, 10

**Files to create/modify**:
- `public/llms.txt` — new static file
- `src/pages/rss.xml.ts` — new RSS endpoint
- `src/pages/404.astro` — new 404 page
- `src/layouts/BaseLayout.astro` — add GSC verification meta tag and RSS `<link>` autodiscovery

**Steps**:

1. Create `public/llms.txt` with the following structure (static file, served at `/llms.txt`):

   ```
   # SWOTBee — HubSpot & Shopify Consulting
   # https://swotbee.com
   # Updated: 2026-04-02

   SWOTBee is a HubSpot and Shopify consulting firm serving mid-sized companies
   (50–100 employees) in Energy, Utilities, SaaS, Construction, and Manufacturing.
   We help RevOps and Sales Ops teams implement HubSpot, build renewal pipelines,
   integrate third-party tools, and optimize marketing automation.

   ## Key Pages
   - Homepage: https://swotbee.com/
   - Services overview: https://swotbee.com/services/
   - HubSpot Onboarding: https://swotbee.com/services/hubspot-onboarding
   - Marketing Automation: https://swotbee.com/services/marketing
   - Sales & RevOps: https://swotbee.com/services/sales-revops
   - Integrations: https://swotbee.com/services/integrations
   - Blog: https://swotbee.com/blog
   - Contact: https://swotbee.com/contactus

   ## Top Blog Posts
   - Complete Guide to HubSpot Renewal Pipeline: https://swotbee.com/posts/hubspot-renewal-pipeline-complete-guide
   - HubSpot Renewal Pipeline Stages: https://swotbee.com/posts/hubspot-renewal-pipeline-stages
   - Renewal Deal Workflow Automation: https://swotbee.com/posts/hubspot-renewal-deal-workflow-automation

   ## Proprietary HubSpot Apps
   - Smart Company Picker, Smart Deal Inspector, Renewal Deal Builder, Deal Copilot
   - Available on HubSpot Marketplace

   ## Contact
   - Consultation: https://swotbee.com/contactus
   - LinkedIn: https://linkedin.com/company/swotbee
   ```

2. Install `@astrojs/rss`:
   ```bash
   npm install @astrojs/rss --legacy-peer-deps
   ```

   Create `src/pages/rss.xml.ts`:
   ```typescript
   import rss from '@astrojs/rss';
   import type { APIContext } from 'astro';

   export async function GET(context: APIContext) {
     const posts = import.meta.glob('./posts/*.md', { eager: true });
     const items = Object.entries(posts)
       .map(([path, post]: [string, any]) => ({
         title: post.frontmatter.title,
         pubDate: new Date(post.frontmatter.pubDate),
         description: post.frontmatter.description,
         link: `/posts/${path.replace('./posts/', '').replace('.md', '')}`,
       }))
       .filter(item => !isNaN(item.pubDate.getTime()))
       .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

     return rss({
       title: 'SWOTBee — HubSpot & Shopify Consulting Blog',
       description: 'HubSpot tips, RevOps strategies, and CRM automation guides for mid-market teams.',
       site: context.site ?? 'https://swotbee.com',
       items,
       customData: `<language>en-us</language>`,
     });
   }
   ```

3. Create `src/pages/404.astro` using BaseLayout and V6 design tokens:

   The page should include:
   - `BaseLayout` with `title="Page Not Found"` and `robots="noindex, follow"`
   - `Navbar` and `Footer` components
   - A centered layout with `max-w-2xl mx-auto px-6 py-24 text-center`
   - A large "404" display in `text-v6-copper font-bold text-8xl`
   - Heading: "This page doesn't exist" in `text-v6-dark`
   - Subtext: "The URL may have moved or been mistyped." in `text-v6-text-muted`
   - A primary CTA button to `/` ("Back to Home") styled `bg-v6-copper text-white px-6 py-3 rounded-xl hover:bg-v6-copper-600 transition-colors`
   - A secondary link to `/blog` ("Read our blog") styled as an underline text link in `text-v6-teal`

4. In `src/layouts/BaseLayout.astro`, inside `<head>` before the closing tag, add:

   ```html
   <!-- Google Search Console verification — set GSC_VERIFICATION env var -->
   {import.meta.env.PUBLIC_GSC_VERIFICATION && (
     <meta name="google-site-verification" content={import.meta.env.PUBLIC_GSC_VERIFICATION} />
   )}
   <!-- RSS autodiscovery -->
   <link rel="alternate" type="application/rss+xml" title="SWOTBee Blog" href="/rss.xml" />
   ```

   The GSC verification tag is gated on an env var `PUBLIC_GSC_VERIFICATION` so it is a no-op until the client provides the value. When deploying, add `PUBLIC_GSC_VERIFICATION=<token>` to the GitHub Actions environment or repo secrets.

**Acceptance criteria**:
- [ ] `npm run build` succeeds
- [ ] `dist/llms.txt` exists and contains the SWOTBee site description
- [ ] `dist/rss.xml` exists and is valid XML with at least 10 `<item>` entries
- [ ] Navigating to a non-existent URL in preview (`npm run preview`) shows the branded 404 page, not a blank/default error
- [ ] Viewing page source of any page shows `<link rel="alternate" type="application/rss+xml" ...>`
- [ ] When `PUBLIC_GSC_VERIFICATION` env var is set, the meta tag appears in source; when unset, it is absent

**Dependencies**: None (parallelizable with Phase 1)

---

## Phase 3: Blog Post Frontmatter — modifiedDate and Author Enhancements

**Goal**: Add `modifiedDate` support to the Article schema (fixing the fallback to `pubDate`), display a visible "Last Updated" date on posts, and enrich author frontmatter with credentials and LinkedIn for Person schema. This phase makes the schema and UI machinery ready for the actual per-post data that editorial will fill in.

**Items covered**: 5, 11, 12, 13

**Files to create/modify**:
- `src/layouts/BlogPostLayout.astro` — add modifiedDate display, update Article schema call, enhance author bio section
- `src/utils/seo.ts` — `generateArticleStructuredData` already accepts `modifiedTime`; verify and document the field
- `src/pages/posts/hubspot-renewal-pipeline-complete-guide.md` — add `modifiedDate`, enhanced `author` fields as the reference example
- `src/pages/posts/hubspot-renewal-deal-workflow-automation.md` — same (already touched in Phase 1)
- (Remaining posts can be updated incrementally outside of this phase)

**Steps**:

1. In `BlogPostLayout.astro`, update the Article schema `<script>` block to explicitly pass `modifiedTime`:

   ```astro
   <script type="application/ld+json" set:html={JSON.stringify(generateArticleStructuredData({
     title: frontmatter.title,
     description: frontmatter.description,
     image: frontmatter.image,
     url: canonicalURL,
     publishedTime: frontmatter.pubDate,
     modifiedTime: frontmatter.modifiedDate || frontmatter.pubDate,
     author: frontmatter.author?.name || 'SWOTBee',
     tags: frontmatter.tags
   }), null, 2)}></script>
   ```

   The `generateArticleStructuredData` function in `seo.ts` already has `"dateModified": seoData.modifiedTime || seoData.publishedTime` — this step simply ensures the data flows through correctly from the frontmatter field `modifiedDate` (note: frontmatter uses `modifiedDate`, schema function uses `modifiedTime`).

2. In `BlogPostLayout.astro`, add `modifiedDate` formatting alongside the existing `pubDate` formatting:

   ```astro
   const modDate = frontmatter.modifiedDate
     ? new Date(frontmatter.modifiedDate).toLocaleDateString('en-US', {
         year: 'numeric', month: 'long', day: 'numeric'
       })
     : null;
   ```

3. In the article header meta line (the `<div class="flex flex-wrap items-center gap-3 ...">` block), after the `<time datetime={frontmatter.pubDate}>` element, add:

   ```astro
   {modDate && modDate !== pubDate && (
     <>
       <span>·</span>
       <span class="text-xs bg-v6-teal-50 text-v6-teal px-2 py-0.5 rounded-full border border-v6-teal-100">
         Updated {modDate}
       </span>
     </>
   )}
   ```

   The badge uses `v6-teal` (positive/freshness signal) at small size so it does not compete with the title.

4. Enhance the author bio section in `BlogPostLayout.astro` (the `<!-- Author Bio -->` div, currently showing a static generic description). Replace the static description paragraph with:

   ```astro
   <p class="text-xs text-v6-text-muted leading-relaxed mt-0.5">
     {frontmatter.author?.bio || 'HubSpot consultants helping mid-sized companies in Energy, Manufacturing, and SaaS turn their CRM into a revenue engine.'}
   </p>
   {frontmatter.author?.linkedin && (
     <a
       href={frontmatter.author.linkedin}
       target="_blank"
       rel="noopener noreferrer"
       class="inline-flex items-center gap-1 text-xs text-v6-teal hover:text-v6-teal-600 transition-colors mt-1"
     >
       <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
       </svg>
       Connect on LinkedIn
     </a>
   )}
   {frontmatter.author?.expertise && (
     <div class="flex flex-wrap gap-1 mt-2">
       {frontmatter.author.expertise.map((area: string) => (
         <span class="text-xs bg-v6-bg border border-v6-border text-v6-text-muted px-2 py-0.5 rounded-full">{area}</span>
       ))}
     </div>
   )}
   ```

5. Update `hubspot-renewal-pipeline-complete-guide.md` frontmatter as the reference example for the expanded author schema:

   ```yaml
   modifiedDate: "2026-04-02"
   author:
     name: "SWOTBee Team"
     url: "https://swotbee.com"
     imageUrl: "/assets/ico/logo.png"
     bio: "HubSpot-certified consultants specializing in renewal pipeline architecture, RevOps automation, and CRM migration for mid-market B2B companies."
     linkedin: "https://linkedin.com/company/swotbee"
     expertise:
       - "HubSpot CRM"
       - "Renewal Pipelines"
       - "Revenue Operations"
   ```

**Acceptance criteria**:
- [ ] `npm run build` completes with no errors
- [ ] On a post with `modifiedDate` set, the article header shows a teal "Updated [date]" badge
- [ ] On a post without `modifiedDate`, no badge appears
- [ ] Article JSON-LD on the complete guide post has `"dateModified"` set to the modifiedDate value, not the pubDate
- [ ] Author bio section shows the custom `bio` text, LinkedIn link, and expertise badges on posts that have those fields
- [ ] On posts without enhanced author fields, the fallback generic text still renders correctly

**Dependencies**: Phase 1 (Person schema in StructuredData.astro must exist to match the `author.linkedin` conditional)

---

## Phase 4: Author Pages and Related Posts Schema

**Goal**: Build dedicated author pages (`/authors/[name]`) and add `isPartOf` schema connecting cluster posts to the pillar. This phase makes authors linkable entities and creates the content cluster signal for search engines.

**Items covered**: 6, 14

**Files to create/modify**:
- `src/pages/authors/[name].astro` — new dynamic route
- `src/utils/posts.ts` — extend to expose `getPostsByAuthor(name)` and `getAuthorData(name)`
- `src/data/authors.ts` — new file, author registry
- `src/layouts/BlogPostLayout.astro` — add `isPartOf` schema on cluster posts, link author name to author page

**Steps**:

1. Create `src/data/authors.ts` as a static registry:

   ```typescript
   export interface Author {
     name: string;
     slug: string;
     bio: string;
     linkedin?: string;
     jobTitle: string;
     expertise: string[];
     imageUrl: string;
   }

   export const authors: Author[] = [
     {
       name: "SWOTBee Team",
       slug: "swotbee-team",
       bio: "HubSpot-certified consultants specializing in renewal pipeline architecture, RevOps automation, and CRM migration for mid-market B2B companies in Energy, Manufacturing, SaaS, and Construction.",
       linkedin: "https://linkedin.com/company/swotbee",
       jobTitle: "HubSpot Consultants",
       expertise: ["HubSpot CRM", "Renewal Pipelines", "Revenue Operations", "Marketing Automation", "CRM Integration"],
       imageUrl: "/assets/ico/logo.png",
     },
   ];

   export function getAuthorByName(name: string): Author | undefined {
     return authors.find(a => a.name.toLowerCase() === name.toLowerCase());
   }

   export function getAuthorBySlug(slug: string): Author | undefined {
     return authors.find(a => a.slug === slug);
   }
   ```

2. Extend `src/utils/posts.ts` with a `getAllPosts()` function that returns all posts (not just the top 3) with full frontmatter, and a `getPostsByAuthor(authorName: string)` convenience filter. Rename the existing `getRecentPosts` export to also expose `getAllPosts` without the `.slice(0, 3)` limit. Keep the existing `getRecentPosts` export intact for backward compatibility.

3. Create `src/pages/authors/[name].astro` as a dynamic route:

   - Use `getStaticPaths()` to generate one path per entry in the `authors` array, using `slug` as the path param
   - Import `getAllPosts` from `src/utils/posts.ts` and filter by author name
   - Use `BaseLayout` with title `"[Author Name] | SWOTBee Blog"`
   - Include `Navbar` and `Footer`
   - Page structure:
     - Author header: avatar circle (initial letter, `bg-v6-teal-100 text-v6-teal`), name in `text-3xl font-bold text-v6-dark`, job title, LinkedIn link if present
     - Expertise tag pills: `bg-v6-bg border border-v6-border text-v6-text-muted text-xs px-3 py-1 rounded-full`
     - Bio paragraph in `text-v6-text-muted`
     - Post grid: same card pattern as `blog.astro` — `bg-white rounded-xl border border-v6-border hover:shadow-md transition-shadow`
   - Include Person JSON-LD schema using the author data

4. In `BlogPostLayout.astro`, add `isPartOf` schema for cluster posts. Add a `seriesName` and `pillarUrl` frontmatter field convention:

   ```astro
   {frontmatter.seriesName && frontmatter.pillarUrl && (
     <script type="application/ld+json" set:html={JSON.stringify({
       "@context": "https://schema.org",
       "@type": "Article",
       "@id": canonicalURL,
       "isPartOf": {
         "@type": "Blog",
         "name": frontmatter.seriesName,
         "url": `https://swotbee.com${frontmatter.pillarUrl}`
       }
     }, null, 2)}></script>
   )}
   ```

5. Update all 10 renewal cluster posts (everything in `posts/` with `hubspot-renewal-` prefix except `hubspot-renewal-pipeline-complete-guide.md`) to add:

   ```yaml
   seriesName: "HubSpot Renewal Pipeline"
   pillarUrl: "/posts/hubspot-renewal-pipeline-complete-guide"
   ```

6. In `BlogPostLayout.astro`, wrap the author name in the meta line with a link to the author page:

   ```astro
   {frontmatter.author?.name && (
     <a
       href={`/authors/${getAuthorByName(frontmatter.author.name)?.slug || 'swotbee-team'}`}
       class="font-medium text-v6-dark hover:text-v6-copper transition-colors"
     >
       {frontmatter.author.name}
     </a>
   )}
   ```

**Acceptance criteria**:
- [ ] `npm run build` completes; `dist/authors/swotbee-team/index.html` exists
- [ ] Navigating to `/authors/swotbee-team` in preview shows the author page with bio, expertise, and post cards
- [ ] Cluster posts show the `isPartOf` JSON-LD block in page source
- [ ] The pillar post (`hubspot-renewal-pipeline-complete-guide`) does NOT have `isPartOf` (it has no `seriesName` frontmatter)
- [ ] Author name in blog post header is a clickable link to the author page

**Dependencies**: Phase 3 (author frontmatter schema established)

---

## Phase 5: Performance — Font Preloading, Preconnect, Image Dimensions, Prefetch

**Goal**: Add `<link rel="preload">` for critical fonts, `<link rel="preconnect">` for external origins, audit and add explicit dimensions to images lacking them in layouts, and add `<link rel="prefetch">` for key internal pages. These are all `<head>` and template changes with no visible UI impact.

**Items covered**: 16, 17, 18, 19, 21

Note on item 16 (`font-display: swap`): Rokkitt Variable already has `font-display: swap` in `global.css` (lines 242 and 252). The `@fontsource-variable/*` packages (Hanken Grotesk, DM Sans) already include `font-display: swap` in their CSS. The `@fontsource/lexend-deca` and `@fontsource/vollkorn` packages also ship with `font-display: swap`. This item is already complete — the plan notes this and performs a verification step only.

Note on item 20 (render-blocking audit): Astro's Vite pipeline handles CSS/JS bundling and defers scripts automatically for static output. Alpine.js is loaded via an inline `<script>` in `BaseLayout` (not `defer`/`async`) — this is the one actionable item.

**Files to create/modify**:
- `src/layouts/BaseLayout.astro` — add `<link rel="preload">` for Rokkitt woff2 and Hanken Grotesk woff2, add `<link rel="preconnect">` for external origins, add `<link rel="prefetch">` for service pages, make Alpine.js load deferred
- `src/layouts/BlogPostLayout.astro` — add `width` and `height` attributes to the featured image `<img>` tag

**Steps**:

1. In `BaseLayout.astro` `<head>`, before the `<AstroSEO>` component, add font preloads for the two most critical fonts (body + headings):

   ```html
   <!-- Preload critical fonts -->
   <link
     rel="preload"
     as="font"
     type="font/woff2"
     href="/node_modules/@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2"
     crossorigin="anonymous"
   />
   <link
     rel="preload"
     as="font"
     type="font/woff2"
     href="/node_modules/@fontsource-variable/rokkitt/files/rokkitt-latin-wght-normal.woff2"
     crossorigin="anonymous"
   />
   ```

   Note: Astro's build pipeline copies `@fontsource` files into `/_astro/` with hashed names. The correct approach for Astro is to copy the two critical woff2 files into `public/fonts/` and preload from there. Add a build step note: copy `node_modules/@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2` and `node_modules/@fontsource-variable/rokkitt/files/rokkitt-latin-wght-normal.woff2` into `public/fonts/`. Reference as `/fonts/hanken-grotesk-latin-wght-normal.woff2` and `/fonts/rokkitt-latin-wght-normal.woff2` in the preload tags.

2. In `BaseLayout.astro` `<head>`, add preconnect tags for all external origins used across the site:

   ```html
   <!-- Preconnect to external origins -->
   <link rel="preconnect" href="https://images.unsplash.com" />
   <link rel="dns-prefetch" href="https://images.unsplash.com" />
   <link rel="preconnect" href="https://www.googletagmanager.com" />
   <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
   <link rel="preconnect" href="https://www.google-analytics.com" />
   ```

3. In `BaseLayout.astro` `<head>`, add prefetch hints for the highest-value internal pages:

   ```html
   <!-- Prefetch key internal pages -->
   <link rel="prefetch" href="/services/hubspot-onboarding" />
   <link rel="prefetch" href="/services/marketing" />
   <link rel="prefetch" href="/contactus" />
   ```

4. In `BaseLayout.astro` `<body>`, change the Alpine.js `<script>` from synchronous inline to use the `is:inline` directive with a `defer`-equivalent pattern. Since Astro processes scripts, the safest approach is to move the Alpine import to a separate file `src/scripts/alpine-init.ts` and reference it with `<script src="/scripts/alpine-init.js">` — however, since Alpine is needed for interactive components, only move it if no above-the-fold component depends on it. If service page accordions use Alpine `x-data`, keep synchronous loading but note this as a known trade-off.

   The actionable change: add `defer` attribute to any non-Alpine scripts loaded synchronously. Verify that Flowbite's JS (loaded via the `@plugin` CSS import) does not add blocking scripts.

5. In `BlogPostLayout.astro`, update the featured image `<img>` tag to include explicit dimensions:

   ```astro
   <img
     src={frontmatter.image}
     alt={frontmatter.title}
     class="w-full rounded-xl object-cover aspect-video"
     loading="eager"
     width="800"
     height="450"
     decoding="async"
   />
   ```

   The `800×450` (16:9) dimensions match the `BLOG_IMAGE_DIMENSIONS` constant already defined in `blog.astro`. Also add `width` and `height` to the author avatar placeholder `<div>` — since it is a `<div>` not an `<img>`, no change needed there.

6. Verify `font-display: swap` coverage: run `grep -r "font-display" node_modules/@fontsource*/` and confirm all loaded font packages already include it. Document the result in a comment in `global.css`. No code change expected.

**Acceptance criteria**:
- [ ] `npm run build` completes; `public/fonts/` directory contains the two woff2 files
- [ ] Page source of any page shows `<link rel="preload" as="font" ...>` for both Hanken Grotesk and Rokkitt
- [ ] Page source shows `<link rel="preconnect" href="https://images.unsplash.com">` and GTM preconnect
- [ ] Page source shows prefetch links for the three key pages
- [ ] Featured blog post images have explicit `width="800" height="450"` attributes
- [ ] Lighthouse performance score does not regress from pre-phase baseline (run before and after)

**Dependencies**: Phase 2 (BaseLayout is also modified there — coordinate the edits to avoid conflicts)

---

## Phase 6: Analytics, Utility Components, and Category Pages

**Goal**: Add GA4 analytics (env-var gated), the "Reviewed by" attribution component, scroll-to-top button, and blog category pages with unique intro content. These are independent features with no inter-dependencies.

**Items covered**: 23, 24, 26, 27, 28

**Files to create/modify**:
- `src/layouts/BaseLayout.astro` — add GA4 gtag script (env-var gated)
- `src/components/astro/ReviewedBy.astro` — new component
- `src/layouts/BlogPostLayout.astro` — add scroll-to-top button, conditionally render ReviewedBy
- `src/pages/categories/[slug].astro` — new dynamic route for category pages

**Steps**:

1. In `BaseLayout.astro`, add GA4 immediately before `</head>`:

   ```astro
   {import.meta.env.PUBLIC_GA4_ID && (
     <>
       <script async src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.PUBLIC_GA4_ID}`}></script>
       <script is:inline define:vars={{ ga4Id: import.meta.env.PUBLIC_GA4_ID }}>
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', ga4Id);
       </script>
     </>
   )}
   ```

   This is a no-op unless `PUBLIC_GA4_ID` is set in the environment. Add `PUBLIC_GA4_ID=G-XXXXXXXXXX` to `.env.local` (gitignored) and to GitHub Actions secrets for production.

2. Create `src/components/astro/ReviewedBy.astro`:

   ```astro
   ---
   interface Props {
     reviewerName: string;
     reviewerTitle?: string;
     reviewerLinkedin?: string;
     reviewDate?: string;
   }
   const { reviewerName, reviewerTitle, reviewerLinkedin, reviewDate } = Astro.props;
   ---
   <div class="flex items-center gap-3 py-3 px-4 bg-v6-teal-50 border border-v6-teal-100 rounded-xl text-sm">
     <svg class="w-4 h-4 text-v6-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
     </svg>
     <span class="text-v6-text-muted">
       Reviewed by{' '}
       {reviewerLinkedin ? (
         <a href={reviewerLinkedin} target="_blank" rel="noopener noreferrer" class="font-semibold text-v6-dark hover:text-v6-teal transition-colors">
           {reviewerName}
         </a>
       ) : (
         <span class="font-semibold text-v6-dark">{reviewerName}</span>
       )}
       {reviewerTitle && <span class="text-v6-text-muted">, {reviewerTitle}</span>}
       {reviewDate && <span class="text-v6-text-muted"> · {reviewDate}</span>}
     </span>
   </div>
   ```

3. In `BlogPostLayout.astro`, add ReviewedBy rendering between the article header and featured image (when `frontmatter.reviewedBy` exists):

   ```astro
   import ReviewedBy from '../components/astro/ReviewedBy.astro';
   // ...
   {frontmatter.reviewedBy && (
     <div class="max-w-[680px] mx-auto px-4 sm:px-6 mb-4">
       <ReviewedBy
         reviewerName={frontmatter.reviewedBy.name}
         reviewerTitle={frontmatter.reviewedBy.title}
         reviewerLinkedin={frontmatter.reviewedBy.linkedin}
         reviewDate={frontmatter.reviewedBy.date}
       />
     </div>
   )}
   ```

   Frontmatter convention for reviewed posts:
   ```yaml
   reviewedBy:
     name: "Jane Smith"
     title: "Certified HubSpot Partner"
     linkedin: "https://linkedin.com/in/janesmith"
     date: "March 2026"
   ```

4. In `BlogPostLayout.astro`, add a scroll-to-top button above the `<Footer />`. This is a visible floating button that appears after scrolling 600px — similar to the existing floating ToC button pattern:

   ```astro
   <button
     id="scroll-top-btn"
     aria-label="Scroll to top"
     class="fixed bottom-6 left-6 z-50 bg-white border border-v6-border text-v6-text-muted w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-v6-bg hover:text-v6-dark transition-colors opacity-0 pointer-events-none"
   >
     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
     </svg>
   </button>
   ```

   Add to the existing `<script is:inline>` block (in `DOMContentLoaded`):
   ```javascript
   var scrollTopBtn = document.getElementById('scroll-top-btn');
   if (scrollTopBtn) {
     window.addEventListener('scroll', function() {
       if (window.scrollY > 600) {
         scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
         scrollTopBtn.classList.add('opacity-100');
       } else {
         scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
         scrollTopBtn.classList.remove('opacity-100');
       }
     });
     scrollTopBtn.addEventListener('click', function() {
       window.scrollTo({ top: 0, behavior: 'smooth' });
     });
   }
   ```

5. Create `src/pages/categories/[slug].astro` as a dynamic route:

   - Use `getStaticPaths()` that reads all posts, collects unique `category.href` slugs, and generates one path per unique category slug
   - Define category intro content as a static object keyed by slug (e.g., `"revenue-operations": { title: "Revenue Operations", intro: "..." }`)
   - Page layout: BaseLayout + Navbar + Footer
   - Category header: title in `text-3xl font-bold text-v6-dark`, unique intro paragraph in `text-v6-text-muted text-lg`, post count badge
   - Post grid: same card pattern as blog.astro
   - Include BreadcrumbList schema: Home > Blog > [Category Name]

   Category slugs to predefine intro content for (derived from existing post frontmatter):
   - `revenue-operations`: "Strategies and frameworks for aligning sales, marketing, and customer success around revenue data in HubSpot."
   - `crm-comparisons`: "Side-by-side breakdowns of HubSpot vs. competing platforms, with migration guidance for mid-market teams."
   - `hubspot-tips`: "Practical HubSpot configuration tips, workflow recipes, and feature walkthroughs."
   - `integrations`: "Technical guides for connecting HubSpot to NetSuite, Xero, DocuSign, Zoom, Shopify, and other tools."

**Acceptance criteria**:
- [ ] `npm run build` completes; `dist/categories/revenue-operations/index.html` exists
- [ ] Navigating to `/categories/revenue-operations` in preview shows the category page with unique intro and post cards
- [ ] When `PUBLIC_GA4_ID` is set, GA4 gtag script appears in page source
- [ ] `ReviewedBy.astro` renders correctly on a test post with `reviewedBy` frontmatter set
- [ ] Scroll-to-top button appears on the left side at bottom of blog posts after scrolling, and scrolls to top when clicked
- [ ] Category pages include a BreadcrumbList JSON-LD block in page source

**Dependencies**: Phase 3 (author frontmatter conventions established; blog post layout structure stable)

---

## Phase 7: Content Surfaces — Resources Hub, Blog Search, and Answer-First Guidance

**Goal**: Build the `/resources` content hub page, add Pagefind-powered blog search, and document the answer-first content pattern for editors. This phase is the most visible user-facing addition and is best done after all schema and author infrastructure is in place.

**Items covered**: 25 (reading progress bar — already implemented in BlogPostLayout), 30 (blog search), 24 (resources hub), 22 (answer-first guidance)

Note on item 25 (reading progress bar): Already implemented in `BlogPostLayout.astro` (lines 79–82 with `id="reading-progress"`). No work needed.

**Files to create/modify**:
- `src/pages/resources.astro` — new content hub page
- `src/pages/search.astro` — blog search page powered by Pagefind
- `astro.config.mjs` — add Pagefind integration
- `package.json` — add `pagefind` dev dependency
- `src/components/astro/Navbar.astro` — add "Resources" link and search icon
- `docs/content-guidelines/answer-first-pattern.md` — new editorial guidance document

**Steps**:

1. Install Pagefind:
   ```bash
   npm install --save-dev pagefind --legacy-peer-deps
   ```

   Add a `postbuild` script to `package.json`:
   ```json
   "postbuild": "pagefind --site dist --output-path dist/pagefind"
   ```

   This generates the search index after every `npm run build`. The search UI is loaded client-side from `/pagefind/pagefind-ui.js`.

2. Create `src/pages/search.astro`:

   - Use BaseLayout with title "Search — SWOTBee Blog"
   - Include Navbar and Footer
   - Page header: "Search the Blog" in `text-3xl font-bold text-v6-dark`
   - A `<div id="search"></div>` container where Pagefind UI mounts
   - Load Pagefind UI via `<script>` in the component:
     ```astro
     <script is:inline>
       window.addEventListener('DOMContentLoaded', () => {
         new PagefindUI({
           element: "#search",
           showSubResults: true,
         });
       });
     </script>
     <link href="/pagefind/pagefind-ui.css" rel="stylesheet">
     <script src="/pagefind/pagefind-ui.js"></script>
     ```
   - Override Pagefind's default CSS variables to match V6 tokens using a `<style>` block:
     ```css
     :root {
       --pagefind-ui-primary: var(--color-v6-copper);
       --pagefind-ui-text: var(--color-v6-dark);
       --pagefind-ui-background: var(--color-v6-bg);
       --pagefind-ui-border: var(--color-v6-border);
       --pagefind-ui-font: 'Hanken Grotesk Variable', sans-serif;
     }
     ```

3. Create `src/pages/resources.astro` as the content hub page:

   - Use BaseLayout, Navbar, Footer
   - Include FAQPage and BreadcrumbList schema for the page itself
   - Page structure:
     - Hero section: `bg-v6-bg border-b border-v6-border py-16 text-center`
       - Badge: "Resource Center" pill in `bg-v6-copper-50 text-v6-copper text-xs font-semibold px-3 py-1 rounded-full`
       - H1: "Everything You Need to Master HubSpot" in `text-4xl font-bold text-v6-dark`
       - Subtext in `text-v6-text-muted text-lg max-w-2xl mx-auto`
       - Search bar linking to `/search`
     - Content sections (each in a card grid):
       - "Complete Guides" — 4 cards linking to pillar posts and service pages
       - "By Topic" — category cards linking to `/categories/[slug]`
       - "Quick References" — links to FAQ page, sitemap, and contact
     - Bottom CTA strip: V6 copper gradient matching service page pattern, linking to `/contactus`

   Import post data using `import.meta.glob` (same pattern as `blog.astro`) to pull the renewal pillar post and other high-value posts dynamically.

4. Update `src/components/astro/Navbar.astro` to add a "Resources" nav link pointing to `/resources`, positioned between "Blog" and "Contact" (or wherever the current nav order places it). Also add a search icon linking to `/search`. Follow the existing nav item styling patterns.

5. Create `docs/content-guidelines/answer-first-pattern.md` documenting the editorial pattern (not code):

   This document should cover:
   - What "answer-first" means: lead with the direct answer (1–2 sentences), then explain
   - The AEO callout block pattern: a `<div class="bg-v6-teal-50 border-l-4 border-v6-teal rounded-r-xl px-5 py-4 my-6">` block at the top of each H2 section with a bolded direct answer
   - Examples: before/after rewrites of opening paragraphs
   - When to use HowTo frontmatter (step-by-step posts) vs. FAQPage schema (Q&A posts)
   - Checklist for editors before publishing a new post

**Acceptance criteria**:
- [ ] `npm run build && npx pagefind --site dist` completes; `dist/pagefind/` directory exists with index files
- [ ] Navigating to `/search` in preview shows the Pagefind search UI with V6 copper styling
- [ ] Typing "renewal" in the search box returns blog post results
- [ ] `/resources` page renders with hero, content sections, and category grid
- [ ] Navbar contains a "Resources" link
- [ ] `docs/content-guidelines/answer-first-pattern.md` exists and contains the AEO block example
- [ ] `npm run build` with `postbuild` script generates the pagefind index automatically

**Dependencies**: Phases 1–4 complete (resources page links to author pages and category pages; search needs all posts to be built first)

---

## Implementation Order Summary

| Phase | Items | Parallelizable? | Est. Session Time |
|-------|-------|-----------------|-------------------|
| Phase 0: Web Vitals & Accessibility | A11y fixes (contrast, landmarks, labels, links) | First — before all others | 30 min |
| Phase 1: Schema Infrastructure | 1, 2, 3, 4 | Yes — parallel with Phase 2 | 45 min |
| Phase 2: New Endpoints & Static Files | 7, 8, 9, 10 | Yes — parallel with Phase 1 | 40 min |
| Phase 3: Blog Frontmatter & Author Bio | 5, 11, 12, 13 | After Phase 1 | 30 min |
| Phase 4: Author Pages & Cluster Schema | 6, 14 | After Phase 3 | 45 min |
| Phase 5: Performance | 16, 17, 18, 19, 21 | After Phase 2 | 30 min |
| Phase 6: Analytics, Components, Categories | 23, 24, 26, 27, 28 | After Phase 3 | 50 min |
| Phase 7: Resources, Search, Guidance | 22, 24 (hub), 30 | After Phases 4 + 6 | 60 min |
| Phase 8: Final Web Vitals Validation | Lighthouse audit all page types, fix regressions | After all phases | 20 min |

**Already implemented (no work needed)**: Item 25 (reading progress bar), Item 16 (font-display: swap on `@fontsource*` packages).

**Total items**: 30 (28 requiring code/content changes, 2 already done).

---

## Environment Variables Reference

| Variable | Phase | Purpose |
|----------|-------|---------|
| `PUBLIC_GSC_VERIFICATION` | Phase 2 | Google Search Console HTML tag value |
| `PUBLIC_GA4_ID` | Phase 6 | GA4 Measurement ID (e.g., `G-XXXXXXXXXX`) |

Add both to `.env.local` for development (gitignored) and to GitHub Actions repository secrets for production deployment. Reference in the workflow YAML as:
```yaml
env:
  PUBLIC_GSC_VERIFICATION: ${{ secrets.PUBLIC_GSC_VERIFICATION }}
  PUBLIC_GA4_ID: ${{ secrets.PUBLIC_GA4_ID }}
```
