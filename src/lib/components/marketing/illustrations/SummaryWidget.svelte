<script lang="ts">
	import CaretDownIcon from 'phosphor-svelte/lib/CaretDownIcon';
	import FeatureIllustration from './FeatureIllustration.svelte';
	import ContractExcerpt from './ContractExcerpt.svelte';
	import { summaryTour } from './click-reveal-tour';
</script>

<FeatureIllustration
	label="A rep clicks a clause to reveal a plain English explanation, then opens How to negotiate to address a buyer’s concern. The resale clause prevents subcontracting the Professional as a staffing arrangement, while allowing buyers to bill their own clients for their work."
	mobileCardHeight={320}
	tour={summaryTour}
>
	{#snippet document({ revealed, expanded, progress })}
		<ContractExcerpt clausePosition="middle">
			<p>The Professional shall keep the Customer informed of progress and promptly raise any issue that may affect the agreed scope, delivery dates, or service quality.</p>
			<p>
				<mark style:--selection-tint={`${revealed ? 28 * (expanded ? 1 : progress) : 0}%`}>The Customer may use the Professional’s services for its own business, but may not <span data-illustration-target>resell</span> or subcontract those services.</mark>
			</p>
			<p>Each party shall appoint a primary contact to coordinate the services and respond to reasonable requests for information. The parties shall review progress at agreed intervals and record any decisions affecting the work. Neither party may make commitments on the other’s behalf without prior written consent.</p>
		</ContractExcerpt>
	{/snippet}
	{#snippet card({ revealed, expanded, progress })}
		<aside class="illustration-card" style:opacity={revealed ? expanded ? 1 : progress : 0}>
			<p>Your team can use the services internally, but can’t resell or subcontract them.</p>
			<div class="card-heading" data-illustration-target="dropdown">
				<span>How to negotiate</span>
				<CaretDownIcon size={14} weight="bold" class={`caret ${expanded ? 'expanded' : ''}`} />
			</div>
			{#if expanded}
				<div class="card-body" style:opacity={progress}>
					<p>If buyers worry about billing their own clients, explain that this only prevents subcontracting the Professional as a staffing arrangement. Billing clients for their own work is unaffected.</p>
				</div>
			{/if}
		</aside>
	{/snippet}
</FeatureIllustration>

<style>
	.card-heading { margin-top: 12px; }
</style>
