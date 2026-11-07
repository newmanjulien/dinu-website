<script lang="ts">
  const testimonials = [
    {
      quote:
        'Dinu lets our reps close +90% of deals without help from legal.',
      name: 'Maya Chen',
      role: 'VP of Sales',
      company: 'Oceans',
      logo: '/logos/oceans.svg',
      logoWidth: 496,
      logoHeight: 125,
      displayHeight: 32
    },
    {
      quote:
        'Dinu cut our sales cycle by 30% and improved rep productivity by 10%.',
      name: 'Daniel Brooks',
      role: 'CRO',
      company: 'Brex',
      logo: '/logos/brex.svg',
      logoWidth: 800,
      logoHeight: 211,
      displayHeight: 25
    },
    {
      quote:
        'Dinu keeps deals moving and lets legal focus where it matters.',
      name: 'Sophie Laurent',
      role: 'CRO',
      company: 'Vanta',
      logo: '/logos/vanta.svg',
      logoWidth: 716,
      logoHeight: 279,
      displayHeight: 30
    }
  ];
</script>

<div class="grid gap-[34px] md:grid-cols-3 md:gap-x-[32px] lg:gap-x-[40px]">
  {#each testimonials as testimonial}
    <figure class="flex min-w-0 flex-col border-t border-line pt-[18px] sm:pt-[20px]">
      <div class="mb-[16px] flex h-[40px] items-center sm:mb-[18px]">
        <img
          src={testimonial.logo}
          alt=""
          width={testimonial.logoWidth}
          height={testimonial.logoHeight}
          class="block max-w-full w-auto object-contain object-left"
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
        <span class="text-ink-muted">{testimonial.role}, {testimonial.company}</span>
      </figcaption>
    </figure>
  {/each}
</div>
