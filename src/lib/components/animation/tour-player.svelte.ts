const START_RATIO = 0.4;
const KEEP_RATIO = 0.2;
const STEAL_DELTA = 0.2;
const RATIO_THRESHOLDS = [0, 0.2, 0.4, 0.6, 0.8, 1];
interface TourSession {
	getRatio(): number;
	isReady(): boolean;
	isFinished(): boolean;
	setActive(active: boolean): void;
}
const sessions = new Set<TourSession>();
let elected: TourSession | undefined;
function elect() {
	const incumbent = elected && sessions.has(elected) && elected.isReady() && !elected.isFinished() && elected.getRatio() >= KEEP_RATIO ? elected : undefined;
	let best: TourSession | undefined;
	for (const session of sessions) {
		if (session.isReady() && !session.isFinished() && session.getRatio() >= START_RATIO &&
			(!best || session.getRatio() > best.getRatio())) best = session;
	}
	elected = !incumbent ? best : best && best !== incumbent && best.getRatio() >= incumbent.getRatio() + STEAL_DELTA ? best : incumbent;
	for (const session of sessions) session.setActive(session === elected);
}

/** One clock; renderers supply the end of their motion and own frame presentation. */
export function createGuidedTour<Step extends { duration: number }>(steps: readonly Step[], options: {
	getMotionEnd(step: Step): number;
	loop?: boolean;
	completedStep?: Step;
	onComplete?(): void;
}) {
	if (!steps.length) throw new Error('A guided tour requires at least one step.');
	const completed = options.completedStep ?? steps.at(-1)!;
	let step = $state.raw<Step>(steps[0]!);
	let elapsed = 0;
	let running = false;
	let reducedMotion = $state(false);
	let ready = true;
	let hasPrepared = false;
	let index = 0;
	let finished = false;
	let measuredMotionEnd: number | undefined;
	let stopPlayback: (() => void) | undefined;
	let updatePlayback = () => {};
	let reschedule = () => {};
	const listeners = new Set<(step: Step, elapsed: number, reduced: boolean) => void>();
	const publish = () => { for (const listener of listeners) listener(step, elapsed, reducedMotion); };
	function setReady(next: boolean) {
		if (ready === next) return;
		ready = next;
		if (next) hasPrepared = true;
		updatePlayback();
		elect();
	}
	function start(element: HTMLElement) {
		stopPlayback?.();
		index = 0;
		hasPrepared = ready;
		measuredMotionEnd = undefined;
		finished = false;
		elapsed = 0;
		reducedMotion = false;
		step = steps[0]!;
		publish();
		let disposed = false;
		let active = false;
		let ratio = 0;
		let startedAt = 0;
		let timer: ReturnType<typeof setTimeout> | undefined;
		let frame: number | undefined;
		let visibilityFrame: number | undefined;
		let observer: IntersectionObserver | undefined;
		let thresholds: number[] = [];
		let observerVersion = 0;
		let savedElapsed = 0;
		const fallbackVisibility = typeof IntersectionObserver === 'undefined';
		const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
		function cancel() {
			if (timer !== undefined) clearTimeout(timer);
			if (frame !== undefined) cancelAnimationFrame(frame);
			timer = undefined;
			frame = undefined;
		}
		function sample() {
			if (!running) return;
			const now = performance.now();
			elapsed = Math.min(step.duration, elapsed + now - startedAt);
			// Commit the timestamp before listeners can synchronously pause preparation.
			startedAt = now;
		}
		function pause() {
			const wasRunning = running;
			sample();
			running = false;
			cancel();
			if (wasRunning) publish();
		}
		function playable() { return !disposed && ready && active && !finished && !reducedMotion && document.visibilityState === 'visible'; }
		const motionEnd = () => Math.min(step.duration, measuredMotionEnd ?? options.getMotionEnd(step));
		function schedule() {
			if (!playable()) return;
			if (!running) { running = true; startedAt = performance.now(); }
			const end = motionEnd();
			if (elapsed < end && frame === undefined) frame = requestAnimationFrame(sampleFrame);
			if (timer === undefined) timer = setTimeout(boundary, Math.max(0, (elapsed < end ? end : step.duration) - elapsed));
		}
		function sampleFrame() {
			frame = undefined;
			if (!playable()) return;
			sample();
			publish();
			schedule(); // The boundary timer stays in place throughout the motion.
		}
		function boundary() {
			timer = undefined;
			if (!playable()) return;
			if (frame !== undefined) cancelAnimationFrame(frame);
			frame = undefined;
			sample();
			publish(); // Settle the outgoing motion, including cues shorter than a frame.
			if (!playable()) return;
			if (elapsed >= step.duration) {
				cancel(); // Listeners may have synchronously rescheduled the outgoing step.
				if (index === steps.length - 1 && !options.loop) {
					finished = true;
					running = false;
					stop();
					options.onComplete?.();
					return;
				}
				measuredMotionEnd = undefined;
				index = (index + 1) % steps.length;
				elapsed = 0;
				step = steps[index]!;
				publish();
			}
			schedule();
		}
		updatePlayback = () => { if (playable()) schedule(); else pause(); };
		reschedule = () => { sample(); cancel(); updatePlayback(); };
		const session: TourSession = {
			getRatio: () => ratio,
			isReady: () => (ready || hasPrepared) && !reducedMotion,
			isFinished: () => finished,
			setActive(next) { if (active !== next) { active = next; updatePlayback(); } }
		};
		function updatePreference() {
			if (disposed || reducedMotion === preference.matches) return;
			pause();
			reducedMotion = preference.matches;
			if (reducedMotion) { savedElapsed = elapsed; step = completed; elapsed = completed.duration; }
			else { step = steps[index]!; elapsed = savedElapsed; }
			publish();
			elect();
			updatePlayback();
		}
		function intersect(entries: IntersectionObserverEntry[]) {
			const entry = entries.at(-1);
			if (disposed || !entry) return;
			const bounds = entry.boundingClientRect;
			const intersection = entry.intersectionRect;
			const root = entry.rootBounds;
			const attainable = Math.min(bounds.width, root?.width ?? window.innerWidth) * Math.min(bounds.height, root?.height ?? window.innerHeight);
			ratio = attainable > 0 ? Math.min(1, intersection.width * intersection.height / attainable) : 0;
			elect();
		}
		function refreshVisibility() {
			if (disposed) return;
			const bounds = element.getBoundingClientRect();
			const width = window.innerWidth, height = window.innerHeight;
			const visibleWidth = Math.max(0, Math.min(bounds.right, width) - Math.max(0, bounds.left));
			const visibleHeight = Math.max(0, Math.min(bounds.bottom, height) - Math.max(0, bounds.top));
			const attainable = Math.min(bounds.width, width) * Math.min(bounds.height, height);
			ratio = attainable > 0 ? Math.min(1, visibleWidth * visibleHeight / attainable) : 0;
			if (!fallbackVisibility) {
				const fraction = bounds.width && bounds.height ? attainable / (bounds.width * bounds.height) : 1;
				const next = [...new Set([...RATIO_THRESHOLDS.map((value) => value * fraction), 1])];
				if (next.length !== thresholds.length || next.some((value, index) => value !== thresholds[index])) {
					thresholds = next;
					observer?.disconnect();
					const version = ++observerVersion;
					observer = new IntersectionObserver((entries) => { if (version === observerVersion) intersect(entries); }, { threshold: thresholds });
					observer.observe(element);
				}
			}
			elect();
		}
		function queueVisibility() {
			if (disposed || visibilityFrame !== undefined) return;
			visibilityFrame = requestAnimationFrame(() => { visibilityFrame = undefined; refreshVisibility(); });
		}
		const resize = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(queueVisibility);
		function stop() {
			if (disposed) return;
			disposed = true;
			pause();
			if (visibilityFrame !== undefined) cancelAnimationFrame(visibilityFrame);
			sessions.delete(session);
			if (elected === session) elected = undefined;
			observer?.disconnect();
			resize?.disconnect();
			preference.removeEventListener('change', updatePreference);
			document.removeEventListener('visibilitychange', updatePlayback);
			window.removeEventListener('resize', queueVisibility);
			if (fallbackVisibility) window.removeEventListener('scroll', queueVisibility);
			stopPlayback = undefined;
			updatePlayback = reschedule = () => {};
			elect();
		}
		stopPlayback = stop;
		sessions.add(session);
		updatePreference();
		preference.addEventListener('change', updatePreference);
		document.addEventListener('visibilitychange', updatePlayback);
		window.addEventListener('resize', queueVisibility);
		if (fallbackVisibility) window.addEventListener('scroll', queueVisibility, { passive: true });
		resize?.observe(element);
		refreshVisibility();
		return stop;
	}
	return {
		get step() { return step; },
		get elapsed() { return elapsed; },
		get resumeStep() { return steps[index]!; },
		get reducedMotion() { return reducedMotion; },
		start, setReady,
		setMotionEnd(end: number) {
			if (measuredMotionEnd === end) return;
			measuredMotionEnd = end;
			reschedule();
		},
		onFrame(listener: (step: Step, elapsed: number, reduced: boolean) => void) {
			listeners.add(listener);
			listener(step, elapsed, reducedMotion);
			return () => { listeners.delete(listener); };
		}
	};
}
