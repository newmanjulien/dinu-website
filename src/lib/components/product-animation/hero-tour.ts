import { defineTour, cursorMoveDuration, motionTiming, type AnimationState, type AnimationStep, type AnimationTarget } from './model.ts';

const steps: AnimationStep[] = [];
let state: AnimationState = { clause: 'demo:subscription-use', contract: 'baseline', viewport: 'opening' };
function hold(phase: string, duration: number, target: AnimationTarget | null = null, mode: 'idle' | 'clicking' = 'idle', move?: number) {
	steps.push({ phase, duration, state: { ...state }, cursor: target ? { target, mode, ...(move ? { move } : {}) } : null });
}
function click(name: string, target: AnimationTarget) {
	hold(`${name}-approach`, cursorMoveDuration, target, 'idle', cursorMoveDuration);
	hold(`${name}-click`, motionTiming.click, target, 'clicking');
}
function openBox(name: string, summaryDuration: number, enterDuration: number = motionTiming.cursorFade) {
	hold(`${name}-enter`, enterDuration, { kind: 'origin' });
	hold(`${name}-approach`, cursorMoveDuration, { kind: 'clause', clause: state.clause }, 'idle', cursorMoveDuration);
	state = { ...state, hovered: true };
	hold(`${name}-hover`, 220, { kind: 'clause', clause: state.clause });
	hold(`${name}-click`, motionTiming.click, { kind: 'clause', clause: state.clause }, 'clicking');
	state = { ...state, box: { clause: state.clause, section: null, scroll: 'start' }, hovered: false };
	hold(`${name}-summary`, summaryDuration, { kind: 'clause', clause: state.clause });
}
function travel(name: string, clause: string, duration: number) {
	state = { ...state, clause, viewport: 'clause', hovered: false };
	hold(`${name}-travel`, duration, { kind: 'origin' }, 'idle', cursorMoveDuration);
}
function advice(name: string, section: string, duration: number) {
	click(name, { kind: 'section', clause: state.box!.clause, section });
	state = { ...state, box: { ...state.box!, section, scroll: 'start' } };
	hold(`${name}-read`, duration, { kind: 'section', clause: state.box!.clause, section });
}
function concede(name: string, contract: AnimationState['contract'], concession: string, reading: number, redline: number) {
	advice(`${name}-preferred`, 'preferred', reading);
	const target: AnimationTarget = { kind: 'concession', clause: state.box!.clause, concession };
	click(`${name}-apply`, target);
	state = { ...state, contract };
	hold(`${name}-applied`, 600, target);
	state = { ...state, viewport: 'revision' };
	hold(`${name}-redline`, redline);
}

hold('untouched', 1400);
openBox('subscription', 3000, 240);
advice('subscription-negotiation', 'negotiation', 3500);

travel('payment', 'demo:payment-terms', 1700);
openBox('payment', 2800);
concede('payment', 'payment-conceded', 'payment-net-45', 3500, 2400);

travel('liability', 'demo:liability-limits', 1700);
openBox('liability', 3500);
advice('liability-approval', 'changesNeedApproval', 1200);
concede('liability', 'liability-proposed', 'liability-cap-twelve-months', 4000, 2800);

state = { ...state, box: undefined, viewport: 'actions' };
hold('approval-travel', 1580, { kind: 'origin' }, 'idle', cursorMoveDuration);
click('approval', { kind: 'approval' });
state = { ...state, approvalRequested: true };
hold('approval-requested', 600, { kind: 'approval' });
hold('completed', 4000);
state = { ...state, opacity: 0 };
hold('fade-out', motionTiming.loopFade);
state = { clause: 'demo:subscription-use', contract: 'baseline', viewport: 'opening', opacity: 0 };
steps.push({ phase: 'reset-hidden', duration: 1, state: { ...state }, cursor: null, motion: { document: 0, paper: 0, opacity: 0 } });
state = { ...state, opacity: 1 };
hold('fade-in', motionTiming.loopFade);

export const heroTour: ReadonlyArray<AnimationStep> = defineTour(steps);
// The loop ends on the baseline; reduced motion shows the final pending-approval scene.
export const heroCompletedStep = heroTour.find((step) => step.phase === 'completed')!;
