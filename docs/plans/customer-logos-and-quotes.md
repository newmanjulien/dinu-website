# Plan: replace customer logos and testimonial companies

Status: Phases 1–11 implemented. Source/type checks passed for all completed phases; the production build passed in Phase 1. Browser review remains with the user.

## Target outcome

Use these companies, in this order, throughout the customer logo surfaces:

1. Rippling
2. Ramp
3. Replit
4. Supabase
5. PostHog
6. Retool
7. RevenueCat
8. Lattice
9. Zip
10. Webflow
11. Algolia

Keep the existing three testimonial cards. **Preserve their quote text, names, and titles exactly: these are placeholders.** Change only the company and matching logo. The planned mapping uses the first three companies in the requested list:

| Card | New company | Name | Title | Quote — unchanged |
| --- | --- | --- | --- | --- |
| 1 | Rippling | Maya Chen | VP of Sales | Dinu lets our reps close +90% of deals without help from legal. |
| 2 | Ramp | Daniel Brooks | CRO | Dinu cut our sales cycle by 30% and improved rep productivity by 10%. |
| 3 | Replit | Sophie Laurent | CRO | Dinu keeps deals moving and lets legal focus where it matters. |

Each implementation phase handles one company. Shared component changes happen in Phase 1, and final cleanup happens in Phase 11; there are no separate setup or cleanup phases.

## Starting surfaces and files

| Surface | Files | Current behavior |
| --- | --- | --- |
| Shared customer data | `src/lib/data/customers.ts` | Five companies: Oceans, Street Talk, Zensai, Brex, Vanta. |
| Homepage logo strip | `src/lib/components/marketing/CustomerLogos.svelte`, used by `src/lib/components/hero/Hero.svelte` | Generates 12 slots by repeating brands; hides trailing slots at narrower widths. |
| Pricing customer grid | `src/routes/pricing/+page.svelte` | Generates 10 tiles by repeating and offsetting the shared list. |
| Homepage testimonials | `src/lib/components/marketing/CustomerTestimonials.svelte`, used by `src/routes/+page.svelte` | Three hardcoded cards with separate SVG paths and logo dimensions. |
| Logo assets | `static/logos/` | Customer logos currently mix PNGs and SVGs. |

This scope covers customer logos and testimonial companies. Integration logos describe connected products and keep their existing set. Dinu's own branding and the Oceans sample contract in the product animation also keep their existing content.

## Implementation approach

- Keep one ordered customer registry in `src/lib/data/customers.ts`. Each company has a stable ID, name, local SVG path, intrinsic dimensions, and display sizing for the strip and pricing tiles.
- Keep the three existing placeholder testimonials in that same data module, linked to company IDs. Resolve their company names and logos from the registry instead of duplicating asset paths and dimensions in the component. Testimonial display heights can remain specific to the cards.
- Use official SVG wordmarks where available, stored locally as `static/logos/<company-id>.svg`. Record the source URL in a short asset comment. Use a consistent treatment with enough contrast on the existing backgrounds, and adjust optical size per brand.
- Use Rippling and Ramp's visible height as the reference for every remaining logo, accounting for each SVG's padding and symbol. Apply modest optical adjustments; the user found a 30–35% reduction too small. Preserve aspect ratios and use the current sizing table below as the reference for future logos.
- Render each brand once in the logo strip and once in the pricing grid. Remove modulo cycling and row offsets. The strip shows the ordered subset that fits at each breakpoint; pricing shows all eleven.
- Keep the strip's entrance animation, reduced-motion behavior, tooltips, and responsive layout. Revisit its width thresholds for the new wordmark widths; the current thresholds assume the old assets and a twelfth slot.
- The hero may show one fewer logo if needed for fit, per the user's follow-up. Pricing still shows the complete customer set.
- Keep pricing tiles responsive, with a centered final row for eleven logos. Preserve the pricing element itself.
- Keep the existing three-card testimonial layout, typography, quote punctuation, names, and titles.
- Derive customer labels and accessible descriptions from the shared data so old company names disappear with their entries.

Current sizing after user review (supersedes the initial sizes in the phase notes):

| Company | Strip height | Pricing height | Testimonial height |
| --- | --- | --- | --- |
| Rippling | `clamp(12px, 1.35vw, 15px)` | `14px` | `18px` |
| Ramp | `clamp(15.9953px, 1.78771vw, 21.6407px)` | `20.6998px` | `23.5225px` |
| Replit | `clamp(15.75px, 1.7325vw, 21px)` | `19.95px` | `23.1px` |
| Supabase | `clamp(16.20675px, 1.79431875vw, 20.83725px)` | `19.679625px` | — |
| PostHog | `clamp(13.58px, 1.5035vw, 17.46px)` | `16.49px` | — |
| Retool | `clamp(12.635px, 1.398875vw, 16.245px)` | `15.3425px` | — |
| RevenueCat | `clamp(20px, 2.25vw, 26px)` | `24px` | — |
| Lattice | `clamp(14.065px, 1.552vw, 18.43px)` | `17.46px` | — |
| Zip | `clamp(14.44px, 1.6245vw, 19.855px)` | `18.9525px` | — |
| Webflow | `clamp(13.5375px, 1.489125vw, 18.05px)` | `17.1475px` | — |
| Algolia | `clamp(15.3425px, 1.71475vw, 20.7575px)` | `19.855px` | — |

Zip is assumed to mean the procurement company at `ziphq.com` for this plan.

## Phase 1 — Rippling

- [x] Add `static/logos/rippling.svg` with its source URL and correct intrinsic dimensions.
- [x] Introduce stable customer IDs and shared testimonial data; copy all three existing quotes, names, and titles without edits.
- [x] Replace Oceans in the customer registry with Rippling.
- [x] Point Maya Chen's testimonial at Rippling and tune its wordmark height for the existing card.
- [x] Update `CustomerTestimonials.svelte` to use shared data for company names and logo assets.
- [x] Remove repeated-slot generation from `CustomerLogos.svelte` and the pricing route; make both render the current registry once. Make the default strip count follow the registry rather than remain fixed at five.
- [x] Establish the responsive strip and centered wrapping pricing layout that later company additions will use.

Done when Rippling appears in both logo surfaces and the first testimonial, with Maya Chen's name, title, and quote unchanged. Other existing companies remain available until their replacement phase.

Implementation notes: Rippling uses the official header wordmark from `https://www.rippling.com/`, with a `127 × 18` viewBox and the site's ink color. Its strip height is `clamp(12px, 1.35vw, 15px)`, pricing height is `14px`, and testimonial height is `18px`, slightly reduced after user review. The other four companies remain in the registry, with Brex and Vanta retaining their existing SVG testimonial variants. The strip keeps its responsive hiding and motion behavior; obsolete twelfth-slot rules have been removed. Pricing now wraps unique tiles into two, three, or five columns with each row centered.

Validation: `npx svelte-kit sync` and `npx svelte-check --tsconfig ./tsconfig.json` passed with zero errors and warnings; `npx vite build` passed. A source comparison confirmed all three quotes, names, and titles exactly match the original testimonial component. SVG dimensions and generated pricing width rules were checked. No tests or browser automation were run.

## Phase 2 — Ramp

- [x] Add `static/logos/ramp.svg` and its shared dimensions and display sizing.
- [x] Replace Brex in the registry with Ramp; place Ramp second in the target order.
- [x] Point Daniel Brooks's testimonial at Ramp and tune the card logo height.

Done when Ramp appears in both logo surfaces and the second testimonial, with Daniel Brooks's name, title, and quote unchanged.

Implementation notes: Ramp uses the official header wordmark from `https://www.ramp.com/`, with a `71 × 20` viewBox and the site's ink color. Its strip height is `clamp(17px, 1.9vw, 23px)`, pricing height is `22px`, and testimonial height is `25px`, slightly reduced after user review. The shared registry now reads Rippling, Ramp, Street Talk, Zensai, Vanta. Both logo surfaces and Daniel Brooks's testimonial resolve Ramp from this registry.

Validation: `npx svelte-kit sync` and `npx svelte-check --tsconfig ./tsconfig.json` passed with zero errors and warnings. A source comparison confirmed all three quotes, names, and titles are unchanged from Phase 1. Registry order and SVG dimensions were checked. No tests or browser automation were run.

## Phase 3 — Replit

- [x] Add `static/logos/replit.svg` and its shared dimensions and display sizing.
- [x] Replace Vanta in the registry with Replit; place Replit third in the target order.
- [x] Point Sophie Laurent's testimonial at Replit and tune the card logo height.

Done when Replit appears in both logo surfaces and the third testimonial, with Sophie Laurent's name, title, and quote unchanged. All three testimonial company replacements are now complete.

Implementation notes: Replit uses the official header wordmark from `https://replit.com/`, with a `71 × 21` viewBox, the site's ink color for the text, and its official orange symbol. Its strip height is `clamp(17px, 1.9vw, 23px)`, pricing height is `22px`, and testimonial height is `25px`, matching the reduced Ramp sizing. The shared registry now reads Rippling, Ramp, Replit, Street Talk, Zensai. All three testimonials use their companies' shared SVG paths directly; the old testimonial asset override is removed.

Validation: `npx svelte-kit sync` and `npx svelte-check --tsconfig ./tsconfig.json` passed with zero errors and warnings. A source comparison confirmed all three quotes, names, and titles are unchanged, and approved Rippling/Ramp sizing is preserved. Registry order and SVG dimensions were checked. No tests or browser automation were run.

## Phase 4 — Supabase

- [x] Add `static/logos/supabase.svg` and its shared dimensions and display sizing.
- [x] Replace Street Talk in the registry with Supabase; place Supabase fourth in the target order.
- [x] Balance the symbol and wordmark against the existing strip and tile sizes.

Done when Supabase appears in both logo surfaces. The three testimonials retain their Phase 3 content.

Implementation notes: Supabase uses the official header wordmark from `https://supabase.com/`, with a `581 × 113` viewBox, the site's ink color for the text, and the original green symbol gradients. Its strip height is `clamp(16px, 1.8vw, 21px)` and pricing height is `20px`. This wider wordmark uses a slightly shorter height than Ramp and Replit to follow the user's reduced-size reference. Existing company sizing and testimonial data are unchanged.

Validation for Phases 4–5: `npx svelte-kit sync` and `npx svelte-check --tsconfig ./tsconfig.json` passed with zero errors and warnings. A source comparison confirmed all testimonial data and the earlier three brand entries are unchanged. Registry order, SVG dimensions, and gradient/clip references were checked. No old Street Talk or Zensai references remain in customer data or the marketing/pricing components. No tests or browser automation were run.

## Phase 5 — PostHog

- [x] Add `static/logos/posthog.svg` and its shared dimensions and display sizing.
- [x] Replace Zensai in the registry with PostHog; place PostHog fifth in the target order.
- [x] Use a readable official wordmark at the existing display scale.

Done when both logo surfaces use Rippling, Ramp, Replit, Supabase, and PostHog in that order. All five old customer companies have been replaced.

Implementation notes: PostHog uses the official wordmark from `https://posthog.com/brand/posthog-logo.svg`, with a `160 × 28` viewBox, the site's ink color for its dark paths, and the original colored hedgehog symbol. Its strip height is `clamp(16px, 1.8vw, 21px)` and pricing height is `20px`, matching Supabase's reduced scale. The shared registry now reads Rippling, Ramp, Replit, Supabase, PostHog. Both surfaces resolve these SVGs directly from the registry. Validation is recorded with Phase 4 above; old logo asset cleanup remains scheduled for Phase 11.

## Phase 6 — Retool

- [x] Add `static/logos/retool.svg` and its shared dimensions and display sizing.
- [x] Append Retool as the sixth company.
- [x] Adjust strip fit thresholds if needed and ensure the pricing grid wraps cleanly.

Done when Retool is included once in each logo surface's data, with the strip showing it when space permits.

Implementation notes: Retool uses the official header wordmark from `https://retool.com/`, with an `87 × 17` viewBox and the site's ink color. Its strip height is `clamp(16px, 1.8vw, 21px)` and pricing height is `20px`, matching the reduced Supabase and PostHog sizing. The existing strip thresholds support six and seven companies without adjustment; pricing automatically wraps the additions into centered rows. Earlier brand entries and all testimonial data remain unchanged.

## Phase 7 — RevenueCat

- [x] Add `static/logos/revenuecat.svg` and its shared dimensions and display sizing.
- [x] Append RevenueCat as the seventh company, preserving its capitalization.
- [x] Account for the wordmark's width so it fits within pricing tiles without distortion.

Done when RevenueCat is included once in both logo surfaces and its dimensions preserve the original aspect ratio.

Implementation notes: RevenueCat uses the official header asset from `https://www.revenuecat.com/website/_next/static/immutable/media/logo.3-m_vtr0mkp56.svg`, with the original `138 × 40` viewBox and the site's ink color. Its strip height is `clamp(23px, 2.6vw, 30px)` and pricing height is `28px`. The larger nominal height accounts for the asset's vertical padding and cat tail; its rendered width stays close to Retool, Supabase, and PostHog. The shared registry now reads Rippling, Ramp, Replit, Supabase, PostHog, Retool, RevenueCat.

Validation for Phases 6–7: `npx svelte-kit sync` and `npx svelte-check --tsconfig ./tsconfig.json` passed with zero errors and warnings. A source comparison confirmed the earlier five brand entries and all testimonial data are unchanged. Registry order, intrinsic SVG dimensions, and original path geometry were checked. A width calculation confirmed all seven logos fit the current desktop hero strip; existing mobile thresholds and centered pricing rows remain applicable. `git diff --check` passed. No tests or browser automation were run.

## Phase 8 — Lattice

- [x] Add `static/logos/lattice.svg` and its shared dimensions and display sizing.
- [x] Append Lattice as the eighth company.
- [x] Balance its apparent size with the preceding wordmarks.

Done when Lattice is included once in both logo surfaces, with labels derived from its shared entry.

Implementation notes: Lattice uses the official header wordmark from `https://lattice.com/`, sourced from `https://cdn.prod.website-files.com/64ad6f1aef87635bd23449f1/66ed6200f5f22a3486307da2_logo-color-lattice.svg`. The original `112 × 21` viewBox and colored symbol are preserved, with the text adapted to the site's ink color. Its strip height is `clamp(14.5px, 1.6vw, 19px)` and pricing height is `18px`, accounting for the symbol's height relative to the text. All seven previous brand entries, including their latest sizing adjustments, and all testimonial data are unchanged. Existing responsive thresholds and centered pricing rows support the eighth company without component changes.

Validation: `npx svelte-kit sync` and `npx svelte-check --tsconfig ./tsconfig.json` passed with zero errors and warnings. Source comparisons confirmed the earlier seven entries, all testimonial data, and the strip component are unchanged. The SVG's intrinsic dimensions, original path geometry, and color treatment were checked. A width calculation confirmed all eight logos fit the desktop hero strip at viewport widths from `1024px` to `2560px`. `git diff --check` passed. No tests or browser automation were run.

## Phase 9 — Zip

- [x] Add `static/logos/zip.svg` for Zip procurement and its shared dimensions and display sizing.
- [x] Append Zip as the ninth company.
- [x] Size the short wordmark for consistent visual weight without stretching it.

Done when Zip is included once in both logo surfaces and uses the intended company's mark.

Implementation notes: Zip uses the official header wordmark from `https://ziphq.com/`, with its original `54 × 37` viewBox and path geometry. The black mark is adapted to the site's ink color. Its strip height is `clamp(16px, 1.8vw, 22px)` and pricing height is `21px`, accounting for the mark's top strokes and descender while preserving its aspect ratio. The existing strip thresholds show Zip when space permits, and pricing renders the ninth company automatically. All eight previous entries, their reviewed sizing, and all testimonial data are unchanged.

Validation: `npx svelte-kit sync` and `npx svelte-check --tsconfig ./tsconfig.json` passed with zero errors and warnings. Source comparisons confirmed the earlier eight brand entries, all testimonial data, and the strip component are unchanged. Registry order, SVG dimensions, original Zip path geometry, and ink color were checked. A width calculation confirmed the visible logos fit the desktop hero strip from `1024px` to `2560px`, with at least `18.7px` to spare. `git diff --check` passed. No tests or browser automation were run.

## Phase 10 — Webflow

- [x] Add `static/logos/webflow.svg` and its shared dimensions and display sizing.
- [x] Append Webflow as the tenth company.
- [x] Use the current official wordmark and tune it for the existing backgrounds.

Done when Webflow is included once in both logo surfaces, maintaining the requested order.

Implementation notes: Webflow uses the official header wordmark from `https://webflow.com/`, with its original `108 × 19` viewBox and path geometry. The blue symbol is preserved, with the text adapted to the site's ink color. Its strip height is `clamp(15px, 1.65vw, 20px)` and pricing height is `19px`, matching the current wordmarks' apparent height. The desktop strip shows the tenth logo above a `1100px` container width, with the corresponding tooltip anchor updated for narrower widths. Pricing renders the tenth entry automatically. All nine earlier entries, their reviewed sizing, and all testimonial data are unchanged.

Validation: `npx svelte-kit sync` and `npx svelte-check --tsconfig ./tsconfig.json` passed with zero errors and warnings. Source comparisons confirmed the earlier nine brand entries, all testimonial data, the pricing component, and the testimonial component are unchanged; the strip component only changes the tenth-logo threshold and its corresponding tooltip anchor. Registry order, SVG dimensions, original Webflow path geometry, and color treatment were checked. A width calculation confirmed the visible logos fit the desktop hero strip from `1024px` to `2560px`, with at least `5.5px` to spare. `git diff --check` passed. No tests or browser automation were run.

## Phase 11 — Algolia and final cleanup

- [x] Add `static/logos/algolia.svg` and its shared dimensions and display sizing.
- [x] Append Algolia as the eleventh and final company.
- [x] Finalize strip sizing and responsive thresholds for the complete set of eleven; remove obsolete twelfth-slot behavior.
- [x] Finalize the pricing grid's centered last row and confirm all eleven entries are rendered once.
- [x] Remove unused Oceans, Street Talk, Zensai, Brex, and Vanta customer logo files after checking their remaining references.
- [x] Search customer data and marketing components for old company names and obsolete logo paths. Keep the unrelated Oceans sample contract intact.
- [x] Compare the three testimonial quotes, names, and titles against the table above; only companies and logos should differ from the originals.
- [x] Run source/type validation if needed: `npx svelte-kit sync` followed by `npx svelte-check --tsconfig ./tsconfig.json`.
- [x] Leave browser review to the user: homepage strip, three testimonial cards, pricing grid, desktop and mobile.

Done when the customer registry contains exactly the eleven requested companies in order, both logo surfaces use that registry without repetition, and the three placeholder testimonials retain their original text and attribution with Rippling, Ramp, and Replit logos.

Implementation notes: Algolia uses the official header wordmark from `https://www.algolia.com/`, retaining its `2197 × 501` viewBox and all four original paths, adapted to the site's ink color. Its strip height is `clamp(17px, 1.9vw, 23px)` and pricing height is `22px`, accounting for the symbol and descender. The desktop strip shows the eleventh logo above a `1225px` container width; the tenth logo's tooltip anchor follows the same threshold. All eleven entries render once in the centered wrapping pricing grid without component changes. Removed the eight unreferenced old customer assets: `oceans.png`, `oceans.svg`, `street-talk.png`, `zensai-color.png`, `brex.png`, `brex.svg`, `vanta.png`, and `vanta.svg`. All earlier brand entries, reviewed sizes, and placeholder testimonials are unchanged.

Validation: `npx svelte-kit sync` and `npx svelte-check --tsconfig ./tsconfig.json` passed with zero errors and warnings. Source comparisons confirmed the earlier ten brand entries, all testimonial data, the pricing and testimonial components, and the Oceans sample contract are unchanged; the strip component only changes the eleventh-logo threshold and corresponding tooltip anchor. Registry order, all SVG dimensions, original Algolia path geometry, unique rendering, and the centered pricing layout were checked. The visible desktop logos fit from `1024px` to `2560px`, with at least `5.5px` to spare. No old customer names remain in customer data, marketing components, or routes, and no references remain to the removed logo files outside historical plan notes. Each removed asset was checked against its tracked version before deletion to preserve workspace edits. `git diff --check` passed. No tests or browser automation were run.

## Execution notes

All eleven phases are complete; browser review remains with the user.

Testimonial logo treatment: Replit renders in black and white using a brightness filter on its testimonial image. Its shared SVG and other placements retain their original colors and current sizing.

Sizing review: the current sizing table incorporates the user's adjustments. Zip, Webflow, and Algolia each received two successive 5% reductions across the strip and pricing grid. Lattice decreased by 3% across both surfaces, followed most recently by a 3% reduction for PostHog. These adjustments affect display heights only; all quotes, names, titles, brand order, asset paths, and intrinsic dimensions are preserved.

Preserve existing workspace edits, including the ongoing pricing work. Update these checkboxes as phases are implemented. Do not add or expand tests. Browser automation is unnecessary for this change. The repository's `npm run check` and `npm run build` also run feature playback tests, so use the narrower source/type commands above when validation is needed.
