# Lead Magnet Funnel Plan: Ads to Paid Engagement

**Owner:** Siva (siva@swotbee.com)
**Created:** 2026-07-07
**Status:** Draft for build. Locks tool responsibilities, the end-to-end workflow, the tracking/data readiness gate, and a CRO hypothesis backlog. Several items are marked OPEN RESEARCH and must be closed before ads spend starts.

Scope: wire the 4 lead-magnet pages so cold paid traffic (Google Ads, LinkedIn) and cold email can be captured, delivered a PDF, nurtured, and converted into a booked paid audit, without exhausting the HubSpot Professional marketing-contact limit.

The 4 lead magnets / pages:
1. `src/pages/resources/renewal-leakage-estimate.astro`
2. `src/pages/resources/renewal-health-scorecard.astro`
3. (magnet 3 to confirm, tied to `/compare/hubspot-renewal-apps`)
4. (magnet 4 to confirm, tied to `/integrations/hubspot-netsuite-renewals` or `/renewals-for-msps`)

> OPEN DECISION D0: confirm the exact 4 magnets and which landing/blog pages each is offered on. The two resource pages above exist as noindexed stubs; the other two need to be named.

---

## 1. Locked decisions (this session)

| # | Decision | Choice |
|---|---|---|
| D1 | PDF delivery to cold traffic | Email-gated. The PDF is sent by a tracked link, not shown on-page. The email gate self-filters fake/spam addresses and builds the nurture list. |
| D2 | Orchestration hub | n8n. The Astro form posts to an n8n webhook; n8n validates the email, creates the Kit subscriber, delivers the magnet, and syncs state to HubSpot. No HubSpot workflows needed (not available on the current seat anyway). |
| D3 | HubSpot contact creation | Form fill creates a HubSpot contact as a NON-marketing contact (does not consume a marketing-contact seat). n8n then creates the Kit contact; on confirmed magnet download and on nurture engagement, HubSpot is updated. Only email FROM HubSpot marks a contact as marketing, so we never email from HubSpot. |
| D4 | Cold-email sending domain | swotbee.org (warmup already running ~1 week). Primary/transactional and magnet-delivery/nurture email stays on swotbee.com. Cold prospecting never touches swotbee.com. |
| D5 | Consent banner | CookieYes (free tier if it covers the single domain + Consent Mode v2). |

### The seat-limit reconciliation (important)
HubSpot Professional limits **marketing contacts** (contacts you email from HubSpot), not total contacts. Strategy:
- All magnet leads land in HubSpot as **non-marketing contacts** for record + attribution.
- **Kit sends all nurture email**, so HubSpot never needs to mark them marketing.
- A contact only becomes a marketing contact if we deliberately promote it (e.g. after a paid engagement). This keeps the seat budget for real customers.

### The "no emails until he books" tension (resolve before build)
Siva's instinct was to send no email until the prospect books the paid engagement. Problem: a magnet download with zero nurture rarely self-converts to a booking (industry data in section 5 puts unassisted downloader-to-call at roughly 3 to 10 percent, and response speed / sequence is the dominant lever). Resolution to adopt:
- **Cold prospecting email** (swotbee.org): outbound to sourced lists, drives to the landing page. This is the only truly "cold" send.
- **Transactional + nurture email** (swotbee.com via Kit): magnet delivery + a short 3 to 4 email nurture whose only goal is to get the booking. This is expected and welcomed by someone who just asked for the PDF, and it is what actually produces bookings.
- HubSpot sends nothing.

> OPEN DECISION D6: approve the short nurture (3 to 4 emails from swotbee.com/Kit) as the mechanism that converts download to booking, versus truly zero nurture. Recommendation: approve the nurture; without it the ad spend has no path to conversion.

---

## 2. Tool responsibility map

| Job | Tool | Notes |
|---|---|---|
| Landing pages + forms | Astro site (swotbee.com) | Forms POST to an n8n webhook, not directly to HubSpot/Kit. |
| Orchestration | n8n (self-hosted) | Single webhook receives the submit, fans out to validation, Kit, HubSpot, and the offline-conversion queue. |
| Email validation | Bouncer (usebouncer.com) as primary; Snov.io verification as secondary | Validate at submit time (real-time API) before adding to Kit, so bad addresses never enter the list. |
| PDF hosting + download tracking | Kit (ConvertKit) | Incentive email with a tracked download link = the download signal (link-click, not email-open, since opens are unreliable post-MPP). |
| Nurture email | Kit (from swotbee.com) | 3 to 4 emails, CTA = book the audit via HubSpot Meetings. |
| Cold prospecting email | Snov.io from swotbee.org | Warmed separate domain. Verified lists only. |
| CRM / record / attribution | HubSpot | Non-marketing contacts, custom properties for gclid/uuid/utm and funnel stage. |
| Call booking | HubSpot Meetings calendar | Booking fires the primary macro conversion. |
| Analytics | GA4 | page_view, generate_lead, magnet_download, book_audit events. |
| Ad conversion | Google Ads (Enhanced Conversions for Leads) + LinkedIn + Meta pixels | Optimize on the OFFLINE qualified event, not the form fill. |
| Heatmap / recordings | Microsoft Clarity (free) | Rage clicks, dead clicks, scroll, quick-backs. |
| Consent | CookieYes | Consent Mode v2 Advanced. |

> OPEN DECISION D7: confirm Bouncer as the validation tool (vs relying on Snov.io verification alone). Recommendation: use a dedicated verifier at form-submit time; Snov verification is fine for the outbound list pass.

---

## 3. The end-to-end workflow (ads to paid engagement)

Each step lists the tracking touchpoint that must fire.

1. **Ad impression / click** (Google, LinkedIn) or **cold email click** (swotbee.org).
   - Track: UTM params on every URL (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`); Google auto-tagging appends GCLID.
2. **Landing page view.**
   - Track: GA4 `page_view`; Google Ads tag; LinkedIn Insight Tag; Meta Pixel; Clarity loads. All gated behind CookieYes consent.
   - Capture: a first-touch script reads gclid/fbclid/li_fat_id/UTMs and mints a first-party UUID, stored in a first-party cookie/localStorage.
3. **Form submit (email captured).**
   - Hidden fields carry GCLID + UUID + UTMs into the submission.
   - POST to n8n webhook.
   - Track: GA4 `generate_lead`; Google Ads conversion; LinkedIn + Meta conversion.
4. **n8n orchestration.**
   - Validate email (Bouncer). If invalid, drop / flag, do not add to Kit.
   - Create/update HubSpot contact (non-marketing) with all identifiers + stage = "magnet requested".
   - Create Kit subscriber, tagged by which magnet, and trigger the delivery automation.
5. **PDF delivery (Kit).**
   - Incentive email from swotbee.com with a tracked download link.
6. **Magnet actually downloaded.**
   - Track: Kit link-click -> webhook back to n8n -> GA4 `magnet_download` + HubSpot stage = "magnet downloaded". This is the confirmed-interest signal.
7. **Nurture sequence (Kit, 3 to 4 emails).**
   - Each email CTA = book a free audit (HubSpot Meetings link with UTM + UUID passthrough).
   - Track: engagement (opens/clicks) synced to HubSpot via n8n as activity, raising a simple lead score.
8. **Audit booked (HubSpot Meetings).**
   - Track: GA4 `book_audit` (primary macro); HubSpot stage = "audit booked"; this is the real MQL.
   - Fire: **offline conversion upload** to Google Ads (Enhanced Conversions for Leads) keyed on GCLID + hashed email. THIS is the event Google Ads optimizes toward, not step 3.
9. **Paid audit closed.**
   - HubSpot deal stage; optionally promote to marketing contact.

**The metric that matters:** step 6 -> step 8 (download to booked audit). If it is below ~2 to 3 percent, the fix is offer/targeting/nurture, not more traffic.

---

## 4. Tracking + data readiness gate (do NOT spend until all pass)

This is a hard gate. Ads spend is blocked until every box is checked with a real end-to-end test lead.

**Tag firing (verify each fires once, correct params):**
- [ ] GA4 events verified in DebugView via Tag Assistant (page_view, generate_lead, magnet_download, book_audit), each fires exactly once (watch for GTM + hardcoded gtag double-fire).
- [ ] Google Ads conversion shows "Verified"/active via Tools > Conversions > Tag Assistant; Conversion ID + Label match.
- [ ] LinkedIn Insight Tag shows Active (Pixel Helper / Network filter `ads.linkedin` = 302).
- [ ] Meta Pixel events visible in Events Manager > Test Events (Pixel Helper).
- [ ] Microsoft Clarity recording sessions.

**End-to-end round trip (one real test lead):**
- [ ] Submit a real form -> the same lead appears in GA4 DebugView, Google Ads, LinkedIn/Meta, HubSpot (contact + hidden fields populated), Kit (subscriber), and the n8n run log.
- [ ] GCLID + UUID intact in HubSpot and Kit.
- [ ] Bouncer rejected a known-bad test address (validation actually gates).
- [ ] Kit delivered the PDF; the tracked download link fired `magnet_download` back through n8n.
- [ ] A test booking fired `book_audit` and queued an offline conversion.

**Offline conversion + consent:**
- [ ] Google Ads auto-tagging ON; GCLID captured in a hidden field.
- [ ] Enhanced Conversions for Leads (Data Manager) configured; only QUALIFIED events (booked audit / SQL) upload, on a DISTINCT conversion action so it does not double-count the form fill.
- [ ] Consent Mode v2 Advanced live through CookieYes; tags respect denied state, modeling enabled.
- [ ] Optimization target in Google Ads = the offline qualified event, NOT raw form fill.

**Note on migration deadline:** from 2026-06-15 offline-import / ECL uploads move to the Google Ads Data Manager API (legacy Ads API blocked). Build the connector on Data Manager from the start.

> OPEN RESEARCH R1: confirm whether we tag via GTM or hardcoded gtag on the Astro static site. Recommendation: route all tags through GTM so CookieYes consent gating and single-fire QA are centralized.

---

## 5. CRO hypothesis backlog (for heatmaps + testing once live)

Frame every hypothesis as: **We believe [change] will cause [effect] for [audience] because [insight], measured by [metric] over [window].** Sort each finding into Test (clear fix), Instrument (can't see it, fix tracking), or Hypothesize (underperforms, no obvious fix).

**Benchmarks to model against (do not blend traffic temperatures):**
- Cold paid / cold email magnet capture: model 1 to 5 percent.
- Warm / organic capture: model 8 to 20 percent.
- Downloader -> booked call: roughly 5 to 15 percent WITH active nurture + fast response; below 5 percent for cold with no follow-up.
- Qualification skews hard by source: SEO/email leads qualify ~46 to 51 percent vs PPC ~26 percent. An organically sourced magnet lead is ~2x more likely to qualify.
- Reply speed is the biggest booking lever: sub-5-minute response can lift booked-meeting rate materially vs 24-hour.

**Seed hypotheses (highest leverage first):**
1. **Message match.** We believe matching the landing headline to the exact ad promise (e.g. "NetSuite renewals") will raise capture rate and lower CPC (via Quality Score) for cold paid, because ad-to-page scent is one of the highest-leverage paid fixes (message-matched tests ~+31 percent), measured by per-campaign conversion rate + bounce, over 2 weeks.
2. **Form field count / quality tradeoff.** We believe email-only capture will beat email+company+role on raw submit rate for cold traffic, because fewer fields consistently lift submits, BUT 2 to 3 qualifying fields may raise MQL-to-SQL 40 to 60 percent, measured by both submit rate AND download-to-booked rate. Test the tradeoff, do not assume "fewer is better."
3. **Above/below fold CTA.** We believe a message-matched headline + CTA above the fold, repeated below, beats above-only, because above-fold gets ~102 percent more attention yet considered offers need the scroll, measured by CTA click + scroll-depth-to-offer.
4. **Single-column / 1:1 attention ratio.** We believe stripping nav + single-column form completes faster and lifts submits (single-column ~15s faster; nav-strip ebook pages +31 percent), measured by form completion time + submit rate.
5. **CTA copy.** We believe value-based first-person copy ("Get my renewal-leakage estimate") beats "Submit"/"Download", because specific value-based CTAs lift clicks (expect +10 to 40 percent, not the outlier 90 percent), measured by CTA CTR.
6. **Specific social proof.** We believe a concrete number ("downloaded by N HubSpot teams") beats generic trust badges, because specific proof lifts (WikiJob +34 percent) while badges are unreliable, measured by submit rate. Watch: badges can HURT.
7. **Offer specificity.** We believe "1-page renewal-leakage estimate for your book" beats "download our guide", because data/research-backed offers are the #1 trigger for B2B buyers to agree to a call (51 percent), measured by click-to-view on the CTA + download-to-booked.

**Heatmap / recording signals to watch (Clarity), priority order:**
- Rage clicks -> element not responding or false affordance. Fix responsiveness/affordance. Almost always a real bug.
- Dead clicks -> broken handler or something that looks clickable but isn't.
- Scroll depth / false bottoms -> is the form/offer in a low-visibility zone? Move it up or earn the scroll.
- Form field drop-off -> which field kills the form; remove/optional/relabel.
- Quick-backs / mouse thrashing -> message mismatch or slow load.
- High attention + low action -> unconvincing copy at that spot; rework.

**Instrument (micro + macro):**
- Macro: form submit, magnet_download, book_audit, deal closed.
- Micro: scroll-to-offer, CTA clicks, form-start (first field focus), per-field focus/blur, time on page, repeat visits, response time to lead (as its own tracked lever).

> OPEN RESEARCH R2 (added at Siva's request): before finalizing the form, research the exact HubSpot form-field set required to VALIDATE each hypothesis above, and the best practices for those fields. Questions to answer:
> - Which custom HubSpot contact properties must exist to test hypotheses 2 and 6 (e.g. company size, role, use case) without hurting capture rate?
> - What is the minimum hidden-field set (gclid, fbclid, li_fat_id, utm_*, uuid) and the correct HubSpot property types for each?
> - Best practices for progressive profiling vs asking upfront, given cold traffic.
> - Field-level validation + GDPR/consent field requirements on the form itself.
> Do not lock the form schema or start A/B tests until R2 is closed.

---

## 6. Gaps + risks to close (non-tracking)

1. **Deliverability.** Cold email on swotbee.org only; verify every list; SPF/DKIM/DMARC on swotbee.org AND swotbee.com; keep magnet/nurture on swotbee.com so a cold-send reputation hit can't poison PDF delivery. Confirm swotbee.org warmup status/age.
2. **Spam/bot form fills.** CAPTCHA/honeypot on the form; Bouncer at submit; rely on the offline qualified event as the true optimization target so bots never train Google.
3. **CAN-SPAM / GDPR on cold email.** Physical address, unsubscribe, honest subject; lawful basis for EU contacts. Legal exposure, not optional.
4. **Nurture content must exist.** The 3 to 4 Kit emails do not exist yet. Forms + PDF are inert without them (see D6).
5. **Booking qualification.** Add 1 to 2 qualifying questions before the HubSpot Meetings booking to protect Siva's time.
6. **NeuronWriter API key** from the prior session is in chat history; rotate if sensitive.

---

## 7. Build order (critical path to "ads can convert")

1. Close D0, D6, D7 and OPEN RESEARCH R1 + R2 (form schema depends on R2).
2. Wire the 4 Astro forms -> n8n webhook (email + hidden fields).
3. n8n flow: validate -> HubSpot (non-marketing) -> Kit -> deliver PDF -> download webhook.
4. Kit: PDF delivery + 3 to 4 email nurture ending in the HubSpot Meetings CTA.
5. Tag stack via GTM: GA4 events, Google Ads (Enhanced Conversions for Leads on the offline event), LinkedIn + Meta pixels, Clarity, CookieYes consent-mode gating.
6. Offline conversion connector on Google Ads Data Manager (booked-audit only).
7. Run the full readiness gate in section 4 with a real test lead.
8. swotbee.org warmup continues in parallel (slowest, already started).
9. Only after the gate passes: turn on ads.

---

## Open items index
- D0: confirm the 4 magnets + their host pages.
- D6: approve the short swotbee.com/Kit nurture as the download-to-booking mechanism.
- D7: confirm Bouncer as the validation tool.
- R1: GTM vs hardcoded gtag on the Astro static site.
- R2: HubSpot form-field set per hypothesis + field best practices (research before locking the form).
