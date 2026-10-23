# Create a new Nia illustration

Nia is SWOTBee's provisional renewal operations character. Use the committed reference artwork and character specification to create a new scene with the same identity. These references are not a trained image model or an articulated character rig.

## Get the reference set

Repository: https://github.com/swotbee/swotbee.github.io

The homepage and references were pushed in commit `f39f132` on branch `codex/astro-7-migration`. They are not yet merged into main.

For a separate checkout that does not disturb existing local work:

```bash
git clone --branch codex/astro-7-migration --single-branch https://github.com/swotbee/swotbee.github.io.git swotbee-illustrations
cd swotbee-illustrations
```

Read AGENTS.md and docs/development.md before changing the site. Use Node 22 and the repository's pinned pnpm version. Follow normal setup:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open `/brand/character-guide/` on the development server. It shows her identity, poses, palette and a copyable scene brief. For a quick review on the existing local network, use http://192.168.88.6:4400/brand/character-guide/ while that preview server is running.

All references are in `public/assets/illustrations/renewals/`:

| File | Use |
| --- | --- |
| `character-reference.json` | Authoritative character description, drawing rules, 26 material colors and reusable prompt. |
| `nia-portrait-reference.png` | Attach this to image generation tools for face, hair and clothing reference. |
| `nia-portrait-reference.svg` | Editable portrait reference. |
| `renewal-results-clean-v3.svg` | Full-body reference with calendar and deal cards. |
| `quote-effort-clean-v3.svg` | Reference for document-handling action and props. |
| `response-speed-clean-v3.svg` | Reference for a more active pose and stopwatch prop. |
| `first-results-clean-v3.svg` | Reference for working with a milestone board. |

Attach the portrait and one full scene to the image tool or illustrator. Select the full scene closest to the planned pose. If a tool cannot accept SVG, export a PNG reference from it in a vector editor. Keep the SVG original.

## Plan one clear story

Fill in these five fields before drawing:

1. Message: what should the visitor understand?
2. Action: what is Nia doing?
3. Prop: which object makes that action understandable?
4. Expression: what is her mood, and where is she looking?
5. Composition: where will the artwork appear, and where should empty space remain?

Example:

- Message: find renewal exceptions before they become urgent.
- Action: Nia moves a flagged renewal card into a review tray.
- Prop: a compact board with three renewal cards and one review tray.
- Expression: attentive, calm and confident, looking at the flagged card.
- Composition: full figure beside the board, transparent background, portrait-oriented artwork suitable for a two-column homepage section.

Use a different gesture and relevant prop for each story. Repeating an existing image with a different object label does not communicate a new action.

## Keep the character consistent

Retain her face, warm brown skin, dark shoulder-length curly hair, gold hoop earrings, pale mint collared shirt with rolled sleeves, high-waisted wide-leg blue trousers and off-white sneakers. Her personality is calm, capable, practical and warm.

Read exact colors from `character-reference.json`. Main roles include:

| Role | Color |
| --- | --- |
| Outline | `#20343B` |
| Hair | `#252A2E` |
| Skin | `#D77D3C` |
| Shirt | `#D7EFDF` |
| Blue trousers and blue props | `#1871A8` |
| Teal props | `#287D70` |
| Orange emphasis | `#F58232` |
| Paper | `#FFF9ED` |

Use the specified shadow and highlight colors from the JSON where needed. Avoid introducing arbitrary shades. The illustration material palette is separate from the Tailwind colors used for website buttons and text.

Use smooth curves, a deliberate dark outline and two or three intentional shades per material. Avoid fragmented grey fringes, tiny unwanted contour shapes and dense texture. Keep the background transparent; a small intentional ground shadow is acceptable. Keep text and UI labels in HTML where possible.

## Create and finish the artwork

### Use an image generation tool for the concept

Upload the portrait and selected full scene, then use the prompt below. Ask for a transparent-background concept at a sufficiently large size for review. Check identity and pose before requesting more scenes.

Most image generators return raster images. A PNG wrapped in an SVG file is still a bitmap. If native SVG is required, have an illustrator or a vector-capable coding/design agent redraw and clean the approved concept as paths. Image tracing can be a starting point, but it requires cleanup and comparison at enlarged sizes.

### Use an illustrator or vector-capable agent for the final SVG

Supply the same references and JSON. Request a new pose and props using native SVG geometry. Reuse unchanged reference shapes when appropriate, and inspect any newly drawn face, hands, clothing folds and curl contours against the references.

Deliver actual paths/shapes, a viewBox and a transparent background. Do not include embedded images, base64 raster data, external bitmap references or foreignObject content. Do not replace the existing four scenes when adding a new one.

A text prompt alone does not guarantee identity consistency. Compare the new face, hair silhouette and proportions with the reference before approving it.

## Prompt to share with an image tool or illustrator

```text
Use the attached Nia portrait and full scene as the visual identity references.
Use character-reference.json as the palette and character specification.

Preserve her face, warm brown skin, shoulder-length dark curly hair, gold hoop
earrings, mint rolled-sleeve collared shirt, wide-leg blue trousers and off-white
sneakers. She is calm, capable, warm and practical.

Message: [WHAT THE VISITOR SHOULD UNDERSTAND]
Action: [WHAT NIA IS DOING]
Prop: [THE OBJECT THAT MAKES THE ACTION CLEAR]
Expression and gaze: [MOOD AND WHERE SHE IS LOOKING]
Composition: [PLACEMENT, ASPECT RATIO AND REQUIRED EMPTY SPACE]

Create a new pose appropriate to this story. Keep her identity and proportions
consistent with the references. Use smooth curves, controlled dark outlines,
the supplied material palette and two or three deliberate shades per material.
Avoid noisy texture, fragmented grey outlines and unnecessary tiny shapes.
Keep the background transparent and avoid baked-in text.

For concept generation: provide a transparent PNG for approval.
For final vector delivery: provide native SVG paths/shapes with no embedded or
linked raster images. A separate vector drawing and cleanup step is acceptable.
Preserve the existing approved assets and give this new scene a versioned name.
```

## Add an approved scene to the website

1. Save it with a descriptive name, for example `public/assets/illustrations/renewals/renewal-exceptions-v1.svg`.
2. Keep any concept PNG and working files separately from public website assets unless they are deliberately part of the reference set.
3. If this is an additional carousel story, update the illustration list and matching stats in the page/component together. `src/components/astro/homepage/RenewalResults.astro` currently pairs four illustrations with four results. Do not create a result claim just to fit an illustration.
4. If it is an inline section illustration, use an img with dimensions and suitable alternative text. Decorative artwork next to equivalent text should use empty alt text.
5. Add the new approved pose to the character guide when it is useful as a future reference.
6. Run `pnpm verify` and inspect desktop/mobile rendering, cropping, transparent edges and the relevant interaction.

Inspect at normal size and enlarged size: face, hands, curls, outer silhouette, prop alignment, dark outlines, deliberate shading and empty background. Put it temporarily over a contrasting background in a vector editor to reveal fringes. Confirm the SVG has no embedded raster image. Do not commit concept variants or generated caches accidentally.

## What the committed tools can and cannot do

None of these scripts accepts a prompt to produce a new character pose.

| Tool | Appropriate reuse | Requirements or limits |
| --- | --- | --- |
| `generate-workflow-icons.mjs` | Edit the six small workflow icon templates or regenerate them with the character palette. | Uses the committed JSON and Node built-ins. It overwrites the existing six workflow SVGs. It does not draw Nia. |
| `export-character-reference.mjs` | Re-export the portrait from the approved renewal-results scene. | Uses sharp and a fixed crop for that scene. It overwrites the portrait references. Adjust the crop if the source composition changes. |
| `match-icon-palette.py` | Recolor the eleven original icons. | Requires original icon source SVGs that were excluded from the homepage commit. |
| `optimize-traced-illustrations.mjs` | Reduce SVG file size after editing. | Requires a separately installed SVGO module URL. Default inputs are local intermediate files; clean-v3 selects current scenes. |
| `convert-original-illustrations.py` | Repeat background removal for the original four raster scenes. | Requires excluded source images, Pillow and NumPy. Masks and gap coordinates are scene-specific. |
| `trace-original-illustrations.py` | Repeat tracing of those original scenes. | Requires excluded source images/wrappers, Pillow and VTracer 0.6.15. |
| `smooth-vector-illustrations.py` | Repeat smoothing of those traces. | Requires excluded intermediate files, Pillow, VTracer and Inkscape. |
| `clean-vector-linework.py` | Repeat shading and line-color cleanup of those four scenes. | Requires excluded smoothed vectors, NumPy and Inkscape. Several regions are defined by coordinates for those exact poses. |
| `generate-svg-illustrations.mjs` | Reproduce an earlier reference-only illustration experiment. | Requires excluded baseline drawings. Writes historical-generated output outside public assets; it is not the current Nia generator. |

For the two self-contained existing exports, run from the website root only when you intend to update their outputs:

```bash
node scripts/illustrations/generate-workflow-icons.mjs
node scripts/illustrations/export-character-reference.mjs
```

A fresh clone can build and display the homepage and character guide without the excluded original-art files. Most historical reconstruction tools will not run from that clone until their separate inputs and external dependencies are supplied. Do not rerun them blindly as a website build step.
