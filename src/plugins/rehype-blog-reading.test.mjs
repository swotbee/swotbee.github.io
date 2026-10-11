import assert from "node:assert/strict";
import test from "node:test";
import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import rehypeBlogReading from "./rehype-blog-reading.mjs";

test("GFM task labels include link text and exclude nested tasks", async () => {
  const renderer = await createMarkdownProcessor({ rehypePlugins: [rehypeBlogReading] });
  const { code } = await renderer.render([
    "- [ ] Check the [signed agreement](/agreement/).",
    "  - [x] Verify the date.",
    "",
    "- [ ] Keep a second paragraph.",
    "",
    "  Include the responsible owner.",
  ].join("\n"));
  assert.match(code, /aria-label="Check the signed agreement\."/);
  assert.match(code, /checked[^>]*aria-label="Verify the date\."/);
  assert.match(code, /aria-label="Keep a second paragraph\. Include the responsible owner\."/);
  assert.match(code, /href="\/agreement\/"/);
});

test("Only known worksheets and unlabelled disabled task boxes change", () => {
  const image = { tagName: "img", properties: {
    src: "/assets/posts/hubspot-customer-contracts/hubspot-contract-management-worksheet.svg",
  } };
  const explicitImage = { tagName: "img", properties: { ...image.properties, width: 100, height: 100 } };
  const externalImage = { tagName: "img", properties: { src: "https://example.com/image.svg" } };
  const interactive = { tagName: "input", properties: { type: "checkbox" } };
  const labelled = { tagName: "input", properties: { type: "checkbox", disabled: true, ariaLabel: "Existing label" } };
  const ordinary = { tagName: "input", properties: { type: "checkbox", disabled: true } };
  const tree = { children: [image, explicitImage, externalImage, interactive,
    { tagName: "li", properties: { className: ["task-list-item"] }, children: [
      labelled, { type: "text", value: " Unchanged instruction" },
    ] }, { tagName: "li", children: [ordinary, { type: "text", value: " Regular list" }] },
  ] };
  rehypeBlogReading()(tree);
  assert.equal(image.properties.width, 720);
  assert.equal(image.properties.height, 890);
  assert.equal(explicitImage.properties.width, 100);
  assert.equal(externalImage.properties.width, undefined);
  assert.equal(interactive.properties.ariaLabel, undefined);
  assert.equal(labelled.properties.ariaLabel, "Existing label");
  assert.equal(ordinary.properties.ariaLabel, undefined);
});
