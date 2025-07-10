/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [
    require("@relume_io/relume-tailwind")
  ],
  theme: {
    extend: {
      // Your custom theme settings
    },
  },
  plugins: [],
}
