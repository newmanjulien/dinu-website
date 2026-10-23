import { motionTiming, type GuidedTourStep } from '../../animation/tour-model.ts';

export interface IllustrationState { revealed: boolean; expanded: boolean; progress: number }
export type IllustrationTarget = 'target' | 'dropdown';
export interface IllustrationStep extends GuidedTourStep<string, { revealed: boolean; expanded?: boolean }, 'origin' | IllustrationTarget> {
	motion?: { reveal?: number; cursorOpacity?: number };
}

const before = { revealed: false };
const revealed = { revealed: true };
const expanded = { revealed: true, expanded: true };

/** Reveal dwell is shared; only widgets with a visual reveal need frames during it. */
function opening(revealDuration = 0): readonly IllustrationStep[] {
	return [
		{ phase: 'rest', duration: 700, state: before, cursor: null },
		{ phase: 'enter', duration: motionTiming.cursorFade, state: before, cursor: { target: 'origin', mode: 'idle', fade: motionTiming.cursorFade } },
		{ phase: 'approach', duration: 600, state: before, cursor: { target: 'target', mode: 'idle', move: 600 } },
		{ phase: 'click', duration: motionTiming.click, state: before, cursor: { target: 'target', mode: 'clicking' } },
		{ phase: 'reveal', duration: 300, state: revealed, cursor: { target: 'target', mode: 'idle' }, motion: { reveal: revealDuration } }
	];
}

function hold(state: IllustrationStep['state']): IllustrationStep {
	return { phase: 'hold', duration: 1800, state, cursor: null, motion: { cursorOpacity: motionTiming.cursorFade } };
}

function dropdownTour(revealDuration = 0): readonly IllustrationStep[] {
	return [
		...opening(revealDuration),
		{ phase: 'read-result', duration: 1000, state: revealed, cursor: { target: 'target', mode: 'idle' } },
		{ phase: 'approach-dropdown', duration: 600, state: revealed, cursor: { target: 'dropdown', mode: 'idle', move: 600 } },
		{ phase: 'click-dropdown', duration: motionTiming.click, state: revealed, cursor: { target: 'dropdown', mode: 'clicking' } },
		{ phase: 'expand-dropdown', duration: 300, state: expanded, cursor: { target: 'dropdown', mode: 'idle' }, motion: { reveal: 300 } },
		hold(expanded)
	];
}

export const summaryTour = dropdownTour(300);
export const acceptChangesTour = dropdownTour();
export const approvalTour: readonly IllustrationStep[] = [...opening(), hold(revealed)];

export function motionDuration(step: IllustrationStep): number {
	return Math.max(0, ...Object.values(step.motion ?? {}), step.cursor?.move ?? 0,
		step.cursor?.fade ?? 0, step.cursor?.mode === 'clicking' ? motionTiming.click : 0);
}
