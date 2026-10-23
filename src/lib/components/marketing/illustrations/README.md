# Feature illustrations

All three nonhero animations use `FeatureIllustration.svelte`: a drawn contract
page with optional guidance and actions in the site's typography and colors. They share
playback and the cursor with the hero through `components/animation`, and do not
import product fixtures or scene geometry.

## Ownership

The homepage owns section order, copy, and the metadata shared with navigation.
`marketing/ContentSection.svelte` owns section headings, body typography, spacing,
entrance motion, and a default 988px content width. Wider sections explicitly
override that width. Its children can be illustrations, integrations, or
testimonials; there is no section-type registry.

`FeatureIllustration` owns responsive layout, typography, paper clipping, card
styling, cursor geometry, lazy startup, accessibility, and cleanup. Widgets supply
the required `tour` prop and `document`, optional `card`, and optional `actions`
Svelte snippets receiving
`{ revealed, expanded, progress }`. Actions sit beneath the paper in the document column.
Without a card, the document column is centered and capped at 680px. The card
snippet renders an `aside.illustration-card`, letting each widget control its
visibility. Optional `card-heading`, `card-body`, and `inline-action` classes use
the shared visual styles. Each widget supplies a stable
`data-illustration-target` element. Summary and negotiation also supply
`data-illustration-target="dropdown"` for a second click. Widgets and validation
import the same `summaryTour`, `acceptChangesTour`, and `approvalTour` definitions
from `click-reveal-tour.ts`; private builders share the opening and completed hold.

`documentPosition="ending"` anchors the paper's bottom above the actions and
extends its top above the frame with a negative margin in the same flex layout,
independent of content height. Text aligns
to the paper's bottom and preceding paragraphs extend upward in natural flow.
The outer frame clips the preceding text and top edge.
The default `middle` position extends the paper above and below the document row,
cropping both horizontal edges. Text has no vertical paper padding and flows
past the frame edges, where it is cropped along with the page.
The document slot clips this extension before the stacked mobile card.
Pages have square corners and no shadow.

`ContractExcerpt` supplies surrounding prose. It places the important clause
after a short opening paragraph by default. Summary uses `clausePosition="middle"`
to place its clause after the opening services, access, and scope paragraphs.
It adds progress reporting and coordination terms around the highlighted clause
to fill out the document.
Contract content renders once in normal flow.
The frame clips overflow; adding text pushes later paragraphs below the visible
page. There are no hidden sizing copies or overlapping action labels.

Desktop layout uses a 400px paper row, two columns, and 20px padding and gaps.
At container widths below 640px, the card stacks below a 480px paper row, with a
220px card slot, 12px outer padding, 16px gaps, and 18px paper padding. Summary
sets `mobileCardHeight={320}` to fit its explanation and negotiation advice;
negotiation uses 300px to fit both dropdowns and their content.
These dimensions depend on available width and remain constant throughout playback,
including when an action label wraps differently. Cards have 16px padding and
corners. Paper and card text share the same 14px size and 1.5 line height.
Document actions share the fixed document row with the paper; they do not grow
the frame. Illustrations without guidance omit the mobile card slot.
`mark` and `ins` use the shared green highlight; `del` strikes through removed
text in muted gray.

## Behavior

The common timeline rests for 700ms, fades in the cursor for 120ms, approaches
for 600ms, clicks for 220ms, and dwells on the result for 300ms. `revealed`
becomes true after the click. Summary's tour uses a 300ms initial reveal to ease
`progress` from zero to one for the card.
Negotiation and approval retain the initial dwell without requesting frames for absent motion.
Both dropdown tours fade their expanded content in over 300ms.
Snippet state changes only when `revealed`, `expanded`, or `progress` changes; cursor frames
do not invalidate the content. The cursor fades during the 1,800ms completed hold.
Features play once and retain the completed scene.

Widgets choose how to present the result:

- Summary first clicks the resale clause to highlight it and reveal its plain
  English explanation. After a 1,000ms reading pause, the cursor moves from the
  clause to “How to negotiate” over 600ms and clicks to open advice about the
  buyer's ability to bill its own clients. `expanded` becomes true after this
  second click. Its card is vertically centered beside the document. Card resizing
  updates the cursor's target as the dropdown expands.
- Negotiation uses `revealed` to immediately insert the concession redline and
  swap the inline blue “Apply concession” action for red “Remove concession.”
  After the reading pause, the cursor opens a second dropdown, “Changes need to
  be approved,” to reveal “Requires Ben’s approval.” The preferred concession
  stays expanded and the contract keeps its applied change.
- Approval shows the original contract's closing fee terms and table, followed
  by “Ask for approval,” disabled “Send to buyer,” and “1 of your changes needs
  approval.” As in the original demo, clicking leaves those labels unchanged.
  It does not imply that the change has been approved.

The cursor initially aims at the primary target's center from 52px right and
64px below it. Each movement captures the displayed cursor position once, before
releasing the previous click anchor, and moves toward the live destination. Pause,
resume, and layout updates preserve that movement origin. Layout observation
always updates live target coordinates. A separate click anchor is
captured for the click, reveal, and cursor fade; a label-only Apply/Remove swap
retains that anchor. Font and viewport invalidations, frame resizing, and target
movement unrelated to a label swap rebase it to the newly measured target.
The anchor clears when the next movement starts or the cursor finishes fading.
Reduced motion parks normal cursor geometry while showing the completed scene;
resuming restores the normal scene and measures its layout before showing the cursor.
Cached coordinates drive motion without layout reads on each animation frame.
Layout changes preserve the current beat and elapsed progress. The click ring only
animates during clicks; it uses a constant scale and zero opacity otherwise.

## Lifecycle

The server renders the completed illustration, including without JavaScript.
Playback starts within a 600px viewport margin. The shared clock owns visibility
election, hidden-tab pausing, and live reduced-motion handling. Reduced motion
shows the completed scene with no cursor. Each widget exposes one accessible
description and hides its inert contents from assistive technology. The cursor
never dispatches events or sends requests. Observers and subscriptions are
released at natural completion through the player's `onComplete` callback,
and cleanup is idempotent on unmount. Queued callbacks cannot restart a disposed
feature. Unfinished features shown in reduced motion retain their session so
they can resume when the preference is disabled.

Run `npm run build` for the existing checks and production build. Browser review
is left to the site owner; do not add tests without an explicit request.
