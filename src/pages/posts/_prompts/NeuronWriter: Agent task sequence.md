<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# can you convert the above sequence into a sequnce of steps or tasks which can be used by an agent ?

Here is a clean sequence of steps you can give to an “agent” (or multiple agents) as tasks. Each step is phrased as something the agent must do and what inputs/outputs it should expect.

***

## Agent task sequence

### Task 1 – Receive and validate user brief

- Accept inputs:
    - `blog_title`
    - `primary_keyword`
    - `secondary_keywords`
    - Optional: `target_audience`, `tone`, `language`, `desired_length`.[^1]
- Validate:
    - Ensure `blog_title` and `primary_keyword` are present.
    - Normalize `secondary_keywords` to a list.[^1]
- Output:
    - A normalized `blog_brief` object with all these fields.

***

### Task 2 – Prepare NeuronWriter analysis request

- Input:
    - `blog_brief`
    - Config values: `NEURON_PROJECT_ID`, `ENGINE`, `LANGUAGE`.[^1]
- Build HTTP request payload:
    - `project_id = NEURON_PROJECT_ID`
    - `keyword = blog_brief.primary_keyword`
    - `engine = ENGINE`
    - `language = LANGUAGE`.[^1]
- Output:
    - A complete HTTP request spec for NeuronWriter’s “new query” endpoint (URL, headers, body).[^1]

***

### Task 3 – Call NeuronWriter “new query” API

- Use the request spec from Task 2.
- Perform `POST` to NeuronWriter’s analysis endpoint with:
    - `X-API-KEY` header.
    - `Accept` and `Content-Type` as `application/json`.[^1]
- Handle errors (non‑200 responses).
- Output:
    - Parsed `neuron_analysis` object containing:
        - `semantic_terms`
        - `suggested_headings`
        - `faqs`
        - Any identifiers (e.g., `query_id`) returned by NeuronWriter.[^1]

***

### Task 4 – Build Claude outline prompt

- Input:
    - `blog_brief`
    - `neuron_analysis`.[^1]
- Construct a structured prompt that:
    - Explains the topic and target audience.
    - Includes main and secondary keywords.
    - Lists key semantic terms and FAQs from NeuronWriter.
    - Instructs Claude to produce a numbered, SEO‑friendly outline (H2/H3) covering those terms.[^1]
- Output:
    - `outline_prompt` ready to send to Claude (Claude messages JSON body).

***

### Task 5 – Generate outline with Claude

- Use `outline_prompt` to call Claude’s `messages` API.
- Ensure:
    - Model name is set (e.g., `claude-3-*`).
    - `max_tokens` is sufficient for the outline.
- Parse Claude output into a structured `outline`, e.g.:
    - `outline.sections = [{ heading, subsections, notes }, ...]`.
- Output:
    - `outline` object.

***

### Task 6 – Prepare section-level writing prompts

- Input:
    - `blog_brief`
    - `outline`
    - `neuron_analysis`.[^1]
- For each section in `outline`:
    - Build a dedicated Claude prompt that includes:
        - Overall blog context (title, audience, tone).
        - The specific section heading.
        - Relevant semantic terms for that section.
        - Any style constraints (word count range, structure).[^1]
- Output:
    - `section_prompts = [{ section_id, prompt }, ...]`.

***

### Task 7 – Generate section content with Claude

- Loop through `section_prompts`.
- For each:
    - Call Claude `messages` API with the section prompt.
    - Capture the generated text as `section_content`.
- Build:
    - `article_sections = [{ section_id, heading, content }, ...]`.
- Output:
    - `article_sections` list.

***

### Task 8 – Assemble full article draft

- Input:
    - `article_sections`.
- Concatenate sections in order:
    - Add title at top.
    - Maintain headings hierarchy (H1/H2/H3).
- Output:
    - `article_draft` as a single formatted string (or rich‑text/HTML, as needed).

***

### Task 9 – Prepare NeuronWriter update request

- Input:
    - `article_draft`
    - `NEURON_PROJECT_ID`
    - `query_id` or other identifier returned in `neuron_analysis`.[^1]
- Build HTTP request payload for NeuronWriter’s “update content” endpoint:
    - Contains project/query identifiers plus `article_draft` as content.[^1]
- Output:
    - HTTP request spec: URL, headers, body.

***

### Task 10 – Send draft to NeuronWriter editor

- Execute the HTTP request to update the content in NeuronWriter.[^1]
- Confirm success from response.
- Output:
    - `editor_link` or identifier that a human can use to open the article in NeuronWriter.
    - Status flag: `ready_for_human_edit = true`.[^1]

***

### Task 11 – Notify human/editor (optional)

- Input:
    - `editor_link`
    - `blog_brief`.
- Trigger:
    - Email, Slack, or dashboard update informing the editor that a draft is ready in NeuronWriter.[^1]
- Output:
    - Confirmation that notification was sent.

***

This sequence is now decomposed into clear agent‑friendly tasks: each task has inputs, processing, and outputs, so you can assign them to one agent or multiple collaborating agents.

Which part of this agent sequence do you want to implement first in your own setup: the NeuronWriter analysis side (Tasks 1–3, 9–10) or the Claude outline + writing side (Tasks 4–8)?

<div align="center">⁂</div>

[^1]: neuronwriter.txt

