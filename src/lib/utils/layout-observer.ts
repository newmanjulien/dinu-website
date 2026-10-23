export const DESKTOP_QUERY = '(min-width: 64rem)';

// Share scheduling and invalidation; each component owns its geometry and behavior.
export function observeLayout(
  elements: Element[],
  measure: () => void,
  update: () => void = () => {}
) {
  let frame = 0;
  let dirty = false;
  let disposed = false;

  function schedule() {
    if (disposed || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (dirty) {
        dirty = false;
        measure();
      }
      update();
    });
  }

  function refresh() {
    dirty = true;
    schedule();
  }

  const observer = new ResizeObserver(refresh);
  for (const element of new Set(elements)) observer.observe(element);
  window.addEventListener('resize', refresh);
  document.fonts.addEventListener('loadingdone', refresh);
  document.fonts.addEventListener('loadingerror', refresh);
  void document.fonts.ready.then(refresh);
  refresh();

  return {
    refresh,
    update: schedule,
    destroy() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', refresh);
      document.fonts.removeEventListener('loadingdone', refresh);
      document.fonts.removeEventListener('loadingerror', refresh);
    }
  };
}
