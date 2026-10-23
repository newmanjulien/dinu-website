<script lang="ts">
  import { replaceState } from '$app/navigation';
  import { page } from '$app/state';
  import { tick } from 'svelte';
  import { MediaQuery } from 'svelte/reactivity';
  import { DESKTOP_QUERY, observeLayout } from '$lib/utils/layout-observer';

  type Section = { id: string; label: string };

  const REST_W = 8;
  const ACTIVE_W = 14;
  const MAX_W = 17;
  const REST_H = 2;
  const MAX_H = 3;
  const FALL_OFF = 2.2;

  let { sections, cover }: { sections: Section[]; cover?: string } = $props();

  let activeId = $state('');
  let visible = $state(false);
  let navEl = $state<HTMLElement | null>(null);
  let listEl = $state<HTMLUListElement | null>(null);
  let hoverY = $state<number | null>(null);
  let focusedId = $state('');
  let centers = $state<number[]>([]);
  let pitch = $state(14);
  const desktop = new MediaQuery(DESKTOP_QUERY);
  const reduceMotion = new MediaQuery('(prefers-reduced-motion: reduce)');
  let targets = new Map<string, HTMLElement>();
  const currentId = $derived(activeId || sections[0]?.id || '');

  const magnetY = $derived.by(() => {
    if (hoverY != null) return hoverY;
    if (!focusedId) return null;
    const index = sections.findIndex((section) => section.id === focusedId);
    return index >= 0 ? (centers[index] ?? null) : null;
  });

  const hotIndex = $derived.by(() => {
    if (magnetY == null || centers.length === 0) return -1;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < centers.length; i++) {
      const dist = Math.abs(centers[i] - magnetY);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    return best;
  });

  $effect(() => {
    const items = sections;
    const coverId = cover;
    const nav = navEl;
    if (!desktop.current || !nav) {
      visible = false;
      targets.clear();
      return;
    }

    let disposed = false;
    let layout: ReturnType<typeof observeLayout> | undefined;
    const onScroll = () => layout?.update();

    void tick().then(() => {
      if (disposed) return;
      targets = new Map(items.flatMap((item) => {
        const element = document.getElementById(item.id);
        return element ? [[item.id, element] as const] : [];
      }));
      const coverEl = coverId ? document.getElementById(coverId) : null;
      const shell = nav.closest('.site-shell');
      const flow = shell?.querySelectorAll('.site-page, .homepage-content') ?? [];
      let bounds: { id: string; top: number; bottom: number }[] = [];
      let coverTop: number | null = null;
      let navTop = 0;
      let navBottom = 0;
      let viewportHeight = 0;
      let pageHeight = 0;

      layout = observeLayout([nav, ...targets.values(), ...flow, ...(shell ? [shell] : []), ...(coverEl ? [coverEl] : [])], () => {
        const scrollY = window.scrollY;
        bounds = Array.from(targets, ([id, element]) => {
          const rect = element.getBoundingClientRect();
          return { id, top: rect.top + scrollY, bottom: rect.bottom + scrollY };
        });
        coverTop = coverEl ? coverEl.getBoundingClientRect().top + scrollY : null;
        const rect = nav.getBoundingClientRect();
        navTop = rect.top;
        navBottom = rect.bottom;
        viewportHeight = window.innerHeight;
        pageHeight = document.documentElement.scrollHeight;
        measure();
      }, () => {
        const scrollY = window.scrollY;
        const first = bounds.find((item) => item.id === items[0]?.id);
        const last = bounds.find((item) => item.id === items.at(-1)?.id);
        // Leave space below the hero bend before fading in.
        const pastStart = Boolean(first && first.bottom - scrollY + 64 < navTop);
        // Fade out before the lower bend reaches the ticks.
        const pastEnd = coverTop === null
          ? Boolean(last && last.bottom - scrollY <= viewportHeight / 2)
          : coverTop - scrollY <= navBottom + 96;
        visible = pastStart && !pastEnd;

        const probe = scrollY + Math.round(viewportHeight * 0.6);
        let next = items[0]?.id ?? '';
        for (const item of bounds) {
          if (item.top <= probe) next = item.id;
        }
        if (scrollY + viewportHeight >= pageHeight - 2) next = items.at(-1)?.id ?? next;
        activeId = next;
      });
      window.addEventListener('scroll', onScroll, { passive: true });
    });

    return () => {
      disposed = true;
      layout?.destroy();
      window.removeEventListener('scroll', onScroll);
      targets.clear();
    };
  });

  function measure() {
    if (!desktop.current || !listEl) return;
    const links = listEl.querySelectorAll('a');
    const next = Array.from(links, (el) => {
      const rect = el.getBoundingClientRect();
      return rect.top + rect.height / 2;
    });
    if (next.length !== centers.length || next.some((center, index) => center !== centers[index])) centers = next;
    if (next.length > 1) pitch = next[1] - next[0];
  }

  function onPointerEnter(event: PointerEvent) {
    measure();
    onPointer(event);
  }

  function onPointer(event: PointerEvent) {
    hoverY = event.clientY;
  }

  function onLeave() {
    hoverY = null;
  }

  function onFocus(id: string) {
    measure();
    focusedId = id;
  }

  function onFocusOut(event: FocusEvent) {
    const next = event.relatedTarget;
    if (next instanceof Node && listEl?.contains(next)) return;
    focusedId = '';
  }

  function tickVars(width: number, height: number) {
    return `--tick-w: ${width}px; --tick-h: ${height}px`;
  }

  function tickStyle(index: number, isActive: boolean) {
    const restW = isActive ? ACTIVE_W : REST_W;
    const restH = isActive ? MAX_H : REST_H;

    if (magnetY == null) return tickVars(restW, restH);

    if (reduceMotion.current) {
      const expanded = isActive || index === hotIndex;
      return tickVars(expanded ? ACTIVE_W : restW, expanded ? MAX_H : restH);
    }

    const t = Math.max(0, 1 - Math.abs((centers[index] ?? magnetY) - magnetY) / (pitch * FALL_OFF));
    return tickVars(
      Math.max(restW, REST_W + (MAX_W - REST_W) * t),
      Math.max(restH, REST_H + (MAX_H - REST_H) * t)
    );
  }

  function jumpTo(event: MouseEvent, id: string) {
    const el = targets.get(id);
    if (!el) return;

    event.preventDefault();
    el.scrollIntoView({ behavior: reduceMotion.current ? 'auto' : 'smooth', block: 'start' });
    replaceState(`#${id}`, page.state);
  }
</script>

<nav
  bind:this={navEl}
  class={[
    'z-(--layer-chrome) pointer-events-none fixed left-[calc(var(--homepage-band-width)*3.5-20px)] top-1/2 hidden -translate-y-1/2 transition-opacity duration-[180ms] ease-[ease] motion-reduce:transition-none lg:block',
    visible ? 'opacity-100' : 'opacity-0'
  ]}
  aria-label="On this page"
  inert={!visible}
>
  <ul
    bind:this={listEl}
    class="pointer-events-auto flex w-10 flex-col items-center py-1"
    onpointerenter={onPointerEnter}
    onpointermove={onPointer}
    onpointerleave={onLeave}
    onfocusout={onFocusOut}
  >
    {#each sections as section, index (section.id)}
      {@const isActive = currentId === section.id}
      {@const isHot = index === hotIndex}
      <li class="w-full">
        <a
          href="#{section.id}"
          class="group relative flex h-[14px] w-full items-center justify-center focus-visible:outline-none"
          style={tickStyle(index, isActive)}
          aria-current={isActive ? 'location' : undefined}
          aria-label={section.label}
          onfocus={() => onFocus(section.id)}
          onclick={(event) => jumpTo(event, section.id)}
        >
          <span class={['pointer-events-none absolute top-1/2 left-[calc(50%+var(--homepage-band-width)/2+12px)] z-[1] w-max -translate-y-1/2 rounded-[7px] bg-white px-2.5 py-[7px] text-[12px] font-[450] leading-none text-ink whitespace-nowrap shadow-[0_6px_16px_color-mix(in_srgb,var(--color-ink)_18%,transparent)] transition-[opacity,translate] duration-[160ms] ease-[ease] group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none', isHot ? 'translate-x-0 opacity-100' : '-translate-x-[3px] opacity-0']} aria-hidden="true">{section.label}</span>
          <span class={['block h-[var(--tick-h,2px)] w-[var(--tick-w,8px)] rounded-full transition-[width,height,background-color] duration-[180ms] ease-[ease] group-focus-visible:bg-white group-focus-visible:outline-2 group-focus-visible:outline-offset-[3px] group-focus-visible:outline-white motion-reduce:transition-none', isActive || isHot ? 'bg-white' : 'bg-white/45']} aria-hidden="true"></span>
        </a>
      </li>
    {/each}
  </ul>
</nav>
