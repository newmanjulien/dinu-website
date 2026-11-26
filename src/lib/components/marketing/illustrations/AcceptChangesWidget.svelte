<script lang="ts">
	import CaretDownIcon from 'phosphor-svelte/lib/CaretDownIcon';
	import FeatureIllustration from './FeatureIllustration.svelte';
	import ContractExcerpt from './ContractExcerpt.svelte';
	import { acceptChangesTour } from './click-reveal-tour';
</script>

<FeatureIllustration
	label="A rep applies preapproved net 45 in a software agreement. Redlines change 30 to 45 days in both Section 3 and the Order Form, while annual invoicing stays unchanged. The rep opens Changes need to be approved to see Finance, the approver for quarterly billing. The applied net-45 change needs no approval."
	mobileCardHeight={300}
	tour={acceptChangesTour}
>
	{#snippet document({ revealed })}
		<ContractExcerpt>
			<p class="m-0 text-ink-muted">The annual subscription fee, currency, invoice schedule, and payment period are stated in the Order Form. Provider will invoice at the beginning of each subscription year.</p>
			<p class="m-0 text-ink-muted">
				Customer must pay each invoice within
				{#if revealed}
					<del class="text-ink-muted opacity-65">30</del> <ins class="box-decoration-clone rounded-[3px] bg-success/[28%] py-px text-inherit no-underline">45</ins>
				{:else}
					30
				{/if}
				days after receiving it. Fees exclude applicable sales taxes, which Customer must pay; Provider remains responsible for taxes on its own income.
			</p>
			<p class="m-0 text-ink-muted">
				Order Form — Payment period: Within
				{#if revealed}
					<del class="text-ink-muted opacity-65">30</del> <ins class="box-decoration-clone rounded-[3px] bg-success/[28%] py-px text-inherit no-underline">45</ins>
				{:else}
					30
				{/if}
				days after receipt of each invoice
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
				<p class="m-0 text-ink-muted">Give the customer 45 days after invoice receipt to pay. No approval needed. Keep annual billing and update both payment periods.{' '}
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
					<p class="m-0 text-ink-muted">Finance.</p>
				</div>
			{/if}
		</aside>
	{/snippet}
</FeatureIllustration>
