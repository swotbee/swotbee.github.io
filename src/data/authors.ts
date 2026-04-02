export interface Author {
  name: string;
  slug: string;
  bio: string;
  linkedin?: string;
  jobTitle: string;
  expertise: string[];
  imageUrl: string;
}

export const authors: Author[] = [
  {
    name: "SWOTBee Team",
    slug: "swotbee-team",
    bio: "HubSpot-certified consultants specializing in renewal pipeline architecture, RevOps automation, and CRM migration for mid-market B2B companies in Energy, Manufacturing, SaaS, and Construction.",
    linkedin: "https://linkedin.com/company/swotbee",
    jobTitle: "HubSpot Consultants",
    expertise: ["HubSpot CRM", "Renewal Pipelines", "Revenue Operations", "Marketing Automation", "CRM Integration"],
    imageUrl: "/assets/ico/logo.png",
  },
];

export function getAuthorByName(name: string): Author | undefined {
  return authors.find(a => a.name.toLowerCase() === name.toLowerCase());
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find(a => a.slug === slug);
}
