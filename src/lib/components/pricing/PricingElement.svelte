<script lang="ts">
  import { onMount } from 'svelte';
  import PricingBackground from './PricingBackground.svelte';
  import PricingSlider from './PricingSlider.svelte';
  import {
    FREE_ALLOWANCE,
    FIRST_GROWTH_STOP,
    MAX_GROWTH_CONTRACTS,
    PRICING_STOPS,
    PRICING_TIERS,
    STOP_POSITIONS,
    derivePricingDetails,
    getNearestStop,
    type PricingTier
  } from './pricing-model';

  type ButtonState = 'selected' | 'departed' | 'idle';

  let position = $state(STOP_POSITIONS[FIRST_GROWTH_STOP]);
  let buttonSelection = $state<{ tier: PricingTier; departed: boolean }>({
    tier: PRICING_STOPS[FIRST_GROWTH_STOP].tier,
    departed: false
  });
  let selectedStop = $derived(getNearestStop(position));
  let details = $derived(derivePricingDetails(selectedStop));
  let root: HTMLDivElement;
  let showStickyBar = $state(false);

  function updatePosition(next: number) {
    position = next;
    // The selected button regains emphasis when dragging back into its tier.
    buttonSelection.departed = PRICING_STOPS[getNearestStop(next)].tier !== buttonSelection.tier;
  }

  function commitPosition(next: number) {
    position = next;
    buttonSelection = { tier: PRICING_STOPS[getNearestStop(next)].tier, departed: false };
  }

  function getButtonState(tier: PricingTier): ButtonState {
    if (tier !== buttonSelection.tier) return 'idle';
    return buttonSelection.departed ? 'departed' : 'selected';
  }

  // Ported from hn: only plan conversion buttons participate in bar visibility.
  onMount(() => {
    const element = root;
    const phone = window.matchMedia('(max-width: 809.98px)');
    let frame = 0;

    function visible(bounds: DOMRect) {
      return bounds.height > 0 && bounds.bottom > 0 && bounds.top < window.innerHeight;
    }

    function calculate() {
      frame = 0;
      const buttons = Array.from(element.querySelectorAll('[data-plan] [data-state]'), (button) =>
        button.getBoundingClientRect()
      ).filter((bounds) => bounds.height > 0);
      const footer = document.querySelector('footer')?.getBoundingClientRect();
      showStickyBar = phone.matches
        && buttons.some((bounds) => bounds.bottom <= 0)
        && !buttons.some(visible)
        && !(footer && visible(footer));
    }

    function schedule() {
      frame ||= requestAnimationFrame(calculate);
    }

    calculate();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  });

  // Match the source body portal without introducing a portal dependency.
  function portal(node: HTMLDivElement) {
    document.body.appendChild(node);
    return { destroy: () => node.remove() };
  }

  // Ported from hn: summary navigation scrolls without changing pricing selection.
  function scrollToPlan(button: HTMLButtonElement) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.querySelector(`section[data-plan="${button.dataset.plan}"]`)
      ?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  }
</script>

{#snippet price(amount: string, note: string, monthly: boolean)}
  <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
    <span class="
      font-pricing-newsreader text-[36px] font-book leading-none tracking-[-0.04em] text-pricing-ink tabular-nums
      [font-optical-sizing:none]
    ">{amount}</span>
    {#if monthly}
      {' '}<span class="text-[0.9375rem] text-pricing-muted">/ month</span>
    {/if}
  </div>
  <p class="mt-0.5 text-[0.8125rem] leading-[1.45] text-pretty text-pricing-muted">{note}</p>
{/snippet}

{#snippet cta(label: string, state: ButtonState, href?: string)}
  <svelte:element
    this={href ? 'a' : 'button'}
    type={href ? undefined : 'button'}
    {href}
    data-state={state}
    class="
      relative isolate m-0 inline-flex h-11 w-full cursor-pointer appearance-none items-center justify-center
      rounded-full border-0 bg-transparent px-5 py-0 text-[0.9375rem] font-medium whitespace-nowrap
      text-pricing-surface no-underline
      [transition:opacity_150ms_ease,transform_100ms_ease,color_420ms_ease,box-shadow_420ms_ease] before:absolute
      before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-pricing-ink before:content-['']
      before:[transition:background_480ms_cubic-bezier(0.23,1,0.32,1),opacity_480ms_cubic-bezier(0.23,1,0.32,1),transform_620ms_cubic-bezier(0.23,1,0.32,1)]
      active:[transform:scale(0.98)] focus-visible:outline-2 focus-visible:outline-offset-[3px]
      focus-visible:outline-pricing-ink data-[state=idle]:text-pricing-ink
      data-[state=idle]:shadow-[inset_0_0_0_1px_var(--color-pricing-border)]
      data-[state=idle]:[transition-duration:150ms,100ms,260ms,260ms] data-[state=idle]:before:opacity-0
      data-[state=idle]:before:[transform:scale(0.9,0.7)] data-[state=idle]:before:duration-[260ms]
      data-[state=departed]:before:opacity-75 data-[state=departed]:before:duration-[260ms] hover:opacity-[0.88]
      data-[state=idle]:hover:opacity-100 data-[state=idle]:hover:shadow-[inset_0_0_0_1px_#a3a29d]
      motion-reduce:transition-none motion-reduce:before:transition-none
    "
  >{label}</svelte:element>
{/snippet}

<div class="
  relative mx-auto w-full min-w-0 max-w-[1248px] font-pricing-inter text-[12px] font-normal text-pricing-ink
  antialiased [font-style:normal] [line-height:normal]
" bind:this={root}>
  <div class="
    @container/lm rounded-3xl border border-pricing-border bg-pricing-card p-[clamp(12px,2%,20px)]
    max-[810px]:rounded-none max-[810px]:border-0 max-[810px]:bg-transparent max-[810px]:p-0
  ">
    <div class="mb-4 hidden grid-cols-3 overflow-hidden rounded-2xl border border-pricing-border max-[810px]:grid">
      {#each [
        { tier: 'free', name: 'Free', price: '$0', monthly: false },
        { tier: 'growth', name: 'Growth', price: details.growth.price, monthly: true },
        { tier: 'custom', name: 'Custom', price: 'Custom', monthly: false }
      ] as plan, index (plan.tier)}
        {#if index > 0}
          <span class="sr-only"> · </span>
        {/if}
        <button
          type="button"
          class="
            m-0 flex min-h-[76px] min-w-0 cursor-pointer flex-col gap-1.5 border-0 border-l border-pricing-border
            bg-transparent px-3 pt-3 pb-3.5 text-left text-pricing-ink [-webkit-tap-highlight-color:transparent]
            first:border-l-0 focus-visible:rounded-[15px] focus-visible:outline-2 focus-visible:-outline-offset-2
            focus-visible:outline-pricing-ink data-[plan=growth]:bg-pricing-mobile-growth
          "
          data-plan={plan.tier}
          onclick={(event) => scrollToPlan(event.currentTarget)}
        >
          <span class="text-[0.8125rem] font-medium tracking-[-0.01em] text-pricing-muted">{plan.name}</span>
          {' '}
          <span class="flex flex-wrap items-baseline gap-x-1 gap-y-0.5">
            <span class="
              font-pricing-newsreader text-2xl font-book leading-none tracking-[-0.03em] text-pricing-ink tabular-nums
              [font-optical-sizing:none]
            ">{plan.price}</span>
            {#if plan.monthly}
              {' '}<span class="text-xs text-pricing-muted [line-height:normal]">/ month</span>
            {/if}
          </span>
        </button>
      {/each}
    </div>

    <div class="
      grid grid-cols-3 grid-rows-[repeat(7,auto)] gap-x-3 [--lm-pad:24px] @max-[1000px]/lm:[--lm-pad:18px]
      @max-[719px]/lm:flex @max-[719px]/lm:flex-col @max-[719px]/lm:gap-4
    ">
      {#each PRICING_TIERS as tier, column (tier)}
        <div
          class="
            pointer-events-none relative row-span-full -mx-11 -my-7 overflow-hidden opacity-0 transition-opacity
            duration-[320ms] ease-[ease]
            [mask-image:linear-gradient(to_right,transparent,#000_80px,#000_calc(100%_-_80px),transparent),linear-gradient(transparent,#000_56px,#000_calc(100%_-_56px),transparent)]
            [mask-composite:intersect] data-[active=true]:opacity-100 motion-reduce:transition-none @max-[719px]/lm:hidden
          "
          style:grid-column={column + 1}
          data-active={details.activeTier === tier}
          aria-hidden="true"
        >
          <PricingBackground active={details.activeTier === tier} pattern={tier} />
        </div>
      {/each}

      {#each PRICING_TIERS as tier, column (tier)}
        <section
          class="
            relative z-1 row-span-full grid min-w-0 grid-rows-subgrid text-sm leading-[1.5] text-pretty text-pricing-muted
            [overflow-wrap:break-word] data-[active=true]:text-pricing-ink max-[810px]:scroll-mt-[88px] [&_b]:font-medium
            [&_b]:text-pricing-ink [&>div]:transition-opacity [&>div]:duration-[240ms] [&>div]:ease-[ease]
            motion-reduce:[&>div]:transition-none
            @min-[719px]/lm:data-[active=false]:[&>div:not([data-cell=cta])]:opacity-75 @max-[719px]/lm:block
            @max-[719px]/lm:rounded-[20px] @max-[719px]/lm:border @max-[719px]/lm:border-pricing-border
            @max-[719px]/lm:data-[plan=growth]:-order-1 @max-[719px]/lm:data-[plan=growth]:border-pricing-border-strong
            @max-[719px]/lm:data-[plan=growth]:bg-pricing-mobile-growth
          "
          style:grid-column={column + 1}
          data-active={details.activeTier === tier}
          data-plan={tier}
          aria-label={`${tier === 'free' ? 'Free' : tier === 'growth' ? 'Growth' : 'Custom'} plan`}
        >
          <div class="min-w-0 px-[var(--lm-pad)] pt-4 pb-1 @max-[719px]/lm:px-5 @max-[719px]/lm:pt-5">
            <div class="text-[0.875rem] font-medium tracking-[-0.01em] text-pricing-ink">{tier === 'free' ? 'Free' : tier === 'growth' ? 'Growth' : 'Enterprise'}</div>
          </div>
          <div class="flex min-w-0 flex-col gap-2.5 px-[var(--lm-pad)] pt-2 pb-5 @max-[719px]/lm:px-5 @max-[719px]/lm:pb-4">
            {#if tier === 'free'}
              {@render price('$0', 'Free forever', false)}
            {:else if tier === 'growth'}
              {@render price(details.growth.price, 'Only pay for signed contracts', true)}
            {:else}
              {@render price('Custom', 'More security and priority support', false)}
            {/if}
          </div>
          <div class="
            min-w-0 px-[var(--lm-pad)] pt-3.5 pb-0 @max-[719px]/lm:border-t @max-[719px]/lm:border-pricing-border
            @max-[719px]/lm:px-5 @max-[719px]/lm:py-3
          ">
            {#if tier === 'free'}
              Up to <b>{FREE_ALLOWANCE}</b> signed contracts
            {:else if tier === 'growth'}
              Up to <b>{details.growth.contracts}</b> signed contracts
            {:else if details.customContracts === null}
              Over <b>{MAX_GROWTH_CONTRACTS}</b> signed contracts
            {:else}
              <b>{details.customContracts}</b> signed contracts
            {/if}
          </div>
          <div
            class="
              min-w-0 p-0 @max-[719px]/lm:px-5 @max-[719px]/lm:pt-4 @max-[719px]/lm:pb-6
              @max-[719px]/lm:data-[spacer=true]:hidden
            "
            data-spacer={tier !== 'growth'}
            aria-hidden={tier !== 'growth' ? true : undefined}
          >
            {#if tier === 'growth'}
              <PricingSlider {position} mode="mobile" onPositionChange={updatePosition} onCommit={commitPosition} />
            {/if}
          </div>
          <div class="
            min-w-0 px-[var(--lm-pad)] py-3.5 @max-[719px]/lm:border-t @max-[719px]/lm:border-pricing-border
            @max-[719px]/lm:px-5 @max-[719px]/lm:py-3
          ">
            {#if tier === 'free'}
              Get set up in 30 minutes
            {:else if tier === 'growth'}
              Only pay <b>if contracts get signed</b>
            {:else}
              Priority support and migration help
            {/if}
          </div>
          <div class="
            min-w-0 px-[var(--lm-pad)] py-3.5 @max-[719px]/lm:border-t @max-[719px]/lm:border-pricing-border
            @max-[719px]/lm:px-5 @max-[719px]/lm:py-3
          ">
            {#if tier === 'free'}
              <b>Free forever</b> up to 5 contracts per month
            {:else if tier === 'growth'}
              Support from Dinu's Legal Ops Managers
            {:else}
              <b>SSO</b> for you and your buyers
            {/if}
          </div>
          <div data-cell="cta" class="
            min-w-0 px-[var(--lm-pad)] pt-5 pb-4 @min-[719px]/lm:has-[[data-state=idle]]:opacity-75
            @max-[719px]/lm:border-t @max-[719px]/lm:border-pricing-border @max-[719px]/lm:px-5 @max-[719px]/lm:pt-4
            @max-[719px]/lm:pb-5
          ">
            {@render cta(tier === 'custom' ? 'Contact us' : 'Start for free', getButtonState(tier), tier === 'custom' ? 'mailto:julien@dinu.co' : undefined)}
          </div>
        </section>
      {/each}

      <PricingSlider {position} onPositionChange={updatePosition} onCommit={commitPosition} />

      {#each [3, 5, 6, 7] as row (row)}
        <div class="pointer-events-none z-1 col-span-full h-0 self-start border-t border-pricing-border @max-[719px]/lm:hidden" style:grid-row={row} aria-hidden="true"></div>
      {/each}
    </div>
  </div>
</div>

{#if showStickyBar}
  <div class="
    fixed inset-x-0 bottom-0 z-10 m-0 hidden w-auto max-w-none border-t border-pricing-border bg-pricing-surface
    px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] font-pricing-inter text-[12px] font-normal
    text-pricing-ink antialiased [font-style:normal] [line-height:normal] max-[810px]:block
    motion-safe:animate-pricing-bar-in
  " use:portal>
    {@render cta('Start for free', 'selected')}
  </div>
{/if}
