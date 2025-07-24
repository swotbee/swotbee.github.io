// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import alpine from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind(),
    alpine()
  ],
  output: 'static'
});