# Contract workflow production release

Prepared 20 October 2026 following Siva's explicit instruction to publish the reviewed page, remove review instructions and submit one labelled production test. Based on current production `57ed9d562dbf4a8582e6480c3c70e88b018f9513` in isolated branch `codex/publish-contract-workflow-20261020`.

## Change

- Publish the reviewed PandaDoc and HubSpot service copy, concrete manual-work pains, free-call recap, delivery scope and worked-example acceptance checks using the existing V6 design.
- Remove the review strip, review guide, review environment switch and review-only styles from this production source. Explicitly enable the shared contract form and retain cookie settings, canonical metadata and normal indexing.
- Add only `/services/hubspot-contract-management/` to the consent-gated Umami event scope. Keep its replay and heatmap recording disabled. Preserve the current production BaseLayout, analytics vendors, other pilot pages and all unrelated content.
- Extend the existing synthetic Umami acceptance test for one contract form start, one gateway acknowledgement, GA4 dispatch parity, no submitted form contents and no recorder.

## Validation

Node 22.23.3 and pnpm 9.12.3; unchanged frozen lockfile. Build with test GA4/Clarity identifiers and the separate synthetic Umami tenant passed, including 562 social image tags across 285 HTML files. Local contract-form validation, simulated failure, preserved input, retry, attribution, confirmation and 320/390/768/1440 layouts passed with external traffic mocked or blocked.

All 17 consent assertions passed on both this route and the default contact page. Existing blog download, pointer/keyboard inquiry and multi-page attribution checks passed. The real-SDK synthetic Umami test passed including the new contract flow and existing withdrawal, privacy, navigation fallback, page-scope and iframe checks. No real CRM lead was created by these checks. Production markup checks confirmed no preview form or reviewer instructions, indexing, the revised heading and cookie settings. Final source diff and whitespace checks passed.

## Production acceptance

After Pages deployment, inspect the actual public revision, submit one clearly labelled controlled inquiry through its normal reCAPTCHA-backed route, and check the resulting HubSpot form submission and contact properties. Accept analytics for this controlled visit and distinguish browser dispatch, collector ingestion and dashboard visibility. Keep all test visits and inquiries out of acquisition results. Existing consent and bot protections remain in place.

Record final deployment and live test evidence in the root workspace's `docs/research/hubspot-contract-management-acquisition/` library. At preparation time, the existing controlled test contact was readable and had no owner assigned. This release does not change CRM ownership, notification automation, GA key-event settings, Ads conversions or campaign spending.
