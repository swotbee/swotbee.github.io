type ImportedPost = {
  frontmatter: {
    title: string;
    pubDate: string;
    description: string;
    image: string;
    tags?: string[];
    [key: string]: any;
  };
};

interface BlogPost {
  slug: string;
  title: string;
  pubDate: string;
  description: string;
  image: string;
  tags?: string[];
  authorName?: string;
  category?: { title: string; href: string };
}

interface PostsResult {
  recentPosts: BlogPost[];
  popularTags: string[];
}

export const getRecentPosts = async (): Promise<PostsResult> => {
  const posts = import.meta.glob<ImportedPost>('../pages/posts/*.{md,mdx}');

  const allPosts = await Promise.all(
    Object.entries(posts).map(async ([filePath, importPost]) => {
      const post = await importPost();
      const slug = filePath.split('/').pop()?.replace(/\.(md|mdx)$/, '') || '';

      return {
        slug,
        title: post.frontmatter.title,
        pubDate: post.frontmatter.pubDate,
        description: post.frontmatter.description,
        image: post.frontmatter.image,
        tags: post.frontmatter.tags || []
      };
    })
  );

  const sortedPosts = allPosts.sort((a, b) =>
    new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  // Get all tags from all posts
  const allTags = [...new Set(
    Object.values(posts).flatMap(post => post.frontmatter?.tags || [])
  )];

  return {
    recentPosts: sortedPosts.slice(0, 3),
    popularTags: allTags.slice(0, 8) // Get top 8 tags
  };
}

export const getAllPosts = async (): Promise<BlogPost[]> => {
  const posts = import.meta.glob<ImportedPost>('../pages/posts/*.{md,mdx}');

  const allPosts = await Promise.all(
    Object.entries(posts).map(async ([filePath, importPost]) => {
      const post = await importPost();
      const slug = filePath.split('/').pop()?.replace(/\.(md|mdx)$/, '') || '';
      return {
        slug,
        title: post.frontmatter.title,
        pubDate: post.frontmatter.pubDate,
        description: post.frontmatter.description,
        image: post.frontmatter.image,
        tags: post.frontmatter.tags || [],
        authorName: post.frontmatter.author?.name || 'SWOTBee Team',
        category: post.frontmatter.category,
      };
    })
  );

  return allPosts.sort((a, b) =>
    new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
}

export const getPostsByCategory = async (slug: string): Promise<BlogPost[]> => {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.category?.href === `/categories/${slug}`);
}

export const getAllCategories = async (): Promise<Array<{ slug: string; title: string }>> => {
  const allPosts = await getAllPosts();
  const seen = new Map<string, string>();

  allPosts.forEach(post => {
    if (!post.category?.href?.startsWith('/categories/')) return;
    const slug = post.category.href.replace('/categories/', '');
    if (!seen.has(slug)) seen.set(slug, post.category.title);
  });

  return Array.from(seen.entries()).map(([slug, title]) => ({ slug, title }));
}
