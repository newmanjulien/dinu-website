<script lang="ts">
  import ContentMeasure from '$lib/components/ui/ContentMeasure.svelte';

  let { tone = 'default' }: { tone?: 'default' | 'brand' } = $props();
</script>

<footer id="site-footer" class={[
  'px-[18px] sm:px-8',
  tone === 'brand' ? 'brand-footer bg-brand-dark text-white/65' : 'text-ink-muted/60'
]}>
  <ContentMeasure maxWidth="var(--site-footer-content-width)" class={`border-t py-[var(--site-footer-padding)] ${tone === 'brand' ? 'border-white/15' : 'border-line'}`}>
    <p class="text-[15px] font-book">Dinusaur, Inc.</p>
  </ContentMeasure>
</footer>
