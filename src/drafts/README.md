# src/drafts/ — built but deliberately unpublished

Astro only creates routes from `src/pages/`. Nothing in this folder is routed, rendered, or
copied into `dist/`, so **nothing here is reachable on swotbee.com**, by URL or otherwise.

That is the point. These are finished or near-finished pages that are intentionally not live.

## Contents

### `state-of-hubspot-renewals-2026.astro` + `assets/state-of-hubspot-renewals-2026-stat-pack.csv`

The "State of HubSpot Renewals 2026" research report page. Built 2026-08-06, then pulled before
ever being published, on the founder's instruction ("this should not be published ever").

Status: **do not publish.** Do not move it back into `src/pages/` without an explicit decision
from Siva. It was already carrying `robots="noindex, follow"` and was never pushed, so it has
never been publicly reachable at any point.

Note the stat pack CSV moved here too. It previously sat in `public/`, which Astro copies
verbatim into `dist/`, so it would have been downloadable at `swotbee.com/reports/...csv` even
with the page itself unrouted. If this is ever revived, that file has to go back to
`public/reports/` and the page's `STAT_PACK` constant still points there.

The underlying research is unaffected and still lives at
`marketing/content/state-of-hubspot-renewals/` in the workspace repo:
`report-v1.md` (the report, stats verified 2026-08-06) and `pitch-plan.md` (the distribution
plan). Those are the source of truth; this folder holds only the web rendering of them.

## If you ever revive something here

1. Move the `.astro` file back under `src/pages/` at the intended route.
2. Move any `assets/` files back into `public/` at the path the page expects.
3. Change `robots` to `index, follow` (leaving it noindex defeats the purpose of publishing).
4. `npm run build` and confirm the page and its assets both appear in `dist/`.
