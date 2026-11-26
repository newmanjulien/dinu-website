# Plan: reproduce the Loops pricing element on `/pricing`

Prepared 2026-11-25. Status: Phases 1–13 implemented; Phase 14 source/type checks passed and corrections implemented. User browser review and pixel-perfect visual acceptance remain pending. Executing agents must maintain this document as described below.

## Agreed outcome

Reproduce the pricing element at [loops.so/pricing](https://loops.so/pricing), using the supplied recording as the desktop visual and motion reference. Keep all three visible columns: **Free, Growth, Enterprise**. One shared slider and one pricing model select the active tier; Growth's amount changes with contact volume.

**Pixel-perfect reproduction is the acceptance requirement, not an approximate visual direction.** The supplied video is a recording of Loops' pricing element: [loops.so/pricing](https://loops.so/pricing) and the video describe the same target. Copy its prices, copy, typography, colors, spacing, background animations, slider, and responsive behavior exactly. Dinu customization comes later, after this reproduction is complete.

The slider and all three background animations are especially important. Preserve their exact geometry, tick spacing, colors, gradients, masks, pixel scale, formulas, timing, and interaction behavior. A visually similar replacement, generic animation, or familiar Dinu component is not an acceptable substitute. Every visual phase below carries this requirement, even when its description does not repeat it.

The following explicit user decisions override the reference:

- The active button's fill follows the selected tier **immediately during dragging**. Loops holds the button selection until release; do not copy that hold.
- All conversion buttons, including the mobile sticky button, are **no-ops**. Keep their appearance, hover, press, and keyboard focus behavior; they must not navigate, submit, open email, or send click analytics. The mobile plan-summary buttons still perform their original scroll behavior.
- Make bold text in the pricing element slightly lighter: use Inter **500** instead of the reference's 600 for tier labels, emphasized feature text, and mobile summary names. Conversion buttons (including the sticky CTA) use regular Inter **400**, per the user's subsequent request for non-bold buttons. Use the matching published font assets; these weights override specifications and historical notes below.
- Main price text uses Newsreader **350**, slightly lighter than the reference's 400. Reuse the site's existing variable Newsreader asset under the scoped pricing family, with automatic optical sizing disabled. This applies to the card prices and mobile summary prices and overrides the original static price-font specification below.
- The outer pricing card has no shadow, per the user's subsequent request. This overrides the reference frame-shadow specifications below.
- The red dot inside the slider handle is **25% smaller** than the reference: multiply both radial-gradient stop radii by 0.75, preserving power-dependent sizing. The outer handle size is unchanged. This applies to desktop and mobile.
- The slider uses the homepage's light-to-bright red palette instead of Loops' orange: the gradient uses `--homepage-band-1` (`#ffb1aa`) at 0%, `--homepage-band-2` (`#ff8177`) at 30%, and bright brand red (`#ff4f45`) at 65% and 100%, with matching red thumb, glow, and sheen. The user explicitly rejected the dark endpoint; do not use `--homepage-band-4` or brand dark on the slider. Preserve the original geometry, stop positions, clipping, and animation. This applies to desktop and mobile and overrides orange specifications below.
- Following the user's request to fix all review findings, repair the copied canvas lifecycle limitations: reduced-motion backgrounds and sparks must repaint after resizing, react to live motion-preference changes, and leave no running callbacks after teardown. Static sparks must follow slider power, and spark sizing must refresh DPR on resize. Preserve the captured pattern/particle formulas and ordinary motion. This supersedes historical instructions to retain these reference quirks.

## References and captured code

- [Loops pricing page](https://loops.so/pricing).
- [Original recording](</Users/juliennewman/Desktop/Screen Recording 2026-11-25 at 4.17.19 PM.mov>): 2878 × 1306, approximately 20.33 seconds at 59.95 fps.
- [Video contact sheet](../references/loops-pricing/video/contact-sheet.jpg), sampled approximately once per second.
- [Published JavaScript bundle containing `PricingSlider`](https://framerusercontent.com/sites/6mKmSN0Irj9Tv9spjec3zG/WGlKKEJ8NNt9A32Hx0ms6dLh09AkxAn9u84qIfGr8gg.ObWq8hpF.mjs).
- [Unformatted pricing component extracted from that bundle](../references/loops-pricing/pricing-component.published.mjs).
- [Readable version of the same published component](../references/loops-pricing/pricing-component.formatted.js). This includes the pricing table, stop mapping, drag handling, both canvas renderers, all three pattern formulas, CSS, and mobile behavior. React/Framer aliases from the surrounding bundle are omitted; it is reference material, not an application module.
- [Exact pricing CSS extracted from the server-rendered page](../references/loops-pricing/pricing-ssr.css) and [the corresponding HTML](../references/loops-pricing/pricing-ssr.html).
- [Page-level typography defaults inherited by the component](../references/loops-pricing/page-typography.published.css). These include font smoothing and the 12px default font size; the reference's inherited line-height is `normal`. Port these defaults within the pricing namespace so Dinu's page reset cannot change mobile summary metrics or text rasterization.
- [Published font declarations and asset URLs](../references/loops-pricing/fonts.published.css).
- [Capture metadata, source hashes, dimensions, and color tokens](../references/loops-pricing/capture.json).

Use the captured source for exact numeric values and algorithms, and the recording of that same element for composition, placement, and perceived motion. These are complementary evidence of one pixel-perfect target. The recording is compressed and does not establish browser zoom or device pixel ratio; CSS dimensions come from the source rather than equating a recorded pixel with a CSS pixel. If evidence appears inconsistent, record the discrepancy and resolve its cause; do not silently approximate or weaken the fidelity requirement.

| Recording time | Evidence | Implementation requirement |
| --- | --- | --- |
| [0s](../references/loops-pricing/video/frame-00s.png) | Growth initially active, $49/month, 5,000 contacts; warm slider filled to the first Growth notch | Default selected stop is 10, at 35% of the usable track |
| [4s](../references/loops-pricing/video/frame-04s.png) | Slider at the Free end; faint expanding/contracting dither field behind Free | Free retains the $0 and 1,000-contact offer while selection moves within its region |
| [7s](../references/loops-pricing/video/frame-07s.png) | Growth $399/month at 100,000 contacts; traveling concentric dither bands | Price and contacts come from the captured table; use the original ring formula |
| [10s](../references/loops-pricing/video/frame-10s.png) | Enterprise selected at 5 million contacts; sphere-like dither background | Custom pricing keeps Growth clamped at $4,799 and 1.5 million; Enterprise volume changes |
| [16s](../references/loops-pricing/video/frame-16s.png) | Beyond the final stop: 239.9 million+ contacts; Enterprise button filled after release | Preserve the far-right overflow interaction, with immediate button selection as requested |
| [19s](../references/loops-pricing/video/frame-19s.png) | Keyboard focus outline around the slider | Preserve visible native-range keyboard focus styling |

## Current implementation and replacement

[Current route](/Users/juliennewman/Documents/dinu-website/src/routes/pricing/+page.svelte) now renders `PricingElement` in `Subpage`'s optional `wideContent` slot. The pricing-only wrapper uses Loops' 1296px outer maximum and 24px inline gutters, yielding the exact 1248px element maximum. Customer logos, FAQ, heading, metadata, and page chrome retain their existing content and measured containers. The old static two-column grid, fixed pricing markup, and two portal conversion links have been removed. Implementation and Phase 14's source/type checks are complete; rendered pixel-perfect acceptance remains pending in Phase 14.

[DotWaveBackground.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/ui/DotWaveBackground.svelte) draws smooth, domain-warped circular dots on a 6px grid. Its former pricing usage/import has been removed; the existing workspace component is retained. The pricing element now uses the captured binary ordered-dither renderer and three original pattern functions.

The implemented pricing-specific component group:

| File | Responsibility |
| --- | --- |
| `src/lib/components/pricing/PricingElement.svelte` | Three-column ledger, derived active tier, features, no-op conversion buttons, footnotes, mobile summary and sticky CTA |
| `src/lib/components/pricing/PricingSlider.svelte` | Shared desktop range, mobile Growth range, drag position versus selected stop, ticks, keyboard and overflow behavior |
| `src/lib/components/pricing/PricingBackground.svelte` | Original ordered-dither renderer and three patterns |
| `src/lib/components/pricing/SliderSparks.svelte` | Original 36-particle canvas renderer |
| `src/lib/components/pricing/pricing-model.ts` | Captured table, stop positions, selection, formatting, and overflow calculations |
| `src/lib/components/pricing/pricing.css` | Scoped source-equivalent ledger, slider, button, masking, and responsive CSS |

The Plans section is integrated through `PricingElement`. Keep customer logos, FAQ, and page chrome outside this element's scope during corrections. Preserve existing workspace edits. Pricing-only constants and unused imports have been removed. Do not introduce React or Framer into this Svelte 5 app.

## Execution rules and living plan

Execute the numbered phases below in order. Keep each phase focused on its stated deliverable. The technical specifications following the phases contain the captured code and exact values that govern implementation.

**Testing is concentrated in Phase 14.** Phases 1–13 are implementation phases, with no routine test, build, checker, browser-comparison, or validation step at the end of each phase. Completing an implementation phase means its deliverable is written and this plan is updated; it does not mean pixel-perfect fidelity has already been verified. Keep verification pending until the testing phase establishes it.

**Every executing agent must update this `.md` during execution, not only in its final message:**

- Before starting a phase, read the current status table, execution notes, relevant technical specification, and captured source. Mark that phase `In progress`.
- When completing a phase, mark it `Implemented; verification pending`, record the actual files changed, and leave a concise handoff for the next phase. Only Phase 14 can establish final verification status.
- As soon as a finding affects later work, add it to the execution notes and update the affected future phase or technical specification. Record source references, corrected assumptions, decisions, dependencies, unresolved questions, and exact values needed by later agents. Do not leave relevant discoveries only in chat or rely on an agent's memory.
- If scope or implementation order needs adjustment, revise this document before dependent work proceeds. Preserve the user decisions and pixel-perfect requirement. Do not mark unfinished work complete or silently substitute an approximation.
- Phase 14 owns test results and fidelity findings. If it reveals a defect, record it here, identify the responsible implementation phase, repair that phase's deliverable, and return to Phase 14 for targeted verification. Do not introduce routine testing after every implementation phase.

This plan does not authorize spawning additional agents; it governs whichever agent executes the work.

| Phase | Deliverable | Status |
| --- | --- | --- |
| 1 | Shared pricing model and stop mapping | Implemented; verification pending |
| 2 | Desktop ledger, local fonts, and exact geometry | Implemented; verification pending |
| 3 | Desktop range interaction and keyboard behavior | Implemented; verification pending |
| 4 | Slider track, thumb, ticks, and visual states | Implemented; verification pending |
| 5 | Slider spark animation | Implemented; verification pending |
| 6 | Dither renderer and three exact pattern functions | Implemented; verification pending |
| 7 | Background placement, masks, and tier transitions | Implemented; verification pending |
| 8 | Immediate button-fill handoff and no-op CTAs | Implemented; verification pending |
| 9 | Responsive frame and stacked mobile cards | Implemented; verification pending |
| 10 | Mobile Growth slider | Implemented; verification pending |
| 11 | Mobile plan-summary navigation | Implemented; verification pending |
| 12 | Mobile sticky conversion bar | Implemented; verification pending |
| 13 | Route integration and obsolete-code cleanup | Implemented; verification pending |
| 14 | Testing, fidelity review, and corrections | Source/type checks passed; user visual acceptance pending |

### Phase 1 — Shared pricing model and stop mapping

Create `pricing-model.ts` with the captured price table, 35 desktop stops, nonlinear positions, nearest-stop selection, clamped Growth values, Enterprise formatting, and far-right overflow calculation. Establish the default selection and shared state contract for the element and slider. Use the **Pricing model** specification below; avoid independent plan-selection state.

Deliverable: the complete model and the state/props contract that later components will consume. Record that contract in the execution notes.

### Phase 2 — Desktop ledger, local fonts, and exact geometry

Create the desktop structure in `PricingElement.svelte` and scoped `pricing.css`. Use the local published Inter 400/500 assets and existing variable Newsreader at 350 under distinct pricing font-family names, per the subsequent user decisions. Port the eight-row, three-column ledger, copy, separators, price metrics, palette, padding, and outer frame from the captured CSS/markup, with no outer shadow. Include the reference's inherited page typography defaults inside the pricing scope. Render from the Phase 1 model and reserve the source's slider row and background layers.

Deliverable: the complete desktop composition with source-exact geometry and typography. Pixel-perfect sizing takes precedence over adapting the existing grid or shared Dinu button styles.

### Phase 3 — Desktop range interaction and keyboard behavior

Create `PricingSlider.svelte` with the native range input and the captured continuous-drag versus discrete-stop behavior. Connect selected stop and overflow to the shared model. Port pointer release/cancellation, snapping, keyboard navigation, far-right overflow interaction, and accessible value text. Derive tier changes during dragging immediately; omit Loops' temporary button-selection hold.

Use the exported `PricingSliderProps` and Phase 1 handoff below. The desktop mode defaults to `desktop`; submit updated shared state through `onChange`, rather than introducing another selected-stop state. Preserve the captured distinction between native range value text and the visual contact labels.

Replace Phase 2's reserved `.lm-plan-scale` row in the element with the slider component, retaining the source root class and `grid-row: 4`. Remove `.lm-scale-reserve`. Preserve the row's 70px geometry while adding the native input and tick area; the exact decorative layers follow in Phase 4.

Deliverable: the complete desktop input/state interaction, ready for the exact visual layers.

### Phase 4 — Slider track, thumb, ticks, and visual states

Port the original 24px track, 20px desktop thumb, nonlinear tick positions, gradient geometry, clipping, sheen, knob core, shadows, focus appearance, and hover/press transitions. Apply the current bright red palette and 25% smaller knob core from the user decisions and technical specification. Keep continuous fill/thumb movement separate from discrete active ticks. Use the **Slider and spark animation** specification and captured CSS without inventing easing or spreading notches uniformly.

Extend Phase 3's existing `.lm-power`, `.lm-range`, `.lm-ticks`, and `.lm-tick` markup/rules. Add the original meter/fill layers before the native input; preserve the existing `--lm-power`, tick coordinates/data attributes, input handlers, and 70px row. The native appearance is intentionally still present after Phase 3; Phase 4 must reset it and port both WebKit and Firefox track/thumb rules exactly.

Deliverable: the exact static and interactive slider appearance, with the canvas layer reserved for Phase 5. The denser Growth notches are required for pixel-perfect fidelity.

### Phase 5 — Slider spark animation

Create `SliderSparks.svelte` and integrate it into the filled track. Port all 36 particles, random distributions, power-dependent speed, alpha formula, DPR sizing, delta cap, clipping, and reduced-motion snapshot from `dr`. Apply the user-authorized lifecycle corrections: repaint static frames on resize and power updates, refresh DPR on resize, listen for live motion-preference changes, and clean up every RAF, observer, and listener.

Phase 4 has created the source's `.lm-meter[aria-hidden="true"] > .lm-meter-fill` before the input in `PricingSlider.svelte`. Insert `SliderSparks` inside that existing fill, after its glossy `::before` layer in painting order. Add the captured `.lm-sparks` canvas sizing rule in the scoped stylesheet; do not add a second meter, resize the gradient to the filled fraction, or change the existing clipping. Pass the same continuous/snapped power used by CSS as the canvas's reactive `power` prop; mobile supplies Growth-local progress divided by 100. Power updates must not recreate particles.

Deliverable: the source-equivalent animation inside the slider. Generic particles or a CSS shimmer cannot substitute for the captured renderer.

### Phase 6 — Dither renderer and three exact pattern functions

Create `PricingBackground.svelte` with the captured matrix, 3px backing scale, binary threshold, 30fps gate, reveal calculation, reduced-motion frame, and all three original formulas. Port renderer activation and resource cleanup, retaining the last canvas image on deactivation. Apply the user-authorized lifecycle corrections: skip unchanged backing dimensions, repaint reduced-motion frames after resizing, and handle live motion-preference changes with proper listener/RAF cleanup.

Deliverable: one reusable renderer capable of reproducing Free, Growth, and Enterprise exactly. Preserve the formulas and low-resolution pixel structure; do not adapt `DotWaveBackground`'s circular dots.

### Phase 7 — Background placement, masks, and tier transitions

Connect one background layer per ledger column to the derived active tier. Copy wrapper margins, canvas insets, horizontal/vertical/diagonal masks, opacity, compositing rules, layer order, and fade timing from the source. Keep the slider above the backgrounds and ensure backgrounds cannot intercept input.

Use the three existing `.lm-focus` layers created in Phase 2; add the renderer inside each and complete their CSS instead of adding another set of grid layers.

Phase 6 provides `PricingBackground.svelte` with props `{ active: boolean; pattern: PricingTier }` and a decorative `.lm-dither` canvas. Keep one instance mounted inside each focus layer, with its fixed tier pattern and `active={details.activeTier === tier}`. Activation restarts the renderer/reveal; deactivation retains the canvas image for the wrapper's fade. Do not conditionally mount the selected canvas, key instances by selection, or change patterns in one shared canvas. Canvas sizing, inherited ink color, pixelated rendering, opacity, and all masks belong to this phase.

Deliverable: the three animations positioned and revealed exactly as on Loops and in the recording. Placement, masking, density, and transition timing are part of pixel-perfect fidelity, not decorative details.

### Phase 8 — Immediate button-fill handoff and no-op CTAs

Port the original button geometry, dark fill, outlined inactive state, pseudo-element scaling, label transitions, hover, focus, and pressed state. Bind fill selection directly to the active tier during dragging. Use enabled `button type="button"` conversion controls without navigation, submission, email, or click analytics; reset native button styling explicitly.

Deliverable: exact Loops button visuals and transitions with the two agreed behavioral exceptions applied.

### Phase 9 — Responsive frame and stacked mobile cards

Port the original viewport and container breakpoints. Remove the frame at the specified viewport width, reduce cell padding at the specified container width, and stack cards Growth-first at the original threshold. Preserve exact mobile card spacing/colors and hide the shared desktop range, rules, and dither backgrounds where Loops hides them. Reserve the summary strip, Growth-local slider, and sticky bar for the following phases.

Phase 7 keeps the three background instances mounted with fixed patterns and tier-driven activation. At container widths ≤719px, copy the source's `.lm-focus { display: none; }` rule; do not conditionally unmount the canvases or add viewport-dependent activation state. Retain their existing masks, dimensions, layer order, and reduced-motion transition override when the desktop layout returns.

Deliverable: the source-equivalent responsive card layout, independent of Dinu's default breakpoints.

### Phase 10 — Mobile Growth slider

Add the paid-only mobile range for stops 10–27, sharing the pricing model and applicable slider visual layers. Port the 44px transparent touch target, 24px visible knob, negative margins, tick geometry, endpoint labels, fill, and sparks from the source.

Use `PricingSliderProps` with `mode="growth"`. The clamped `growth.stopIndex` is also the mobile range's value; submit a paid stop through `selectPricingStop` so changes update the same owner state.

Phase 3 defaults `mode` to `desktop` and renders only that branch. Add the Growth branch here with the captured mobile input behavior and shared visual layers. Do not attach desktop overflow or full-range keyboard handlers to the paid-only input.

Reuse `SliderSparks.svelte` inside the mobile `.lm-meter-fill`, under the source's `aria-hidden="true"` meter. Set the Growth-local power on the mobile slider wrapper and pass the identical `details.growth.progress / 100` as the canvas's `power` prop; retain the full-width canvas and fill clipping. Do not restart particles on every paid-stop change or create a separate mobile particle algorithm. Static sparks must repaint when this power changes, per the canvas lifecycle correction.

Phase 9 supplies the `.lm-mobile-scale` hidden base rule, its ≤719px container visibility rule, and the Growth cell's `4px 20px 16px` stacked padding. Add the Growth branch inside the existing fourth cell without duplicating those rules. The source's 44px touch-target/24px knob overrides are a separate ≤809.98px **viewport** query; retain this distinction even when a narrow container stacks inside a wider viewport.

Deliverable: the exact mobile slider and its Growth pricing interaction. Do not extend the desktop Free-to-Enterprise range into the stacked layout.

### Phase 11 — Mobile plan-summary navigation

Implement the three-part summary strip with source copy/prices, static Growth emphasis, and plan scrolling. Preserve the 88px scroll margin, smooth scrolling, and immediate reduced-motion scrolling. These summary controls remain functional navigation within the page.

Phase 10 has connected the Growth-local slider to the existing owner state. Derive the summary's Growth price from `details.growth.price` so it follows either slider without adding selection state. Summary clicks only scroll to the corresponding card; do not change the selected pricing stop or attach conversion behavior. Preserve Phase 9's viewport/container distinction and existing scroll margin.

Deliverable: the complete source-equivalent mobile summary and scroll behavior.

### Phase 12 — Mobile sticky conversion bar

Implement the original CTA visibility and footer conditions, entrance fade, and safe-area spacing. Clean up any observers/listeners when unmounted. Keep the sticky conversion button visually identical and a no-op.

Phase 8 has completed the shared `.lm-btn` rules and existing enabled no-op `cta(label, primary)` snippet. Reuse them with `primary=true` for the source's always-filled sticky signup button; do not introduce navigation, click tracking, a disabled state, or a second button animation. Ensure the body-portal wrapper carries the pricing namespace, font, and palette so these scoped rules apply, including hover, focus, press, and reduced motion.

The stylesheet is scoped through `.loops-pricing`. If the sticky bar is portaled to `document.body` as in the original, give its wrapper the same pricing namespace/font/palette context and explicitly apply the original fixed-bar sizing; it cannot rely on inheritance from the element left in the page.

Phase 11 adds functional `.lm-glance-cell` summary buttons before the ledger. The original sticky visibility calculation queries only `.lm-col .lm-btn`; preserve that selector so summary navigation buttons do not count as conversion CTAs. Summary scrolling should naturally reach the existing scroll listener, without a separate sticky-state callback or changing pricing selection.

Deliverable: the complete mobile sticky bar with source-equivalent visibility behavior.

### Phase 13 — Route integration and obsolete-code cleanup

Replace the route's current Plans section with the new element. Apply the local width/gutter hook if necessary, connect the footer visibility target for mobile, and remove obsolete pricing-only constants/imports and portal-link behavior. Preserve customer logos, FAQs, page chrome, and existing workspace edits. Resolve any unfinished wiring recorded by earlier phases and keep implementation scoped to this pricing element.

Phase 12 now owns its root-scoped CTA lookup, document-body portal, scroll/resize listeners, and cleanup within `PricingElement`; importing the element completes this wiring without route-level sticky state or callbacks. The existing `Footer.svelte` has a semantic `<footer id="site-footer">`, which already matches the source's `document.querySelector('footer')`. Preserve that target and the source selector; no new footer hook or footer modification is needed when that component remains mounted. Keep the bar outside route containers/transforms via its existing body portal, and retain the scoped pricing CSS/font loading.

Phase 13 supplies the reference sizing through `Subpage`'s optional `wideContent: Snippet`, rendered before ordinary children outside their `SiteContainer`. The route's `.pricing-plans` section is a centered 1296px border-box with 24px inline padding at every viewport width. Keep this wrapper outside the ordinary 1246.3px content cap; do not add the old Plans padding/border/overflow wrapper around the element. Heading and ordinary children still use the existing measured containers and vertical spacing.

Deliverable: the integrated `/pricing` implementation ready for the single testing phase. Do not mark fidelity verified yet.

### Phase 14 — Testing, fidelity review, and corrections

This is the dedicated testing phase for all preceding implementation. Do not add new tests or use Playwright. Run Svelte's existing type/component checker directly; the repository's `npm run check` also runs unrelated feature-tour tests, which this change does not require. Follow repository restrictions on existing tests and browser use; keep visual browser comparisons for the user's review unless agent browser inspection becomes absolutely necessary to resolve a concrete issue.

Use the saved code, CSS, video frames, and recording to assess the implementation. Record commands, outcomes, fidelity findings, corrections, and any user review still pending in this document. A passing type check alone does not establish pixel-perfect fidelity.

Fidelity review must establish:

- At the same rendered width, font loading, zoom, and display scale, card edges, row rules, text baselines, button bounds, slider track/thumb, and tick coordinates match Loops and its recording exactly.
- Free/Growth/Enterprise activate at the original nearest-stop boundaries; Growth pricing and custom counts match the captured table and recording.
- Dragging is continuous, release snaps correctly, keyboard navigation advances meaningful stops, and far-right overflow matches the recording.
- All three background patterns have the exact pixel scale, origin, density, mask, reveal, and motion speed. Slider gradient, sheen, knob glow, tick distribution, and spark motion match the captured source and recorded appearance.
- Button fill starts switching as soon as the selected tier changes, using the copied fill transition. This is the agreed departure from Loops' release timing.
- Mobile summary, stacked cards, paid-only slider, touch target, and sticky CTA follow the original source behavior and geometry.
- All conversion buttons remain no-ops.
- The integrated route's pricing wrapper has exact 24px inline gutters and a 1296px outer cap (1248px element), without inherited `SiteContainer` width reduction, extra Plans padding, duplicate footnotes, or clipped background/shadow layers. Heading, customers, FAQ, and the default `/about` use of `Subpage` retain their original layout. The semantic layout footer remains available to the sticky-bar selector.

Animated backgrounds use live time, and sparks use random seeds in the published source. Pixel-perfect fidelity requires the same algorithms, geometry, styling, and motion; compare animation frames at aligned elapsed phases, and account for the original random spark positions rather than replacing the effect. Browser zoom, device scale, compression, or animation phase differences must not become excuses for mismatched CSS or algorithms.

When review finds a mismatch, repair it and perform targeted re-verification within this testing phase. Repeat only the checks affected by corrections. Mark final fidelity verified only after the relevant comparison evidence exists; if user visual review is pending, state that explicitly and keep the corresponding acceptance items pending.

### Execution notes and handoff

#### 2026-11-25 — Canvas lifecycle corrections

Status: Implemented; component/type check passed. The user requested fixing all review findings. Earlier typography, unused-font, and stale-specification corrections are already implemented. Changed [PricingBackground.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/PricingBackground.svelte), [SliderSparks.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/SliderSparks.svelte), [PricingSlider.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/PricingSlider.svelte), and this plan.

- Both canvases repaint their reduced-motion image after a size change and ignore unchanged dimensions, preventing the observer's initial notification from erasing a static frame. Backgrounds keep the captured full-reveal time-1.2 snapshot and 3px backing scale.
- Both listen for live motion-preference changes: switching to reduced motion cancels the moving RAF and paints a static frame; switching back schedules motion again. Cleanup removes preference listeners, cancels RAF, and disconnects observers. Background deactivation still retains its last image for the wrapper fade.
- Desktop and mobile sparks receive their existing slider power explicitly. The reduced-motion snapshot repaints at its frozen timestamp when power changes, without advancing or recreating particles; ordinary motion uses the same power, speed, alpha, head/edge fade, and 36-particle distributions. Spark resize reads current DPR, with a window-resize listener for zoom/DPR changes, and restores the matching canvas transform. The decorative canvas is explicitly hidden from assistive technology.
- Separated painting from RAF scheduling so static redraws cannot create duplicate animation loops. No pattern formulas, thresholds, masks, gradients, font weights, button fill behavior, or slider geometry changed.

Ran `npx svelte-check --tsconfig ./tsconfig.json`: **0 errors and 0 warnings**. Reviewed resize, preference switching, static power updates, and teardown paths in source. No new tests, existing test suite, browser session, Playwright, or build. Updated current phase/specification instructions and marked the old lifecycle notes superseded; captured reference files remain intact. Rendered/runtime acceptance remains pending with the user.

#### 2026-11-25 — Post-implementation source review and cleanup

Reviewed all six pricing implementation files, route/portal wiring, the captured component, component CSS, and the saved full Loops page HTML. No additional pricing-table, pattern-formula, tier-selection, or teardown error found in source. Runtime interactions and rendered pixel-perfect acceptance remain pending; this review does not replace them.

Found and corrected a fidelity omission in Phase 2: the initial CSS comparison covered the component's declarations but missed Loops' inherited page typography. The full saved page sets `:root` font smoothing to `antialiased`/`grayscale` and `body,input,textarea,select,button` font size to 12px. None of the actual pricing ancestors overrides font size or line-height, so the latter is CSS's default `normal`. Dinu's Tailwind reset instead supplies inherited line-height 1.5 and a different default font size. Added scoped 12px/normal/smoothing defaults to `.loops-pricing` in [pricing.css](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/pricing.css), covering the body portal as well. Explicit cell/price/note metrics and all user-selected weights remain intact. Saved the exact relevant page rules in [page-typography.published.css](../references/loops-pricing/page-typography.published.css); the source was `/tmp/dinu-pricing-reference/loops-pricing.html`, captured on the original research date. Capture metadata records the full-page and excerpt hashes. **The earlier component-only declaration comparison was incomplete, despite its matching results.** Browser acceptance must include the corrected mobile summary spacing and Mac text rendering.

Removed unused `static/fonts/pricing/inter-600.woff2` and `newsreader-400.woff2` after confirming no application references remain. They were superseded by Inter 500 and the existing variable Newsreader asset. Their published source URLs remain in the reference font declarations and historical Phase 2 asset table. Updated the active technical specifications to use current weights, no frame shadow, bright red slider, and the smaller knob core. Historical execution notes and original captured code remain reference evidence, not instructions to restore superseded styling.

Confirmed all three extracted typography rules occur verbatim in the saved full-page HTML and recorded the hashes. No new tests, existing test suite, browser session, or Playwright run. This correction changes scoped CSS defaults and documentation/assets; it does not change Svelte or TypeScript logic. At this review, the prior 0-error/0-warning component check was the last checker result. The inherited reduced-motion canvas resize limitation identified here was subsequently repaired at the user's request in the canvas lifecycle correction above; the earlier instruction to retain it is superseded.

#### 2026-11-25 — Phase 14 source/type checks passed; visual acceptance pending

Changed files: [PricingElement.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/PricingElement.svelte), [PricingBackground.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/PricingBackground.svelte), [capture metadata](../references/loops-pricing/capture.json), and this plan. No CSS/visual values were changed during this phase. Preserve every subsequent user-requested deviation listed above.

Commands and results:

- `npx svelte-kit sync && npx svelte-check --tsconfig ./tsconfig.json`: initially 7 errors and 0 warnings, all in two pricing components. Corrected Phase 2/13's owner variable from `state` to `pricingState` to avoid conflict with Svelte's `$state` rune/store lookup. Corrected Phase 6's canvas alias after the undefined guard so TypeScript retains narrowing inside the resize callback. These are wiring/type corrections; pricing behavior and visual values remain unchanged.
- Targeted re-run, `npx svelte-check --tsconfig ./tsconfig.json`: **0 errors and 0 warnings** across the workspace.
- One-off inline `python3` comparison of the captured CSS and current stylesheet, normalizing the pricing selector prefix, equivalent font-family names, palette token aliases, and formatting: **328 of 338 reference declarations match**. The 10 differences are entirely the explicit user decisions: frame shadow removal, five font-weight changes, and four slider gradient/core/glow/sheen declarations. Additional declarations supply namespace/root sizing, button resets for enabled no-op native buttons, price optical sizing, and body-portal width resets. No unintended source CSS mismatch found. This is a declaration comparison, not a rendered-pixel comparison.
- One-off inline `node --input-type=module` comparison: loaded the exact captured `K`–`Yn` constants/functions and `or`–`ur` patterns using Node's VM, and transpiled the existing pricing TypeScript with the installed TypeScript package in memory. The price table, all **35** desktop indices/positions, clamped Growth details, Enterprise labels, and accessible value text match. Compared **1,001** continuous positions against captured nearest-stop selection and **601** overflow values against captured formatting: **no mismatches**.
- The same source comparison evaluated all three existing dither formulas at backing dimensions `1×1`, `82×150`, and `128×165`, times `0`, `1.2`, `7`, and `16`, and reveal values `0`, `0.5`, and `1`. **401,052** intensity samples and **1,203,156** binary pixel decisions match the captured patterns, matrix, and threshold. No mismatches. This confirms sampled computational equivalence; canvas display, masking, RAF cadence, and perceived motion still require browser review.
- One-off inline `python3` asset/provenance inspection: all three referenced local font files exist and have WOFF2 headers (`inter-400`: 27,380 bytes; `inter-500`: 27,996; variable `newsreader`: 58,152). The recorded excerpt hash matches the raw extracted code beginning at `function mn` with trailing whitespace stripped. The saved file includes an explanatory header/newline, so its whole-file hash differs. Added the hash scope and whole-file hash to capture metadata without changing the captured reference code.

Source/manual review findings:

- Reviewed the [video contact sheet](../references/loops-pricing/video/contact-sheet.jpg), [captured component](../references/loops-pricing/pricing-component.formatted.js), and [captured CSS](../references/loops-pricing/pricing-ssr.css). The video agrees with the copied default $49/5,000-contact stop, fixed Free offer, $399/100,000 paid stop, Enterprise selection with Growth clamped to $4,799, and far-right overflow. Its delayed button handoff is intentionally superseded by the user's immediate handoff.
- Desktop continuous drag/release, keyboard stop mapping, window pointer listeners/cleanup, right-edge-minus-10px overflow, and native accessibility values follow `ir`. Mobile's discrete 10–27 range, summary scroll callback, and sticky visibility predicate/portal/cleanup follow `hn`, `$n`, and `nr`. These handlers were inspected in source; actual pointer/touch/keyboard/scroll behavior has not been browser-exercised.
- Dither activation, retained fade-out image, 33ms gate, 700ms reveal, timestamp clock, resize handling, reduced-motion snapshot, masks, 0.1 opacity, and layer order match `pr` and the captured CSS. The 36-particle spark renderer's distributions, DPR resize, delta cap, head/edge fade, speed, alpha, and teardown match `dr`. Live motion has not been browser-compared.
- Conversion buttons are enabled `type="button"` controls with no href or action, including the body-portaled sticky CTA. The only pricing `onclick` belongs to summary navigation. Active background and conversion fill derive from the same selected tier immediately. No analytics or navigation code is present in the pricing component group.
- `/pricing` uses the local 1296px/24px wrapper outside `SiteContainer`; heading, customers, FAQ, and default `/about` retain their measured containers and source spacing classes. The layout provides the semantic footer queried by the sticky bar. CSS dimensions and wiring were reviewed; rendered widths, baseline alignment, default Subpage spacing, clipping, and footer/bar interaction remain visual/runtime acceptance items.

No new test files or suite changes, unrelated feature-tour tests, application build, browser session, or Playwright run. All one-off comparisons ran in memory and created no test infrastructure, consistent with `AGENTS.md` and this phase's instructions.

**Remaining acceptance:** the user should compare desktop and mobile `/pricing` with [Loops](https://loops.so/pricing) and the [recording](</Users/juliennewman/Desktop/Screen Recording 2026-11-25 at 4.17.19 PM.mov>), preserving all agreed deviations. Rendered edges/baselines, track/thumb/notches, aligned animation phases, font loading, dragging/release/overflow, immediate button fill, phone summary/touch slider/sticky bar/footer, and default `/about` spacing remain pending. No further numbered implementation phases remain. Phase 14 stays open for this visual acceptance and any resulting corrections; **pixel-perfect fidelity is not yet marked verified**.

**Slider handle dot reduction — implemented; visual review pending (2026-11-25).** Reduced both radial-gradient stop radii in the shared `--lm-knob` by 25%: the red core now ends at `1.125px + 1.125px * power`, and white begins at `1.5px + 1.125px * power`. Desktop and mobile inherit the smaller dot; the outer handle dimensions and glow are unchanged. Phase 14 must preserve this user-requested adjustment. No tests or browser checks were run.

**Slider endpoint correction — implemented; visual review pending (2026-11-25).** The user rejected the dark red endpoint. Changed the 100% stop to bright `--color-brand` (`#ff4f45`) and the sheen tint to the same brand red. The slider now stays bright red through its final segment on desktop and mobile. This supersedes the dark endpoint and sheen in the previous note. No tests or browser checks were run.

**Slider red palette — implemented; visual review pending (2026-11-25).** At the user's request, replaced all orange slider colors in `src/lib/components/pricing/pricing.css` with the existing homepage band/brand tokens from `src/lib/styles/marketing.css`. The gradient now follows the homepage's four reds; the thumb core and power-dependent bloom use brand red, the moving highlight uses the lightest homepage band, and the sheen uses brand dark. Both slider modes share these rules. Phase 14 must preserve this intentional palette adjustment. No tests or browser checks were run; phase statuses remain unchanged.

**Card shadow removal — implemented (2026-11-25).** Removed the outer `.lm-wide` box-shadow from `src/lib/components/pricing/pricing.css` at the user's request. Phase 14 must preserve this intentional frame adjustment. No tests or browser checks were run.

**Price weight adjustment — implemented; visual review pending (2026-11-25).** The user requested main prices such as $49 be a tad lighter. Changed `.lm-price` from 400 to 350 and the scoped `Dinu Pricing Newsreader` declaration to the existing `/fonts/newsreader.woff2` variable face (200–800, already declared in `src/app.html`). Disabled automatic optical sizing on price text to avoid size-dependent optical changes. Existing price sizes and spacing are retained, including mobile summary prices. Phase 14 must preserve this intentional typography adjustment; source-exact static Newsreader 400 is no longer the intended acceptance target for prices. No tests or browser checks were run.

**Button weight adjustment — implemented; visual review pending (2026-11-25).** The user subsequently requested non-bold pricing buttons like the other site buttons. Changed `.lm-btn` to regular Inter 400 using the existing local regular face; this covers all three plan CTAs and the mobile sticky CTA. Other pricing emphasis stays at 500. Phase 14 must preserve this intentional adjustment. No tests or browser checks were run.

**Typography adjustment — implemented; visual review pending (2026-11-25).** After Phase 13, the user requested slightly lighter bold text. Updated all four semibold selectors in `src/lib/components/pricing/pricing.css` from 600 to 500 and changed the local font declaration to `static/fonts/pricing/inter-500.woff2`, downloaded from [Loops' published Inter 500 Latin asset](https://framerusercontent.com/assets/UjlFhCnUjxhNfep4oYBPqnEssyo.woff2). The matching declaration was found in the captured full page at `/tmp/loops-pricing-page.html`; it uses the same Latin unicode range as the original 400/600 faces. This is an intentional user-authorized typography deviation for desktop and mobile. Phase 14 must preserve it when comparing to Loops; phase statuses remain unchanged. No tests or browser checks were run for this styling adjustment.

#### 2026-11-25 — Phase 13 implemented; verification pending

Changed files: [pricing route](/Users/juliennewman/Documents/dinu-website/src/routes/pricing/+page.svelte), [Subpage.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/site/Subpage.svelte), and this plan. The route now mounts the complete three-column `PricingElement`, including both sliders, all background/spark renderers, immediate button selection, mobile summary, and sticky no-op CTA. No tests, checker, build, or browser validation were run. Pixel-perfect verification against [Loops](https://loops.so/pricing) and the supplied [recording](</Users/juliennewman/Desktop/Screen Recording 2026-11-25 at 4.17.19 PM.mov>) remains Phase 14.

Source values and findings relevant to verification:

- The existing `Subpage` previously placed its heading and all children inside `SiteContainer`, capped at 1246.3px with 18px/32px outer gutters. A child maximum could not supply the source's 1248px element and exact 24px gutters. The new optional `wideContent?: Snippet` renders outside `SiteContainer`, before ordinary children. The heading and ordinary content use the existing measured containers; the same description-dependent 40px/48px or 20px content spacing is retained. Default callers need no new prop.
- `/pricing` supplies its Plans section as the named `wideContent` snippet. Local `.pricing-plans` CSS explicitly sets border-box sizing, 100% width, a 1296px outer maximum, auto inline margins, and 24px inline padding at every viewport width. These exact outer values are recorded in [capture metadata](../references/loops-pricing/capture.json); the existing element caps itself at 1248px. No global container, shared gutter, or component breakpoint was changed.
- The old Plans border, padded frame, two-column grid, repeated prices/features, duplicate footnotes, and portal signup links were replaced by the single element. Removed route-only `freeCell`, `freeFeature`, and `growthFeature` constants and `ButtonLink`, `DotWaveBackground`, and `createPortalAuthUrl` imports. The existing `DotWaveBackground` workspace component and shared portal-auth utilities remain untouched.
- Customer logo data/tiles, FAQ data/markup, page title, heading, description, and their existing spacing classes were retained. The local slot lets pricing widen independently of this surrounding content. `Subpage`'s shared container implementation and global marketing CSS were not modified.
- Importing `PricingElement` also loads its scoped CSS and local font declarations. Its existing owner supplies all slider/model state and the sticky root lookup, scroll/resize listeners, body portal, and cleanup. The root layout already mounts `<footer id="site-footer">`; no additional footer callback or layout change is needed.

Handoff: Phase 14 is the single testing/fidelity phase. Run the existing Svelte checker directly, then assess the complete implementation against the captured source and recording under the repository's browser restrictions. Pay particular attention to exact local width/gutters, the slot's vertical spacing and ordinary/default `Subpage` behavior, background/shadow clipping, mobile viewport/container boundaries, fonts, shared slider interactions, immediate no-op button fill, and body-portaled sticky bar/footer/unmount behavior. Keep pixel-perfect visual acceptance pending until comparison evidence exists; the implementation status alone is not evidence.

Next: Phase 14 testing, fidelity review, and corrections. No unresolved Phase 13 wiring questions.

#### 2026-11-25 — Phase 12 implemented; verification pending

Changed files: [PricingElement.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/PricingElement.svelte), [pricing.css](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/pricing.css), and this plan. The element now owns the original mobile sticky visibility calculation and body-mounted conversion bar. No tests, checker, build, or browser validation were run. Route integration remains Phase 13 and pixel-perfect verification remains Phase 14.

The exact reference is `hn`'s mount effect and conditional `document.body` portal in the [captured component](../references/loops-pricing/pricing-component.formatted.js), with the bar rules in [captured CSS](../references/loops-pricing/pricing-ssr.css), lines 290–311. [Loops](https://loops.so/pricing) and the supplied [recording](</Users/juliennewman/Desktop/Screen Recording 2026-11-25 at 4.17.19 PM.mov>) remain the pixel-perfect target; the captured source establishes mobile behavior beyond the desktop recording.

Source values and findings relevant to later phases:

- The owner binds its pricing root and calculates on client mount. It queries only `.lm-col .lm-btn` within that root, collects bounding rectangles, and filters out zero-height buttons. Summary navigation and the body-mounted sticky button cannot enter this query.
- Visibility is exactly `height > 0 && bottom > 0 && top < window.innerHeight`. The bar requires phone media-query match, **at least one** plan CTA with `bottom <= 0`, no visible plan CTA, and no visible `document.querySelector('footer')`. It does not require all plan CTAs to be above the viewport; it can appear in gaps between stacked cards. Exact top/bottom inequalities and the nonzero-height filter are retained.
- The `(max-width: 809.98px)` media query is held for the mounted lifetime and read during each calculation. Passive window scroll and window resize listeners coalesce using `frame ||= requestAnimationFrame(calculate)`; calculating clears the frame ID. Unmount cancels pending work and removes both listeners. No extra observer, media-change listener, sticky callback, or pricing-state mutation was added.
- A local Svelte action moves the conditional bar directly to `document.body` and removes its node when destroyed. Client-only mount controls its rendering, so no browser access occurs during SSR. Reappearance recreates the original entrance animation. No portal library or additional component was introduced.
- The bar itself carries `class="loops-pricing lm-bar"`, supplying the exact pricing palette, copied Inter font, scoped button rules, and box sizing outside the original parent. `.loops-pricing.lm-bar` resets width to `auto`, maximum width to `none`, and margins to zero; the mobile rule replaces the inherited relative position with `fixed`, ensuring viewport-wide placement instead of the element's 1248px cap.
- The source geometry is left/right/bottom zero, z-index 10, `12px 16px max(12px, env(safe-area-inset-bottom))` padding, 1px `#dad9d6` top border, and `#fdfdfc` background. The source has no extra blur, gradient, shadow, or height. Entrance is opacity from zero over 220ms with `cubic-bezier(0.23, 1, 0.32, 1)`; reduced motion disables the bar animation and reuses the existing reduced-motion button rules.
- The bar renders `cta('Start for free', true)`, always filled regardless of selected tier, with the existing 44px enabled no-op button and original hover, press, and focus behavior. There is no href, submit, navigation, or click analytics.
- The existing [Footer.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/site/Footer.svelte) has a semantic `<footer id="site-footer">`. Phase 13 can retain the source document selector without modifying that component; its phase description above now records this integration dependency.

Handoff: Phase 13 integrates the completed element, supplies the exact local route width/gutters, and removes obsolete pricing-only markup/imports while retaining page chrome, customer logos, FAQs, and the existing footer. Phase 14 must establish the sticky bar's full viewport width, bottom/safe-area geometry, fonts/colors/button bounds, entrance/reduced-motion behavior, visibility in card gaps and at CTA/footer boundaries, ≤809.98px behavior, no-op activation, and teardown on route unmount. No pixel-perfect visual verification has been established yet.

Next: Phase 13 integrates the element into `/pricing`. No unresolved Phase 12 questions.

#### 2026-11-25 — Phase 11 implemented; verification pending

Changed files: [PricingElement.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/PricingElement.svelte), [pricing.css](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/pricing.css), and this plan. The three-part summary now precedes the ledger inside `.lm-wide`; its enabled native buttons scroll to the corresponding plan without changing the pricing owner state. No tests, checker, build, or browser validation were run. Route integration remains Phase 13 and pixel-perfect verification remains Phase 14.

The exact reference is `nr`'s summary markup and `hn`'s scroll-only callback in the [captured component](../references/loops-pricing/pricing-component.formatted.js), lines 979–1034 and 88–101, with the phone summary rules from [captured CSS](../references/loops-pricing/pricing-ssr.css), lines 224–263 and 286–289. [Loops](https://loops.so/pricing) and the supplied [recording](</Users/juliennewman/Desktop/Screen Recording 2026-11-25 at 4.17.19 PM.mov>) remain the pixel-perfect target; the captured source establishes this mobile behavior beyond the desktop recording.

Source values and findings relevant to later phases:

- Labels/prices are exactly Free `$0`, Growth `details.growth.price` with `/ month`, and Enterprise `Custom`. Growth's summary price derives from the same clamped details as the card and both sliders; no extra pricing or selection state was added.
- The source's visually hidden ` · ` separators between buttons and explicit spaces within each button are retained. The published caller does not pass `selected`, so it omits `aria-pressed`; the port preserves those navigation semantics. Each button is `type="button"` with `data-plan` identifying its target.
- The callback scopes its target lookup to the clicked button's closest `.lm-wide`, selects the matching `.lm-col[data-plan]`, and invokes `scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })`. Reduced motion is read at click time. Phase 9's exact 88px scroll margin is reused without an extra offset or scroll calculation.
- The summary is hidden by default and appears only at viewport widths ≤809.98px, independently of the ≤719px container card-stacking threshold. Its three equal columns use a 1px border, 16px radius and bottom margin, and clipped overflow. Button geometry is 76px minimum height, 6px internal gap, `12px 12px 14px` padding, and 1px separators except on the first child.
- Names use muted 13px Inter/600 with -0.01em tracking; amounts reuse the exact Newsreader face at 24px with -0.03em tracking; `/ month` is 12px; price rows use `2px 4px` gaps. Growth's summary background is fixed `#f1f0ef`, regardless of selected tier. Focus is a 2px ink outline, -2px offset, 15px radius; native tap highlight is transparent, as in the source.
- Phase 12's visibility query must remain `.lm-col .lm-btn`; these summary navigation controls are not plan conversion CTAs. Summary clicks drive normal page scrolling and should not directly set sticky visibility. This dependency is recorded in Phase 12 above.

Handoff: Phase 12 adds the source-equivalent sticky conversion bar using the existing no-op CTA snippet and scoped pricing palette/font. Phase 14 must establish summary borders, cell sizes, text baselines, wrapping, static Growth emphasis, keyboard focus, correct local scroll targets, 88px offset, reduced-motion scrolling, unchanged pricing selection, and independent viewport/container behavior. No pixel-perfect visual verification has been established yet.

Next: Phase 12 adds the mobile sticky conversion bar. No unresolved Phase 11 questions.

#### 2026-11-25 — Phase 10 implemented; verification pending

Changed files: [PricingSlider.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/PricingSlider.svelte), [PricingElement.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/PricingElement.svelte), [pricing.css](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/pricing.css), and this plan. The Growth fourth cell now renders `PricingSlider` with `mode="growth"`, sharing the existing owner state and `onChange` callback with the desktop slider. Model, animation renderers, and route are unchanged. No tests, checker, build, or browser validation were run; verification remains Phase 14 and route integration remains Phase 13.

The exact reference is `hn`'s `.lm-scale.lm-mobile-scale` markup in the [captured component](../references/loops-pricing/pricing-component.formatted.js), lines 192–254, and its `$n` native input at line 902. Endpoint definitions are `kn = On(X)` and `En = gn(Tn)` at lines 482–492. Phone touch/knob geometry is in [captured CSS](../references/loops-pricing/pricing-ssr.css), lines 264–285; endpoint styling is line 181. [Loops](https://loops.so/pricing) and the supplied [recording](</Users/juliennewman/Desktop/Screen Recording 2026-11-25 at 4.17.19 PM.mov>) remain the pixel-perfect target. The video establishes desktop appearance; the captured source establishes this mobile branch.

Source values and implementation findings relevant to later phases:

- The range is native `min=10`, `max=27`, `step=1`, with value `details.growth.stopIndex`. Its input selects a paid stop through `selectPricingStop`; native keyboard navigation stays inside these bounds, and desktop pointer/overflow/keyboard handlers are not attached. This updates Growth price, contacts, active tier, and immediate button fill through the shared model, and resets Enterprise overflow as specified by that model.
- The mobile meter uses **Growth-local** `details.growth.progress / 100` on `.lm-power`, even when a desktop Free or Enterprise stop remains selected across resizing. The displayed paid value and ticks are clamped to 10–27. Desktop stop positioning remains nonlinear; the mobile branch has exactly 18 evenly spaced ticks with `left: calc(12px + index / 17 * (100% - 24px))` and the same on/current tick styling.
- Endpoint labels are exactly **`5,000`** and **`1.5 million`**, derived from the captured model rather than a separate contact table. The source's visually hidden ` to ` and ` subscribed contacts` spans are retained. Accessible value text is `${growth.contacts} contacts, ${growth.price} per month`, with the source's comma-formatted contacts rather than the abbreviated endpoint.
- The existing full-width gradient, sheen, clipping, knob core/glow, and `SliderSparks` renderer are reused. The decorative meter remains `aria-hidden="true"`; the separately drawn knob follows the input in DOM order, is hidden from accessibility, and cannot intercept pointer events. Paid-stop changes update inherited power without recreating particles.
- The ≤809.98px viewport rules use `flow-root`, input width `calc(100% + 20px)`, height 44px, margin -10px, transparent 44px WebKit/Firefox thumbs, and a separate 24px knob centered at `12px + (100% - 24px) * power`. The knob uses the original negative 12px margins, z-index 2, 160ms `cubic-bezier(0.23, 1, 0.32, 1)` transform transition, and pressed scale 1.1. The native WebKit active transform is disabled in this query.
- Visibility remains Phase 9's ≤719px **container** rule. A narrow stacked container inside a viewport wider than 809.98px therefore retains the source's ordinary native 20px thumb and hidden overlay knob. At phone widths, negative input margins retain a 24px visual meter while extending the transparent hit target. Do not merge these thresholds during later integration.
- The source's reduced-motion CSS disables native WebKit thumb transitions but does **not** disable the separate mobile `.lm-knob` transition; this port preserves that distinction. The existing spark renderer's source-equivalent reduced-motion behavior is unchanged. Phase 14 should assess both against Loops, rather than silently add different animation behavior.

Handoff: Phase 11 derives its Growth summary amount from the same `details.growth.price` and only scrolls on summary selection. Its phase description above now records that dependency. Phase 14 must establish exact meter/knob alignment, hit-target bounds, endpoint baselines, 18 tick coordinates, shared-state synchronization, native paid-only keyboard behavior, spark clipping/motion, pressed/focus/reduced-motion states, and viewport/container boundary behavior. Implementation has not established pixel-perfect visual verification.

Next: Phase 11 adds the mobile plan-summary navigation. No unresolved Phase 10 questions.

#### 2026-11-25 — Phase 9 implemented; verification pending

Changed files: [pricing.css](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/pricing.css) and this plan. The existing `PricingElement.svelte` card markup, shared state, enabled no-op buttons, and three mounted backgrounds already support the source layout and required no changes. [Loops](https://loops.so/pricing) and the supplied [recording](</Users/juliennewman/Desktop/Screen Recording 2026-11-25 at 4.17.19 PM.mov>) remain the pixel-perfect target; the captured source establishes mobile behavior beyond the desktop recording. No tests, checker, build, or browser validation were run; verification remains Phase 14. Route integration remains Phase 13.

The responsive layout is governed by [captured CSS](../references/loops-pricing/pricing-ssr.css), lines 224–331, and the existing three-column markup in `tr` in the [captured component](../references/loops-pricing/pricing-component.formatted.js), line 944. Two separate measurements govern it: the outer frame/footnote use viewport width ≤809.98px; padding and stacking use the `.lm-wide` named container's content width ≤1000px and ≤719px. Do not collapse these into one mobile breakpoint. The source retains three columns when the frame is removed but container width exceeds 719px, and retains the frame when a narrow container stacks in a viewport wider than 809.98px. Existing inline grid-column values require no mobile overrides because the ledger becomes flex and each column becomes block.

The static Growth card emphasis is `order: -1`, stronger border `#cfceca`, and background `#f1f0ef`. All inactive cards return to opacity 1 when stacked; individual active-cell colors and immediate CTA fill still derive from the shared tier. The source does not force all mobile cells to the active ink color. Phase 10 must preserve the independent viewport/container queries for slider visibility versus touch-target geometry; its description above now records that dependency.

**Implemented geometry and handoff:**

- The ≤809.98px viewport query removes all outer-frame padding, border, radius, background, and shadow, sets each plan's scroll margin to 88px, and changes the footnote to 13px. Phase 11 can use the existing scroll margin without adding another one.
- The ≤1000px container query sets ledger cell padding to 18px. The ≤719px query changes the ledger to a vertical flex layout with 16px gaps; cards become blocks with 1px borders and 20px radii. Existing inline grid coordinates remain dormant in flex layout and restore naturally on desktop.
- Stacked cells have `12px 20px` padding and 1px borders between adjacent cells. The heading uses `24px 20px 4px`; price uses `8px 20px 16px` with no border below the heading; CTA uses `16px 20px 20px`. The Growth scale cell has no top border and uses `4px 20px 16px`.
- The source's desktop range, Free/Enterprise scale spacers, shared rules, and focus wrappers use `display: none` at ≤719px container width. Background instances stay mounted with unchanged tier activation, renderer, masks, and reduced-motion behavior. No separate responsive state was introduced.
- `.lm-mobile-scale` is hidden by default and displayed at the stacked container threshold. Its actual range, particles, ticks, knob, endpoint labels, and resulting card height remain Phase 10. Summary markup/styles and sticky bar remain Phases 11–12; this phase creates no placeholder strip or bar.
- Phase 14 must establish exact frame/card bounds, card order, borders, row spacing, colors, footnote size, and both breakpoint transitions. Include the frame-free three-column interval and a stacked narrow container inside a wider viewport; do not assume viewport and container queries are interchangeable. Visual acceptance remains pending.

Next: Phase 10 adds the Growth-only mobile slider inside its reserved fourth cell. No unresolved Phase 9 questions.

#### 2026-11-25 — Phase 8 implemented; verification pending

Changed files: [pricing.css](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/pricing.css) and this plan. Button markup and immediate tier binding were already supplied by Phases 2–3 and remain in [PricingElement.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/PricingElement.svelte). The source is `.lm-btn` through the hover/reduced-motion blocks in [captured CSS](../references/loops-pricing/pricing-ssr.css), lines 183–222, and `ar` in the [captured component](../references/loops-pricing/pricing-component.formatted.js), line 1115. [Loops](https://loops.so/pricing) and the supplied [recording](</Users/juliennewman/Desktop/Screen Recording 2026-11-25 at 4.17.19 PM.mov>) remain the pixel-perfect target. No tests, checker, build, or browser validation were run; verification remains Phase 14. Route integration remains Phase 13.

**Source details and handoff:**

- Retained the source's full-width 44px pill, 20px horizontal padding, 15px/600 label, isolated dark-ink pseudo-element, and outlined inactive state. Explicit native-button resets cover prefixed/standard appearance, zero margin/border, transparent background, and inherited font. CTAs stay enabled `button type="button"` controls with no handler, destination, submission, email, or click analytics.
- The base transition list is `opacity 150ms ease, transform 100ms ease, color 420ms ease, box-shadow 420ms ease`. Quiet buttons override durations to `150ms, 100ms, 260ms, 260ms`, retaining the original property order and easing.
- The dark fill enters with opacity over 480ms and transform over 620ms, both `cubic-bezier(0.23, 1, 0.32, 1)`. Quiet fill uses `opacity: 0`, `transform: scale(0.9, 0.7)`, and `transition-duration: 260ms, 260ms`. Filled defaults remain the source's implicit opacity 1 and transform none. Do not replace this with a background-color transition or delay it until pointer release.
- All three `cta` calls bind primary appearance directly to `details.activeTier`. The shared model updates this during dragging, so fill transitions begin immediately when the nearest stop crosses tiers. No drag-start tier state, timer, or separate button selection has been introduced.
- Source hover rules are gated by `(hover: hover)`: filled opacity 0.88; quiet opacity 1 and a dark-ink inset border. Press scales the button to 0.98; keyboard focus uses a 2px ink outline with a 3px offset. Reduced motion removes both button and fill transitions while preserving their selected and interaction states.
- Phase 9 adds the source's responsive frame/cards without replacing these completed shared button rules. Phase 12 reuses the no-op snippet and stylesheet with `primary=true` for the always-filled sticky CTA; its description above now records scoped portal inheritance. Preserve source mobile column-emphasis overrides independently of the shared immediate button selection.
- Phase 14 must establish pixel-perfect button bounds, text baselines, fill scaling/timing, inactive border, rapid tier reversals during dragging, hover/press/focus, no-op activation, and reduced-motion behavior against the source and recording. Source-equivalent implementation does not establish visual verification.

Next: Phase 9 ports the responsive frame and Growth-first stacked mobile cards. No unresolved Phase 8 questions.

#### 2026-11-25 — Phase 7 implemented; verification pending

Changed files: [PricingElement.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/PricingElement.svelte), [pricing.css](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/pricing.css), and this plan. Each existing `.lm-focus` now contains one `PricingBackground` with its fixed tier pattern and immediate `active={details.activeTier === tier}` binding. The keyed tier loop preserves all three instances; no additional grid layers or pricing state were introduced. The renderer and route are unchanged. No tests, checker, build, or browser validation were run; all verification remains Phase 14.

Exact source: the three focus wrappers and `pr` instances in `hn` in the [captured component](../references/loops-pricing/pricing-component.formatted.js:101), `.lm-focus`/`.lm-dither` in [captured CSS](../references/loops-pricing/pricing-ssr.css:53), and its reduced-motion rule (line 219). These come from [Loops](https://loops.so/pricing), the same target shown in the [supplied recording](</Users/juliennewman/Desktop/Screen Recording 2026-11-25 at 4.17.19 PM.mov>). Pixel-perfect fidelity remains required and unverified.

Source details and handoff:

- The focus wrapper spans all eight grid rows, expands with `margin: -28px -44px`, and clips overflow. Its two intersected masks use 80px horizontal edge fades and 56px vertical edge fades. Opacity is 0 except on the selected tier, where it is 1, with the original 320ms ease transition. Reduced motion disables this transition.
- The absolutely positioned canvas compensates for those margins with `inset: 28px 44px`, width `calc(100% - 88px)`, and height `calc(100% - 56px)`. This leaves the actual pattern within its own column. It uses ink `#21201c`, opacity 0.1, and `image-rendering: pixelated` with the Phase 6 backing scale unchanged.
- The canvas intersects three exact masks: diagonal `linear-gradient(155deg, transparent 30%, #000 78%)`, right-edge `linear-gradient(to left, transparent, #000 64px)`, and bottom-edge `linear-gradient(to top, transparent, #000 72px)`. Both layers preserve prefixed `-webkit-mask-composite: source-in` and standard `mask-composite: intersect`; do not replace these with a single approximate gradient.
- Focus wrappers remain before the columns in source order, without an added z-index. Columns and separators retain z-index 1, and the shared slider retains z-index 2. Wrappers and canvases exclude pointer events. The same immediate tier change activates the new renderer and fades the old wrapper while Phase 6 retains its last image; its 700ms density reveal and the 320ms CSS fade remain separate effects.
- Phase 8 now proceeds with the existing immediate `details.activeTier` button binding and ports the exact button transitions. Phase 9 hides focus wrappers through the captured container-query `display: none` rule, preserving mounted instances and source activation behavior; its description above now records that requirement. Route integration remains Phase 13.
- Phase 14 must establish exact canvas placement/size, intersected masks, low-resolution density, ink/opacity, text/rule/slider stacking, tier reveal/fade timing, rapid tier reversals, reduced motion, and resizing across the stacked breakpoint. Implementation has not established visual fidelity through testing.

Next: Phase 8 ports the original button-fill and interaction transitions with immediate tier handoff and enabled no-op CTAs. No unresolved Phase 7 questions.

#### 2026-11-25 — Phase 6 implemented; verification pending

Changed files: [PricingBackground.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/PricingBackground.svelte) and this plan. The reusable renderer ports `or`/`sr`/`lr`, the `ur` patterns (readable source line 1129), and `pr` (line 1232) from the [captured Loops component](../references/loops-pricing/pricing-component.formatted.js). [Loops](https://loops.so/pricing) and the supplied [recording](</Users/juliennewman/Desktop/Screen Recording 2026-11-25 at 4.17.19 PM.mov>) remain the pixel-perfect target. No tests, checker, build, or browser validation were run; verification remains Phase 14. Placement/integration remains Phase 7 and route integration remains Phase 13.

Source details and handoff:

- Props are `{ active: boolean; pattern: PricingTier }`, using the existing model's tier type. The canvas has class `lm-dither` and `aria-hidden="true"`. Svelte `$effect` runs canvas setup client-side and tracks canvas binding, `active`, and `pattern`; it returns cleanup for deactivation, pattern change, and destruction.
- The Free exponential field, Growth hard-threshold rings, and Enterprise quantized sphere use the original constants and low-resolution x/y coordinates. The original ordered 4×4 matrix and strict `>` comparison output computed ink RGB with alpha exactly 255 or 0. No circular dots, smoothing, substitute shader, or DPR multiplication were introduced.
- Backing dimensions are `max(1, round(CSS bounds / 3))`. Each activation reads the canvas's computed `color`, using the source's numeric extraction and fallback RGB 33/32/28; it also snapshots reduced-motion preference, resizes, and attaches a new `ResizeObserver`. The observer resizes/reallocates pixel data without changing the reveal start. Phase 7 must supply explicit source canvas CSS dimensions and inherited ink color before activation.
- Moving frames preserve the 33ms gate, 700ms reveal measured from the first rendered RAF frame, and pattern time `RAF timestamp / 1000`. The reveal restarts on activation; the pattern's animation clock does not restart at zero. Reduced motion draws one full-reveal frame at time 1.2 and schedules no continuous frames. The initial implementation retained the source's missing reduced-motion resize redraw and preference listener; this lifecycle behavior was subsequently corrected at the user's request. Follow the current canvas lifecycle note and technical specification.
- Deactivation cancels RAF and disconnects the observer without resizing or clearing the canvas. Keep all three instances mounted in Phase 7 and toggle only their `active` props so inactive images remain available for the 320ms wrapper fade. Reactivation resizes/restarts the reveal, as the source does.
- Phase 7 owns the existing focus-layer integration, source negative margins/insets, masks and compositing, canvas opacity 0.1, `image-rendering: pixelated`, layer ordering, and immediate tier-driven wrapper fade. The renderer is intentionally not yet imported by `PricingElement.svelte` and has no styling in this phase.
- Phase 14 still must establish pixel-perfect pattern density, pixel scale, ink, placement/masks, phase-aligned motion, reveal/fade behavior, activation/resize/reduced-motion behavior, and cleanup. Source-equivalent formulas alone do not establish visual verification.

Next: Phase 7 places all three background canvases and ports the exact masks and tier transitions. No unresolved Phase 6 questions.

#### 2026-11-25 — Phase 5 implemented; verification pending

Changed files: [SliderSparks.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/SliderSparks.svelte), [PricingSlider.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/PricingSlider.svelte), [pricing.css](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/pricing.css), and this plan. The new canvas replaces the reserved comment inside the existing desktop fill; no second meter was added. No tests, checker, build, or browser validation were run; verification remains Phase 14. Route integration remains Phase 13.

Source and implementation details relevant to future phases:

- Ported `dr` from the [captured readable component](../references/loops-pricing/pricing-component.formatted.js) at line 1159, its `fr` parent at line 1223, and the exact `.lm-sparks` rule from [captured CSS](../references/loops-pricing/pricing-ssr.css) at line 179. Those files originate from [Loops](https://loops.so/pricing); the supplied [recording](</Users/juliennewman/Desktop/Screen Recording 2026-11-25 at 4.17.19 PM.mov>) remains the same pixel-perfect target.
- All 36 particles use the source's random x, y `0.2 + random * 0.6`, speed `0.05 + random * 0.1`, radius `0.6 + random * 0.8`, and phase `random * Math.PI * 2`. Each moving frame increments x by `speed * (0.4 + power) * min(0.05, elapsedSeconds)`; wrapping subtracts 1 and randomizes y again.
- The initial component read inherited `--lm-power` every frame; the lifecycle correction now supplies the identical value as a reactive prop so static frames can follow slider updates. The head remains `12 + (width - 24) * power`; alpha is `min(1, x / 30, max(0, (head - x) / 40)) * (0.6 + 0.4 * sin(timestamp / 330 + phase)) * 0.85`. White arcs use CSS-pixel radii; no seeded replacement, CSS shimmer, extra easing, or independent selection state was introduced.
- Backing width/height are `round(CSS bounds * (devicePixelRatio || 1))`, with the matching canvas transform. The initial implementation copied the source's mount-time DPR/preference snapshots and missing static redraw. The user subsequently requested repairing these lifecycle defects: follow the current canvas correction note for refreshed DPR, static redraws, live preference handling, and cleanup. Reduced motion still skips particle advancement and schedules no continuous frames. The spark DPR scale remains distinct from the dither renderer's 3px backing scale.
- Svelte `onMount` keeps canvas work client-side and returns cleanup that cancels the outstanding animation frame and disconnects the observer. The canvas is under the existing hidden decorative meter, paints above the fill's sheen, and retains the source's absolute inset-zero 100% width/height rule. Its existing ancestor clip, gradient, row geometry, and range handlers are preserved.
- Phase 6 implements the separate ordered-dither renderer; its backing dimensions are CSS bounds divided by 3, **without** spark DPR scaling. Phase 7 connects it to the existing focus layers. Do not reuse this particle renderer or its resize strategy for the backgrounds.
- Phase 10 reuses `SliderSparks` inside its mobile clipped fill with Growth-local power. It originally had no props; the lifecycle correction now passes power explicitly. Particles are still created only on mount, without being recreated on stop changes.
- Phase 14 still must establish exact slider spark density, radius, edge fading, motion speed, clipping, DPR rendering, resize behavior, reduced motion, and resource cleanup against the source and recording. Implementing the source formulas does not establish pixel-perfect visual verification.

Next: Phase 6 ports the dither renderer and all three original background formulas. No unresolved Phase 5 questions.

#### 2026-11-25 — Phase 4 implemented; verification pending

Changed files: [PricingSlider.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/PricingSlider.svelte), [pricing.css](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/pricing.css), and this plan. The model, input handlers, pricing owner, and route are unchanged. No tests, checker, build, or browser validation were run; verification remains Phase 14. The route still receives the complete pricing element in Phase 13.

The desktop slider now contains the original decorative meter and clipped fill before the transparent native input. CSS ports the source's 24px track, 20px thumb, heat gradient, bright head, glossy overlay, power-dependent orange core and three-part shadow, tick colors/heights/transitions, focus outline, hover/press scale, and reduced-motion rules. Existing nonlinear tick coordinates and discrete selection bindings are retained, while the fill and knob use continuous `--lm-power`. The source's 70px slider row is preserved. Reference: `ir` (readable component line 1041), `fr` (line 1223), and the `.lm-power` through `.lm-meter-fill::before`, hover, and reduced-motion blocks in [captured CSS](../references/loops-pricing/pricing-ssr.css).

**Source details and handoff:**

- Phase 5 inserts its canvas directly inside `.lm-meter-fill`; the reserved location is marked in the component. Keep the meter's `aria-hidden="true"` and the existing clipping. The sheen is the fill's `::before` layer, so the subsequent canvas paints above the sheen, as in Loops' `fr`. Canvas markup, sizing, renderer, and cleanup remain Phase 5.
- The full-width heat gradient has stops `#f6ae86` at 0%, `#f8945c` at 30%, `#fa7333` at 65%, and `#fc5200` at 100%. Its head tracks `12px + (100% - 24px) * power`. The clip inset is `(100% - 24px) * (1 - power)`, retaining the source's rounded end geometry even at minimum. Do not replace this with a width-based fill.
- Tick width is 1px; future ticks are border color, passed ticks ink, and the current tick is 10px instead of 6px. The source's 150ms background/height transitions are preserved. The denser Growth notches come from the existing stop mapping, with no uniform-spacing replacement.
- The captured WebKit thumb has a 160ms transform transition and 1.1 hover/press scale. Its Firefox thumb has the same size, core, and shadows but **no transform transition or hover/press scale in the source**. Preserve this distinction. Hover scaling is gated by `(hover: hover)`; reduced motion removes tick and WebKit-thumb transitions while retaining their state changes.
- Phase 10 should extend these shared visuals with the original mobile overrides and add its paid-only branch. Desktop thumb/track rules are now complete; mobile touch geometry and visible knob remain deferred.
- Phase 14 still needs to establish visual fidelity against [Loops](https://loops.so/pricing) and the supplied [recording](</Users/juliennewman/Desktop/Screen Recording 2026-11-25 at 4.17.19 PM.mov>), including track/knob alignment, clipping at both ends, nonlinear ticks, focus, hover/press, and reduced motion. Source values have been ported; pixel-perfect rendering is not yet verified.

Next: Phase 5 ports the exact spark animation. No unresolved Phase 4 questions.

#### 2026-11-25 — Phase 3 implemented; verification pending

Changed files: [PricingSlider.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/PricingSlider.svelte), [PricingElement.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/PricingElement.svelte), [pricing.css](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/pricing.css), and this plan. The desktop slider now replaces the reserved row and submits next state through the element's `onChange` callback. The model and route are unchanged. No tests, checker, build, or browser validation were run; verification remains Phase 14.

The native input uses min 0, max 100, step 0.1 and the shared derived position/value text. While a pointer is down, `oninput` calls `setDragPosition` to update continuous position and nearest-stop selection together; non-pointer input calls `selectPricingStop`. Window `pointerup` and `pointercancel` clear the continuous position, preserving the selected stop and final-stop overflow. Only a pointer-active flag and listener cleanup are local; there is no second pricing selection or button-selection hold. Listeners are removed on release/cancel, before another pointer-down session, and on component destruction. Reference: `ir` (captured component line 1041), `Wn`/`Gn` (line 535), and native input/tick geometry in the captured CSS.

Source detail for future phases: ArrowRight/ArrowUp advance one stop; ArrowLeft/ArrowDown retreat one; PageUp/PageDown advance/retreat five; Home selects 0; End selects 34. All handled keys prevent the native percentage-step behavior and clamp indices to 0–34. At stop 34, **ArrowRight, ArrowUp, PageUp, and End each add 50 overflow**, including repeated End. Pointer overflow uses the strict `clientX > input.right - 10` threshold and signed `movementX`, without waiting for release. In Svelte, React's range `onChange` maps to `oninput` so pricing and the active tier update throughout dragging. Native `aria-valuetext` remains discrete and intentionally excludes visual overflow, as recorded in Phase 1.

**Handoff:**

- Phase 4 extends the existing desktop branch and scoped base CSS. `.lm-plan-scale` already sets grid row 4 and `--lm-power` from the shared continuous/snapped position. All 35 `.lm-tick` spans already have source-exact nonlinear `left` expressions and discrete `data-on`/`data-current` bindings. Tick appearance remains unwritten; do not replace their coordinates with uniform spacing.
- The reserved `.lm-scale-reserve` is removed. Base layout retains 12px top padding + 24px input + 2px tick margin + 10px tick area + 22px bottom padding = **70px**. Native slider appearance is temporary until Phase 4 adds appearance resets, exact meter/fill/sheen layers, both browser thumb/track rules, tick colors/heights/transitions, and focus/hover/press styling. Phase 5 still owns sparks.
- Phase 8 consumes the element's existing immediate `details.activeTier` binding; no drag-start tier state has been introduced.
- Phase 10 adds the `mode="growth"` branch. The component already defaults to `desktop`, but the Growth branch is deliberately absent until its phase. Share the pricing owner and visual layers while keeping the captured paid-only input behavior separate from desktop overflow/full-range keyboard navigation.
- Phase 14 must exercise release/cancel, keyboard bounds, repeated End overflow, continuous versus discrete display, native snapping, and listener cleanup along with the visual review. Implementation has not established those behaviors through testing yet.

Next: Phase 4 ports the exact slider appearance from Loops and the video. Pixel-perfect fidelity remains required and unverified. No unresolved Phase 3 questions.

#### 2026-11-25 — Phase 2 implemented; verification pending

Changed files: [PricingElement.svelte](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/PricingElement.svelte), [pricing.css](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/pricing.css), the three assets in [static/fonts/pricing](/Users/juliennewman/Documents/dinu-website/static/fonts/pricing), and this plan. The route remains reserved for Phase 13; slider interaction/visuals, background renderers/masks, button-fill transitions, and mobile behavior remain in their numbered phases. No tests, checker, build, or browser validation were run; all verification remains in Phase 14.

The element now owns the Phase 1 shared state and derives all pricing/tier display data from it. It contains the exact three-column/eight-row ledger, source copy and emphasis, screen-reader cell labels, clamped Growth price/contact count, Enterprise label and delayed infinity text, footnote, source separators, and empty slider/background layers. The CSS ports the desktop frame, cell padding, typography, light palette, active-cell colors, 0.75 inactive opacity, and 240ms column transition. Conversion buttons already have the source's static 44px geometry and active/quiet appearance as enabled no-op `button type="button"` controls; Phase 8 still owns their full fill/hover/press/focus transitions.

**Fonts downloaded directly from the captured URLs:**

| Local asset | Exact source | Downloaded bytes |
| --- | --- | --- |
| [inter-400.woff2](/Users/juliennewman/Documents/dinu-website/static/fonts/pricing/inter-400.woff2) | [Published Inter 400](https://framerusercontent.com/assets/GrgcKwrN6d3Uz8EwcLHZxwEfC4.woff2) | 27,380 |
| `inter-600.woff2` (superseded; unused local asset removed during review) | [Published Inter 600](https://framerusercontent.com/assets/yDtI2UI8XcEg1W2je9XPN3Noo.woff2) | 28,088 |
| `newsreader-400.woff2` (superseded; unused local asset removed during review) | [Published Newsreader 400](https://fonts.gstatic.com/s/newsreader/v26/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438weI_ACexEPjCggA.woff2) | 41,412 |

`Dinu Pricing Inter` and `Dinu Pricing Newsreader` are distinct local font families. Inter's captured Latin unicode ranges are preserved. No existing Dinu font file, shared component, or marketing stylesheet was changed. All CSS selectors are scoped through `.loops-pricing`; future pricing components inherit this context and use the same `--lm-ink`, `--lm-muted`, `--lm-surface`, `--lm-border`, `--lm-border-strong`, `--lm-card`, `--lm-mobile-growth`, and `--lm-orange` variables.

Source findings for Phases 3–4 and 13: the eight ledger rows are heading, price/note, contacts, shared slider, marketing, transactional, branding, and CTA. Full-width rules belong at rows **3, 5, 6, 7, 8**; there is no rule at row 4. The shared slider row occupies **70px**: 12px top padding + 24px power track + 2px tick margin + 10px tick area + 22px bottom padding. Preserve this height when replacing the reserved row in Phase 3. The card's footnote is inside `.lm-wide`, outside `.lm-ledger`. Sources: `jn`, `Mn`, `Nn` (captured component lines 499–503), `ir` (1041), `hn` (18), and the captured CSS.

**Handoff:**

- Phase 3 imports `PricingSlider` into the element and replaces the reserved `.lm-plan-scale` wrapper with `<PricingSlider {state} onChange={(next) => { state = next; }} />`. The slider's desktop root supplies `.lm-plan-scale` and row 4. Delete `.lm-scale-reserve`; preserve the 24px input and 12px total tick-area height while Phase 4 adds the exact visuals.
- Phases 6–7 use the existing three empty `.lm-focus` layers, each with its grid column and immediate `data-active` binding. Only grid placement and pointer exclusion are currently applied; margins, masks, canvas styling, and reveal remain Phase 7 work.
- Phase 8 extends the current `cta` snippet and static `.lm-btn`/`.lm-btn-quiet` rules with the captured transitions, interaction, and focus styling. The snippet already binds primary appearance directly to `details.activeTier` and has no click handler or destination.
- Phases 9–10 retain each column's fourth `.lm-scale-cell`. Free/Enterprise keep empty aria-hidden spacers; Growth receives the local mobile slider. All breakpoint behavior remains pending.
- Phase 13 must supply the local reference container width/gutters. The element caps itself at 1248px, but its current Dinu route parent caps content at 1246.3px; a child maximum alone cannot enlarge that parent. Keep the 1296px outer maximum and 24px inline gutters requirement local to `/pricing` during integration.
- Phase 12 must preserve the CSS namespace/font/palette for a body-mounted sticky bar, as added to that phase's description.

Next: Phase 3 implements desktop range interaction against the existing owner state. Pixel-perfect fidelity remains the acceptance requirement and is not yet verified. No unresolved Phase 2 questions.

#### 2026-11-25 — Phase 1 implemented; verification pending

Changed files: [pricing-model.ts](/Users/juliennewman/Documents/dinu-website/src/lib/components/pricing/pricing-model.ts) and this plan. The route and visual components have not been changed. No tests, checker, build, or browser validation were run; verification remains assigned to Phase 14.

The model now contains the exact 29-row published table, 35 desktop stops and nonlinear positions, earlier-stop tie handling, clamped Growth details, Enterprise and overflow formatting, native range value text, and shared state transitions. Source references: `K`–`Yn` in the [captured component](../references/loops-pricing/pricing-component.formatted.js:433), owner state/reset behavior in `hn` (line 23), and pointer/keyboard behavior in `ir` (line 1041).

**State and props contract for Phases 2–3 and 8–12:**

- `PricingElement` owns one Svelte state object initialized with a fresh copy: `let state = $state({ ...INITIAL_PRICING_STATE })`. Its fields are `selectedStop` (integer 0–34), `dragPosition` (`null` or continuous desktop percentage 0–100), and `overflow` (nonnegative accumulated pointer movement). The default is stop 10, no drag, zero overflow.
- Derive display data with `let details = $derived(derivePricingDetails(state))`. It supplies `activeTier` (`free`, `growth`, `enterprise`), `growth` (`stopIndex`, formatted `price`, formatted `contacts`, paid-only `progress` percentage), `enterpriseContacts`, `rangePosition`, `power` (0–1), and `ariaValueText`. Active column/background/conversion-button fill use the same `activeTier` immediately. Static mobile Growth emphasis and the always-filled sticky CTA retain the source's separate visual rules.
- `PricingSlider.svelte` consumes exported `PricingSliderProps`: `{ state: PricingState; onChange: (state: PricingState) => void; mode?: 'desktop' | 'growth' }`. Default `mode` is `desktop`; the element applies the callback's next state. Do not keep another selected-stop or active-tier state inside the slider. A local pointer-active flag/listener bookkeeping is still needed in Phase 3.
- During desktop pointer input, call `setDragPosition(state, percentage)` to update continuous position and discrete selection together. On release/cancel, call `setDragPosition(state, null)` to snap to the selected stop. Keyboard/non-drag input and mobile changes use `selectPricingStop(state, stopIndex)`. Callers must supply valid integer indices; Phase 3 owns keyboard bounds and Phase 10 restricts mobile indices to 10–27.
- Overflow events use `addPricingOverflow(state, delta)`, which accumulates movement with a zero lower bound. Phase 3 retains the captured pointer threshold (`clientX > range.right - 10`) and keyboard increment of 50 at the final stop. Selecting a stop other than 34 resets overflow; releasing at stop 34 preserves it. Helpers return a next state without mutating the input.
- `STOP_POSITIONS` governs desktop ticks and snapped range positions; `DESKTOP_STOPS` maps those indices to the price table. `getGrowthDetails` supplies the mobile slider's clamped index/progress. Use `FREE_ALLOWANCE` for Free's fixed `1,000` contacts and `4,000` sends.

**Source details affecting later phases:**

- The Enterprise label stays `1.5 million+` while Free/Growth is selected. Custom stops display `2 million`, `2.5 million`, etc.; **only the final custom stop** adds `+` without overflow. Positive overflow always uses one-decimal rounding with trailing zeros stripped and a `+` suffix, until `∞` at a volume of 10^18. Do not add `+` to every custom stop or use one shared formatter for both paths.
- Native desktop `aria-valuetext` describes the discrete selected stop: Free can announce 100–1,000 contacts while the Free card's offer remains 1,000. At the final stop it announces `10,000,000 contacts, custom pricing` even when the visual overflow label is larger. This is captured source behavior, not an additional user-requested departure.
- The delayed `really?` display at infinity belongs to the later element/CSS work, not model timers. The model exposes the exact `∞` label for that condition.

Next: Phase 2 can render the ledger from this model and add the captured fonts/CSS. Phase 3 and Phase 10 descriptions now explicitly reference the shared slider contract. No unresolved Phase 1 questions or changes to the pixel-perfect requirement.

## Technical specifications

### Pricing model — Phase 1; consumed by Phases 3, 8, and 10–12

The captured component is `hn` in the readable source (line 18); its table begins at line 433. Reproduce the full table, not a guessed formula or linear contact-count scale.

| Region | Contacts | Price |
| --- | --- | --- |
| Free: 10 stops | 100, 200, …, 1,000 | $0 |
| Growth | 5,000 / 10,000 / 15,000 / 25,000 / 50,000 / 100,000 | $49 / $99 / $149 / $199 / $249 / $399 |
| Growth | 150,000 / 200,000 / 300,000 / 400,000 / 500,000 / 600,000 | $599 / $799 / $1,199 / $1,599 / $1,999 / $2,399 |
| Growth | 700,000 / 800,000 / 900,000 / 1,000,000 / 1,250,000 / 1,500,000 | $2,799 / $3,199 / $3,599 / $3,999 / $4,399 / $4,799 |
| Enterprise: 7 stops | 2 / 2.5 / 3 / 4 / 5 / 7.5 / 10 million | Custom |

The published table also has a `Contact us` sentinel at 1.6 million. The desktop stop list uses that sentinel for each of the seven Enterprise volumes; 1.6 million is not an additional visible desktop stop.

Maintain `selectedStop`, optional continuous `dragPosition`, and `overflow`. Derive active tier, clamped Growth details, Enterprise label, active button, and active background from that state. Do not add independent plan-selection state.

Specific captured mapping code (`Vn`, `Hn`, `Un`, readable source line 512):

```js
Vn = (e) =>
  e < X
    ? (e / (X - 1)) * 30
    : e <= Z
      ? 35 + ((e - X) / (Z - X)) * 30
      : 70 + ((e - Z - 1) / (Ln.length - 1)) * 30;
Hn = Rn.map((e, t) => Vn(t));
Un = (e) =>
  Hn.reduce(
    (t, n, r) => (Math.abs(n - e) < Math.abs(Hn[t] - e) ? r : t),
    0,
  );
```

Here `X = 10`, `Z = 27`, and `Ln` is the seven Enterprise contact volumes. This produces **35 stops**:

- Free: 0–30%, spaced by approximately 3.333 percentage points.
- Growth: 35–65%, spaced by approximately 1.765 points: the visibly denser middle region.
- Enterprise: 70–100%, spaced by 5 points.
- A 5-point gap separates each region. Nearest-stop selection keeps the earlier stop on an exact tie. Tier changes occur just above 32.5% and 67.5%.

Initial state is Growth's first stop: $49/month and 5,000 contacts. Free's displayed allowance remains 1,000 contacts. Growth's displayed amount and contact cap clamp to its first/last paid stop when Free/Enterprise is active. Enterprise initially displays `1.5 million+`, then the selected custom volume.

Port the original far-right overflow: movement past the native range's right edge minus 10px accumulates `movementX`, clamped to zero; volume is `10,000,000 * 10 ** (overflow / 50)`, formatted in million/billion/trillion/quadrillion units and eventually `∞` at 10^18. Leaving the last stop resets overflow. Preserve the delayed `really?` text at infinity.

Implementation API and exact label distinctions are recorded in the Phase 1 execution handoff above. Enterprise custom labels add `+` only at the final stop (or with positive overflow); native desktop range value text uses discrete counts independently of the Free offer and visual overflow label.

### Ledger geometry and typography — Phases 2 and 9

Start from [captured CSS](../references/loops-pricing/pricing-ssr.css) and [inherited page typography](../references/loops-pricing/page-typography.published.css), rather than fitting the existing Tailwind grid to the reference. The current values below incorporate the explicit user decisions; original captured code and historical execution notes preserve the earlier reference values.

- Reference desktop component maximum width: **1248px**; Loops' outer site maximum is 1296px with 24px inline padding. Dinu's ordinary container is 1246.3px with different gutters. Phase 13 implements reference sizing locally in `.pricing-plans`, outside that container through `Subpage`'s optional `wideContent` snippet; preserve this sizing during verification and corrections.
- Outer card: 1px border, 24px radius, `clamp(14px, 3.5%, 36px)` padding, and **no outer shadow**, per the user.
- Ledger: three equal columns, 12px column gaps, 24px cell horizontal padding, eight shared rows using CSS subgrid. Preserve shared full-width separators, including the gap for the slider row.
- Copy each cell's actual padding and text metrics, with current user-selected weights: 14px body text at 1.5 line-height; 14px/500 tier labels; 36px Newsreader/350 prices at line-height 1 and letter-spacing -0.04em; 15px monthly suffix; 13px notes.
- Use the matching published Inter normal 400 and 500 assets locally, and the site's existing variable `/fonts/newsreader.woff2` at weight 350 with optical sizing disabled. Keep distinct pricing font-family names. The old Inter 600 and static Newsreader 400 assets are unused and have been removed from `static`.
- Scope the reference's inherited page defaults to `.loops-pricing`, including the body portal: 12px font size, `line-height: normal`, `-webkit-font-smoothing: antialiased`, and `-moz-osx-font-smoothing: grayscale`. Child rules retain their explicit source metrics; do not let Tailwind's inherited 1.5 change the summary.
- Use the captured light palette: ink `#21201c`, muted `#63635e`, surface `#fdfdfc`, border `#dad9d6`, stronger border `#cfceca`, card `#f9f9f8`, mobile Growth `#f1f0ef`. The slider uses the user's homepage red palette described below.
- Inactive columns have opacity 0.75; active column opacity is 1. Preserve the 240ms opacity transition and active cell color changes.
- Copy all feature text, emphasis, price suffixes, and footnotes from the extracted markup.

Do not enlarge the screenshot and trace its text sizes. Reproduce native CSS geometry with the correct font assets.

### Slider and spark animation — Phases 3–5 and 10

Original desktop event handling is `ir` (readable source line 1041); the spark renderer is `dr` (line 1159).

Use a native `input[type=range]`, min 0, max 100, step 0.1, with the original custom visual layers. While dragging, the thumb and filled track follow continuous pointer position; pricing and ticks use the nearest discrete stop. On release or cancellation, clear the drag position so the thumb snaps to the selected stop. Do not introduce easing that is absent from the source.

Specific original source CSS for the heat gradient and clipping (reference evidence; its orange colors are superseded by the user's red palette):

```css
.lm-meter-fill {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background:
    radial-gradient(56px 28px at calc(12px + (100% - 24px) * var(--lm-power, 0)) 50%, rgba(255, 236, 214, 0.75), transparent 70%),
    linear-gradient(90deg, #f6ae86 0%, #f8945c 30%, #fa7333 65%, #fc5200 100%);
  clip-path: inset(0 calc((100% - 24px) * (1 - var(--lm-power, 0))) 0 0 round 12px);
}
```

The gradient spans the entire track, and the fill reveals it. Preserve that geometry rather than stretching the gradient inside the filled fraction. Current colors are `--homepage-band-1` at 0%, `--homepage-band-2` at 30%, `--homepage-band-3` at 65%, and bright `--color-brand` at 100%; do not restore the orange or a dark endpoint. The moving radial highlight mixes `--homepage-band-1` at 75% with transparent; the sheen's final tint mixes `--lm-red` at 8% with transparent.

- Track: 24px tall, pill radius, exact muted color mix, inset shadow, and lower highlight.
- Input: `width: calc(100% - 4px)`, 2px side margins. Thumb: 20px desktop diameter and 2px top margin.
- Current knob core: brand red radius `1.125px + 1.125px * power`, transitioning to white at `1.5px + 1.125px * power` (25% smaller per the user); original three-part shadow geometry with the bloom colored by `--lm-red: var(--color-brand)`.
- Hover/pressed thumb scale: 1.1 with 160ms `cubic-bezier(0.23, 1, 0.32, 1)` where the source specifies it.
- Tick x-position: `calc(12px + percentage * (100% - 24px))`. Tick width 1px; normal height 6px; current height 10px; 150ms color/height transitions. Passed ticks are ink; future ticks are border color.
- Preserve the glossy overlay gradient from the source, including its stops at 48% and 52%.
- Copy all 36 spark particles: initial y 0.2–0.8, speed 0.05–0.15, radius 0.6–1.4 CSS px, and randomized phase. Their motion speed depends on power; their alpha depends on the original edge fades and `sin(timestamp / 330 + phase)`. Use original DPR sizing and the 0.05-second delta cap. Pass the same desktop/mobile power used by CSS as a reactive prop. In reduced motion, repaint at the frozen timestamp on resize or power change without advancing particles; refresh DPR on resize. Handle live motion-preference changes and remove every listener, observer, and RAF on teardown.
- Preserve Arrow/Home/End/PageUp/PageDown stop navigation, overflow keys at the final stop, focus ring, and descriptive `aria-valuetext`.

### Exact background algorithms and presentation — Phases 6–7

The original pattern functions are `ur` (readable source line 1129), followed by renderer `pr` (line 1232). These are 2D canvas algorithms, not downloadable videos or a Lottie animation.

Specific captured dither constants:

```js
or = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
sr = 3;
cr = (e, t) => Math.min(t, Math.max(0, e));
lr = [0.95, 0.62, 0.36, 0.14];
```

Captured pattern formulas, with formatting condensed:

```js
{
  free: (e, t, n, r, i) =>
    0.4 * Math.exp(
      -Math.hypot(e - r * 0.95, t - i * 0.98) /
        (r * 0.42 * (1 + 0.06 * Math.sin(n * 0.8))),
    ),
  growth: (e, t, n, r, i) => {
    let a = Math.hypot(e - r * 0.95, t - i * 0.98);
    return cr(1.05 - a / (r * 1.3), 1) * 0.85 *
      (Math.sin(a * 0.17 - n * 1.4) > 0.35 ? 1 : 0.12);
  },
  enterprise: (e, t, n, r, i) => {
    let a = r * 0.75,
      o = (e - r * 0.78) / a,
      s = (t - i * 0.93) / a,
      c = 1 - o * o - s * s;
    if (c < 0) return 0;
    let l = -0.7 + 0.2 * Math.cos(n * 0.25),
      u = -0.55 + 0.15 * Math.sin(n * 0.25),
      d = Math.max(0,
        (o * l + s * u + Math.sqrt(c) * 0.3) / Math.hypot(l, u, 0.3));
    return lr[Math.min(3, Math.floor(d * 4))];
  },
}
```

In this code, `e/t` are pixel x/y, `n` is time in seconds, and `r/i` are low-resolution canvas width/height. The formula anchors near the lower-right corner of each column are intentional.

- Free: breathing exponential density field.
- Growth: outward-moving concentric bands with the original hard threshold.
- Enterprise: a shaded sphere with a slowly moving light direction and four quantized intensity levels.

Copy the renderer exactly in its visible behavior:

1. Canvas backing dimensions are `max(1, round(CSS dimensions / 3))`. This renderer deliberately does **not** use the spark renderer's DPR scaling.
2. For each pixel, compare the pattern intensity times reveal progress against `(matrix[(y % 4) * 4 + (x % 4)] + 0.5) / 16`; output full RGB with alpha either 255 or 0.
3. Render at approximately 30fps with the original 33ms frame gate. Reveal new activations over 700ms from their first rendered frame; animate with the RAF timestamp divided by 1,000, without resetting the pattern clock on activation. Reduced motion uses time 1.2 and full reveal. Capture computed ink on activation, listen for live motion-preference changes, and repaint the static frame when backing dimensions change. Ignore unchanged backing dimensions so the observer's initial notification cannot clear an existing image. Resize must not reset reveal. Cancel the prior RAF when switching modes; remove the preference listener during teardown.
4. Retain one background layer per column. Activate/deactivate from the selected tier and cancel each renderer's RAF and observer correctly. Preserve the previous canvas image during fade-out rather than clearing it abruptly.
5. Keep `image-rendering: pixelated`, canvas opacity 0.1, wrapper fade 320ms ease (none with reduced motion), negative margins -28px/-44px, canvas insets 28px/44px, width `calc(100% - 88px)`, and height `calc(100% - 56px)`. Wrapper masks fade from transparent to black over 80px horizontally and 56px vertically, with matching fades at the opposite edges. Canvas masks are `linear-gradient(155deg, transparent 30%, #000 78%)`, `linear-gradient(to left, transparent, #000 64px)`, and `linear-gradient(to top, transparent, #000 72px)`. Preserve both layers' `-webkit-mask-composite: source-in` and `mask-composite: intersect`, with their original mask lists in both prefixed and standard declarations. These masks are part of the appearance.
6. Keep the backgrounds behind ledger text and separators, with the slider above them and no pointer interception.

Do not reuse the current circular-dot shader, replace these with generic waves, or increase their backing resolution. The binary pattern and 3px scale are required for the reference appearance.

### Immediate button fill — Phases 8 and 12

Original CTA is `ar` (readable source line 1115). Original `hn` uses temporary state `s` and `te = s ?? S` to freeze the button selection while dragging. Omit that freeze and bind active button selection directly to the derived active tier.

Copy the original button's 44px height, full column width, pill radius, outlined inactive state, and dark active fill. The label is 15px/400 per the user's non-bold button request. The slider uses red; active buttons retain dark ink.

Preserve the separate pseudo-element fill animation: it grows from scale(0.9, 0.7), with 480ms opacity and 620ms transform using `cubic-bezier(0.23, 1, 0.32, 1)`. Inactive fade-out is 260ms. Preserve label-color transition, hover opacity, focus outline, and pressed scale 0.98. Immediate selection changes should still use these original transitions.

Exact captured transition and interaction values:

```css
.lm-btn {
  transition: opacity 150ms ease, transform 100ms ease, color 420ms ease, box-shadow 420ms ease;
}
.lm-btn::before {
  transition: opacity 480ms cubic-bezier(0.23, 1, 0.32, 1), transform 620ms cubic-bezier(0.23, 1, 0.32, 1);
}
.lm-btn-quiet { transition-duration: 150ms, 100ms, 260ms, 260ms; }
.lm-btn-quiet::before { opacity: 0; transform: scale(0.9, 0.7); transition-duration: 260ms, 260ms; }
.lm-btn:active { transform: scale(0.98); }
```

Filled hover opacity is 0.88; quiet hover stays at opacity 1 and changes its 1px inset border to ink, under `(hover: hover)`. Keyboard focus is a 2px ink outline with 3px offset. Reduced motion disables `.lm-btn` and `.lm-btn::before` transitions. Reuse these rules for the Phase 12 sticky button inside its pricing namespace.

Render conversion CTAs as enabled `button type="button"` elements with no action. Explicitly reset native button borders, background, inherited font, and margins to match the original anchors; disabling the buttons would alter appearance and interaction. Remove conversion-link and click-tracking behavior from the port.

### Mobile behavior — Phases 9–12

The recording contains desktop only; mobile behavior is established by the captured source and CSS. Copy both viewport media queries and container queries rather than replacing them with Dinu's standard breakpoints.

- At viewport widths ≤809.98px, remove the outer card border/background/shadow and show the three-part plan-summary strip. Clicking a summary scrolls its corresponding plan into view with original smooth scrolling and 88px plan scroll margin; reduced motion scrolls immediately.
- The summary precedes the ledger inside `.lm-wide`. It uses three equal columns, 1px border, 16px radius/bottom margin, and clipped overflow. Buttons have 76px minimum height, 6px gap, `12px 12px 14px` padding, and 1px separators except on the first child. Names use 13px/500/-0.01em, prices Newsreader 24px/350/-0.03em, `/ month` 12px, and price-row gaps `2px 4px`. Names and suffixes inherit the reference's `normal` line-height. Growth's `#f1f0ef` highlight is static; its price comes from `details.growth.price`. Preserve hidden ` · ` separators, click-time reduced-motion detection, local `.lm-wide` target lookup, `block: 'start'`, and omission of `aria-pressed`. Summary navigation does not mutate pricing state.
- At container widths ≤1000px, reduce cell horizontal padding to 18px.
- At container widths ≤719px, stack the plan cards with 16px gaps, Growth first. Hide the shared desktop slider, shared rules, and dither backgrounds, exactly as Loops does. Show the Growth-local slider with discrete paid stops 10–27.
- At viewport widths ≤809.98px, the mobile slider uses a 44px transparent native thumb/touch target and a separately drawn 24px visible knob; retain its original 10px negative margins and 24px visual meter. This viewport rule is independent of the ≤719px container visibility rule. Its 18 paid ticks are evenly spaced over `calc(12px + index / 17 * (100% - 24px))`. Endpoint labels are exactly `5,000` and `1.5 million`, with visually hidden ` to ` and ` subscribed contacts`; accessible range value text uses the full comma-formatted paid contacts and monthly price. Endpoint styling is flex/space-between, 12px gap, 4px top margin, muted ink, and 0.8125rem.
- Retain the static Growth emphasis in the summary strip and stacked Growth card colors.
- Copy the mobile sticky signup bar logic: at viewport widths ≤809.98px, query `.lm-col .lm-btn` within the pricing root, filter nonzero-height rectangles, and show when **at least one** has `bottom <= 0`, none satisfy `height > 0 && bottom > 0 && top < window.innerHeight`, and the document's first `footer` does not satisfy that visibility predicate. Calculate on mount and coalesce passive scroll/resize updates into one animation frame; cancel pending work and remove listeners on unmount. Summary buttons do not count as conversion CTAs.
- Portal the conditional bar directly to `document.body`, retaining `.loops-pricing` on it for font/palette/button scoping and overriding the element's width/max-width/margins. Exact geometry: fixed left/right/bottom zero, z-index 10, `12px 16px max(12px, env(safe-area-inset-bottom))` padding, 1px `#dad9d6` top border, `#fdfdfc` background. Its opacity entrance lasts 220ms with `cubic-bezier(0.23, 1, 0.32, 1)` and is disabled under reduced motion. The existing `Start for free` conversion button is always filled and a no-op.

Phase 9 ports the following captured source geometry (token-backed borders/colors use the palette listed above):

```css
@media (max-width: 809.98px) {
  .lm-wide { padding: 0; border: 0; border-radius: 0; background: none; box-shadow: none; }
  .lm-col { scroll-margin-top: 88px; }
  .lm-footnote { font-size: 0.8125rem; }
}
@container lm (max-width: 1000px) {
  .lm-ledger { --lm-pad: 18px; }
}
@container lm (max-width: 719px) {
  .lm-ledger { display: flex; flex-direction: column; gap: 16px; }
  .lm-col[data-active="false"] { opacity: 1; }
  .lm-cell { padding: 12px 20px; }
  .lm-head { padding: 24px 20px 4px; }
  .lm-price-cell { padding: 8px 20px 16px; }
  .lm-cta { padding: 16px 20px 20px; }
  .lm-plan-scale, .lm-scale-spacer { display: none; }
  .lm-mobile-scale { display: block; }
  .lm-col > .lm-cell.lm-scale-cell { border-top: 0; padding: 4px 20px 16px; }
}
```

Viewport queries and named-container queries remain independent: frame removal does not itself stack cards, and stacking does not itself enable the phone touch-target overrides. Preserve both mechanisms for source-exact responsiveness.

The shared full-range selection is the desktop behavior. Loops' stacked mobile layout offers a paid-only Growth range and summary navigation; it does not expose the same Free-to-Enterprise slider. Copy this distinction, as requested.

## Research status

Research for this plan included inspecting the current Svelte source, downloading public HTML/JavaScript, extracting video frames, and checking the captured reference files. No browser session, application build, or application tests were needed to prepare the plan. All requested clarifications are resolved. Application implementation begins with Phase 1; implementation testing belongs to Phase 14.
