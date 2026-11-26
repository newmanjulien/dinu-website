<script lang="ts">
	import { onDestroy, tick } from 'svelte';
	import type { ContractStateId, PreparedContract } from './model';
	import { contractBlocks, paginateContract, type ContractPages, type PageBlock } from './paginate-contract';
	let { contract, snapshot, selectedTrigger, hoveredTrigger }: {
		contract: PreparedContract;
		snapshot: PreparedContract['states'][keyof PreparedContract['states']];
		selectedTrigger?: string;
		hoveredTrigger?: string;
	} = $props();
	let paper: HTMLDivElement;
	let measurementSheet: HTMLElement;
	let layout = $state.raw<{ snapshot: typeof snapshot; pages: ContractPages }>();
	const blocks = $derived(contractBlocks(contract, snapshot));
	const pages = $derived(layout?.snapshot === snapshot ? layout.pages : [blocks]);
	const cache = new Map<ContractStateId, ContractPages>();
	let cacheKey = '';
	let version = 0;

	export async function paginate(state: ContractStateId, fontVersion: number): Promise<boolean> {
		const request = ++version;
		const nextSnapshot = contract.states[state];
		const key = `${measurementSheet.clientWidth}:${getComputedStyle(measurementSheet).minHeight}:${fontVersion}`;
		if (key !== cacheKey) { cache.clear(); cacheKey = key; }
		const cached = cache.get(state);
		if (cached) {
			if (layout?.pages === cached && layout.snapshot === nextSnapshot) return false;
			layout = { snapshot: nextSnapshot, pages: cached };
		} else {
			// Render the ordered source once so measurement uses exactly the same
			// markup, typography, highlights, and redlines as the visible sheets.
			layout = undefined;
			await tick();
			if (request !== version || snapshot !== nextSnapshot) return false;
			const sources = new Map(Array.from(paper.querySelectorAll<HTMLElement>('[data-block]'), (node) => [node.dataset.block!, node]));
			const result = paginateContract(blocks, contract.pageBreaks, sources, measurementSheet);
			cache.set(state, result);
			layout = { snapshot: nextSnapshot, pages: result };
		}
		await tick();
		return request === version;
	}
	onDestroy(() => { version++; cache.clear(); });
</script>

{#snippet content(block: Exclude<PageBlock['block'], { kind: 'table' }>)}{#each block.runs as run}{#if run.target || run.revision}<span
	data-highlight={run.target}
	data-revision={run.revision}
	class={[
		'box-decoration-clone',
		run.revision === 'added' ? 'bg-(--document-highlight-revision-added)' : run.revision === 'removed' ? 'bg-(--document-highlight-revision-removed) line-through' : [
			run.target === selectedTrigger && selectedTrigger ? 'bg-(--document-highlight-trigger-selected)' : run.target === hoveredTrigger && hoveredTrigger ? 'bg-(--document-highlight-trigger-hover)' : 'bg-(--document-highlight-trigger)'
		]
	]}
>{run.text}</span>{:else}{run.text}{/if}{/each}{/snippet}

{#snippet tableCell(cell: string, heading: boolean, signature: boolean)}
	<svelte:element
		this={heading ? 'th' : 'td'}
		class={[
			'h-11 text-left align-top wrap-anywhere group-data-[mobile=true]/animation:p-[5px] group-data-[mobile=true]/animation:text-[12px]',
			signature ? 'border-0 bg-transparent py-[9px] pr-3 pl-0' : ['border-[0.75px] border-[#babec3] p-2', heading && 'bg-(--color-fill-subtle)']
		]}
	>{cell}</svelte:element>
{/snippet}

{#snippet renderBlock(entry: PageBlock)}
	{@const block = entry.block}
	{#if block.kind === 'heading'}
		<svelte:element
			this={`h${block.level}`}
			data-block={entry.id}
			class={[
				'leading-[1.25] font-bold first:mt-0',
				block.level === 1 ? 'mb-6 text-center text-[20px] tracking-[-0.4px] group-data-[mobile=true]/animation:text-[18px]' : 'mt-[34px] mb-2.5 text-[17px] tracking-[-0.25px] group-data-[mobile=true]/animation:text-[16px]'
			]}
		>{@render content(block)}</svelte:element>
	{:else if block.kind === 'paragraph'}
		<p
			data-block={entry.id}
			data-continues={entry.continues}
			class="
				mb-5 text-justify text-[15px] leading-[1.46] data-[continues=true]:mb-0
				data-[continues=true]:[text-align-last:justify] group-data-[mobile=true]/animation:text-left
				group-data-[mobile=true]/animation:text-[14px] group-data-[mobile=true]/animation:leading-[1.5]
				group-data-[mobile=true]/animation:data-[continues=true]:[text-align-last:auto]
			"
		>{@render content(block)}</p>
	{:else}
		<table data-block={entry.id} class={['w-full border-collapse text-[14px] leading-[1.4]', block.variant === 'signature' ? 'my-[30px] table-auto' : 'mt-3 mb-6 table-fixed']}>
			<thead>{#each block.rows.slice(0, block.headerRowCount) as row}<tr>{#each row as cell}{@render tableCell(cell, true, block.variant === 'signature')}{/each}</tr>{/each}</thead>
			<tbody>{#each block.rows.slice(block.headerRowCount) as row}<tr>{#each row as cell}{@render tableCell(cell, false, block.variant === 'signature')}{/each}</tr>{/each}</tbody>
		</table>
	{/if}
{/snippet}

<div class="contract-paper flex w-[816px] flex-col gap-4 group-data-[mobile=true]/animation:w-full" bind:this={paper}>
	{#each pages as page, index}
		<article data-first-page={index === 0} class="
			relative min-h-[1056px] border border-line bg-white px-24 pb-[88px]
			group-data-[mobile=true]/animation:min-h-[540px] group-data-[mobile=true]/animation:px-6
			group-data-[mobile=true]/animation:pt-9 group-data-[mobile=true]/animation:pb-[60px] pt-24
			data-[first-page=true]:pt-[116px] group-data-[mobile=true]/animation:data-[first-page=true]:pt-9
		">
			<div class="page-content flow-root text-[#171717] [&>:last-child]:mb-0">
				{#each page as entry (entry.key)}{@render renderBlock(entry)}{/each}
			</div>
			<span class="absolute right-12 bottom-8 text-[15px] text-[#a3a3a3]">{index + 1}</span>
		</article>
	{/each}
</div>

<div class="pointer-events-none invisible absolute top-0 left-0 w-[816px] group-data-[mobile=true]/animation:w-full" aria-hidden="true">
	<article class="
		relative min-h-[1056px] border border-line bg-white px-24 pt-24 pb-[88px]
		group-data-[mobile=true]/animation:min-h-[540px] group-data-[mobile=true]/animation:px-6
		group-data-[mobile=true]/animation:pt-9 group-data-[mobile=true]/animation:pb-[60px]
		data-[first-page=true]:pt-[116px] group-data-[mobile=true]/animation:data-[first-page=true]:pt-9
	" bind:this={measurementSheet}>
		<div class="page-content flow-root text-[#171717] [&>:last-child]:mb-0"></div>
	</article>
</div>
