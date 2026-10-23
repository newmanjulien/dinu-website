import type { PreparedBlock, PreparedContract, PreparedRun } from './model';

export interface PageBlock {
	id: string;
	key: string;
	block: PreparedBlock;
	continues?: boolean;
}
export type ContractPages = PageBlock[][];

export function contractBlocks(contract: PreparedContract, snapshot: PreparedContract['states'][keyof PreparedContract['states']]): PageBlock[] {
	return contract.blockOrder.map((id) => ({ id, key: id, block: snapshot.patches[id] ?? contract.blocks[id]! }))
		.filter(({ block }) => block.kind !== 'paragraph' || block.runs.length > 0);
}

function sliceRuns(runs: PreparedRun[], start: number, end: number): PreparedRun[] {
	let offset = 0;
	return runs.flatMap((run) => {
		const text = run.text.slice(Math.max(0, start - offset), Math.max(0, end - offset));
		offset += run.text.length;
		return text ? [{ ...run, text }] : [];
	});
}

/** Measure clones in an offscreen sheet with the same styles and width as the document. */
export function paginateContract(blocks: PageBlock[], pageBreaks: string[], sources: Map<string, HTMLElement>, sheet: HTMLElement): ContractPages {
	const content = sheet.querySelector<HTMLElement>('.page-content')!;
	const breaks = new Set(pageBreaks);
	const pages: ContractPages = [[]];
	let page = pages[0]!;
	let headings: PageBlock[] = [];
	let capacity = 0, scale = 1;

	function clearSheet() {
		content.replaceChildren();
		sheet.classList.toggle('first-page', pages.length === 1);
		const style = getComputedStyle(sheet);
		capacity = parseFloat(style.minHeight) - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)
			- parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth);
		scale = sheet.getBoundingClientRect().width / parseFloat(style.width);
	}
	function nextPage() {
		if (page.length) { page = []; pages.push(page); }
		clearSheet();
	}
	function clone(entry: PageBlock) {
		return sources.get(entry.id)!.cloneNode(true) as HTMLElement;
	}
	function fits(node: HTMLElement, limit = capacity) {
		return (node.getBoundingClientRect().bottom - content.getBoundingClientRect().top) / scale <= limit + .1;
	}
	function lineCount(node: HTMLElement) {
		return Math.round(node.getBoundingClientRect().height / scale / parseFloat(getComputedStyle(node).lineHeight));
	}
	function appendHeadings() {
		const nodes = headings.map(clone);
		content.append(...nodes);
		return nodes;
	}
	function commitHeadings() { page.push(...headings); headings = []; }
	function paragraph(source: HTMLElement, start: number, end: number, length: number) {
		const node = source.cloneNode(true) as HTMLElement;
		const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
		let offset = 0;
		while (walker.nextNode()) {
			const text = walker.currentNode as Text;
			const original = text.data;
			text.data = original.slice(Math.max(0, start - offset), Math.max(0, end - offset));
			offset += original.length;
		}
		node.classList.toggle('continues', end < length);
		return node;
	}

	clearSheet();
	for (const entry of blocks) {
		if (breaks.has(entry.id)) {
			content.append(...headings.map(clone));
			commitHeadings();
			nextPage();
		}
		const block = entry.block;
		if (block.kind === 'heading') { headings.push(entry); continue; }
		if (block.kind === 'table') {
			const headingNodes = appendHeadings(), node = clone(entry);
			content.append(node);
			if (!fits(node) && page.length) {
				node.remove(); headingNodes.forEach((heading) => heading.remove());
				nextPage(); appendHeadings(); content.append(node);
			}
			commitHeadings(); page.push(entry);
			continue;
		}

		const text = block.runs.map((run) => run.text).join('');
		const ends = Array.from(text.matchAll(/\S+\s*/gu), (match) => match.index + match[0].length);
		const source = sources.get(entry.id)!;
		let start = 0;
		while (start < text.length) {
			const headingNodes = appendHeadings();
			let node = paragraph(source, start, text.length, text.length);
			content.append(node);
			let end = text.length;
			if (!fits(node)) {
				node.remove();
				const cuts = ends.filter((end) => end > start && end < text.length);
				// Find the last word that fits. Tighten by a line if the remainder
				// would strand a single line at the top of the following sheet.
				let limit = capacity;
				end = start;
				while (true) {
					let low = 0, high = cuts.length - 1, best = -1;
					while (low <= high) {
						const middle = Math.floor((low + high) / 2);
						const candidate = paragraph(source, start, cuts[middle]!, text.length);
						content.append(candidate);
						if (fits(candidate, limit)) { best = middle; low = middle + 1; }
						else high = middle - 1;
						candidate.remove();
					}
					if (best < 0) break;
					const cut = cuts[best]!;
					const candidate = paragraph(source, start, cut, text.length);
					content.append(candidate);
					const remaining = paragraph(source, cut, text.length, text.length);
					content.append(remaining);
					const orphan = lineCount(candidate) < 2, widow = lineCount(remaining) < 2;
					remaining.remove();
					if (!orphan && !widow) { node = candidate; end = cut; break; }
					const lineHeight = parseFloat(getComputedStyle(candidate).lineHeight);
					candidate.remove();
					if (orphan) break;
					limit -= lineHeight;
				}
				if (end === start) {
					headingNodes.forEach((heading) => heading.remove());
					if (page.length) { nextPage(); continue; }
					// Atomic content taller than a sheet must still remain readable.
					// The prepared contract's headings and tables fit on an empty sheet.
					appendHeadings();
					end = cuts[0] ?? text.length;
					node = paragraph(source, start, end, text.length);
					content.append(node);
				}
			}
			commitHeadings();
			page.push({ id: entry.id, key: `${entry.id}:${start}`, block: { kind: 'paragraph', runs: sliceRuns(block.runs, start, end) },
				continues: end < text.length });
			start = end;
			if (start < text.length) nextPage();
		}
	}
	commitHeadings();
	content.replaceChildren();
	return pages;
}
