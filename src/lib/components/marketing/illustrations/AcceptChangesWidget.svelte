<script lang="ts">
	import CaretDownIcon from 'phosphor-svelte/lib/CaretDownIcon';
	import FeatureIllustration from './FeatureIllustration.svelte';
	import ContractExcerpt from './ContractExcerpt.svelte';
	import { acceptChangesTour } from './click-reveal-tour';

	const originalClause = 'For the avoidance of doubt, the Customer shall not receive payment from any third party for services provided by the Professional.';
	const revisedClause = 'The Customer may bill its own clients in the ordinary course of business without this being treated as resale or subcontracting.';
</script>

<FeatureIllustration
	label="A rep applies a preapproved change with one click, then opens Changes need to be approved to see that Ben’s approval is required. The contract is updated to allow the Customer to bill its own clients without this counting as resale or subcontracting."
	mobileCardHeight={300}
	tour={acceptChangesTour}
>
	{#snippet document({ revealed })}
		<ContractExcerpt>
			<p class="m-0 text-ink-muted">The Customer may use the Professional’s services for its own business, but may not resell or subcontract those services.</p>
			<p class="m-0 text-ink-muted">
				{#if revealed}
					<del class="text-ink-muted opacity-65">{originalClause}</del> <ins class="box-decoration-clone rounded-[3px] bg-success/[28%] py-px text-inherit no-underline">{revisedClause}</ins>
				{:else}
					{originalClause}
				{/if}
			</p>
		</ContractExcerpt>
	{/snippet}
	{#snippet card({ revealed, expanded, progress })}
		<aside class="illustration-card rounded-2xl border border-line bg-surface p-4 shadow-[0_8px_24px_-20px_rgb(32_33_36/18%)]">
			<div class="flex items-center gap-1.5 rounded-xl bg-canvas px-3 py-2.5 leading-[1.3] text-ink">
				<span>Preferred concession</span>
				<CaretDownIcon size={14} weight="bold" class="ml-auto shrink-0 opacity-25 [transform:rotate(180deg)]" />
			</div>
			<div class="mt-2 mb-1 px-1">
				<p class="m-0 text-ink-muted">Clarify that your team can bill its own clients without this counting as resale or subcontracting.{' '}
					<button type="button" class={['border-0 border-b border-dotted border-current bg-transparent p-0 font-[inherit] whitespace-nowrap', revealed ? 'text-danger' : 'text-[#2563eb]']} data-illustration-target>
						{revealed ? 'Remove concession' : 'Apply concession'}
					</button>
				</p>
			</div>
			<div class="mt-3 flex items-center gap-1.5 rounded-xl bg-canvas px-3 py-2.5 leading-[1.3] text-ink" data-illustration-target="dropdown">
				<span>Changes need to be approved</span>
				<CaretDownIcon size={14} weight="bold" class={['ml-auto shrink-0 opacity-25', expanded && '[transform:rotate(180deg)]']} />
			</div>
			{#if expanded}
				<div class="mt-2 mb-1 px-1" style:opacity={progress}>
					<p class="m-0 text-ink-muted">Requires Ben’s approval.</p>
				</div>
			{/if}
		</aside>
	{/snippet}
</FeatureIllustration>
