export const DESKTOP_QUERY = '(min-width: 64rem)';
export interface LayoutInvalidation { fonts: boolean; viewport: boolean }

// Share scheduling and invalidation; each component owns its geometry and behavior.
export function observeLayout(
  elements: Element[] | (() => Element[]),
  measure: (cause: LayoutInvalidation) => void,
  update: () => void = () => {},
  { mutationRoot }: { mutationRoot?: Element } = {}
) {
  let frame = 0;
  let dirty = false;
  let disposed = false;
  let fonts = false;
  let viewport = false;
  let observed = new Set<Element>();

  function syncElements() {
    const next = new Set(typeof elements === 'function'
      ? elements().filter((element) => element.isConnected)
      : elements);
    let changed = false;
    for (const element of observed) {
      if (next.has(element)) continue;
      observer.unobserve(element);
      changed = true;
    }
    for (const element of next) {
      if (observed.has(element)) continue;
      observer.observe(element);
      changed = true;
    }
    observed = next;
    return changed;
  }

  function schedule() {
    if (disposed || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (disposed) return;
      if (dirty) {
        dirty = false;
        syncElements();
        const cause = { fonts, viewport };
        fonts = viewport = false;
        measure(cause);
      }
      if (!disposed) update();
    });
  }

  function refresh() {
    if (disposed) return;
    dirty = true;
    schedule();
  }
  function resize() { viewport = true; refresh(); }
  function fontsChanged() { fonts = true; refresh(); }

  const observer = new ResizeObserver(refresh);
  syncElements();
  const mutations = mutationRoot && typeof elements === 'function'
    ? new MutationObserver(() => {
      if (!disposed && syncElements()) refresh();
    })
    : undefined;
  if (mutationRoot) mutations?.observe(mutationRoot, { childList: true, subtree: true });
  window.addEventListener('resize', resize);
  document.fonts.addEventListener('loadingdone', fontsChanged);
  document.fonts.addEventListener('loadingerror', fontsChanged);
  void document.fonts.ready.then(fontsChanged);
  refresh();

  return {
    refresh,
    update: schedule,
    destroy() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      mutations?.disconnect();
      observed.clear();
      window.removeEventListener('resize', resize);
      document.fonts.removeEventListener('loadingdone', fontsChanged);
      document.fonts.removeEventListener('loadingerror', fontsChanged);
    }
  };
}
