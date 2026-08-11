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

  // 301-equivalent redirects for renamed posts. Astro's static output can't emit real
  // HTTP 301 headers (GitHub Pages serves plain files), so this generates a stub HTML
  // page at the old path with a canonical tag + instant meta-refresh to the new URL,
  // which Google treats as passing ranking signal, the standard pattern for static hosts.
  redirects: {
    "/posts/Pendo HubSpot Integration_ Boost Customer Insights": "/posts/pendo-hubspot-integration",
    // The renewal page became the homepage on 2026-08-11. It was noindex for its whole
    // life so there is no ranking to preserve, but the URL is in ad plan docs, the
    // baseline snapshot and anywhere it was shared, and a 404 would lose that traffic
    // silently. It also stops the two URLs serving identical content.
    "/renewal-operations-animated-v3": "/",
  },

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
          // brand asset render pages (LinkedIn banner etc.): noindexed, and
          // only ever loaded locally to screenshot an export
          '/brand/',
          '/design-index/',
          // DRAFT until the two placeholders are filled and Sharmi signs off.
          // The page source is src/pages/_security.astro: the underscore keeps it out
          // of the router entirely, so it is not built or deployed and this filter entry
          // is belt-and-braces. See the restore checklist at the top of that file, which
          // lists all five steps to publish it.
          '/security/',
          '/hero-preview/',
          '/index-old/',
          // The consulting-positioned homepage that served / until 2026-08-11. Kept
          // routed and noindex so it can be eyeballed before any decision to restore it,
          // but it must never appear in the sitemap: a noindex page listed for crawling
          // is a contradiction, and this one is near-duplicate of a live page.
          '/index-consulting-old/',
          '/logo-',
          '/sample-',
          '/org-chart-account-planning-hubspot/',
          '/renewal-operations/',
          '/renewal-operations-animated/',
          '/renewal-operations-animated-v2/',
          // Now a redirect stub to /, not a page. Kept blocked so that if the redirect
          // is ever replaced by a real page again it does not silently rejoin the sitemap.
          '/renewal-operations-animated-v3/',
          '/resources/arr-correction-kit/',
          '/resources/renewal-health-scorecard/',
          '/resources/renewal-leakage-estimate/',
          '/resources/uplift-recovery-checklist/',
          '/pay-renewal-audit/',
          '/services/hubspot-onboarding-old/',
          '/services/integrations-old/',
          '/services/sales-revops-old/',
          '/posts/Pendo HubSpot Integration_ Boost Customer Insights/',
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
    plugins: [tailwindcss()],
    server: {
      watch: {
        // These are repository documentation and research inputs, not runtime source.
        // Excluding them keeps Vite below common per-process file-descriptor limits
        // without affecting page, component, or public-asset hot reloading.
        ignored: ["**/docs/**", "**/src/pages/posts/_prompts/**"],
        // Polling avoids one OS watch descriptor per dependency-graph path, which
        // prevents EMFILE failures in shells with a low `ulimit -n` value.
        usePolling: true,
        interval: 1000,
      },
    },
  }
});
