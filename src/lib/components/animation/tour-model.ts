export const motionTiming = { paper: 450, guidance: 180, panel: 600, cursorFade: 120, click: 220, loopFade: 250 } as const;
export interface CursorFrame { x: number; y: number; opacity: number; ringOpacity: number; ringScale: number; scale: number }
export type GuidedCursorMode = 'idle' | 'clicking';
export interface GuidedTourStep<Phase extends string = string, State = unknown, Target = unknown> {
	phase: Phase;
	duration: number;
	state: State;
	cursor: { target: Target; mode: GuidedCursorMode; move?: number; fade?: number } | null;
}
