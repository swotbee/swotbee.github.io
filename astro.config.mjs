import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import alpine from "@astrojs/alpinejs";
// import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://swotbee.com",
  base: "/",
  output: "static",

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
      // Include all pages and exclude certain patterns
      filter: (page) => !page.includes('/admin/') && !page.includes('/api/'),
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