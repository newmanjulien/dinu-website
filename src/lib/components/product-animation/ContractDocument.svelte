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
			class:highlight={Boolean(run.target) && !run.revision}
			class:selected={!run.revision && run.target === selectedTrigger && Boolean(selectedTrigger)}
			class:hovered={!run.revision && run.target === hoveredTrigger && Boolean(hoveredTrigger)}
			class:added={run.revision === 'added'}
			class:removed={run.revision === 'removed'}
		>{run.text}</span>{:else}{run.text}{/if}{/each}{/snippet}

{#snippet renderBlock(entry: PageBlock)}
	{@const block = entry.block}
	{#if block.kind === 'heading'}
		<svelte:element this={`h${block.level}`} data-block={entry.id} class="paper-heading" class:main-heading={block.level === 1}>{@render content(block)}</svelte:element>
	{:else if block.kind === 'paragraph'}
		<p data-block={entry.id} class="paper-paragraph" class:continues={entry.continues}>{@render content(block)}</p>
	{:else}
		<table data-block={entry.id} class:signature={block.variant === 'signature'}>
			<thead>{#each block.rows.slice(0, block.headerRowCount) as row}<tr>{#each row as cell}<th>{cell}</th>{/each}</tr>{/each}</thead>
			<tbody>{#each block.rows.slice(block.headerRowCount) as row}<tr>{#each row as cell}<td>{cell}</td>{/each}</tr>{/each}</tbody>
		</table>
	{/if}
{/snippet}

<div class="contract-paper" bind:this={paper}>
	{#each pages as page, index}
		<article class="paper-page" class:first-page={index === 0}>
			<div class="page-content">
				{#each page as entry (entry.key)}{@render renderBlock(entry)}{/each}
			</div>
			<span class="page-number">{index + 1}</span>
		</article>
	{/each}
</div>

<div class="pagination-measurement" aria-hidden="true">
	<article class="paper-page" bind:this={measurementSheet}><div class="page-content"></div></article>
</div>

<style>
	.contract-paper { width: 816px; display: flex; flex-direction: column; gap: 16px; }
	.paper-page { position: relative; min-height: 1056px; padding: 96px 96px 88px; background: white; border: 1px solid var(--color-line); }
	.paper-page.first-page { padding-top: 116px; }
	.page-content { color: #171717; display: flow-root; }
	.page-content > :last-child { margin-bottom: 0; }
	.page-content > .paper-heading:first-child { margin-top: 0; }
	.paper-heading { margin: 34px 0 10px; font-size: 17px; line-height: 1.25; letter-spacing: -.25px; font-weight: bold; }
	.paper-heading.main-heading { margin: 0 0 24px; text-align: center; font-size: 20px; letter-spacing: -.4px; }
	.paper-paragraph { margin: 0 0 20px; text-align: justify; font-size: 15px; line-height: 1.46; }
	.paper-paragraph.continues { margin-bottom: 0; text-align-last: justify; }
	.pagination-measurement { position: absolute; top: 0; left: 0; width: 816px; visibility: hidden; pointer-events: none; }
	/* Revisions retain their own paint; transient clause states only color unchanged text. */
	.highlight, .added, .removed { box-decoration-break: clone; -webkit-box-decoration-break: clone; }
	.highlight { background: var(--document-highlight-trigger); }
	.highlight.hovered { background: var(--document-highlight-trigger-hover); }
	.highlight.selected { background: var(--document-highlight-trigger-selected); }
	.added { background: var(--document-highlight-revision-added); }
	.removed { background: var(--document-highlight-revision-removed); text-decoration: line-through; }
	table { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 14px; line-height: 1.4; margin: 12px 0 24px; }
	th, td { height: 44px; text-align: left; vertical-align: top; overflow-wrap: anywhere; border: .75px solid #babec3; padding: 8px; }
	th { background: var(--color-fill-subtle); }
	table.signature { table-layout: auto; margin: 30px 0; }
	.signature th, .signature td { border: 0; background: none; padding: 9px 12px 9px 0; }
	.page-number { position: absolute; bottom: 32px; right: 48px; color: #a3a3a3; font-size: 15px; }
	:global(.product-animation.is-mobile) .contract-paper { width: 100%; }
	:global(.product-animation.is-mobile) .pagination-measurement { width: 100%; }
	:global(.product-animation.is-mobile) .paper-page { min-height: 540px; padding: 36px 24px 60px; }
	:global(.product-animation.is-mobile) .paper-paragraph { font-size: 14px; line-height: 1.5; text-align: left; }
	:global(.product-animation.is-mobile) .paper-paragraph.continues { text-align-last: auto; }
	:global(.product-animation.is-mobile) .paper-heading { font-size: 16px; }
	:global(.product-animation.is-mobile) .main-heading { font-size: 18px; }
	:global(.product-animation.is-mobile) th, :global(.product-animation.is-mobile) td { font-size: 12px; padding: 5px; }
</style>
