<script lang="ts">
  import { tick } from 'svelte';
  import { MediaQuery } from 'svelte/reactivity';
  import { DESKTOP_QUERY, observeLayout } from '$lib/utils/layout-observer';
  import { buildHomepageFrame, type FrameGeometry } from './homepage-frame-geometry';

  let {
    root,
    revealTarget,
    revealed = $bindable(false)
  }: {
    root: HTMLElement | undefined;
    revealTarget?: HTMLElement;
    revealed?: boolean;
  } = $props();
  const desktop = new MediaQuery(DESKTOP_QUERY);
  let svg = $state<SVGSVGElement>();
  let geometry = $state<FrameGeometry | null>(null);
  let viewportHeight = $state(1);
  let finished = $state(false);
  let entered = false;
  let completed = 0;
  let finishIntro = () => {};
  const frame = $derived(geometry && buildHomepageFrame(geometry, finished ? undefined : viewportHeight));

  $effect(() => {
    const container = root;
    if (!container) return;
    if (!desktop.current) {
      entered = true;
      finished = true;
      geometry = null;
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const skipIntro = entered || reducedMotion.matches || window.scrollY > 0 || Boolean(window.location.hash);
    entered = true;
    finished = skipIntro;
    completed = 0;
    let disposed = false;
    let layout: ReturnType<typeof observeLayout> | undefined;
    let previous: FrameGeometry | null = null;

    function finish() {
      finished = true;
      window.removeEventListener('scroll', finish);
      window.removeEventListener('resize', finish);
      reducedMotion.removeEventListener('change', finish);
    }

    finishIntro = finish;
    if (!skipIntro) {
      window.addEventListener('scroll', finish, { passive: true });
      window.addEventListener('resize', finish);
      reducedMotion.addEventListener('change', finish);
    }

    void tick().then(() => {
      if (disposed) return;
      let hero: Element | null = null;
      let demo: Element | null = null;
      const resolveElements = () => {
        hero = container.querySelector('#overview');
        demo = hero?.querySelector('[data-hero-demo]') ?? null;
        return [container, ...(hero ? [hero] : []), ...(demo ? [demo] : [])];
      };

      layout = observeLayout(resolveElements, () => {
        if (!container.isConnected || !hero?.isConnected || !demo?.isConnected
          || !container.contains(hero) || !hero.contains(demo)) {
          // Keep watching the shell so replacement anchors can restore the frame.
          previous = geometry = null;
          finish();
          return;
        }
        const rect = container.getBoundingClientRect();
        const heroRect = hero.getBoundingClientRect();
        const demoRect = demo.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0 || heroRect.height <= 0
          || demoRect.width <= 0 || demoRect.height <= 0) {
          previous = geometry = null;
          finish();
          return;
        }
        const next = {
          width: rect.width,
          height: rect.height,
          heroBottom: heroRect.bottom - rect.top,
          demoRight: demoRect.right - rect.left,
          // Four bands are reserved by the shell; padding is already resolved to pixels.
          band: parseFloat(getComputedStyle(container).paddingBottom) / 4
        };
        viewportHeight = window.innerHeight;
        if (previous
          && next.width === previous.width && next.height === previous.height
          && next.heroBottom === previous.heroBottom && next.demoRight === previous.demoRight
          && next.band === previous.band) return;
        if (previous) finish();
        previous = next;
        geometry = next;
      }, undefined, { mutationRoot: container });
    });

    return () => {
      disposed = true;
      layout?.destroy();
      finish();
      finishIntro = () => {};
    };
  });

  $effect(() => {
    const element = svg;
    const target = revealTarget;
    const drawing = frame;
    revealed = finished || (geometry !== null && drawing === null);
    if (finished || !element || !target || !drawing || !geometry) return;

    const bounds = target.getBoundingClientRect();
    const origin = element.getBoundingClientRect();
    const halfStroke = (geometry.band + 0.25) / 2;
    const left = bounds.left - origin.left - halfStroke;
    const bottom = bounds.bottom - origin.top + halfStroke;
    const ribbons = Array.from(element.querySelectorAll<SVGPathElement>('.ribbon'), (path) => {
      const length = path.getTotalLength();
      let start = 0;
      let end = length;
      // Find where the entire stroke has passed below the target or turned to its left.
      for (let i = 0; i < 20; i++) {
        const middle = (start + end) / 2;
        const point = path.getPointAtLength(middle);
        if (point.y >= bottom || point.x <= left) end = middle;
        else start = middle;
      }
      return { path, progress: end / length };
    });
    let request = 0;

    function update() {
      revealed = ribbons.every(({ path, progress }) => {
        const timing = path.getAnimations()[0]?.effect?.getComputedTiming();
        return typeof timing?.progress === 'number' && timing.progress >= progress;
      });
      if (!revealed) request = requestAnimationFrame(update);
    }

    request = requestAnimationFrame(update);
    return () => cancelAnimationFrame(request);
  });
</script>

{#if geometry && frame}
  <svg
    bind:this={svg}
    class="homepage-frame"
    class:finished
    width={geometry.width}
    height={geometry.height}
    viewBox={`0 0 ${geometry.width} ${geometry.height}`}
    aria-hidden="true"
    focusable="false"
    onanimationend={finished ? undefined : () => { if (++completed === 4) finishIntro(); }}
  >
    <path d={frame.corner} fill="var(--homepage-band-1)" />
    <path d={frame.fill} fill="var(--color-brand-dark)" />
    {#each frame.ribbons as ribbon, index}
      <path
        class="ribbon"
        d={ribbon.path}
        fill="none"
        stroke={`var(--homepage-band-${index + 1})`}
        stroke-width={geometry.band + 0.25}
        pathLength="1"
        style={ribbon.duration === undefined ? undefined : `--draw-duration: ${ribbon.duration}s; --draw-delay: ${index * 120}ms`}
      />
    {/each}
  </svg>
{/if}

<style>
  .homepage-frame {
    position: absolute;
    inset: 0;
    z-index: 0;
    display: none;
    overflow: hidden;
    pointer-events: none;
  }

  .ribbon {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: draw-ribbon var(--draw-duration) linear var(--draw-delay) forwards;
  }

  .finished .ribbon {
    animation: none;
    stroke-dashoffset: 0;
  }

  @keyframes draw-ribbon {
    to { stroke-dashoffset: 0; }
  }

  @media (min-width: 64rem) {
    .homepage-frame { display: block; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ribbon {
      animation: none;
      stroke-dashoffset: 0;
    }
  }
</style>
