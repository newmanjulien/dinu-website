<script lang="ts">
	import CaretDownIcon from 'phosphor-svelte/lib/CaretDownIcon';
	import InfoIcon from 'phosphor-svelte/lib/InfoIcon';
	import PlaybookText from './PlaybookText.svelte';
	import type { PreparedPanel } from './model';
	let { panel, openSection, selected }: { panel: PreparedPanel; openSection?: string | null; selected?: string } = $props();
</script>

<aside class="
	max-h-[calc(var(--stage-height)-48px)] w-full overflow-hidden rounded-[14px] border border-line bg-white p-3.5
	text-[15px] leading-[1.45] text-ink-muted
	group-data-[mobile=true]/animation:max-h-[calc(var(--stage-height)-140px)]
	group-data-[mobile=true]/animation:p-3 group-data-[mobile=true]/animation:text-[14px]
	group-data-[mobile=true]/animation:shadow-[0_8px_24px_rgb(32_33_36/12%)]
" data-guidance-panel>
	<div class="flex flex-col gap-3">
		<div class="flex flex-col gap-3"><PlaybookText text={panel.summary} /></div>
		{#if panel.sections.length}
			<div class="flex flex-col gap-2">
				{#each panel.sections as section}
					<div>
						<div class={['flex items-center gap-1.5 rounded-xl px-3 py-2.5 leading-[1.3]', section.key === 'rare' ? 'bg-[var(--color-danger-surface)] text-danger' : 'bg-canvas text-ink']} data-section={section.key}>
							<span>{section.label}</span>
							{#if section.key === 'preferred' && panel.important}<InfoIcon size={18} class="text-accent" />{/if}
							<CaretDownIcon size={14} weight="bold" class={['ml-auto shrink-0 opacity-25', openSection === section.key && '[transform:rotate(180deg)]']} />
						</div>
						{#if openSection === section.key}
							<div class="mt-2 mb-1 flex flex-col gap-3 px-1" data-section-body={section.key}>
								{#if section.text}<PlaybookText text={section.text} />{/if}
								{#each section.concessions ?? [] as concession}
									<p class="m-0">{concession.description}{' '}<span class={['border-b border-dotted', selected === concession.id ? 'border-danger text-danger' : 'border-accent text-accent']} data-concession-id={concession.id}>{selected === concession.id ? 'Remove concession' : 'Apply concession'}</span></p>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</aside>
