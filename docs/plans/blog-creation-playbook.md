# Blog Creation Playbook: NeuronWriter SEO Pillar + Cluster Workflow

This is the battle-tested, step-by-step playbook for producing SEO blog clusters on
swotbee.com. It documents exactly how the three renewal pillars were built (Pillar 1:
HubSpot Renewal Pipeline, Pillar 2: Renewal Metrics, Pillar 3: Renewal Strategy, ~33
articles total), the learnings from doing it, and how to improve next time.

Companion docs:
- `docs/plans/seo-content-pipeline-neuronwriter-merged.md` (the framework/spec)
- `docs/plans/renewal-cluster-extension-plan.md`, `renewal-metrics-cluster-plan.md`,
  `renewal-strategy-cluster-plan.md` (worked examples of cluster plans)
- `CLAUDE.md` -> "SEO Blog Content Pipeline" section (quick reference)

---

## 0. Prerequisites and config

- **NeuronWriter API**: base `https://app.neuronwriter.com/neuron-api/0.5/writer`,
  header `X-API-KEY`. Requires Gold plan. Each `new-query` and each `evaluate-content`
  consumes a monthly credit, so be deliberate.
- **Project**: `reputebee.com` -> `NEURON_PROJECT_ID = 4dbab1e6a21ced91`,
  engine `google.co.uk`, language English. (Engine is UK; note this when reading SERPs.)
- **Pass the API key as an env var at call time. Never commit it.**
- **Tools**: `python3` with the `markdown` library (for Markdown -> HTML), `curl`,
  `npm run build` to validate.
- **Auth for push**: the `sivacollab` git account cannot push to `swotbee/swotbee.github.io`.
  Use `gh auth switch --user swotbee` + `gh auth setup-git`, push, then switch back to
  `sivacollab`.

---

## 1. The end-to-end workflow (exactly what was done)

### Step 1: Intake the brief
- Read the pillar brief (topic + 10 to 12 sub-post ideas), e.g. from
  `src/pages/posts/_prompts/research-resources/Pillar Post Idea N...md`.

### Step 2: Gap analysis (avoid cannibalization)
- Inventory existing posts in `src/pages/posts/` for the topic.
- For each sub-topic decide: NET-NEW, DROP (near-duplicate of an existing post), or
  CROSS-LINK. Example: Pillar 2 dropped "predictive health score" because it duplicated
  the existing `hubspot-renewal-risk-scoring` post; it cross-links instead.
- Record cannibalization guards: which existing post each new cluster should link to
  rather than repeat.

### Step 3: Write the cluster plan doc
- Create `docs/plans/<topic>-cluster-plan.md` with: system context (audience, goal,
  differentiation), the pillar + cluster table (id, working title, primary keyword, slug),
  internal linking graph, linkable-asset hooks, execution order, and cannibalization map.
- Get user approval on the plan before spending query credits.

### Step 4: Fire all NeuronWriter queries in one batch
- For the pillar and every cluster keyword, `POST /new-query`
  (`project`, `keyword`, `engine`, `language`). Capture each `query` id into a map file
  (slug -> query_id -> keyword). Firing all at once lets them process server-side in parallel.

### Step 5: Poll until ready (background)
- `POST /get-query` per query until `status == ready` (~90 to 180s; can exceed 60s).
- Foreground `sleep` is blocked in this environment: run the poll loop as a
  background command and let it notify on completion.

### Step 6: Extract the analysis per seed
From each ready `get-query` payload, pull:
- `metrics.word_count.target` -> the length to aim for (critical, see learnings).
- `terms` by zone: `title`, `desc`, `h1`, `h2`, `content_basic`, `content_extended`,
  `entities` -> the terms to cover.
- `ideas.topic_matrix` -> importance-ranked questions (use as H2/FAQ priorities).
- `ideas.people_also_ask`, `ideas.content_questions` -> FAQ and angle ideas.
- `competitors` -> the content `score` to beat (sometimes null on forum-heavy SERPs).

### Step 7: Write each article (pillar first, then clusters)
House style (see any renewal post for a template):
- Frontmatter: `layout`, `title`, `pubDate`, `modifiedDate`, `description`, `category`,
  `author` (SWOTBee Team block), `image` (hero), `tags`. Cluster posts add `seriesName`
  and `pillarUrl`.
- Open with a blockquote linking to the pillar, then an answer-first bold paragraph.
- Use `---` between sections, descriptive H2/H3, tables for steps/specs, a
  `## Frequently Asked Questions` block (bold question + short answer), and the closing
  CTA `[Book a free 30-minute discovery call ->](/contactus)`.
- Cover the NeuronWriter terms and answer the `topic_matrix` questions.
- Internal links: contextual, descriptive anchors to other `/posts/...` pages.
- Follow the global no em/en dash rule.

### Step 8: Score and optimize (the loop)
- Convert the Markdown body to HTML (Python `markdown`, `tables` extension), then
  `POST /evaluate-content` (`query`, `html`, `title`, `description`) to get a content score.
- If below target, add the missing terms (compare body text against `content_basic` /
  `content_extended`) and lengthen toward `word_count.target`, then re-evaluate.
- Stop when it beats the top competitor score, or reaches the realistic band for that
  keyword (see learnings on ceilings).

### Step 9: Sync to the editor
- `POST /import-content` (same payload) to push the final draft into the NeuronWriter
  editor for human review.

### Step 10: Interlink, illustrate, validate
- Add pillar back-links to every cluster, plus cross-pillar links (build vs measure vs win).
- Add one UNIQUE inline image per post (prefer SVG diagrams you control; see image rules).
- Verify every internal `/posts/...` link resolves to a file.
- `npm run build` (must pass; catches type/import/template errors).

### Step 11: Dates, commit, push
- If publishing a batch, spread `pubDate` over a realistic range with gaps; keep
  `modifiedDate` current.
- Commit in logical groups. Push via the `swotbee` account, then restore `sivacollab`.

---

## 2. Reusable snippets

**Evaluate + import a post (Python builds payload, curl calls API):**
```python
import re, json, markdown
src = open(PATH).read(); body = src.split('---',2)[2]; fm = src.split('---',2)[1]
title = re.search(r'title:\s*"(.*?)"', fm).group(1)
desc  = re.search(r'description:\s*"(.*?)"', fm).group(1)
html  = markdown.markdown(body, extensions=['tables','fenced_code'])
json.dump({"query":QID,"html":html,"title":title,"description":desc}, open("/tmp/eval.json","w"))
```
```bash
curl -s -X POST '.../evaluate-content' -H "X-API-KEY: $KEY" -H 'Content-Type: application/json' --data @/tmp/eval.json
curl -s -X POST '.../import-content'   -H "X-API-KEY: $KEY" -H 'Content-Type: application/json' --data @/tmp/eval.json
```

**Find missing terms** (compare lowercased body against each term in
`content_basic` / `content_extended`; weave in the ones that are genuinely on-topic).

---

## 3. Learnings (from actually doing it)

1. **Keyword intent contamination is the biggest trap.** Several keywords pulled a SERP
   whose intent did not match the on-brand vendor angle:
   - "saas renewal strategy" and "saas contract negotiation" returned buyer-side intent
     (managing your own SaaS spend / negotiating contracts you buy), not the vendor
     "win your customers' renewals" angle.
   - "hubspot renewal quote price increase" returned "HubSpot's own pricing is expensive."
   Detect this early by reading `topic_matrix` and `terms`. Decide: keep on-brand and
   accept a lower score, or retarget. Do NOT pivot the article off-brand to chase terms.

2. **Retargeting to broader keywords backfired.** When the low Pillar 3 scores were
   retargeted to broader alternatives ("customer renewal strategy", "tiered pricing
   strategy", etc.), every alternative scored LOWER against the same content. The head
   keyword from the brief was usually the best available fit. Lesson: retarget only to
   MORE specific / lower-competition long-tail terms, not broader ones, and always
   re-score before adopting.

3. **Score is driven by word-count target + term coverage.** NeuronWriter rewards hitting
   `word_count.target` and covering terms. Concise articles (~900 to 1,200 words) against
   long competitor targets (1,500 to 2,700 words) cap out in the 45 to 60 band no matter
   the keyword. Write to the target length from the start.

4. **Observed score bands:**
   - HubSpot-specific, well-scoped keywords: ~60 to 75.
   - Mixed metric keywords: ~50 to 69.
   - Broad GTM / conceptual / contaminated keywords: ~45 to 60.
   Set expectations accordingly; a 55 on a broad term can be a strong, on-brand article.

5. **Forum-heavy SERPs add noise.** "Missing terms" sometimes include Reddit usernames or
   community-thread artifacts (e.g. `chrisoklepke`). Do not chase those. Competitor
   `score` can also be null on these SERPs; target an absolute ~65+ instead.

6. **Image rules learned the hard way:**
   - Never let an inline image equal the post's own hero (same-page duplicate).
   - Never reuse the same image across multiple posts, and do not let an inline image
     match another post's hero.
   - Best practice: one UNIQUE inline SVG diagram per post (you control them, they are
     valid and unique), heroes as photos. Run a duplication audit before committing.

7. **Build gotcha:** raw research dumps placed under `src/pages/` break the Astro build
   (Astro tries to route `.md` files and chokes on stray `{...}`/import-like text). Keep
   prompts and research under `src/pages/posts/_prompts/` (the underscore excludes the
   whole tree from routing). Do not rename it back.

8. **Broken internal links do not fail the Astro build** (only broken imports /
   getStaticPaths do), so forward-links to not-yet-written cluster pages are safe during a
   batch. Still verify every link resolves before finishing.

9. **Cannibalization is real.** Two posts targeting the same intent split rankings. Drop
   near-duplicate sub-topics and cross-link the existing post instead.

10. **Auth + deploy:** pushes need the `swotbee` account; pushing to `main` auto-deploys
    via GitHub Pages. Verify Astro builds (clean `npm ci --legacy-peer-deps` + `astro build`)
    before pushing dependency or workflow changes.

11. **Give every article one genuinely tactical, copy-paste takeaway, not just conceptual
    guidance.** A first draft that is well-scoped and honest can still read as generic
    consultant advice ("build a workflow," "define your metrics") without giving the
    reader something to implement in the next hour. Concrete examples that worked: an
    exact property schema with field types and point-weighted scoring formula (not "build
    a health score"), a real starting query/cohort-definition template for a named tool
    (flagged as a structural example to adapt, not a guaranteed drop-in, when the exact
    syntax can't be live-verified), and a short decision scorecard that maps a score
    straight to a recommendation. Add this as a pass after the first draft is scored and
    passing, then re-score against the same query to confirm nothing regressed, additions
    that add real term coverage do not cost score.

12. **Generate 7 title candidates per article, informed by real SERP data, and pick one
    with a stated reason.** Run the keyword through NeuronWriter first and read the actual
    competitor titles, this often reveals the real gap (e.g. a whole SERP of vendor docs
    and unanswered community threads, meaning "the complete guide nobody's written yet" is
    a true claim, not a cliché). A title that names the specific mechanism or entities
    covered (which tools, what the reader walks away with) has outperformed vague
    curiosity hooks for this ICP. Keep cluster-post titles in the same family/pattern as
    each other and as the pillar, a reader scanning several in a row should recognize the
    series.

13. **A crude markdown-to-HTML conversion silently understates NeuronWriter scores.**
    Joining paragraphs with `<br>` instead of real markdown rendering produces no `<h2>`/
    `<table>` tags, so heading-weighted term matching finds nothing to match. One page
    scored 35 with the crude method and 65 with `python-markdown` + the `tables` extension
    against identical content. Any score reported using the wrong method should be treated
    as unreliable, not as a real regression, before acting on it.

14. **A broad-looking keyword export can still be off-ICP even at real volume.** A ~2,000-row
    "energy" vertical export scored high on volume but was generic CLM/contract-management
    software demand (legal/procurement buyers), zero mentions of "hubspot" or the actual
    product category. Grep a new keyword list for the brand/product terms you'd expect
    before trusting its relevance, the same discipline as the single-keyword contamination
    check in Learning 1, just applied to a whole list at once.

---

## 4. How to improve next time

1. **Pre-check keyword intent before writing.** Run a cheap `new-query` on each candidate
   keyword first and read `topic_matrix`/`terms`. If the SERP intent is buyer-side or
   off-brand, pick a different keyword up front instead of writing then discovering the
   mismatch.

2. **Write to the word-count target from the start.** Pull `word_count.target` before
   drafting and outline to roughly that length, so you are not padding later (padding hurts
   readability and still scores poorly).

3. **Prefer specific long-tail keywords for clusters.** They have shorter, less-competitive
   targets and clearer intent, which lifts both rankings odds and NeuronWriter scores. Use
   broad head terms only for the pillar.

4. **Get real keyword data before locking the cluster map.** Use NeuronWriter competitor
   data (or a keyword tool) for difficulty/volume to prioritize genuine quick wins, rather
   than guessing priority.

5. **Inject proprietary IP for E-E-A-T.** The pipeline cannot manufacture credibility.
   Anonymized client results, original frameworks, and contrarian takes are what make
   content linkable and trustworthy; collect these from the team per cluster.

6. **Automate the per-article loop.** A small script (write -> evaluate -> show missing
   terms -> import) would cut the manual back-and-forth.

7. **Maintain a reusable, unique diagram library + a dedupe check** so images never
   collide and new posts can reuse the visual style without reusing files.

8. **Unique hero images.** Heroes still reuse a small set of stock photos across posts.
   Source or generate a unique hero per post for a cleaner blog index.

9. **Repo hygiene for large research.** The `_prompts/research-resources/` dumps are large
   (multi-MB) and now in git history. Consider a separate research repo or Git LFS to keep
   the site repo lean.

10. **Track published scores.** Keep a simple log (slug, keyword, final score, target
    word count) so you can see which keyword types pay off and refine keyword selection.

---

## 5. Quick checklist (per cluster)

- [ ] Brief read; gap analysis done; cluster plan doc written and approved
- [ ] Keyword intent pre-checked (on-brand, not contaminated); a list-level keyword export
      is grepped for expected brand/product terms before being trusted
- [ ] 7 title candidates generated per article, informed by real SERP/competitor titles;
      one picked with a stated reason
- [ ] All `new-query` fired; analyses polled to ready
- [ ] Each article written to target length, covering terms + topic_matrix questions
- [ ] At least one genuinely tactical, copy-paste takeaway per article (not just
      conceptual guidance); unverifiable syntax flagged as a template to adapt
- [ ] `evaluate-content` >= target / competitor; missing terms woven in (using the correct
      markdown+tables HTML conversion, not a crude `<br>` join)
- [ ] `import-content` done
- [ ] One unique inline image per post; no duplicates; links resolve and carry the
      trailing slash (`trailingSlash: "always"`)
- [ ] Pillar back-links + cross-pillar links added
- [ ] `npm run build` passes
- [ ] Dates spread (if batch); committed; pushed via swotbee; account restored
