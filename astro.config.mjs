// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import alpine from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
  // 1. Set your Pages URL
  site: 'https://swotbee.github.io',

  // 2. Set base to your repo name (include leading & trailing slash)
  base: '/swotbee.github.io/',

  // 3. Output static files
  output: 'static',
  integrations: [
    react(),
    tailwind(),
    alpine()
  ]
});
