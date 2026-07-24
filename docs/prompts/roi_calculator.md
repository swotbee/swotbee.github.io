
<!-- ============ ROI CALCULATOR ============ --> (id="roi"), headline
  "How Much Revenue Is Hiding In Your Renewals?".
  
  CURRENT STATE
  Three range sliders and two result cards, driven by inline vanilla JS:
  - #roi-renewals (renewals/year, 50-5000, default 500)
  - #roi-acv (average contract value, 1000-250000, default 25000)
  - #roi-slip (slip/churn %, 1-30, default 8)
  - Output #roi-risk = renewals * acv * (slip/100)  ("Revenue at risk / year")
  - Output #roi-recover = 70% of risk  ("Potentially recoverable")
  Keep this math and both result cards. Keep the existing disclaimer copy,
  the "Find My Hidden Renewal Revenue" CTA to /contactus, and the v6 design
  tokens (v6-copper, v6-teal, v6-dark, v6-bg, v6-border) plus the reveal/
  stagger animation classes already used in the file.

  Let this be on one side of the page. On the right side, lets have a graph that shows
  these estimates and effects over the years. The lines should be thick and follow the same 
  color and style as the rest of the page
  
  ADD FIVE SELECTORS ABOVE THE SLIDERS (styled as dropdowns/segmented
  controls consistent with the section). Each selection updates the sliders,
  labels, and copy live. Separation of concerns:
  
  1) INDUSTRY (sets renewals default, ACV default, the noun labels, and the
     "biggest leak" line). Baseline values assume a mid-market 50-100
     employee firm: 
     - Energy / utilities: renewals 300, ACV 50000, noun "service agreements",
       leak "multi-year escalations that never get applied"
     - Field service: 800, 12000, "maintenance contracts / AMCs",
       leak "high-volume renewals slipping unnoticed"
     - Industrial / manufacturing: 200, 80000, "service contracts",
       leak "year-3 multi-year deals HubSpot never creates"
     - MSP (managed services): 600, 18000, "managed-services contracts",
       leak "monthly churn compounding across MRR"
     - IoT: 350, 30000, "device + subscription contracts",
       leak "hardware-plus-subscription renewals falling through"
     - SaaS: 700, 15000, "subscriptions",
       leak "expansion revenue left on the table"
     - Proptech: 300, 22000, "platform contracts",
       leak "renewal dates tracked off-CRM"
     When industry changes, relabel the "renewals per year" and "average
     contract value" slider labels to use that industry's noun (e.g. for MSP:
     "Managed-services contracts per year", "Average contract value (MRR x 12)").
     
  2) COMPANY SIZE (multiplies the industry's renewals and ACV defaults):
     - 25-49: renewals x0.5, ACV x0.85
     - 50-100: x1.0, x1.0 (baseline)
     - 101-250: x2.0, x1.3
     - 251-500: x4.0, x1.6
     
  3) HOW YOU TRACK RENEWALS TODAY (sets the slip % directly, overriding the
     slider):
     - Nothing / memory + calendars: 12%
     - Spreadsheets: 10%
     - A system / partial automation: 7%
     - Custom-built workflows: 5%  (also append to the leak line: "and the
       year-3 cliff when HubSpot loop protection stops creating deals")
       
  4) RENEWAL CADENCE (annual / six-month / quarterly / multi-year). Does not
     change the math; when "multi-year" is chosen, force the leak line to
     "year-3 multi-year deals HubSpot's loop protection silently stops 
     creating". Otherwise leave the industry leak line. 
     
  5) ROLE (reframes the OUTPUT only, never the sliders):
     - RevOps leader (default): card 1 label "Revenue at risk / year"
     - VP Sales / Revenue leader: card 1 label "ARR exposed to renewal leakage",
       helper "the slice of your forecast that leaks before it's booked"
     - Ops admin: keep the dollar card, ADD a small derived readout
       "~ {hours} hrs/year of manual renewal chasing" where 
       hours = round(renewals * 0.33)  (assume 20 min per renewal, tunable)
     - CS lead: card 1 label "Net revenue retention at risk", ADD readout
       "~ {slip} pts of gross retention at risk"
     - Founder / CEO: card 1 label "Total renewal revenue leaking each year"
     
  LIVE "SOUNDS LIKE YOU" VIGNETTE
  Below the sliders, render one sentence composed from the selections, e.g.
  "Sounds like a 50-100 employee field-service ops team tracking renewals in
  spreadsheets." Update it on every change.
  
  BEHAVIOR
  - Selecting industry cascades all defaults immediately so the visitor sees
    realistic numbers without typing; sliders remain draggable to refine.
  - Recompute risk and recoverable on every input/select change, as now.
  - Format currency with thousands separators; no decimals.
  
  DATA HONESTY
  These medians are typical mid-market estimates, not measured data. Do not
  present them as verified benchmarks. Keep the existing line that the free
  audit pressure-tests the numbers against real HubSpot data. 
  
  CONSTRAINTS
  - Tailwind v4 (via @tailwindcss/vite), Astro 5, vanilla JS inline in the
    page like the current calculator (no new framework/deps).
  - Follow the repo rule: never use em dashes or en dashes in any copy;
    use commas, colons, or parentheses.
  - After the change, run `npm run build` and fix any errors before finishing.
  
  One judgment call worth passing along: your SSR run found industry moved intent only about 3 points while pain severity (which the "how you track renewals today" selector proxies) moved it about 30. So industry is the recognition hook, but the tracking-method selector is what
  should actually swing the headline number. The prompt already wires it that way (workaround sets slip directly), but if you want the calculator to feel like it reacts most to how they work rather than what industry they're in, that's the reason.

