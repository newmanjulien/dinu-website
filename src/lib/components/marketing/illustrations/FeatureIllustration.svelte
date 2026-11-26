<script lang="ts">
	import { onMount, untrack, type Snippet } from 'svelte';
	import GuidedCursor from '../../animation/GuidedCursor.svelte';
	import { createGuidedTour } from '../../animation/tour-player.svelte';
	import { motionTiming, type CursorFrame } from '../../animation/tour-model';
	import { observeLayout } from '$lib/utils/layout-observer';
	import { motionDuration, type IllustrationState, type IllustrationStep, type IllustrationTarget } from './click-reveal-tour';

	let { label, document: documentContent, card, actions, documentPosition = 'middle', mobileCardHeight = 220, tour }: {
		label: string;
		document: Snippet<[IllustrationState]>;
		card?: Snippet<[IllustrationState]>;
		actions?: Snippet<[IllustrationState]>;
		documentPosition?: 'middle' | 'ending';
		mobileCardHeight?: number;
		tour: readonly IllustrationStep[];
	} = $props();

	let dispose = () => {};
	let refreshLayout = () => {};
	const steps = untrack(() => tour);
	const playback = createGuidedTour(steps, {
		getMotionEnd: motionDuration, onComplete: () => dispose()
	});
	let frame: HTMLDivElement;
	// Render the completed illustration on the server and before lazy playback starts.
	let scene = $state.raw<IllustrationState>({ revealed: true, expanded: steps.at(-1)?.state.expanded ?? false, progress: 1 });
	let cursor = $state.raw<CursorFrame>({ x: 0, y: 0, opacity: 0, ringOpacity: 0, ringScale: .45, scale: 1 });
	const targets = new Map<IllustrationTarget, { x: number; y: number }>();
	let clickAnchor: { name: IllustrationTarget; x: number; y: number } | undefined;
	let currentStep: IllustrationStep | undefined;
	let movementOrigin = { x: 0, y: 0 };
	let reducedScene = false;
	let awaitingLayout = false;
	const progress = (elapsed: number, duration = 0) => duration > 0 ? Math.min(1, elapsed / duration) : 1;
	const ease = (value: number) => value * value * (3 - 2 * value);

	function apply(step: IllustrationStep, elapsed: number, reduced: boolean) {
		const revealed = step.state.revealed;
		const expanded = step.state.expanded ?? false;
		const revealProgress = revealed ? reduced ? 1 : ease(progress(elapsed, step.motion?.reveal)) : 0;
		if (scene.revealed !== revealed || scene.expanded !== expanded || scene.progress !== revealProgress) scene = { revealed, expanded, progress: revealProgress };
		// Keep normal-playback geometry parked while presenting the completed scene.
		if (reduced) {
			reducedScene = true;
			cursor = { ...cursor, opacity: 0, ringOpacity: 0, ringScale: .45 };
			return;
		}
		if (reducedScene) {
			reducedScene = false;
			awaitingLayout = true;
			playback.setReady(false);
			refreshLayout();
		}
		if (awaitingLayout) return;
		if (currentStep !== step) {
			// Capture the displayed position once, before releasing the previous click.
			if (step.cursor?.move) {
				movementOrigin = { x: cursor.x, y: cursor.y };
				clickAnchor = undefined;
			}
			currentStep = step;
		}
		const name = step.cursor && step.cursor.target !== 'origin' ? step.cursor.target : clickAnchor?.name ?? 'target';
		const target = targets.get(name) ?? { x: 0, y: 0 };
		if (clickAnchor && clickAnchor.name !== name) clickAnchor = undefined;
		if (step.cursor?.mode === 'clicking') clickAnchor ??= { name, ...target };
		const destination = clickAnchor ?? target;
		const primary = targets.get('target') ?? target;
		let position = destination;
		if (step.cursor?.target === 'origin') position = { x: primary.x + 52, y: primary.y + 64 };
		else if (step.cursor?.move) {
			const move = ease(progress(elapsed, step.cursor.move));
			position = {
				x: movementOrigin.x + (destination.x - movementOrigin.x) * move,
				y: movementOrigin.y + (destination.y - movementOrigin.y) * move
			};
		}
		const clicking = step.cursor?.mode === 'clicking';
		const click = clicking ? progress(elapsed, motionTiming.click) : 0;
		cursor = {
			x: position.x, y: position.y,
			opacity: step.cursor ? progress(elapsed, step.cursor.fade) : step.motion?.cursorOpacity ? 1 - progress(elapsed, step.motion.cursorOpacity) : 0,
			ringOpacity: clicking ? Math.sin(click * Math.PI) : 0,
			ringScale: clicking ? .45 + .8 * ease(click) : .45,
			scale: 1
		};
		if (!step.cursor && cursor.opacity === 0) clickAnchor = undefined;
	}

	onMount(() => {
		let started = false;
		let destroyed = false;
		function start() {
			if (started || destroyed) return;
			started = true;
			const clickTargets = new Map<IllustrationTarget, HTMLElement>();
			for (const element of frame.querySelectorAll<HTMLElement>('[data-illustration-target]')) {
				clickTargets.set((element.dataset.illustrationTarget || 'target') as IllustrationTarget, element);
			}
			for (const step of steps) {
				const name = step.cursor?.target;
				if (name && name !== 'origin' && !clickTargets.has(name)) throw new Error(`A feature illustration requires a stable ${name} data-illustration-target element.`);
			}
			playback.setReady(false);
			const measured = new Map<IllustrationTarget, { width: number; height: number; x: number; y: number; label: string | null }>();
			let invalidatedWhileReduced = false;
			const layout = observeLayout([frame, ...clickTargets.values(), ...frame.querySelectorAll('.illustration-card')], (cause) => {
				const bounds = frame.getBoundingClientRect();
				invalidatedWhileReduced ||= playback.reducedMotion && (cause.fonts || cause.viewport);
				for (const [name, element] of clickTargets) {
					const text = element.getBoundingClientRect();
					const target = { x: text.left - bounds.left - frame.clientLeft + text.width / 2, y: text.top - bounds.top - frame.clientTop + text.height / 2 };
					targets.set(name, target);
					if (playback.reducedMotion) continue;
					const previous = measured.get(name);
					const resized = !previous || bounds.width !== previous.width || bounds.height !== previous.height;
					const moved = !previous || target.x !== previous.x || target.y !== previous.y;
					const labelOnly = previous && previous.label !== element.textContent && !resized && !cause.fonts && !cause.viewport;
					// Live coordinates always update. Only the click snapshot ignores the action's label swap.
					if (clickAnchor?.name === name && (invalidatedWhileReduced || resized || cause.fonts || cause.viewport || moved && !labelOnly)) clickAnchor = { name, ...target };
					measured.set(name, { width: bounds.width, height: bounds.height, ...target, label: element.textContent });
				}
				if (!playback.reducedMotion) invalidatedWhileReduced = false;
				awaitingLayout = false;
				playback.setReady(true);
			}, () => apply(playback.step, playback.elapsed, playback.reducedMotion));
			refreshLayout = layout.refresh;
			const unsubscribe = playback.onFrame(apply);
			const stop = playback.start(frame);
			dispose = () => { dispose = refreshLayout = () => {}; unsubscribe(); layout.destroy(); stop(); };
		}
		if (typeof IntersectionObserver === 'undefined') {
			start();
			return () => { destroyed = true; dispose(); };
		}
		const observer = new IntersectionObserver((entries) => {
			if (entries.some((entry) => entry.isIntersecting)) { observer.disconnect(); start(); }
		}, { rootMargin: '600px' });
		observer.observe(frame);
		return () => { destroyed = true; observer.disconnect(); dispose(); };
	});
</script>

<div class="
	@container/illustration relative overflow-hidden rounded-xl border border-line bg-canvas font-body text-[14px]
	font-book leading-[1.5] text-ink text-left shadow-feature select-none [--color-accent:var(--color-brand)]
" style:--mobile-card-height={`${mobileCardHeight}px`} bind:this={frame} role="img" aria-label={label}>
	<div class={[`
		grid items-center gap-5 p-[var(--illustration-padding)] pointer-events-none [--illustration-padding:20px]
		[--paper-padding:20px] [zoom:0.9481665] grid-rows-[400px] @max-[640px]/illustration:gap-4
		@max-[640px]/illustration:[--illustration-padding:12px] @max-[640px]/illustration:[--paper-padding:18px]
		@max-[640px]/illustration:[zoom:1]
	`, card ? `
		grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] @max-[640px]/illustration:grid-cols-[minmax(0,1fr)]
		@max-[640px]/illustration:grid-rows-[480px_var(--mobile-card-height)]
	` : 'grid-cols-[minmax(0,1fr)] @max-[640px]/illustration:grid-rows-[480px]']} aria-hidden="true" inert>
		<div class={['flex min-h-0 min-w-0 flex-col self-stretch', documentPosition === 'middle' && '[clip-path:inset(calc(-1*var(--illustration-padding))_0)]', !card && 'w-full max-w-[680px] justify-self-center']}>
			<article class={['flex min-h-0 flex-1 border border-line bg-surface px-[var(--paper-padding)]', documentPosition === 'middle' ? 'my-[calc(-2*var(--illustration-padding))] py-0' : 'mt-[calc(-2*var(--illustration-padding))] flex-col justify-end py-[var(--paper-padding)]']}>
				<div class={['min-h-0 min-w-0 [&>p+p]:mt-2', documentPosition === 'ending' ? 'flex-none' : 'flex-1']}>{@render documentContent(scene)}</div>
			</article>
			{#if actions}<div class="mt-4 shrink-0">{@render actions(scene)}</div>{/if}
		</div>
		{#if card}<div class="grid min-h-0 min-w-0 items-center self-stretch @max-[640px]/illustration:items-start">{@render card(scene)}</div>{/if}
	</div>
	<GuidedCursor {cursor} />
</div>
