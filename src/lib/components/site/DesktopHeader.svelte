<script lang="ts">
  import { page } from '$app/state';
  import ButtonLink from '$lib/components/ui/ButtonLink.svelte';
  import SiteContainer from '$lib/components/ui/SiteContainer.svelte';
  import { productNavItems } from '$lib/data/navigation';
  import { createPortalAuthUrl } from '$lib/utils/portal-auth';

  const activePath = $derived(page.url.pathname);
</script>

<header class="hidden h-[80px] shrink-0 items-center lg:flex">
  <SiteContainer class="flex items-center justify-between">
    <a href="/" class="block h-[31px] w-fit" aria-label="Dinu home">
      <img src="/dinu-logo.png" alt="" width="307" height="95" class="h-full w-auto" />
    </a>

    <div class="flex items-center gap-[32px]">
      <nav aria-label="Primary" class="flex items-center gap-[24px] font-book text-[15px] leading-none text-ink">
        {#each productNavItems as link (link.href)}
          <a href={link.href} aria-current={activePath === link.href ? 'page' : undefined}>
            {link.label}
          </a>
        {/each}
      </nav>

      <div class="flex items-center gap-[10px]">
        <ButtonLink href={createPortalAuthUrl('login', activePath)} target="_blank" rel="noopener noreferrer" variant="secondary" size="small">Log in</ButtonLink>
        <ButtonLink href={createPortalAuthUrl('join', activePath)} target="_blank" rel="noopener noreferrer" variant="primary" size="small">Start for free</ButtonLink>
      </div>
    </div>
  </SiteContainer>
</header>
