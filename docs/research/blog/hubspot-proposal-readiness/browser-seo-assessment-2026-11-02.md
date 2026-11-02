# Browser SEO assessment

This records the initial 55-point draft. The subsequently authorized
[SEO polish](seo-polish-2026-11-02.md) raised the same analysis to **67/100**.

Checked 2 November 2026 using the browser services explicitly supplied by Siva.
This supersedes the API-capacity blocker for obtaining a NeuronWriter score.
The API account and the browser account have different available capacity.

## NeuronWriter result

- Analysis: https://neuron.digitavision.com/analysis/view/ae887d4eaedcc7c3
- Keyword: `hubspot require line items`; Google US, English.
- Browser workspace: existing `default` project. Its project default is UAE, but
  this analysis visibly targets US `google.com`; the project default was unchanged.
- Kept the default top-ten competitor selection, without tuning the set to improve
  the result or altering any unrelated query.
- Full rendered article body and one H1 were entered in the rich-text editor.
  Headings, lists, table and links were present. Opening and ending were verified.
- Title and description match the current article. The source article is unchanged.
- Final saved Content Score: **55/100**.
- Tool-displayed TOP10 Google median: **50**; highest selected competitor: **72**;
  Google TOP1: **52**; tool's separately labelled selected TOP30 subset median: **52**.
- Term coverage: **45%**; meta coverage: **68%**; counted content words: **1,935**.
- An initial score of 40 preceded entering the actual metadata in the Meta dialog;
  it is not the final article baseline and is not an editorial improvement result.

Input: local website commit `1d8531f`, article source SHA-256
`dfc375833b492106bb217fd5230c5fb162c000ddf82a5865230b6cbe55b2b704`.
Screenshots in the conversation visually confirm the final 55 score and metadata.
No publication, AI rewrite, plagiarism check or workflow completion was performed.

## Interpretation and recommended follow-up

The score is above the tool-displayed top-ten median but below its strongest
selected pages. It does not prove rank, technical accuracy or reader satisfaction.
Results include broad line-item tutorials, community threads, a marketplace page
and video content. The intended article is specifically about proposal review.

Useful terms currently missed include explicit variants such as `line items in
HubSpot`, `HubSpot CRM`, `sales teams`, `sales reps`, and `product library`, plus
clear wording around adding products to deals where that comparison is discussed.
These can be assessed in a focused editorial pass. Do not force generic promotional
terms, reproduce community usernames, broaden into a cloning tutorial or promise
universal enforcement to chase the tool's recommendations.

The current description is 158 characters and the tool measures it at 1004 pixels
against a 960-pixel desktop guide. A shorter description is a practical candidate.
Use a more explicit heading answering whether line items can be required, while
retaining the documented limits and checklist. No proposed change has been scored.
Longer content is not penalized according to the tool's word-count help; do not
remove useful review instructions solely to approach the shorter forum-heavy set.

## Semrush result and limitation

The initial smg1 Content path attempted to reach www.semrush.com and automatic
approval review rejected that different origin. Siva requested staying on the
Digitavision hosts and supplied the smox keyword overview instead. No access to
www.semrush.com was pursued after that direction.

- Authorized keyword overview: https://smox.digitavision.com/analytics/keywordoverview/?q=hubspot+require+line+items&db=us
- US desktop overview showed n/a for volume, keyword difficulty, intent and other
  metrics, with “We have no data to show.” This is unavailable data, not zero demand.
- Navigated through the visible SEO Writing Assistant link and Analyze my text.
- Temporary checker: https://smox.digitavision.com/swa/checker/smr-1d3257c3-2799-4ded-b084-069388096ef9
- Entered and verified the complete readable draft. The editor's paste route
  converted rich text to paragraphs; no final formatted-content score is claimed.
- Its Suggestions and Smart Writer panel remained at Loading, including after one
  reload. No usable configuration, recommendations or score was returned.

Do not report a Semrush content score, keyword difficulty or search volume from
this session. No subscription, security setting or unrelated project was changed.
