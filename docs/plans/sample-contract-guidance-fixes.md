# Contract guidance and animation corrections

## Outcome

Restore the original guidance's useful qualities: plain English, direct answers to customer concerns, and specific negotiation options. Keep the copy short without forcing every passage into an arbitrary word limit. Make the hero start with a clause near the top and move forward through the agreement with less scrolling.

All three phases are complete. Source validation passed; desktop and mobile visual review remains with the user.

## Constraints

- Preserve the rewritten software agreement, California/Delaware localization, prices, and concession policies. Correct guidance to match those policies rather than inventing new ones.
- Keep approval sections limited to approver names. Explain conditions and permitted alternatives in the negotiation guidance or concession descriptions.
- Preserve the requested shorter copy. Use the fewest words that give an accurate explanation and a useful customer response; drop the rigid 25-word ceiling.
- Keep the document mostly unhighlighted, with useful highlights outside the walkthrough. Highlight the summary feature's clause before the click.
- Keep signature content and fake-data labels removed.
- Add no tables, extra status lines, or explanatory text around the animation buttons. Preserve the feature's sentence: “1 of your changes needs approval.”
- Preserve unrelated workspace changes. No new tests, browser checks, or Playwright. Validation is its own phase.

## Phase 1 — Correct the guidance and approval names

- [x] Compare the relevant original guidance with all 14 current topics. Preserve its explanatory style without copying staffing terms or superseded policies.
- [x] Give each summary a clear account of what the clause means. Replace vague compression such as “unused-fee relief” and “some exceptions apply” with concrete explanations of the relevant refund or exception.
- [x] Make negotiation tips answer the customer's concern: what the rep should explain, what existing protection solves it, and which approved alternative they can offer. Use questions where they help determine the right response.
- [x] Remove generic escalation filler. When escalation is necessary, identify the specific request and approver in the relevant guidance.
- [x] Reconcile approver names with the existing policies: net 45 requires no approval; quarterly billing and removal of unilateral renewal increases require Finance; the twelve-month liability proposal requires Legal. Explain custom-change escalation separately, without suggesting preapproved options need approval.
- [x] Align all six concession descriptions and feature-card guidance with the corrected wording. Avoid filling a section merely because the field exists.

Deliverable: concise, accurate guidance that helps a rep talk to customers, with consistent approval names.

Completion notes: reviewed the original explanations and negotiation responses against all 14 software topics. Replaced vague refund and liability wording with specific outcomes, made tips give direct customer answers and permitted alternatives, and corrected payment/renewal approvers to Finance. Updated all six concession descriptions, the existing summary and payment cards, and the payment illustration's accessible description and documentation. Regenerated animation data so the revised guidance appears on the site. The hero sequence and feature examples remain for Phase 2. Tests and validation remain in Phase 3; no browser checks were performed.

## Phase 2 — Simplify the feature example and hero movement

- [x] Replace the summary feature's lengthy acquisition example with the existing, simpler publicity clause. Explain directly that listing a name/logo does not permit testimonials, case studies, or implied endorsement; offer prior written permission if the customer needs control. Keep this feature focused on explaining a clause, without applying a concession.
- [x] Start the hero with Section 1's subscription-use explanation instead of assignment in Section 11. Use the existing user-replacement provision near the beginning: users can be replaced without increasing the seat count.
- [x] Give that opening provision a narrow click target and include its guidance in generated hero panels. Keep the first click in the opening document view where it fits; avoid the current long trip down to assignment.
- [x] Continue forward to payment, then liability, then approval. Preserve the preapproved net-45 change and the Legal-approved liability proposal. Avoid backward travel, unnecessary clause recentering, and redundant moves between a clause and its redline.
- [x] Remove the liability approval “read more” scroll. Shorten holds to suit the revised copy, especially the one-word “Legal.” section. Keep enough time to understand the actual concession.
- [x] Restore the hero's original concise sentence beneath the buttons instead of the added “Approval requested … Sending blocked” message. Preserve one pending approval and disabled sending.
- [x] Update reset/reduced-motion scenes, generated panel references, accessible descriptions, and active documentation to match the final walkthrough. Keep shared animation changes limited to what the reduced scrolling actually requires.

Deliverable: a simpler explanation feature and a hero that clicks near the top, proceeds in document order, and avoids unnecessary scrolling and status copy.

Completion notes: replaced the summary feature with the already-highlighted name/logo permission and a direct written-permission offer. The hero now starts with a narrow user-replacement highlight in Section 1, then visits payment and liability in document order. Opening framing keeps the first sentence at the top when it fits and reveals only necessary space on shorter frames; opening guidance uses the same approach. Clause and redline views share an anchor. Removed the liability approval read-more beat, reduced its names-only hold to 1,200ms, and restored the concise approval-count caption while preserving pending approval and disabled sending. Updated the loop reset, generated opening panel, accessible descriptions, and active documentation. Regenerated animation data. Validation and visual review remain in Phase 3; no tests or browser checks were performed.

## Phase 3 — Validate the completed corrections

- [x] Regenerate animation data with `npm run prepare:animations` after source changes.
- [x] Review guidance against the original's style and the current agreement: direct answers, ordinary language, useful alternatives, accurate qualifications, and names-only approval sections.
- [x] Review the source sequence for an opening Section 1 click, forward-only clause visits, no approval-panel “read more” scroll, shorter justified holds, and correct loop/reset behavior.
- [x] Confirm the summary highlight exists before clicking, the approval feature has no table or extra button text, and the hero uses the concise original approval-count sentence.
- [x] Run `node scripts/validate-feature-tours.ts`, `npx svelte-check --tsconfig ./tsconfig.json`, and `git diff --check`. Avoid package commands that also run playback tests.
- [x] Check generated guidance, concession wording, targets, and approval counts with a focused read-only inspection. Resolve discrepancies and repeat only affected validation.
- [x] Hand visual review to the user, specifically noting first-click positioning and scroll distance on desktop and mobile. Do not claim these were visually verified.

Deliverable: validated source and component changes, with visual review left to the user. No test suite additions or browser checks.

Completion notes: regenerated 70 blocks and three states. Reviewed all 14 guidance topics and six concession descriptions against the agreement and the original customer-response style. All six generated panels match their source guidance and concession descriptions; the opening target is exactly the user-replacement sentence. Net 45 updates two payment periods with zero approvals; the liability proposal adds one Legal approval. The tour visits Sections 1, 3, and 8 in order, has no read-more beat, holds the Legal section for 1,200ms, resets invisibly to the opening view, and preserves the final pending-approval scene for reduced motion. Confirmed the summary's unconditional highlight, no approval-feature table or extra status line, and the original approval-count captions. The tour validator and whitespace check passed; Svelte reported zero errors and zero warnings. No implementation discrepancies required changes. No new tests, playback tests, or browser checks were run. The user should visually check the first-click position and scroll distance on desktop and mobile.
