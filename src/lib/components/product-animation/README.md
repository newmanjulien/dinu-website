# Product animations

The hero uses `ProductAnimation.svelte` and prepared product content. The three
nonhero animations use the smaller
[feature illustration system](../marketing/illustrations/README.md). All
illustrations share the clock, cursor, and cursor types in `components/animation`.
`ProductAnimation` owns the fixed looping hero tour and takes only its accessible
`label`; feature widgets author their own lightweight click-and-reveal scenes.
Their contents are inert; the cursor never dispatches events or sends requests.

## Content preparation

`data/contract.json` contains the full Oceans contract, compact highlighted runs,
ordered blocks, deliberate signature/exhibit breaks, guidance, and four finite contract states. Each state stores only
changed blocks, selected concessions, and its approval count. The annual fee
concession changes both the agreement and Exhibit A.

Added text uses yellowish green; deleted text uses gray with strikethrough.
Selection and hover only color unchanged runs. Revised runs retain trigger
markers for framing. Plain runs render as text without extra wrappers.

Run `npm run prepare:animations` using Node 24 or later after changing the source
JSON, concessions, or deliberate page breaks. Preparation imports TypeScript directly;
it does not start Vite. `createContractComposer(blocks, overlays)` prepares the
immutable source index, atoms, and trigger geometry once and returns a function
that composes each selection independently. Unknown items and concessions,
conflicts, invalid ranges, and ambiguous trigger ownership fail preparation.
States retain source numbering, references, optional paragraphs, and readable
redlines. Baseline composition runs once, followed by the three changed states.

Source data and composition live in `scripts/product-animation` and stay out of
browser bundles. The browser performs no indexing, conflict resolution, text
profiling, or editing. `paginate-contract.ts` fills sheets by measuring clones of
the rendered blocks at the document's actual width. Paragraphs split at word
boundaries with their highlight and revision runs intact. Headings stay with
following text, tables stay together, and paragraph breaks avoid stranded lines.
The signature page and Exhibit A retain their explicit breaks. Desktop sheets
are 1056px tall; mobile sheets are 540px tall with the existing readable type.

## Timeline and clock

Scenes and frame values use shallow reactive references to preserve their
immutable identity. Each beat declares its duration, discrete contract and guidance scene, typed
cursor target, and motion cues. A viewed clause is independent of the optional
open box. Concession targets specify the actual concession ID. `defineTour`
expands scene changes into motion cues at module initialization; phase names
are identifiers only. Shared timing constants and clock-sampled easing retain
the existing motion. Product-animation targets are validated against prepared
content by the build-time timeline check. The pure validator stays outside DOM
geometry and the browser bundle.

`components/animation/tour-player.svelte.ts` owns one logical clock per illustration.
Renderers supply `getMotionEnd(step)`; hero geometry can override that endpoint
with `setMotionEnd` after measuring actual movement. The player needs only step
durations, without knowing product or illustration motion cues. Its elapsed beat
time drives document and panel scrolling, paper centering, guidance entrance,
cursor movement and opacity, click feedback, and loop fades. Frames run only
while geometry or paint is moving; stationary holds use a timer. A boundary
timer settles motion even if the final animation frame arrives late. There are
no autonomous CSS animations, animation-pausing observers, or motion callbacks
with their own elapsed time.

Only the elected visible illustration plays. Visibility is normalized by the
area that can fit in the viewport, so short viewports can start tall frames.
Resize notifications share one queued visibility refresh; observer thresholds
rebuild only when the normalized threshold values change. Election keeps its
existing hysteresis.
Missing IntersectionObserver support mounts illustrations immediately and
measures visibility on scroll and resize; hidden tabs still pause. Geometry preparation pauses the clock
without giving up an existing session's eligibility.

Reduced motion is observed throughout the mounted lifetime, including startup.
Enabling it saves the current beat and elapsed time and shows the completed
scene without a cursor. Disabling it restores that position after measurement.
Completed feature tours stay complete. Reduced-motion sessions do not compete
for playback. Natural feature completion releases playback and layout observers,
listeners, timers, and frames after settling the final scene. An unfinished reduced-motion
feature retains its session so disabling reduced motion can resume it. The hero
keeps its looping session until unmount. Cleanup is idempotent.

## Geometry and rendering

`scene-geometry.ts` owns DOM measurement, cached target coordinates,
scale, scrolling, clause anchors, and presentation frames. It measures after
scene DOM updates, awaits document pagination, and invalidates its cache when contract or guidance content,
frame dimensions, or fonts change. Ordinary beats reuse measurements. Reads
are grouped before layout writes; animation frames use cached coordinates and
known offsets. Unchanged scroll and style values skip DOM writes; measurement
invalidates scroll caches when content changes or the guidance node is replaced.
Panel target positions use measured panel bounds. `ContractDocument` receives a
prepared snapshot and optional selected/hovered trigger IDs independently, so
cursor, viewport, opacity, and unrelated guidance updates do not rerender it.
`ContractDocument` caches the four layouts for the current paper width and fonts,
reusing them during ordinary beats and subsequent loops. A width or font change
clears those layouts. Before client pagination is ready, the ordered contract
renders continuously. Prepared blocks are a discriminated union with required
fields for each kind; `blockOrder` and `pageBreaks` replace authored page groups.
`GuidedCursor` and `GuidancePanel` are presentation components.

Frame and window resize notifications share a queued refresh. Unchanged frame
dimensions, mobile mode, and pixel ratio skip preparation before pausing the
clock, including notifications for a preparation already in progress. Font
loading forces fresh measurements even when those inputs remain unchanged.

The desktop stage stays 1440px wide and scales proportionally to the frame.
Mobile stage width follows the frame. Stage height follows the frame's scale
to size guidance and scroll limits. The hero
starts at the contract top with centered paper and no
box. The paper shifts when the first box opens. Boxes stay open during travel
and are replaced on the next clause click. Guidance attaches to its own clause
inside the document viewport. Mobile preserves the 80px anchor offset and hides
the guidance overlay during revision framing. The rail owns entrance motion for
both first opening and replacement.

Panel-frame targets stay attached to the box itself while its contents scroll;
section and concession targets follow the scrolling contents.
Cursor approach is distinct from tracking its attachment through camera, paper,
or panel movement. Translation preserves the cursor tip and inverse scale
preserves its apparent size. Resizing preserves the beat and elapsed progress,
remeasures, and snaps to the corresponding frame without replaying entrances.

The hero visits five boxes, applies three concessions, opens two description-only
boxes, and ends with approval. It loops after the completed hold and fade/reset.
`heroCompletedStep` supplies the reduced-motion scene separately from the loop's
last beat. Feature tours finish once.

The hero mounts eagerly. The smaller feature illustrations own their lazy startup
and render their completed scenes on the server.
Paper renders before playback starts. Each illustration exposes one accessible
description, with inert contents hidden from assistive technology and pointer
events passing through to website scrolling.

## Validation

Run `npm run build` for Svelte checks, existing timeline and playback validation,
and the production build. Do not create tests. Browser review is left to the
site owner. When reviewing motion geometry, check desktop and mobile centering,
clause and pointer alignment, panel scrolling, redlines, approval, looping, live reduced
motion, offscreen pause, short viewports, and resizing during movement.

The missing-IntersectionObserver fallback covers both animation systems and section
reveals. SvelteKit itself still assumes that API for link preloading; disabling it
globally in a browser check produces a framework preload exception even though
the illustrations mount and play.
