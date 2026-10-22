import { readFileSync } from "node:fs";

// Only the initiative's known local worksheets need intrinsic dimensions.
// Read their viewBox at build time so the asset stays the source of truth.
const worksheetSlugs = [
  "hubspot-contract-management",
  "hubspot-contract-document-integrations",
  "hubspot-renewal-pipeline-complete-guide",
  "hubspot-quote-to-cash",
];
const worksheetDimensions = new Map(worksheetSlugs.map((slug) => {
  const src = `/assets/posts/hubspot-customer-contracts/${slug}-worksheet.svg`;
  const svg = readFileSync(new URL(`../../public${src}`, import.meta.url), "utf8");
  const viewBox = svg.match(/\bviewBox="([^"]+)"/)?.[1].trim().split(/\s+/).map(Number);
  if (!viewBox || viewBox.length !== 4 || !viewBox.every(Number.isFinite)
    || viewBox[2] <= 0 || viewBox[3] <= 0) {
    throw new Error(`Worksheet needs a valid SVG viewBox: ${src}`);
  }
  return [src, { width: viewBox[2], height: viewBox[3] }];
}));

function itemText(node) {
  if (node.type === "text") return node.value;
  // Nested tasks have their own labels. Do not include them in the parent label.
  if (["ul", "ol", "input"].includes(node.tagName)) return "";
  if (node.tagName === "img") return node.properties?.alt || "";
  return (node.children || []).map(itemText).join("");
}

function labelCheckboxes(node, label) {
  if (["ul", "ol"].includes(node.tagName)) return;
  if (node.tagName === "input" && node.properties?.type === "checkbox"
    && node.properties.disabled === true && !node.properties.ariaLabel
    && !node.properties.ariaLabelledBy && label) {
    node.properties.ariaLabel = label;
  }
  for (const child of node.children || []) labelCheckboxes(child, label);
}

// Server-rendered attributes only: no client script, new controls or copy changes.
export default function rehypeBlogReading() {
  return function transform(tree) {
    function walk(node) {
      const properties = node.properties || {};
      if (node.tagName === "li" && Array.isArray(properties.className)
        && properties.className.includes("task-list-item")) {
        labelCheckboxes(node, itemText(node).replace(/\s+/g, " ").trim());
      }
      const dimensions = node.tagName === "img" && worksheetDimensions.get(properties.src);
      if (dimensions && properties.width == null && properties.height == null) {
        Object.assign(properties, dimensions);
      }
      for (const child of node.children || []) walk(child);
    }
    walk(tree);
  };
}
