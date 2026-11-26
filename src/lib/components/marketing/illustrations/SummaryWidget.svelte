<script lang="ts">
	import CaretDownIcon from 'phosphor-svelte/lib/CaretDownIcon';
	import FeatureIllustration from './FeatureIllustration.svelte';
	import ContractExcerpt from './ContractExcerpt.svelte';
	import { summaryTour } from './click-reveal-tour';
</script>

<FeatureIllustration
	label="A rep clicks an already-highlighted publicity clause to reveal a plain English explanation, then opens How to negotiate. Listing the customer's name and logo does not permit testimonials, case studies, press releases, or implied endorsement. The rep can offer the preapproved option of requiring written permission first. The animation explains this option without changing the contract."
	mobileCardHeight={320}
	tour={summaryTour}
>
	{#snippet document()}
		<ContractExcerpt clausePosition="middle">
			<p class="m-0 text-ink-muted">
				<mark class="box-decoration-clone rounded-[3px] bg-success/[28%] py-px text-inherit no-underline">Customer permits Provider to display Customer’s <span data-illustration-target>name and logo</span> in a customer list on Provider’s website, following any brand guidelines Customer supplies.</mark>
				This permission does not allow testimonials, case studies, press releases, or an implied endorsement.
			</p>
		</ContractExcerpt>
	{/snippet}
	{#snippet card({ revealed, expanded, progress })}
		<aside class="illustration-card rounded-2xl border border-line bg-surface p-4 shadow-[0_8px_24px_-20px_rgb(32_33_36/18%)]" style:opacity={revealed ? expanded ? 1 : progress : 0}>
			<p class="m-0 text-ink-muted">We can list your name and logo as a customer. That does not permit testimonials, case studies, press releases, or implied endorsement.</p>
			<div class="mt-3 flex items-center gap-1.5 rounded-xl bg-canvas px-3 py-2.5 leading-[1.3] text-ink" data-illustration-target="dropdown">
				<span>How to negotiate</span>
				<CaretDownIcon size={14} weight="bold" class={['ml-auto shrink-0 opacity-25', expanded && '[transform:rotate(180deg)]']} />
			</div>
			{#if expanded}
				<div class="mt-2 mb-1 px-1" style:opacity={progress}>
					<p class="m-0 text-ink-muted">If you need control over public use, we can require your written permission first. This change needs no internal approval, and you can decline permission.</p>
				</div>
			{/if}
		</aside>
	{/snippet}
</FeatureIllustration>
