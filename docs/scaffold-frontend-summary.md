# Scaffold Summary: Frontend — Service Landing Pages

## Layer
Frontend (templates only)

## FILES MODIFIED (complete rewrites)

- `/home/siva/Documents/projects/swotbee/website/src/pages/services/hubspot-onboarding.astro`
  — Rewrote from old FeatureDescriptionBento component pattern to marketing.astro template

- `/home/siva/Documents/projects/swotbee/website/src/pages/services/sales-revops.astro`
  — Rewrote from old FeatureDescriptionBento component pattern to marketing.astro template

- `/home/siva/Documents/projects/swotbee/website/src/pages/services/integrations.astro`
  — Rewrote from old FeatureDescriptionBento component pattern to marketing.astro template
  — Added "Platforms We Connect" section (extra section after Services, before Testimonial)

## Template Pattern (all 3 files)

Each file implements the exact 10-section structure from marketing.astro:
1. Hero — headline + two badge pills + primary CTA + secondary anchor link
2. Trust bar — client logos (Wesco, Big Lots, Insteon, La Vie, Mytheresa)
3. "Sound Familiar?" — 6 pain point cards in 2-col grid
4. Before/After gap — gray left / teal right comparison cards
5. How We Work — 3 numbered steps with copper circle badges
6. Services — 5 cards with emoji icon, title, desc, metric in 3-col grid
7. Testimonial — blockquote with anonymous attribution
8. Why SWOTBee — 4 numbered differentiators (workflow-first, day-one, data quality, industry)
9. FAQ accordion — 7 questions using native HTML `<details>`
10. Risk Reversal CTA — copper gradient section with white CTA button

## Integration Points

- All imports use `../../` relative paths (Layout, Navbar, Footer, StructuredData)
- StructuredData component receives: type="service", data.serviceType per page
- All pages link CTA to `/contactus`
- All pages use the same V6 color tokens: v6-copper, v6-teal, v6-dark, v6-text-muted, v6-bg, v6-border, v6-blue, v6-amber

## Page-Specific Notes

### hubspot-onboarding.astro
- serviceType: "CRM Implementation Consulting"
- Testimonial: VP Sales, Energy Sector (Wellstat/renewal automation story)
- Timeline note: "Typical onboarding: 2–4 months. Quick wins in the first 2 weeks."

### sales-revops.astro
- serviceType: "Revenue Operations Consulting"
- Testimonial: VP Sales, Energy Sector (same renewal automation story — relevant to RevOps)
- Timeline note: "Typical engagement: 3–6 months. Pipeline visibility in the first 2 weeks."

### integrations.astro
- serviceType: "CRM Integration Consulting"
- Extra section: "Platforms We Connect" — 12-item pill grid between Services and Testimonial
- Testimonial: Operations Director, Education Sector (HubSpot + Xero + Django story)
- Timeline note: "Typical project: 4–8 weeks per integration. Complex multi-tool: 3–6 months."
- FAQ background uses `bg-v6-bg` (integrations alternates bg-white / bg-v6-bg differently due to platforms section)
