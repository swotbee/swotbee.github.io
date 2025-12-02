// src/scripts/aos.js
import AOS from "aos";
// Note: we DO NOT import the CSS here because Astro's bundling can skip CSS imports from client-only modules.
// We'll load the CSS in the layout's <head> instead.

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true, // animate only once
  });
});
