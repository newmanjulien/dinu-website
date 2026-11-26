<script lang="ts">
	import FeatureIllustration from './FeatureIllustration.svelte';
	import { approvalTour } from './click-reveal-tour';
</script>

<div class="relative">
	<img
		src="/dinu-dinosaur-corner.svg"
		alt=""
		aria-hidden="true"
		width="130"
		height="185"
		class="pointer-events-none absolute top-0 right-0 z-[1] hidden h-auto w-[69.5px] [transform:translate(34%,-47%)] select-none lg:block"
	/>
	<FeatureIllustration tour={approvalTour} documentPosition="ending" label="The end of a contract with one change needing approval. A cursor clicks Ask for approval beneath the page. Send to buyer stays disabled until the change is approved.">
		{#snippet document()}
			<p class="m-0 text-ink-muted">(i) Initial Term. During the Initial Term for the Professional(s) designated in the table below, Customer shall pay Provider the applicable monthly fee set forth in the table below, which shall be paid in a one-time lump-sum payment for all months included in the Initial Term for each Professional prior to the commencement of the Initial Term.</p>
			<p class="m-0 text-ink-muted">(ii) Renewal Term. During each Renewal Term for the Professional(s) designated in the table below, Customer shall pay Provider the applicable monthly fee set forth in the table below, which shall be paid in a one-time lump-sum payment for all months included in the Renewal Term for each Professional prior to the commencement of the Renewal Term.</p>
			<p class="m-0 text-ink-muted">(iii) Equipment Fee. For the Professional(s) designated in the table below, in accordance with Section 3(a)(iii) of the Agreement, Customer shall pay Provider a non-refundable Equipment Fee in the amount of One Thousand Seven Hundred and Fifty Dollars and No Cents ($1,750.00).</p>
			<p class="m-0 text-ink-muted">(iv) Annual Adjustment. The Monthly Fee listed above for each Professional shall be subject to an automatic seven percent (7%) increase on each annual anniversary of the Initial Term Start Date.</p>
			<table class="
				mt-3 w-full table-fixed border-collapse text-[12px] leading-[1.4] text-ink-muted [&_th]:bg-canvas
				[&_th]:font-text [&_td]:h-8 [&_th]:border [&_td]:border [&_th]:border-line-mid [&_td]:border-line-mid
				[&_th]:p-2 [&_td]:p-2 [&_th]:text-left [&_td]:text-left [&_th]:wrap-anywhere [&_td]:wrap-anywhere
				@max-[640px]/illustration:[&_th]:p-1.5 @max-[640px]/illustration:[&_td]:p-1.5
			">
				<thead><tr><th>Professional(s)</th><th>Initial Term Start</th><th>Renewal Term Start</th><th>Monthly Fee</th></tr></thead>
				<tbody><tr><td></td><td></td><td></td><td></td></tr></tbody>
			</table>
		{/snippet}
		{#snippet actions()}
			<div class="flex justify-center gap-3">
				<button class="
					rounded-lg border border-line-mid bg-surface px-3 py-1.5 font-[inherit] text-ink whitespace-nowrap
					@max-[640px]/illustration:px-2.5 @max-[640px]/illustration:text-[13px]
				" type="button" data-illustration-target>Ask for approval</button>
				<button class="
					rounded-lg border border-line bg-control-fill px-3 py-1.5 font-[inherit] text-ink-muted whitespace-nowrap
					@max-[640px]/illustration:px-2.5 @max-[640px]/illustration:text-[13px]
				" type="button" disabled>Send to buyer</button>
			</div>
			<p class="mt-2.5 text-center text-[13px] text-ink-muted">1 of your changes needs approval</p>
		{/snippet}
	</FeatureIllustration>
</div>
