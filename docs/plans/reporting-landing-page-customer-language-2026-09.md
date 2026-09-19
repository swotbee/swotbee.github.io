# Reporting landing page customer-language implementation

Date: 2026-09-18

## Evidence used

- 75 public findings across five research areas, recorded in the root workspace at
  `docs/research/reporting-landing-page-customer-language/findings.csv`
- Six independent simulated project-persona transcripts under
  `marketing/user-survey/panel-run-reporting-landing-language-2026-09/`
- Customer-language synthesis at
  `docs/research/reporting-landing-page-customer-language/language-bank.md`

The simulated panel is contact-grounded hypothesis evidence. It is not a set of direct
customer interviews or testimonials.

## Implementation decisions

1. Present the offers as recurring dashboards, not isolated reports. Each destination page must name its audience, reporting trigger, management decision, dashboard views, spreadsheet output, and presentation story.
2. Make the planned three-click workflow prominent in every hero: connect HubSpot, choose the dashboard scope, and create the dashboard and outputs. Keep the early-access disclosure visible until the working beta proves the interaction.
3. Consolidate A2 Week-over-Week into A1 Pipeline Change. Both keyword groups point to the Pipeline Change Dashboard because weekly cadence is a configuration of the same two-cutoff comparison.
4. Keep A3 Historical Pipeline separate. Its job is to preserve, reopen, and trend exact dated states for forecast, QBR, board, finance, and audit conversations.
5. Consolidate B2 Deal Aging into B1 Stale Deals and reposition the destination as a Pipeline Health Dashboard. Staleness and aging become distinct views within the same owner-action workflow.
6. Keep B3 Sales Velocity separate because it calculates the conventional revenue-per-day formula and uses stage duration only to diagnose the sales-cycle driver.
7. Use four destination offers: Pipeline Change Dashboard, Historical Pipeline Dashboard, Pipeline Health Dashboard, and Sales Velocity Dashboard.
8. Give every destination six distinct benefit cards and a unique sample management story. Shared platform value covers recurring generation, Excel-ready detail, PowerPoint output, AI-assisted talking points, and no requirement to understand HubSpot internals.
9. Keep all product claims honest. Scheduled delivery, three-click setup, Excel export, PowerPoint export, custom templates, stored snapshots, and AI narrative remain labelled as planned beta capabilities until validated in the product.
10. Convert the two absorbed routes into noindex canonical redirect pages and remove them from the sitemap while preserving campaign query parameters.

## Keyword route ownership

| Destination | Keyword groups | Absorbed route |
|---|---|---|
| Pipeline Change Dashboard | pipeline change, week over week, weekly pipeline comparison, monthly pipeline movement, deal change history | `/hubspot-week-over-week-pipeline-report/` |
| Historical Pipeline Dashboard | historical pipeline snapshot, weekly snapshot, point-in-time and historical pipeline reporting | none |
| Pipeline Health Dashboard | stale deals, stalled deals, no activity, deal aging, time in current stage, pipeline hygiene | `/hubspot-weekly-deal-aging-report/` |
| Sales Velocity Dashboard | deal velocity, sales velocity, sales velocity formula, pipeline velocity, sales-cycle bottlenecks | none |

## Validation gates

- A second independent six-persona read for clarity, credibility, distinction, and CTA
  trust
- `pnpm verify`
- Desktop and mobile route checks for all six pages
- Final search for jargon, Unicode dash characters, and accidental live-product claims
