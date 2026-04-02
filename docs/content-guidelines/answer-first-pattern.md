# Answer-First Content Pattern — Editorial Guide

## Why This Matters (AEO / AI Citation)

AI Overviews (Google), Perplexity, and ChatGPT extract the **first 40-60 words** of each section when selecting sources to cite. If your opening paragraph is context or preamble, the AI skips your content for a competitor's that answers directly.

**Rule: Lead every section with 1-2 sentences that directly answer the heading question. Then follow with evidence, context, and examples.**

## The Pattern

### Before (Traditional)
```markdown
## How to Set Up a Renewal Pipeline in HubSpot

Managing renewals is an important part of any SaaS business. Many teams struggle
with this because HubSpot's default pipeline isn't designed for renewals. In this
section, we'll walk through the steps you need to follow...
```

### After (Answer-First)
```markdown
## How to Set Up a Renewal Pipeline in HubSpot

Create a dedicated pipeline in **Settings > Objects > Deals > Pipelines** with
time-based stages (Active Contract, 90-Day, 60-Day, 30-Day, Closed Won/Lost).
Set probability weights at 80-95% — much higher than sales stages. Here's the
step-by-step process:
```

The "after" version answers the question in the first 40 words. An AI engine can extract that passage and cite your article.

## Checklist for Every Blog Post

Before publishing, verify each H2 section against these criteria:

- [ ] **First 2 sentences answer the heading directly** (no throat-clearing, no "In this section we'll...")
- [ ] **Specific data within 150 words** — a number, percentage, benchmark, or concrete example
- [ ] **Heading is phrased as a question or action** — matches how people search
- [ ] **Section is self-contained** — a reader who jumps to this heading gets value without reading prior sections

## When to Use Schema Frontmatter

### HowTo Schema (`howto: true`)
Add to posts that are step-by-step guides. Include `howtoSteps` in frontmatter:
```yaml
howto: true
howtoSteps:
  - name: "Step name"
    text: "What to do in 1-2 sentences"
```

### Series Schema (`seriesName` + `pillarUrl`)
Add to every cluster post in a pillar-cluster series:
```yaml
seriesName: "HubSpot Renewal Pipeline"
pillarUrl: "/posts/hubspot-renewal-pipeline-complete-guide"
```

### ReviewedBy
Add when a subject matter expert has reviewed the post:
```yaml
reviewedBy:
  name: "Expert Name"
  title: "Certified HubSpot Partner"
  linkedin: "https://linkedin.com/in/..."
  date: "April 2026"
```

## Stats and Citations

- Include a specific data point every 150-200 words
- Always cite the source inline: "according to [Source Name](URL)..."
- Prefer recent data (2024-2026)
- Use authoritative sources: industry reports, official docs, research firms
