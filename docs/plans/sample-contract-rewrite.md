# Sample contract and negotiation guidance rewrite

## Outcome

Replace the Oceans staffing agreement with an original fictional B2B software agreement. Rewrite all associated guidance and concessions, then use the same terms and approval policies throughout the hero and feature illustrations.

All eight phases are complete: the baseline draft is in [sample-contract-content-brief.md](sample-contract-content-brief.md), the replacement agreement and order form are encoded in the contract source JSON, and the playbook contains 14 focused guidance items and six concession options. Content, concession, component, tour, and production-build validation passed. The generated animation data uses the new agreement and three contract states. The hero explains assignment, applies preapproved net 45, proposes a twelve-month liability cap, and ends awaiting Legal approval with sending blocked. Feature illustrations and active animation documentation follow the same agreement and approval policies. Visual browser review remains with the user.

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

- [x] Define the fictional companies, software product, price, currency, subscription dates, and visible sample label.
- [x] Draft subscription access, permitted use, customer responsibilities, support, and a service warranty with a defined remedy.
- [x] Draft billing, invoice disputes, proportionate late-payment terms, renewal, and mutual termination rights using the policy table.
- [x] Draft confidentiality, customer-data ownership, security duties, incident notice, and data export/deletion without unsupported claims.
- [x] Draft liability, limited third-party IP indemnity, publicity, assignment, and essential administrative terms. Specify cap calculations, exceptions, and payment treatment.
- [x] Complete the order form. It controls identified commercial fields; other overrides must expressly identify the agreement provision being changed.
- [x] Remove staffing obligations, equipment fees, hiring restrictions, and their associated penalties.

Deliverable: a complete, concise contract and populated order form in a working content brief.

### Phase 2 — Replace the contract source

- [x] Encode the draft in `scripts/product-animation/data/contract-blocks.json` using the existing document schema.
- [x] Use readable clause, block, anchor, and source identifiers; replace obsolete numbering and cross-references.
- [x] Remove Oceans identifiers, staffing paragraphs, and obsolete tables.

Deliverable: the new agreement and order form represented in source JSON.

### Phase 3 — Rewrite the playbook

- [x] Replace `scripts/product-animation/data/playbook-items.json` with fewer useful items mapped to the new clauses.
- [x] Write accurate summaries, buyer-facing explanations, common objections, and negotiation instructions.
- [x] Define exact permitted changes and escalation triggers using Legal and Finance roles.
- [x] Distinguish preapproved wording, proposals pending approval, and custom redlines requiring escalation.
- [x] Remove overlapping items, vague approval language, personal names, and dismissive wording.

Deliverable: complete guidance and explicit negotiation authority for the replacement agreement.

### Phase 4 — Implement concessions and preparation

- [x] Add net-45 payment, quarterly invoicing, a 3% renewal-increase limit, removal of renewal increases, removal of publicity permission, and a twelve-month liability cap.
- [x] Set approval flags and preferred/rare tiers to match the policy table and instructions.
- [x] Define exact document replacements, updating affected order-form fields where applicable. Use the existing selection model for mutually exclusive alternatives.
- [x] Keep broader assignment and custom liability changes as escalation instructions.
- [x] Update `scripts/prepare-product-animation.mjs` panel selections and deliberate page breaks.
- [x] Replace staffing-specific state names in preparation and `src/lib/components/product-animation/model.ts` with baseline, payment-conceded, and liability-proposed states. Pending-approval counts are 0, 0, and 1.
- [x] Adapt `hero-tour.ts` state references and clause targets; author the final walkthrough in Phase 6.
- [x] Keep generated contract data derived from the source, never hand-edited.

Deliverable: working concession overlays and preparation references for the new sample.

### Phase 5 — Content and source validation

- [x] Review the contract and order form for conflicting provisions, undefined terms, dates, prices, unsupported claims, and consistent precedence.
- [x] Confirm that renewal-price notice precedes the buyer’s nonrenewal deadline and that liability calculations work at the start of the subscription.
- [x] Run `npm run prepare:animations` using Node 24 or later to generate `src/lib/components/product-animation/data/contract.json` and exercise existing composition safeguards.
- [x] Inspect baseline wording, concession revisions, source references, and approval counts, including concessions outside the hero states. Use a temporary read-only composition script if necessary; do not add a test suite.
- [x] Compare all guidance and approval metadata with the actual contract changes. Resolve identified issues and repeat only the relevant checks.

Deliverable: coherent contract content, validated concession outputs, and generated animation data. No browser checks.

Validation record: preparation passed on Node 24.20.0. A one-off read-only composition check confirmed all 73 blocks against the content brief, 29 nonoverlapping trigger ranges, all six concessions and their original/accepted wording, all 36 valid concession combinations, and generated state/panel references. Approval counts are 0 for baseline, 0 for payment-conceded, and 1 for liability-proposed. Annual-fee calculations give a $12,000 baseline cap and $24,000 proposed cap from day one, and four $6,000 initial quarterly invoices. The 60-day renewal-price notice precedes the 30-day nonrenewal deadline. Guidance and approval flags match the replacements; no content corrections were needed. No test files or browser checks were added or run.

### Phase 6 — Rewrite the hero walkthrough

- [x] Show assignment explanation, a preapproved payment change, a proposed liability-cap change, and an approval request.
- [x] Remove empty clause visits; give each stop a clear purpose.
- [x] Update reading durations, scroll targets, and the accessible label in `src/lib/components/hero/Hero.svelte`.
- [x] End with one change awaiting approval and sending blocked. Preserve looping and reduced-motion behavior.

Deliverable: one coherent hero negotiation story.

Implementation record: assignment now opens the buyer explanation without changing the agreement. Payment applies the exact preapproved net-45 alternative; liability presents Legal approval guidance before proposing the twelve-month cap. Removed the renewal detour, increased reading holds, and framed the two redlines. The simulated request displays one change awaiting Legal approval while Send to buyer remains disabled. The loop resets to baseline assignment, and reduced motion holds the same pending scene. Updated the accessible description and action-layout measurement for the request status. Validation is deferred to Phase 8; no tests or browser checks were run.

### Phase 7 — Align feature illustrations and documentation

- [x] Update `ContractExcerpt.svelte` to use the new agreement’s terms.
- [x] Update `SummaryWidget.svelte` to explain the assignment exception using matching contract language.
- [x] Update `AcceptChangesWidget.svelte` to apply net 45 without approval, with matching redline, guidance, and accessible label.
- [x] Update `ApprovalWidget.svelte` to use the new order form and one pending Legal approval; keep sending blocked and actions simulated.
- [x] Update active animation documentation for the new content, states, and walkthrough.

Deliverable: consistent feature illustrations and maintenance documentation.

Implementation record: replaced the staffing excerpts with software agreement text. The summary explains the existing assignment exception and when broader transfers need Legal approval. The concession illustration redlines both payment periods from 30 to 45 days and explains the preapproved wording. The approval illustration shows the populated Order Form with net 45 and a twelve-month liability proposal; its simulated request leaves one change awaiting Legal approval and sending blocked. Updated accessible descriptions and both animation READMEs for the content, three states, approval policies, and final hero story. Validation is deferred to Phase 8; no tests or browser checks were run.

### Phase 8 — Final validation

- [x] Regenerate prepared content with `npm run prepare:animations` if its sources changed.
- [x] Run `npx svelte-kit sync` and `npx svelte-check --tsconfig ./tsconfig.json` for type and component validation.
- [x] Run `npx vite build` for production compilation. Avoid `npm run check` and `npm run build` by default because they also run existing playback tests.
- [x] Search active sample sources, generated data, feature copy, labels, and documentation for Oceans, Diver, Ben, Ian, obsolete staffing terms, and retired identifiers.
- [x] Review concession outputs, approval counts, tour references, and agreement/order-form consistency.
- [x] Run `git diff --check` and review the scoped diff for unintended changes.
- [x] Resolve identified failures and repeat only the relevant checks within this validation phase.

Deliverable: validated implementation and a concise handoff describing changes, checks, and any limits. Visual browser review remains with the user.

Validation record: `npx svelte-kit sync` passed; `npx svelte-check --tsconfig ./tsconfig.json` reported zero errors and zero warnings; `npx vite build` completed production compilation and Vercel adapter output. `node scripts/validate-feature-tours.ts` passed duration, final-scene, and target validation. A one-off read-only composition check verified all 36 valid combinations, original-text recovery, generated wording, payment periods and invoice schedules, day-one liability caps, and approval counts of 0/0/1. The hero completed scene retains one pending approval and resets to baseline without a request status. Agreement and Order Form dates, fees, precedence, and renewal notice deadlines agree. Active sources, generated data, labels, and documentation contain no retired company names, staffing terminology, or old sample identifiers. Source preparation inputs have not changed since Phase 5; the existing generated output matches composition, so regeneration was unnecessary. Scoped diff review and `git diff --check` passed. Clarified the README's standalone tour-validation command. No test files were created, no playback test suite was run, and no browser checks were performed.

Post-review adjustment: narrowed broad highlight ranges to 22 focused policy passages and key Order Form values. About 21% of baseline text is highlighted, down from 95%; only three of 58 paragraphs remain fully highlighted because their concessions replace entire paragraphs. Useful terms outside the hero, including renewal pricing, publicity, and security, retain highlights. Contract wording, guidance, concessions, and approval policies are unchanged. Regenerated prepared content, then validated tour targets, nonoverlapping ranges, concession ownership, all 36 combinations, original wording recovery, generated states, payment consistency, and 0/0/1 approval counts. `git diff --check` passed. No tests were added and no browser checks were performed.

Copy and signature follow-up: shortened all 70 guidance fields and six concession descriptions from 3,337 to 2,472 words, a 26% reduction overall and approximately 23–28% per topic. Shortened the summary and negotiation feature cards too. Removed the complete signature table and its accompanying reference from the contract source and content brief; prepared content now has 72 blocks. Approval rules, concessions, and highlight targets are unchanged. Validation passed: preparation, standalone tour validation, Svelte component checks with zero errors/warnings, all 36 concession combinations, generated panel/state consistency, 0/0/1 approval counts, signature-removal checks, and `git diff --check`. No tests were added and no browser checks were performed.

Longer guidance follow-up: shortened the 41 instruction passages that had at least 30 words from 1,656 to 1,175 words, another 29% reduction overall. Kept shorter passages and concession descriptions unchanged. Regenerated prepared content; read-only checks confirmed only instruction wording changed and all generated panels match the source. Approval rules, contract text, concession replacements, and highlights are unchanged. `git diff --check` passed. No tests or browser checks were run.

Remaining long guidance follow-up: tightened 36 instruction passages and the quarterly concession description. Every instruction passage now has at most 25 words. Kept approval decisions explicit and placed supporting qualifications in the relevant guidance sections. Regenerated prepared content; source comparison confirmed approval metadata and concession replacements unchanged, and generated panels match their sources. Preparation and `git diff --check` passed. No tests or browser checks were run.

Feature correction follow-up: removed the expanded Order Form table from the approval illustration and replaced it with contract prose showing the proposed twelve-month cap, full annual-fee calculation, and $24,000 example. The assignment exception now remains highlighted before the click; clicking reveals its guidance. All “Changes need to be approved” guidance now contains only approver names, including the negotiation feature card. Concession approval metadata is unchanged. Updated active illustration documentation and regenerated prepared content. Validation: standalone tour validation, source/generated approver consistency, unchanged remaining playbook content, table-removal check, and `git diff --check` passed. Svelte component validation reported zero errors and warnings. No tests or browser checks were run.

US localization follow-up: switched the agreement, Order Form, guidance, concession descriptions/replacements, feature accessibility copy, and content brief to USD, Pacific time, California state holidays, California law and applicable US federal law, and state/federal courts in San Francisco County. Identified the provider as a Delaware corporation and the customer as a California corporation. Kept numeric prices, concessions, approval names, and animation behavior unchanged. Regenerated prepared content. Validation passed: all 30 trigger/change ranges, all 36 concession combinations, generated guidance, content-brief consistency, currency, unchanged 0/0/1 approval counts, standalone tour validation, Svelte component validation with zero errors/warnings, localization searches, and `git diff --check`. No tests or browser checks were run.

Document-label removal follow-up: removed the extra agreement and Order Form labels, the company-description qualifier, and the closing provenance sentence. Removed the corresponding qualifiers from hero/feature accessibility descriptions and active animation documentation. Updated the content brief and regenerated prepared content, now 70 blocks. Validation passed: all 36 concession combinations, generated block order, unchanged 0/0/1 approval counts, content searches, Svelte component validation with zero errors/warnings, and `git diff --check`. No tests or browser checks were run.

Plain English guidance follow-up: reviewed the original guidance and rewrote all 56 explanation, objection, and negotiation passages as everyday explanations and concrete customer-conversation prompts. Rewrote six concession descriptions and the summary/payment feature-card copy in the same style. Each instruction passage remains at most 25 words; approval sections contain only approver names. Contract wording, source ranges, concession replacements, and approval flags are unchanged. Regenerated prepared content. Source/generated guidance checks, unchanged 0/0/1 approval counts, Svelte component validation with zero errors/warnings, and `git diff --check` passed. No tests or browser checks were run.
