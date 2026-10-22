<script lang="ts">
  import type { Snippet } from 'svelte';
  import ContentMeasure from './ContentMeasure.svelte';

  let {
    children,
    class: className
  }: {
    children: Snippet;
    class?: string;
  } = $props();
</script>

<div class="w-full px-[18px] sm:px-8">
  <ContentMeasure maxWidth={1246.3} class={className}>
    {@render children()}
  </ContentMeasure>
</div>
