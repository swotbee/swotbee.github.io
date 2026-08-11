# Analytics, consent and attribution

How swotbee.com tracks people, what it does not do until they agree, and how a campaign
gets attached to a lead. Read this before adding any tag, pixel, embed or form field.

Built 2026-08-10 and 2026-08-11 as gate D of the pre-ad-spend plan. Everything below was
verified by driving a real browser, not by reading the code. That distinction earned its
place: two consent bugs in this work survived a careful read and were caught only by
watching the network.

---

## 1. The shape of it

| Piece | File | Runs when |
|---|---|---|
| Consent Mode v2 defaults | `src/layouts/BaseLayout.astro` | `<head>`, before gtag.js |
| gtag.js (GA4) | `src/layouts/BaseLayout.astro` | always, on every page |
| Clarity loader | `src/layouts/BaseLayout.astro` | only on accept |
| GTM container | `src/layouts/BaseLayout.astro` | always, AFTER the consent defaults |
| Consent banner | `src/components/astro/ConsentBanner.astro` | when undecided |
| Attribution capture | `src/components/astro/AttributionCapture.astro` | every page, always |
| reCAPTCHA loader | `src/components/astro/RecaptchaLazy.astro` | first focus inside a form |
| Verification | `scripts/verify-consent-gating.mjs` | `pnpm check:consent` |

The banner renders only when `PUBLIC_GA4_ID` or `PUBLIC_CLARITY_ID` is set. Both come from
GitHub Actions secrets at build time, so **a plain local build has no banner and no
analytics**. That is correct behaviour (nothing to consent to), but it means local
Lighthouse scores are optimistic and the consent check needs IDs to test anything:

```bash
PUBLIC_GA4_ID=G-TEST PUBLIC_CLARITY_ID=test pnpm build && pnpm check:consent
```

---

## 2. Settled decisions

**Consent Mode advanced, not basic.** gtag.js loads for everyone; consent controls what it
may store. The alternative (basic mode: withhold gtag.js entirely until consent) was
considered and rejected. Advanced preserves conversion modelling and costs nothing.

**But do not expect modelling to do much yet.** Google's behavioural modelling needs
roughly 1,000 events per day with consent denied, sustained over 7 days. A B2B site at
this volume will not reach that for a long time. Advanced mode is right because it keeps
the option open as traffic grows, not because it is currently recovering conversions. This
is exactly why the attribution work in section 5 matters more than the analytics.

**`url_passthrough: true`, `ads_data_redaction` off.** The first carries
gclid/gbraid/wbraid in the URL when `ad_storage` is denied, so paid conversions stay
attributable without device storage. The second is the opposite lever and is deliberately
left at its default of off.

**Accept and Reject are the same size, weight and shape.** Not decoration. A smaller or
greyer reject is the dark pattern regulators fine, and per
`research/trust-and-authority/`, trust is the binding constraint on this funnel. The
buttons sit in a `grid-cols-2`, not a flex row, so equal width is structural rather than
incidental.

**No cookie wall, no blocking modal, no "by continuing you agree".** A bottom-right corner
card, 320px, from `sm` up; a full-width bottom sheet on phones, where a 320px card is just
a cramped sheet with wasted margin.

**Consent is not an SEO consideration.** It is not a ranking factor. The single
SEO-adjacent risk is Google's intrusive-interstitial guidance, which **explicitly exempts
legally required banners including cookie consent**, provided they use a reasonable amount
of screen space. A corner card is comfortably clear. The banner is `position: fixed` so it
adds no CLS, and Googlebot never clicks Accept so it never loads the gated scripts.

---

## 3. What runs before anyone chooses

Measured, not assumed:

```
googletagmanager.com/gtag/js          loads
google-analytics.com/g/collect        one ping, gcs=G100 (denied)
cookies set                           none
clarity.ms                            nothing
```

`gcs=G100` is Google confirming it received "consent denied"; after accepting it becomes
`gcs=G111`. That parameter is the most reliable single proof the consent signal arrived.

**Google is contacted before consent.** No cookie, no identifier, but the visitor's IP and
page URL reach Google. That is inherent to advanced mode. It is disclosed in the cookie
policy rather than glossed over, because a reader would otherwise reasonably infer that
rejecting means no contact at all.

---

## 3a. Google Tag Manager

Container **`GTM-WV9TQ6FH`**, committed as a default in `BaseLayout.astro` rather than
held in a repo secret. The id is not a secret: it ships in the page source of every page,
exactly like the GA4 and Clarity ids, and it grants nobody the ability to add or change a
tag, which needs GTM account access. `PUBLIC_GTM_ID` still overrides it for testing
against a different container.

That default uses `||`, not `??`. GitHub Actions passes an **unset secret as an empty
string**, and `""` is not nullish, so `??` keeps it and ships no container at all. Verified
by reproducing it: `PUBLIC_GTM_ID="" pnpm build` emitted zero references to the id. The
same trap applies to any other id given a committed fallback.

(Verified live 2026-08-11: `gtm.js` returns 321 KB against
1.5 KB for a nonexistent id). At time of writing it holds no vendor tags; the
`doubleclick` and `googleadservices` strings inside it are GTM's own runtime templates,
which every container ships. Confirmed in a browser that it fires nothing before consent.

It holds the LinkedIn Insight Tag and future advertising pixels. Three rules, all load
bearing:

- **The container must load AFTER the Consent Mode defaults.** GTM reads consent state as
  it initialises, so a container loading first starts with no defaults and a gated tag
  inside it can fire on an undecided visit. Verified in the built HTML: the defaults appear
  at byte 6997, `gtm.js` at 7865.
- **GA4 stays out of the container** and keeps loading directly. Moving a working GA4
  install into GTM risks double-counting every pageview for no gain.
- **The `<noscript>` iframe is deliberately omitted.** A visitor without JavaScript cannot
  be shown the banner and cannot consent, so an unconditional container load for them is
  precisely the ungated fire this setup prevents. It costs nothing, since the noscript
  fallback cannot run tags anyway.

The consent defaults block is gated on `PUBLIC_GA4_ID || PUBLIC_GTM_ID`, not GA4 alone: a
build with a container but no GA4 id would otherwise ship no defaults at all.

`apply()` in `ConsentBanner.astro` also pushes `sb_consent_granted` / `sb_consent_denied`
to the dataLayer. gtag's consent update is what GTM's built-in consent checks read, but a
tag still needs a *trigger*, and triggers listen to the dataLayer. Use these events as the
trigger for every consent-gated tag in the container, rather than All Pages. The denial
event fires too, so a tag can react to withdrawal. `pnpm check:consent` asserts the granted
event is pushed.

## 3b. Tag timing, and what it cost

**Fire advertising tags on Window Loaded, not All Pages.** Measured on production, homepage:

| Mobile | LinkedIn on All Pages | on Window Loaded |
|---|---|---|
| Performance | 74 | **96** |
| LCP | **5.0s** | **2.5s** |
| FCP | 3.4s | 1.4s |

On the wire, before: LinkedIn at +628ms with `load` at +2080ms. After: `load` at +1091ms and
LinkedIn at +1093ms. The load event itself arrives a second earlier because the tag is no
longer competing with the content render. Desktop was 100 either way, so this is a mobile
bandwidth problem and invisible on a desktop check.

Audience seeding is unaffected: the tag still fires for **every** visitor. The trade-off is
that anyone leaving before `load` (~1.1s) is never counted. With an 80.9% bounce rate that
is not nothing, so watch audience growth in Campaign Manager. A Timer trigger at ~500ms is
the middle option if seeding slows.

**Three measurement traps produced three wrong conclusions before this was found**, all in
the same direction, all worth avoiding:

1. Measuring against `python -m http.server`, which sends no compression. Read 81/4.0s where
   the compressed figure was 97/2.1s. Use `pnpm serve:dist`.
2. Running the "block the tag stack" experiment against that same uncompressed build. It
   showed 81 to 79, "tags are not the cause", because the uncompressed CSS and HTML swamped
   everything. Against production the same experiment showed 74 to 98.
3. Inferring a GTM change had shipped from the container's byte size and a `gtm.load`
   string. **Read `"version":"N"` out of `gtm.js` instead**; it is unambiguous, and a
   saved-but-unpublished change is otherwise invisible.

## 3c. Why best practices reads 58, and why we are leaving it

**Decision 2026-08-11: hold the LinkedIn tag as it is. Do not spend more on this.**

Lighthouse best practices scores 58 on every page. Exactly three audits fail, all of them
inside LinkedIn's own script, and 15 of 26 weighted points pass, which is precisely 58:

| Audit | Weight | Source |
|---|---|---|
| `deprecations` | 5 | LinkedIn's deprecated Attribution Reporting call |
| `third-party-cookies` | 5 | LinkedIn's seven cookies on `.linkedin.com` |
| `inspector-issues` | 1 | the same cookies |

Everything under our control already passes, including HTTPS, CSP, HSTS, COOP, clickjacking
and Trusted Types.

**None of it is configurable.** Traced to source rather than inferred:

- `insight.min.js` hard-codes the URL of `insight.old.min.js` and loads it itself.
- `insight.old.min.js` checks `featurePolicy.features().includes("attribution-reporting")`
  and calls `px.ads.linkedin.com/attribution_trigger`. That is the deprecation.
- The GTM tag exposes exactly one parameter, the partner id. There is no first-party cookie
  toggle, no way to skip the legacy file, and swapping to LinkedIn's community GTM template
  changes nothing, because the loader logic lives in LinkedIn's script either way.

**The server-side answer does not apply here, despite being what every guide recommends.**
Website retargeting audiences *require* the Insight Tag. The Conversions API sends
conversions and cannot build Matched Audiences. Since firing ungated exists specifically to
seed a retargeting audience, replacing the browser tag with CAPI would defeat the purpose,
while adding roughly $20 to $50 a month of Cloud Run or Stape hosting. First-party cookie
mode (`li_adsid`) is real but the browser tag still sets cookies on `linkedin.com`, and even
if it did not, `deprecations` would still fail.

So the option set is honestly three: accept 58, consent-gate the tag, or lose retargeting.

**Keep it in proportion.** Best practices is not a ranking factor. Performance is, and after
the Window Loaded change that is 96 mobile and 100 desktop.

### The exit condition, so this does not quietly become permanent

Firing ungated was chosen as a **time-limited** trade-off: LinkedIn needs about 300 members
before an audience can be targeted, and gating to consenting visitors only would have made
that months rather than weeks.

**Once the audience clears 300 in Campaign Manager, gate the tag.** At that point the
seeding argument has done its job, and gating returns best practices to 100 and closes the
PECR exposure in section 4a at no remaining cost.

The mechanism is GTM's per-tag **`consentSettings`** field, currently `notSet`, set to
require `ad_storage`. That is a field on the tag, not a trigger. A "Consent granted" custom
trigger existed and was deleted in container version 5 precisely because it was the wrong
mechanism; the site still pushes `sb_consent_granted` to the dataLayer if a trigger is ever
wanted again.

Sources: [website retargeting requires the Insight
Tag](https://learn.microsoft.com/en-us/linkedin/marketing/matched-audiences/website-visitors-retargeting?view=li-lms-2026-05),
[Matched Audiences unsupported via
CAPI](https://docs.metarouter.io/docs/linkedin-ads-conversions), [300-member
minimum](https://www.linkedin.com/help/lms/answer/a420433).

## 3d. GA4 is currently downloaded twice

**Known cost, measured 2026-08-11, deliberately not fixed yet.** Traced by initiator on the
live site:

```
gtag/js?id=G-6X3GTENZTW                  initiator: parser  <- our HTML
gtm.js?id=GTM-WV9TQ6FH                   initiator: script  <- our HTML
gtag/js?id=G-6X3GTENZTW&cx=c&gtm=4e68    initiator: script  <- gtm.js
```

GTM loads GA4's `gtag.js` on top of the copy our own HTML loads. Different URLs, so
different cache entries, so both download: roughly **145 KB each, about 290 KB for one
analytics library**. The container holds no GA4 tag; GTM pulls it because the measurement id
is associated with the container through Google's tag ecosystem.

So the present setup is the worst of the three options available: GA4 managed separately
from GTM **and** paid for twice. The prize in moving GA4 into the container is deleting the
duplicate, not "central management".

**Why it is not fixed yet.** `scroll_depth`, `cta_click` and `outbound_click` have shown
zero events for 90 days while firing correctly in a browser, and the cause is still unknown
(memory `ga4-custom-events-missing-discrepancy`, recheck around 2026-08-18). Those events
call `window.gtag` directly. Changing how `gtag` reaches the page while an unexplained
silent drop is open would confound that diagnosis and could produce a second silent failure
indistinguishable from the first.

**Order of operations:** resolve the missing-events question first, then move GA4 into GTM
and remove our direct `gtag/js` tag. Two changes, in that order, each independently
measurable.

## 4. Adding a pixel (LinkedIn, Meta, anything)

> **LinkedIn is now an exception to this whole section. Read section 4a first.** The steps
> below remain correct for every *gated* pixel, and Meta should still follow them.

**The rule: Consent Mode does nothing for non-Google tags.** LinkedIn and Meta read no
consent signal. `gtag('consent', ...)` will not gate them. The only real gate is not
loading the script.

If you paste a vendor's snippet into `BaseLayout.astro` as their docs instruct, it fires
on page load for everyone and undoes all of this.

1. Add the ID as a `PUBLIC_`-prefixed GitHub Actions secret and wire it into
   `.github/workflows/pages-deploy.yml` next to the existing two. Astro only exposes
   `PUBLIC_`-prefixed vars to client code.
2. Define a loader in `BaseLayout.astro` following `window.__sbLoadClarity`: an
   idempotency flag, the vendor snippet inside a function, and **nothing calling it on
   load**.
3. Add it to the returning-visitor block so someone who already accepted is not re-asked.
4. Call it from `apply()` in `ConsentBanner.astro`, in the granted branch.
5. **Extend `clearTrackingCookies()`** with the vendor's cookies (`_fbp`, `_fbc` for Meta;
   `li_sugr`, `bcookie`, `lidc`, `UserMatchHistory` for LinkedIn). Miss this and
   withdrawing consent leaves them behind. Note third-party cookies on `.linkedin.com`
   **cannot** be deleted by our JavaScript; only first-party ones clear, and the policy
   must not promise otherwise.
6. **Extend `GATED` and `TRACKING_COOKIE`** at the top of
   `scripts/verify-consent-gating.mjs`, or the check silently stops covering the new
   vendor.
7. Add the cookies to the table in `src/pages/cookie.astro` and the vendor to section 5.
8. Drop the `<noscript>` tracking pixel both vendors supply. It is an `<img>` that fires
   unconditionally with no way to gate it.
8b. Fire it on **Window Loaded**, never All Pages. See section 3b for what All Pages cost.
9. Run `pnpm check:consent`.

---

## 4a. LinkedIn Insight Tag: ungated, deliberately

**Partner id `9775948`**, ad account **SWOTBee 510190797**, purpose **retargeting**. Lives in
GTM (`GTM-WV9TQ6FH`) as tag "LinkedIn Insight", firing on **All Pages**. Version 3, published
2026-08-11.

**It is not gated on consent.** Siva's decision, taken with the trade-off stated: the
retargeting audience needs roughly 300 members before LinkedIn will let it be targeted, and
gating it to consenting visitors only would have made that take months rather than weeks.

**The condition attached to that decision, which is not optional:** the banner and
`/cookie/` were rewritten in the same change so the site does not claim otherwise. The old
banner said "Analytics cookies are off until you say yes." Leaving that while an advertising
tag fired regardless would have made a public statement on our own site false. If the tag's
gating changes again, that copy changes with it, in the same commit.

What the public copy now commits to, and must keep saying while this holds:

- LinkedIn advertising cookies are set on **every visit**, including before the banner is
  answered and including on Reject.
- Analytics stay off until accepted.
- **"Reject" is real but partial.** It stops Google and Microsoft. It does not stop LinkedIn.
- Withdrawal sweeps the LinkedIn cookies, but the tag re-sets them on the next page load, so
  clearing them does not keep them cleared. `/cookie/` says this.

**The exposure this accepts, recorded so it is not rediscovered as a surprise.** The UK is
the primary market; PECR requires prior consent for non-essential cookies; an advertising
retargeting pixel is not "strictly necessary"; and the LinkedIn Ads Agreement puts that
obligation on the advertiser. US visitors are unaffected, being an opt-out regime. **The
middle option, still available:** a geo-split, firing unconditionally for US and gating for
UK and EU. Not taken because a static GitHub Pages site has no server-side geo detection and
would need a client-side country lookup.

**Two things were changed to match, and would silently rot otherwise:**

- `scripts/verify-consent-gating.mjs`: `snap.licdn.com` removed from `GATED` **and** from the
  in-page `gatedTags` probe, which is a second list that is easy to miss. Both carry a note.
  Put LinkedIn back in both if it is ever re-gated.
- `ConsentBanner.astro`'s header comment records the decision at the point someone would try
  to "restore" the old copy.

**The retargeting audience, created 2026-08-11:** `All swotbee.com visitors`, built from the
Insight Tag, rule **URL contains `swotbee.com`**. "Contains" rather than "starts with" on
purpose: LinkedIn's own example hedges between `example.com` and `https://www.example.com`,
so "starts with" depends on how it normalises the URL, while "contains" cannot be tripped by
protocol, `www`, or path. There is no downside, because the tag only fires on our own pages,
so the audience cannot pick up anything else. (The engagement window was set in the same
dialog; longest available is right at this traffic level, so early visitors are not aged out
before the audience is usable. Not confirmed back which value was chosen.)

**Created before the deploy, deliberately.** LinkedIn audiences fill from creation forward
and do not backfill, so anything arriving between a deploy and the audience existing is lost.

**Two limits to expect, neither a fault:** the audience takes up to 48 hours to process, and
LinkedIn will not let it be targeted until roughly **300 members**. Separately, LinkedIn
applies **its own EEA and Switzerland opt-in** on top of ours: European members are only
matched if they have enabled it in their LinkedIn ad settings. So the ungated tag buys
materially less in the EEA than it does in the UK and US, which is worth remembering before
concluding the audience is under-filling.

**Not enabled: Enhanced Matching.** It uploads customer email addresses to LinkedIn for
matching. That is a materially larger privacy commitment than a retargeting pixel and needs
its own decision, not a checkbox taken in passing on the install screen.

**Where the Insight Tag hides in Campaign Manager**, because it took five attempts to find:
**Data → Signals manager** (`/campaignmanager/accounts/<id>/buyer-actions-manager`), then the
"Create Insight Tag" banner, then the **"I will use a tag manager"** accordion. It is not
under Measurement, not under Assets, and `/insight-tag` renders blank. A new ad account is
force-fed a campaign wizard first; **"Create later"** at the bottom left escapes it.

**Do not use LinkedIn's own "Google Tag Manager" tile** in Signals manager, or the
"Link to tag manager" links on the Insight Tag page. That guided integration installs its own
tag configuration and takes the trigger out of your hands.

---

## 5. Attribution, the part that survives a rejection

GA4 attribution only covers people who accept. A **form submission** is data the visitor
hands over deliberately, so attaching the campaign to it works for every lead, at any
volume, consented or not. At current traffic this is worth more than the analytics.

`AttributionCapture.astro` reads `utm_*` plus the click IDs
(`gclid`, `gbraid`, `wbraid`, `msclkid`, `fbclid`, `li_fat_id`, `ttclid`) from the query
string and holds them in **`sessionStorage` under `sb_attr`** for the session.

Why sessionStorage and not a cookie: first-party, never sent to a third party for
tracking, dies with the tab, and read only to populate a form the visitor chooses to
submit. That is a defensible basis for treating it as necessary to handle an enquiry
rather than as analytics storage. **It is a judgement call, not settled law.** It is
disclosed in the cookie policy. The strict alternative is reading the query string only at
submit, which loses any multi-page journey.

Last-touch, not first-touch: a new campaign replaces the stored one wholesale, so a Google
visit followed by a LinkedIn visit does not report a chimera carrying both a `gclid` and
an `li_fat_id`.

The bug this fixed: the four resource forms read `utm_*` straight from
`window.location.search`, which only worked when the form sat on the exact landing URL.
Land on a guide with a campaign, click through, submit, and it was gone. That is precisely
the journey a paid visitor takes.

### HubSpot wiring

Attribution fields must exist in three places or they go nowhere:

1. **A contact property** (`crm/v3/properties/contacts`)
2. **A field on the HubSpot form** (`marketing/v3/forms/{guid}`)
3. **A hidden `<input>` in the markup** whose `name` matches

Current state, all five forms: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`,
`utm_term`, `gclid`, `sb_landing_page`, `sb_referrer`. Properties live in the
`swotbee_lead_magnet` group.

| Form | GUID |
|---|---|
| Contact us | `33b1abe2-20bd-4dc7-985a-5b4793af0312` |
| Uplift Recovery Checklist | `58333f13-64ed-4bb9-a57d-6795cd9b0afd` |
| ARR Correction Kit | `99dd4e6e-433e-4446-8bc2-5915d8e7e3bf` |
| Renewal Health Scorecard | `f8a01a91-7b22-4bf3-940b-f5e427d4a423` |
| Renewal Leakage Estimate | `b321d585-8cbc-4a55-bcd4-ec4526194fd1` |

`/contactus/` fills at **submit** rather than page load, because it is an `is:inline`
script that runs while the document is still parsing, before `AttributionCapture` at the
end of `<body>` has defined the helper. The resource pages use bundled module scripts,
which are deferred and therefore run after it, so they can fill on load.

---

## 6. Researched behaviour worth not rediscovering

**HubSpot's Forms API silently drops undefined fields, it does not reject the
submission.** Widely stated otherwise, including earlier in this repo's own history. The
proof is already in production: the honeypot `company_website` has always been posted by
the resource forms, n8n forwards `fields` verbatim, and submissions succeed while that
field never appears on the contact. Silent dropping is its own hazard: a typo'd field name
loses data with no error anywhere.

**n8n applies no allowlist.** The workflow "SwotBee - Form Submit reCAPTCHA Proxy", node
"Forward to HubSpot", forwards `...body.fields` straight through. So the browser payload
is what HubSpot receives.

**Magnet delivery is not triggered by the form proxy.** It comes from a separate n8n
webhook fired by a HubSpot workflow. The service token has no `automation` scope, so this
could not be confirmed from the API. Practical consequence: **a test submission to a
lead-magnet form probably sends a real email and creates a Kit subscriber.** Test against
the contact form instead, which has no magnet.

> This repository is **public**. Internal identifiers (n8n workflow ids, non-public webhook
> paths, credential locations) stay out of this file. They are in the private session
> memory `hubspot-forms-api-gotchas`. The HubSpot portal id, form GUIDs and the GTM
> container id below are already in the site's page source, so they are not secrets.

**reCAPTCHA v3 sets no cookie until it executes.** Loading `api.js` contacts Google but
stores nothing; `_GRECAPTCHA` appears when a token is generated. So moving it from page
load to first form focus is mostly a performance and data-minimisation win rather than a
compliance fix. It is deliberately **not** consent-gated: bot defence is a
legitimate-interest security measure, and gating it would stop anyone who declines
analytics from submitting a form.

**GA4 rewrites its cookie during page unload.** Clearing cookies immediately before
`location.reload()` does not work; they reappear. Hence the sweep runs on every load while
consent is denied, which is also idempotent and cleans up visitors tracked before the
banner existed.

**Clarity cannot be unloaded.** Once running it runs for the page's life, so withdrawing
consent clears cookies and reloads. Without the reload, "Reject" would leave session
recording running for the rest of the visit.

---

## 7. Verifying

```bash
PUBLIC_GA4_ID=G-TEST PUBLIC_CLARITY_ID=test pnpm build
pnpm check:consent            # 16 assertions across 5 visitor states
pnpm check:consent --verbose  # plus every third-party request per phase
pnpm check:consent --url https://swotbee.com/   # against production
```

Exit codes separate a real failure (1) from a broken harness (2), so it can gate a deploy
without a missing browser blocking one.

**Harness notes**, all of which cost time to discover:

- Snap-packaged Chromium **ignores `--user-data-dir`** and refuses to start when your own
  browser holds the profile lock. Use Playwright's Chromium
  (`~/.cache/ms-playwright/chromium-*/chrome-linux64/chrome`). The script prefers it
  automatically and warns if it falls back to a snap build.
- No automation dependency is needed. Node 22 has a global `WebSocket`, so the script
  speaks the Chrome DevTools Protocol directly.
- **Do not blanket-override `window.fetch`** to intercept a form post. reCAPTCHA uses
  fetch too, so a global override stops the token being produced and the submit dies
  before it reaches your interceptor. Match on the webhook URL and pass everything else
  through.
- On success the forms **redirect to `/thank-you/...`**, which wipes anything held in a
  window global. Capture into `sessionStorage`.
- Focusing a **hidden** input fires no `focusin`, so a lazy loader keyed on form focus will
  look broken if the test picks the first input rather than the first visible one.

### Testing a live submission

The only way to prove HubSpot stores a value is a real submission, which creates a
contact. Done once for the contact form on 2026-08-11 (`gclid=CONTACT456` stored and
verified, contact deleted afterwards). To repeat:

1. `?utm_source=test&utm_campaign=wiring_check&gclid=TESTME123` on the URL
2. Submit with a plus-addressed real inbox, never a fake domain (a bounce damages sending
   reputation, and `swotbee.org` was only just warmed)
3. Check the contact's properties
4. Delete the contact

---

## 8. Known gaps

- Two forms carry a `ga_client_id` hidden field that **nothing has ever populated**, and
  the uplift form lacks it entirely. Either wire it or remove it.
- Consent is recorded only in the visitor's `localStorage`. There is no server-side record,
  so consent history cannot be demonstrated if challenged. Normal for analytics-only
  consent, but a deliberate choice rather than an oversight.
- `/meetus/` embeds HubSpot Meetings, which sets six `__cf_bm` cookies (Cloudflare bot
  management, 30 minutes, strictly necessary) before any choice. No HubSpot **tracking**
  cookies appear, because the tracking script is not installed. Defensible as-is,
  disclosed in the policy.
