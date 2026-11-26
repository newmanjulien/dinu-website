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
        class={['opacity-0', expanded && 'motion-safe:group-has-[.booking-action:hover]/booking:animate-[booking-calendar-pulse_280ms_ease-in-out_var(--day-delay)]']}
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
  <div
    class={[
      `
        pointer-events-none overflow-hidden rounded-[inherit] border border-(--face-border)
        transition-[background-color,border-color,box-shadow] duration-200 ease-out motion-reduce:transition-none
      `,
      expanded ? 'text-left' : 'grid min-h-11 place-items-center',
      expanded && visible && 'motion-safe:animate-[booking-enter_196ms_ease-out]',
      white ? `
        absolute inset-0 bg-brand-dark text-white [clip-path:inset(calc(100%-var(--brand-overlap))_0_0_0)]
        [--face-border:rgb(255_255_255/35%)]
        group-has-[.booking-action:hover]/booking:[--face-border:rgb(255_255_255/60%)]
        group-has-[.booking-action:hover]/booking:bg-[color-mix(in_srgb,var(--color-brand-dark),white_5%)]
      ` : [
        'relative text-(--face-color) [clip-path:inset(-16px_-16px_var(--brand-overlap)_-16px)] group-has-[.booking-action:hover]/booking:bg-canvas',
        brandOverlap === 100 && 'invisible',
        expanded ? `
          bg-[#f9f9f9] [--face-border:#cdced6] [--face-color:#1c2024]
          shadow-[0_2px_3px_rgb(28_25_23/4%),0_8px_18px_-8px_rgb(28_25_23/16%)]
          group-has-[.booking-action:hover]/booking:border-[#a0a3ab]
        ` : `
          bg-surface [--face-border:var(--color-line)] [--face-color:var(--color-ink)]
          shadow-[0_1px_2px_rgb(32_33_36/4%),0_4px_14px_rgb(32_33_36/8%)]
          group-has-[.booking-action:hover]/booking:border-line
          group-has-[.booking-action:hover]/booking:shadow-[0_2px_4px_rgb(32_33_36/5%),0_6px_18px_rgb(32_33_36/10%)]
        `
      ]
    ]}
    aria-hidden="true"
  >
    {#if expanded}
      <div class="flex min-h-[110px] flex-col items-start gap-[10px] p-4">
        {@render calendar(22)}
        <span class="font-heading text-[22px] leading-[1.1] tracking-[-0.035em]">
          <span class="block">Book a</span>
          <span class="block">demo</span>
        </span>
      </div>
      <div class={['flex min-h-11 items-center justify-between gap-3 border-t border-(--face-border) px-4 py-3 text-[13px] leading-[1.3] tracking-[-0.02em]', white ? 'bg-transparent' : 'bg-surface']}>
        Choose a time
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="
          shrink-0 transition-transform duration-200 ease-out
          motion-safe:group-has-[.booking-action:hover]/booking:[transform:translate(2px,-2px)]
          motion-reduce:transition-none
        ">
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      </div>
      <span class={[
        `
          absolute top-2 right-2 grid size-6 place-items-center rounded-full transition-[background-color,color]
          duration-150 ease-out motion-reduce:transition-none
        `,
        white ? 'text-white group-has-[.booking-close:hover]/booking:bg-white/10' : 'text-[#60646c] group-has-[.booking-close:hover]/booking:bg-[#e8e8ec] group-has-[.booking-close:hover]/booking:text-(--face-color)'
      ]}>
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
  <div class={[
    `
      pointer-events-none absolute top-0 right-[var(--homepage-band-width)] bottom-4 w-max
      group-[.homepage-shell]/site:bottom-[calc(var(--homepage-rail-width)+var(--site-footer-padding)+16px)]
    `,
    expanded ? 'z-(--layer-chrome-popover)' : 'z-(--layer-chrome)'
  ]}>
    <div class="sticky top-0 flex h-[calc(100dvh-20px)] max-h-full flex-col items-end justify-end">
      <div
        bind:this={widget}
        class={[
          'group/booking relative shrink-0',
          expanded ? 'w-40 rounded-[9px]' : 'w-11 rounded-lg',
          visible ? 'pointer-events-auto' : 'pointer-events-none invisible',
          brandOverlap > 0 ? '[--focus-color:white]' : '[--focus-color:var(--color-ink)]'
        ]}
        style:--brand-overlap={`${brandOverlap}%`}
      >
        {@render face(false)}
        {@render face(true)}

        {#if expanded}
          <a
            bind:this={link}
            class="
              booking-action absolute inset-0 cursor-pointer rounded-[inherit] focus-visible:outline-2
              focus-visible:outline-solid focus-visible:outline-(--focus-color) focus-visible:outline-offset-2
            "
            href={BOOK_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a demo — choose a time"
          ></a>
          <button type="button" class="
            booking-close absolute top-2 right-2 size-6 cursor-pointer rounded-full focus-visible:outline-2
            focus-visible:outline-solid focus-visible:outline-(--focus-color) focus-visible:outline-offset-2
          " aria-label="Close booking widget" onclick={dismiss}></button>
        {:else}
          <button
            bind:this={trigger}
            type="button"
            class="
              booking-action absolute inset-0 cursor-pointer rounded-[inherit] focus-visible:outline-2
              focus-visible:outline-solid focus-visible:outline-(--focus-color) focus-visible:outline-offset-2
            "
            aria-label="Book a demo"
            aria-expanded="false"
            onclick={show}
          ></button>
        {/if}
      </div>
    </div>
  </div>
{/if}
