<script lang="ts">
  import type { PricingTier } from './pricing-model';

  let { active, pattern }: { active: boolean; pattern: PricingTier } = $props();
  let canvas = $state<HTMLCanvasElement>();

  // Ported from or, sr, lr, ur, and pr in the captured Loops pricing component.
  const matrix = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  const backingScale = 3;
  const sphereLevels = [0.95, 0.62, 0.36, 0.14];
  type Pattern = (x: number, y: number, time: number, width: number, height: number) => number;

  const patterns: Record<PricingTier, Pattern> = {
    free: (x, y, time, width, height) =>
      0.4 *
      Math.exp(
        -Math.hypot(x - width * 0.95, y - height * 0.98) /
          (width * 0.42 * (1 + 0.06 * Math.sin(time * 0.8)))
      ),
    growth: (x, y, time, width, height) => {
      const distance = Math.hypot(x - width * 0.95, y - height * 0.98);
      return (
        Math.min(1, Math.max(0, 1.05 - distance / (width * 1.3))) *
        0.85 *
        (Math.sin(distance * 0.17 - time * 1.4) > 0.35 ? 1 : 0.12)
      );
    },
    custom: (x, y, time, width, height) => {
      const radius = width * 0.75;
      const u = (x - width * 0.78) / radius;
      const v = (y - height * 0.93) / radius;
      const depthSquared = 1 - u * u - v * v;
      if (depthSquared < 0) return 0;

      const lightX = -0.7 + 0.2 * Math.cos(time * 0.25);
      const lightY = -0.55 + 0.15 * Math.sin(time * 0.25);
      const intensity = Math.max(
        0,
        (u * lightX + v * lightY + Math.sqrt(depthSquared) * 0.3) /
          Math.hypot(lightX, lightY, 0.3)
      );
      return sphereLevels[Math.min(3, Math.floor(intensity * 4))];
    }
  };

  $effect(() => {
    const boundCanvas = canvas;
    const renderPattern = patterns[pattern];
    if (!boundCanvas) return;
    const element = boundCanvas;
    const drawingContext = element.getContext('2d');
    if (!drawingContext || !active) return;
    const context = drawingContext;

    const [red, green, blue] = (
      getComputedStyle(element).color.match(/\d+/g) ?? ['33', '32', '28']
    ).map(Number);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motion.matches;
    let pixels = context.createImageData(1, 1);
    let frame = 0;
    let previousTimestamp = -Infinity;
    let revealStartedAt = -1;

    function resize() {
      const bounds = element.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width / backingScale));
      const height = Math.max(1, Math.round(bounds.height / backingScale));
      if (
        pixels.width === width && pixels.height === height &&
        element.width === width && element.height === height
      ) return;

      element.width = width;
      element.height = height;
      pixels = context.createImageData(width, height);
      if (reducedMotion) paint(performance.now());
    }

    function paint(timestamp: number) {
      if (revealStartedAt < 0) revealStartedAt = timestamp;
      const reveal = reducedMotion ? 1 : Math.min(1, (timestamp - revealStartedAt) / 700);
      const time = reducedMotion ? 1.2 : timestamp / 1000;
      const { width, height, data } = pixels;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const visible =
            reveal * renderPattern(x, y, time, width, height) >
            (matrix[(y % 4) * 4 + (x % 4)] + 0.5) / 16;
          const offset = (y * width + x) * 4;
          data[offset] = red;
          data[offset + 1] = green;
          data[offset + 2] = blue;
          data[offset + 3] = visible ? 255 : 0;
        }
      }

      context.putImageData(pixels, 0, 0);
    }

    function draw(timestamp: number) {
      frame = 0;
      if (!reducedMotion && timestamp - previousTimestamp < 33) {
        frame = requestAnimationFrame(draw);
        return;
      }

      previousTimestamp = timestamp;
      paint(timestamp);
      if (!reducedMotion) frame = requestAnimationFrame(draw);
    }

    function updateMotion() {
      reducedMotion = motion.matches;
      cancelAnimationFrame(frame);
      frame = 0;
      previousTimestamp = -Infinity;
      if (reducedMotion) paint(performance.now());
      else frame = requestAnimationFrame(draw);
    }

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    motion.addEventListener('change', updateMotion);
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener('change', updateMotion);
    };
  });
</script>

<canvas bind:this={canvas} class="
  pointer-events-none absolute inset-x-11 inset-y-7 h-[calc(100%_-_56px)] w-[calc(100%_-_88px)] text-pricing-ink
  opacity-10 [image-rendering:pixelated]
  [mask-image:linear-gradient(155deg,transparent_30%,#000_78%),linear-gradient(to_left,transparent,#000_64px),linear-gradient(to_top,transparent,#000_72px)]
  [mask-composite:intersect]
" aria-hidden="true"></canvas>
