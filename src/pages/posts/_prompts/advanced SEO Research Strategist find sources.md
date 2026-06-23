<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# You are an advanced SEO Research Strategist and Content Intelligence Agent.

Your task is to design a research framework for building a high-authority pillar article using verified, high-quality sources from across:

- Web (blogs, research papers, official sites)
- Social media (LinkedIn, Twitter/X, YouTube)
- Discussion platforms (Reddit, Quora, niche forums, Slack/Discord communities)

Your output must not just list sources, but create a repeatable system to:

1. Discover high-quality information
2. Validate credibility
3. Extract insights for content
4. Prioritize the best sources for SEO and AI visibility

---

# 🔷 OBJECTIVE

Build a **Source Discovery + Evaluation Framework** that helps:

- Identify 20 high-value sources for a given topic
- Extract insights for pillar content creation
- Evaluate credibility using SEO + E-E-A-T principles
- Leverage community-driven insights from forums/social
- Ensure content is authoritative, link-worthy, and AI-citable

---

# 🔷 STEP 1: SOURCE DISCOVERY FRAMEWORK

OUTPUT.source_discovery = {
  channels: {
    web_sources: [],
    social_media: {
      linkedin: [],
      twitter_x: [],
      youtube: []
    },
    discussion_platforms: {
      reddit: [],
      quora: [],
      niche_forums: []
    }
  },

discovery_methods: [
    "search operators (site:, intitle:, inurl:)",
    "competitor backlink analysis",
    "SERP analysis (top-ranking pages)",
    "social listening (trending posts + comments)",
    "forum mining (questions + discussions)",
    "content gap identification"
  ]
}

---

# 🔷 STEP 2: PLATFORM-SPECIFIC RESEARCH METHODS

For EACH platform (LinkedIn, Twitter, Reddit, Quora, Forums):

OUTPUT.platform_research_methods = [
  {
    platform: "",

methods: [
      "how to find high-quality posts",
      "how to identify trending discussions",
      "how to extract user pain points",
      "how to find unanswered questions"
    ],

signals_to_look_for: [
      "engagement (comments, upvotes)",
      "depth of discussion",
      "expert participation",
      "recurring patterns"
    ],

expected_output: "type of insights (questions, frameworks, trends)"
  }
]

✅ IMPORTANT:

- Provide at least **10 actionable methods per platform**
- Focus on HOW to extract SEO-relevant insights

---

# 🔷 STEP 3: SOURCE EVALUATION FRAMEWORK

You must define how to validate whether a source is trustworthy and useful.

OUTPUT.source_evaluation = {
  frameworks: [
    "E-E-A-T (Experience, Expertise, Authority, Trust)",
    "CRAAP test (currency, relevance, authority, accuracy, purpose)",
    "SIFT method (investigate, verify, cross-check)"
  ],

evaluation_dimensions: [
    "credibility of author",
    "depth of content",
    "evidence and references",
    "topical relevance",
    "bias and intent",
    "freshness (recency)",
    "alignment with user intent"
  ]
}

---

# 🔷 STEP 4: SEO-DRIVEN VALIDATION METRICS

Define measurable signals that indicate a “high-quality SEO source”.

OUTPUT.seo_metrics_framework = [
  {
    metric: "",
    description: "",
    how_to_validate: ""
  }
]

✅ Include metrics such as:

- Domain authority / trust
- Backlink profile quality
- Organic traffic signals
- Engagement metrics
- Content depth and coverage
- Semantic completeness

---

# 🔷 STEP 5: SOCIAL + COMMUNITY INSIGHT EXTRACTION

Explain how to convert raw discussions into content insights.

OUTPUT.insight_extraction = {
  methods: [
    "identify repeated questions",
    "group discussions into themes",
    "identify emotional triggers",
    "extract frameworks and workflows",
    "spot content gaps",
    "detect emerging trends"
  ],

examples_required: true
}

✅ Forums and communities are critical because:

- They reveal real user pain points [1](https://www.taylorscherseo.com/blog/reddit-keyword-research)
- They influence rankings and AI citations [2](https://www.semrush.com/blog/social-media-seo/)

---

# 🔷 STEP 6: SOURCE SCORING SYSTEM (CRITICAL)

Create a scoring model to evaluate sources.

OUTPUT.source_scoring_model = {
  scoring_criteria: [
    "authority score",
    "relevance score",
    "depth score",
    "engagement signal",
    "originality score",
    "trustworthiness"
  ],

scoring_scale: "1-5 or 1-10",

final_decision_rules: [
    "minimum threshold to include source",
    "priority weighting rules"
  ]
}

---

# 🔷 STEP 7: GENERATE 30 VALIDATION IDEAS / FORMULAS

OUTPUT.validation_framework = [
  {
    idea_or_formula: "",
    description: "",
    why_it_matters: "",
    how_to_apply: ""
  }
]

✅ These should include:

- Heuristics
- Checklists
- Scoring formulas
- Pattern-recognition rules

---

# 🔷 STEP 8: FINAL OUTPUT

Provide:

1. Source discovery system
2. Platform-specific research playbook (10 tactics each)
3. Source validation framework (E-E-A-T + CRAAP + SIFT)
4. SEO metrics framework for validating sources
5. Community insight extraction model
6. Source scoring system
7. 30 high-quality validation formulas and heuristics

---

# 🔷 QUALITY RULES

Ensure the output:

✅ Is structured and reusable as a framework 
✅ Includes both qualitative AND quantitative evaluation 
✅ Focuses on real-world execution (not theory) 
✅ Helps build authority, backlinks, and rankings 
✅ Aligns with how Google evaluates content credibility [3](https://www.zelitho.com/blog/e-e-a-t-seo-strategy-how-to-build-trust-and-authority-in-the-age-of-ai/)

---

# 🔷 SUCCESS CRITERIA

The framework must help:

✅ Identify authoritative sources 
✅ Filter out low-quality content 
✅ Extract insights for pillar + cluster content 
✅ Improve SEO and AI search visibility 
✅ Create truly valuable, human-first content

A robust way to build a high‑authority pillar article is to treat research as a pipeline: discover many potential sources, score them quantitatively and qualitatively, then extract structured insights for pillar + cluster content. Forums and social platforms now significantly shape both rankings and AI citations, so they must be first‑class inputs.[^1][^2][^3][^4][^5]

***

## 1. Source discovery system

### 1.1 Core discovery workflow

Use this repeatable 5‑stage workflow for any topic:

1. Define topic \& intent
    - Clarify primary intent (informational vs transactional) and target audience.
2. Broad discovery
    - Use search operators, SERP scans, and social/forum searches to assemble 50–100 candidate URLs/threads.
3. Authority pre‑filter
    - Remove obviously weak domains (thin content, heavy ads, spun text).
4. Deep evaluation
    - Apply E‑E‑A‑T/CRAAP/SIFT and your scoring model (see sections 3 and 6).
5. Shortlist
    - Retain ~20 top sources, tagged by type (research, how‑to, case study, community thread, etc.) for pillar + clusters.

You can model this as:

```js
OUTPUT.source_discovery = {
  channels: {
    web_sources: [],
    social_media: {
      linkedin: [],
      twitter_x: [],
      youtube: []
    },
    discussion_platforms: {
      reddit: [],
      quora: [],
      niche_forums: []
    }
  },
  discovery_methods: [
    "search operators (site:, intitle:, inurl:)",
    "competitor backlink analysis",
    "SERP analysis (top-ranking pages)",
    "social listening (trending posts + comments)",
    "forum mining (questions + discussions)",
    "content gap identification"
  ]
}
```


### 1.2 Channels and what to look for

| Channel | Examples / notes | Primary use in pillar research |
| :-- | :-- | :-- |
| Web sources | Official sites, docs, government, standards, research papers, mature blogs | Hard facts, frameworks, statistics, definitions, case studies |
| LinkedIn | Thought‑leadership posts, carousels, long comments, creator newsletters | Frameworks, expert opinions, B2B pain points |
| Twitter / X | Threads, quote tweets, lists, curated link threads | Emerging trends, contrarian takes, sources to investigate |
| YouTube | Webinars, conference talks, in‑depth tutorials, interviews | Step‑by‑step workflows, visual explanations, practitioner insights |
| Reddit | Niche subreddits, megathreads, “help me” posts | Raw pain points, gaps where search results failed, long‑tail queries |
| Quora | Long answers by identifiable experts | Detailed explanations, FAQs, mid‑funnel questions |
| Niche forums | Product communities, industry forums, Slack/Discord archives | Highly specific problems, power‑user workflows, terminology, insider language |

Forums and Q\&A communities are increasingly surfaced directly in SERPs and AI overviews, making them powerful both for understanding intent and for earning citations.[^6][^7][^8][^5][^1]

### 1.3 Discovery methods in practice

1. **Search operators**
    - `site:.gov "your topic"`, `intitle:"ultimate guide" your keyword`, `inurl:forum your keyword`.
    - Use `"[keyword] reddit"` and `"[keyword] quora"` queries to surface community threads. Forums increasingly inform how AI systems interpret user intent and language.[^8][^5][^1]
2. **Competitor backlink analysis**
    - Use SEO tools to find which pages link to top competitors’ pillar pages: sort by authority and topical relevance, then click through to inspect those sources.
    - This surfaces industry reports, associations, and niche publications that already “vote” for competitors via links, which helps you target equivalent or better sources.
3. **SERP analysis**
    - For head terms and key subtopics, map top 10–20 results: content type (guide, video, forum, checklist), depth, and entities cited.
    - Google quality guidance emphasizes content with strong E‑E‑A‑T—clear authorship, references, and depth—so prioritize these pages in your discovery list.[^9][^10][^11][^12]
4. **People Also Ask + Related Searches**
    - Export PAA questions and related searches; map them to your topic cluster.
    - For each high‑value PAA, discover at least 2–3 authoritative answers (web + community).
5. **Social listening**
    - Search LinkedIn, X, and YouTube for your core keywords plus “mistakes”, “case study”, “framework”, “template”.
    - Social content boosts brand awareness, traffic, backlinks, and brand mentions, which indirectly help SEO and AI visibility.[^13][^3][^4][^5]
6. **Forum mining**
    - On Reddit, filter by “Top” and “This year/Month” in relevant subreddits, then “New” to detect emerging needs.
    - Threads where people say they “couldn’t find a good guide” or “Google results are useless” reveal content gaps AI and search haven’t solved yet.[^7][^1][^8]
7. **Content gap identification**
    - Compare what SERPs heavily cover vs what forums complain about: these gaps become prime sections in your pillar article and cluster pieces.[^1][^7][^8]
8. **Brand/authority source hunt**
    - Use AI overviews/answer engines (Perplexity, Google AI Overview, Bing Copilot) for your topic and list all sources cited repeatedly.
    - AI search is biased toward third‑party authoritative sources and brands with strong web mentions; track which ones dominate your topic.[^2][^3]
9. **Citation mining**
    - From highly cited articles, follow their references: official guidelines, white papers, standards.
    - These often become your highest‑authority anchors.
10. **Entity‑focused discovery**
    - Search for key entities (standards, organizations, tools) identified in earlier steps.
    - Google’s E‑E‑A‑T and entity guidance encourages clear entity relationships; including primary entities and their own docs boosts perceived authority.[^10][^12]

***

## 2. Platform‑specific research playbook (10 tactics each)

Below is a structured playbook for each key platform. For each: methods (how to find \& mine content), signals, and expected outputs.

### 2.1 LinkedIn

**Methods (10+)**

1. Use keyword search with filters
    - Search your core topic and filter by “Posts” and “Past 30 days” to see fresh discussions.
2. Sort by relevance \& connections
    - Prioritize posts with high engagement from 2nd/3rd‑degree connections in your industry to find what’s resonating with your target market.
3. Mine carousels and document posts
    - These often contain frameworks, checklists, and step‑by‑step processes ideal for pillar sections.
4. Analyze long comment threads
    - Open posts with many comments; collect common objections, questions, and “this is what worked for us” replies to turn into FAQs and case‑study angles.
5. Identify recurring expert voices
    - Note profiles repeatedly posting in your topic: check their job titles, speaking gigs, and publications for E‑E‑A‑T signals.[^11][^12][^9][^10]
6. Follow relevant hashtags
    - Track hashtags for your topic and capture posts that consistently drive saves/shares—these usually reflect high‑value pain points or frameworks.
7. Use “Creator mode” topics and newsletters
    - For niche topics, subscribe to creator newsletters; they package trends and frameworks useful for thought‑leadership sections.
8. Scan event pages and webinars
    - Event descriptions and guest bios surface the vocabulary and subtopics your audience cares about; talk titles can become H2/H3s.
9. Monitor polls
    - Poll options reveal how people frame problems; poll results show which pain points are most common, useful for prioritizing sections.
10. Analyze “Featured” sections of experts
    - These often link to their pillar pieces, conference talks, or research—ideal external sources to consider.
11. Check company pages \& case studies
    - Many brands share original studies, reports, and frameworks on their pages; these are strong sources if methodologically sound.

**Signals to look for**

- High engagement normalized by audience size (comments and saves more than likes).
- Detailed, experience‑rich captions and comments vs vague platitudes.[^12][^9][^11]
- Participation by recognized experts (C‑level, authors, speakers).
- Themes that recur across multiple posts/accounts over weeks.

**Expected output**

- Actionable frameworks, step‑by‑step processes, B2B pain points, objections, and narrative case studies to weave into “how‑to” and “real‑world example” sections.

***

### 2.2 Twitter / X

**Methods (10+)**

1. Advanced search by keyword + time
    - Use `keyword (thread OR 🧵) min_faves:50` over past 6–12 months to find high‑signal threads.
2. Search by list curation
    - Find or create lists of experts in your niche; scan their timelines for frameworks, debates, and link round‑ups.
3. Hashtag and space tracking
    - Track topic hashtags and summaries of Spaces; Spaces often reveal cutting‑edge tactics and sentiment.
4. Quote‑tweet mining
    - Quote tweets on viral posts show objections, refinements, and edge cases—perfect for adding nuance to a pillar piece.
5. Bookmark and “likes” analysis (your own)
    - Use your bookmarks as a personal research corpus; cluster them into themes (pain points, frameworks, contrarian views).
6. Viral threads teardown
    - For successful threads, reverse‑engineer structure: what questions they answer, which hooks and examples resonate.
7. Link thread curation
    - Many accounts post “10 best resources on [topic]”; follow and vet each link as a candidate high‑authority source.
8. Monitor expert disputes
    - When experts disagree, note the dimensions of disagreement; use your pillar piece to mediate with evidence.
9. DM conversations and replies
    - Common questions in replies/DMs show what’s unclear even after consuming popular content.
10. Track new terminology and memes
    - New jargon and memes often signal emerging subtopics; incorporate them (carefully) to stay current.
11. Monitor brand mentions
    - Track how often brands and specific resources are referenced in context of your topic; high unlinked mentions correlate with AI citation visibility.[^3][^2]

**Signals to look for**

- Threads with high engagement from practitioners, not just marketers.
- Repeated referencing of the same resources/tools by different accounts.
- Nuanced replies (“we tried this, here’s what happened”) over generic praise.

**Expected output**

- Emerging trends, contrarian perspectives, resource lists, practitioner anecdotes, and language patterns for hooks, subheadings, and FAQ sections.

***

### 2.3 YouTube

**Methods (10+)**

1. Keyword search + filter by duration
    - Use 10–60 minute videos (talks, deep dives) for frameworks and serious tutorials; shorter for FAQs.
2. Sort by relevance and view count
    - Prioritize videos with high views and recent upload dates for current practices.[^11]
3. Analyze chapters and timestamps
    - Chapters are ready‑made H2/H3 structures and subtopic outlines.
4. Comment mining
    - Sort comments by “Top”; collect repeated questions, confusion points, and “this finally clarified X” feedback for FAQ and “explaining fundamentals” sections.
5. Creator authority check
    - Evaluate channel age, upload consistency, bio, collaborations, and links to external credentials for E‑E‑A‑T.[^9][^10][^12]
6. Transcript scanning
    - Skim transcripts for repeated phrases like “the big mistake”, “the framework we use”, “the process looks like this”; capture those parts.
7. Webinar and conference talks
    - Many conferences publish full talks; these provide cutting‑edge strategies and case studies.
8. Comparison and teardown videos
    - “Tool A vs Tool B” and teardown videos reveal decision criteria and evaluation frameworks for your audience.
9. “Updated for [year]” videos
    - Use them to detect what changed vs last year; crucial for content freshness and avoiding outdated advice.[^3][^11]
10. Playlist analysis
    - Curated playlists by credible channels show how they structure learning paths—great inspiration for your pillar structure.
11. Cross‑platform footprint
    - Check if the creator runs a blog, newsletter, or GitHub; cross‑channel presence strengthens authority and gives more sources.

**Signals to look for**

- High view‑to‑subscriber ratio and like‑to‑view ratio.
- Long, thoughtful comments vs generic praise.
- Clear explanation of methodology, data, and limitations.

**Expected output**

- Step‑by‑step workflows, visualizable processes, updated best practices, and case‑study examples you can cite and summarize in your article.

***

### 2.4 Reddit

Forums like Reddit are recognized as rich sources of real user pain points, niche language, and evolving questions; Google and AI systems increasingly surface Reddit threads directly in search and AI answers.[^14][^5][^6][^7][^8][^1]

**Methods (10+)**

1. Subreddit discovery
    - Search `subreddit:yourtopic` or `your topic reddit` on Google to find relevant communities.
2. Filter by Top (Year/Month)
    - Surface enduring pain points and most useful megathreads, not just recent noise.
3. Scan “New” for emerging issues
    - Use “New” + sort by comments to spot fresh problems with growing engagement.
4. Search within subreddits
    - Use Reddit’s search for “why does”, “help”, “struggling”, “[tool] vs”, “anyone else” to uncover specific frustrations and comparisons.
5. Megathread mining
    - Many subs have “Ask anything”, “Newbie questions”, or monthly Q\&A megathreads; these are gold for FAQs.
6. Comment pattern analysis
    - Identify comments that get many upvotes; they reveal popular solutions and personal workflows.
7. “What worked / didn’t work” posts
    - Posts explicitly reflecting on results (case studies) offer real‑world data points.
8. Track posts where users complain about poor search results
    - These highlight content gaps—users turn to Reddit when Google/AI answers are unsatisfying.[^7][^8][^1]
9. Identify power users and mods
    - Mods and high‑karma contributors often share high‑signal guides or resource lists.
10. Outbound links collection
    - Collect external links repeatedly recommended in threads: these tend to be trusted resources in the community.
11. Sentiment scanning
    - Note emotional terms (frustrated, overwhelmed, scam, game‑changer) to shape emotional angles in your copy.[^14][^6]

**Signals to look for**

- High upvotes and comment counts relative to subreddit size.
- Multiple users independently recommending the same resource or approach.
- Detailed narratives (“here’s what I tried over 6 months…”) vs one‑liners.

**Expected output**

- Long‑tail keyword ideas, recurring problems, real‑world constraints, colloquial language for headings, and clear content gaps for pillar and cluster topics.

***

### 2.5 Quora

**Methods (10+)**

1. Topic pages
    - Explore topic pages tied to your keyword (and related concepts) to see clustered questions.
2. Sort by “Most viewed writers”
    - Identify experts repeatedly answering in your topic; check their bios and external links.
3. Question view counts
    - Focus on questions with high view counts but relatively few high‑quality answers—gaps you can fill.
4. Answer quality assessment
    - Look for answers citing studies, data, or external references, not just opinions.
5. Identify patterns in follow‑up questions
    - Read comments and “related questions” to see where answers left readers confused.
6. Observe how non‑experts phrase problems
    - Use this language for headings and FAQs; it often differs from expert jargon.
7. Track question age vs activity
    - Old questions with recent activity show ongoing pain points; prioritize these.
8. Collect answer structures
    - Many good answers follow a mini‑framework; adapt these structures into pillar sections.
9. Scan answerer portfolios
    - High‑credibility answerers often link to their own guides, research, or tools—candidate sources.
10. Use Quora Spaces
    - Curated spaces can reveal recurring themes and popular external resources.
11. Export Q\&A themes

- Group questions into awareness, consideration, decision stages for your cluster strategy.

**Signals to look for**

- Answers with upvotes, shares, and detailed comments.
- Answerers with credible bios (roles, publications, affiliations).
- Questions that recur with slightly different wording across topics.

**Expected output**

- Structured FAQ lists, mid‑funnel content ideas (“how to choose…”, “is X worth it?”), and expert sources to vet and possibly cite.

***

### 2.6 Niche forums, Slack \& Discord communities

**Methods (10+)**

1. Google `"[keyword] forum"` + `"[keyword] community"`
    - Discover old‑school forums, Discourse instances, and membership sites.
2. Public archives of Slack/Discord
    - Some communities publish public archives or “best of” threads; use these for research while respecting privacy.
3. “Getting started” / onboarding channels
    - These show what beginners struggle with in the first days or weeks.
4. “Ask for help” and troubleshooting boards
    - Map out recurring error patterns, misconfigurations, or misunderstandings.
5. Success stories and showcase channels
    - Collect real examples that demonstrate outcomes and best practices.
6. Sticky posts and FAQs
    - These often encapsulate the community’s consensus and evergreen guidance.
7. Resource / link channels
    - Curated resources posted by mods and power users are strong candidate sources.
8. Search logs and pinned messages
    - Show what the community considers important enough to highlight long‑term.
9. AMAs and expert Q\&A threads
    - Single threads can contain dozens of micro‑insights and nuanced answers.
10. Feature request and roadmap discussions

- Reveal unmet needs and gaps in tools/processes that your content can address.

11. Cross‑community comparison

- Compare how different forums talk about the same issue; disagreement indicates unclear topics requiring strong, well‑researched content.

**Signals to look for**

- Posts with many replies from senior members or staff.
- Threads referenced or linked repeatedly across the community.
- Clear, detailed walkthroughs that others thank or bookmark.

**Expected output**

- Highly specific pain points, advanced workflows, internal vocab, and real‑world constraints to build “pro‑level” sections and cluster articles.

***

## 3. Source evaluation framework (E‑E‑A‑T + CRAAP + SIFT)

Google’s quality rater guidelines emphasize Experience, Expertise, Authoritativeness, and Trustworthiness (E‑E‑A‑T), with trust as the most important factor. The CRAAP test and SIFT method provide additional lenses for systematic evaluation.[^10][^12][^9][^11]

```js
OUTPUT.source_evaluation = {
  frameworks: [
    "E-E-A-T (Experience, Expertise, Authority, Trust)",
    "CRAAP test (currency, relevance, authority, accuracy, purpose)",
    "SIFT method (investigate, verify, cross-check)"
  ],
  evaluation_dimensions: [
    "credibility of author",
    "depth of content",
    "evidence and references",
    "topical relevance",
    "bias and intent",
    "freshness (recency)",
    "alignment with user intent"
  ]
}
```


### 3.1 Frameworks in practice

| Framework | What to check |
| :-- | :-- |
| E‑E‑A‑T | Real‑world experience, proven expertise, external authority (mentions, links), and trust signals (policies, transparency).[^9][^10][^11][^12] |
| CRAAP | Currency (updated?), Relevance (matches your topic and audience?), Authority (who published it?), Accuracy (evidence, sources?), Purpose (educational vs salesy).[^10][^11] |
| SIFT | Stop (slow down on viral/controversial claims), Investigate source, Find better coverage, Trace claims back to original research or docs. |

### 3.2 Evaluation dimensions and checks

- **Credibility of author**
    - Check author bio, credentials, track record, and cross‑platform footprint (talks, papers, community presence).[^12][^9][^10]
- **Depth of content**
    - Look for comprehensive coverage, examples, edge cases, visuals, and clear explanations vs thin, surface‑level posts.[^15][^11]
- **Evidence and references**
    - Prefer content that cites studies, data, or official docs and links out to them, aligning with Google’s advice to clearly cite sources.[^10][^11][^12]
- **Topical relevance**
    - Ensure the primary focus matches your exact topic and search intent, not just a passing mention.
- **Bias and intent**
    - Distinguish educational pieces from aggressive sales pages; check for disclosure of sponsorships and conflicts of interest.[^11]
- **Freshness (recency)**
    - For fast‑moving topics (AI, SEO, tools), favor recent sources and those regularly updated.[^3][^11]
- **Alignment with user intent**
    - Ask: would this satisfy the query you plan to target? If not, it may still be useful background but not a primary pillar source.

***

## 4. SEO‑driven validation metrics

AI‑driven and traditional search now respond to overlapping signals: authority (citations, mentions), originality, and trust. Social and forum content indirectly support SEO via traffic, backlinks, and brand mentions, and directly support AI citations.[^4][^5][^13][^2][^1][^3]

```js
OUTPUT.seo_metrics_framework = [
  { metric: "", description: "", how_to_validate: "" }
]
```


### 4.1 Key metrics and how to validate

| Metric | Description | How to validate |
| :-- | :-- | :-- |
| Domain authority / trust | Overall strength and trustworthiness of domain. | Use third‑party authority metrics; check HTTPS, policies, About/Contact pages, and external mentions.[^10][^11] |
| Page‑level backlink quality | Number and quality of referring domains to the specific URL. | Use backlink tools; evaluate referring domains’ relevance and authority, and anchor text distribution.[^11] |
| Organic traffic signals | Whether the page receives steady organic traffic and ranks for relevant queries. | Check estimated traffic, ranking keywords, and whether it ranks for your target or adjacent terms.[^3][^11] |
| Engagement metrics | Time on page, scroll depth, comments, shares, and social signals around the content. | Use analytics and social tools; look for meaningful engagement rather than vanity metrics.[^13][^4] |
| Content depth and coverage | How comprehensively the page covers the topic, including FAQs and edge cases. | Compare to your topic map and PAA; score for coverage of main and long‑tail subtopics.[^15][^11] |
| Semantic completeness | Coverage of key entities, related concepts, and questions around the topic. | Use NLP/SEO tools to identify missing entities and semantic clusters.[^12] |
| Brand mentions and citations | How often brand or resource is mentioned and cited by others (linked or unlinked). | Check brand mentions across the web and AI answer engines; strong correlation with AI visibility.[^2][^3][^5] |
| Social proof \& community validation | Evidence that practitioners trust and recommend the source. | Look for repeated recommendations in Reddit, forums, LinkedIn, and Twitter threads.[^1][^7][^8] |
| Content freshness \& update cadence | How recently the piece was published or updated, and how often. | Inspect dates, changelogs, and “updated for [year]” indicators.[^3][^11] |
| Originality / information gain | Degree of unique insights, data, or frameworks beyond competitors. | Compare against top SERP and AI answers; identify unique sections, frameworks, or original research.[^3][^12] |


***

## 5. Community insight extraction model

Forums and communities reveal real user pain points and language, shaping both search rankings and AI understanding of queries. Social content further drives traffic, backlinks, and brand mentions that influence both SEO and AI citations.[^5][^13][^2][^6][^4][^8][^14][^1][^7][^3]

```js
OUTPUT.insight_extraction = {
  methods: [
    "identify repeated questions",
    "group discussions into themes",
    "identify emotional triggers",
    "extract frameworks and workflows",
    "spot content gaps",
    "detect emerging trends"
  ],
  examples_required: true
}
```


### 5.1 Methods to turn raw discussions into insights

- **Identify repeated questions**
    - Export or manually list recurring questions from Reddit, Quora, forums, and YouTube comments; treat each recurring question as a potential H2, FAQ, or cluster article topic.[^6][^8][^1][^7]
- **Group discussions into themes**
    - Cluster threads into themes like “setup problems”, “strategy confusion”, “tool comparisons”, “pricing/ROI concerns” and map these to sections and cluster content.
- **Identify emotional triggers**
    - Highlight words that indicate frustration, fear, excitement, or relief; use this to shape hooks, intros, and benefit‑driven copy.[^14][^6]
- **Extract frameworks and workflows**
    - Look for comments that describe “here’s exactly what I did…”; convert these into step‑by‑step workflows in your pillar, citing the community where appropriate.
- **Spot content gaps**
    - When users complain that “Google results are shallow” or “no one explains X properly,” note the missing angles and ensure your content fills them.[^8][^1][^7]
- **Detect emerging trends**
    - Track new acronyms, tools, and practices appearing frequently in “New” or “Hot” threads and social posts; these may justify new sections or cluster pages.
- **Map “why behind the query”**
    - Forums highlight motivations and context behind search keywords; align your content to those deeper needs rather than just keyword matching.[^1][^6][^14]
- **Extract decision criteria**
    - From comparison threads, list all criteria users mention (price, learning curve, integrations, support) and structure your comparison content around them.
- **Find misconceptions to correct**
    - Note myths or misunderstandings that keep showing up; plan “myths vs facts” sections that build trust and authority.
- **Prioritize by impact**
    - Weight themes by frequency and emotional intensity; prioritize those with many users and strong emotions for pillar coverage.


### 5.2 Examples

- If multiple Reddit threads show users saying they “can’t find a trustworthy beginner’s guide” for a topic and keep asking the same basic setup questions, your pillar should include a “Beginner’s quick‑start” section and a separate “deep dive” cluster article for advanced users.[^7][^8][^1]
- If YouTube comments repeatedly ask for clarification on step 3 of a popular tutorial, create a detailed subsection or video embed focusing solely on that step, and reference common pitfalls drawn from comments.[^6]

***

## 6. Source scoring system

```js
OUTPUT.source_scoring_model = {
  scoring_criteria: [
    "authority score",
    "relevance score",
    "depth score",
    "engagement signal",
    "originality score",
    "trustworthiness"
  ],
  scoring_scale: "1-5 or 1-10",
  final_decision_rules: [
    "minimum threshold to include source",
    "priority weighting rules"
  ]
}
```


### 6.1 Scoring criteria (1–5 scale)

For each candidate source, score 1–5 on:

- **Authority score**
    - Based on domain/page authority, backlink quality, brand mentions, and third‑party recognition.[^2][^5][^3][^11]
- **Relevance score**
    - How directly the content matches your topic and target intent (query‑level relevance).
- **Depth score**
    - Coverage of key subtopics, FAQs, and edge cases; presence of examples and visuals.[^15][^11]
- **Engagement signal**
    - For web: comments, shares, time on page (if you have access). For community/social: upvotes, replies, saves, and shares.[^13][^4][^1]
- **Originality score**
    - Degree of information gain vs the rest of the SERP and community content.[^12][^3]
- **Trustworthiness**
    - Transparency, citations, disclosure of conflicts, HTTPS, and overall alignment with E‑E‑A‑T trust signals.[^9][^10][^11]


### 6.2 Weighting and thresholds

You can define an overall score:

$$
\text{Overall} = 0.25A + 0.20R + 0.20D + 0.15E + 0.10O + 0.10T
$$

(where $A,R,D,E,O,T$ are the 1–5 scores for each criterion).

**Decision rules**

- **Inclusion threshold**
    - Only include sources with:
        - Overall score ≥ 3.5/5, and
        - Authority ≥ 3, Trustworthiness ≥ 3.
- **Pillar vs cluster priority**
    - Pillar references: prioritize sources with Authority ≥ 4 and Depth ≥ 4.
    - Cluster inspiration: sources with high Relevance or Engagement but lower Authority can be used as “voice of the user” rather than as authoritative citations.
- **Diversity rule**
    - Ensure at least:
        - 40–50% of citations from high‑authority web sources (official docs, established publications, major studies).[^9][^10][^11]
        - 20–30% from practitioner content (expert blogs, LinkedIn, YouTube).
        - 20–30% from community sources (Reddit, forums, Q\&A) as qualitative evidence and language references.[^5][^8][^1][^6][^7]

***

## 7. Validation framework: 30 ideas \& formulas

```js
OUTPUT.validation_framework = [
  { idea_or_formula: "", description: "", why_it_matters: "", how_to_apply: "" }
]
```

Below are 30 reusable heuristics and formulas. You can implement them in a spreadsheet or scoring sheet.

1. **Authority × Relevance Matrix**
    - Description: Plot each source on a 2×2 matrix (High/Low Authority vs High/Low Relevance).
    - Why it matters: Prevents over‑weighting high‑authority but tangential sources.
    - How to apply: Prioritize “High Authority + High Relevance” for citations; use “Low Authority + High Relevance” mainly for qualitative insight.
2. **Information Gain Score**
    - Description: Count how many unique subtopics, data points, or frameworks a source contributes beyond top 10 SERP.
    - Why it matters: Google and AI systems favor content offering new value, not repetition.[^3][^12]
    - How to apply: Score 1–5: 1 (no new ideas) to 5 (multiple unique frameworks/data sets).
3. **Citation Density Check**
    - Description: Measure ratio of well‑sourced claims to unsourced assertions.
    - Why it matters: Sources that cite their own evidence align with E‑E‑A‑T and Google’s advice to clearly cite references.[^10][^11]
    - How to apply: If <30% of key claims are cited, cap Trustworthiness at 2/5.
4. **Update Recency Rule**
    - Description: If a source in a fast‑moving field is older than 24 months, mark as “historical” only.
    - Why it matters: Outdated guidance can harm credibility and rankings.[^11][^3]
    - How to apply: Use older sources only for context, not for “current best practice” claims.
5. **Single‑Author Bias Flag**
    - Description: If more than 50% of your sources come from the same author or company, flag potential bias.
    - Why it matters: Over‑reliance on a single perspective harms neutrality and trust.
    - How to apply: Add more independent voices before finalizing the pillar.
6. **Community Confirmation Rule**
    - Description: For each major recommendation, find at least one community thread where practitioners confirm its effectiveness.
    - Why it matters: Bridges theory and practice, boosting real‑world relevance.[^1][^6][^7]
    - How to apply: Cite community sources as qualitative support (“practitioners report…”).
7. **Contradiction Resolution Checklist**
    - Description: Whenever two credible sources disagree, explicitly examine methods, date, and context.
    - Why it matters: Handling contradictions intelligently increases authority.
    - How to apply: Summarize both views and explain when each may apply.
8. **Entity Coverage Score**
    - Description: Rate how many key entities (tools, standards, organizations) a source accurately covers.
    - Why it matters: Strong entity coverage supports semantic completeness.[^12][^10]
    - How to apply: Use NLP/entity tools to assign 1–5 based on coverage.
9. **User Intent Match Index**
    - Description: Count how many target intents (informational, comparison, transactional, troubleshooting) the source satisfies.
    - Why it matters: Pillar content should map to multiple intents within a topic.
    - How to apply: Score sources with 3+ intents higher for pillar content.
10. **SERP Position × Depth Bonus**
    - Description: Combine SERP position and depth score; a lower‑ranking but much deeper guide may deserve more weight.
    - Why it matters: Rankings can lag quality or be influenced by link profiles.
    - How to apply: If Depth ≥ 4 but SERP position >10, still treat as high‑value source.
11. **Backlink Diversity Check**
    - Description: Assess diversity of industries and domains linking to a source.
    - Why it matters: Diverse backlinks signal broader recognition.[^11]
    - How to apply: Prefer sources linked from multiple independent, relevant domains.
12. **Brand Mention Velocity**
    - Description: Track how often a brand/resource is mentioned over time across web and social.
    - Why it matters: Higher web mention volume correlates strongly with AI visibility.[^2][^5][^3]
    - How to apply: Use mention‑tracking tools; prioritize rising brands with strong mention growth.
13. **Community Endorsement Score**
    - Description: Count how many times a resource is recommended across independent threads.
    - Why it matters: Repeated community recommendation indicates practical value.[^8][^7][^1]
    - How to apply: Score 1–5 based on unique recommendation instances.
14. **Engagement Quality Filter**
    - Description: Distinguish between shallow engagement (“thanks”) and detailed engagement (stories, follow‑up questions).
    - Why it matters: High‑quality engagement suggests deeper impact.
    - How to apply: Sources attracting thoughtful replies get higher Engagement scores.
15. **Data Transparency Test**
    - Description: Check whether studies or claims describe methodology and sample sizes.
    - Why it matters: Transparent methods signal reliability.
    - How to apply: If methodology is missing, cap Accuracy at 3/5.
16. **Conflict of Interest Disclosure Rule**
    - Description: Check whether affiliate or sponsored content is clearly labeled.
    - Why it matters: Undisclosed bias undermines trust and may conflict with quality guidelines.[^11]
    - How to apply: Penalize Trustworthiness when disclosure is missing or ambiguous.
17. **Cross‑Channel Consistency Check**
    - Description: Compare what a brand says on its site vs LinkedIn, YouTube, and AI answers.
    - Why it matters: Consistent messaging builds trust across channels.[^5][^3]
    - How to apply: Flag large inconsistencies and either clarify in your content or de‑prioritize that source.
18. **Format Suitability Score**
    - Description: Judge whether the source’s format (video, long‑form, forum thread) suits the claim you want to support.
    - Why it matters: Some claims (e.g., data points) are better backed by written sources; workflows by videos.
    - How to apply: Prefer text sources for statistics and legal/regulatory information.
19. **Pillar Support Potential**
    - Description: Evaluate whether a source can support multiple sections or just a single point.
    - Why it matters: Multi‑section sources are more valuable for pillar building.
    - How to apply: Score 1–5 based on how many sections the source can meaningfully inform.
20. **Edge Case Coverage Score**
    - Description: Check if the source addresses non‑typical scenarios and failure modes.
    - Why it matters: Handling edge cases improves perceived depth and expertise.[^15][^11]
    - How to apply: Score higher when edge cases are clearly explained.
21. **Community Language Alignment**
    - Description: Compare the terminology in a source with language used in forums and social.
    - Why it matters: Using user language improves relevance and AI understanding.[^6][^8][^5][^1]
    - How to apply: Prefer sources that match user phrasing over internal jargon.
22. **Myth‑busting Contribution**
    - Description: Check if a source actively corrects common misconceptions.
    - Why it matters: Myth‑busting positions your content as authoritative and user‑oriented.
    - How to apply: Tag such sources for use in “myths vs facts” sections.
23. **Practical vs Theoretical Balance**
    - Description: Rate balance between conceptual explanation and actionable steps.
    - Why it matters: Pillar content should both explain and enable.
    - How to apply: Favor sources that include both concepts and actionable guidance.
24. **Evidence Triangulation Rule**
    - Description: Require at least two independent sources for any critical statistic or high‑stakes recommendation.
    - Why it matters: Reduces risk of repeating errors.
    - How to apply: If only one source supports a critical claim, label it clearly as preliminary or opinion.
25. **AI Citation Presence Check**
    - Description: See if a source or domain is already cited in AI answers for your topic.
    - Why it matters: AI search heavily favors existing authoritative sources.[^2][^5][^3]
    - How to apply: If a domain is frequently cited, its guidance is especially influential; align but also add your own information gain.
26. **User Outcome Evidence**
    - Description: Look for proof of results (screenshots, revenue metrics, before/after comparisons) in case studies.
    - Why it matters: Outcome‑backed content is more persuasive and authoritative.
    - How to apply: Prioritize sources with clear, verifiable outcomes for examples.
27. **Guideline Compliance Check**
    - Description: For regulated or YMYL topics, verify alignment with official guidelines and standards.
    - Why it matters: Google is stricter on YMYL topics; misaligned content can be harmful.[^10][^11]
    - How to apply: Cross‑check claims with official documents before citing.
28. **Content Structure Quality Score**
    - Description: Rate clarity of headings, logical flow, and presence of summaries and key takeaways.
    - Why it matters: Well‑structured sources are easier to distill into your own pillar structure.[^15]
    - How to apply: Prefer sources that already mirror good information architecture.
29. **Social Amplification Potential**
    - Description: Estimate how shareable a source is (strong hook, contrarian insight, clear framework).
    - Why it matters: Sources likely to spread can help drive more mentions and backlinks.[^4][^13][^3]
    - How to apply: Use high‑potential ideas to shape your own “hook” sections.
30. **Content Lifecycle Fit**
    - Description: Decide whether the source is best used for evergreen pillar content or timely trend updates.
    - Why it matters: Evergreen pillars and trend pieces have different sourcing needs.[^3][^11]
    - How to apply: Mark sources accordingly so you don’t over‑rely on trend pieces for evergreen claims.

***

This framework gives you: a structured discovery system across web, social, and communities; platform‑specific playbooks to mine SEO‑relevant insights; rigorous evaluation and scoring based on E‑E‑A‑T, CRAAP, and SIFT; and 30 concrete validation heuristics you can implement as a repeatable research and source‑selection workflow for any pillar topic.

<div align="center">⁂</div>

[^1]: https://madmangomarketing.com/blog/beginners-guide-to-using-reddit-quora-other-forums-to-boost-seo

[^2]: https://rank-and-convert.ghost.io/brand-mentions-are-now-3x-more-important-than-backlinks-for-ai-search-visibility/

[^3]: https://searchengineland.com/how-ai-is-reshaping-seo-challenges-opportunities-and-brand-strategies-for-2025-456926

[^4]: https://airvumedia.com/growth/seo-social-media-cayman-islands/

[^5]: https://www.beechwebservices.co.uk/websites/social-media-seo-and-the-change-to-ai-search/

[^6]: https://www.flow20.com/blog/reddit-insights-discovering-user-pain-points-to-enhance-seo-copy-effectiveness/

[^7]: https://staydigitalmarketers.com/2025/11/09/reddit-keyword-research-seo-link-building-guide/

[^8]: https://www.ranktracker.com/blog/reddit-keyword-research/

[^9]: https://www.e2msolutions.com/blog/google-e-e-a-t/

[^10]: https://www.wix.com/seo/learn/resource/google-search-quality-guidelines

[^11]: https://www.boostability.com/resources/google-e-e-a-t-guide/

[^12]: https://backlinko.com/google-e-e-a-t

[^13]: https://www.theartofonlinemarketing.com/2025/02/will-social-media-matter-for-seo-in-the-age-of-ai-driven-search/

[^14]: https://www.youtube.com/watch?v=Jyh9scTTev8

[^15]: https://www.stellarcontent.com/blog/seo/the-complete-guide-to-google-e-a-t-what-is-it-why-is-it-and-how-do-you-create-it/

