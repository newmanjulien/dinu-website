<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    children,
    class: className,
    maxWidth = 1040
  }: {
    children: Snippet;
    class?: string;
    maxWidth?: number;
  } = $props();
</script>

<div class={['mx-auto w-full', className]} style:max-width={`${maxWidth}px`}>
  {@render children()}
</div>
