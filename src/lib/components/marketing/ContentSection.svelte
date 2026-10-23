<script lang="ts">
  import type { Attachment } from 'svelte/attachments';
  import type { Snippet } from 'svelte';
  import ContentMeasure from '../ui/ContentMeasure.svelte';

  let {
    title,
    body,
    children,
    id,
    maxWidth = 936.79
  }: {
    title: string;
    body: Snippet;
    children?: Snippet;
    id?: string;
    maxWidth?: number;
  } = $props();

  const revealWhenViewed: Attachment = (node) => {
    if (typeof IntersectionObserver === 'undefined') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;

    const entrance = node.firstElementChild!.animate(
      [{ transform: 'translateY(24px)' }, { transform: 'none' }],
      { duration: 180, easing: 'ease-out' }
    );
    entrance.pause();

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        if (reducedMotion.matches) entrance.cancel();
        else entrance.play();
      },
      { rootMargin: '-8% 0px', threshold: 0.04 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      entrance.cancel();
    };
  };
</script>

<div {@attach revealWhenViewed}>
  <section {id} class={['px-[18px] sm:px-8', id && 'scroll-mt-[calc(var(--site-mobile-header-height)+18px)] lg:scroll-mt-12']}>
    <ContentMeasure {maxWidth}>
      <h2 class="font-heading text-[25px] leading-[1.8] tracking-[0.2px] text-ink">
        {title}
      </h2>

      <div class="text-[18px] font-light leading-[1.55] tracking-[0.2px] text-ink-muted/80 [&>p+p]:mt-4">
        {@render body()}
      </div>

      {#if children}
        <div class="mt-[30px]">
          {@render children()}
        </div>
      {/if}
    </ContentMeasure>
  </section>
</div>
