<script lang="ts">
  import ButtonLink from '$lib/components/ui/ButtonLink.svelte';
  import SiteContainer from '$lib/components/ui/SiteContainer.svelte';
</script>

<header class="site-header hidden h-[72px] shrink-0 items-center lg:flex">
  <SiteContainer class="flex items-center justify-between">
    <a href="/" class="block h-[34.18px] w-fit" aria-label="Dinu home">
      <img src="/dinu.svg" alt="" width="316" height="102" class="h-full w-auto" />
    </a>

    <div class="flex items-center gap-[32px]">
      <nav aria-label="Primary" class="flex items-center gap-[24px] font-book text-[15px] leading-none text-ink">
        <button type="button" class="cursor-pointer">Pricing</button>
        <button type="button" class="cursor-pointer">About</button>
      </nav>

      <div class="flex items-center gap-[10px]">
        <ButtonLink variant="secondary" size="small">Log in</ButtonLink>
        <ButtonLink variant="primary" size="small">Start for free</ButtonLink>
      </div>
    </div>
  </SiteContainer>
</header>
