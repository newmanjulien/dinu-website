<script lang="ts">
  import { onMount } from 'svelte';

  let { class: className = '' }: { class?: string } = $props();

  let canvas: HTMLCanvasElement;

  const STEP = 6;
  const BUCKET_COUNT = 12;
  const TAU = Math.PI * 2;
  const STATIC_PHASE = 1.6;
  const SPEED = 0.55;

  const bucketColors = Array.from({ length: BUCKET_COUNT }, (_, index) => {
    const t = (index + 1) / BUCKET_COUNT;
    const alpha = 0.022 + t * 0.148;
    return `rgba(32, 33, 36, ${alpha.toFixed(3)})`;
  });

  const bucketRadii = Array.from({ length: BUCKET_COUNT }, (_, index) => {
    const t = (index + 1) / BUCKET_COUNT;
    return 0.72 + t * 0.78;
  });

  function smoothstep(edge0: number, edge1: number, x: number): number {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  }

  onMount(() => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const buckets: number[][] = Array.from({ length: BUCKET_COUNT }, () => []);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let width = 0;
    let height = 0;
    let dpr = 1;
    let inView = true;
    let visible = !document.hidden;
    let rafId = 0;
    let phase = STATIC_PHASE;
    let lastTimestamp = 0;

    function draw(time: number) {
      if (width <= 0 || height <= 0) return;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, width, height);

      for (let b = 0; b < BUCKET_COUNT; b++) {
        buckets[b].length = 0;
      }

      const cols = Math.floor(width / STEP);
      const rows = Math.floor(height / STEP);
      const offsetX = (width - (cols - 1) * STEP) * 0.5;
      const offsetY = (height - (rows - 1) * STEP) * 0.5;
      const invW = 2 / Math.max(1, width);
      const invH = 2 / Math.max(1, height);

      for (let row = 0; row < rows; row++) {
        const y = offsetY + row * STEP;
        const v = y * invH - 1;

        for (let col = 0; col < cols; col++) {
          const x = offsetX + col * STEP;
          const u = x * invW - 1;

          const dist = Math.hypot(u * 0.98, v * 0.96);
          if (dist >= 1.04) continue;
          const vignette = smoothstep(1.04, 0.2, dist);

          // Domain-warped sweeping ribbons matching the organic flowing dot-matrix wave.
          const wx =
            u +
            0.38 * Math.sin(v * 2.1 + time * 0.55) +
            0.18 * Math.cos((u + v) * 1.7 - time * 0.35);
          const wy =
            v +
            0.34 * Math.cos(u * 1.9 - time * 0.45) +
            0.16 * Math.sin((u - v) * 1.5 + time * 0.4);

          const diag = wx * 0.85 + wy * 0.65;
          const primary =
            0.5 + 0.5 * Math.sin(diag * 3.4 - time * 0.85 + Math.sin(wy * 2.0 + time * 0.4));
          const secondary =
            0.5 + 0.5 * Math.cos((wx * 0.5 - wy * 0.9) * 2.6 + time * 0.55);

          const wave = Math.pow(primary * 0.72 + secondary * 0.28, 1.65);
          const intensity = wave * vignette;

          if (intensity < 0.04) continue;

          const bucket = Math.min(BUCKET_COUNT - 1, Math.floor(intensity * BUCKET_COUNT));
          buckets[bucket].push(x, y);
        }
      }

      for (let b = 0; b < BUCKET_COUNT; b++) {
        const coords = buckets[b];
        if (coords.length === 0) continue;

        const r = bucketRadii[b];
        ctx!.fillStyle = bucketColors[b];
        ctx!.beginPath();
        for (let i = 0; i < coords.length; i += 2) {
          const cx = coords[i];
          const cy = coords[i + 1];
          ctx!.moveTo(cx + r, cy);
          ctx!.arc(cx, cy, r, 0, TAU);
        }
        ctx!.fill();
      }
    }

    function stop() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      lastTimestamp = 0;
    }

    function tick(timestamp: number) {
      rafId = 0;
      if (lastTimestamp) {
        const dt = Math.min(0.1, (timestamp - lastTimestamp) / 1000);
        phase += dt * SPEED;
      }
      lastTimestamp = timestamp;
      draw(phase);
      if (shouldAnimate()) {
        rafId = requestAnimationFrame(tick);
      }
    }

    function shouldAnimate(): boolean {
      return inView && visible && !reducedMotion.matches && width > 0 && height > 0;
    }

    function syncPlayback(redrawWhenStopped = false) {
      if (shouldAnimate()) {
        if (!rafId) {
          lastTimestamp = 0;
          rafId = requestAnimationFrame(tick);
        }
      } else {
        stop();
        if (redrawWhenStopped && width > 0 && height > 0) {
          draw(reducedMotion.matches ? STATIC_PHASE : phase);
        }
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.round(rect.width);
      const nextHeight = Math.round(rect.height);
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);

      if (nextWidth === width && nextHeight === height && nextDpr === dpr) return;

      width = nextWidth;
      height = nextHeight;
      dpr = nextDpr;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      draw(reducedMotion.matches ? STATIC_PHASE : phase);
      syncPlayback();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
        syncPlayback();
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(canvas);

    const onVisibilityChange = () => {
      visible = !document.hidden;
      syncPlayback();
    };
    const onMotionChange = () => syncPlayback(true);

    document.addEventListener('visibilitychange', onVisibilityChange);
    reducedMotion.addEventListener('change', onMotionChange);

    resize();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotion.removeEventListener('change', onMotionChange);
    };
  });
</script>

<canvas
  bind:this={canvas}
  aria-hidden="true"
  class={['pointer-events-none absolute inset-y-0 left-0 block h-full w-full', className]}
></canvas>
