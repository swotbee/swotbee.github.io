import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import alpine from "@astrojs/alpinejs";
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://swotbee.github.io",
  base: "/",
  output: "static",
  markdown: {
    smartypants: true,
  },
  integrations: [react(), alpine(), tailwind(), sitemap()],
  server: {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
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
  }
});
