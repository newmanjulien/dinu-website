<script lang="ts">
	let { approvalCount, highlighted = false }: { approvalCount: number; highlighted?: boolean } = $props();
</script>

<div class="w-[816px] pt-6 pb-4 group-data-[mobile=true]/animation:w-full group-data-[mobile=true]/animation:text-[13px]" data-contract-actions>
	<div class="flex justify-center gap-3">
		<button
			type="button"
			tabindex="-1"
			data-animation-target="approval"
			disabled={approvalCount === 0}
			class={[
				'rounded-lg border px-5 py-2.5 font-[inherit] whitespace-nowrap group-data-[mobile=true]/animation:px-3',
				approvalCount === 0 ? 'border-line bg-control-fill text-ink-muted' : [
					highlighted ? 'border-[var(--color-accent-hover)] bg-[var(--color-accent-hover)]' : 'border-accent bg-accent',
					'text-white'
				]
			]}
		>Ask for approval</button>
		<button
			type="button"
			tabindex="-1"
			disabled={approvalCount > 0}
			class={[
				'rounded-lg border px-5 py-2.5 font-[inherit] whitespace-nowrap group-data-[mobile=true]/animation:px-3',
				approvalCount > 0 ? 'border-line bg-control-fill text-ink-muted' : 'border-accent bg-accent text-white'
			]}
		>Send to buyer</button>
	</div>
	<p class="mt-3 text-center text-[14px] text-line-strong">{approvalCount === 0 ? 'None of your changes need approval' : approvalCount === 1 ? '1 of your changes needs approval' : `${approvalCount} of your changes need approval`}</p>
</div>
