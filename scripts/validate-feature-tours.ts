import assert from 'node:assert/strict';
import contract from '../src/lib/components/product-animation/data/contract.json' with { type: 'json' };
import { validateTour as validateProductTour } from '../src/lib/components/product-animation/validate-tour.ts';
import type { PreparedContract } from '../src/lib/components/product-animation/model.ts';
import { summaryTour, acceptChangesTour, approvalTour } from '../src/lib/components/marketing/illustrations/click-reveal-tour.ts';
import { heroTour, heroCompletedStep } from '../src/lib/components/product-animation/hero-tour.ts';
import type { GuidedTourStep } from '../src/lib/components/animation/tour-model.ts';

function validateTour(steps: ReadonlyArray<GuidedTourStep>): void {
	assert.ok(steps.length > 0, 'A guided tour requires at least one step.');
	const phases = new Set<string>();
	for (const step of steps) {
		assert.ok(Number.isFinite(step.duration) && step.duration > 0, `${step.phase} must have a positive duration.`);
		assert.ok(!phases.has(step.phase), `${step.phase} must be unique within its tour.`);
		phases.add(step.phase);
	}
}

for (const tour of [summaryTour, acceptChangesTour, approvalTour, heroTour]) {
	validateTour(tour);
	assert.equal(tour.at(-1)?.cursor, null, 'Reduced-motion final states must hide the cursor.');
}

assert.equal(heroCompletedStep.cursor, null, 'Reduced motion must hide the hero cursor.');

validateProductTour([...heroTour, heroCompletedStep], contract as PreparedContract);
