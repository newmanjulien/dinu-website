<script lang="ts">
  import { BOOK_DEMO_URL } from '$lib/data/booking';
  import ButtonLink from '$lib/components/ui/ButtonLink.svelte';
  import SiteContainer from '$lib/components/ui/SiteContainer.svelte';
  import CustomerLogos from '$lib/components/marketing/CustomerLogos.svelte';
  import ProductAnimation from '$lib/components/product-animation/ProductAnimation.svelte';
  import { createPortalAuthUrl } from '$lib/utils/portal-auth';

  let { id }: { id?: string } = $props();
</script>

<section
  {id}
  class={[
    'homepage-hero lg:relative lg:z-[1] pt-[calc(105px-var(--site-mobile-header-height))] lg:pt-[60px]',
    id && 'scroll-mt-[18px] lg:scroll-mt-12'
  ]}
>
  <SiteContainer class="flex flex-col items-start text-left">
    <h1
      class="font-heading font-text text-[47px] leading-[1.04] text-ink sm:text-[44px]"
    >
      Keep your contracts moving
    </h1>

    <p
      class="
        motion-safe:animate-[hero-content-enter_320ms_cubic-bezier(0.22,1,0.36,1)_590ms_both] mt-[8px] max-w-[630px]
        font-light text-[21px] leading-[1.40] text-ink-muted
      "
    >
    Dinu gives sales reps the guardrails, information and support they need to handle contract negotiation themselves.
    </p>

    <div class="
      motion-safe:animate-[hero-content-enter_620ms_cubic-bezier(0.22,1,0.36,1)_690ms_both]
      motion-safe:[--hero-enter-offset:10px] mt-[28px] flex flex-wrap items-center gap-[12px]
    ">
      <ButtonLink
        href={createPortalAuthUrl('join', '/')}
        target="_blank"
        rel="noopener noreferrer"
        variant="primary"
        size="large"
        shape="soft-pill"
        class="h-[44px]! shadow-[0_4px_10px_rgba(32,33,36,0.18)] motion-safe:hover:-translate-y-[2px] hover:shadow-[0_5px_12px_rgba(32,33,36,0.18)]"
      >
        Start for free
      </ButtonLink>
      <ButtonLink
        href={BOOK_DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        size="large"
        class="h-[44px]!"
      >
        Book a demo
      </ButtonLink>
    </div>
    <div class="relative motion-safe:animate-[hero-content-enter_320ms_cubic-bezier(0.22,1,0.36,1)_690ms_both] [--logos-enter-delay:750ms] mt-[80px] w-full">
      <CustomerLogos
        interactive
        layout="demo"
        class="lg:pr-[max(0px,calc(var(--homepage-rail-width)+2rem-(100vw-100%)/2))] mb-[24px] sm:mb-[28px]"
      />

      <div
        data-hero-demo
        class="
          mx-auto w-[95%] overflow-hidden rounded-[16px] border border-line-mid/70 bg-[#f4f4f5]
          shadow-[0_18px_45px_-24px_rgba(32,33,36,0.28)] sm:w-full sm:rounded-[20px]
        "
      >
        <div
          class="flex h-[38px] items-center gap-[16px] border-b border-line-mid/70 px-[12px] sm:h-[40px] sm:gap-[20px] sm:px-[16px]"
          aria-hidden="true"
        >
          <div class="flex shrink-0 gap-[5px]">
            <span class="size-[7px] rounded-full bg-line-mid"></span>
            <span class="size-[7px] rounded-full bg-line-mid"></span>
            <span class="size-[7px] rounded-full bg-line-mid"></span>
          </div>
          <div class="flex shrink-0 gap-[8px] text-ink-muted">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="m10 4-4 4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="m6 4 4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div class="flex min-w-0 items-center gap-[12px] text-[12px] leading-none sm:text-[13px]">
            <span class="font-medium text-ink">Contract</span>
            <span class="text-ink-muted">/</span>
            <span class="truncate text-ink-muted">Dinu</span>
          </div>
        </div>
        <div class="h-[616px] p-[6px] sm:aspect-[1682/1223] sm:h-auto sm:p-[7px]">
          <div
            class="h-full w-full overflow-hidden rounded-[10px] border border-line bg-surface sm:rounded-[12px]"
          >
            <ProductAnimation
              label="A guided contract negotiation: open Resale, Amendments to Statement of Work, the annual fee increase, Attorneys’ Fees, and Assignment. Explore the advice and apply three concessions, two requiring approval, then click Ask for approval. The walkthrough repeats."
            />
          </div>
        </div>
      </div>
    </div>
  </SiteContainer>
</section>
