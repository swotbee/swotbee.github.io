# Site color and proof principles

Use a white canvas with contained color and clear product roles. This is the
accepted direction for SWOTBee's live landing pages and blog pages, inspired by the user's analysis of
Clay's colorful, modular presentation. This document records the design principle;
it does not verify claims about Clay's current customers, usage, or site design.

## White canvas, colored islands

- Keep the homepage body, hero, and full-width content sections `white`.
  Use spacing, typography, and component edges to separate sections.
- Put mint, aqua, slate, coral, and illustrative color inside bounded cards,
  product mockups, status badges, diagrams, and interactive components.
- Avoid tinting an entire screen section to create variety. The closing aqua CTA
  and dark metrics panel are contained cards surrounded by the white canvas.
- Keep the existing dark footer as the page's structural ending.
- Keep card boundaries crisp. White cards currently use a 1px `ink-200` border;
  divs with the pale `aqua-10` background use a 1px `aqua-25` border.
  The three consulting roadmap cards use a clearer 1px `ink-300` border.

## Assign color a functional role

Choose accents to suit the content and visual hierarchy. Keep equivalent cards
and controls consistent within a module. Offering colors can evolve with the design.
Do not recolor error, warning, and success states into a single brand hue; their
meaning must remain clear through text, icons, and suitable contrast.

In the current homepage, the eight problem-grid icons share `aqua-50` containers
and `aqua-900` strokes. The four outcome statistics use `white`; their descriptive
labels use `aqua-300`. Keep explanatory qualifications readable and visually secondary.

## One Tailwind palette

Define homepage colors in `src/styles/global.css`'s `@theme`, not inside page or
component CSS. The selected coral and current aqua are named shade families;
`ink` holds the selected text, neutral border, and footer shades. Keep the original
blue, amber, mint, purple, rose, and other existing families intact. Legacy `v6`
utilities may alias these tokens for compatibility, but must not duplicate hex values.

Use extra numbered steps when existing shades are too broad. These examples
describe the current homepage treatment and can evolve with future design choices:

| Tailwind shade | Example utility | Current use |
| --- | --- | --- |
| `coral-600` | `bg-coral-600` | Primary action |
| `coral-700` / `coral-800` | `hover:bg-coral-700` / `active:bg-coral-800` | Hover / pressed |
| `aqua-10` / `aqua-25` | `bg-aqua-10` / `border-aqua-25` | Pale component surface / edge |
| `aqua-50` | `bg-aqua-50` | Icon and highlight surface |
| `aqua-600` / `aqua-700` | `from-aqua-600` / `to-aqua-700` | Supporting accents / CTA gradient |
| `ink-200` | `border-ink-200` | White card border |
| `ink-900` | `text-ink-900` / `bg-ink-900` | Headings and footer |

Use utilities (`bg-aqua-10`, `border-ink-200`) or their theme variables in CSS.
Apply opacity to a theme shade for shadows and overlays rather than creating an
independent color.

## Establish trust near the hero

- Place integration compatibility and the existing outcome metrics immediately
  after the hero, before the detailed feature narrative.
- Preserve the requested architecture sentence directly beneath the logo bar.
- Label integration logos **Works with**. Compatibility is different from a
  customer endorsement, partnership, or certification.
- Keep the verified HubSpot Solutions Partner badge and the qualifications on
  reported client outcomes. Never borrow another company's customer logos or
  usage claims, or imply that representative outcomes are guaranteed.
- Keep detailed testimonials and the case study later in the page so readers can
  inspect the evidence after seeing the concise early proof.
- On blog posts, show the existing author biography and expertise beside the title,
  dates, and review byline, before the featured image. Keep commercial client proof
  separate from authorship; do not add a customer endorsement to an article.

## Use a metaphor that fits the work

Visuals should explain connected systems, reliable data flow, renewal operations,
and modular implementation. Vibrancy should help visitors understand those ideas.
Follow [page imagery](page-imagery.md) for artwork and keep meaningful copy in HTML.

## Implementation and review

The homepage has a `data-homepage-canvas` wrapper. `BaseLayout.astro` imports
`global.css` for the Tailwind palette and compatibility aliases, and `site.css`
for the shared presentation. The homepage uses this shared styling directly.

`BaseLayout.astro` marks live landing pages, articles, and product roles with
`data-site-canvas` and `data-site-offering`. `site.css` extends the rules
through the shared layouts, preserving color inside bounded components and turning
dark/colored full-width bands into cards on white. Legacy/design routes are excluded
explicitly; noindex funnel pages remain included because they still serve visitors.
Navigation booking actions and the footer keep their existing brand treatment.
Client-logo strips carry a client-experience label; the homepage integration strip
has its own compatibility label. The booking-page client strip precedes the calendar.

Before accepting a homepage change, check:

- Full-width content surfaces remain white and color has a bounded home.
- Product accents communicate a stable role instead of random decoration.
- Equivalent components use consistent icon, badge, and button treatment.
- Trust appears early, with compatibility and client evidence clearly labelled.
- Contrast, focus states, mobile layout, reduced motion, and reading order work.
