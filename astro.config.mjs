import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import alpine from "@astrojs/alpinejs";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://swotbee.github.io",
  output: "static",
  integrations: [react(), alpine(), tailwind()],
  server: {
    headers: {
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
