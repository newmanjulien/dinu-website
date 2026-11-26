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
			<p class="m-0 text-ink-muted">The Professional shall keep the Customer informed of progress and promptly raise any issue that may affect the agreed scope, delivery dates, or service quality.</p>
			<p class="m-0 text-ink-muted">
				<mark class="box-decoration-clone rounded-[3px] py-px text-inherit no-underline" style:background-color={`color-mix(in srgb, var(--color-success) ${revealed ? 28 * (expanded ? 1 : progress) : 0}%, transparent)`}>The Customer may use the Professional’s services for its own business, but may not <span data-illustration-target>resell</span> or subcontract those services.</mark>
			</p>
			<p class="m-0 text-ink-muted">Each party shall appoint a primary contact to coordinate the services and respond to reasonable requests for information. The parties shall review progress at agreed intervals and record any decisions affecting the work. Neither party may make commitments on the other’s behalf without prior written consent.</p>
		</ContractExcerpt>
	{/snippet}
	{#snippet card({ revealed, expanded, progress })}
		<aside class="illustration-card rounded-2xl border border-line bg-surface p-4 shadow-[0_8px_24px_-20px_rgb(32_33_36/18%)]" style:opacity={revealed ? expanded ? 1 : progress : 0}>
			<p class="m-0 text-ink-muted">Your team can use the services internally, but can’t resell or subcontract them.</p>
			<div class="mt-3 flex items-center gap-1.5 rounded-xl bg-canvas px-3 py-2.5 leading-[1.3] text-ink" data-illustration-target="dropdown">
				<span>How to negotiate</span>
				<CaretDownIcon size={14} weight="bold" class={['ml-auto shrink-0 opacity-25', expanded && '[transform:rotate(180deg)]']} />
			</div>
			{#if expanded}
				<div class="mt-2 mb-1 px-1" style:opacity={progress}>
					<p class="m-0 text-ink-muted">If buyers worry about billing their own clients, explain that this only prevents subcontracting the Professional as a staffing arrangement. Billing clients for their own work is unaffected.</p>
				</div>
			{/if}
		</aside>
	{/snippet}
</FeatureIllustration>
