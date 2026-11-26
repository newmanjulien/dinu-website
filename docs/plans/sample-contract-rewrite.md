# Sample contract and negotiation guidance rewrite

## Outcome

Replace the Oceans staffing agreement with an original fictional B2B software agreement. Rewrite all associated guidance and concessions, then use the same terms and approval policies throughout the hero and feature illustrations.

This document is a plan only. Implementation has not started.

## Constraints

- Use a clearly identified fictional provider, not Dinu or a customer company. Working label: “Sample Software Co.”
- Remove Oceans, Diver terminology, Ben, Ian, staffing provisions, and their associated identifiers from active sample content.
- Prefer a short, coherent agreement and fewer useful guidance items over preserving the current 55-item playbook.
- Preserve unrelated workspace changes. Change animation infrastructure only where the new content requires it.
- Keep the illustrations simulated; requesting approval or sending a contract must not contact anyone.
- Do not create or expand tests. Run existing tests only if a specific implementation issue makes them necessary.
- All validation and testing belongs in dedicated phases. Implementation phases have deliverables, not end-of-phase test commands.
- Do not use browser checks or Playwright. The user will review the visuals.
- Historical planning documents can retain references to Oceans; active sample content and its documentation must use the new example.

## Proposed contract policies

These are illustrative policies for the fictional provider, not Dinu’s actual commercial terms.

| Topic | Baseline | Rep authority | Approval required |
| --- | --- | --- | --- |
| Subscription | Twelve-month subscription; annual renewal; 30-day nonrenewal notice | Explain commitment and renewal | Early cancellation for convenience: Legal and Finance |
| Payment | Annual invoicing, net 30 | Extend to net 45 | Quarterly invoicing: Finance |
| Renewal pricing | Increase of no more than 5%, only at renewal, with 60 days’ notice | Reduce maximum to 3% | Eliminate renewal increases: Finance |
| Publicity | Limited permission to use customer name and logo; no implied endorsement | Remove publicity permission | Broader marketing rights: Legal |
| Assignment | Consent required, with a defined merger/acquisition exception | Explain the existing exception | Expand permitted transfers: Legal |
| Liability | Mutual damage exclusions; general cap of six months’ subscription fees | Explain the allocation of risk | Increase general cap to twelve months: Legal; other changes also require Legal |

The drafting phases must define the fee measurement period, early-term cap calculation, payment-obligation treatment, and exceptions consistently. Avoid accidental unlimited liability or a zero cap at the start of the subscription.

## Phases

### Phase 1 — Draft the replacement contract

- [ ] Define the fictional companies, software product, price, currency, subscription dates, and visible sample label.
- [ ] Draft subscription access, permitted use, customer responsibilities, support, and a service warranty with a defined remedy.
- [ ] Draft billing, invoice disputes, proportionate late-payment terms, renewal, and mutual termination rights using the policy table.
- [ ] Draft confidentiality, customer-data ownership, security duties, incident notice, and data export/deletion without unsupported claims.
- [ ] Draft liability, limited third-party IP indemnity, publicity, assignment, and essential administrative terms. Specify cap calculations, exceptions, and payment treatment.
- [ ] Complete the order form. It controls identified commercial fields; other overrides must expressly identify the agreement provision being changed.
- [ ] Remove staffing obligations, equipment fees, hiring restrictions, and their associated penalties.

Deliverable: a complete, concise contract and populated order form in a working content brief.

### Phase 2 — Replace the contract source

- [ ] Encode the draft in `scripts/product-animation/data/contract-blocks.json` using the existing document schema.
- [ ] Use readable clause, block, anchor, and source identifiers; replace obsolete numbering and cross-references.
- [ ] Remove Oceans identifiers, staffing paragraphs, and obsolete tables.

Deliverable: the new agreement and order form represented in source JSON.

### Phase 3 — Rewrite the playbook

- [ ] Replace `scripts/product-animation/data/playbook-items.json` with fewer useful items mapped to the new clauses.
- [ ] Write accurate summaries, buyer-facing explanations, common objections, and negotiation instructions.
- [ ] Define exact permitted changes and escalation triggers using Legal and Finance roles.
- [ ] Distinguish preapproved wording, proposals pending approval, and custom redlines requiring escalation.
- [ ] Remove overlapping items, vague approval language, personal names, and dismissive wording.

Deliverable: complete guidance and explicit negotiation authority for the replacement agreement.

### Phase 4 — Implement concessions and preparation

- [ ] Add net-45 payment, quarterly invoicing, a 3% renewal-increase limit, removal of renewal increases, removal of publicity permission, and a twelve-month liability cap.
- [ ] Set approval flags and preferred/rare tiers to match the policy table and instructions.
- [ ] Define exact document replacements, updating affected order-form fields where applicable. Use the existing selection model for mutually exclusive alternatives.
- [ ] Keep broader assignment and custom liability changes as escalation instructions.
- [ ] Update `scripts/prepare-product-animation.mjs` panel selections and deliberate page breaks.
- [ ] Replace staffing-specific state names in preparation and `src/lib/components/product-animation/model.ts` with baseline, payment-conceded, and liability-proposed states. Pending-approval counts are 0, 0, and 1.
- [ ] Adapt `hero-tour.ts` state references and clause targets; author the final walkthrough in Phase 6.
- [ ] Keep generated contract data derived from the source, never hand-edited.

Deliverable: working concession overlays and preparation references for the new sample.

### Phase 5 — Content and source validation

- [ ] Review the contract and order form for conflicting provisions, undefined terms, dates, prices, unsupported claims, and consistent precedence.
- [ ] Confirm that renewal-price notice precedes the buyer’s nonrenewal deadline and that liability calculations work at the start of the subscription.
- [ ] Run `npm run prepare:animations` using Node 24 or later to generate `src/lib/components/product-animation/data/contract.json` and exercise existing composition safeguards.
- [ ] Inspect baseline wording, concession revisions, source references, and approval counts, including concessions outside the hero states. Use a temporary read-only composition script if necessary; do not add a test suite.
- [ ] Compare all guidance and approval metadata with the actual contract changes. Resolve identified issues and repeat only the relevant checks.

Deliverable: coherent contract content, validated concession outputs, and generated animation data. No browser checks.

### Phase 6 — Rewrite the hero walkthrough

- [ ] Show assignment explanation, a preapproved payment change, a proposed liability-cap change, and an approval request.
- [ ] Remove empty clause visits; give each stop a clear purpose.
- [ ] Update reading durations, scroll targets, and the accessible label in `src/lib/components/hero/Hero.svelte`.
- [ ] End with one change awaiting approval and sending blocked. Preserve looping and reduced-motion behavior.

Deliverable: one coherent hero negotiation story.

### Phase 7 — Align feature illustrations and documentation

- [ ] Update `ContractExcerpt.svelte` to use the new agreement’s terms.
- [ ] Update `SummaryWidget.svelte` to explain the assignment exception using matching contract language.
- [ ] Update `AcceptChangesWidget.svelte` to apply net 45 without approval, with matching redline, guidance, and accessible label.
- [ ] Update `ApprovalWidget.svelte` to use the new order form and one pending Legal approval; keep sending blocked and actions simulated.
- [ ] Update active animation documentation for the new content, states, and walkthrough.

Deliverable: consistent feature illustrations and maintenance documentation.

### Phase 8 — Final validation

- [ ] Regenerate prepared content with `npm run prepare:animations` if its sources changed.
- [ ] Run `npx svelte-kit sync` and `npx svelte-check --tsconfig ./tsconfig.json` for type and component validation.
- [ ] Run `npx vite build` for production compilation. Avoid `npm run check` and `npm run build` by default because they also run existing playback tests.
- [ ] Search active sample sources, generated data, feature copy, labels, and documentation for Oceans, Diver, Ben, Ian, obsolete staffing terms, and retired identifiers.
- [ ] Review concession outputs, approval counts, tour references, and agreement/order-form consistency.
- [ ] Run `git diff --check` and review the scoped diff for unintended changes.
- [ ] Resolve identified failures and repeat only the relevant checks within this validation phase.

Deliverable: validated implementation and a concise handoff describing changes, checks, and any limits. Visual browser review remains with the user.
