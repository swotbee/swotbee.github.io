# Astro Blog Templates & Themes - Research Report

**Date:** 2026-03-30
**Purpose:** Identify the best Astro blog templates ranked by feature completeness for blog UX

---

## Feature Comparison Table

| # | Template | Stars | ToC | Read Time | Progress Bar | Related Posts | Author Bio | Social Share | Tags/Cats | Search | RSS | Dark Mode | Responsive | Tailwind | Content Collections |
|---|----------|-------|-----|-----------|-------------|---------------|------------|-------------|-----------|--------|-----|-----------|------------|----------|-------------------|
| 1 | **Openblog** | ~988 | Yes | Yes | No | Yes | No (roadmap) | Yes | Yes | Yes (Pagefind) | Yes | Yes | Yes | Yes | Yes |
| 2 | **AstroWind** | 5,500 | No | No | No | Yes | No | Yes | Yes | No | Yes | Yes | Yes | Yes | Yes |
| 3 | **AstroPaper** | 4,400 | No* | No* | No | No | No | No | Yes | Yes (Fuzzy) | Yes | Yes | Yes | Yes | Yes |
| 4 | **Bookworm Light** | 359 | No | No | No | Yes | Yes (multi-author) | Yes | Yes | Yes (FuseJS) | No | No | Yes | Yes | Yes |
| 5 | **Astroplate** | 1,000 | No | No | No | Yes | Yes (multi-author) | No | Yes | Yes | No | Yes | Yes | Yes | Yes |
| 6 | **Astro Cactus** | 1,600 | No | No | No | No | No | No | Yes | Yes (Pagefind) | Yes | Yes | Yes | Yes (v4) | Yes |
| 7 | **Dante** | 457 | No | No | No | No | Yes (hero bio) | No | Yes | No | Yes | Yes | Yes | Yes | Yes |
| 8 | **Northendlab Light** | ~200 | No | No | No | No | Yes (multi-author) | No | Yes | Yes (FuseJS) | No | No | Yes | Yes | Yes |
| 9 | **Astro Micro** | 500 | No | No | No | No | No | No | No | Yes (Pagefind) | Yes | Yes | Yes | Yes | Yes |
| 10 | **Geeky** | ~150 | No | No | No | No | No | No | Yes | No | No | Yes | Yes | Yes | Yes |
| 11 | **Hydrogen** | ~100 | No | No | No | Yes | No | No | No | No | No | No | Yes | Yes | Yes |
| 12 | **Blogster** | 656 | No | No | No | No | No | No | No | No | Yes | Yes | Yes | Mixed | Deprecated |

**Note:** AstroPaper may have ToC/reading time in implementation but not documented in README.

---

## Ranked by Feature Completeness (14 blog-UX features scored)

### Tier 1 - Most Feature-Complete

#### 1. Openblog (Score: 11/14)
- **GitHub:** https://github.com/danielcgilibert/blog-template (~988 stars)
- **Features:** ToC, reading time, related posts, social sharing, tags/categories, Pagefind search, RSS, dark mode, responsive, Tailwind, content collections, syntax highlighting, MDX
- **Missing:** Reading progress bar, author bio (on roadmap), multi-author
- **Tech:** Astro + Tailwind + TypeScript, optional Tina CMS integration
- **Verdict:** The most blog-feature-complete template. Only one missing ToC + reading time + search + related posts combo.

#### 2. Bookworm Light Astro (Score: 9/14)
- **GitHub:** https://github.com/themefisher/bookworm-light-astro (359 stars)
- **Features:** Multi-author with author pages, related posts, social sharing, tags/categories, FuseJS search, responsive, Tailwind, MDX, content collections, 95+ PageSpeed
- **Missing:** ToC, reading time, progress bar, RSS, dark mode
- **Tech:** Astro 6.0 beta + Tailwind CSS + Sitepins CMS
- **Verdict:** Best for multi-author team blogs. Strong categorization and author management.

#### 3. Astroplate (Score: 9/14)
- **GitHub:** https://github.com/zeon-studio/astroplate (1,000 stars)
- **Features:** Multi-author, multilingual, similar posts, search, dark mode, tags/categories, Disqus comments, responsive, Tailwind, MDX, syntax highlighting
- **Missing:** ToC, reading time, progress bar, social sharing, RSS
- **Tech:** Astro + Tailwind v4 + TypeScript + Sitepins CMS
- **Verdict:** Best for multilingual blogs. Rich feature set with CMS integration.

### Tier 2 - Strong Feature Set

#### 4. AstroWind (Score: 8/14)
- **GitHub:** https://github.com/onwidget/astrowind (5,500 stars)
- **Features:** Related posts, social sharing, tags/categories, RSS, dark mode, responsive, Tailwind, MDX, content collections, RTL support, image optimization, OG tags, analytics
- **Missing:** ToC, reading time, progress bar, search, author bio
- **Tech:** Astro 5.0 + Tailwind CSS
- **Verdict:** Most popular by stars. Great for business/marketing blogs. Excellent image optimization and analytics integration.

#### 5. AstroPaper (Score: 8/14)
- **GitHub:** https://github.com/satnaing/astro-paper (4,400 stars)
- **Features:** Fuzzy search, tags, draft posts, RSS, sitemap, dark mode, responsive, Tailwind, accessible, dynamic OG image generation, type-safe markdown
- **Missing:** ToC, reading time, progress bar, related posts, author bio, social sharing
- **Tech:** Astro + Tailwind + TypeScript
- **Verdict:** Best accessibility story. Excellent for developer/personal blogs. Very high star count indicates community trust.

#### 6. Astro Cactus (Score: 7/14)
- **GitHub:** https://github.com/chrismwilliams/astro-theme-cactus (1,600 stars)
- **Features:** Tags, Pagefind search, RSS, dark mode, responsive, Tailwind v4, content collections, semantic HTML, auto OG images via Satori
- **Missing:** ToC, reading time, progress bar, related posts, author bio, social sharing
- **Tech:** Astro 4.0 + Tailwind v4
- **Verdict:** Clean, opinionated design. Good balance of features and simplicity. Well-maintained.

### Tier 3 - Moderate Feature Set

#### 7. Dante (Score: 7/14)
- **GitHub:** https://github.com/JustGoodUI/dante-astro-theme (457 stars)
- **Features:** Hero bio section, tags, RSS, sitemap, dark mode, responsive, Tailwind, MDX, view transitions, subscription form
- **Missing:** ToC, reading time, progress bar, related posts, search, social sharing
- **Tech:** Astro + Tailwind
- **Verdict:** Best portfolio + blog combo. Elegant design focused on content readability.

#### 8. Northendlab Light (Score: 7/14)
- **GitHub:** https://github.com/themefisher/northendlab-light-astro (~200 stars)
- **Features:** Multi-author, tags/categories, FuseJS search, responsive, Tailwind, MDX, OG images, high PageSpeed
- **Missing:** ToC, reading time, progress bar, related posts, social sharing, RSS, dark mode
- **Tech:** Astro v4 + Tailwind
- **Verdict:** Good for personal multi-author setups. Clean minimal design.

#### 9. Astro Micro (Score: 6/14)
- **GitHub:** https://github.com/trevortylerlee/astro-micro (500 stars)
- **Features:** Pagefind search, Giscus comments, RSS, dark mode, responsive, Tailwind, sitemap, type-safe
- **Missing:** ToC, reading time, progress bar, related posts, author bio, social sharing, tags
- **Tech:** Astro + Tailwind, zero frameworks
- **Verdict:** Lightest weight option. Best for developer blogs that want comments built-in.

#### 10. Geeky (Score: 5/14)
- **GitHub:** Via Statichunt (~150 stars)
- **Features:** Multiple blog layouts, tags/categories, dark mode, responsive, Tailwind, MDX, config-driven customization
- **Missing:** ToC, reading time, progress bar, related posts, author bio, social sharing, search, RSS
- **Verdict:** Good for experimentation with different layouts. Actively updated.

---

## Key Findings

### Content Collections (Astro 4+/5+)
All modern templates use Astro Content Collections, which is the recommended approach for blog posts:
- Posts stored in `src/content/blog/` (or `src/data/blog/`)
- Schema defined in `src/content/config.ts` for type safety
- Supports Markdown and MDX out of the box
- Astro v5.0+ introduced the Content Layer API for external CMS sources
- Astro v5.10+ added experimental "live content collections" for runtime data fetching

### Template vs. Custom Build for Existing Astro Site
**Recommendation: Hybrid approach** - extract patterns from a template, integrate into your existing site.

Reasons:
- Starting from a template means restructuring your existing project
- Most templates share the same underlying patterns (content collections, layouts, MDX)
- The blog-specific features (ToC, reading time, search) are individually implementable
- Long-term, customized themes give blogs more recognition
- Templates are best for greenfield projects; for existing sites, cherry-pick features

### SEO Best Practices for Astro Blogs
1. **Sitemap:** Use `@astrojs/sitemap` integration (auto-generates from routes)
2. **RSS:** Use `@astrojs/rss` for feed generation
3. **Structured Data:** Add JSON-LD schema markup (Article, BlogPosting, BreadcrumbList)
4. **Open Graph:** Meta tags for social sharing previews
5. **Performance:** Astro ships zero JS by default; aim for 95+ PageSpeed
6. **Image Optimization:** Use Astro's built-in `<Image>` component
7. **Canonical URLs:** Prevent duplicate content issues
8. **Core Web Vitals:** 0.9s load vs 3s load can double bounce rate

### Features No Template Fully Covers
No single template has ALL of these blog UX features:
- **Reading progress bar** - Not found in any template
- **Table of contents** - Only Openblog has it built-in
- **Reading time** - Only Openblog has it built-in
- These are easy to add custom (rehype plugins for ToC, word-count calculation for reading time, scroll event listener for progress bar)

---

## Quick Decision Guide

| If you need... | Use this template |
|----------------|-------------------|
| Most blog features out of the box | **Openblog** |
| Largest community & ecosystem | **AstroWind** (5.5k stars) or **AstroPaper** (4.4k stars) |
| Multi-author team blog | **Bookworm Light** or **Astroplate** |
| Portfolio + blog combo | **Dante** |
| Multilingual blog | **Astroplate** |
| Lightest weight / zero framework | **Astro Micro** |
| Best accessibility | **AstroPaper** |
| Built-in comments | **Astro Micro** (Giscus) or **Astroplate** (Disqus) |
| Adding blog to existing Astro site | Cherry-pick from **Openblog** patterns |

---

## Sources

- [Astro Official Themes Directory](https://astro.build/themes/)
- [AstroPaper - GitHub](https://github.com/satnaing/astro-paper)
- [AstroWind - GitHub](https://github.com/onwidget/astrowind)
- [Openblog - GitHub](https://github.com/danielcgilibert/blog-template)
- [Astro Cactus - GitHub](https://github.com/chrismwilliams/astro-theme-cactus)
- [Astro Micro - GitHub](https://github.com/trevortylerlee/astro-micro)
- [Astroplate - GitHub](https://github.com/zeon-studio/astroplate)
- [Bookworm Light Astro - GitHub](https://github.com/themefisher/bookworm-light-astro)
- [Dante - GitHub](https://github.com/JustGoodUI/dante-astro-theme)
- [Blogster - GitHub](https://github.com/flexdinesh/blogster)
- [Best Astro Blog Templates 2026 - Statichunt](https://statichunt.com/blog/best-astro-blog-templates)
- [10+ Best Astro Blog Templates 2026 - Themefisher](https://themefisher.com/best-astro-blog-templates)
- [5 Best Astro Blog Themes - BetterLink](https://eastondev.com/blog/en/posts/dev/20251202-best-astro-blog-themes/)
- [Astro Content Collections Docs](https://docs.astro.build/en/guides/content-collections/)
- [Astro SEO Complete Guide](https://eastondev.com/blog/en/posts/dev/20251202-astro-seo-complete-guide/)
- [Astro SEO Best Practices - DatoCMS](https://www.datocms.com/blog/astro-seo-and-datocms)
- [Astro Blog Complete Guide - BetterLink](https://eastondev.com/blog/en/posts/dev/20251203-astro-blog-complete-guide/)
