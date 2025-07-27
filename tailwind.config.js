/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#213343",
          900: "#070a0e",
          800: "#0d151b",
          700: "#141f29",
          600: "#1b2a37",
          500: "#213343",
          400: "#3d5e7b",
          300: "#5b87ae",
          200: "#92afc9",
          100: "#c8d7e4"
        },
        secondary: {
          DEFAULT: "#ffe066",
          100: "#473900",
          200: "#8f7200",
          300: "#d6ab00",
          400: "#ffd21f",
          500: "#ffe066",
          600: "#ffe785",
            700: "#ffeda3",
            800: "#fff3c2",
            900: "#fff9e0",
            950: "#fffaf1"
        },
        highlight: {
          DEFAULT: "#ff5c35",
          900: "#3d0c00",
          800: "#7a1800",
          700: "#b82500",
          600: "#f53100",
          500: "#ff5c35",
          400: "#ff7c5c",
          300: "#ff9d85",
          200: "#ffbead",
          100: "#ffded6",
          50: "#fff5f2",
          25: "#fef4ea"
        },
        status: {
            DEFAULT: "#5C62D6",
            900: "#0c0e31",
            800: "#181c62",
            700: "#252a93",
            600: "#3138c4",
            500: "#5c62d6",
            400: "#7c81de",
            300: "#9da1e7",
            200: "#bec0ef",
            100: "#dee0f7",
            50: "#f2f3fb",
        },
        neutral:{
            DEFAULT: "#70c1b3",
            900: "#122b27",
            800: "#25564e",
            700: "#378174",
            600: "#49ab9b",
            500: "#70c1b3",
            400: "#8dcec3",
            300: "#a9dad2",
            200: "#c6e7e1",
            100: "#e2f3f0",
            50: "#f1f9f7",
        },
        purple: {
          DEFAULT: '#ab93d5',
          100: '#170f25',
          200: '#2e1d4b',
          300: '#452c70',
          400: '#5c3a96',
          500: '#724ab8',
          600: '#8f6fc7',
          700: '#ab93d5',
          800: '#c7b7e3',
          900: '#e3dbf1',
        },
        black: {
          DEFAULT: '#02010a',
          100: '#000002',
          200: '#010004',
          300: '#010106',
          400: '#020107',
          500: '#02010a',
          600: '#140a64',
          700: '#2713bf',
          800: '#5c49ed',
          900: '#aea4f6',
        },

        xanthous_yellow: {
            100: "#422a00",
            200: "#855400",
            300: "#c77e00",
            400: "#ffa50a",
            500: "#ffbd4d",
            600: "#ffcb70",
            700: "#ffd894",
            800: "#ffe5b8",
            900: "#fff2db",
            950: "#fffaf1",
            DEFAULT: "#ffbd4d"
        },
        persian_rose: {
            100: "#3b0123",
            200: "#760246",
            300: "#b10469",
            400: "#ec058c",
            500: "#fb31a8",
            600: "#fc5bb9",
            700: "#fc84ca",
            800: "#fdaddc",
            900: "#fed6ed",
            DEFAULT: "#fb31a8"
        },

        other_orange: {
          DEFAULT: '#fc814a',
          100: '#401501',
          200: '#812a02',
          300: '#c13f03',
          400: '#fb560a',
          500: '#fc814a',
          600: '#fd9b6e',
          700: '#fdb492',
          800: '#fecdb7',
          900: '#fee6db',
        },

        accent1: {
          DEFAULT: "#b7ecec",
          100: "#124242",
          200: "#238484",
          300: "#35c6c6",
          400: "#74dada",
          500: "#b7ecec",
          600: "#c5f0f0",
          700: "#d3f3f3",
          800: "#e2f7f7",
          900: "#f0fbfb"
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100ch', // add required styles
          },
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('flowbite-typography')
  ],
}
