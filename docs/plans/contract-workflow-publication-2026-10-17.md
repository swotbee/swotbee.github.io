# Customer contract workflow landing page

Siva authorized publication on 17 October 2026, with Sharmi reviewing afterward. Sharmi review is not a prerequisite to later ad activation. Budget, targeting and campaign activation remain separate decisions.

Production route: `/services/hubspot-contract-management/`.

## Scope

Promotes the reviewed customer-contract implementation service and free initial workflow conversation, with implementation separately scoped and quoted. Uses the existing site fonts, logo, V6 styling, layout, consent and attribution mechanisms. The PandaDoc handoff is explicitly illustrative, not a customer result or universal platform capability.

The form has name, email, signing tool and requested change. The shared contact transport carries tool/context in the existing message field. No new CRM schema or backend automation is introduced. Confirmation states receipt and email follow-up; no meeting has been booked. Email fallback, privacy/terms links and a cookie-settings control are present.

The review route and its tracking-suppression layout changes are not part of this release. The production route explicitly enables submission and uses the normal production layout. Existing contact and early-access variants retain their defaults.

## Validation

- Production build and SEO metadata checks.
- `node scripts/verify-contract-workflow.mjs`: localhost only; CAPTCHA and gateway responses mocked, all other external requests blocked. Covers required inputs, error/input preservation, intentional retry, serialized payload, attribution, scoped confirmation/focus and 320/390/768/1440 widths. No actual lead is created by this check.
- Consent regression on the new route and existing contact route. The first new-route check found a missing cookie-settings control; the footer was corrected before release.
- Existing blog measurement regression for download/CTA attribution.
- Browser review against the production build and final diff inspection.

The shared live backend was separately tested with one authorized synthetic inquiry before publication. That test established CRM receipt, not delivery of the new page or owner notification. A final-route live inquiry would create/update CRM data and is not silently repeated here. Owner handoff, reporting exclusions and primary Ads conversion remain campaign-readiness items. No ad campaign is launched by this release.

## Release and rollback

Release is a focused commit on the current production branch, deployed by the existing GitHub Pages workflow. No package, lockfile, secret, workflow or unrelated content changes are included. Verify the deployed route, live form markup, metadata and assets after successful deployment. If a rollback is needed, prepare a revert of the specific landing-page release commit against current main; obtain authorization before pushing the rollback and preserve subsequent work.
