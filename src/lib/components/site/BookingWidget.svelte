<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { MediaQuery } from 'svelte/reactivity';
  import { BOOK_DEMO_URL } from '$lib/data/booking';
  import { DESKTOP_QUERY, observeLayout } from '$lib/utils/layout-observer';

  let {
    brandSectionId,
    visible = true,
    widget = $bindable()
  }: {
    brandSectionId?: string;
    visible?: boolean;
    widget?: HTMLDivElement;
  } = $props();

  const DISMISSAL_KEY = 'dinu:book-demo-dismissed';
  const desktop = new MediaQuery(DESKTOP_QUERY);
  let expanded = $state<boolean | null>(null);
  let trigger = $state<HTMLButtonElement>();
  let link = $state<HTMLAnchorElement>();
  let brandOverlap = $state(0);

  onMount(() => {
    try {
      expanded = localStorage.getItem(DISMISSAL_KEY) !== 'true';
    } catch {
      expanded = true;
    }
  });

  $effect(() => {
    const element = widget;
    const sectionId = brandSectionId;
    const view = expanded;
    if (!desktop.current || !element || !sectionId || view === null) {
      brandOverlap = 0;
      return;
    }

    let disposed = false;
    let layout: ReturnType<typeof observeLayout> | undefined;
    const onScroll = () => layout?.refresh();

    void tick().then(() => {
      if (disposed) return;
      const shell = element.closest('.site-shell');
      if (!shell) {
        brandOverlap = 0;
        return;
      }

      let section: Element | null = null;
      const resolveElements = () => {
        section = shell.querySelector(`#${CSS.escape(sectionId)}`);
        const flow = shell.querySelectorAll('.site-page, .homepage-hero, .homepage-content, #site-footer');
        return [shell, element, ...flow, ...(section ? [section] : [])];
      };

      const measure = () => {
        if (!element.isConnected || !shell.contains(element)
          || !section?.isConnected || !shell.contains(section)) {
          brandOverlap = 0;
          return;
        }
        const rect = element.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();
        brandOverlap = rect.height > 0 && sectionRect.height > 0
          ? Math.max(0, Math.min(100, (rect.bottom - sectionRect.top) / rect.height * 100))
          : 0;
      };

      // Sample the new view before paint; subsequent layout and scroll reads are batched.
      resolveElements();
      measure();
      layout = observeLayout(resolveElements, measure, undefined, { mutationRoot: shell });
      window.addEventListener('scroll', onScroll, { passive: true });
    });

    return () => {
      disposed = true;
      layout?.destroy();
      window.removeEventListener('scroll', onScroll);
    };
  });

  async function show() {
    expanded = true;
    await tick();
    link?.focus({ preventScroll: true });
  }

  async function dismiss() {
    expanded = false;
    try {
      localStorage.setItem(DISMISSAL_KEY, 'true');
    } catch {
      // The current view still remembers dismissal when browser storage is unavailable.
    }
    await tick();
    trigger?.focus({ preventScroll: true });
  }
</script>

{#snippet calendar(size: number)}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 2.5a.5.5 0 0 1 .5-.5H9a.5.5 0 0 1 .5.5V5h5V2.5A.5.5 0 0 1 15 2h1.5a.5.5 0 0 1 .5.5V5h2a2 2 0 0 1 2 2v1H3V7a2 2 0 0 1 2-2h2Z" />
    <path fill-rule="evenodd" d="M3 9.5h18V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z M6 12h2.5v2.5H6Z M11 12h2.5v2.5H11Z M16 12h2.5v2.5H16Z M6 17h2.5v2.5H6Z M11 17h2.5v2.5H11Z M16 17h2.5v2.5H16Z" />
    {#each [0, 1, 2, 3, 4, 5] as day}
      <rect
        class="booking-calendar-day"
        x={6 + (day % 3) * 5}
        y={12 + Math.floor(day / 3) * 5}
        width="2.5"
        height="2.5"
        style:--day-delay={`${day * 35}ms`}
      />
    {/each}
  </svg>
{/snippet}

{#snippet face(white: boolean)}
  <div class="booking-face" class:white class:invisible={!white && brandOverlap === 100} aria-hidden="true">
    {#if expanded}
      <div class="flex min-h-[110px] flex-col items-start gap-[10px] p-4">
        {@render calendar(22)}
        <span class="font-heading text-[22px] leading-[1.1] tracking-[-0.035em]">
          <span class="block">Book a</span>
          <span class="block">demo</span>
        </span>
      </div>
      <div class="booking-row flex min-h-[44px] items-center justify-between gap-3 px-4 py-3 text-[13px] leading-[1.3] tracking-[-0.02em]">
        Choose a time
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="booking-arrow">
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      </div>
      <span class="booking-close-face">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
          <path d="m4 4 8 8M12 4l-8 8" />
        </svg>
      </span>
    {:else}
      {@render calendar(23)}
    {/if}
  </div>
{/snippet}

{#if desktop.current && expanded !== null}
  <div class="booking-rail" class:expanded>
    <div class="booking-sticky">
      <div
        bind:this={widget}
        class="booking-widget"
        class:expanded
        class:brand={brandOverlap > 0}
        class:pending={!visible}
        style:--brand-overlap={`${brandOverlap}%`}
      >
        {@render face(false)}
        {@render face(true)}

        {#if expanded}
          <a
            bind:this={link}
            class="booking-action"
            href={BOOK_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a demo — choose a time"
          ></a>
          <button type="button" class="booking-close" aria-label="Close booking widget" onclick={dismiss}></button>
        {:else}
          <button
            bind:this={trigger}
            type="button"
            class="booking-action"
            aria-label="Book a demo"
            aria-expanded="false"
            onclick={show}
          ></button>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .booking-rail {
    position: absolute;
    top: 0;
    right: 10px;
    bottom: var(--site-floating-bottom-clearance);
    z-index: var(--layer-chrome);
    width: max-content;
    pointer-events: none;
  }

  .booking-rail.expanded {
    z-index: var(--layer-chrome-popover);
  }

  .booking-sticky {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    height: calc(100dvh - 20px);
    max-height: 100%;
  }

  .booking-widget {
    position: relative;
    flex-shrink: 0;
    width: 44px;
    border-radius: 8px;
    pointer-events: auto;
    --focus-color: var(--color-ink);
    --face-border: var(--color-line);
    --face-background: var(--color-surface);
    --face-color: var(--color-ink);
    --face-close: #60646c;
    --face-close-hover: #e8e8ec;
    --face-shadow: 0 1px 2px rgb(32 33 36 / 4%), 0 4px 14px rgb(32 33 36 / 8%);
    --face-hover-border: var(--color-line);
    --face-hover-shadow: 0 2px 4px rgb(32 33 36 / 5%), 0 6px 18px rgb(32 33 36 / 10%);
  }

  .booking-widget.expanded {
    width: 160px;
    border-radius: 9px;
    --face-border: #cdced6;
    --face-background: #f9f9f9;
    --face-color: #1c2024;
    --face-shadow: 0 2px 3px rgb(28 25 23 / 4%), 0 8px 18px -8px rgb(28 25 23 / 16%);
    --face-hover-border: #60646c;
    --face-hover-shadow: var(--face-shadow);
  }

  .booking-widget.pending {
    visibility: hidden;
    pointer-events: none;
  }

  .booking-widget.brand {
    --focus-color: white;
  }

  .booking-face {
    position: relative;
    overflow: hidden;
    border: 1px solid var(--face-border);
    border-radius: inherit;
    background: var(--face-background);
    color: var(--face-color);
    box-shadow: var(--face-shadow);
    pointer-events: none;
    clip-path: inset(-16px -16px var(--brand-overlap) -16px);
    transition: background-color 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out;
  }

  .booking-widget:not(.expanded) .booking-face {
    display: grid;
    place-items: center;
    min-height: 44px;
  }

  .booking-widget.expanded .booking-face {
    text-align: left;
  }

  .booking-face.white {
    position: absolute;
    inset: 0;
    clip-path: inset(calc(100% - var(--brand-overlap)) 0 0 0);
    --face-border: rgb(255 255 255 / 35%);
    --face-background: var(--color-brand-dark);
    --face-color: white;
    --face-close: white;
    --face-close-hover: rgb(255 255 255 / 10%);
    --face-shadow: none;
  }

  .booking-widget:has(.booking-action:hover) .booking-face:not(.white) {
    border-color: var(--face-hover-border);
    box-shadow: var(--face-hover-shadow);
    --face-background: var(--color-canvas);
  }

  .booking-widget:has(.booking-action:hover) .booking-face.white {
    --face-border: rgb(255 255 255 / 60%);
    --face-background: color-mix(in srgb, var(--color-brand-dark), white 5%);
  }

  .booking-row {
    border-top: 1px solid var(--face-border);
    background: var(--color-surface);
  }

  .white .booking-row {
    background: none;
  }

  .booking-arrow {
    flex-shrink: 0;
    transition: transform 200ms ease-out;
  }

  .booking-calendar-day {
    opacity: 0;
  }

  .booking-action {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    cursor: pointer;
  }

  .booking-close,
  .booking-close-face {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .booking-close {
    cursor: pointer;
  }

  .booking-close-face {
    display: grid;
    place-items: center;
    color: var(--face-close);
    transition: background-color 150ms ease-out, color 150ms ease-out;
  }

  .booking-widget:has(.booking-close:hover) .booking-close-face {
    background: var(--face-close-hover);
    color: var(--face-color);
  }

  .booking-action:focus-visible,
  .booking-close:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 2px;
  }

  @keyframes booking-enter {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes booking-calendar-pulse {
    0%, 100% { opacity: 0; }
    40%, 60% { opacity: 0.7; }
  }

  @media (prefers-reduced-motion: no-preference) {
    .booking-widget.expanded:not(.pending) .booking-face {
      animation: booking-enter 196ms ease-out;
    }

    .booking-widget:has(.booking-action:hover) .booking-arrow {
      transform: translate(2px, -2px);
    }

    .booking-widget.expanded:has(.booking-action:hover) .booking-calendar-day {
      animation: booking-calendar-pulse 280ms ease-in-out var(--day-delay);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .booking-face,
    .booking-arrow,
    .booking-close-face {
      transition: none;
    }
  }
</style>
