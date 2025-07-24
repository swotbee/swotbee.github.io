import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import alpine from "@astrojs/alpinejs";
import tailwindcss from "@tailwindcss/cli";

export default defineConfig({
  site: "https://swotbee.github.io",
  base: "/swotbee.github.io/",
  output: "static",
  integrations: [react(), alpine()],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
