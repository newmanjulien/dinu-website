<script lang="ts">
  import { CUSTOMER_BRANDS as brands } from '$lib/data/customers';

  type Alignment = 'left' | 'center';

  type Props = {
    interactive?: boolean;
    animate?: boolean;
    class?: string;
  } & (
    | {
        layout?: 'default';
        count?: number;
        columns?: number;
        mobileColumns?: number;
        mobileCount?: number;
        align?: Alignment;
      }
    | {
        layout: 'demo';
        count?: never;
        columns?: never;
        mobileColumns?: never;
        mobileCount?: never;
        align?: never;
      }
  );

  let {
    count = brands.length,
    interactive = false,
    columns,
    mobileColumns,
    mobileCount,
    layout = 'default',
    align = 'center',
    animate = true,
    class: className = ''
  }: Props = $props();

  const logoSlots = $derived(
    layout === 'demo' ? brands : brands.slice(0, Math.max(0, Math.floor(count)))
  );
</script>

<p class="sr-only">
  Customers since 2026 include {brands.map((brand) => brand.name).join(', ')}.
</p>

{#snippet logos()}
  <div
    class={[
      'customer-logos [--logo-scale:0.9025] relative z-[2] mx-auto w-full items-center',
      layout === 'demo' ? `
        flex justify-between lg:gap-[33px] max-lg:gap-[clamp(16px,2.5cqw,24px)]
      ` : [
        'max-w-[880px] gap-[clamp(26px,calc(2.3vw+5px),36px)] px-2 max-md:max-w-[420px] max-md:gap-[clamp(23px,calc(4.75vw+4px),31px)] max-md:px-0',
        columns !== undefined ? 'grid grid-cols-[repeat(var(--desktop-columns),minmax(0,1fr))] gap-y-2.5 max-md:grid-cols-[repeat(var(--mobile-columns),minmax(0,1fr))] max-md:gap-y-6' : 'flex',
        align === 'center' ? 'justify-center justify-items-center' : 'justify-start justify-items-start',
        className
      ]
    ]}
    data-layout={layout}
    style={`--desktop-columns: ${columns ?? 1}; --mobile-columns: ${
      mobileColumns ?? columns ?? 1
    };`}
    aria-hidden="true"
  >
    {#each logoSlots as brand, index (brand.id)}
      <div
        class={[
          'logo-item group/logo relative grid h-9 min-w-0 place-items-center first:[--tooltip-anchor:0%] last:[--tooltip-anchor:100%]',
          layout === 'demo' ? 'lg:flex-none max-lg:flex-[0_1_calc(var(--logo-height)*var(--logo-ratio)*var(--logo-scale))]' : 'flex-none',
          animate && 'motion-safe:animate-[logo-enter_220ms_cubic-bezier(0.22,1,0.36,1)_calc(var(--logos-enter-delay,0ms)+var(--logo-index)*70ms)_both]',
          layout === 'default' && mobileCount !== undefined && index >= mobileCount && 'max-md:hidden',
          layout === 'default' && mobileCount !== undefined && index === mobileCount - 1 && 'max-md:[--tooltip-anchor:100%]',
          layout === 'demo' && [
            index >= 8 && 'max-lg:hidden lg:@max-[960px]/customer-logos:hidden',
            index === 7 && 'max-lg:[--tooltip-anchor:100%] lg:@max-[960px]/customer-logos:[--tooltip-anchor:100%]',
            index >= 9 && 'lg:@max-[1100px]/customer-logos:hidden',
            index === 8 && 'lg:@max-[1100px]/customer-logos:[--tooltip-anchor:100%]',
            index >= 10 && 'lg:@max-[1225px]/customer-logos:hidden',
            index === 9 && 'lg:@max-[1225px]/customer-logos:[--tooltip-anchor:100%]',
            index >= 3 && 'max-lg:@max-[380px]/customer-logos:hidden',
            index === 2 && 'max-lg:@max-[380px]/customer-logos:[--tooltip-anchor:100%]',
            index >= 4 && 'max-lg:@max-[500px]/customer-logos:hidden',
            index === 3 && 'max-lg:@max-[500px]/customer-logos:[--tooltip-anchor:100%]',
            index >= 5 && 'max-lg:@max-[600px]/customer-logos:hidden',
            index === 4 && 'max-lg:@max-[600px]/customer-logos:[--tooltip-anchor:100%]',
            index >= 6 && 'max-lg:@max-[720px]/customer-logos:hidden',
            index === 5 && 'max-lg:@max-[720px]/customer-logos:[--tooltip-anchor:100%]',
            index >= 7 && 'max-lg:@max-[840px]/customer-logos:hidden',
            index === 6 && 'max-lg:@max-[840px]/customer-logos:[--tooltip-anchor:100%]'
          ]
        ]}
        style:--logo-index={index}
        style={`--logo-ratio: ${brand.width / brand.height}; --logo-height: ${brand.displayHeight};`}
      >
        <span class={['block h-(--logo-height) aspect-(--logo-ratio) [transform:scale(var(--logo-scale))]', layout === 'demo' && 'lg:h-[calc(var(--logo-height)*var(--logo-scale))] lg:transform-none max-lg:min-w-0 max-lg:h-auto max-lg:justify-self-stretch max-lg:transform-none']}>
          <img class="block h-full w-full object-contain" src={brand.src} alt="" width={brand.width} height={brand.height} />
        </span>

        {#if interactive}
          <span class="
            pointer-events-none absolute top-[calc(100%+7px)] left-[var(--tooltip-anchor,50%)] z-[1] w-max rounded-[7px]
            bg-ink px-2 py-[6px] text-[11px] font-[450] leading-none text-white whitespace-nowrap
            shadow-[0_6px_16px_color-mix(in_srgb,var(--color-ink)_18%,transparent)] opacity-0
            [transform:translateX(calc(-1*var(--tooltip-anchor,50%)))] group-hover/logo:opacity-100
          ">
            {brand.name} <span class="font-normal">· Customer since 2026</span>
          </span>
        {/if}
      </div>
    {/each}
  </div>
{/snippet}

{#if layout === 'demo'}
  <div class={`w-full @container/customer-logos ${className}`}>
    {@render logos()}
  </div>
{:else}
  {@render logos()}
{/if}
