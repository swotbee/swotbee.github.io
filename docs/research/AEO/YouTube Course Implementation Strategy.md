# **Answer Engine Optimization Technical Specification and Implementation Framework**

## **Executive Summary**

Answer Engine Optimization (AEO) represents a fundamental structural evolution from traditional Search Engine Optimization (SEO)1. While legacy search engine algorithms index web pages to match explicit keyword strings, Large Language Model (LLM) powered answer engines—such as OpenAI ChatGPT, Perplexity AI, Google AI Overviews, and Google AI Mode—synthesize dynamic, contextual responses to natural language conversational prompts1. Data indicates that traffic originating from AI search recommendations converts at a rate up to 9 times higher than traditional organic search traffic, driven by the hyper-specific intent embedded within conversational user queries1.  
This technical report translates the core architecture taught by Sam Oh in the Ahrefs AEO Masterclass into an operational framework1. The framework addresses the mechanics of real-time Retrieval-Augmented Generation (RAG) and parametric model training data, query fan-out behavior, off-site entity authority, B2A (Business-to-Agent) documentation architecture, and custom analytics telemetry1. Organizations implementing this system establish brand visibility across non-deterministic AI response vectors, systematically capturing high-intent referral traffic and securing top-tier recommendation placement across all major generative engines1.

## **Course Scope and Intended Outcome**

The scope of this implementation specification encompasses the operationalization of Answer Engine Optimization across four core execution phases1:

> 1. **Mechanics and Visibility Analysis**: Auditing existing brand mentions across diverse generative platforms, identifying assistant divergence, and measuring baseline AI Share of Voice (AI-SOV)1.  
> 2. **Strategic Research and Gap Mapping**: Differentiating keyword demand from prompt demand, running brand gap analyses, and constructing entity-level prompt maps1.  
> 3. **Execution and Content Infrastructure**: Re-architecting on-page content structures for LLM extraction, executing three-tier off-site citation acquisition, optimizing video assets for multimodal AI extraction, and deploying technical B2A files (/llms.txt) alongside unblocked crawler configurations1.  
> 4. **Telemetry and Analytics Measurement**: Configuring custom regex-based channel groupings in Google Analytics 4 (GA4), parsing bot crawl activity, and auditing ongoing AI referral revenue streams1.

Upon successful implementation, an enterprise transitions from sporadic AI visibility to a predictable pipeline of AI citations and high-converting referral visits across ChatGPT, Perplexity, Google AI Overviews, and Gemini1.

## **Course Map With Timestamps**

The curriculum structure spans 12 core lessons delivered across 4 modules, totaling 1 hour and 26 minutes of instructional content5. The table below maps each lesson, timestamp, core concept, tactical action, required toolset, expected deliverable, and source classification1.

| Timestamp | Topic / Module | Main Lesson | Required Action | Tool / Resource | Expected Output | Source Classification |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **0:00 \- 6:34** | Course Overview5 | AEO evolution from SEO; 9x higher conversion rate1. | Establish baseline conversion goals and project roadmap1. | GA4, Web Analytics3 | Strategic Implementation Plan | Direct Course Instruction1 |
| **6:34 \- 15:06** | Mod 1.1: How AI Search Engines Work5 | Training data vs. Real-Time RAG retrieval mechanics1. | Verify if brand is in static weights or requires live RAG fetching1. | ChatGPT, Perplexity, Ahrefs1 | Entity Training Audit Report | Direct Course Instruction1 |
| **15:06 \- 21:21** | Mod 1.2: Assistant Divergence1 | 86% of cited sources are unique to each AI assistant1. | Map platform-specific citation sources for target prompts1. | ChatGPT, Perplexity, Gemini1 | Platform Diversity Matrix | Direct Course Instruction1 |
| **21:21 \- 27:48** | Mod 1.3: AI Visibility Types5 | Brand Mentions vs. Organic Citations vs. Recommendations1. | Categorize existing brand placements across 3 visibility levels1. | Ahrefs Brand Radar1 | Visibility Baseline Audit | Direct Course Instruction1 |
| **27:48 \- 36:05** | Mod 2.1: Brand Gap Analysis5 | Identify prompt queries where competitors win recommendations1. | Run Brand Radar gap reports against top 3 competitors1. | Ahrefs Brand Radar1 | Competitor Brand Gap Matrix | Direct Course Instruction1 |
| **36:05 \- 43:59** | Mod 2.2: Keyword & Prompt Research5 | Query fan-out converts prompts into sub-queries; separate SEO/AEO1. | Extract seed keywords and expand into conversational prompt clusters1. | Ahrefs Keywords Explorer1 | Conversational Prompt Map | Direct Course Instruction1 |
| **43:59 \- 52:01** | Mod 3.1: Content Optimization for AI5 | Formatting, structure, and freshness override word count1. | Reformat key URLs using answer-first, structured schema1. | CMS, Schema Generator | LLM-Optimized Webpages | Direct Course Instruction1 |
| **52:01 \- 58:06** | Mod 3.2: Earning Brand Mentions5 | Off-site entity authority via 3-tier third-party placements1. | Pitch brand inclusion on top third-party roundup sites1. | Ahrefs Content Explorer1 | Tier 1-3 Outreach Backlog | Direct Course Instruction1 |
| **58:06 \- 1:03:24** | Mod 3.3: YouTube SEO for AI Search5 | Multimodal AI indexing extracts value from video transcripts1. | Optimize YouTube titles, transcripts, and video chapters1. | YouTube Studio, Transcript Tools | Multimodal Video Index Assets | Direct Course Instruction1 |
| **1:03:24 \- 1:11:22** | Mod 3.4: Technical AEO Setup5 | Crawler permissions in robots.txt and /llms.txt standard2. | Deploy /llms.txt file and unblock AI web crawlers2. | Server, Text Editor7 | Deployed B2A File Suite | Strategic Interpretation / External Research2 |
| **1:11:22 \- 1:18:58** | Mod 4.1: AI Referral Telemetry5 | Tracking referral traffic via custom GA4 regex channel groups1. | Implement custom regex channel grouping rules in GA43. | GA4 Admin Panel3 | GA4 AI Channel Grouping | Strategic Interpretation / External Research3 |
| **1:18:58 \- 1:26:51** | Mod 4.2: Strategy & Action Checklist5 | Continuous audit loops, Bot Analytics, and operational scaling1. | Execute 90-day maintenance and monitoring checklist1. | Ahrefs Bot Analytics4 | AEO Governance Dashboard | Direct Course Instruction1 |

## **Key Concepts Explained**

### **Query Fan-Out**

Query Fan-Out is the technical process wherein an AI search assistant receives a single, broad conversational prompt from a user and programmatically decomposes it into multiple background sub-queries1. These sub-queries execute concurrently against real-time search indexes or vector databases1. Mathematically, a user prompt ![][image1] is transformed by the fan-out engine into a set of discrete sub-queries:  
![][image2]  
Because generated sub-queries frequently register zero monthly search volume in traditional keyword tools, conventional single-keyword targeting fails1. Optimization requires building comprehensive topic coverage across an entire domain entity so that regardless of how an LLM decomposes a prompt, the brand's assets emerge across the generated sub-queries1.

### **Training Data vs. Real-Time Retrieval-Augmented Generation (RAG)**

Generative AI search engines operate across two distinct knowledge retrieval layers1:

> 1. **Parametric Memory (Training Data)**: Information encoded directly into the static weights of the LLM during training cycles1. Brands embedded in parametric memory enjoy baseline recommendation authority but face long refresh delays1.  
> 2. **Non-Parametric Retrieval (Real-Time RAG)**: Live web search retrieval triggered when a prompt demands current data, specific validation, or niche recommendations1. Real-time RAG scrapers retrieve live web documents, parse text fragments, and feed them into the context window for response generation1. AEO targets both layers by securing static web references and real-time index citations1.

### **Assistant Divergence**

Ahrefs' research demonstrates that 86% of cited sources are unique to each specific AI search assistant1. A domain ranking prominently in Google AI Overviews may be entirely absent from ChatGPT or Perplexity AI1. This divergence stems from underlying architectural differences in index providers (e.g., Bing API vs. Google Index vs. custom indices), distinct system prompts, varied scoring algorithms for source trustworthiness, and differing context window constraints1. Optimization cannot be tailored to a single engine; it must achieve ecosystem-wide entity authority1.

### **Business-to-Agent (B2A) Infrastructure**

While Search Engine Optimization relies on HTML parsing and XML sitemaps built for human-facing web browsers, Answer Engine Optimization introduces B2A infrastructure2. The /llms.txt specification provides a lightweight, highly structured Markdown file located at the domain root2. It serves as a curated map designed specifically for LLM context windows, reducing token processing waste and guiding AI agents directly to high-density canonical markdown resources2.

## **Prerequisites**

Before executing the tactical procedures outlined in this guide, the implementing organization must ensure the following baseline conditions are satisfied:

> 1. **Active Digital Footprint**: An operational domain with existing canonical content assets and indexed web pages.  
> 2. **Administrative Platform Access**:  
   * Google Analytics 4 (GA4) Editor or Administrator permissions3.  
   * Google Search Console (GSC) Domain Ownership access.  
   * Root server or Content Management System (CMS) access capable of editing robots.txt and uploading files to the root directory7.  
> 3. **Data Tooling Subscriptions**:  
   * Access to Ahrefs (Standard plan or higher recommended for full Site Explorer and Content Explorer access)4.  
   * Access to Ahrefs Brand Radar (standalone module or add-on)4.  
> 4. **Technical Competencies**: Basic proficiency in editing CMS configuration files, configuring GA4 regex rules, and executing basic Python scripts or command-line utilities3.

## **Required Accounts, Data, Skills, and Resources**

The operational execution team requires the specific credentials, baseline inputs, skill sets, and capital resources detailed below.

| Resource Category | Required Element | Operational Purpose | Skill Level Required | Financial Cost |
| :---- | :---- | :---- | :---- | :---- |
| **Accounts & Services** | Ahrefs Suite (Brand Radar, Site Explorer)4 | Gap analysis, prompt tracking, competitor research1. | Intermediate | $199/mo base for Brand Radar4 |
| **Accounts & Services** | Google Analytics 4 Account3 | Referral traffic tracking and custom channel setup1. | Intermediate | $0 (Free) |
| **Accounts & Services** | Hosting / CMS Admin (e.g., WordPress, Vercel) | File deployment (/llms.txt, robots.txt) and page updates7. | Beginner to Intermediate | Existing Infrastructure |
| **Data Inputs** | List of Core Competitors (3-5 primary brands) | Establishing baseline gap benchmarks in Brand Radar1. | Beginner | $0 |
| **Data Inputs** | Seed Product / Service Keyword List | Expansion into conversational prompt frameworks1. | Beginner | $0 |
| **Technical Skills** | Regex (Regular Expressions) | GA4 custom channel rule definitions3. | Intermediate | N/A |
| **Technical Skills** | Markdown Formatting & Schema Markup | Re-architecting web content for agent extraction2. | Beginner | N/A |

## **Complete Tool Stack**

Implementing an enterprise-grade AEO system requires integrating direct data tools, free analytics platforms, and automation script runtime environments3.

| Category | Tool Name | Official Purpose | Project Use Case | Pricing Tier | Alternatives |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Brand Tracking** | Ahrefs Brand Radar4 | AI Visibility & Prompt Monitoring | Tracking AI visibility across 376M+ prompts and 7 engines4. | Paid ($199/mo)4 | Surfer AI Tracker, Keyword.com6 |
| **Keyword Research** | Ahrefs Keywords Explorer9 | Search Intent & Volume Analysis | Seed topic generation and SEO vs. AEO query validation1. | Included in Ahrefs4 | Semrush, SE Ranking |
| **Off-Site Discovery** | Ahrefs Content Explorer9 | Web Content & Link Discovery | Finding unlinked brand mentions and Tier 1-3 outreach candidates1. | Included in Ahrefs4 | BuzzSumo, Google Dorks13 |
| **Referral Telemetry** | Google Analytics 43 | Web Analytics & Conversion Tracking | Custom Regex tracking of AI engine referral traffic1. | Free | Matomo, Plausible |
| **Crawler Telemetry** | Ahrefs Bot Analytics4 | Web Crawler Log Analysis | Monitoring AI web crawler visits (GPTBot, ClaudeBot)4. | Free (Beta)4 | Cloudflare Logpush, Server Logs |
| **Traffic Analytics** | Ahrefs Web Analytics4 | Lightweight Web Telemetry | Free baseline AI referral channel breakdowns4. | Free4 | GA4 Native Reports3 |
| **B2A Files** | VS Code / Plain Text Editor | Code & Text File Authoring | Drafting /llms.txt and /llms-full.txt standards2. | Free | Mintlify, Fern7 |
| **Execution Runtime** | Python 3.10+ / Bash | Local Automation Runtime | Automating B2A file generation and crawler verification | Free / Open Source | Node.js, PowerShell |

## **End-to-End Workflow Diagram in Text Form**

The operational architecture moves sequentially through five distinct stages:

> 1. **Audit & Infrastructure Unblocking Phase**:  
   * Ingest target brand name and competitor entities into Ahrefs Brand Radar1.  
   * Inspect existing robots.txt file and deploy explicit permissions for AI web crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot)7.  
   * Author and deploy canonical /llms.txt and /llms-full.txt files to the root server directory2.  
> 2. **Research & Prompt Mapping Phase**:  
   * Execute Brand Gap Analysis against top 3 direct market competitors in Ahrefs Brand Radar1.  
   * Extract non-zero search volume seed keywords and expand into conversational prompt clusters using Ahrefs Keywords Explorer1.  
   * Segment identified prompt gaps by platform (ChatGPT vs. Perplexity vs. Google AI Overviews)1.  
> 3. **On-Site & Technical Execution Phase**:  
   * Re-architect high-priority owned web pages using direct answer blocks, bulleted summary lists, and HTML comparison tables1.  
   * Implement structured JSON-LD schema (FAQPage, Article) across target URLs11.  
   * Resubmit updated page URLs in Google Search Console to trigger RAG re-crawling.  
> 4. **Off-Site Authority & Multimodal Execution Phase**:  
   * Launch Tier 1 outreach targeting top-ranking listicles and "best of" roundup articles1.  
   * Distribute original data research reports to capture Tier 2 editorial citations1.  
   * Optimize YouTube video assets by adding explicit timestamps, structured descriptions, and verified VTT transcript files1.  
> 5. **Telemetry, Measurement & Optimization Loop**:  
   * Configure Custom Channel Grouping in GA4 using regex pattern matching for AI referral engines3.  
   * Monitor AI web scraper crawl frequencies using Ahrefs Bot Analytics4.  
   * Run monthly Brand Radar re-audits to calculate AI Share of Voice (AI-SOV) improvements4.

## **Detailed Tactical Implementation Plan**

### **Phase 1: Preparation and Technical Unblocking**

#### **Step 1: Verification and Optimization of AI Crawler Permissions in robots.txt**

* **Step Number**: 1  
* **Task Name**: AI Web Crawler Access Configuration  
* **Objective**: Ensure all major AI search scrapers and LLM real-time crawlers have unrestricted access to site resources5.  
* **Why Necessary**: AI search engines rely on real-time RAG scrapers to fetch live content during prompt execution1. If robots.txt blocks these user-agents, the site is excluded from real-time recommendations1.  
* **Prerequisites**: Access to web server root or CMS robots.txt file manager7.  
* **Required Inputs**: Current domain robots.txt file URL.  
* **Tools Required**: Text Editor, Google Search Console, terminal curl utility7.  
* **Estimated Difficulty**: Beginner  
* **Estimated Hands-on Time**: 15 minutes  
* **Potential Cost**: $0  
* **Expected Output**: Deployed robots.txt file featuring explicit allow rules for major AI scrapers7.  
* **Completion Criteria**: HTTP GET request to robots.txt returns status 200 with verified user-agent allow directives7.

##### **Exact Procedure:**

> 1. Open web browser and access https://example.com/robots.txt to review existing directives7.  
> 2. Open server control panel (cPanel, Vercel, or WordPress plugin editor) and locate robots.txt source file7.  
> 3. Append the following configuration block to the end of the file7: User-agent: GPTBot Allow: /

User-agent: ChatGPT-User Allow: /  
User-agent: ClaudeBot Allow: /  
User-agent: PerplexityBot Allow: /  
User-agent: OAI-SearchBot Allow: /  
User-agent: Google-Extended Allow: /  
User-agent: Applebot-Extended Allow: / 4\. Save and deploy updated file to server root7. 5\. Open terminal application and execute command: curl \-I \-A "GPTBot" https://example.com/robots.txt 6\. Verify output returns HTTP/1.1 200 OK. If 403 Forbidden occurs, inspect server Web Application Firewall (WAF) settings for user-agent blocking rules.

#### **Step 2: Deployment of Business-to-Agent Infrastructure (/llms.txt)**

* **Step Number**: 2  
* **Task Name**: B2A File Authoring and Root Deployment  
* **Objective**: Construct and deploy a standardized, Markdown-formatted /llms.txt file to provide LLMs with a clean map of core site resources2.  
* **Why Necessary**: HTML bloat, complex JavaScript rendering, and ad scripts increase token consumption and cause AI scrapers to miss core product value propositions2. /llms.txt presents high-density contextual information directly formatted for LLM context windows2.  
* **Prerequisites**: List of 10–30 canonical URLs representing primary products, services, and pillar documentation7.  
* **Required Inputs**: Brand summary, product titles, canonical page links.  
* **Tools Required**: Text Editor (VS Code / Notepad)7.  
* **Estimated Difficulty**: Beginner  
* **Estimated Hands-on Time**: 45 minutes  
* **Potential Cost**: $0  
* **Expected Output**: Valid /llms.txt file accessible at https://example.com/llms.txt7.  
* **Completion Criteria**: File passes Markdown structure validation (H1, Blockquote, H2 section lists) and renders as text/plain or text/markdown7.

##### **Exact Procedure:**

> 1. Open local text editor and create new file named llms.txt7.  
> 2. Add single H1 header containing exact brand name7: \# ACME Analytics  
> 3. Add single blockquote summary detailing company purpose and target market2: \> ACME Analytics provides enterprise attribution software and AI referral tracking tools for B2B SaaS organizations.  
> 4. Add H2 headers grouping links into logical categories (\#\# Core Products, \#\# Documentation)2.  
> 5. Format link entries using standard syntax \- \[Title\](URL): Description.7: \- \[Attribution Engine\](https://example.com/product/attribution): Multi-touch attribution modeling platform for enterprise teams. \- \[AEO Setup Guide\](https://example.com/docs/aeo-setup): Complete step-by-step setup documentation for answer engine optimization.  
> 6. Save file and upload to domain root folder (/public\_html/llms.txt)7.  
> 7. Test URL in browser: https://example.com/llms.txt. Confirm file loads as plain text.

### **Phase 2: Strategic Research and Brand Gap Analysis**

#### **Step 3: Execution of AI Brand Gap Analysis**

* **Step Number**: 3  
* **Task Name**: Competitor Prompt Recommendation Audit  
* **Objective**: Identify specific target prompts where market competitors are currently recommended by AI engines but the user's brand is omitted1.  
* **Why Necessary**: Generative engines present limited recommendation slots per prompt1. Identifying existing competitive gaps highlights high-yield prompts for immediate optimization1.  
* **Prerequisites**: Active Ahrefs account with Brand Radar access, list of top 3 direct competitors4.  
* **Required Inputs**: Brand entity name, competitor entity names.  
* **Tools Required**: Ahrefs Brand Radar4.  
* **Estimated Difficulty**: Intermediate  
* **Estimated Hands-on Time**: 1 hour  
* **Potential Cost**: $199/mo (Ahrefs Brand Radar module)4  
* **Expected Output**: Exported CSV dataset containing unwon prompts, competitor citation sources, and current AI Share of Voice scores1.  
* **Completion Criteria**: Identification of at least 20 strategic prompt gaps with mapped third-party source URLs1.

##### **Exact Procedure:**

> 1. Open browser, log into Ahrefs, and select **Brand Radar** from main navigation bar4.  
> 2. Select **Add Brand** and input canonical brand name variations (e.g., "ACME", "ACME Analytics")4.  
> 3. Enter competitor brand names under **Competitor Settings**4.  
> 4. Navigate to **Mention Gaps** tab4. Set display filters:  
   * My Brand \= *Unmentioned*  
   * Competitor Brands \= *Mentioned*  
> 5. Sort results by **Prompt Volume / Demand** score.  
> 6. Click **Export** button and download dataset as brand\_gap\_analysis.csv.  
> 7. Review exported file to isolate prompts where competitors are recommended via third-party listicle articles1.

### **Phase 3: On-Page and Multimodal Optimization**

#### **Step 4: Re-architecting On-Page Content for AI Extraction**

* **Step Number**: 4  
* **Task Name**: Answer-First Content Structuring  
* **Objective**: Restructure primary web pages to prioritize rapid direct answer extraction by RAG scrapers1.  
* **Why Necessary**: LLM scrapers process page text sequentially and extract structured fragments1. Long-winded introductions delay extraction, whereas upfront answers, comparison tables, and clear definitions maximize extraction probability1.  
* **Prerequisites**: CMS page editor access, target prompt definitions from Step 31.  
* **Required Inputs**: Target URL, primary prompt question, concise definition text.  
* **Tools Required**: CMS Editor (WordPress, Webflow), Schema Markup Generator11.  
* **Estimated Difficulty**: Intermediate  
* **Estimated Hands-on Time**: 2 hours per page  
* **Potential Cost**: $0  
* **Expected Output**: Re-architected web page featuring an "Answer-First" lead block, structured HTML comparison table, and valid JSON-LD schema1.  
* **Completion Criteria**: Direct definition placed within first 50 words under target H2 heading, validated via Google Rich Results Test1.

##### **Exact Procedure:**

> 1. Log into CMS dashboard and open target landing page editor.  
> 2. Locate H2 heading corresponding to target conversational prompt (e.g., \#\# What is Answer Engine Optimization?).  
> 3. Insert declarative answer block immediately below heading (40–50 words)1:"Answer Engine Optimization (AEO) is the digital marketing discipline of structuring web content, entity references, and technical infrastructure to secure brand recommendations and citations within generative AI search engines."1  
> 4. Convert paragraph-based feature lists into an explicit HTML comparison table1:  
>    HTML  
>    \<table\>  
>      \<thead\>  
>        \<tr\>\<th\>Feature\</th\>\<th\>Traditional SEO\</th\>\<th\>Answer Engine Optimization\</th\>\</tr\>  
>      \</thead\>  
>      \<tbody\>  
>        \<tr\>\<td\>Target Entity\</td\>\<td\>Search Engine Result Pages\</td\>\<td\>AI Model Context Windows\</td\>\</tr\>  
>        \<tr\>\<td\>Query Type\</td\>\<td\>Keyword Strings\</td\>\<td\>Conversational Prompts\</td\>\</tr\>  
>      \</tbody\>  
>    \</table\>

> 5. Insert JSON-LD FAQPage schema block into page header using HTML embed code11.  
> 6. Save page, publish changes, and submit URL in Google Search Console to request re-indexing.

### **Phase 4: Telemetry Configuration and Measurement**

#### **Step 5: Configuring Custom GA4 AI Referral Tracking**

* **Step Number**: 5  
* **Task Name**: GA4 Custom Channel Grouping Setup  
* **Objective**: Isolate and track referral traffic originating from generative AI platforms within GA41.  
* **Why Necessary**: Default GA4 configurations aggregate AI traffic under generic "Referral" or "Organic Search" channels, obscuring AEO ROI3.  
* **Prerequisites**: GA4 Administrator permissions3.  
* **Required Inputs**: Regular expression (Regex) string matching AI referral sources3.  
* **Tools Required**: GA4 Admin Console3.  
* **Estimated Difficulty**: Intermediate  
* **Estimated Hands-on Time**: 20 minutes  
* **Potential Cost**: $0  
* **Expected Output**: Operational "AI Referral" Custom Channel Grouping in GA4 acquisition reports3.  
* **Completion Criteria**: Custom Channel Group captures sessions originating from AI engine domain referrers3.

##### **Exact Procedure:**

> 1. Log into Google Analytics 4 and click **Admin** (gear icon)3.  
> 2. Under **Data display**, select **Custom channel groups**3.  
> 3. Click **Create new channel group** and enter Name: Custom Channel Grouping3.  
> 4. Click **Add new rule** and set Channel Name: AI Referral3.  
> 5. Set condition parameters3:  
   * Parameter: sessionSource OR pageReferrer  
   * Match Type: matches regex  
     \[cite: 3, 8\]  
   * Regex Value3: ^(.\*ai|.\*\\.openai.\*|.\*chatgpt.\*|.\*gemini.\*|.\*gpt.\*|.\*copilot.\*|.\*perplexity.\*|.\*claude.\*|.\*anthropic.\*|.\*x\\.ai.\*)$  
> 6. Click **Save Rule** and drag AI Referral rule above standard Referral channel in list order8.  
> 7. Click **Save Group**. Verify setup after 24 hours by reviewing **Reports** \-\> **Acquisition** \-\> **Traffic acquisition**3.

## **Four-Method Research Comparisons**

To resolve complex technical execution tasks where manual workflows prove inefficient, four execution approaches have been evaluated across standardized criteria.

### **Comparison 1: Tracking AI Referral Traffic in Analytics**

| Evaluation Criterion | Method 1: Native GA4 Custom Channel Grouping (Regex) | Method 2: Google Tag Manager (GTM) Referral Interceptor | Method 3: Server-Side Log Parsing Script | Method 4: Ahrefs Web Analytics Integration |
| :---- | :---- | :---- | :---- | :---- |
| **Method Name** | Native GA4 Channel Regex3 | GTM Referral Event Tag | Python Server Log Parser | Ahrefs Web Analytics4 |
| **How It Works** | Rules classify incoming session referrer strings natively in GA4 UI3. | JS snippet parses document.referrer and fires custom event to GA4. | Python script parses raw access logs for AI domain strings. | Automagically splits AI traffic via JS tracking tag4. |
| **Cost** | $03 | $0 | $0 | $0 (Free Tier)4 |
| **Free-Plan Limitations** | Standard GA4 quota limits3. | Container size limits. | Server storage dependent. | Retention limits on free4. |
| **Setup Difficulty** | Easy (20 mins)8 | Intermediate (45 mins) | Advanced (2+ hours) | Easy (10 mins)4 |
| **Beginner Friendliness** | High | Medium | Low | High |
| **Time Required** | 20 minutes | 45 minutes | 3 hours | 10 minutes |
| **Reliability** | High (GA4 Server Processing)3 | Medium (Browser JS dependent) | High (Bypasses ad-blockers) | High |
| **Output Quality** | High (Integrated into standard reports)3 | High (Custom events) | Medium (Raw log data) | High (Clean dashboard)4 |
| **Automation Potential** | Fully automated once set | Fully automated | Requires cron scheduling | Fully automated |
| **Scalability** | High | High | High | High |
| **Privacy & Security** | High (No PII collected) | High | High | High |
| **Maintenance Requirements** | Low (Periodic regex updates) | Low | Medium (Log maintenance) | Zero |
| **Technical Skills Required** | Basic Regex3 | GTM & JS basics | Python & Linux Admin | JS Tag Snippet Setup |
| **Main Advantages** | Direct native GA4 integration3. | Custom event triggering. | Unaffected by ad-blockers. | Zero configuration setup4. |
| **Main Disadvantages** | Cannot fix historical data. | Blocked by client script blockers. | Requires direct log access. | Third-party dashboard dependence. |
| **Best Use Case** | Standard production implementation3. | Advanced GTM setups. | High-security environments. | Rapid initial audits4. |

#### **Numerical Scoring Matrix (Scale 1–10)**

| Evaluation Criterion | Method 1 | Method 2 | Method 3 | Method 4 |
| :---- | :---- | :---- | :---- | :---- |
| **Cost Efficiency** | 10 | 10 | 10 | 10 |
| **Ease of Use** | 9 | 6 | 3 | 10 |
| **Reliability** | 9 | 7 | 10 | 9 |
| **Automation** | 10 | 10 | 8 | 10 |
| **Scalability** | 9 | 8 | 9 | 9 |
| **Long-Term Maintainability** | 9 | 8 | 6 | 9 |
| **Total Score** | **56 / 60** | **49 / 60** | **46 / 60** | **57 / 60** |

### **Comparison 2: Generating and Maintaining Business-to-Agent Architecture (/llms.txt)**

| Evaluation Criterion | Method 1: Manual Markdown Authoring | Method 2: Python Web Crawler & Bundler Script | Method 3: CMS Middleware / Build Plugin | Method 4: Open-Source CLI Tooling |
| :---- | :---- | :---- | :---- | :---- |
| **Method Name** | Manual Text Authoring7 | Python Script Generator | Mintlify / Next.js Plugin7 | Node.js llms-txt CLI |
| **How It Works** | Author writes markdown manually and uploads via FTP7. | Script crawls site sitemap, parses headers, outputs markdown. | Build step auto-compiles documentation into /llms.txt7. | CLI command compiles local project files into spec7. |
| **Cost** | $0 | $0 | $0 (Open Source) | $0 |
| **Free-Plan Limitations** | N/A | Local compute limits | Framework dependent | Local compute limits |
| **Setup Difficulty** | Easy | Intermediate | Intermediate | Easy |
| **Beginner Friendliness** | High | Medium | Medium | High |
| **Time Required** | 30 minutes | 1 hour | 45 minutes | 15 minutes |
| **Reliability** | High | High | High | High |
| **Output Quality** | High (Editorial precision)7 | Medium (Auto-parsed text) | High | Medium |
| **Automation Potential** | Low | High (Cron/CI-CD) | High (Build trigger) | High (Build trigger) |
| **Scalability** | Low | High | High | High |
| **Privacy & Security** | High | High | High | High |
| **Maintenance Requirements** | High (Manual updates) | Low | Zero | Low |
| **Technical Skills Required** | Basic Markdown7 | Python scripting | Node / React / Static Site | CLI execution |
| **Main Advantages** | Precision editorial control7. | Programmatically scales to large sites. | Auto-syncs with site updates7. | Instant setup for dev projects. |
| **Main Disadvantages** | Outdates if URLs change. | Requires scraper maintenance. | Restricted to supported CMS. | Less editorial customization. |
| **Best Use Case** | Small corporate sites (\<50 pages)7. | Large enterprise domains. | Modern SaaS documentation7. | Developer code repositories. |

#### **Numerical Scoring Matrix (Scale 1–10)**

| Evaluation Criterion | Method 1 | Method 2 | Method 3 | Method 4 |
| :---- | :---- | :---- | :---- | :---- |
| **Cost Efficiency** | 10 | 10 | 10 | 10 |
| **Ease of Use** | 9 | 5 | 7 | 8 |
| **Reliability** | 9 | 8 | 10 | 8 |
| **Automation** | 2 | 10 | 10 | 9 |
| **Scalability** | 3 | 9 | 9 | 8 |
| **Long-Term Maintainability** | 4 | 8 | 10 | 8 |
| **Total Score** | **37 / 60** | **50 / 60** | **56 / 60** | **51 / 60** |

## **Recommended Methods and Justification**

### **Recommended Implementation Selections**

> 1. **AI Referral Tracking**: **Method 1 (GA4 Custom Channel Grouping via Regex)** is selected as the primary operational method3. It integrates directly into existing enterprise reporting infrastructure, guarantees long-term data persistence, and operates at zero additional cost3.  
   * *Backup Method*: **Method 4 (Ahrefs Web Analytics)** serves as an immediate parallel setup requiring zero regex setup4.  
> 2. **B2A File Generation (/llms.txt)**: **Method 1 (Manual Authoring)** is selected for sites with under 50 core pages7. It ensures complete editorial control over product value descriptions and prevents low-value blog pages from clogging LLM context windows2.  
   * *Backup Method*: **Method 2 (Python Web Crawler & Bundler Script)** for large enterprise domains exceeding 500 URLs.

## **Automation Opportunities**

Automating technical validation and file generation tasks prevents configuration drift and maintains search agent accessibility.

| Manual Task | Trigger Event | Input Asset | Processing Steps | Output Asset | Script / Tool | Time Saved |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| /llms.txt Maintenance | Weekly Sitemap Update | XML Sitemap URL | Fetch URLs, parse H1 & meta descriptions, compile markdown | Updated /llms.txt and /llms-full.txt \[cite: 2, 7\] | Python Script (Script 1\) | 2 hours/week |
| AI Scraper Verification | Deployment / Daily Cron | Target URL List | Send GET requests with simulated AI User-Agent strings, verify HTTP 200 | Alert log report | Python Script (Script 2\) | 1 hour/test |
| GA4 Channel Deployment | Initial Setup | GA4 Property ID | Push regex channel grouping rules via Google Analytics Management API | Provisioned GA4 Channel Grouping3 | Apps Script (Script 3\) | 30 minutes |

## **Scripts and Setup Instructions**

### **Script 1: Python Automated /llms.txt and /llms-full.txt Generator**

#### **Purpose:**

Parses an XML sitemap, extracts H1 page titles and meta descriptions, and outputs valid /llms.txt and /llms-full.txt files2.

#### **Prerequisites & Installation:**

Requires Python 3.10+ and libraries: requests, beautifulsoup4.

Bash  
pip install requests beautifulsoup4

#### **Python Script (generate\_llms.py):**

Python  
\#\!/usr/bin/env python3  
import os  
import sys  
import logging  
import xml.etree.ElementTree as ET  
from pathlib import Path  
import requests  
from bs4 import BeautifulSoup

logging.basicConfig(level=logging.INFO, format\='%(asctime)s \- %(levelname)s \- %(message)s')

def fetch\_sitemap\_urls(sitemap\_url: str, max\_urls: int \= 30) \-\> list:  
    headers \= {'User-Agent': 'LLMsTxtGenerator/1.0'}  
    try:  
        res \= requests.get(sitemap\_url, headers=headers, timeout=10)  
        res.raise\_for\_status()  
    except Exception as e:  
        logging.error(f"Failed to fetch sitemap: {e}")  
        sys.exit(1)

    urls \= \[\]  
    try:  
        root \= ET.fromstring(res.content)  
        namespace \= {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}  
        for elem in root.findall('ns:url/ns:loc', namespace):  
            urls.append(elem.text.strip())  
            if len(urls) \>= max\_urls:  
                break  
    except ET.ParseError as e:  
        logging.error(f"Sitemap parsing failed: {e}")  
        sys.exit(1)  
    return urls

def extract\_metadata(url: str) \-\> dict:  
    headers \= {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}  
    data \= {'url': url, 'title': '', 'description': '', 'body': ''}  
    try:  
        res \= requests.get(url, headers=headers, timeout=8)  
        if res.status\_code \== 200:  
            soup \= BeautifulSoup(res.text, 'html.parser')  
            h1 \= soup.find('h1')  
            data\['title'\] \= h1.get\_text(strip=True) if h1 else (soup.title.get\_text(strip=True) if soup.title else "Resource")  
              
            meta\_desc \= soup.find('meta', attrs={'name': 'description'})  
            data\['description'\] \= meta\_desc\['content'\].strip() if meta\_desc and meta\_desc.get('content') else "Core product asset page."  
              
            main\_content \= soup.find('main') or soup.body  
            if main\_content:  
                for tag in main\_content(\["script", "style", "nav", "footer"\]):  
                    tag.decompose()  
                data\['body'\] \= main\_content.get\_text(separator='\\n', strip=True)  
    except Exception as e:  
        logging.warning(f"Metadata extraction failed for {url}: {e}")  
    return data

def generate\_files():  
    sitemap\_url \= os.getenv('TARGET\_SITEMAP', 'https://example.com/sitemap.xml')  
    brand\_name \= os.getenv('BRAND\_NAME', 'ACME Analytics')  
    brand\_summary \= os.getenv('BRAND\_SUMMARY', 'Enterprise AEO and attribution platform.')  
    output\_dir \= Path(os.getenv('OUTPUT\_DIR', './public'))  
    output\_dir.mkdir(parents=True, exist\_ok=True)

    urls \= fetch\_sitemap\_urls(sitemap\_url)  
      
    with open(output\_dir / 'llms.txt', 'w', encoding='utf-8') as f\_short, \\  
         open(output\_dir / 'llms-full.txt', 'w', encoding='utf-8') as f\_full:

        f\_short.write(f"\# {brand\_name}\\n\\n\> {brand\_summary}\\n\\n\#\# Key Resources\\n\\n")  
        f\_full.write(f"\# {brand\_name} (Full Content Document)\\n\\n\> {brand\_summary}\\n\\n")

        for url in urls:  
            meta \= extract\_metadata(url)  
            if not meta\['title'\]:  
                continue  
            f\_short.write(f"- \[{meta\['title'\]}\]({meta\['url'\]}): {meta\['description'\]}\\n")  
            f\_full.write(f"\#\# \[{meta\['title'\]}\]({meta\['url'\]})\\n\\n\_{meta\['description'\]}\_\\n\\n{meta\['body'\]\[:1500\]}\\n\\n---\\n\\n")

    logging.info("Successfully generated llms.txt and llms-full.txt")

if \_\_name\_\_ \== '\_\_main\_\_':  
    generate\_files()

### **Script 2: Python AI Crawler User-Agent Tester**

#### **Purpose:**

Simulates user-agent requests from major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) to verify unblocked status7.

Python  
\#\!/usr/bin/env python3  
import requests

TARGET\_URLS \= \["https://example.com/", "https://example.com/llms.txt", "https://example.com/robots.txt"\]  
AI\_USER\_AGENTS \= {  
    "GPTBot": "Mozilla/5.0 (compatible; GPTBot/1.2; \+https://openai.com/gptbot)",  
    "ClaudeBot": "Mozilla/5.0 (compatible; ClaudeBot/1.0; \+claudebot@anthropic.com)",  
    "PerplexityBot": "Mozilla/5.0 (compatible; PerplexityBot/1.0; \+https://perplexity.ai/perplexitybot)",  
    "OAI-SearchBot": "Mozilla/5.0 (compatible; OAI-SearchBot/1.0; \+https://openai.com/searchbot)"  
}

def audit():  
    for url in TARGET\_URLS:  
        print(f"Auditing URL: {url}")  
        for bot, agent in AI\_USER\_AGENTS.items():  
            try:  
                res \= requests.get(url, headers={'User-Agent': agent}, timeout=5)  
                status \= "PASS" if res.status\_code \== 200 else f"FAIL ({res.status\_code})"  
                print(f"  \[{status}\] {bot}")  
            except Exception as e:  
                print(f"  \[ERROR\] {bot}: {e}")

if \_\_name\_\_ \== '\_\_main\_\_':  
    audit()

## **Standard Operating Procedures**

### **SOP-AEO-001: Conducting Brand Gap Analysis via Brand Radar**

* **Purpose**: Systematically identify unwon prompt recommendations and build an outreach backlog1.  
* **Scope**: Marketing Operations, SEO Lead.  
* **Owner**: Senior Strategist.  
* **Trigger**: First business day of every calendar month.  
* **Frequency**: Monthly.  
* **Required Tools**: Ahrefs Brand Radar, Google Sheets4.  
* **Required Inputs**: Updated list of primary competitors, canonical brand name variations4.

#### **Numbered Execution Procedure:**

> 1. Log into **Ahrefs Brand Radar** dashboard4.  
> 2. Confirm competitor entity configurations match active market competitors4.  
> 3. Run **Mention Gap Report**10. Set filters: My Brand \= Unmentioned, Competitor Brands \= Mentioned10.  
> 4. Export raw dataset to .csv.  
> 5. Apply filtering rules: Prompt Sentiment \= Positive/Neutral; Competitor Placement \= Tier 1 Listicles1.  
> 6. Sort remaining rows by Prompt Demand Volume score.  
> 7. Assign top 20 prompts to either Bucket A (On-Page Optimization) or Bucket B (Off-Site Citation Outreach)1.

### **SOP-AEO-002: On-Page Answer Engine Content Structuring**

* **Purpose**: Re-architect owned landing pages to enable clean text extraction by real-time RAG scrapers1.  
* **Scope**: Content Writers, Webmasters.  
* **Owner**: Content Lead.  
* **Trigger**: Assignment of Bucket A task from SOP-AEO-001.  
* **Frequency**: Bi-weekly.  
* **Required Tools**: CMS Admin, Schema Generator, Text Editor11.

#### **Numbered Execution Procedure:**

> 1. Open target page URL in CMS content editor.  
> 2. Ensure primary prompt question is configured as an \<h2\> heading1.  
> 3. Insert a 40–50 word declarative answer block immediately below heading1.  
> 4. Convert feature text lists into a structured HTML comparison table1.  
> 5. Embed JSON-LD FAQPage schema into document head11.  
> 6. Save page, publish, and request re-indexing in Google Search Console.

## **Templates and Checklists**

### **Template A: Standard /llms.txt Template**

# **\[Brand Name\]**

\[1-2 Sentence Brand Summary detailing core value proposition and target market\]

## **Core Products & Solutions**

* [\[Product 1 Name\]](https://example.com/product-1): \[One sentence description focusing on technical capability\]  
* [\[Product 2 Name\]](https://example.com/product-2): \[One sentence description focusing on technical capability\]

## **Documentation & Guides**

* [\[Guide Title 1\]](https://example.com/docs/guide-1): \[Summary of key operational capabilities\]  
* [\[API Reference\]](https://example.com/docs/api): \[Technical specifications for developer integration\]

### **Template B: On-Page Direct Answer Block (HTML)**

HTML  
\<div class\="aeo-answer-box" style\="background:\#f8f9fa; padding:16px; border-left:4px solid \#0056b3;"\>  
  \<p\>\<strong\>Quick Definition:\</strong\> \[Brand/Concept\] provides \[Primary Solution\] for \[Target Audience\]. Key capabilities include \[Capability 1\], \[Capability 2\], and \[Capability 3\].\</p\>  
\</div\>

## **Testing and Quality-Assurance Plan**

| Test Item | Testing Procedure | Expected Successful Result | Failure Diagnosis & Fix |
| :---- | :---- | :---- | :---- |
| **robots.txt Access** | Run curl \-A "GPTBot" \-I https://example.com/ | HTTP/1.1 200 OK returned | If 403, check WAF settings or Cloudflare bot rules7. |
| **/llms.txt Syntax** | Fetch URL via browser; inspect markdown headers | File returns plain text with valid headers7. | Fix formatting syntax; ensure server sets mime-type text/plain7. |
| **GA4 Tracking** | Visit site via ?utm\_source=chatgpt.com test link | Session logs under "AI Referral" group within 24h3. | Re-check regex string match rules in GA4 channel settings3. |
| **Schema Markup** | Test URL in Google Rich Results Test Tool | Valid JSON-LD Schema parsed without errors | Correct missing required schema fields (mainEntity, acceptedAnswer). |

## **KPIs and Reporting System**

### **Mathematical Metric Definitions**

#### **1\. AI Share of Voice (AI-SOV)**

Calculates brand recommendation density across a prompt dataset relative to market competitors6.  
![][image3]

#### **2\. AI Referral Conversion Multiplier (![][image4])**

Measures the conversion efficiency ratio of AI traffic versus organic search traffic1.  
![][image5]

### **KPI Dashboard Matrix**

| KPI Name | Metric Type | Primary Data Source | Target Goal | Action Threshold | Corrective Action |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **AI Share of Voice** | Lagging | Ahrefs Brand Radar4 | \> 25% Share | \< 10% Share | Execute SOP-AEO-001; audit competitor gap mentions1. |
| **AI Referral Traffic** | Lagging | GA4 Custom Channel3 | \+15% MoM | Flat / Declining | Audit robots.txt and launch Tier 1 listicle outreach1. |
| **Crawler Hit Frequency** | Leading | Ahrefs Bot Analytics4 | \> 500 hits/wk | \< 50 hits/wk | Inspect firewall logs and verify /llms.txt deployment2. |
| **Mention Gap Ratio** | Leading | Brand Radar Gap Report4 | \< 20% Gaps | \> 50% Gaps | Accelerate off-site Tier 1 listicle outreach pitches1. |

## **7-Day Action Plan**

| Day | Primary Objective | Assigned Tasks | Tools Required | Key Deliverable |
| :---- | :---- | :---- | :---- | :---- |
| **Day 0** | Preparation | Confirm administrative access to GA4, server, and Ahrefs3. | Hosting / Analytics | Confirmed Access Suite |
| **Day 1** | Technical Unblocking | Update robots.txt to allow GPTBot, ClaudeBot, PerplexityBot7. | Server Text Editor7 | Deployed robots.txt \[cite: 7\] |
| **Day 2** | B2A Deployment | Draft and deploy canonical /llms.txt file to domain root7. | Text Editor7 | Live /llms.txt File7 |
| **Day 3** | Analytics Telemetry | Create "AI Referral" Custom Channel Grouping in GA43. | GA4 Admin Console3 | GA4 Custom Rule Set3 |
| **Day 4** | Gap Analysis | Setup brand and competitors in Brand Radar; export gap report4. | Ahrefs Brand Radar4 | Brand Gap Dataset4 |
| **Day 5** | Page Selection | Select top 5 owned landing pages matching high-volume prompt gaps1. | Spreadsheet / Ahrefs9 | Target URL Backlog |
| **Day 6** | On-Page Structuring | Re-architect top 2 landing pages using answer blocks and tables1. | CMS Editor | Published Page Updates |
| **Day 7** | System Review | Audit GA4 referral data and verify crawler access in Bot Analytics3. | GA4 / Bot Analytics3 | Week 1 QA Audit Report |

## **30-Day Implementation Plan**

* **Days 8–15**: Re-architect remaining 3 target landing pages with direct answer blocks, comparison tables, and FAQ schema markup1. Deploy Script 1 to establish automated weekly updates for /llms.txt7.  
* **Days 16–23**: Launch Tier 1 listicle outreach campaign targeting 15 high-DR third-party articles identified in Brand Radar gap report4.  
* **Days 24–30**: Re-optimize top 5 YouTube videos by adding explicit timestamps, structured descriptions, and verified VTT caption files1. Review initial 30-day GA4 AI referral session metrics3.

## **60-Day Optimization Plan**

* **Days 31–45**: Conduct second monthly Brand Radar Gap Analysis; measure initial AI Share of Voice (AI-SOV) score movement4. Expand outreach to Tier 2 high-authority digital publications using original data benchmark studies1.  
* **Days 46–60**: Initiate Tier 3 community participation across targeted Reddit and specialized forum threads1. Optimize internal link structures connecting canonical landing pages listed in /llms.txt2.

## **90-Day Scaling Plan**

* **Days 61–75**: Expand prompt tracking repository in Ahrefs Brand Radar to cover long-tail conversational user queries1. Institutionalize monthly SOP execution across content and outreach teams.  
* **Days 76–90**: Automate monthly executive performance reporting combining GA4 AI referral conversion metrics and Brand Radar SOV scores3. Conduct quarterly audit of server firewalls and crawler access logs7.

## **Risk and Troubleshooting Guide**

| Risk Event | Likelihood | Impact | Warning Signs | Prevention & Mitigation Procedure |
| :---- | :---- | :---- | :---- | :---- |
| **Accidental AI Scraper Blocking** | Medium | Critical | Sudden drop in AI referral traffic and Bot Analytics hits4. | Ensure CDN security rules do not override robots.txt allow directives7. |
| **Hallucinated Brand Information** | Medium | High | AI engines output incorrect pricing or feature details. | Ensure canonical landing pages feature explicit, declarative pricing tables and structured schema1. |
| **/llms.txt Syntax Errors** | Low | Medium | 404/500 errors in log files or failed agent parsing15. | Validate /llms.txt formatting against spec; serve as plain uncompressed text (text/plain)7. |
| **Search Engine Terms Violation** | Low | Critical | Algorithmic penalty or manual action. | Avoid blackhat keyword stuffing or forum spamming; follow strict E-E-A-T guidelines18. |

## **Final Master Checklist**

* \[ \] **robots.txt Permissions Verified**: Confirmed explicit Allow directives for GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, and Google-Extended live at /robots.txt7.  
* \[ \] **/llms.txt Deployed**: Created and published valid Markdown file at https://example.com/llms.txt following H1, Blockquote, H2 specification2.  
* \[ \] **/llms-full.txt Deployed**: Generated full text markdown bundle at https://example.com/llms-full.txt for deep model context ingestion2.  
* \[ \] **GA4 Custom Channel Configured**: Implemented AI Referral channel grouping using source regex rule matching AI platforms3.  
* \[ \] **Brand Radar Project Created**: Configured brand name and top 3 competitor entities in Ahrefs Brand Radar4.  
* \[ \] **Brand Gap Analysis Completed**: Exported unwon prompt report and prioritized top 20 prompt gaps1.  
* \[ \] **Core Pages Re-architected**: Reformatted top 10 owned landing pages with declarative lead answers, structured tables, and FAQ schema1.  
* \[ \] **Tier 1 Listicle Outreach Launched**: Sent pitches to top 15 third-party roundup articles to secure missing brand placements1.  
* \[ \] **YouTube Multimodal Assets Optimized**: Added explicit timestamps, structured descriptions, and verified VTT subtitle files across core YouTube videos1.  
* \[ \] **Bot Analytics Active**: Verified ongoing AI scraper access and hit frequency inside Ahrefs Bot Analytics4.  
* \[ \] **Automation Scripts Deployed**: Scheduled weekly automated execution of /llms.txt generator script via cron.  
* \[ \] **SOP Governance Established**: Distributed SOP-AEO-001 and SOP-AEO-002 to operational team leads.

## **Sources and Research References**

> 1. **Ahrefs Masterclass Curriculum**: Course material, data studies (75K brand study, 55.8M AI Overview analysis), and instructional guidance provided by Sam Oh in the "AI SEO Course for Beginners: Complete AEO Tutorial"1.  
> 2. **Ahrefs Academy Documentation**: Official documentation on AEO workflows, Brand Radar tool specifications, and Web Analytics source classification4.  
> 3. **llmstxt.org Specification**: Standardized proposal for Business-to-Agent (B2A) markdown file structuring and /llms.txt root path specifications2.  
> 4. **Google Analytics 4 Help Center**: Technical guidelines for defining custom channel groupings, session referrers, and regex pattern matching for AI traffic sources3.

#### **Works cited**

> 1. AI SEO Course for Beginners: Complete AEO Tutorial \- YouTube, [https://www.youtube.com/watch?v=uza9GX0E2mw](https://www.youtube.com/watch?v=uza9GX0E2mw)  
> 2. What is llms.txt? Breaking down the skepticism \- Mintlify, [https://www.mintlify.com/blog/what-is-llms-txt](https://www.mintlify.com/blog/what-is-llms-txt)  
> 3. Custom channel groups \- Analytics Help, [https://support.google.com/analytics/answer/13051316?hl=en](https://support.google.com/analytics/answer/13051316?hl=en)  
> 4. AI Marketing Platform for AEO Specialists \- Ahrefs, [https://ahrefs.com/use-cases/aeo](https://ahrefs.com/use-cases/aeo)  
> 5. Answer Engine Optimization (AEO) Course \- Ahrefs, [https://ahrefs.com/academy/aeo-course](https://ahrefs.com/academy/aeo-course)  
> 6. Learn Answer Engine Optimization: 30-Minute AEO Tutorial for Beginners \- YouTube, [https://www.youtube.com/watch?v=Krse87iYvpE](https://www.youtube.com/watch?v=Krse87iYvpE)  
> 7. LLMs.txt in 2026: The Full Guide \- Limy.ai, [https://limy.ai/blog/llms.txt-in-2026-the-full-guide](https://limy.ai/blog/llms.txt-in-2026-the-full-guide)  
> 8. Can someone please help me with GA4 AI referral traffic:( : r/GoogleAnalytics \- Reddit, [https://www.reddit.com/r/GoogleAnalytics/comments/1s4v9pm/can\_someone\_please\_help\_me\_with\_ga4\_ai\_referral/](https://www.reddit.com/r/GoogleAnalytics/comments/1s4v9pm/can_someone_please_help_me_with_ga4_ai_referral/)  
> 9. How to Use Ahrefs, [https://ahrefs.com/academy/how-to-use-ahrefs](https://ahrefs.com/academy/how-to-use-ahrefs)  
> 10. The Complete SEO & AI SEO Course for 2026 (Full Beginner's Guide) \- YouTube, [https://www.youtube.com/watch?v=7DRO4rEIHDk](https://www.youtube.com/watch?v=7DRO4rEIHDk)  
> 11. llms-txt: The /llms.txt file, [https://llmstxt.org/](https://llmstxt.org/)  
> 12. What Is LLMs.txt & Should You Use It? \- Semrush, [https://www.semrush.com/blog/llms-txt/](https://www.semrush.com/blog/llms-txt/)  
> 13. Keyword & Prompt Research for AI SEO (AEO) | 2.2. AEO Course by Ahrefs \- YouTube, [https://www.youtube.com/watch?v=b8PyeJOE--Y](https://www.youtube.com/watch?v=b8PyeJOE--Y)  
> 14. What is llms.txt? How it works and examples | by Tiffany \- Medium, [https://medium.com/@tiffany\_64216/what-is-llms-txt-how-it-works-and-examples-d077685bb4e6](https://medium.com/@tiffany_64216/what-is-llms-txt-how-it-works-and-examples-d077685bb4e6)  
> 15. llms.txt | Lighthouse \- Chrome for Developers, [https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt)  
> 16. LLMs.txt Guide: What It Does and Doesn't Do (2026) \- DerivateX, [https://derivatex.agency/blog/llms-txt-guide/](https://derivatex.agency/blog/llms-txt-guide/)  
> 17. SEO Course for Beginners \- Ahrefs, [https://ahrefs.com/academy/seo-training-course](https://ahrefs.com/academy/seo-training-course)  
> 18. SEO Full Course 2026 \[FREE\] | SEO Tutorial For Beginners | Digital Marketing SEO Course |Simplilearn \- YouTube, [https://www.youtube.com/watch?v=2Hylr7iyoSI](https://www.youtube.com/watch?v=2Hylr7iyoSI)  
> 19. SEO Full Course 2026 \[FREE\] | SEO Tutorial For Beginners | Complete SEO Training | Simplilearn \- YouTube, [https://www.youtube.com/watch?v=jF71pyWlxx4](https://www.youtube.com/watch?v=jF71pyWlxx4)  
> 20. Working with llms.txt | Platform Overview \- Mastercard Developers, [https://developer.mastercard.com/platform/documentation/agent-toolkit/working-with-llmstxt/](https://developer.mastercard.com/platform/documentation/agent-toolkit/working-with-llmstxt/)  
> 21. How to Track AI Traffic in GA4 and Ahrefs Web Analytics (ChatGPT, [https://ahrefs.com/academy/aeo-course/lesson-4-1](https://ahrefs.com/academy/aeo-course/lesson-4-1)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAaCAYAAAAue6XIAAAB4UlEQVR4Xu2WT0gVURTGP/8ELsKUDAxSQgWRMkgTgiA03CS4FFxVhkImuElx5Z9aJIhEBCEKIqRFunAhiKIRT9pIu9roRheWBC1aFrap7/CdnsOFFy20eYv5wQ/unHMf78zce+YOkJCQ8N9ooOv0G/1Ft/za3PD4DC3584Ns4BVU7MUgXkO/Q8VnDZ/o5zDofIBupDpMxMElqJjZMEFOQk/WLA5ysdAPFXs3TJB7UO5RmIiLNaigqkjMnuId+pWO0txILjZsmQ+gYq2J3tI9aNmn6OXDqfHTisz7Net4BhV7O0xkIztQsaVhIqCDLtBmv26jI+kscA5qwiHaE4lfp9N0jD72WC9dgRrbttoqzfFcRiqgQt+HiYCr7hxt99g87UrPAF7QWuhQsZPPaKLL9AQ9RV9CjdtNJ6BC7eZ38ZcGvkY36U+o2C9Qc7VEJ0Uoo3nQvNMesyaMnnaTdB96c5z1WIq+hp74AK2EGrqIfqSNPu/IuUHf+Pg89M2QTwuhP7dtcN/njPu8H/SCj6PYlrM3UEGYOCo6oaUz7KBYojdpPVRgn+ceQHvS2KZXfHwG2reGbaWUj48FW9p3UFM9pIv0qeduQc1ixTyHtoxRB30gPYGarNzjw3TQxwkJCQn/wG9DYlwN6+Bf/gAAAABJRU5ErkJggg==>

[image2]: <data:image/png;base64,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>

[image3]: <data:image/png;base64,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>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAAfCAYAAADdnlK9AAAEqUlEQVR4Xu2ZZ6xlUxTH/+roRifK6CR6iSDKKIkWiU5EGEKQILqoM2p0gokSfNF90DsxL1GjfVBCCJnoElGD4AP/X9Y6udvOu2+QvOuZt3/JP/fste85996z1l5r7XOlRqPRaDQajcaoMMk6x5phfWS9ZL1lHZbzl1vb5nHHRtbT1jfWH9a7OX7H+jnHU615uhMag+dshTNetHayJqR9Lus869Wcny/tNXcqnLtSYZvfmpb2awp7Y4DcqnDAsfVEMrf1ifVYPVHA/PO10aymuPan9URj9DlOcfNJxyPxhHVCbUw2UFzj9HpCETDM3VNPNEaXpa3vrQ8065p4sbVmbUxOVjhw/cK2sHWg9aWiBi9WzDUGwJUKp/RbkX+XJ63vFPX1fOsRxXVx6i69tzUGCZ0sTqDj/bcsaP1q3VbZL1U0Z0tVdljOesr63bqlmgM68h+tN6yzqrnhmKQIJD6vYyHroGIMBPFVlW04jra+tXYrbFtZLxTjMQ3dMI79RdERj8R+1oq1MdlVcZ0jK/vOaSdlD8fG1sMKp5TMoXAC565dzY3EqYpM1LG/ok8o2dTarLINBw0kziVAOihh+xTjMc9MxU1ky9KPBRQOmLOeSK5QXGOdyt7V4X6NGo0cNfm9yo5tivV5ZZ8VlIK9i/HV1hnF+J+whSJr/K9h/4oD9qonksWth6zt64mCV6yvFCuuhLQ73IruYJWRDcgc3bkE2Z7WZdZdaes41LrX2jHH+ypqPLDSfrKWUKx2gpExW7MLFc0dvcCz1pJ5zjHWg/l6gXWfetem65+ex0Cg8t7yPmyjKCmUn4vSRsA+bp1i3aTIHPV9GRikHZqhzxRftoQaw5fbsLKX4BwceH89objBzB2e49vVq79kARzIK85dIe08CeNmPGcdlTbYPMU1DkgbW6sj8pjv+mYeA87Eud0DF67F8Uxr1Zw/XvEdrs/3TLZezmMcRFqHLa1NFD0FAQbbWY8qdhiLWncodgPUaq6HYwkUnvL1y3gDgaifYg0pViFflFR6sPo/jWJfy434TeFAHlDgTH50xxqKm/S2oraWUU/AdI80aepwDk0dr3wmDVpZbwki+oIvFKsTPrbWzWNWWllvd9dfaznnE7yv5ZhSQ1aaoXAqEDTvK+7HD+p9Dufynb5WLziHrLsVme80xYMaFspERZBNzveNS0601spjAoCutlvhOIFMUkNwPJPHKyueZeOIRRQZZo+cA9Ikj1NhmXy91jpJvcaQhpI9ftdvkF5Js1srHrWW0FA+oLjWvIpsU/cYsKwiMPstinHBjcXxDYqV3TmBVUhtrcH5XQolzdILsIcmZZKCl1fPoQQM3Tor6hDFqqcv4DNotIA0T1YBHPa64rk4AcB2iY6dDhmox3TKlyiCgSaQzhtYzQQGsPqH8njcsYoiXRLd3DDAmTQ1pEqaFlL8h4pGqIS9MbV4mnWu4vzOUVyTVbd6jqnF/FFBM8fqpo6zGnn/evkeai5liH+6rlOUGthB4aAzcww0VzerV+/ZxvFHCaWAz+3+LJmqXoA1/kNoyMqtU2M2gn+xyCSN2Qz2tXT5vDYajUaj0Wg0Go1Go9EYw/wJDM/oceuWjdIAAAAASUVORK5CYII=>

[image5]: <data:image/png;base64,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>