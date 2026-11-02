# NeuronWriter score check

Later browser assessment succeeded with the user-supplied browser account: final
Content Score **55/100**. See [browser assessment](browser-seo-assessment-2026-11-02.md).
The API failure below is historical and belongs to the separate API account.

Attempted 2 November 2026 after Siva requested the article's score.

- Article: `hubspot-line-items-proposal-readiness.md`, local commit `1d8531f`.
- Intended keyword: `hubspot require line items`.
- Intended engine/language: `google.com`, English.
- Connected project: `swotbee.com`, ID `09643a4042e7bde9`, verified via list-projects.
- Existing project analyses were checked. No matching analysis was available.
  The related ramp-pricing query has a different intent and was not substituted.
- A new-query request failed. After verifying no matching query had been created,
  one diagnostic retry returned HTTP 429 with this message:

  > The analysis exceeds the number of keyword analyses available for this month.

No query ID, recommendations, competitor benchmark or article score was obtained.
No content evaluation or editor import was performed. The article is unchanged.
Do not report a guessed or proxy NeuronWriter score.

To complete: obtain available monthly keyword-analysis capacity on an authorized
account, create/reuse the intended analysis, then evaluate the rendered article
body with its H1, title and description. Compare only with that analysis's returned
competitor scores, preserving input hashes and actual API results. Do not change
subscription, purchase credits or repurpose another article's analysis without
the user's direction.
