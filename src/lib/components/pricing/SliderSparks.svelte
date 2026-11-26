<script lang="ts">
  import { onMount } from 'svelte';

  let { power }: { power: number } = $props();
  let canvas: HTMLCanvasElement;
  let repaint = $state<((currentPower: number) => void)>();

  $effect(() => {
    repaint?.(power);
  });

  // Ported from dr in the captured Loops pricing component.
  onMount(() => {
    const element = canvas;
    const drawingContext = element.getContext('2d');
    if (!drawingContext) return;
    const context = drawingContext;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motion.matches;
    let dpr = 0;
    let width = 0;
    let height = 0;
    const particles = Array.from({ length: 36 }, () => ({
      x: Math.random(),
      y: 0.2 + Math.random() * 0.6,
      speed: 0.05 + Math.random() * 0.1,
      size: 0.6 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2
    }));
    let frame = 0;
    let previousTimestamp = performance.now();

    function paint(timestamp: number, delta: number, currentPower: number) {
      const head = 12 + (width - 24) * currentPower;

      context.clearRect(0, 0, width, height);
      context.fillStyle = '#fff';
      particles.forEach((particle) => {
        if (!reducedMotion) particle.x += particle.speed * (0.4 + currentPower) * delta;
        if (particle.x > 1) {
          particle.x--;
          particle.y = 0.2 + Math.random() * 0.6;
        }

        const x = particle.x * width;
        const edgeFade = Math.min(1, x / 30, Math.max(0, (head - x) / 40));
        context.globalAlpha =
          edgeFade * (0.6 + 0.4 * Math.sin(timestamp / 330 + particle.phase)) * 0.85;
        context.beginPath();
        context.arc(x, particle.y * height, particle.size, 0, Math.PI * 2);
        context.fill();
      });
    }

    function resize() {
      const bounds = element.getBoundingClientRect();
      const nextDpr = window.devicePixelRatio || 1;
      if (width === bounds.width && height === bounds.height && dpr === nextDpr) return;

      width = bounds.width;
      height = bounds.height;
      dpr = nextDpr;
      element.width = Math.round(width * dpr);
      element.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reducedMotion) paint(previousTimestamp, 0, power);
    }

    function draw(timestamp: number) {
      frame = 0;
      const delta = Math.min(0.05, (timestamp - previousTimestamp) / 1000);
      previousTimestamp = timestamp;
      paint(timestamp, delta, power);
      if (!reducedMotion) frame = requestAnimationFrame(draw);
    }

    function updateMotion() {
      reducedMotion = motion.matches;
      cancelAnimationFrame(frame);
      frame = 0;
      previousTimestamp = performance.now();
      if (reducedMotion) paint(previousTimestamp, 0, power);
      else frame = requestAnimationFrame(draw);
    }

    repaint = (currentPower) => {
      if (reducedMotion) paint(previousTimestamp, 0, currentPower);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    motion.addEventListener('change', updateMotion);
    window.addEventListener('resize', resize);
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener('change', updateMotion);
      window.removeEventListener('resize', resize);
      repaint = undefined;
    };
  });
</script>

<canvas bind:this={canvas} class="absolute inset-0 h-full w-full" aria-hidden="true"></canvas>
