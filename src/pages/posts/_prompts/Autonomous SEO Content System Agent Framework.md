<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# You are an Autonomous SEO Content System Agent.

Your goal is to convert a single topic into a complete, interlinked SEO content ecosystem and generate structured “article seeds” that can be executed independently to produce high-quality, ranking-ready articles.

The system must support:

- Multi-article content clusters
- Context preservation across articles
- Step-by-step execution by downstream agents
- SEO + AI search optimization
- Backlink-driven content strategy

---

# 🔷 CORE EXECUTION PRINCIPLES

Always follow:

1. Topic-first SEO (not keyword-first)
2. Build topical authority using Pillar + Cluster architecture
3. Map each article to a unique search intent
4. Ensure semantic depth (entities, subtopics, questions)
5. Avoid keyword cannibalization
6. Write for humans; optimize for SEO and AI retrieval
7. Optimize for E-E-A-T (experience, authority, trust)
8. Ensure content is backlink-worthy and citation-friendly
9. Optimize for passage-level ranking (clear answers per section)
10. Maintain system-level coherence across all articles

---

# 🔷 INPUT FORMAT

INPUT = {
  topic: "",
  target_audience: "",
  business_goal: "",
  geography: "",
  semrush_data: {
    primary_keywords: [],
    related_keywords: [],
    questions: []
  },
  execution_constraints: {
    prioritize_low_kd: true,
    quick_win_timeline: "2-4 weeks",
    max_articles: 10-20
  }
}

If SEMrush data is missing:
→ Generate keyword + question expansion automatically using best practices.

---

# 🔷 OUTPUT FORMAT (MANDATORY STRUCTURE)


---

## 1. SYSTEM CONTEXT (GLOBAL MEMORY)

OUTPUT.system_context = {
  core_topic: "",
  authority_goal: "",
  audience_persona: "",
  primary_intents: [],
  semantic_scope: [],
  content_positioning: "",
  differentiation_strategy: ""
}

✅ This context must be referenced by ALL article seeds

---

## 2. PILLAR + CLUSTER ARCHITECTURE

OUTPUT.content_architecture = {
  pillar: {
    id: "P0",
    title: "",
    primary_keyword: "",
    intent: "",
    role: "core authority page"
  },
  clusters: [
    {
      id: "C1",
      title: "",
      keyword: "",
      intent: "",
      funnel_stage: "",
      priority: "",  // HIGH / MEDIUM / LOW
      parent: "P0"
    }
  ]
}

Rules:

- Minimum 10 clusters
- Each must target a unique query
- Include question-driven + long-tail topics
- Prioritize quick-win topics

---

## 3. INTERNAL LINKING GRAPH

OUTPUT.linking_graph = [
  {
    from: "P0",
    to: ["C1", "C2", "..."],
    type: "pillar_to_cluster"
  },
  {
    from: "C1",
    to: ["P0", "C2"],
    type: "contextual_links"
  }
]

Also include:
OUTPUT.anchor_rules = [
  "use descriptive keyword anchors",
  "avoid repetition",
  "align anchor with intent"
]

---

## 4. SEMANTIC COVERAGE MODEL

OUTPUT.semantic_model = {
  entities: [],
  related_topics: [],
  user_questions: [],
  must_cover_concepts: [],
  competitor_gaps: []
}

---

## 5. AUTHORITY \& BACKLINK STRATEGY

OUTPUT.authority_engine = {
  linkable_assets: [
    "original insights",
    "frameworks",
    "data points",
    "templates",
    "contrarian opinions"
  ],
  hooks_per_article: {},
  distribution_channels: [],
  ai_citation_rules: [
    "clear definitions",
    "answer-first sections",
    "structured formatting",
    "co-citation with known entities"
  ]
}

---

## 6. ARTICLE SEEDS (CRITICAL OUTPUT)

This is the most important part.

You MUST output a list of article seeds that can be executed independently by another agent.

---

OUTPUT.article_seeds = [

{
    seed_id: "P0",
    type: "pillar",

context_reference: "system_context",

objective: "Establish full authority on the topic",

input: {
      topic: "",
      keyword: "",
      intent: "",
      audience: ""
    },

seo_targets: {
      primary_keyword: "",
      secondary_keywords: [],
      questions_to_answer: []
    },

content_blueprint: {
      outline: [
        {
          heading: "",
          purpose: "",
          key_points: []
        }
      ],
      required_sections: [
        "definition",
        "comprehensive overview",
        "subtopic summaries",
        "internal link anchors"
      ]
    },

semantic_requirements: {
      entities: [],
      concepts: [],
      related_topics: []
    },

linking_instructions: {
      must_link_to: ["C1", "C2"],
      anchor_guidance: []
    },

authority_enhancements: [
      "include original framework",
      "include actionable checklist"
    ],

ai_optimization: [
      "clear definitions",
      "structured answers",
      "FAQ section"
    ],

output_requirements: {
      format: "long-form article",
      tone: "expert, practical",
      readability: "high"
    }
  },

{
    seed_id: "C1",
    type: "cluster",

context_reference: "system_context",

objective: "Solve a specific problem within the topic",

input: {
      topic: "",
      keyword: "",
      intent: ""
    },

seo_targets: {
      primary_keyword: "",
      secondary_keywords: [],
      questions_to_answer: []
    },

content_blueprint: {
      outline: [],
      required_sections: [
        "problem statement",
        "step-by-step solution",
        "examples",
        "internal link references"
      ]
    },

linking_instructions: {
      must_link_to: ["P0"],
      optional_links: ["C2"]
    },

authority_enhancements: [
      "include actionable tips",
      "include real-world examples"
    ],

ai_optimization: [
      "answer-first paragraph",
      "clear section headings",
      "FAQ block"
    ],

execution_priority: ""
  }

]

---

# 🔷 EXECUTION MODEL (FOR DOWNSTREAM AGENT)

Each article seed is:

- Independent
- Context-aware via system_context
- Fully specified for execution
- Designed to be written without ambiguity

Execution order:

1. Pillar (P0)
2. High priority clusters
3. Medium/low clusters
4. Iterative linking updates

---

# 🔷 SUCCESS CRITERIA

The full system must:

✅ Produce a cohesive content ecosystem 
✅ Allow articles to be written independently 
✅ Maintain interlinking consistency 
✅ Rank across multiple queries 
✅ Be optimized for AI citations and backlinks 
✅ Be production-ready for publishing pipelines

Below is a complete pillar‑and‑cluster SEO content system centered on “Pillar + Cluster SEO workflows for content teams (2024–2026)”, designed as executable article seeds for writers and content ops.

***

## 1. SYSTEM CONTEXT (GLOBAL MEMORY)

This context is the shared “brain” for all articles: it encodes who we’re writing for, what authority we’re trying to build, and how the pillar+cluster model should be implemented in 2024–2026. Topic clusters and pillar pages are now a primary way to build topical authority and organize content for both SEO and AI retrieval.[^1][^2][^3]

```json
OUTPUT.system_context = {
  "core_topic": "Pillar + Cluster SEO workflows for content teams (2024–2026)",
  "authority_goal": "Become the go-to playbook for planning, executing, and maintaining pillar + cluster content systems for modern search and AI engines.",
  "audience_persona": "Content leads, SEO managers, and senior writers in small–mid-size teams who need repeatable workflows, briefs, and SOPs.",
  "primary_intents": [
    "Understand pillar vs cluster and topical authority",
    "Design pillar+cluster architectures around real business goals",
    "Implement internal linking workflows that actually ship",
    "Brief writers and editors consistently for cluster content",
    "Prioritize low-difficulty, quick-win topics in 2–4 weeks"
  ],
  "semantic_scope": [
    "pillar pages",
    "topic clusters / content clusters",
    "topical authority",
    "internal linking workflows",
    "keyword clustering and intent mapping",
    "content ops and writer playbooks",
    "AI search / GEO (generative engine optimization)"
  ],
  "content_positioning": "Execution-first, showing exactly how content ops and writers can plan, brief, write, link, and maintain a pillar+cluster ecosystem.",
  "differentiation_strategy": "Less theory, more workflows: templates, checklists, SOPs, and examples that map directly into content production, with an emphasis on long-tail, low-KD opportunities and internal linking discipline."
}
```

Pillar pages act as comprehensive hub guides on a broad topic, while cluster pages dive into specific subtopics and intents and are heavily interlinked for topical authority.[^4][^3][^1]

***

## 2. PILLAR + CLUSTER ARCHITECTURE

The architecture below uses one core pillar (P0) plus 12 cluster articles (C1–C12). Each cluster targets a distinct search intent and focuses on long‑tail, workflow‑oriented queries that are typically lower competition than generic “what is pillar page” terms.[^5][^6][^3]

```json
OUTPUT.content_architecture = {
  "pillar": {
    "id": "P0",
    "title": "Pillar + Cluster SEO Workflows: The Complete Content Ops Playbook (2024–2026)",
    "primary_keyword": "pillar cluster SEO workflow",
    "intent": "Informational + transactional (learn the model and adopt the workflow)",
    "role": "core authority page"
  },
  "clusters": [
    {
      "id": "C1",
      "title": "Pillar Page vs Topic Cluster: How Writers Should Scope Each Piece",
      "keyword": "pillar page vs topic cluster for writers",
      "intent": "Informational / clarification",
      "funnel_stage": "Awareness",
      "priority": "MEDIUM",
      "parent": "P0"
    },
    {
      "id": "C2",
      "title": "How to Plan a Pillar + Cluster Content Strategy in 2024–2026",
      "keyword": "plan pillar cluster content strategy",
      "intent": "Strategic how‑to",
      "funnel_stage": "Awareness",
      "priority": "HIGH",
      "parent": "P0"
    },
    {
      "id": "C3",
      "title": "Internal Linking Workflows for Pillar + Cluster SEO",
      "keyword": "internal linking workflow pillar cluster",
      "intent": "Tactical how‑to",
      "funnel_stage": "Consideration",
      "priority": "HIGH",
      "parent": "P0"
    },
    {
      "id": "C4",
      "title": "Cluster Article Briefs: A Writer‑First Template for Topic Clusters",
      "keyword": "cluster article brief template",
      "intent": "Template / resource",
      "funnel_stage": "Consideration",
      "priority": "HIGH",
      "parent": "P0"
    },
    {
      "id": "C5",
      "title": "Using Semrush to Build Pillar + Cluster Topic Maps",
      "keyword": "semrush topic clusters pillar pages",
      "intent": "Tool‑specific tutorial",
      "funnel_stage": "Consideration",
      "priority": "MEDIUM",
      "parent": "P0"
    },
    {
      "id": "C6",
      "title": "Prioritizing Low‑KD, Quick‑Win Cluster Topics in 2–4 Weeks",
      "keyword": "low difficulty quick win topic clusters",
      "intent": "Opportunity identification",
      "funnel_stage": "Consideration",
      "priority": "HIGH",
      "parent": "P0"
    },
    {
      "id": "C7",
      "title": "Content Ops Checklist for Maintaining Pillar + Cluster Systems",
      "keyword": "topic cluster maintenance checklist",
      "intent": "Ongoing ops checklist",
      "funnel_stage": "Retention",
      "priority": "MEDIUM",
      "parent": "P0"
    },
    {
      "id": "C8",
      "title": "Avoiding Keyword Cannibalization in Pillar + Cluster SEO",
      "keyword": "avoid keyword cannibalization topic clusters",
      "intent": "Risk mitigation",
      "funnel_stage": "Consideration",
      "priority": "HIGH",
      "parent": "P0"
    },
    {
      "id": "C9",
      "title": "Pillar + Cluster Templates and SOPs for Content Teams",
      "keyword": "pillar cluster SOP templates",
      "intent": "Operational enablement",
      "funnel_stage": "Decision",
      "priority": "HIGH",
      "parent": "P0"
    },
    {
      "id": "C10",
      "title": "Measuring Performance of Pillar + Cluster SEO Systems",
      "keyword": "measure topic cluster performance",
      "intent": "Analytics how‑to",
      "funnel_stage": "Consideration",
      "priority": "MEDIUM",
      "parent": "P0"
    },
    {
      "id": "C11",
      "title": "AI‑Assisted Pillar + Cluster Content Production Workflows",
      "keyword": "ai workflows for pillar cluster content",
      "intent": "Future‑oriented execution",
      "funnel_stage": "Awareness / consideration",
      "priority": "MEDIUM",
      "parent": "P0"
    },
    {
      "id": "C12",
      "title": "Backlink Strategies for Pillar Pages and Cluster Content",
      "keyword": "backlink strategy pillar page clusters",
      "intent": "Link building strategies",
      "funnel_stage": "Decision",
      "priority": "MEDIUM",
      "parent": "P0"
    }
  ]
}
```

Clusters are intentionally long‑tail and workflow‑focused to reduce competition risk and improve quick‑win timelines, aligning with best practice to mix head‑term pillars with more specific subpage queries.[^6][^3][^5]

***

## 3. INTERNAL LINKING GRAPH

The linking graph encodes how pages should connect so writers and editors can add links consistently. A hub‑and‑spoke pattern, with a pillar at the center and spoke pages interlinking, is widely recommended to concentrate topical authority and PageRank flow.[^7][^1][^4]

```json
OUTPUT.linking_graph = [
  {
    "from": "P0",
    "to": ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12"],
    "type": "pillar_to_cluster"
  },
  {
    "from": "C1",
    "to": ["P0", "C2", "C4"],
    "type": "contextual_links"
  },
  {
    "from": "C2",
    "to": ["P0", "C3", "C6", "C9"],
    "type": "contextual_links"
  },
  {
    "from": "C3",
    "to": ["P0", "C2", "C8", "C7"],
    "type": "contextual_links"
  },
  {
    "from": "C4",
    "to": ["P0", "C2", "C6", "C9"],
    "type": "contextual_links"
  },
  {
    "from": "C5",
    "to": ["P0", "C2", "C6"],
    "type": "contextual_links"
  },
  {
    "from": "C6",
    "to": ["P0", "C2", "C4", "C9"],
    "type": "contextual_links"
  },
  {
    "from": "C7",
    "to": ["P0", "C3", "C10"],
    "type": "contextual_links"
  },
  {
    "from": "C8",
    "to": ["P0", "C3", "C2"],
    "type": "contextual_links"
  },
  {
    "from": "C9",
    "to": ["P0", "C2", "C4", "C6"],
    "type": "contextual_links"
  },
  {
    "from": "C10",
    "to": ["P0", "C7", "C2"],
    "type": "contextual_links"
  },
  {
    "from": "C11",
    "to": ["P0", "C2", "C4", "C3"],
    "type": "contextual_links"
  },
  {
    "from": "C12",
    "to": ["P0", "C3", "C9"],
    "type": "contextual_links"
  }
]

OUTPUT.anchor_rules = [
  "use descriptive keyword anchors (e.g., 'internal linking workflow for topic clusters')",
  "avoid repeating the exact same anchor across multiple links on the same page",
  "align anchor phrasing with the target page’s primary intent and topic scope",
  "place links contextually inside relevant paragraphs, not in isolated 'link lists'",
  "vary anchors for the same target page to avoid over‑optimization"
]
```

Internal links should be primarily contextual, using descriptive anchors and keeping 3–10 internal links per ~1,000 words, which practitioners report as an effective range.[^8][^9][^10]

***

## 4. SEMANTIC COVERAGE MODEL

This semantic model defines the entities, subtopics, and user questions that the entire cluster should cover to satisfy modern topical authority requirements.[^2][^1][^6]

```json
OUTPUT.semantic_model = {
  "entities": [
    "pillar page",
    "topic cluster / content cluster",
    "topical authority",
    "internal links",
    "PageRank / link equity",
    "keyword cluster tools (e.g., Semrush Keyword Strategy Builder)",
    "Google Search / generative search",
    "SEO metrics (organic traffic, impressions, rankings)",
    "SOPs / playbooks",
    "content briefs"
  ],
  "related_topics": [
    "keyword research and clustering",
    "search intent classification (informational, transactional, navigational)",
    "hub‑and‑spoke content architecture",
    "orphan pages and crawlability",
    "canonical tags and redirects in internal linking",
    "generative engine optimization (GEO)",
    "AI‑assisted drafting and outlining",
    "backlink acquisition and digital PR"
  ],
  "user_questions": [
    "What exactly is a pillar page and how is it different from a cluster article?",
    "How many cluster pages do I need per pillar to build topical authority?",
    "How should I use Semrush (or similar tools) to find pillar and cluster topics?",
    "How do I prioritize cluster topics with low keyword difficulty for quick wins?",
    "How should writers structure and deliver cluster articles to avoid cannibalization?",
    "What’s the best way to set up internal linking between pillar and cluster pages?",
    "How do I measure whether my pillar + cluster system is working?",
    "How can AI help me scale pillar + cluster content without losing quality?"
  ],
  "must_cover_concepts": [
    "definition of pillar pages and topic clusters",
    "benefits of topical authority vs isolated keyword posts",
    "step‑by‑step workflow: from topic research to publishing and linking",
    "difference between head‑term pillars and long‑tail clusters",
    "internal linking patterns (pillar↔cluster; cluster↔cluster)",
    "avoiding keyword cannibalization via intent mapping and scope control",
    "refresh cadence and cluster expansion over time",
    "role of pillar pages in backlink campaigns and co‑citation"
  ],
  "competitor_gaps": [
    "lack of detailed writer‑oriented brief templates for cluster articles",
    "few resources that show internal linking as a repeatable ops workflow, not a one‑off task",
    "limited coverage of AI‑assisted pillar + cluster production in 2024–2026",
    "scarce checklists and SOPs that map directly to content ops roles",
    "insufficient focus on low‑KD, quick‑win prioritization for small teams"
  ]
}
```

Industry guides emphasize moving from individual keywords to topic clusters with strong internal linking and clear topical scope; this model captures those expectations while focusing on writer‑ready execution.[^3][^2][^6]

***

## 5. AUTHORITY \& BACKLINK STRATEGY

Backlink‑worthy assets and citation‑friendly formatting are built into each article via frameworks, data, and templates. Well‑structured pillar pages become natural link magnets when they offer comprehensive, credible coverage on a topic and serve as central references.[^11][^1][^2]

```json
OUTPUT.authority_engine = {
  "linkable_assets": [
    "original insights from content ops experiments (e.g., internal linking tests)",
    "repeatable frameworks for pillar + cluster planning and execution",
    "benchmark data points and checklists for topic cluster performance",
    "downloadable templates (briefs, SOPs, spreadsheets)",
    "contrarian opinions on outdated SEO practices vs modern topical authority"
  ],
  "hooks_per_article": {
    "P0": [
      "Definitive visual of a pillar + cluster workflow from idea to publish",
      "Master checklist for launching a new pillar + cluster in 30 days"
    ],
    "C2": [
      "Step‑by‑step planning framework with example topic maps",
      "Sample roadmap aligning quick‑win clusters to 2–4 week sprints"
    ],
    "C3": [
      "Internal linking SOP with example anchors and link density guidelines",
      "Before/after internal linking case study"
    ],
    "C4": [
      "Copy‑and‑paste cluster brief template for writers",
      "Examples of 'good vs bad' cluster briefs"
    ],
    "C6": [
      "Prioritization matrix for low‑KD cluster topics",
      "Sample Semrush export and scoring sheet"
    ],
    "C9": [
      "Library of SOPs for different content ops roles",
      "Editable document pack for team onboarding"
    ],
    "C10": [
      "Dashboard layout for tracking cluster performance",
      "List of metrics that correlate most with pillar success"
    ],
    "C12": [
      "Email outreach and digital PR angles tied to pillar topics",
      "Examples of co‑citation patterns with authoritative sources"
    ]
  },
  "distribution_channels": [
    "SEO and content marketing newsletters",
    "LinkedIn posts targeting content leads and SEO managers",
    "communities (e.g., r/SEO, private Slack groups)",
    "webinars or live sessions on topical authority and internal linking",
    "guest posts and podcast appearances about pillar+cluster workflows"
  ],
  "ai_citation_rules": [
    "use clear, single‑sentence definitions near the top of each article",
    "start key sections with direct, answer‑first paragraphs for passage ranking",
    "maintain structured formatting: H2/H3 sections, bullets, and tables",
    "co‑cite important concepts with known entities and tools (e.g., Semrush topic clusters, Search Engine Land topical authority guides)",
    "ensure statistics and workflows are presented in a way that LLMs can easily quote and reference"
  ]
}
```

Search and generative engines prefer clearly structured, comprehensive resources with credible internal linking and topical coverage, making these linkable assets and formatting rules particularly valuable.[^1][^2][^3]

***

## 6. ARTICLE SEEDS (EXECUTION BLUEPRINTS)

Below are fully specified article seeds for the pillar (P0) and all 12 clusters. Each seed is independent yet context‑aware via `system_context`, and designed so a downstream writer or AI agent can execute without ambiguity.

***

### Pillar Seed: P0

```json
{
  "seed_id": "P0",
  "type": "pillar",
  "context_reference": "system_context",
  "objective": "Establish full authority on pillar + cluster SEO workflows for content teams (2024–2026).",
  "input": {
    "topic": "Pillar + Cluster SEO Workflows",
    "keyword": "pillar cluster SEO workflow",
    "intent": "Teach content teams how to design and run pillar + cluster systems end‑to‑end.",
    "audience": "Content leads, SEO managers, senior writers."
  },
  "seo_targets": {
    "primary_keyword": "pillar cluster SEO workflow",
    "secondary_keywords": [
      "pillar page topic cluster strategy",
      "topical authority with pillar pages",
      "how to build topic clusters",
      "internal linking strategy pillar cluster",
      "content ops playbook for SEO"
    ],
    "questions_to_answer": [
      "What is a pillar page and what is a topic cluster?",
      "Why are pillar + cluster architectures essential for SEO and AI search in 2024–2026?",
      "How many cluster articles do I need per pillar?",
      "What is the end‑to‑end workflow from research to publishing and linking?",
      "How should writers and editors collaborate around pillar + cluster systems?"
    ]
  },
  "content_blueprint": {
    "outline": [
      {
        "heading": "What Is Pillar + Cluster SEO?",
        "purpose": "Define pillar pages, topic clusters, and topical authority in simple terms.",
        "key_points": [
          "Plain‑language definitions of pillar pages and clusters",
          "Brief history: shift from keyword‑by‑keyword SEO to topic clusters",
          "Why topical authority matters for both search and generative AI"
        ]
      },
      {
        "heading": "How Pillar Pages and Topic Clusters Work Together",
        "purpose": "Explain the hub‑and‑spoke relationship and internal linking model.",
        "key_points": [
          "Pillar as broad, comprehensive hub",
          "Clusters as deep dives into specific, long‑tail intents",
          "Internal linking patterns: pillar→cluster, cluster→pillar, cluster↔cluster"
        ]
      },
      {
        "heading": "The Content Ops Workflow: From Idea to Published Cluster",
        "purpose": "Lay out the step‑by‑step workflow for teams.",
        "key_points": [
          "Research & topic selection using keyword and intent clustering",
          "Planning the architecture and assigning ownership",
          "Briefing writers; editing; publishing; internal linking; measurement"
        ]
      },
      {
        "heading": "Designing Your First Pillar + Cluster in 30 Days",
        "purpose": "Provide a practical, time‑boxed roadmap.",
        "key_points": [
          "Week‑by‑week milestones (research, pillar draft, cluster drafts)",
          "Low‑KD cluster prioritization for quick wins",
          "Minimum viable internal linking setup"
        ]
      },
      {
        "heading": "Internal Linking as a System, Not a One‑Off Task",
        "purpose": "Reframe internal linking as an ongoing ops process.",
        "key_points": [
          "Link density guidelines and anchor text best practices",
          "Monthly and quarterly link audits",
          "Avoiding orphan pages and redirect chains"
        ]
      },
      {
        "heading": "Avoiding Keyword Cannibalization in Pillar + Cluster Systems",
        "purpose": "Show how to keep topics and intents clean.",
        "key_points": [
          "Mapping keywords to unique intents",
          "Scope control: what belongs in pillar vs cluster",
          "Updating older content to fit the new architecture"
        ]
      },
      {
        "heading": "SOPs, Templates, and Checklists for Content Teams",
        "purpose": "Introduce the system’s operational assets.",
        "key_points": [
          "Overview of briefs, SOPs, and checklists (linking out to cluster articles)",
          "Role‑based responsibilities (lead, writer, editor, SEO)",
          "How to onboard new team members into the system"
        ]
      },
      {
        "heading": "Measurement, Expansion, and Backlinks",
        "purpose": "Explain how to measure, iterate, and earn links.",
        "key_points": [
          "Core KPIs for pillar and cluster performance",
          "When and how to add new clusters under a pillar",
          "Backlink and co‑citation strategies focused on the pillar page"
        ]
      },
      {
        "heading": "FAQ: Common Pillar + Cluster Questions from Writers",
        "purpose": "Answer recurring questions to support passage‑level ranking.",
        "key_points": [
          "Short Q&A block sourced from user questions",
          "Link out to deeper cluster articles where relevant"
        ]
      }
    ],
    "required_sections": [
      "definition",
      "comprehensive overview",
      "subtopic summaries",
      "internal link anchors"
    ]
  },
  "semantic_requirements": {
    "entities": [
      "pillar page",
      "topic cluster",
      "topical authority",
      "internal links",
      "Semrush Keyword Strategy Builder",
      "Google Search and generative experiences"
    ],
    "concepts": [
      "hub‑and‑spoke content architecture",
      "search intent mapping",
      "keyword clustering",
      "link equity flow",
      "keyword cannibalization prevention"
    ],
    "related_topics": [
      "content ops workflows",
      "editorial planning for SEO",
      "generative engine optimization",
      "backlink strategy for authority pages"
    ]
  },
  "linking_instructions": {
    "must_link_to": ["C1", "C2", "C3", "C4", "C6", "C8", "C9", "C10", "C11", "C12"],
    "anchor_guidance": [
      "Use anchors that describe the subtopic (e.g., 'cluster article brief template' linking to C4).",
      "Introduce links inside explanatory sentences, not as isolated 'see also' lists.",
      "For each cluster, include at least one anchor that matches or closely paraphrases its primary keyword.",
      "Avoid using 'click here' or generic anchors; prefer 'internal linking workflows for topic clusters', etc."
    ]
  },
  "authority_enhancements": [
    "include original framework diagram showing the pillar + cluster workflow",
    "include actionable checklist for launching a new pillar + cluster in 30 days"
  ],
  "ai_optimization": [
    "clear definitions near the top",
    "structured answers with H2/H3 and bullets",
    "FAQ section aligned with common queries"
  ],
  "output_requirements": {
    "format": "long-form article",
    "tone": "expert, practical",
    "readability": "high"
  }
}
```

Definitions and workflows in this pillar should align with widely accepted explanations of pillar pages, topic clusters, and internal linking as core topical authority levers.[^2][^4][^3][^1]

***

### Cluster Seeds: C1–C12

Below are concise seeds; each follows the same structural logic but is scoped to a unique intent and quick‑win opportunity.

#### C1 – Pillar Page vs Topic Cluster

```json
{
  "seed_id": "C1",
  "type": "cluster",
  "context_reference": "system_context",
  "objective": "Clarify for writers how pillar pages and topic clusters differ in scope, depth, and role.",
  "input": {
    "topic": "Pillar page vs topic cluster",
    "keyword": "pillar page vs topic cluster for writers",
    "intent": "Explain differences and when to use each."
  },
  "seo_targets": {
    "primary_keyword": "pillar page vs topic cluster",
    "secondary_keywords": [
      "pillar vs cluster content scope",
      "pillar page definition for SEO",
      "topic cluster examples"
    ],
    "questions_to_answer": [
      "What is a pillar page in SEO?",
      "What is a topic or content cluster?",
      "How should writers scope content differently for pillars vs clusters?"
    ]
  },
  "content_blueprint": {
    "outline": [
      {
        "heading": "Definitions in Plain English",
        "purpose": "Give simple, writer‑friendly definitions.",
        "key_points": [
          "Define pillar page with examples",
          "Define topic cluster with examples"
        ]
      },
      {
        "heading": "Scope, Depth, and Intent",
        "purpose": "Contrast the two formats.",
        "key_points": [
          "Breadth vs depth",
          "Head term vs long‑tail queries"
        ]
      },
      {
        "heading": "When to Write a Pillar vs a Cluster Article",
        "purpose": "Provide decision rules for content teams.",
        "key_points": [
          "Checklist for choosing format",
          "Examples from common SEO topics"
        ]
      }
    ],
    "required_sections": [
      "problem statement",
      "step-by-step solution",
      "examples",
      "internal link references"
    ]
  },
  "linking_instructions": {
    "must_link_to": ["P0"],
    "optional_links": ["C2", "C4"]
  },
  "authority_enhancements": [
    "include actionable tips for scoping articles",
    "include real-world examples of pillar vs cluster content"
  ],
  "ai_optimization": [
    "answer-first paragraph defining both terms",
    "clear section headings",
    "FAQ block with 3–5 short Q&A entries"
  ],
  "execution_priority": "MEDIUM"
}
```

Definitions should align with industry explanations that describe pillar pages as broad, authoritative hubs and clusters as narrower subtopic pages linked around them.[^4][^6][^3][^1]

***

#### C2 – Planning a Pillar + Cluster Strategy (2024–2026)

```json
{
  "seed_id": "C2",
  "type": "cluster",
  "context_reference": "system_context",
  "objective": "Provide a step-by-step planning workflow for designing a pillar + cluster architecture.",
  "input": {
    "topic": "Planning pillar + cluster content",
    "keyword": "plan pillar cluster content strategy",
    "intent": "Strategic planning guide."
  },
  "seo_targets": {
    "primary_keyword": "plan pillar cluster content strategy",
    "secondary_keywords": [
      "how to build topic clusters",
      "topical authority planning",
      "pillar page content architecture"
    ],
    "questions_to_answer": [
      "How do I choose core topics for pillars?",
      "How many cluster pages should I plan initially?",
      "How do I align topic clusters with business goals?"
    ]
  },
  "content_blueprint": {
    "outline": [
      {
        "heading": "Choosing Your Core Topics",
        "purpose": "Show how to pick pillar topics relevant to the business.",
        "key_points": [
          "Questions to ask about brand, audience, and existing content",
          "Example: mapping a SaaS product into multiple pillars"
        ]
      },
      {
        "heading": "Finding and Grouping Cluster Opportunities",
        "purpose": "Explain keyword and intent clustering.",
        "key_points": [
          "Using tools to export keywords and group by intent",
          "Manual checks for semantic relevance"
        ]
      },
      {
        "heading": "Aligning Pillars and Clusters with Funnels and Timelines",
        "purpose": "Connect content to funnel stages and quick-win timelines.",
        "key_points": [
          "Mapping awareness/consideration/decision content",
          "Prioritizing low‑KD clusters for the first 2–4 weeks"
        ]
      }
    ],
    "required_sections": [
      "problem statement",
      "step-by-step solution",
      "examples",
      "internal link references"
    ]
  },
  "linking_instructions": {
    "must_link_to": ["P0"],
    "optional_links": ["C6", "C9"]
  },
  "authority_enhancements": [
    "include actionable tips for prioritizing clusters",
    "include real-world examples of topic maps"
  ],
  "ai_optimization": [
    "answer-first paragraph summarizing the planning workflow",
    "clear numbered steps",
    "FAQ block around planning mistakes"
  ],
  "execution_priority": "HIGH"
}
```

Planning steps should reflect best practice: start with core topics, then cluster related keywords and intents into pillars and clusters.[^6][^3][^4]

***

#### C3 – Internal Linking Workflows

```json
{
  "seed_id": "C3",
  "type": "cluster",
  "context_reference": "system_context",
  "objective": "Turn internal linking for pillar + cluster content into a repeatable workflow.",
  "input": {
    "topic": "Internal linking workflows",
    "keyword": "internal linking workflow pillar cluster",
    "intent": "Tactical execution guide."
  },
  "seo_targets": {
    "primary_keyword": "internal linking workflow pillar cluster",
    "secondary_keywords": [
      "internal linking strategy topic clusters",
      "anchor text best practices",
      "how many internal links per page"
    ],
    "questions_to_answer": [
      "How should I link pillars and clusters together?",
      "How many internal links per article are reasonable?",
      "How do I avoid over‑optimized anchors and orphan pages?"
    ]
  },
  "content_blueprint": {
    "outline": [
      {
        "heading": "Why Internal Linking Matters for Pillar + Cluster SEO",
        "purpose": "Explain impact on crawlability, authority, and UX.",
        "key_points": [
          "Link equity distribution",
          "Underutilization of internal links in most sites"
        ]
      },
      {
        "heading": "Designing a Pillar-First Linking Pattern",
        "purpose": "Show pillar→cluster and cluster→pillar links.",
        "key_points": [
          "Basic hub‑and‑spoke model",
          "How to avoid redirect chains and JS‑only links"
        ]
      },
      {
        "heading": "Operationalizing Internal Linking",
        "purpose": "Turn linking into a recurring task.",
        "key_points": [
          "Editorial checklist for adding links on publish",
          "Monthly and quarterly internal link audits"
        ]
      }
    ],
    "required_sections": [
      "problem statement",
      "step-by-step solution",
      "examples",
      "internal link references"
    ]
  },
  "linking_instructions": {
    "must_link_to": ["P0"],
    "optional_links": ["C2", "C7", "C8", "C12"]
  },
  "authority_enhancements": [
    "include actionable tips with link density examples",
    "include real internal linking workflows and checklists"
  ],
  "ai_optimization": [
    "answer-first paragraph explaining the ideal linking pattern",
    "clear section headings (why, how, ops)",
    "FAQ block on common internal linking issues"
  ],
  "execution_priority": "HIGH"
}
```

Guidance should incorporate practitioner recommendations on descriptive anchors, hub-and-spoke patterns, and typical internal link density ranges.[^12][^13][^9][^10][^8][^7]

***

#### C4 – Cluster Article Brief Templates

```json
{
  "seed_id": "C4",
  "type": "cluster",
  "context_reference": "system_context",
  "objective": "Provide a writer‑ready brief template tailored to cluster articles.",
  "input": {
    "topic": "Cluster article briefs",
    "keyword": "cluster article brief template",
    "intent": "Template / resource."
  },
  "seo_targets": {
    "primary_keyword": "cluster article brief template",
    "secondary_keywords": [
      "topic cluster content brief",
      "writer playbook for cluster pages"
    ],
    "questions_to_answer": [
      "What information should a cluster brief include?",
      "How do I encode search intent and internal linking in a brief?",
      "How can briefs prevent keyword cannibalization?"
    ]
  },
  "content_blueprint": {
    "outline": [
      {
        "heading": "Why Cluster‑Specific Briefs Matter",
        "purpose": "Explain the difference vs generic briefs.",
        "key_points": [
          "Cluster articles have precise intents",
          "Need for explicit linking and scope notes"
        ]
      },
      {
        "heading": "Anatomy of a High-Quality Cluster Brief",
        "purpose": "Break down fields and sections.",
        "key_points": [
          "Primary keyword and intent",
          "Required headings, FAQs, internal links"
        ]
      },
      {
        "heading": "Downloadable Template and Example",
        "purpose": "Provide copy‑and‑paste template and sample brief.",
        "key_points": [
          "Blank template",
          "Filled example for a sample topic cluster"
        ]
      }
    ],
    "required_sections": [
      "problem statement",
      "step-by-step solution",
      "examples",
      "internal link references"
    ]
  },
  "linking_instructions": {
    "must_link_to": ["P0"],
    "optional_links": ["C2", "C6", "C8", "C9"]
  },
  "authority_enhancements": [
    "include actionable tips for better briefs",
    "include real-world examples of completed briefs"
  ],
  "ai_optimization": [
    "answer-first paragraph defining a cluster brief",
    "clear section headings and bullet lists",
    "FAQ block about brief usage and common mistakes"
  ],
  "execution_priority": "HIGH"
}
```


***

#### C5 – Semrush for Pillar + Cluster Topic Maps

```json
{
  "seed_id": "C5",
  "type": "cluster",
  "context_reference": "system_context",
  "objective": "Show how to use Semrush to generate pillar and cluster ideas and evaluate difficulty.",
  "input": {
    "topic": "Using Semrush for topic clusters",
    "keyword": "semrush topic clusters pillar pages",
    "intent": "Tool-specific tutorial."
  },
  "seo_targets": {
    "primary_keyword": "semrush topic clusters",
    "secondary_keywords": [
      "semrush pillar page ideas",
      "keyword strategy builder topic clusters"
    ],
    "questions_to_answer": [
      "Which Semrush tools help build topic clusters?",
      "How do I interpret difficulty and intent scores?",
      "How can I export and cluster keywords into pillars and clusters?"
    ]
  },
  "content_blueprint": {
    "outline": [],
    "required_sections": [
      "problem statement",
      "step-by-step solution",
      "examples",
      "internal link references"
    ]
  },
  "linking_instructions": {
    "must_link_to": ["P0"],
    "optional_links": ["C2", "C6"]
  },
  "authority_enhancements": [
    "include actionable tips on reading Semrush reports",
    "include real-world examples of topic lists and clusters"
  ],
  "ai_optimization": [
    "answer-first paragraph describing the workflow",
    "clear step headings (export, cluster, evaluate)",
    "FAQ block on tool usage"
  ],
  "execution_priority": "MEDIUM"
}
```

This seed should align with Semrush guidance on using its keyword clustering and pillar/subpage suggestion tools for topic clusters.[^14][^3]

***

#### C6 – Low‑KD, Quick‑Win Cluster Topics

```json
{
  "seed_id": "C6",
  "type": "cluster",
  "context_reference": "system_context",
  "objective": "Help teams identify low‑difficulty, quick‑win cluster topics within 2–4 weeks.",
  "input": {
    "topic": "Low difficulty cluster prioritization",
    "keyword": "low difficulty quick win topic clusters",
    "intent": "Opportunity identification guide."
  },
  "seo_targets": {
    "primary_keyword": "low difficulty topic clusters",
    "secondary_keywords": [
      "quick win SEO topics",
      "how to prioritize topic clusters"
    ],
    "questions_to_answer": [
      "How do I find low‑KD keywords related to my pillars?",
      "How do I balance traffic potential and difficulty?",
      "What does a 2–4 week quick‑win plan look like?"
    ]
  },
  "content_blueprint": {
    "outline": [],
    "required_sections": [
      "problem statement",
      "step-by-step solution",
      "examples",
      "internal link references"
    ]
  },
  "linking_instructions": {
    "must_link_to": ["P0"],
    "optional_links": ["C2", "C4", "C9"]
  },
  "authority_enhancements": [
    "include actionable tips for scoring and prioritization",
    "include real-world examples of quick-win topic selection"
  ],
  "ai_optimization": [
    "answer-first paragraph summarizing the prioritization approach",
    "clear section headings for scoring and planning",
    "FAQ block on timelines and expectations"
  ],
  "execution_priority": "HIGH"
}
```


***

#### C7 – Content Ops Maintenance Checklist

```json
{
  "seed_id": "C7",
  "type": "cluster",
  "context_reference": "system_context",
  "objective": "Provide a recurring maintenance checklist for pillar + cluster systems.",
  "input": {
    "topic": "Pillar + cluster maintenance",
    "keyword": "topic cluster maintenance checklist",
    "intent": "Retention and upkeep."
  },
  "seo_targets": {
    "primary_keyword": "topic cluster maintenance checklist",
    "secondary_keywords": [
      "update pillar pages",
      "content ops checklist for SEO"
    ],
    "questions_to_answer": [
      "How often should I update pillar and cluster content?",
      "What do I check for internal linking and cannibalization?",
      "How do I plan expansions and pruning?"
    ]
  },
  "content_blueprint": {
    "outline": [],
    "required_sections": [
      "problem statement",
      "step-by-step solution",
      "examples",
      "internal link references"
    ]
  },
  "linking_instructions": {
    "must_link_to": ["P0"],
    "optional_links": ["C3", "C10"]
  },
  "authority_enhancements": [
    "include actionable tips for cadence and roles",
    "include real-world checklists used by teams"
  ],
  "ai_optimization": [
    "answer-first paragraph summarizing the maintenance routine",
    "clear checklist formatting",
    "FAQ block on refresh frequency"
  ],
  "execution_priority": "MEDIUM"
}
```


***

#### C8 – Avoiding Keyword Cannibalization

```json
{
  "seed_id": "C8",
  "type": "cluster",
  "context_reference": "system_context",
  "objective": "Teach teams how to avoid keyword cannibalization in pillar + cluster setups.",
  "input": {
    "topic": "Keyword cannibalization in clusters",
    "keyword": "avoid keyword cannibalization topic clusters",
    "intent": "Risk mitigation guide."
  },
  "seo_targets": {
    "primary_keyword": "avoid keyword cannibalization",
    "secondary_keywords": [
      "keyword cannibalization pillar cluster",
      "search intent overlap in topic clusters"
    ],
    "questions_to_answer": [
      "What is keyword cannibalization in a pillar + cluster context?",
      "How do I detect overlapping content?",
      "How can I restructure content to fix cannibalization?"
    ]
  },
  "content_blueprint": {
    "outline": [],
    "required_sections": [
      "problem statement",
      "step-by-step solution",
      "examples",
      "internal link references"
    ]
  },
  "linking_instructions": {
    "must_link_to": ["P0"],
    "optional_links": ["C2", "C3", "C4"]
  },
  "authority_enhancements": [
    "include actionable tips for mapping intents to pages",
    "include real-world examples of cannibalization fixes"
  ],
  "ai_optimization": [
    "answer-first paragraph defining cannibalization and its impact",
    "clear section headings for detection and resolution",
    "FAQ block on common cannibalization scenarios"
  ],
  "execution_priority": "HIGH"
}
```


***

#### C9 – Templates and SOPs for Content Teams

```json
{
  "seed_id": "C9",
  "type": "cluster",
  "context_reference": "system_context",
  "objective": "Offer a library of templates and SOPs for pillar + cluster execution.",
  "input": {
    "topic": "Pillar + cluster SOPs",
    "keyword": "pillar cluster SOP templates",
    "intent": "Operational enablement."
  },
  "seo_targets": {
    "primary_keyword": "pillar cluster SOP templates",
    "secondary_keywords": [
      "content ops SOP pillar cluster",
      "writer SOP for topic clusters"
    ],
    "questions_to_answer": [
      "What SOPs do I need for a pillar + cluster system?",
      "How do I document roles and responsibilities?",
      "How can SOPs reduce inconsistency in content production?"
    ]
  },
  "content_blueprint": {
    "outline": [],
    "required_sections": [
      "problem statement",
      "step-by-step solution",
      "examples",
      "internal link references"
    ]
  },
  "linking_instructions": {
    "must_link_to": ["P0"],
    "optional_links": ["C2", "C4", "C6"]
  },
  "authority_enhancements": [
    "include actionable tips for SOP adoption",
    "include real-world examples of SOP documents"
  ],
  "ai_optimization": [
    "answer-first paragraph summarizing the SOP library",
    "clear lists and tables",
    "FAQ block about implementation"
  ],
  "execution_priority": "HIGH"
}
```


***

#### C10 – Measuring Pillar + Cluster Performance

```json
{
  "seed_id": "C10",
  "type": "cluster",
  "context_reference": "system_context",
  "objective": "Define how to measure and report on pillar + cluster SEO systems.",
  "input": {
    "topic": "Measuring topic cluster performance",
    "keyword": "measure topic cluster performance",
    "intent": "Analytics and reporting guide."
  },
  "seo_targets": {
    "primary_keyword": "measure topic cluster performance",
    "secondary_keywords": [
      "pillar page KPIs",
      "cluster SEO metrics"
    ],
    "questions_to_answer": [
      "Which KPIs matter for pillars vs clusters?",
      "How do I build dashboards and reports?",
      "How do I attribute wins to topical authority vs individual posts?"
    ]
  },
  "content_blueprint": {
    "outline": [],
    "required_sections": [
      "problem statement",
      "step-by-step solution",
      "examples",
      "internal link references"
    ]
  },
  "linking_instructions": {
    "must_link_to": ["P0"],
    "optional_links": ["C2", "C7"]
  },
  "authority_enhancements": [
    "include actionable tips for KPI selection and dashboards",
    "include real examples of reports"
  ],
  "ai_optimization": [
    "answer-first paragraph with a concise metrics overview",
    "clear tables or bullet lists of KPIs",
    "FAQ block on common measurement questions"
  ],
  "execution_priority": "MEDIUM"
}
```


***

#### C11 – AI‑Assisted Pillar + Cluster Workflows

```json
{
  "seed_id": "C11",
  "type": "cluster",
  "context_reference": "system_context",
  "objective": "Show how AI tools can assist with research, outlining, and drafting in a pillar + cluster workflow.",
  "input": {
    "topic": "AI workflows for pillar + cluster content",
    "keyword": "ai workflows for pillar cluster content",
    "intent": "Future-oriented execution guide."
  },
  "seo_targets": {
    "primary_keyword": "ai workflows for pillar cluster content",
    "secondary_keywords": [
      "generative AI for content clusters",
      "AI-assisted topic clustering"
    ],
    "questions_to_answer": [
      "Which parts of the pillar + cluster workflow can AI safely handle?",
      "How do I keep E‑E‑A‑T while using AI?",
      "How can AI help with internal linking and brief creation?"
    ]
  },
  "content_blueprint": {
    "outline": [],
    "required_sections": [
      "problem statement",
      "step-by-step solution",
      "examples",
      "internal link references"
    ]
  },
  "linking_instructions": {
    "must_link_to": ["P0"],
    "optional_links": ["C2", "C3", "C4"]
  },
  "authority_enhancements": [
    "include actionable tips on safe AI usage",
    "include real-world examples of AI-assisted workflows"
  ],
  "ai_optimization": [
    "answer-first paragraph outlining the AI role",
    "clear headings by workflow stage",
    "FAQ block on risks and safeguards"
  ],
  "execution_priority": "MEDIUM"
}
```


***

#### C12 – Backlink Strategies for Pillars and Clusters

```json
{
  "seed_id": "C12",
  "type": "cluster",
  "context_reference": "system_context",
  "objective": "Connect pillar + cluster content to backlink and co‑citation strategies.",
  "input": {
    "topic": "Backlink strategy for pillar pages",
    "keyword": "backlink strategy pillar page clusters",
    "intent": "Link building strategy guide."
  },
  "seo_targets": {
    "primary_keyword": "backlink strategy pillar page",
    "secondary_keywords": [
      "link building for topic clusters",
      "co-citation for topical authority"
    ],
    "questions_to_answer": [
      "How do I turn pillar pages into linkable assets?",
      "How should I use cluster content in outreach?",
      "What is co‑citation and how does it relate to topical authority?"
    ]
  },
  "content_blueprint": {
    "outline": [],
    "required_sections": [
      "problem statement",
      "step-by-step solution",
      "examples",
      "internal link references"
    ]
  },
  "linking_instructions": {
    "must_link_to": ["P0"],
    "optional_links": ["C3", "C9"]
  },
  "authority_enhancements": [
    "include actionable tips for outreach and digital PR",
    "include real examples of successful pillar-based campaigns"
  ],
  "ai_optimization": [
    "answer-first paragraph summarizing the backlink approach",
    "clear sections on linkable assets, outreach, and co-citation",
    "FAQ block on expectations and timelines"
  ],
  "execution_priority": "MEDIUM"
}
```

Backlink strategy should build on the concept that comprehensive pillar pages and tightly interlinked topic clusters naturally attract citations when they offer unique frameworks, data, and resources.[^11][^1][^2]

***

This system gives you:

- A shared context (`system_context`) every article can reference.
- A pillar + 12 distinct, low‑competition‑oriented clusters with mapped intents.
- A clear internal linking graph and anchor rules for ops teams.
- Semantic and authority models optimized for SEO and AI retrieval.

Downstream writers or AI agents can now pick up each seed and produce ranking‑ready articles independently while maintaining ecosystem coherence.
<span style="display:none">[^15]</span>

<div align="center">⁂</div>

[^1]: https://www.digitalwillow.biz/topical-authority-with-pillar-pages-and-clusters/

[^2]: https://www.seoteric.com/topic-clusters-and-pillar-pages-how-to-build-topical-authority-that-lasts/

[^3]: https://www.semrush.com/blog/topic-clusters/

[^4]: https://www.axiomflux.co.uk/topical-authority-with-pillar-pages/

[^5]: https://topicalhq.com/guides/topical-authority/cluster-content/pillar-vs-cluster-deciding-content-scope

[^6]: https://www.spicymargarita.co/archive/topical-authority-seo

[^7]: https://rankcaddy.io/learn/topic-clusters/strategies-for-structuring-and-interlinking-topic-clusters/

[^8]: https://backlynk.io/blog/internal-linking-strategy/

[^9]: https://blog.hubspot.com/marketing/pillar-cluster-model-transform-blog

[^10]: https://studiohawk.com.au/blog/internal-linking-strategies-creating-a-winning-strategy-with-inlinks/

[^11]: https://medium.com/@seo_expert_in_bangladesh/topical-authority-content-clusters-the-new-keyword-strategy-978b5e7ecd34

[^12]: https://library.linkbot.com/internal-linking-strategy-build-a-pillar-first-cluster-that-moves-readers-to-product-actions/

[^13]: https://quickcreator.io/seo/internal-linking-pillar-cluster-seo-best-practices-2025/

[^14]: https://resources.straightgrowth.com/blog/a-guide-to-enhance-seo-with-pillar-pages-and-topic-clusters

[^15]: https://www.youtube.com/watch?v=4-uHnR2H32w

