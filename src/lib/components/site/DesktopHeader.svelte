<script lang="ts">
  import { page } from '$app/state';
  import BrandLogo from '$lib/components/site/BrandLogo.svelte';
  import ButtonLink from '$lib/components/ui/ButtonLink.svelte';
  import SiteContainer from '$lib/components/ui/SiteContainer.svelte';
  import { createPortalAuthUrl } from '$lib/utils/portal-auth';
</script>

<header class="site-header relative z-[1] hidden h-[72px] shrink-0 items-center lg:flex">
  <SiteContainer class="flex items-center justify-between">
    <a href="/" class="block h-[34.18px] w-fit" aria-label="Dinu home">
      <BrandLogo />
    </a>

    <div class="flex items-center gap-[32px]">
      <nav aria-label="Primary" class="flex items-center gap-[4px] font-book text-[16px] leading-none text-ink">
        <a
          href="/pricing"
          aria-current={page.url.pathname === '/pricing' ? 'page' : undefined}
          class="inline-flex h-[32px] items-center rounded-[8px] px-[8px] hover:bg-hover"
        >Pricing</a>
        <a
          href="/about"
          aria-current={page.url.pathname === '/about' ? 'page' : undefined}
          class="inline-flex h-[32px] items-center rounded-[8px] px-[8px] hover:bg-hover"
        >About</a>
      </nav>

      <div class="flex items-center gap-[10px]">
        <ButtonLink
          href={createPortalAuthUrl('login', page.url.pathname)}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="small"
        >Log in</ButtonLink>
        <ButtonLink
          href={createPortalAuthUrl('join', page.url.pathname)}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="small"
        >Start for free</ButtonLink>
      </div>
    </div>
  </SiteContainer>
</header>
