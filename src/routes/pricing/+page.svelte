<script lang="ts">
  import Subpage from '$lib/components/site/Subpage.svelte';
  import PricingElement from '$lib/components/pricing/PricingElement.svelte';
  import { FREE_ALLOWANCE, MAX_GROWTH_CONTRACTS, PRICING_BANDS } from '$lib/components/pricing/pricing-model';
  import { CUSTOMER_BRANDS } from '$lib/data/customers';

  const pricingBrands = CUSTOMER_BRANDS.filter((brand) => brand.id !== 'algolia');

  const faqs = [
    {
      question: "Wait, what’s your price again?",
      answers: [
        `Up to ${FREE_ALLOWANCE} signed contracts each month is free. Once you exceed that limit, Growth charges for all signed contracts, starting at $${PRICING_BANDS[0].rate} each.`
      ]
    },
    {
      question: 'How is a signed contract defined?',
      answers: [
        'A signed contract is a contract which you send to a buyer and which gets signed by that buyer.'
      ]
    },
    {
      question: 'What does the free plan include?',
      answers: [
        `The free plan includes up to ${FREE_ALLOWANCE} signed contracts each month.`
      ]
    },
    {
      question: 'Do you charge for team seats?',
      answers: [
        'No, Dinu does not charge for team seats. You can invite your team without adding a separate per-seat fee to your plan.'
      ]
    }
  ] as const;
</script>

<Subpage
  title="Free plan & contract-based plan"
  heading="Pricing"
  description={`Get up to ${FREE_ALLOWANCE} contracts signed each month for free. Then pay a small fee per signed contract.`}
  descriptionClass="mx-auto max-w-[590px]"
  centered
>
  {#snippet wideContent()}
    <section aria-label="Plans" class="box-border mx-auto -mt-2 w-full max-w-[1296px] px-6">
      <PricingElement />
    </section>
  {/snippet}

  <section aria-label="Customers" class="mt-[71px] sm:mt-[83px]">
    <p class="sr-only">
      Customers include {pricingBrands.map((brand) => brand.name).join(', ')}.
    </p>
    <div
      class="flex flex-wrap justify-center gap-[12px]"
      aria-hidden="true"
    >
      {#each pricingBrands as brand (brand.id)}
        <div class="flex h-[68px] w-[calc((100%-12px)/2)] items-center justify-center rounded-[10px] bg-[#f3f3f2] px-5 sm:h-[72px] sm:w-[calc((100%-24px)/3)] md:w-[calc((100%-48px)/5)]">
          <img
            src={brand.src}
            alt=""
            width={brand.width}
            height={brand.height}
            class="block max-w-full w-auto scale-95 object-contain"
            style:height={`${brand.tileHeight}px`}
          />
        </div>
      {/each}
    </div>
  </section>

  <section
    aria-labelledby="pricing-faq-heading"
    class="mt-[76px] grid grid-cols-1 gap-y-[36px] sm:mt-[96px] md:grid-cols-[minmax(220px,330px)_minmax(0,1fr)] md:gap-x-[48px] lg:gap-x-[64px]"
  >
    <h2
      id="pricing-faq-heading"
      class="font-heading text-[19px] font-book leading-[1.35] text-ink sm:text-[21px] md:sticky md:top-[52px] md:self-start"
    >
      Frequently Asked Questions
    </h2>

    <div class="max-w-[660px] space-y-[34px] sm:space-y-[40px]">
      {#each faqs as item (item.question)}
        <div>
          <h3 class="font-heading text-[19px] font-book leading-[1.35] text-ink sm:text-[21px]">
            {item.question}
          </h3>
          <div class="mt-[10px] space-y-[14px] text-[16px] font-light leading-[1.65] text-ink-muted sm:text-[17px]">
            {#each item.answers as paragraph}
              <p>{paragraph}</p>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </section>
</Subpage>

