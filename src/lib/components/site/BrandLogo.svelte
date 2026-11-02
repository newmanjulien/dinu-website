<span class="brand-logo" aria-hidden="true">
  <img src="/dinu.svg" alt="" width="316" height="102" />
  <span class="brand-logo__eye"></span>
</span>

<style>
  .brand-logo {
    position: relative;
    display: block;
    height: 100%;
    aspect-ratio: 316 / 102;
  }

  img {
    display: block;
    height: 100%;
    width: 100%;
  }

  .brand-logo__eye {
    position: absolute;
    top: 26.5%;
    left: 16.4%;
    width: 4.2%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(--site-bg);
    opacity: 0;
  }

  :global(a:hover) .brand-logo__eye,
  :global(a:focus-visible) .brand-logo__eye {
    animation: blink 324ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 0;
    }

    35% {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .brand-logo__eye {
      animation-duration: 1ms;
    }
  }
</style>
