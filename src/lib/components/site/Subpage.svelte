<script lang="ts">
  import type { Snippet } from 'svelte';
  import SiteContainer from '$lib/components/ui/SiteContainer.svelte';

  let {
    title,
    heading = title,
    description,
    descriptionClass = '',
    centered = false,
    wideContent,
    children
  }: {
    title: string;
    heading?: string;
    description?: string;
    descriptionClass?: string;
    centered?: boolean;
    wideContent?: Snippet;
    children: Snippet;
  } = $props();
</script>

<svelte:head>
  <title>{title}</title>
  {#if description}
    <meta name="description" content={description} />
  {/if}
</svelte:head>

<main class="pb-[84px] pt-[32px] sm:pb-[112px] sm:pt-[48px] lg:pt-[56px]">
  <SiteContainer>
    <header class={centered ? 'mx-auto max-w-[800px] text-center' : undefined}>
      <h1 class="font-heading font-text text-[31px] leading-[1.1] text-ink sm:text-[35px]">
        {heading}
      </h1>
      {#if description}
        <p class={`mt-[14px] text-[16px] font-light leading-[1.55] tracking-[0.15px] text-ink-muted sm:text-[17.5px] ${descriptionClass}`}>
          {description}
        </p>
      {/if}
    </header>

  </SiteContainer>

  <div class={description ? 'mt-[40px] sm:mt-[48px]' : 'mt-[20px]'}>
    {#if wideContent}
      {@render wideContent()}
    {/if}
    <SiteContainer>
      {@render children()}
    </SiteContainer>
  </div>
</main>
