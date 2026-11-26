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
	<FeatureIllustration tour={approvalTour} documentPosition="ending" label="A software agreement with a proposed liability-cap change from six to twelve months, initially $24,000 USD. A cursor clicks Ask for approval. The simulated request awaits Legal approval and Send to buyer remains disabled.">
		{#snippet document()}
			<p class="m-0 text-ink-muted">Provider owns the service and its documentation. Customer owns Customer Data. Each party retains its other intellectual property; no ownership transfers under this Agreement.</p>
			<p class="m-0 text-ink-muted">Neither party may terminate the subscription early for convenience. Nonrenewal ends the subscription at the end of the current term and does not create an additional charge.</p>
			<p class="m-0 font-medium text-ink">8. Liability limits</p>
			<p class="m-0 text-ink-muted">Each party’s total aggregate liability arising out of or relating to this Agreement, across all claims, is limited to <del class="opacity-65">six</del> <ins class="box-decoration-clone rounded-[3px] bg-success/[28%] py-px text-inherit no-underline">twelve</ins> months of subscription fees. For this calculation, one month equals one-twelfth of the annual subscription fee payable for the subscription year in which the earliest event giving rise to any claim against that party occurred. The cap therefore equals <del class="opacity-65">half of that annual fee</del> <ins class="box-decoration-clone rounded-[3px] bg-success/[28%] py-px text-inherit no-underline">the full annual fee</ins>, regardless of invoice timing or fees paid so far. It excludes taxes and is not reduced by service refunds or credits. For an event after the subscription ends, use the final subscription year’s annual fee. At the initial $24,000 annual fee, the cap is <del class="opacity-65">$12,000</del> <ins class="box-decoration-clone rounded-[3px] bg-success/[28%] py-px text-inherit no-underline">$24,000</ins>, including on the first day of the term.</p>
		{/snippet}
		{#snippet actions({ revealed })}
			<div class="flex justify-center gap-3">
				<button class="
					rounded-lg border border-line-mid bg-surface px-3 py-1.5 font-[inherit] text-ink whitespace-nowrap
					@max-[640px]/illustration:px-2.5 @max-[640px]/illustration:text-[13px]
				" type="button" disabled={revealed} data-illustration-target>Ask for approval</button>
				<button class="
					rounded-lg border border-line bg-control-fill px-3 py-1.5 font-[inherit] text-ink-muted whitespace-nowrap
					@max-[640px]/illustration:px-2.5 @max-[640px]/illustration:text-[13px]
				" type="button" disabled>Send to buyer</button>
			</div>
			<p class="mt-2.5 text-center text-[13px] text-ink-muted">1 of your changes needs approval</p>
		{/snippet}
	</FeatureIllustration>
</div>
