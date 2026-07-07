# SEO Content Pipeline (Merged): Research Strategist + Autonomous Content System + NeuronWriter

This is the single, authoritative pipeline for producing SEO-rich, interlinked article
clusters for swotbee.com. It merges three frameworks:

- **Framework A** (`advanced SEO Research Strategist find sources.md`): source discovery,
  validation, scoring, and community insight extraction.
- **Framework B** (`Autonomous SEO Content System Agent Framework.md`): system context,
  pillar + cluster architecture, internal linking graph, semantic model, authority
  strategy, and executable article seeds.
- **Framework C** (`NeuronWriter: Agent task sequence.md` + the NeuronWriter API): real
  SERP term data, competitor analysis, content scoring, and editor sync.

## Why merge them

Each framework owns a different gap:

| Concern | Owner | Notes |
|---|---|---|
| Where ideas come from (real user language, gaps) | A (community mining) | I can do this automatically |
| How the ecosystem is structured (pillar/clusters/links) | B | I can do this automatically |
| Real keyword/term/competitor data + objective content score | C (NeuronWriter) | Needs API key + Gold plan |
| Writing the articles | Me (this session) | Replaces n8n Tasks 4 to 8 |

NeuronWriter replaces the "proxy SEO metrics" I would otherwise guess at. It does NOT
replace community insight (Framework A) or architecture (Framework B): it sharpens them
with real data and gives a measurable optimization target.

## Where NeuronWriter slots into the existing frameworks

- **Framework A, Step 4 (SEO validation metrics):** replace my proxies (SERP presence,
  citation frequency) with NeuronWriter `metrics`, `competitors`, and term coverage from
  `/get-query`.
- **Framework B, Step 4 (semantic model):** seed `must_cover_concepts` and `user_questions`
  from NeuronWriter `terms` / `terms_txt` and `ideas`, unioned with community themes.
- **Writing + QA:** score every draft with `/evaluate-content`, revise to lift the score,
  then push to the NeuronWriter editor with `/import-content` for human review.

## NeuronWriter API reference (verified)

- Base URL: `https://app.neuronwriter.com/neuron-api/0.5/writer`
- Auth header on every request: `X-API-KEY: <key>`
- `Content-Type: application/json`, `Accept: application/json`
- Endpoints used:
  - `POST /list-projects` -> resolve `NEURON_PROJECT_ID`
  - `POST /new-query` (params: `project`, `keyword`, `engine`, `language`, optional
    `competitors_mode`) -> returns `query` (the query_id), `query_url`, `share_url`
  - `POST /get-query` (param: `query`) -> returns `status` (waiting/in progress/ready),
    plus the analysis. Takes ~90s+ to be `ready` (poll, do not assume 60s). Verified
    response schema:
    - `metrics`: `word_count` {median,target} + `readability` {median,target}.
    - `terms`: dict keyed by zone -> `title`, `desc`, `h1`, `h2`, `content_basic`,
      `content_extended`, `entities`; each a list of term objects to cover.
    - `terms_txt`: same terms as newline-joined text blocks per zone (paste-ready).
    - `ideas`: `topic_matrix` (questions with `importance` 1 to 10), `people_also_ask`,
      `content_questions` (real questions scraped from ranking pages), `suggest_questions`.
    - `competitors`: list of ranking URLs each with a content `score` (the number to beat).
    - `serp_summary`, `keyword`, `language`, `engine`, `query`, and the three URLs.
  - `POST /evaluate-content` (params: `query`, `html`, optional `title`, `description`)
    -> returns content score WITHOUT saving. Does consume plan limit.
  - `POST /import-content` (params: `query`, `html`, optional `title`, `description`)
    -> pushes final draft into the editor for human review.
  - `POST /get-content` (param: `query`) -> retrieve a saved revision (no limit consumed).
- Constraints: API requires Gold plan or higher; calls consume the monthly query limit.
  Budget = 1 query per article seed (pillar + each cluster we choose to write) + 1 to N
  `/evaluate-content` calls per draft during the optimization loop.

## Prerequisites the user must provide

1. `NEURON_API_KEY` (from NeuronWriter profile -> "Neuron API access").
2. Confirmation of Gold plan (API access requirement).
3. `NEURON_PROJECT_ID` (or I resolve it via `/list-projects` and you pick the project).
4. Engine + language defaults: assume `google.com` + `English` unless told otherwise.

Credentials will be passed as environment variables at call time, not written to the repo.

### Active run config (first run: renewal cluster extension)
- Project: `reputebee.com` -> `NEURON_PROJECT_ID = 4dbab1e6a21ced91`.
- Engine: `google.co.uk` (project default; SERP analysis is UK-based, not US).

### Config update (2026-07-06, landing-pages run)
- Live values re-verified via `/list-projects`: `reputebee.com` -> `NEURON_PROJECT_ID = 3dcebed4e4031ff3`, engine `google.com` (US). The values above are stale; use these.
- Key location: `website/.env` (gitignored), variable `NEURON_API_KEY`.
- Language: English.
- Topic: extend the existing "HubSpot Renewal Pipeline" cluster (pillar:
  `/posts/hubspot-renewal-pipeline-complete-guide`, 9 clusters already published).
- API key works (verified via `/list-projects`, `/new-query`, `/get-query`).
- Validation query: `hubspot renewal reminders` -> `query_id 3a9db52787e0c4a1`,
  target word_count ~908, top competitor score 72 (beatable quick-win gap).

## The merged pipeline (phases)

### Phase 0 — Intake & config
- Topic, audience (default to swotbee ICP from CLAUDE.md), business goal, geography.
- NeuronWriter config: API key, project id, engine, language.
- For an EXISTING cluster (e.g. renewals), inventory already-published posts first so we
  only build net-new clusters (gap-fill, not duplicate).
- Output: `blog_brief` + confirmed config. (Covers n8n Task 1 to 2.)

### Phase 1 — Architecture draft (Framework B, steps 1 to 3, 5)
- Draft `system_context`, pillar + cluster map, internal linking graph, authority strategy.
- Each cluster = one unique intent + one primary keyword (the seed keyword for its
  NeuronWriter query).
- Output: `content_architecture` + skeleton `article_seeds`.

### Phase 2 — Per-seed NeuronWriter analysis (Framework C; n8n Tasks 2 to 3, looped)
- For the pillar and each chosen cluster keyword:
  - `POST /new-query` -> capture `query` (query_id) into the seed.
  - Poll `POST /get-query` until `status == ready` (~60s).
  - Store `terms` (must-use + suggested), `terms_txt`, `ideas`/FAQs, `competitors`,
    `metrics` against that seed.
- Output: each seed now carries real term + competitor data.

### Phase 3 — Research & insight mining (Framework A, steps 1 to 3, 5 to 8)
- Mine web + Reddit + Quora + forums automatically; REUSE existing dumps in
  `research-resources/` for renewals (`renewals-reddit-discussions-ALL.md`, the pillar
  idea doc, `youtube-urls-flat.txt`).
- Fold NeuronWriter `competitors` into the candidate source list.
- Apply E-E-A-T / CRAAP / SIFT + the 1 to 5 scoring model; extract recurring questions,
  pain points, emotional triggers, content gaps into an insight bank.
- Output: scored source table + insight bank in `docs/research/blog/<topic>/`.

### Phase 4 — Semantic model finalize (Framework B, step 4)
- `must_cover_concepts` = NeuronWriter terms UNION insight themes.
- `user_questions` = NeuronWriter `ideas` UNION PAA UNION community questions.
- `competitor_gaps` = what NeuronWriter competitors miss vs community pain points.
- Output: finalized `semantic_model` per seed.

### Phase 5 — Write (replaces n8n Tasks 4 to 8; native)
- Execute pillar seed first, then HIGH-priority clusters.
- Each draft must: cover its NeuronWriter terms, use `suggested_headings`, answer the
  `ideas`/FAQs, weave community language, and apply answer-first passages for AI citation.
- Use repo frontmatter convention (`seriesName`, `pillarUrl`, category, tags, author).

### Phase 6 — Score & optimize loop (Framework C)
- `POST /evaluate-content` with the draft HTML + title/description -> content score.
- If below target, revise (add missing terms, deepen thin sections), re-evaluate.
- Iterate until the score reaches the competitive range for that query.
- Output: optimized draft + recorded score.

### Phase 7 — Sync & publish (n8n Tasks 9 to 10 + repo)
- `POST /import-content` -> push final draft to the NeuronWriter editor (human review link).
- Write the `.md` into `src/pages/posts/`, apply the internal linking graph across the
  cluster, update the pillar's outbound links.
- `npm run build` to validate (catches type/import/template errors).

### Phase 8 — Notify (optional; n8n Task 11)
- Optional email/Slack notification that drafts are ready for human edit. Skippable.

## Execution order
1. Pillar (P0) through Phases 2 to 7.
2. HIGH-priority clusters.
3. MEDIUM / LOW clusters.
4. Iterative linking updates after each batch.

## What is automatic vs user-provided
- Automatic (me): all of Framework A and B, all writing, all API calls once creds exist.
- User-provided: NeuronWriter API key + Gold plan confirmation + project id; any
  proprietary IP (anonymized client results, original frameworks, contrarian takes) that
  makes the content linkable.
