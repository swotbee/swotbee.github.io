import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import alpine from "@astrojs/alpinejs";
// import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Derive the sitemap exclusion patterns for noindexed blog posts directly from each
// post's own `noindex: true` frontmatter, instead of a hand-maintained duplicate list.
// This was previously a second source of truth: a post could be marked noindex in its
// frontmatter and still ship in the sitemap if someone forgot to also add it here.
// Falls back to an empty array (never breaks the build) if the posts directory can't be
// read for any reason.
function noindexedPostSitemapPatterns() {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const postsDir = join(__dirname, "src/pages/posts");
    return readdirSync(postsDir)
      .filter((f) => f.endsWith(".md"))
      .filter((f) => {
        const frontmatter = readFileSync(join(postsDir, f), "utf-8").split("---", 3)[1] || "";
        return /^noindex:\s*true\s*$/m.test(frontmatter);
      })
      .map((f) => `/posts/${f.replace(/\.md$/, "")}`);
  } catch {
    return [];
  }
}

export default defineConfig({
  site: "https://swotbee.com",
  base: "/",
  output: "static",
  trailingSlash: "always",

  markdown: {
    smartypants: true,
  },

  integrations: [
    react(),
    alpine(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Include only production-facing pages in the sitemap. The noindexed-post patterns
      // are derived from frontmatter (see noindexedPostSitemapPatterns above); everything
      // else here is dev/legacy pages that were never routed through post frontmatter at
      // all (design previews, old service-page versions, etc.), so there's nothing to
      // derive them from.
      filter: (page) => {
        const blocked = [
          '/admin/',
          '/api/',
          '/bee-styles/',
          '/design-index/',
          '/hero-preview/',
          '/index-old/',
          '/logo-',
          '/sample-',
          '/org-chart-account-planning-hubspot/',
          '/renewal-operations/',
          '/renewal-operations-animated/',
          '/renewal-operations-animated-v2/',
          '/renewal-operations-animated-v3/',
          '/resources/arr-correction-kit/',
          '/resources/renewal-health-scorecard/',
          '/resources/renewal-leakage-estimate/',
          '/resources/uplift-recovery-checklist/',
          '/pay-renewal-audit/',
          '/services/hubspot-onboarding-old/',
          '/services/integrations-old/',
          '/services/sales-revops-old/',
          ...noindexedPostSitemapPatterns(),
        ];
        // `page` arrives percent-encoded (spaces as %20, etc.) but leaves characters like
        // `&` as a literal character rather than `%26`. Decode before matching so patterns
        // stay plain, readable strings instead of needing to guess the exact encoding the
        // sitemap integration used for every special character in a filename.
        const decodedPage = decodeURIComponent(page);
        return !blocked.some((pattern) => decodedPage.includes(pattern));
      },
    })
  ],

  server: {
    headers: {
      // NOTE: Do not set a global "Content-Type" here. It overrides the per-asset
      // MIME types Vite sends, so JS/CSS modules get "text/html" and the browser
      // (with nosniff) refuses to execute them, breaking client scripts and HMR.
      "Content-Security-Policy": [
  //       "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;",
  //       "script-src * 'unsafe-inline' 'unsafe-eval' data: blob:;",
  //       "style-src * 'unsafe-inline';",
  //       "img-src * data: blob:;",
  //       "font-src * data:;",
  //       "connect-src * ws: wss:;",
  //       "media-src * data: blob:;",
  //       "object-src 'none';",
  //       "base-uri 'self';",
  //       "form-action 'self';",
  //       "frame-ancestors 'none';",
        // "upgrade-insecure-requests;"
      ].join(" "),
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      // "Referrer-Policy": "strict-origin-when-cross-origin"
    }
  },

  vite: {
    plugins: [tailwindcss()]
  }
});