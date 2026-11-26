<script lang="ts">
  import ContentMeasure from '$lib/components/ui/ContentMeasure.svelte';

  let { tone = 'default' }: { tone?: 'default' | 'brand' } = $props();
</script>

<footer
  id="site-footer"
  class={[
    'relative z-[1] px-[18px] sm:px-8',
    tone === 'brand'
      ? 'brand-footer bg-brand-dark text-white/65 lg:group-[.homepage-shell]/site:ml-[var(--homepage-rail-width)]'
      : 'border-t border-line text-ink-muted/60'
  ]}
>
  <ContentMeasure
    maxWidth={tone === 'brand' ? 'var(--site-footer-content-width)' : 'var(--site-container-width)'}
    class={tone === 'brand'
      ? 'border-t border-white/15 py-[var(--site-footer-padding)]'
      : 'py-[var(--site-footer-padding)]'}
  >
    <p class="text-[15px] font-book">Dinusaur, Inc.</p>
  </ContentMeasure>
</footer>
