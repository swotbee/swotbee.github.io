/**
 * SEO Utility Functions for SWOTBee
 */

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

/**
 * Generate optimized title with site name
 */
export function generateTitle(pageTitle: string, includeSiteName: boolean = true): string {
  if (includeSiteName) {
    return `${pageTitle} | SWOTBee`;
  }
  return pageTitle;
}

/**
 * Generate meta description with optimal length
 */
export function generateDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) {
    return description;
  }
  return description.substring(0, maxLength - 3) + '...';
}

/**
 * Generate keywords string from array or comma-separated string
 */
export function generateKeywords(keywords: string[] | string): string {
  if (Array.isArray(keywords)) {
    return keywords.join(', ');
  }
  return keywords;
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string = ''): string {
  const baseUrl = 'https://swotbee.github.io';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Generate Open Graph image URL
 */
export function generateOgImage(imagePath?: string): string {
  if (imagePath) {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `https://swotbee.github.io${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  }
  return 'https://swotbee.github.io/assets/home-images/swotbee.png';
}

/**
 * Generate structured data for articles
 */
export function generateArticleStructuredData(seoData: SEOData) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": seoData.title,
    "description": seoData.description,
    "image": generateOgImage(seoData.image),
    "datePublished": seoData.publishedTime,
    "dateModified": seoData.modifiedTime || seoData.publishedTime,
    "author": {
      "@type": "Organization",
      "name": seoData.author || "SWOTBee",
      "url": "https://swotbee.github.io"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SWOTBee",
      "logo": {
        "@type": "ImageObject",
        "url": "https://swotbee.github.io/assets/home-images/swotbee.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": seoData.url || generateCanonicalUrl()
    },
    "articleSection": seoData.section || "HubSpot Consulting",
    "keywords": seoData.tags?.join(", ") || ""
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

/**
 * Generate robots meta tag value
 */
export function generateRobotsDirective(
  index: boolean = true,
  follow: boolean = true,
  options: {
    noarchive?: boolean;
    nosnippet?: boolean;
    noimageindex?: boolean;
    nocache?: boolean;
    maxSnippet?: number;
    maxImagePreview?: 'none' | 'standard' | 'large';
    maxVideoPreview?: number;
  } = {}
): string {
  const directives = [];

  if (!index) directives.push('noindex');
  if (!follow) directives.push('nofollow');
  if (options.noarchive) directives.push('noarchive');
  if (options.nosnippet) directives.push('nosnippet');
  if (options.noimageindex) directives.push('noimageindex');
  if (options.nocache) directives.push('nocache');

  if (options.maxSnippet !== undefined) {
    directives.push(`max-snippet:${options.maxSnippet}`);
  }

  if (options.maxImagePreview) {
    directives.push(`max-image-preview:${options.maxImagePreview}`);
  }

  if (options.maxVideoPreview !== undefined) {
    directives.push(`max-video-preview:${options.maxVideoPreview}`);
  }

  return directives.join(', ');
}

/**
 * Default SEO configuration
 */
export const defaultSEOConfig = {
  siteName: 'SWOTBee',
  siteUrl: 'https://swotbee.github.io',
  defaultImage: '/assets/home-images/swotbee.png',
  twitterHandle: '@swotbee',
  defaultKeywords: 'HubSpot consulting, Shopify integration, CRM optimization, marketing automation, sales funnel, business growth, HubSpot experts',
  defaultDescription: 'Expert HubSpot consulting services to optimize your sales funnel, boost conversions, and integrate seamlessly with Shopify, Kajabi, Xero, QuickBooks, and DocuSign.',
  defaultAuthor: 'SWOTBee'
};

/**
 * Generate complete SEO data object
 */
export function generateSEOData(overrides: Partial<SEOData> = {}): SEOData {
  return {
    title: overrides.title || defaultSEOConfig.siteName,
    description: overrides.description || defaultSEOConfig.defaultDescription,
    keywords: overrides.keywords || defaultSEOConfig.defaultKeywords,
    image: overrides.image || defaultSEOConfig.defaultImage,
    url: overrides.url || defaultSEOConfig.siteUrl,
    type: overrides.type || 'website',
    author: overrides.author || defaultSEOConfig.defaultAuthor,
    ...overrides
  };
}