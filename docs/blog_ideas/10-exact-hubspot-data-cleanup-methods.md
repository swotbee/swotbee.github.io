> **Idea backlog, not scheduled.** Saved 2026-07-25 for a future pillar article on HubSpot
> data cleanup/hygiene, plus a companion LinkedIn post used as a lead-magnet link back to
> the pillar once it's published. Run this through the standard SEO content pipeline
> (`docs/plans/seo-content-pipeline-neuronwriter-merged.md`) when picked up: gap-check
> against existing posts first, since data-quality themes already touch several published
> articles (deal duplication, deal deduplication vs cloning, property setup).

## 10 Exact, Step-By-Step HubSpot Data Cleanup Playbooks

This playbook translates the general "RevOps data cleaning" principles into 10 concrete, executable workflows inside HubSpot. Each method lists the exact navigation path, settings, and actions to take — no abstract frameworks.

### 1. Merge Duplicate Contacts & Companies with HubSpot's Native Dedup Tool

HubSpot ships an AI-powered duplicate management tool built into the core CRM that scores likely duplicate pairs using name, email, IP-derived country, phone, zip code, and company name.[^1]

- Go to **Contacts** (or **Companies**) home screen → click **Actions** → **Manage Duplicates**.[^1]
- Review each suggested pair on the side-by-side comparison screen; HubSpot highlights which fields differ.
- Click **Merge** if it's a true duplicate (the tool auto-selects the record with more complete/recent data as primary, but you can override); click **Not a duplicate** to dismiss and train the model.[^1]
- For record-level control, deduplication can also be triggered by matching on email address, company domain name, record ID, or a custom unique ID property under **Settings → Objects → [Object] → Deduplication**.[^2]
- Repeat weekly for Contacts, Companies, Deals, and Tickets — each object has its own duplicate queue.[^3]

### 2. Run a Marketplace Deduplication App for Bulk/Automated Merges

Native dedup only surfaces pairs one at a time; for large backlogs use a marketplace app like Insycle, Dedupely, or Koalify to bulk-merge and set standing rules.[^4]

- Install the app from the HubSpot Marketplace (search "Data Quality and Backup" category).[^4]
- In Koalify (example), go to **Duplicate Rules** and define primary match rules (e.g., email exact match) and secondary formatting rules (e.g., ignore case/spacing in company names).[^5]
- Set the "Master Record" logic (e.g., keep the record with the most recent activity or the one owned by Sales) so merges don't overwrite good data with blank fields.[^5]
- Turn on **Automated Merging** for future incoming duplicates, then run a one-time bulk merge job against your existing database.[^5]
- Validate a sample of 20-30 merged records manually before trusting the automation at scale.

### 3. Audit and Prune Property Bloat

Every unused custom property adds clutter and slows reporting; HubSpot recommends a recurring property audit.[^1]

- Go to **Settings → Properties**, filter by object (Contact, Company, Deal, Ticket).
- Sort by **"Last used"** or check usage via the **Data Quality Command Center** which flags unused properties directly.[^6]
- For each property with zero recent usage: check if it's referenced in any active list, workflow, or report (search in **Settings → Automation → Workflows** and **Reports** for the property name).
- If unused anywhere, export the historical values via a one-time list export, then delete the property from **Settings → Properties → [property] → Delete**.
- Schedule this audit every 90 days as a recurring calendar task for the RevOps owner.

### 4. Standardize Data Entry with Property Validation Rules

Prevent dirty data at the point of entry rather than cleaning it after the fact.[^6]

- Go to **Settings → Properties**, select the target property (e.g., Phone Number, Job Title, State/Region).
- Click **Edit** → **Validation** tab (available for text, number, and phone properties on paid tiers).
- Set format rules: e.g., require phone numbers to match a specific pattern, restrict a dropdown/picklist instead of free text for fields like "Lead Source" or "Industry."
- For picklists, go to **Field type → Dropdown select** and manually enumerate the exact allowed values to eliminate free-text variants (e.g., "USA," "U.S.," "United States" all becoming one option).
- Apply this to every property currently causing reporting fragmentation — check existing property values first via a quick export to identify variant spellings.

### 5. Enable AI-Powered Formatting Automation Rules

HubSpot's Data Quality Automation uses AI to detect formatting inconsistencies (capitalization, spacing) and generate one-click fix rules.[^6]

- Navigate to **Settings → Data Management → Data Quality Automation** (Operations Hub Professional/Enterprise or Data Hub required).[^7][^6]
- Review the AI-suggested rules (e.g., "Capitalize first letter of Company Name," "Trim leading/trailing spaces in Email").
- Click **Accept and enable** on each rule you approve — this applies retroactively to your existing database and prospectively to new records.[^6]
- Check back monthly, as HubSpot surfaces new suggested rules as your data evolves.

### 6. Build a Workflow to Flag and Update Decaying Contacts

Data decay (stale job titles, disengaged contacts, outdated companies) needs a systematic detection workflow, not manual review.[^1]

- Go to **Automation → Workflows → Create workflow → Contact-based**.
- Set enrollment trigger: "Sends Since Last Engagement" is greater than 16 (or your chosen threshold).[^1]
- Add a branch: if **Last Activity Date** is more than 180 days ago AND **Lifecycle Stage** is not "Customer," set a custom property "Data Health Status" = "Needs Review."
- Add an internal notification action to alert the record owner, or auto-assign a task: "Verify contact is still active."
- For the unengaged-email suppression side, go to any marketing email → **Recipients** → check the **"Don't send to unengaged contacts"** box to auto-exclude anyone unresponsive to the last 16 sends.[^1]

### 7. Enforce Mandatory Associations Between Contacts, Companies, and Deals

Disconnected records break attribution and pipeline reporting.[^1]

- Go to **Automation → Workflows → Create workflow → Contact-based**.
- Trigger: "Associated Company" is unknown/empty.
- Action: create a task assigned to the record owner: "Associate this contact with a company record" — do this rather than auto-guessing associations, since wrong auto-associations create worse data.
- For Deals, add a required property: **Settings → Properties → Deal → "Primary Contact"** → mark as required at the deal-stage level via **Deal Stage Properties** so reps cannot advance a deal without an associated contact.
- Run a one-time report (**Reports → Custom Report Builder**, object = Contacts, filter = "Company name" is unknown) to find and manually fix the existing backlog before relying on the workflow for new records.

### 8. Deploy Import Error Handling for Every CSV/Bulk Upload

Bad data most often enters through imports; HubSpot's import tool has a built-in validation gate.[^6]

- Before importing, go to **Contacts → Import → Start an import**, and map your CSV columns to existing HubSpot properties (never auto-create new properties for typos of existing ones).
- Use HubSpot's **Import Preview** screen, which flags rows with invalid emails, malformed dates, or mismatched formats before finalizing.[^6]
- Fix flagged rows in the source CSV and re-upload rather than importing with errors "to fix later."
- After import completes, immediately run the **Manage Duplicates** tool (Method 1) on the imported object, since bulk imports are the top source of new duplicates.

### 9. Set Up a Recurring Data Quality Command Center Review

Treat data hygiene as a monitored KPI, not a one-time cleanup.[^6]

- Go to **Settings → Data Management → Data Quality Command Center** (Operations Hub Pro/Enterprise).[^6]
- Review the dashboard sections: unused properties, formatting issues, duplicate counts, and data sync bottlenecks.
- Assign a specific RevOps owner to review this dashboard on a fixed cadence (weekly recommended) and log the duplicate count and formatting-issue count in a tracking sheet to measure trend over time.
- Address each flagged category using the corresponding method above (duplicates → Method 1/2, formatting → Method 5, unused properties → Method 3).

### 10. Validate Third-Party Integration Sync Health to Stop Data Corruption at the Source

Data cleaning fails long-term if a broken integration keeps re-injecting bad data.[^6]

- Go to **Settings → Integrations → Connected Apps**, and for each sync (Salesforce, marketing tools, enrichment apps), click into **Sync Health**.
- Review the **Sync Errors** log for field-mapping mismatches or failed syncs — these often silently create blank or duplicate values.
- Fix the specific field mapping causing errors (e.g., a picklist mismatch between two systems) rather than just re-running the sync.
- For enrichment, consider enabling **Smart CRM enrichment** in Data Hub, which pulls missing details from emails, calls, and meeting notes automatically, or a marketplace enrichment app like SalesIntel or ClearoutPhone for the missing-value backlog.[^8][^4]

## Sequencing Recommendation

For a first-time full cleanup, run these in order: Method 8 (stop new bad data from imports) → Method 4/5 (lock down formatting and validation) → Method 1/2 (bulk dedup the backlog) → Method 3 (property audit) → Method 7 (fix associations) → Method 6 (decay workflow) → Method 9/10 (ongoing monitoring). This sequencing stops the bleeding before cleaning the wound, consistent with HubSpot's own guidance that prevention (validation, import error handling) should precede reactive cleanup.[^1][^6]

---

## References

1. [Here's How I Use HubSpot's De-duplication Tool](https://blog.hubspot.com/customers/the-ultimate-guide-to-your-new-deduplication-tool-hubspot) - The new duplicate management tool uses AI to find duplicate contacts and companies: less hassle for ...

2. [Deduplicate records in HubSpot](https://knowledge.hubspot.com/records/deduplication-of-records) - Learn how to automatically and manually deduplicate records in HubSpot. Email address, company domai...

3. [Mastering HubSpot Deduplication - - ConsultEvo](https://consultevo.com/hubspot-deduplication-guide/) - Learn how to use HubSpot deduplication to find and merge duplicate contacts, companies, deals, and t...

4. [Data Quality and Backup Apps](https://ecosystem.hubspot.com/marketplace/apps/data-quality-backup) - Compare the different Data Quality and Backup integrations with HubSpot. These apps help you extend ...

5. [How to Deduplicate Your HubSpot Contacts and Companies (this App is amazing!)](https://www.youtube.com/watch?v=p8C6H0Gralc) - Struggling with duplicate contacts and companies in HubSpot? This step-by-step guide walks you throu...

6. [[Heads Up] New Data Quality Tools Now Available!](https://community.hubspot.com/t/heads-up-new-data-quality-tools-now-available/64615) - Our new data quality tools help you keep your data clean, clear, and under control so you can be mor...

7. [Data Management Software for Scaling Businesses](https://www.hubspot.com/products/data) - Use HubSpot's data management software to combine and enhance data data quality, and automate busine...

8. [Keep Data Clean with Data Quality Software](https://www.hubspot.com/products/data-quality-software) - Our AI-powered data quality overview continuously monitors your entire database, automatically fixin...

