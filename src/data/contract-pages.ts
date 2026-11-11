// Copy grounded in the supplied consulting-v2 and contract_hubspot research.
// Product availability is confirmed by Sharmila. The anonymous ARR example is
// consulting experience, not revenue recovered or a measured result of the app.
export interface ContractPage {
  kind: "app" | "consulting";
  title: string;
  description: string;
  path: string;
  label: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  cta: string;
  enquirySubject: string;
  ctaNote: string;
  proofHeading: string;
  outcomesHeading: string;
  outcomesIntro: string;
  outcomes: { stage: string; title: string; description: string; points: string[]; detail: string; illustration: string }[];
  processHeading: string;
  processIntro: string;
  steps: { title: string; description: string; checks: string[]; result: string; illustration: number }[];
  visibility: { heading: string; description: string; items: { title: string; description: string; illustration: number }[] };
  workingNotes: { title: string; description: string }[];
  alternative: { title: string; description: string; label: string; href: string };
  faqs: { q: string; a: string }[];
  closingHeading: string;
  closingDescription: string;
}

export const contractApp: ContractPage = {
  kind: "app",
  title: "HubSpot Contract Management App",
  description: "Prepare agreements from HubSpot data, track signatures and automate renewals. Keep contract terms, owners and next steps connected in HubSpot.",
  path: "/hubspot-contract-management-app/",
  label: "HubSpot contract management app",
  headline: "Keep every contract moving.",
  headlineAccent: "Right inside HubSpot.",
  intro: "Prepare agreements from your deal data. See who needs to sign. Carry the agreed terms into handover and renewal, with owners and next steps in place.",
  cta: "Request an app walkthrough",
  enquirySubject: "contract-management-app",
  ctaNote: "See how it fits your HubSpot and signing tools.",
  proofHeading: "Built from our contract and renewal work.",
  outcomesHeading: "Less chasing. At every stage.",
  outcomesIntro: "The details you agree with a customer stay connected to the work that follows.",
  outcomes: [
    {
      stage: "Prepare", title: "Use the details you already have.",
      description: "Prepare the agreement from the customer and deal records your team already maintains in HubSpot.",
      points: ["Company, contact and custom deal fields in your templates", "Reusable contract sections for the services you sell", "Line items and pricing kept with the right deal"],
      detail: "Less copying between HubSpot and documents.", illustration: "quote-effort-clean-v3",
    },
    {
      stage: "Sign", title: "Know whose move it is.",
      description: "See signing progress in HubSpot and give the follow-up to the person responsible.",
      points: ["See which signatures are complete and which are outstanding", "Remind the owner when an agreement needs attention", "Keep the signed agreement linked to the customer and deal"],
      detail: "Sales can see what is holding up the agreement.", illustration: "response-speed-clean-v3",
    },
    {
      stage: "Renew", title: "Give every renewal a head start.",
      description: "Create the next renewal with the commercial details already in place, early enough for the account owner to act.",
      points: ["Carry line items, associations and ownership into the renewal", "Apply the agreed price uplift and contract timing", "Calculate the notice deadline and schedule follow-up before it"],
      detail: "Multi-year terms, bundles and co-terming follow your configured rules.", illustration: "renewal-results-clean-v3",
    },
  ],
  visibility: {
    heading: "Know what needs attention before the review.",
    description: "Open HubSpot with the questions your team actually needs answered.",
    items: [
      { title: "What renews next?", description: "See upcoming contracts by renewal window and value, with the owner and notice deadline beside them.", illustration: 6 },
      { title: "What is waiting on someone?", description: "Find agreements awaiting signature and renewal follow-ups that need action or escalation.", illustration: 4 },
      { title: "What information is missing?", description: "Spot contracts without an owner or end date so the missing details can be completed.", illustration: 2 },
    ],
  },
  processHeading: "Get your first contract workflow running.",
  processIntro: "We guide the setup around your portal, your tools and your contract rules.",
  steps: [
    { title: "Connect and configure", description: "Work with an authorised HubSpot admin to connect your tools and choose the first workflow.", checks: ["Confirm plans and permissions", "Map template fields and contract terms", "Choose the pipeline, owners and timing"], result: "Your first workflow configured", illustration: 8 },
    { title: "Preview the result", description: "Review the agreement data and a sample renewal before using the workflow with your team.", checks: ["Check customer and contact associations", "Review line items, dates and uplift", "Confirm who receives each follow-up"], result: "A result your team has checked", illustration: 9 },
    { title: "Choose how it runs", description: "Start with manual renewal creation. Enable scheduled or event-based automation when the rules are ready.", checks: ["Run the first example together", "Walk the owner through their next task", "Agree when to enable automation"], result: "Automation at your team’s pace", illustration: 10 },
  ],
  workingNotes: [],
  alternative: {
    title: "Need help with the wider process?",
    description: "Bring in our consulting team for historical contracts, complex handoffs or integrations across your business.",
    label: "Explore contract management consulting",
    href: "/services/contract-management-consulting/",
  },
  faqs: [
    { q: "How does this work with our signing tool?", a: "Document preparation and signing use your connected signing tool. The app brings the relevant deal data, signing status and follow-up into the HubSpot process. We confirm the supported workflow for your tool and plan during the walkthrough." },
    { q: "Can it handle different contract terms?", a: "Yes. Notice periods, multi-year terms, price uplifts, bundles and co-terming can be configured for your agreements. We review your examples during setup so the rules reflect how you sell and renew." },
    { q: "Which HubSpot plan do we need?", a: "The required plan depends on the objects, automation and integrations your workflow uses. We check your current subscriptions and explain any additional licence requirements before setup." },
    { q: "Can you help bring our existing contracts into HubSpot?", a: "Yes. Our consulting team handles historical contract migration, data structure and wider process changes. We agree that scope separately from the app setup." },
    { q: "What does the app cost?", a: "Request a walkthrough and tell us about your contract volume and tools. We explain app pricing, setup and any separate vendor costs before you decide." },
  ],
  closingHeading: "See your contract process in the app.",
  closingDescription: "Tell us which tools you use and where the work gets stuck. We’ll walk you through the relevant workflow.",
};

export const contractConsulting: ContractPage = {
  kind: "consulting",
  title: "Contract Management Consulting for HubSpot",
  description: "Connect quoting, signature, handover and renewal in HubSpot. Contract data, integrations and automation built around the way your team works.",
  path: "/services/contract-management-consulting/",
  label: "Contract management consulting",
  headline: "Connect your contract process.",
  headlineAccent: "From quote to renewal.",
  intro: "Give sales, finance and account teams the same contract details to work from. We bring your agreements, signing tools and renewal process together in HubSpot.",
  cta: "Discuss your contract process",
  enquirySubject: "contract-management-consulting",
  ctaNote: "Free 30-minute conversation with Sharmila or Siva.",
  proofHeading: "The contract work behind the numbers.",
  outcomesHeading: "One agreement. A process that follows through.",
  outcomesIntro: "From the first quote to the next renewal, each team has the information it needs to act.",
  outcomes: [
    {
      stage: "Prepare", title: "Send an agreement you’re confident in.",
      description: "Connect customer details, pricing and approvals to the way your team prepares quotes and contracts.",
      points: ["Map company, contact and deal data into your templates", "Structure complex line items and multi-location quotes", "Define pricing checks and who approves exceptions"],
      detail: "Our work includes multi-building quoting and branded PandaDoc templates.", illustration: "quote-effort-clean-v3",
    },
    {
      stage: "Hand over", title: "Give the next team what they need.",
      description: "Keep signing progress and agreed terms with the right deal, then connect the information finance and delivery need.",
      points: ["Link the agreement to the right customer and deal", "Agree field mappings, responsibilities and handoff triggers", "Validate the data needed by finance and delivery systems"],
      detail: "Your existing signing and operational tools are part of the process.", illustration: "response-speed-clean-v3",
    },
    {
      stage: "Renew", title: "See the renewal before it becomes urgent.",
      description: "Bring historical agreements and future renewals into a process the account team can work from.",
      points: ["Migrate contract dates, values and customer relationships", "Set notice periods, owners and escalation rules", "Create renewal deals with line items and value calculations"],
      detail: "Review upcoming renewals by date, value and owner.", illustration: "renewal-results-clean-v3",
    },
  ],
  visibility: {
    heading: "Agree what a working process has to show.",
    description: "We test the questions sales, finance and account teams need to answer in everyday work.",
    items: [
      { title: "Can sales see the next action?", description: "The agreement is linked to the right deal, signing progress is visible and follow-up has an owner.", illustration: 2 },
      { title: "Can finance use the agreed terms?", description: "Contract values, line items and dates are mapped and checked against the information the next system needs.", illustration: 0 },
      { title: "Can the account team work the renewal?", description: "The renewal appears in the right pipeline with the notice deadline, owner and commercial details in place.", illustration: 7 },
    ],
  },
  processHeading: "Start with the part that slows you down.",
  processIntro: "Bring one workflow or several connected teams. We agree the priority and the result together.",
  steps: [
    { title: "Understand the work", description: "Meet stakeholders and daily users, then confirm our understanding with your decision-makers.", checks: ["Map the current process and tools", "Review representative agreements", "Identify where data or ownership is lost"], result: "A shared view of the priority", illustration: 3 },
    { title: "Agree the approach", description: "Compare configuration, app and integration options before agreeing the work and its completion criteria.", checks: ["Explain dependencies and trade-offs", "Define deliverables, costs and milestones", "Agree the scenarios that must pass"], result: "A scope you can assess", illustration: 8 },
    { title: "Build and validate", description: "Configure the process, migrate agreed data and demonstrate the work using your business scenarios.", checks: ["Check field mappings and contract values", "Test handoffs, renewals and exceptions", "Review feedback and agree refinements"], result: "A process you’ve seen in action", illustration: 9 },
    { title: "Hand over for everyday use", description: "Walk the team through their tasks and give administrators the information needed to maintain the setup.", checks: ["Provide documentation and useful walkthroughs", "Confirm process and system owners", "Agree support and remaining actions"], result: "Your team ready to take over", illustration: 10 },
  ],
  workingNotes: [
    { title: "A consistent main contact", description: "Sharmila or Siva remains your main contact, with specialists matched to the agreed scope." },
    { title: "Progress you can follow", description: "Weekly updates cover progress, blockers and delays. Demonstrations happen at agreed milestones." },
    { title: "Changes agreed with you", description: "We explain proposed changes and agree their effect on scope, cost and timing before proceeding." },
  ],
  alternative: {
    title: "Looking for the contract management app?",
    description: "See the product for agreement preparation, signing follow-up and automated renewals inside HubSpot.",
    label: "Explore the contract management app",
    href: "/hubspot-contract-management-app/",
  },
  faqs: [
    { q: "Can we improve the tools and workflows we already have?", a: "Yes. We start by reviewing what works and where your team still repeats work or loses information. We agree the changes with you, including the role of your existing signing, finance and delivery tools." },
    { q: "Our contracts are in spreadsheets and shared drives. Where do we start?", a: "We identify the agreements, terms and relationships needed for the process, then map them into HubSpot. The migration scope includes checks for missing dates, values and owners, with your team reviewing the results." },
    { q: "Does the engagement include the app?", a: "We recommend the combination of HubSpot configuration, our app and integrations that fits the agreed process. Your proposal explains which parts are included and separates implementation, app subscriptions and other vendor costs." },
    { q: "Who will we work with?", a: "Sharmila or Siva remains your main contact, with specialists matched to the project. We work with the people responsible for sales, finance, delivery and renewals, and demonstrate the work at agreed milestones." },
    { q: "How long does it take, and what does it cost?", a: "That depends on your contract data, integrations and process. After the free initial conversation, we agree deliverables, dependencies, milestones and costs before implementation. A focused workflow can be scoped on its own." },
  ],
  closingHeading: "Where does contract work slow down for you?",
  closingDescription: "Bring a quoting bottleneck, a handoff that needs chasing or a renewal process you want to improve. Let’s work out where to start.",
};
