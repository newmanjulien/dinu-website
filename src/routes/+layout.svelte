<script lang="ts">
  import '$lib/styles/marketing.css';
  import type { LayoutProps } from './$types';
  import CalendarButton from '$lib/components/site/CalendarButton.svelte';
  import DesktopHeader from '$lib/components/site/DesktopHeader.svelte';
  import Footer from '$lib/components/site/Footer.svelte';
  import MobileHeader from '$lib/components/site/MobileHeader.svelte';

  let { children }: LayoutProps = $props();
</script>

<svelte:head>
  <link rel="preconnect" href="https://portal.overbase.app" />
</svelte:head>


<div class="flex min-h-[100dvh] flex-col bg-[var(--site-bg)]">
  <DesktopHeader />
  <MobileHeader />
  <CalendarButton />

  <div class="flex-1">
    {@render children()}
  </div>

  <Footer />
</div>
