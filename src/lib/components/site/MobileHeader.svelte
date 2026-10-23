<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import { cubicOut } from 'svelte/easing';
  import { MediaQuery } from 'svelte/reactivity';
  import { slide } from 'svelte/transition';
  import ButtonLink from '$lib/components/ui/ButtonLink.svelte';
  import { productNavItems } from '$lib/data/navigation';
  import { createPortalAuthUrl } from '$lib/utils/portal-auth';

  const lineClasses = 'absolute left-[3px] top-1/2 h-0.5 w-5 origin-center rounded-full bg-current rotate-0 transition-transform duration-[260ms] ease-[ease] group-aria-expanded:translate-y-0 motion-reduce:duration-[1ms]';
  let open = $state(false);
  const reduceMotion = new MediaQuery('(prefers-reduced-motion: reduce)');
  afterNavigate(() => { open = false; });
  const activePath = $derived(page.url.pathname);
</script>

<header class="z-(--layer-chrome) relative flex h-[var(--site-mobile-header-height)] w-full shrink-0 items-center justify-between bg-[var(--site-bg)] px-[20px] lg:hidden">
  <a href="/" class="h-[28.35px] w-fit" aria-label="Dinu home">
    <img src="/dinu.svg" alt="" width="316" height="102" class="h-full w-auto" />
  </a>
  <button
    type="button"
    class="group -mr-[4px] inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#ededed] bg-[#fafafa] text-ink"
    aria-label={open ? 'Close menu' : 'Open menu'}
    aria-expanded={open}
    aria-controls="mobile-menu"
    onclick={() => (open = !open)}
  >
    <span class="relative block h-[26px] w-[26px]" aria-hidden="true">
      <span class={[lineClasses, '-translate-y-[3px] group-aria-expanded:rotate-45']}></span>
      <span class={[lineClasses, 'translate-y-[3px] group-aria-expanded:-rotate-45']}></span>
    </span>
  </button>

  {#if open}
    <nav
      id="mobile-menu"
      class="z-(--layer-chrome-popover) absolute left-0 right-0 top-full flex h-[calc(100dvh-var(--site-mobile-header-height))] flex-col overflow-y-auto bg-[var(--site-bg)] pb-[28px]"
      aria-label="Mobile primary"
      transition:slide={{ duration: reduceMotion.current ? 0 : 380, axis: 'y', easing: cubicOut }}
    >
      <div class="flex flex-col px-[20px] pt-[26px]">
        <h2 class="mb-[14px] text-[12px] font-book uppercase leading-none tracking-[0.12em] text-ink-muted">Agreed</h2>
        {#each productNavItems as link (link.href)}
          {@const isActive = activePath === link.href}
          <a href={link.href} class={['py-[10px] text-[20px] leading-none', isActive ? 'text-ink' : 'text-ink-muted']} aria-current={isActive ? 'page' : undefined}>{link.label}</a>
        {/each}
      </div>
      <div class="mt-[30px] flex flex-col gap-[12px] border-t border-line px-[20px] pt-[24px]">
        <ButtonLink href={createPortalAuthUrl('login', activePath)} target="_blank" rel="noopener noreferrer" variant="soft" size="large" fullWidth>Log in</ButtonLink>
        <ButtonLink href={createPortalAuthUrl('join', activePath)} target="_blank" rel="noopener noreferrer" variant="primary" size="large" fullWidth>Start for free</ButtonLink>
      </div>
    </nav>
  {/if}
</header>
