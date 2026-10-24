# Umami parallel pilot

Prepared 20 October 2026. Keeps GA4, Clarity, GTM and existing conversion behavior.
The operator requested a real-site trial on Mini before migration to an existing EU
machine. Current Mini/relay outbound country signals are India/US; this trial is
not an EU-only deployment or a compliance certification.

## Configuration

The Pages workflow reads public repository variables, not credentials:

| Variable | Value for this trial |
|---|---|
| `PUBLIC_UMAMI_WEBSITE_ID` | `c8c67e9d-fd59-4042-b892-874e3ab32e84` |
| `PUBLIC_UMAMI_ORIGIN` | `https://send.swotbee.com` |
| `PUBLIC_UMAMI_PATHS` | Optional comma-separated exact paths; defaults below |
| `PUBLIC_UMAMI_REPLAY_PATHS` | Optional comma-separated exact paths; defaults below |
| `PUBLIC_UMAMI_PRECONSENT_TRIAL` | `true` for the temporary operator-authorized parity trial; unset or any other value restores consent gating |

Leaving both ID and origin unset omits the Umami component. Setting only one fails
the build to prevent a misleading partial configuration. No new dependency is used.

Default traffic/event scope:

- `/`
- `/hubspot-sales-pipeline-reporting/`
- `/resources/hubspot-management-reporting-starter-pack/`
- `/resources/contract-tracker-template/`
- `/renewal-audit-call/`
- `/renewal-audit-call/thank-you/`
- `/services/hubspot-contract-management/` (added 20 October for the authorized landing-page release and form verification)

Replay/heatmap script scope is the first four pages only. Booking and contract service pages receive
analytics events, with URL queries removed except approved UTMs, and no recorder.
CM-04 additionally enables consented pageviews/events on `/resources/` and the four
contract companion articles listed in [contract companion measurement](contract-companion-measurement.md).
Those five routes remain consent-only even while the pre-consent trial is enabled,
and never load the recorder. This is a local implementation pending the selected release.
Other pages remain on the existing analytics stack. Business events across the
source now use `__sbTrack` or `__sbTrackThenGo`, so scope can expand after review
without editing each form/video component again. Existing reports and Ads conversion
imports remain GA4-based during the overlap.

## Privacy and reliability

- On 21 October 2026, Siva explicitly authorized visits, events, heatmaps and session
  recordings before consent for the parity trial, including visitors who reject.
  `PUBLIC_UMAMI_PRECONSENT_TRIAL=true` enables this exception. It changes neither GA4's
  existing advanced Consent Mode nor Clarity's consent gate. It is not a statement
  that non-consensual recording meets European requirements.
- With the override unset or false, nothing from Umami loads until analytics consent
  is granted, and rejection/withdrawal blocks requests including unload requests.
  In either mode, iframe previews are excluded and the same page allowlists apply.
- Eligible startup events wait in a bounded in-memory queue until the tracker is ready.
- Scroll thresholds (25/50/75/90%) have separate per-vendor flags. Crossing a threshold
  before consent can count in both vendors during the override, once per threshold
  per page load. In normal gated mode, it cannot consume Umami's threshold; Umami
  counts subsequent post-consent scrolling. Granting consent never duplicates a
  pageview or backfills earlier scrolling.
- Navigation has a 1.2-second fallback even if the collector never responds. Downloads,
  forms and bookings must work with all analytics blocked.
- Events keep only approved, bounded properties. Email/form bodies, transport callbacks
  and persistent user identification are not forwarded to Umami.
- Referrer queries/hashes and unapproved page query values are removed from analytics
  payloads. The actual browser URL is preserved for existing GA/Ads/CRM attribution.
- The recorder is omitted for any URL with a hash or an unapproved query value. It uses
  strict text/input masking and blocks `form, input, textarea, [contenteditable], iframe,
  [data-private], .sensitive-widget` on the server configuration.
- Pilot replay sampling is **10%** of eligible sessions; heatmap sampling is **100%**.
  A single visit may therefore produce a heatmap without a replay. No cross-origin
  booking-frame internals are captured.
- Replay and heatmap retention is 14 days, including saved recordings. Mini's existing
  storage guard and private backup procedures cover the explicit pilot tenant.

Cookie/privacy notices and the banner describe the active mode, including the fact
that Reject does not stop Umami during the override.
This does not resolve every existing third-party practice: the previously configured
LinkedIn advertising behavior and Google advanced Consent Mode remain unchanged.

## Verification

Use Node 22 and pnpm 9.12.3. Controlled tests use the separate synthetic tenant only:

```bash
PUBLIC_GA4_ID=G-TEST PUBLIC_CLARITY_ID=test \
PUBLIC_UMAMI_WEBSITE_ID=37de9287-3007-4ce1-b575-b720fca2b6e1 \
PUBLIC_UMAMI_ORIGIN=https://send.swotbee.com pnpm verify
pnpm check:umami-pilot
pnpm check:consent
pnpm check:blog-measurement
pnpm check:reporting-resource
```

Run the same build with `PUBLIC_UMAMI_PRECONSENT_TRIAL=true`, then run
`node scripts/verify-umami-pilot.mjs --preconsent-trial` and the existing consent,
blog and resource checks. The trial check verifies initial and rejected visitors,
recorder loading, one pageview across a consent choice, and all four scroll thresholds.

The pilot test serves the built website at `127.0.0.1:4418`, uses the real deployed
tracker, blocks unrelated external traffic and intercepts signup/security fixtures.
No real CRM record, booking or external signup is created. It checks consent states,
download parity, failed and retried signups, one accepted/saved event, property/URL
minimization, navigation fallback, page scope and iframe exclusion.

Live smoke test: visit a scoped page with `utm_campaign=umami_parallel_smoke`, accept
analytics, click a download/CTA and scroll. Confirm the event and heatmap under
**SwotBee parallel pilot**, not the synthetic tenant. Use Replay Filter minimum zero.
Do not submit live forms or bookings merely to generate analytics.

## Known upstream limitations and review

Umami 3.4.0's relational replay list sums each chunk's internal start/end duration.
Gaps between chunks are omitted: the test stored a 17.332-second overall span but the
list showed one second. The player works. Use minimum duration zero; do not compare
replay-list durations with GA4 engagement time. No vendor fork or data rewrite is used.

The existing synthetic heatmap iframe appeared blank in the operator's browser while
click/scroll overlays worked. Framing headers permit the dashboard and upstream uses
a lazy live iframe. A useful live-page background must still be verified before treating
heatmaps as fully accepted. Do not weaken framing security globally to hide this issue.

Review after roughly 14 days, or earlier if a technical problem makes the result clear.
Compare event names/properties and successful/failed journeys, not identical user/session
counts. Review script cost and storage, replay/heatmap usefulness, masking, consent
withdrawal and GA4 Ads dependencies. Sparse traffic is not a conversion-performance test.

Cutover remains a later decision: move collector, databases, recordings, backups and
any relay to the operator's EU machine, test recovery and update DNS, then remove the
old vendors only after approved measurement coverage and Ads continuity. Consent
removal is a separate assessment of the remaining tracking purposes.

Emergency collection stop: remove the real-site origins from the collector's explicit
allowlist and validate/reload only its nginx proxy. Permanent rollback: unset both Umami
repository variables and rebuild, or revert this feature. Leave GA4/Clarity variables
and all unrelated infrastructure unchanged.

Restore consent gating: delete `PUBLIC_UMAMI_PRECONSENT_TRIAL` from repository variables
or set it to `false`, then rebuild/deploy. The next page load applies the gate and
restores consent-based notices. It does not erase data already collected.
Exclude `umami_parallel_smoke`, `umami_scroll_fix_check` and `umami_preconsent_check`
campaigns from customer-traffic comparisons. GA4 and Umami still use different
identity/session and filtering rules, so equal event eligibility does not guarantee
identical totals. Review this temporary exception at the existing 14-day pilot review
before any EU cutover.
