<script lang="ts">
	import FeatureIllustration from './FeatureIllustration.svelte';
	import { approvalTour } from './click-reveal-tour';
</script>

<div class="approval-widget">
	<img
		src="/denu-dinosaur-corner.svg"
		alt=""
		aria-hidden="true"
		width="130"
		height="185"
		class="corner-dinosaur"
	/>
	<FeatureIllustration tour={approvalTour} documentPosition="ending" label="The end of a contract with one change needing approval. A cursor clicks Ask for approval beneath the page. Send to buyer stays disabled until the change is approved.">
		{#snippet document()}
			<p>(i) Initial Term. During the Initial Term for the Professional(s) designated in the table below, Customer shall pay Provider the applicable monthly fee set forth in the table below, which shall be paid in a one-time lump-sum payment for all months included in the Initial Term for each Professional prior to the commencement of the Initial Term.</p>
			<p>(ii) Renewal Term. During each Renewal Term for the Professional(s) designated in the table below, Customer shall pay Provider the applicable monthly fee set forth in the table below, which shall be paid in a one-time lump-sum payment for all months included in the Renewal Term for each Professional prior to the commencement of the Renewal Term.</p>
			<p>(iii) Equipment Fee. For the Professional(s) designated in the table below, in accordance with Section 3(a)(iii) of the Agreement, Customer shall pay Provider a non-refundable Equipment Fee in the amount of One Thousand Seven Hundred and Fifty Dollars and No Cents ($1,750.00).</p>
			<p>(iv) Annual Adjustment. The Monthly Fee listed above for each Professional shall be subject to an automatic seven percent (7%) increase on each annual anniversary of the Initial Term Start Date.</p>
			<table>
				<thead><tr><th>Professional(s)</th><th>Initial Term Start</th><th>Renewal Term Start</th><th>Monthly Fee</th></tr></thead>
				<tbody><tr><td></td><td></td><td></td><td></td></tr></tbody>
			</table>
		{/snippet}
		{#snippet actions()}
			<div class="approval-actions">
				<button type="button" data-illustration-target>Ask for approval</button>
				<button type="button" disabled>Send to buyer</button>
			</div>
			<p class="approval-count">1 of your changes needs approval</p>
		{/snippet}
	</FeatureIllustration>
</div>

<style>
	.approval-widget {
		position: relative;
	}
	.corner-dinosaur {
		display: none;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1;
		width: 69.5px;
		height: auto;
		/* Scale the overlap with the drawing so it stays perched on the card's corner. */
		transform: translate(34%, -47%);
		pointer-events: none;
		user-select: none;
	}
	@media (min-width: 64rem) {
		.corner-dinosaur { display: block; }
	}
	table { width: 100%; table-layout: fixed; border-collapse: collapse; margin-top: 12px; font-size: 12px; line-height: 1.4; color: var(--color-ink-muted); }
	th, td { border: 1px solid var(--color-line-mid); padding: 8px; text-align: left; overflow-wrap: anywhere; }
	th { background: var(--color-canvas); font-weight: 450; }
	td { height: 32px; }
	.approval-actions { display: flex; justify-content: center; gap: 12px; }
	button { padding: 6px 12px; border: 1px solid var(--color-line-mid); border-radius: 8px; background: var(--color-surface); color: var(--color-ink); font: inherit; white-space: nowrap; }
	button:disabled { border-color: var(--color-line); background: var(--color-control-fill); color: var(--color-ink-muted); }
	.approval-actions + .approval-count { margin-top: 10px; text-align: center; font-size: 13px; }
	@container (max-width: 639px) {
		button { padding: 6px 10px; font-size: 13px; }
		th, td { padding: 6px; }
	}
</style>
