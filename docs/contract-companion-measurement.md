# Contract companion engagement

CM-04, 24 October 2026. These are secondary learning signals, separate from qualified
inquiries, bookings, payments and Google Ads goals. Local tests verify browser payloads
and mocked adapter delivery. They do not prove production analytics receipt.

The implementation is `src/scripts/contract-companion-engagement.js`, initialized once
from `BaseLayout.astro`. It reads a fixed asset map and runs only on `/resources/` and
the following four articles. Article/media markup and resource bytes are unchanged.

| Guide route under `/posts/` | Video ID / resource ID prefix | Excel filename under `/templates/` | PDF filename under `/templates/` |
| --- | --- | --- | --- |
| `hubspot-contract-record-responsibilities/` | `contract_record_responsibilities` | `hubspot-contract-record-map.xlsx` | `hubspot-contract-record-map.pdf` |
| `hubspot-contracts-renewal-quotes/` | `contract_draft_handoff` | `hubspot-contract-handoff-setup.xlsx` | `hubspot-contract-handoff-setup.pdf` |
| `hubspot-multi-year-contract-pricing/` | `contract_phased_pricing` | `hubspot-phased-pricing-setup-workbook.xlsx` | `hubspot-phased-pricing-companion-pack.pdf` |
| `hubspot-renewal-expansion-revenue-reporting/` | `contract_renewal_expansion_reporting` | `hubspot-renewal-expansion-reporting.xlsx` | `hubspot-renewal-expansion-reporting.pdf` |

Videos match `/videos/customer-contracts/<guide route without trailing slash>.mp4`.
Resource IDs append `_xlsx` or `_pdf` to the prefix. Files with other paths or an
external origin are ignored. No new tracking attributes are needed in CM-01's markup.

## Event contract

| Event | Trigger | Properties before adapter processing | Deduplication |
| --- | --- | --- | --- |
| `video_start` | First positive interval of visible, consented, actual playback | `video_id`, `source_page` | Once per video per document load |
| `video_progress` | 25%, 50%, then 75% unique observed media-time coverage | `video_id`, `source_page`, `percent` (threshold) | Once per threshold per video per document load |
| `video_complete` | Browser reaches ended state after at least 90% unique observed coverage | `video_id`, `source_page`, `percent` (floor of observed coverage, 90-100) | Once per video per document load |
| `resource_download` | Native activation of a whitelisted Excel/PDF download link | `resource_id`, `file_name`, `file_type`, `source_page`, `placement`, `method` | One delegated click per activation; intentional repeated activations count again |

`placement` is `resources_companions` or `article_companion`. `method` is `pointer` or
`keyboard`; the latter includes assistive/programmatic native click activation without
pointer detail. Download events mean activation, not proof that a file was saved or opened.

All new events require explicit `sb_consent=granted`, readable storage, and the shared
`__sbTrack` helper. Undecided, denied and QA-excluded visits produce no new engagement
events. Consent does not replay old events or credit previously denied playback.
Reloading creates a fresh document and may produce a fresh set of milestones; these
are page-level engagement counts, not unique people. No identity or persistent playback
state is created.

The handler unions observed time ranges, so replaying the same section adds no extra
coverage. Skipped sections are not credited. Each credited interval must also exist in
the browser's native `played` ranges and fit elapsed wall time at the active playback
rate. Seeking, waiting, rate changes, hidden tabs and timing gaps longer than two seconds
reset the anchor or reject the gap. This intentionally undercounts uncertain coverage.
Playback is not evidence of attention, comprehension, task completion or a customer result.
Normal pause/resume preserves accumulated coverage. Pause-before-ended ordering is handled.

The existing `__sbTrack` bridge adds GA4's beacon transport and dispatches to Umami.
Umami normalizes `source_page` to a clean absolute URL and retains the allowed keys.
No arbitrary titles, query strings, referrers, contact fields or user identifiers are
added by this tracker. Normal playback and downloads work if tracking is unavailable
or throws.

## Umami scope

`UmamiAnalytics.astro` adds the four article paths and `/resources/` as consent-only
measurement surfaces. They do not inherit `PUBLIC_UMAMI_PRECONSENT_TRIAL=true`, even if
included in `PUBLIC_UMAMI_PATHS`, and never load the recorder. Other existing pilot
paths retain their prior configured consent/trial behavior. No production variable,
collector, secret, goal, recording configuration or campaign was changed by CM-04.
This adds consented pageviews and events on the selected routes, with no new vendor.

## Local verification

Use Node 22 and pnpm 9.12.3 from `website/`. Build with fake IDs and a nonexistent
collector that the test mocks locally:

```bash
PUBLIC_GA4_ID=G-TEST PUBLIC_CLARITY_ID=test \
PUBLIC_UMAMI_WEBSITE_ID=11111111-1111-4111-8111-111111111111 \
PUBLIC_UMAMI_ORIGIN=https://umami-test.invalid pnpm verify
pnpm check:contract-companions
pnpm check:consent --path /services/hubspot-contract-management/
pnpm check:blog-measurement
node scripts/verify-contract-workflow.mjs
```

The companion regression uses rendered DOM handlers with controlled media-time traces
for all four video IDs, plus actual encoded MP4 playback and a seek-to-end decoder/event
smoke test. Because `serve-dist` has no byte-range support, the browser fixture serves
the unchanged published MP4 bytes with range headers for that native-player check. It covers full coverage, skipped ranges, replay overlap, hidden/long gaps,
withdrawal, no consent backfill, denied/undecided/QA suppression, both local adapters,
all eight native downloads, pointer/keyboard/retry activation, duplicate initialization
and failure of the tracking helper. It blocks or mocks third-party requests and submits
no forms. Separate download tabs avoid Chromium's rapid automatic-download throttling.

To test the pilot exception, repeat the build with
`PUBLIC_UMAMI_PRECONSENT_TRIAL=true` and run
`pnpm check:contract-companions --preconsent-trial`. The existing pilot route must retain
its trial behavior, while companion surfaces remain consent-only. Restore the normal
build before running normal consent checks.

`check:umami-pilot` contacts a synthetic live tenant and is not a local mock regression.
It is not needed to transmit anything for this packet's local acceptance.

## Safe post-deployment checks for CM-07

First reconcile the selected CM-06 deployment and existing test evidence. Do not submit
an inquiry, book a call or change Ads/CRM/analytics goals to verify secondary engagement.

1. With `?sb_analytics_test=1`, review layout, native downloads and playback without
   collection. QA mode intentionally cannot verify production receipt.
2. For an explicitly selected consented analytics test, use a dedicated tab and the
   selected route without QA exclusion, with a bounded static QA UTM such as
   `utm_source=qa&utm_medium=verification&utm_campaign=cm04_release_check`. Include no
   personal data. Record timestamp, route, exact deployed revision and these QA labels
   separately so all such activity is excluded from acquisition totals.
3. Accept analytics; play continuously through a known threshold. Check one start and
   each crossed progress event, pause/resume, replay deduplication and the native
   download activation. A seek to the end must not create missing milestones or
   completion. A normal complete viewing should produce one completion if observed
   coverage is at least 90%.
4. Reconcile the bounded event properties in the browser and actual GA4/Umami receipt.
   Browser payload success alone is insufficient. Confirm the new guide routes never
   load a recorder. A fresh rejected/undecided test produces no new engagement events
   and no Umami collector on those routes, including while the older trial is active.
5. Record receiving-system results separately from CRM inquiry ownership and notifications.
   Do not promote engagement to a qualified lead or payment conversion.
