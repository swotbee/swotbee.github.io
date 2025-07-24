<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# CRM Workflow for Sales Team Operations

1. Lead Generation
1.1. Identify target market segments
1.1.1. Research industry verticals
1.1.2. Compile ideal customer profile (ICP) criteria
1.1.3. Validate ICP with stakeholders
1.2. Build lead sources list
1.2.1. External purchased lists
1.2.2. Website form captures
1.2.3. Trade show attendees
1.2.4. Webinar registrants
1.2.5. Referral programs
1.3. Configure lead capture forms
1.3.1. Define required fields
1.3.2. Embed forms on website
1.3.3. Implement spam filters (e.g., CAPTCHA)
1.3.4. Test form submissions
1.4. Set up web-to-CRM integration
1.4.1. Map form fields to CRM fields
1.4.2. Configure API or batch ingestion
1.4.3. Validate sample records
1.5. Launch paid acquisition campaigns
1.5.1. Select channels (LinkedIn, Google Ads)
1.5.2. Define campaign budgets and bids
1.5.3. Create ad copy and assets
1.5.4. Set conversion tracking
1.5.5. Monitor and optimize daily
1.6. Automate inbound lead routing
1.6.1. Define routing rules (region, segment)
1.6.2. Implement CRM assignment workflows
1.6.3. Test routing for edge cases
1.6.4. Notify reps via email/Slack
Dependencies:
    - ICP criteria defined
    - CRM admin access configured
Outcomes:
    - Leads ingested into CRM
    - Notification sent to SDR queue
2. Lead Qualification
2.1. Enrich lead data
2.1.1. Append firmographic data via enrichment API
2.1.2. Verify email and phone validity
2.1.3. Score leads based on ICP match
2.2. Implement lead scoring model
2.2.1. Define scoring attributes (activity, fit)
2.2.2. Assign weightings to attributes
2.2.3. Automate score calculation in CRM
2.3. Set threshold for qualified leads
2.3.1. Determine minimum score for qualification
2.3.2. Configure CRM to tag “Qualified”
2.4. Manual review of borderline leads
2.4.1. Create “Review Queue” view
2.4.2. SDRs assess contextual factors
2.4.3. Approve or disqualify
2.5. Disposition unqualified leads
2.5.1. Tag as “Disqualified” with reason
2.5.2. Route to nurture campaign
2.5.3. Archive or delete per data policy
Decision Points:
    - Score ≥ threshold → Qualified
    - Score < threshold → Disqualify or review
Dependencies:
    - Scoring model deployed
Outcomes:
    - Leads tagged for next stage
    - Nurture list populated
3. Lead Nurturing
3.1. Design nurture workflows
3.1.1. Define segments (industry, role)
3.1.2. Map content assets to buyer stage
3.1.3. Sequence emails and tasks
3.2. Build email templates
3.2.1. Personalization tokens setup
3.2.2. Mobile-responsive verification
3.2.3. A/B test subject lines
3.3. Configure automation in CRM/marketing tool
3.3.1. Create trigger “Disqualified” or “Low Score”
3.3.2. Set wait periods and branches
3.4. Monitor nurture performance
3.4.1. Track open and click rates
3.4.2. Evaluate conversions to MQL
3.4.3. Adjust cadence or content
Dependencies:
    - Content assets approved
Outcomes:
    - Increased engagement
    - Leads re-qualified or moved to MQL
4. Marketing Qualified Lead (MQL) Handoff
4.1. Define MQL criteria with sales
4.1.1. Agree on demographic and behavioral thresholds
4.1.2. Document SLAs for response times
4.2. Automate MQL tagging
4.2.1. Configure CRM field update
4.2.2. Notify sales manager and SDRs
4.3. Create assignment rules
4.3.1. Round-robin among SDRs
4.3.2. Territory-based assignment
4.4. Track SLA compliance
4.4.1. Monitor time from MQL to outreach
4.4.2. Alert overdue assignments
Decision Points:
    - SLA met → proceed
    - SLA breached → escalate to manager
Dependencies:
    - SLAs defined
Outcomes:
    - Qualified leads in SDR pipeline
    - SLA dashboard updated
5. Sales Development Outreach
5.1. Prepare outreach sequences
5.1.1. Email cadence design
5.1.2. Call task creation
5.1.3. LinkedIn touchpoints
5.2. Execute first-touch email
5.2.1. Personalize messaging
5.2.2. Schedule send time by zone
5.3. Log call and email activities
5.3.1. Use CRM call logging
5.3.2. Record outcomes and next steps
5.4. Apply conditional wait logic
5.4.1. If reply → escalate to next stage
5.4.2. If no reply in 3 days → send follow-up
5.5. Escalate positive responses
5.5.1. Tag lead as “Sales Accepted Lead” (SAL)
5.5.2. Notify AE team
Decision Points:
    - Positive response → SAL
    - No response after sequence → Disposition or nurture
Dependencies:
    - Sequences configured
Outcomes:
    - SAL ready for qualification call
    - Inactive leads re-nurtured
6. Sales Accepted Lead (SAL) Qualification
6.1. Schedule discovery call
6.1.1. Use meeting link integration
6.1.2. Confirm timezones and attendees
6.2. Prepare call agenda
6.2.1. Research company and prospect profile
6.2.2. Identify pain points and use cases
6.3. Conduct qualification call
6.3.1. Verify budget, authority, need, timeline (BANT)
6.3.2. Document call notes in CRM
6.4. Score qualification outcome
6.4.1. Qualified → Opportunity creation
6.4.2. Unqualified → Lead nurturing or disqualify
Decision Points:
    - BANT passed → Opportunity
    - BANT failed → Nurture or disqualify
Dependencies:
    - SAL assigned
Outcomes:
    - Opportunity record created
    - Unqualified lead routed back
7. Opportunity Management
7.1. Opportunity creation in CRM
7.1.1. Populate deal value and close date
7.1.2. Assign AE owner
7.2. Develop sales proposal
7.2.1. Customize pricing and terms
7.2.2. Generate proposal document
7.3. Internal review and approval
7.3.1. Discount approval routing if > threshold
7.3.2. Legal review for nonstandard terms
7.4. Send proposal to prospect
7.4.1. E-signature integration setup
7.4.2. Follow-up reminder scheduling
Dependencies:
    - Opportunity record exists
Outcomes:
    - Proposal sent
    - Approval audit trail logged
8. Negotiation \& Contracting
8.1. Track prospect feedback
8.1.1. Log objections and requests
8.1.2. Update proposal versioning
8.2. Manage contract revisions
8.2.1. Collaborate with legal via contract management tool
8.2.2. Version compare and finalize
8.3. Obtain signatures
8.3.1. Send via DocuSign or equivalent
8.3.2. Confirm receipt and countersign
8.4. Update CRM with contract status
Decision Points:
    - Contract signed → proceed to onboarding
    - Prospect declines → close-lost
Dependencies:
    - Proposal accepted
Outcomes:
    - Contract executed
    - Lost reason documented
9. Order Fulfillment \& Handoff to Customer Success
9.1. Notify operations team of new sale
9.2. Kick off implementation project
9.2.1. Assign project manager
9.2.2. Schedule kick-off meeting
9.3. Update post-sale CRM fields
9.4. Transition ownership to Customer Success
Dependencies:
    - Contract execution
Outcomes:
    - Implementation launched
    - Customer Success notified
10. Post-Sale Feedback \& Upsell Identification
10.1. Send customer satisfaction survey after onboarding
10.2. Monitor usage metrics for adoption signals
10.3. Identify upsell or cross-sell opportunities
10.4. Route opportunity back to AE
Dependencies:
    - Customer onboarded
Outcomes:
    - NPS score recorded
    - Upsell pipeline populated

36. Poor Lead Handoff Protocols  
   Type: Problem  
   Workflow reference: “Optimizing Lead Handoff Between Marketing and Sales” – HubSpot Blog  

   Common Position in Workflow  
   Located in the **Marketing to Sales Handoff** phase—after lead qualification and before sales engagement.  

   Ways to reach this task: Before  
   36.1. Leads assigned manually with no SLA tracking  
       36.1.1. Marketing marks lead as MQL  
       36.1.2. Lead sits unassigned in CRM  
       36.1.3. Wait times exceed benchmarks  
   36.2. Lack of defined follow-up cadence  
       36.2.1. SDRs receive leads sporadically  
       36.2.2. No time-bound tasks or alerts  
       36.2.3. Leads fall through cracks  
   36.3. Leads bounced back without feedback loop  
       36.3.1. Sales rejects lead as unqualified  
       36.3.2. Lead reset to marketing queue  
       36.3.3. No explanation shared  

   Before the Task  
   36.4. Agree on lead qualification SLA (e.g., <24 hours)  
   36.5. Define lead scoring and handoff criteria  
   36.6. Set up automated task assignment and notification  

   After the Task  
   36.7. Trigger tasks or sequences for SDR outreach  
   36.8. Sales logs lead status updates back to marketing  
   36.9. Monitor lead aging and re-queue as needed  

   Ways to handle or act after this task  
   36.10. Implement SLA enforcement with automated alerts  
       36.10.1. Track lead time in queue  
       36.10.2. Alert managers on delays  
       36.10.3. Escalate priority leads that breach SLAs  
   36.11. Use a shared dashboard for sales & marketing alignment  
       36.11.1. Show real-time lead counts, aging, and conversion rates  
       36.11.2. Provide transparency through joint dashboards  
       36.11.3. Review metrics in weekly lead-handoff meetings  
   36.12. Automate feedback collection on lead quality  
       36.12.1. Sales reps submit lead feedback via a simple CRM form  
       36.12.2. Marketing evaluates feedback to refine scoring  
       36.12.3. Iterate the handoff process on a quarterly basis for continuous improvement

37. Implement SLA Enforcement with Automated Alerts  
   37.1. Define SLA thresholds for lead response (e.g., 4 hours, 8 hours)  
   37.2. Configure CRM to calculate time elapsed since assignment  
   37.3. Set up alert rules:  
       * Lead uncontacted after 50% of SLA → Send reminder email to SDR  
       * Lead uncontacted after 100% of SLA → Escalate to SDR manager  
   37.4. Test alert workflows with sample leads  
   37.5. Monitor alert effectiveness and adjust thresholds  

38. Use a Shared Dashboard for Sales & Marketing Alignment  
   38.1. Identify key metrics to display:  
       * Leads by status (New, Contacted, SAL, Disqualified)  
       * Average time to first contact  
       * Lead aging distribution  
       * Conversion rates by source  
   38.2. Select BI tool or CRM dashboard feature  
   38.3. Design dashboard layout with separate views for Sales and Marketing  
   38.4. Automate data refresh (real-time or hourly)  
   38.5. Grant access and set view permissions  
   38.6. Schedule weekly alignment meeting with dashboard review  

39. Automate Feedback Collection on Lead Quality  
   39.1. Create simple CRM form for SDRs to rate lead quality (1–5) and provide comments  
   39.2. Embed feedback form in follow-up task workflow  
   39.3. Trigger quarterly survey to SDRs for high-volume lead sources  
   39.4. Aggregate feedback into a report segmented by lead source and conversion outcome  
   39.5. Schedule quarterly review sessions with Marketing to refine lead scoring  

40. Monitor Lead Aging and Re-Queue as Needed  
   40.1. Define maximum acceptable aging per lead stage (e.g., 48 hours for New, 72 hours for Contacted)  
   40.2. Configure CRM to flag leads exceeding aging thresholds  
   40.3. Automate re-queue logic:  
       * If lead > threshold in New → Reassign to next-available SDR  
       * If lead > threshold in Contacted → Move back to Nurture cycle  
   40.4. Log re-queue events for auditing  
   40.5. Analyze aging trends monthly and adjust thresholds  

41. Establish Continuous Improvement Loop  
   41.1. Define KPIs for lead handoff efficacy (e.g., SLA compliance rate, lead-to-SAL conversion)  
   41.2. Set up monthly KPI report distribution to Sales, Marketing, and RevOps  
   41.3. Conduct cross-functional retrospectives to identify bottlenecks  
   41.4. Prioritize enhancements (scoring tweaks, SLA adjustments, automation refinements)  
   41.5. Implement and test improvements in a sandbox environment before production rollout  

42. Integrate Handback Mechanism for Disqualified Leads  
   42.1. When SDR disqualifies a lead, require selection of standardized disqualification reason  
   42.2. Tag disqualified leads and route back to Marketing with feedback  
   42.3. Automate creation of nurture tasks based on disqualify reason (e.g., missing budget, wrong persona)  
   42.4. Track re-engagement rate of disqualified leads after nurture  
   42.5. Review disqualify reasons quarterly to update scoring model  

43. Provide Real-Time Hand-off Notifications via Collaboration Tools  
   43.1. Integrate CRM with Slack/Microsoft Teams  
   43.2. On assignment or hand-off, post message to designated channel with lead details  
   43.3. Tag responsible SDR and manager in notification  
   43.4. Include direct links to CRM record and related materials  
   43.5. Monitor notification engagement (click-through rates)  

44. Implement Lead Handoff Quality Scorecard  
   44.1. Define quality dimensions: completeness of data, speed of handoff, conversion follow-up  
   44.2. Develop scoring algorithm combining SLA compliance and SDR feedback  
   44.3. Display scorecard metrics on team dashboards  
   44.4. Recognize top-performing SDRs monthly  
   44.5. Use scorecard insights to identify training needs  

45. Document and Standardize Handoff Procedures  
   45.1. Draft a lead handoff playbook describing each step, role, and tool used  
   45.2. Include decision trees for edge cases (e.g., foreign leads, enterprise accounts)  
   45.3. Host playbook in a shared knowledge base (e.g., Confluence)  
   45.4. Conduct quarterly training refreshers and updates  
   45.5. Solicit feedback from SDRs to continuously improve documentation  

46. Scale Handoff Automation for New Business Units  
   46.1. Review existing handoff workflows for regional and product-specific adaptations  
   46.2. Parameterize routing rules to handle multiple territories or lines of business  
   46.3. Create template workflows for rapid onboarding of new teams  
   46.4. Test multi-unit routing in staging before production  
   46.5. Monitor performance and adjust templates as new units onboard  

47. Ensure Compliance and Privacy During Handoff  
   47.1. Redact or mask PII fields when required by region-specific regulations  
   47.2. Enforce consent flags before SDR outreach  
   47.3. Log consent status and handoff events in audit trail  
   47.4. Conduct bi-annual privacy compliance reviews  
   47.5. Update workflows promptly when regulations change  

48. Leverage AI for Intelligent Lead Prioritization at Handoff  
   48.1. Integrate predictive scoring models into lead assignment logic  
   48.2. Automatically surface top-tier leads to senior SDRs  
   48.3. Adjust machine-learning models with SDR feedback  
   48.4. Provide real-time recommendations in CRM dashboards  
   48.5. Evaluate AI prioritization impact quarterly and retrain models as needed  

49. Set Up Real-Time SLA Breach Escalation Paths  
   49.1. Define escalation hierarchy (SDR → SDR manager → Sales Director)  
   49.2. Automate escalation emails and notifications upon SLA breach  
   49.3. Log escalations and resolutions for audit  
   49.4. Review escalation frequency and outcomes monthly  
   49.5. Optimize escalation criteria based on historical breach patterns  

50. Review and Optimize Handoff Workflow Quarterly  
   50.1. Assemble cross-functional review team (Sales, Marketing Ops, RevOps)  
   50.2. Analyze performance metrics and highlight improvement areas  
   50.3. Prioritize workflow change requests for next quarter  
   50.4. Implement changes in sandbox and validate via pilot group  
   50.5. Communicate updates and retrain teams on revised process
