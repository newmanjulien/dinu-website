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
			<p>The Customer may use the Professional’s services for its own business, but may not resell or subcontract those services.</p>
			<p>
				{#if revealed}
					<del>{originalClause}</del> <ins>{revisedClause}</ins>
				{:else}
					{originalClause}
				{/if}
			</p>
		</ContractExcerpt>
	{/snippet}
	{#snippet card({ revealed, expanded, progress })}
		<aside class="illustration-card">
			<div class="card-heading">
				<span>Preferred concession</span>
				<CaretDownIcon size={14} weight="bold" class="caret expanded" />
			</div>
			<div class="card-body">
				<p>Clarify that your team can bill its own clients without this counting as resale or subcontracting.{' '}
					<button type="button" class="inline-action" class:applied={revealed} data-illustration-target>
						{revealed ? 'Remove concession' : 'Apply concession'}
					</button>
				</p>
			</div>
			<div class="card-heading approval-heading" data-illustration-target="dropdown">
				<span>Changes need to be approved</span>
				<CaretDownIcon size={14} weight="bold" class={`caret ${expanded ? 'expanded' : ''}`} />
			</div>
			{#if expanded}
				<div class="card-body" style:opacity={progress}>
					<p>Requires Ben’s approval.</p>
				</div>
			{/if}
		</aside>
	{/snippet}
</FeatureIllustration>

<style>
	.approval-heading { margin-top: 12px; }
</style>
