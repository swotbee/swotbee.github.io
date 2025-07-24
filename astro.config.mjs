import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import alpine from "@astrojs/alpinejs";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://swotbee.github.io",
  output: "static",
  integrations: [react(), alpine(), tailwind()],
});
