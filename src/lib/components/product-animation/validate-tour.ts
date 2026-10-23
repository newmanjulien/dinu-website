import type { AnimationStep, PreparedContract } from './model.ts';

export function validateTour(tour: readonly AnimationStep[], contract: PreparedContract) {
	const panels = new Map(contract.panels.map((panel) => [panel.id, panel]));
	for (const beat of tour) {
		const fail = (message: string): never => { throw new Error(`Animation beat ${beat.phase}: ${message}`); };
		if (!contract.states[beat.state.contract]) fail('unknown contract state');
		if (!panels.has(beat.state.clause)) fail('unknown viewed clause');
		if (beat.state.box) {
			const panel = panels.get(beat.state.box.clause) ?? fail('unknown guidance box');
			if (beat.state.box.section && !panel.sections.some((section) => section.key === beat.state.box!.section)) fail('unknown open section');
		}
		const target = beat.cursor?.target;
		if (!target || target.kind === 'origin' || target.kind === 'approval') continue;
		const panel = panels.get(target.clause) ?? fail('unknown cursor clause');
		if (target.kind === 'clause') continue;
		if (target.clause !== beat.state.box?.clause) fail('cursor targets a closed guidance box');
		if (target.kind === 'section' && !panel.sections.some((section) => section.key === target.section)) fail('unknown cursor section');
		if (target.kind === 'concession' && !panel.sections.some((section) => section.key === beat.state.box?.section && section.concessions?.some((concession) => concession.id === target.concession))) fail('unknown or closed concession target');
	}
}

