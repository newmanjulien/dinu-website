<script lang="ts">
  import '$lib/styles/marketing.css';
  import { CTA_SECTION_ID } from '$lib/data/homepage';
  import type { LayoutProps } from './$types';
  import BookingWidget from '$lib/components/site/BookingWidget.svelte';
  import DesktopHeader from '$lib/components/site/DesktopHeader.svelte';
  import Footer from '$lib/components/site/Footer.svelte';
  import MobileHeader from '$lib/components/site/MobileHeader.svelte';
  import HomepageFrame from '$lib/components/site/HomepageFrame.svelte';
  import { page } from '$app/state';

  let { children }: LayoutProps = $props();
  let shell = $state<HTMLDivElement>();
  let bookingWidget = $state<HTMLDivElement>();
  let frameRevealed = $state(false);
  const isHomepage = $derived(page.url.pathname === '/');
</script>

<svelte:head>
  <link rel="preconnect" href="https://portal.overbase.app" />
</svelte:head>
<div bind:this={shell} class="site-shell flex min-h-[100dvh] flex-col bg-[var(--site-bg)]" class:homepage-shell={isHomepage}>
  {#if isHomepage}
    <HomepageFrame root={shell} revealTarget={bookingWidget} bind:revealed={frameRevealed} />
  {/if}
  <DesktopHeader />
  <MobileHeader />
  <BookingWidget
    bind:widget={bookingWidget}
    visible={!isHomepage || frameRevealed}
    brandSectionId={isHomepage ? CTA_SECTION_ID : undefined}
  />

  <div class="site-page flex-1">
    {@render children()}
  </div>

  <Footer tone={isHomepage ? 'brand' : 'default'} />
</div>
