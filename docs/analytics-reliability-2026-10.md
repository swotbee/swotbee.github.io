# Analytics reconstruction, privacy and performance

Implementation prepared 29 October 2026. These changes do not expand Umami's
approved page scope, 10% replay sampling or temporary consent trial.

## Historical stylesheet recovery and future retention

Clarity's 22 October homepage heatmap and recording had unstyled HTML. The replay
referenced stylesheet URLs no longer published by the website. The original files
were reproduced by building website revision
`e8d52f99d1ef19349edec5d414c8b542d34dc260` with Node 22.23.3, the unchanged frozen
dependencies and the original source. Their generated filenames matched the
recording exactly. They are intentionally restored as immutable public assets,
not replacements for the current site styles:

| Public file | SHA-256 |
|---|---|
| `/_astro/BaseLayout.a707G2qw.css` | `65ff60f31635aad57dcbc6f8084bc5dd60ce0272b9203794a1b8464d6fdb4a1e` |
| `/_astro/index.2kiT3M9I.css` | `bf7ff005955916f6c6df7e21532038e3ecfbd1b721bfc40e384528bc3364b0f1` |

After each build, the Pages workflow runs `scripts/preserve-replay-assets.mjs
--apply`. It reads the previous public `analytics-replay-assets.json`, verifies
its safe asset paths and hashes, and carries forward CSS, fonts and images for
300 days after they were last part of a clean build. It excludes JavaScript and
page HTML. Missing retained files, changed immutable contents, failed downloads
or an archive above 64 MiB fail the deployment instead of publishing broken history.
On the first deployment, before a previous manifest exists, it also preserves the
current live homepage's CSS and referenced local resources. An outage or deletion
of the manifest later falls back to this bootstrap behavior; it cannot recover
unlisted historical resources. Keep the public manifest in subsequent releases.

The two recovered CSS files in `public/_astro/` are deliberate archival inputs.
`dist/` and the generated retention manifest remain build output. Do not redirect
an old hash to current CSS: that can misrepresent a historical page. Clarity's
own resource cache may need a separate refresh if it cached a failed resource.

## Measurement eligibility and booking privacy

`AnalyticsTestMode.astro` now suppresses all measurement vendors in iframes, so
analytics dashboard live previews do not inflate GA4, GTM, Clarity or Umami traffic.
The existing per-tab `sb_analytics_test` opt-out remains available and reversible.
It is preferable to broad country/IP exclusions that could remove real visitors.

`AnalyticsPrivacy.astro` runs at the start of the head on the booking thank-you
page. It keeps a valid appointment time in page memory for the confirmation UI,
removes booking identifiers and unapproved parameters from the browser URL before
measurement loads, and preserves the bounded campaign/click-ID parameter names.
The page uses `no-referrer`, and Clarity recording is omitted there. The visible
booking time is also marked private/masked. The thank-you-view analytics event
remains; it is not proof of a confirmed booking. No historical Clarity records
are modified or deleted by this change.

## Umami performance and startup ordering

The real tracker uses `data-performance=true` and `data-auto-pageview=false`.
Its before-send hook accepts both event and performance payloads with the same
eligibility and URL minimization. The initial manual pageview is awaited before
queued business events send, allowing them to share the initialized SDK cache.
This does not imply equal GA4 and Umami user/session counts or convert pageviews
into customers. A performance upload is a separate native event type.

## Validation

Use Node 22 and pnpm 9.12.3. With the documented synthetic Umami and test Google
IDs, build in trial mode and normal consent-gated mode separately. Run:

```bash
pnpm verify
pnpm check:replay-assets
pnpm check:analytics-reliability
pnpm check:umami-pilot -- --preconsent-trial
pnpm check:consent
pnpm check:blog-measurement
pnpm check:reporting-resource
```

The direct trial invocation is
`node scripts/verify-umami-pilot.mjs --preconsent-trial`. In the normal build omit
the trial flag. `check:analytics-reliability` uses the actual tracker code but
intercepts all collection, checks one pageview, performance payloads, startup cache
linkage, booking UI/privacy and iframe exclusion. The existing pilot suite checks
the real collector only against the separate synthetic tenant, with fake local
form responses and other vendors blocked. No real lead or booking is submitted.

For local interaction diagnostics, start `node scripts/serve-dist.mjs --port 4415` and run
`pnpm trace:contract-interactions`. This blocks third parties and checks native
disclosures, field typing and invalid submission on desktop and throttled mobile.
It cannot establish production INP with actual third-party scripts. The first
trace observed maximum interactions of 32 ms and 24 ms respectively; it did not
reproduce Clarity's 130-second service-page reading. Keep that finding unresolved
until clean live field data or a representative trace explains it.

## Deployment and rollback

Only an authorized website publication makes these changes live. The Pages job
must complete asset preservation before upload. Then verify the restored CSS URLs
return 200 CSS, the retention manifest is published, booking parameters disappear
before measurement, and the Clarity heatmap/replay reconstructs with styles.
Inspect fresh Umami native performance rows separately from browser request success.
Rollback by reverting the focused tracking changes through the normal release
workflow; preserve the recovered static assets and archival manifest where possible
so rollback does not delete styles required by historical recordings.
