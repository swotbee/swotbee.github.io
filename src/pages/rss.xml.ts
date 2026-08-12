import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const postModules = import.meta.glob<{ frontmatter: any }>('./posts/*.md', { eager: true });

  const items = Object.entries(postModules)
    .map(([path, mod]) => {
      const fm = mod.frontmatter;
      const slug = path.replace('./posts/', '').replace('.md', '');
      return {
        title: fm.title,
        pubDate: new Date(fm.pubDate),
        description: fm.description || '',
        link: `/posts/${slug}/`,
        categories: fm.tags || [],
      };
    })
    .filter(item => !isNaN(item.pubDate.getTime()))
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'SWOTBee Blog — HubSpot & Revenue Operations',
    description: 'Expert insights on HubSpot optimization, revenue operations, CRM automation, and growth strategies for mid-sized companies.',
    site: context.site ?? 'https://swotbee.com',
    items,
    customData: `<language>en-us</language>`,
  });
}
