<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import data from './data/contract.json';
	import ContractDocument from './ContractDocument.svelte';
	import GuidancePanel from './GuidancePanel.svelte';
	import ContractActions from './ContractActions.svelte';
	import GuidedCursor from '../animation/GuidedCursor.svelte';
	import { createGuidedTour } from '../animation/tour-player.svelte';
	import { createSceneGeometry } from './scene-geometry';
	import { heroTour, heroCompletedStep } from './hero-tour';
	import type { CursorFrame } from '../animation/tour-model';
	import { motionDuration, type ContractStateId, type PreparedContract } from './model';

	let { label }: { label: string } = $props();
	const contract = data as PreparedContract;
	const playback = createGuidedTour(heroTour, { loop: true, completedStep: heroCompletedStep, getMotionEnd: motionDuration });
	playback.setReady(false);
	const step = $derived(playback.step);
	const snapshot = $derived(contract.states[step.state.contract]);
	const panel = $derived(contract.panels.find((panel) => panel.id === (step.state.box?.clause ?? step.state.clause))!);
	let frameElement: HTMLDivElement;
	let stageElement: HTMLDivElement;
	let viewportElement: HTMLDivElement;
	let columnElement: HTMLDivElement;
	let railElement: HTMLDivElement;
	let documentRenderer: { paginate(state: ContractStateId, fontVersion: number): Promise<boolean> };
	let mobile = $state(false);
	let cursor = $state.raw<CursorFrame>({ x: 0, y: 0, opacity: 0, ringOpacity: 0, ringScale: .45, scale: 1 });
	let geometry = $state.raw<ReturnType<typeof createSceneGeometry>>();
	const panelVisible = $derived(Boolean(step.state.box) && !(mobile && step.state.viewport === 'revision'));
	const selectedTrigger = $derived(panelVisible ? panel.triggerId : undefined);
	const hoveredTrigger = $derived(step.state.hovered ? contract.panels.find((panel) => panel.id === step.state.clause)?.triggerId : undefined);
	$effect(() => {
		const beat = step, reduced = playback.reducedMotion, coordinator = geometry;
		if (coordinator) untrack(() => void coordinator.prepare(beat, reduced));
	});
	onMount(() => {
		const coordinator = createSceneGeometry({ frame: frameElement, stage: stageElement, viewport: viewportElement, column: columnElement, rail: railElement }, contract, playback,
			(nextMobile, nextCursor) => { mobile = nextMobile; cursor = nextCursor; },
			(state, fontVersion) => documentRenderer.paginate(state, fontVersion));
		geometry = coordinator;
		const unsubscribe = playback.onFrame(coordinator.apply);
		const stop = playback.start(frameElement);
		return () => { unsubscribe(); coordinator.destroy(); stop(); };
	});
</script>

<div class="
	product-animation group/animation relative h-full w-full overflow-hidden bg-canvas
	font-[Arial,Helvetica,sans-serif] text-[16px] leading-[1.5] text-ink text-left select-none
	[--color-canvas:#f1f3f4] [--color-ink:#202124] [--color-ink-muted:#5f6368] [--color-line:#dadce0]
	[--color-line-strong:#9aa0a6] [--color-control-fill:#e3e6e8] [--color-fill-subtle:#e8eaed]
	[--color-accent:#2563eb] [--color-accent-hover:#1d4ed8] [--color-danger:#b42318]
	[--color-danger-surface:#fff1f0] [--document-highlight-trigger:rgba(34,197,94,0.16)]
	[--document-highlight-trigger-hover:rgba(34,197,94,0.22)]
	[--document-highlight-trigger-selected:rgba(34,197,94,0.28)] [--document-highlight-revision-added:#dcf1b9]
	[--document-highlight-revision-removed:#e5e7eb]
" data-mobile={mobile} bind:this={frameElement} role="img" aria-label={label}>
	<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" inert>
		<div class="absolute top-0 left-0 h-[860px] w-[1440px] origin-top-left" bind:this={stageElement}>
			<div class="absolute inset-0 overflow-hidden [overflow-anchor:none]" bind:this={viewportElement}>
				<div class="ml-20 w-[816px] py-6 [transform:translateX(232px)] group-data-[mobile=true]/animation:ml-3 group-data-[mobile=true]/animation:w-[calc(100%-24px)]" bind:this={columnElement}>
					<ContractDocument bind:this={documentRenderer} {contract} {snapshot} {selectedTrigger} {hoveredTrigger} />
					<ContractActions approvalCount={snapshot.approvalCount} requested={step.state.approvalRequested} highlighted={step.cursor?.target.kind === 'approval'} />
				</div>
				<div class="invisible absolute left-[920px] w-[440px] opacity-0 group-data-[mobile=true]/animation:left-6 group-data-[mobile=true]/animation:w-[calc(100%-48px)]" bind:this={railElement}>
					{#key panel.id}<GuidancePanel {panel} openSection={step.state.box?.section} selected={snapshot.concessions[panel.id]} />{/key}
				</div>
			</div>
			<GuidedCursor {cursor} />
		</div>
	</div>
</div>
