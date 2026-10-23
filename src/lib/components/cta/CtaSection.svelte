<script lang="ts">
  import ContentMeasure from '$lib/components/ui/ContentMeasure.svelte';
  import ButtonLink from '$lib/components/ui/ButtonLink.svelte';
  import { BOOK_DEMO_URL } from '$lib/data/booking';
  import { createPortalAuthUrl } from '$lib/utils/portal-auth';

  let { id }: { id?: string } = $props();
</script>

<section {id} class="brand-cta bg-brand-dark px-[18px] py-[72px] text-white sm:px-8 sm:py-[90px]">
  <img
    src="/denu-dinosaur.svg"
    alt=""
    aria-hidden="true"
    width="210"
    height="200"
    class="cta-dinosaur"
  />
  <ContentMeasure maxWidth="var(--site-footer-content-width)" class="flex flex-col items-center gap-[33px] text-center md:flex-row md:justify-between md:gap-8 md:text-left">
    <div>
      <h2 class="font-heading text-[26px] leading-[1.08] sm:text-[38px] sm:leading-[1.06]">
        Speed up your sales cycle
      </h2>

      <p class="mt-[12px] max-w-[600px] text-[17px] font-book leading-[1.6] text-white/75">
        Let your reps close deals faster without waiting for a long back-and-forth between lawyers.
      </p>
    </div>

    <div class="flex shrink-0 flex-wrap items-center justify-center gap-[12px]">
      <ButtonLink
        href={createPortalAuthUrl('join', '/')}
        target="_blank"
        rel="noopener noreferrer"
        variant="inverse"
        size="large-plus"
      >
        Start for free
      </ButtonLink>
      <ButtonLink
        href={BOOK_DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        variant="inverse-outline"
        size="large-plus"
      >
        Book a demo
      </ButtonLink>
    </div>
  </ContentMeasure>
</section>

<style>
  .brand-cta {
    position: relative;
  }

  .cta-dinosaur {
    display: none;
    position: absolute;
    bottom: 100%;
    right: clamp(16px, calc(3vw - 2px), 42px);
    width: 123.5px;
    height: auto;
    pointer-events: none;
    user-select: none;
  }

  @media (min-width: 64rem) {
    .cta-dinosaur {
      display: block;
    }
  }
</style>
