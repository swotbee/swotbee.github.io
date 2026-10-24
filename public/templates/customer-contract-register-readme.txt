CUSTOMER-CONTRACT REGISTER: OPEN, ADAPT AND CHECK
Revision: CM-03 r1, 24 October 2026

WHAT YOU RECEIVE
customer-contract-register.csv: five illustrative entries and 19 columns.
customer-contract-repository-checklist.txt: copyable retrieval and correction test.
Read the guide at https://swotbee.com/posts/customer-contract-repository/ after
publication. The proposed route is not a currently available download dependency.

This is a repository working sheet containing values only. It has no formulas,
reminder engine, signatures, permission enforcement or HubSpot import mapping.
C-101 is a fictional customer key, not an actual CRM account or record ID.
There are no personal owner details. All evidence references are unsigned
placeholders. You cannot retrieve an executed document from these sample rows.

OPEN THE FILE
1. Download the CSV and these notes. Save a separate working copy.
2. In Excel use Data > From Text/CSV; choose UTF-8 and comma delimiter. In Google
   Sheets use File > Import > Upload and choose comma as the separator.
3. Preserve Entry ID, Customer ID, Parent ID and Document reference as text.
   Preserve dates as YYYY-MM-DD text until you deliberately convert them.
4. Confirm 19 columns, from Entry ID through Evidence location, and five data rows.
   If everything appears in one column, import again using comma as the delimiter.
   If dates display differently, inspect the original date text before saving.
5. After saving and reopening, confirm identities, dates and amounts still match.
   CSV cannot preserve spreadsheet formatting, extra sheets or access controls.

READ THE EXAMPLE
MSA-001: governing document; no standalone recurring value.
A-101: support, USD1,000 monthly; 2026-11-01 to 2027-10-31.
A-102: backup, USD250 monthly; 2026-12-01 to 2027-11-30.
A-103: onboarding, USD1,500 once; 2026-11-01 to 2026-11-30.
M101-1: isolated replacement-rate scenario, USD1,200 monthly from 2027-05-01.

Parent ID on A-101/A-102/A-103 points to MSA-001. Parent ID on M101-1 identifies
the agreement changed, A-101. Entry type tells you which relationship applies.
A larger system may need separate governing-document and change-target fields.
These A-101/A-102 labels are local to this example. The import guide's Company 42
and USD1,100 monthly control, and other guides' examples, are different datasets.
Do not combine them or assume the same labels identify the same records.

CHECK THE AMOUNTS AND DATES
From 2026-12-01, while both baseline agreements are active, monthly recurring
value is USD1,000 + USD250 = USD1,250. Onboarding stays USD1,500 one-time.
In the isolated amendment scenario from 2027-05-01, support's replacement rate
plus backup is USD1,200 + USD250 = USD1,450 monthly. Do not add USD1,200 on top of
the original support rate. This is not recognized revenue or invoice proration.
The example deadlines subtract 60 calendar days from each end date:
A-101: 2027-09-01. A-102: 2027-10-01. Changing a date does not recalculate them.

ADAPT WITHOUT CLAIMING COMPLETION
Replace the example with reviewed agreement identities and controlled document
references. Assign primary and backup owners; blanks are unresolved work, not
approval. Review source clauses before using notice dates. Obtain the approved
access and retention policy; do not infer permissions from a link that opens for
you. Add execution state, source clause, reviewer/date, access and retention
fields if required. Review state is not a substitute for all of these controls.

Use customer-contract-repository-checklist.txt to record expected and observed
results, evidence, correction owner and retest. Keep an unresolved record in
review until evidence, responsibility and access checks pass. If a document link
fails, keep the row, assign the access correction, restore approved access and
retest. Do not replace missing evidence with a draft marked as executed.

For CRM import, use a separate supported object/property/association mapping.
These five document/register entries are not five native HubSpot Contracts.
The published tracker covers dates; the record-map workbook covers field
responsibility; the import workbook covers migration reconciliation. This
register adds parent/change relationships and document retrieval acceptance.
