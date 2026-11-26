<script lang="ts">
  import { CUSTOMER_BRANDS, CUSTOMER_TESTIMONIALS } from '$lib/data/customers';
</script>

<div class="grid gap-[34px] md:grid-cols-3 md:gap-x-[32px] lg:gap-x-[40px]">
  {#each CUSTOMER_TESTIMONIALS as testimonial (testimonial.brandId)}
    {@const brand = CUSTOMER_BRANDS.find((brand) => brand.id === testimonial.brandId)!}
    <figure class="flex min-w-0 flex-col border-t border-line pt-[18px] sm:pt-[20px]">
      <div class="mb-[16px] flex h-[40px] items-center sm:mb-[18px]">
        <img
          src={brand.src}
          alt=""
          width={brand.width}
          height={brand.height}
          class="block max-w-full w-auto object-contain object-left"
          class:brightness-0={brand.id === 'replit'}
          style={`height: ${testimonial.displayHeight}px`}
        />
      </div>

      <blockquote
        class="flex-1 font-heading text-[16.5px] font-book italic leading-[1.42] text-ink sm:text-[18.5px]"
      >
        “{testimonial.quote}”
      </blockquote>

      <figcaption class="mt-[18px] flex flex-col gap-[4px] text-[14px] font-book leading-[1.4] sm:text-[15px]">
        <span class="text-ink">{testimonial.name}</span>
        <span class="text-ink-muted">{testimonial.role}, {brand.name}</span>
      </figcaption>
    </figure>
  {/each}
</div>
