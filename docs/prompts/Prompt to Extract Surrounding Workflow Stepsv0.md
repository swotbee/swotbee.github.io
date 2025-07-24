<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# Prompt to Extract Surrounding Workflow Steps

Use the following prompt to identify the exact position of a given marketing or sales automation task in a workflow, and to list the three steps immediately preceding it (“Before”) and the three steps immediately following it (“After”):

---
**Prompt:**

```
You are a workflow analyst. For each automation insight below—whether a problem, a successful implementation, or a tip—identify where it occurs in the overall marketing & sales process. Then provide:

1. Three steps that happen immediately before this task ✦ Before  
2. Three steps that happen immediately after this task ✦ After  

Structure your answer as:

• Item: <Name of the insight>  
• Type: <Problem/Success/Tip>  
• Before:  
   1. <Step immediately preceding>  
   2. <Step two preceding>  
   3. <Step three preceding>  
• After:  
   1. <Step immediately following>  
   2. <Step two following>  
   3. <Step three following>  

Use concise, actionable process step names (e.g., “Capture lead form submission,” “Enrich contact data,” “Send initial outreach email”).  
If an insight could fit multiple points in the workflow, choose the most common or highest-impact placement.  
```


---

**Example Application:**

Given the insight

```
Item: Inconsistent Email Outreach  
Type: Problem  
```

Your response should be:

- Item: Inconsistent Email Outreach
- Type: Problem
- Before:

1. Identify target segment in CRM
2. Draft email templates
3. Schedule outreach sequence
- After:

1. Monitor email deliverability metrics
2. Review open/reply performance
3. Adjust templates and cadence

Use this prompt whenever you need to anchor any problem, success story, or tip/trick within its precise workflow context.

