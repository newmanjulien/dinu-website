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

<div class="feature-illustration" style:--mobile-card-height={`${mobileCardHeight}px`} bind:this={frame} role="img" aria-label={label}>
	<div class="illustration-content" class:without-card={!card} aria-hidden="true" inert>
		<div class="document-slot" class:show-middle={documentPosition === 'middle'}>
			<article class="clause-page" class:show-ending={documentPosition === 'ending'}>
				<div class="document-text">{@render documentContent(scene)}</div>
			</article>
			{#if actions}<div class="document-actions">{@render actions(scene)}</div>{/if}
		</div>
		{#if card}<div class="card-slot">{@render card(scene)}</div>{/if}
	</div>
	<GuidedCursor {cursor} />
</div>

<style>
	.feature-illustration {
		--color-accent: var(--color-brand);
		container-type: inline-size;
		position: relative;
		overflow: hidden;
		border: 1px solid var(--color-line);
		border-radius: 12px;
		background: var(--color-canvas);
		box-shadow: var(--shadow-feature);
		color: var(--color-ink);
		font-family: var(--font-body);
		font-size: 14px;
		font-weight: 350;
		line-height: 1.5;
		text-align: left;
		user-select: none;
	}
	.illustration-content {
		--illustration-padding: 20px;
		--paper-padding: 20px;
		zoom: .9481665;
		display: grid;
		grid-template-columns: minmax(0, 1.65fr) minmax(0, 1fr);
		grid-template-rows: 400px;
		align-items: center;
		gap: 20px;
		padding: var(--illustration-padding);
		pointer-events: none;
	}
	.illustration-content.without-card { grid-template-columns: minmax(0, 1fr); }
	.document-slot { display: flex; flex-direction: column; align-self: stretch; min-width: 0; min-height: 0; }
	.document-slot.show-middle { clip-path: inset(calc(-1 * var(--illustration-padding)) 0); }
	.without-card .document-slot { width: 100%; max-width: 680px; justify-self: center; }
	.document-actions { flex-shrink: 0; margin-top: 16px; }
	.clause-page {
		display: flex;
		flex: 1;
		min-height: 0;
		padding: var(--paper-padding);
		border: 1px solid var(--color-line);
		background: var(--color-surface);
	}
	.document-text { flex: 1; min-width: 0; min-height: 0; }
	.show-middle .clause-page {
		margin-block: calc(-2 * var(--illustration-padding));
		padding-block: 0;
	}
	.clause-page.show-ending {
		margin-top: calc(-2 * var(--illustration-padding));
		flex-direction: column;
		justify-content: flex-end;
	}
	.show-ending .document-text { flex: 0 0 auto; }
	.card-slot { display: grid; align-self: stretch; align-items: center; min-width: 0; min-height: 0; }
	.illustration-content :global(p) { margin: 0; color: var(--color-ink-muted); }
	.illustration-content :global(p + p) { margin-top: 8px; }
	.document-text :global(del) { color: var(--color-ink-muted); opacity: .65; }
	.document-text :global(mark), .document-text :global(ins) {
		padding: 1px 0;
		border-radius: 3px;
		background: color-mix(in srgb, var(--color-success) var(--selection-tint, 28%), transparent);
		color: inherit;
		text-decoration: none;
		box-decoration-break: clone;
		-webkit-box-decoration-break: clone;
	}
	.card-slot > :global(.illustration-card) {
		padding: 16px;
		border: 1px solid var(--color-line);
		border-radius: 16px;
		background: var(--color-surface);
		box-shadow: 0 8px 24px -20px rgb(32 33 36 / 18%);
	}
	.card-slot :global(.card-heading) {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 10px 12px;
		border-radius: 12px;
		background: var(--color-canvas);
		color: var(--color-ink);
		line-height: 1.3;
	}
	.card-slot :global(.card-heading .caret) { flex-shrink: 0; margin-left: auto; opacity: .25; }
	.card-slot :global(.card-heading .caret.expanded) { transform: rotate(180deg); }
	.card-slot :global(.card-body) { margin: 8px 0 4px; padding: 0 4px; }
	.card-slot :global(.inline-action) {
		padding: 0;
		border: 0;
		border-bottom: 1px dotted currentColor;
		background: transparent;
		color: #2563eb;
		font: inherit;
		white-space: nowrap;
	}
	.card-slot :global(.inline-action.applied) { color: var(--color-danger); }
	@container (max-width: 639px) {
		.illustration-content { --illustration-padding: 12px; --paper-padding: 18px; zoom: 1; grid-template-columns: minmax(0, 1fr); grid-template-rows: 480px var(--mobile-card-height); gap: 16px; }
		.illustration-content.without-card { grid-template-rows: 480px; }
		.card-slot { align-items: start; }
	}
</style>
