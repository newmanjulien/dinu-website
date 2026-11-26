<script lang="ts">
  import SliderSparks from './SliderSparks.svelte';
  import {
    LAST_STOP,
    STOP_POSITIONS,
    derivePricingDetails,
    getNearestStop
  } from './pricing-model';

  let {
    position,
    onPositionChange,
    onCommit,
    mode = 'desktop'
  }: {
    position: number;
    onPositionChange: (position: number) => void;
    onCommit: (position: number) => void;
    mode?: 'desktop' | 'mobile';
  } = $props();

  let selectedStop = $derived(getNearestStop(position));
  let details = $derived(derivePricingDetails(selectedStop));
  let power = $derived(position / 100);
  let pointerId: number | null = null;

  function handleInput(event: Event) {
    const value = Number((event.currentTarget as HTMLInputElement).value);
    onPositionChange(value);
  }

  function handlePointerStart(event: PointerEvent) {
    pointerId = event.pointerId;
  }

  function handlePointerEnd(event: PointerEvent) {
    if (event.pointerId !== pointerId) return;
    pointerId = null;
    // A native change may not fire when a drag returns to its starting value.
    onCommit(position);
  }

  function handleChange(event: Event) {
    if (pointerId !== null) return;
    onCommit(Number((event.currentTarget as HTMLInputElement).value));
  }

  function handleKeyDown(event: KeyboardEvent) {
    let nextStop: number;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp': nextStop = selectedStop + 1; break;
      case 'ArrowLeft':
      case 'ArrowDown': nextStop = selectedStop - 1; break;
      case 'PageUp': nextStop = selectedStop + 5; break;
      case 'PageDown': nextStop = selectedStop - 5; break;
      case 'Home': nextStop = 0; break;
      case 'End': nextStop = LAST_STOP; break;
      default: return;
    }
    event.preventDefault();
    const nextPosition = STOP_POSITIONS[Math.min(Math.max(nextStop, 0), LAST_STOP)];
    onPositionChange(nextPosition);
    onCommit(nextPosition);
  }
</script>

<svelte:window onpointerup={handlePointerEnd} onpointercancel={handlePointerEnd} />

<div
  class={mode === 'desktop'
    ? 'relative z-2 col-span-full row-start-4 px-[var(--lm-pad)] pt-6 pb-8 @max-[719px]/lm:hidden'
    : 'hidden @max-[719px]/lm:block'}
  style:--lm-power={power}
>
  <div
    class={[
      `relative
        [--lm-knob:radial-gradient(circle,var(--color-brand)_0_calc(1.125px_+_1.125px_*_var(--lm-power,0)),#fff_calc(1.5px_+_1.125px_*_var(--lm-power,0)))]
      `,
      mode === 'mobile' && 'max-[810px]:flow-root'
    ]}
    style:--lm-knob-shadow={`0 1px 2px rgba(0, 0, 0, 0.18),
      0 0 0 0.5px rgba(0, 0, 0, 0.06),
      0 0 ${6 + 10 * power}px color-mix(in srgb, var(--color-brand) ${12 + 30 * power}%, transparent)`}
  >
    <div class="
      absolute inset-0 rounded-full
      bg-[color-mix(in_srgb,var(--color-pricing-border)_45%,var(--color-pricing-card))]
      shadow-[inset_0_1px_2px_rgba(0,0,0,0.09),0_1px_0_color-mix(in_srgb,var(--color-pricing-surface)_70%,transparent)]
    " aria-hidden="true">
      <div class="
        absolute inset-0 overflow-hidden
        bg-[radial-gradient(56px_28px_at_calc(12px_+_(100%_-_24px)_*_var(--lm-power,0))_50%,color-mix(in_srgb,var(--homepage-band-1)_75%,transparent),transparent_70%),linear-gradient(90deg,var(--homepage-band-1)_0%,var(--homepage-band-2)_30%,var(--homepage-band-3)_65%,var(--color-brand)_100%)]
        [clip-path:inset(0_calc((100%_-_24px)_*_(1_-_var(--lm-power,0)))_0_0_round_12px)] before:absolute
        before:inset-0
        before:bg-[linear-gradient(rgba(255,255,255,0.34),rgba(255,255,255,0.06)_48%,transparent_52%,color-mix(in_srgb,var(--color-brand)_8%,transparent))]
        before:content-['']
      "><SliderSparks {power} /></div>
    </div>
    <input
      type="range"
      class={[
        `
          peer relative z-1 mx-0.5 block h-6 w-[calc(100%_-_4px)] cursor-pointer appearance-none bg-transparent focus:outline-none
          focus-visible:rounded-full focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2
          focus-visible:outline-pricing-ink
        `,
        `
          [&::-webkit-slider-runnable-track]:h-6 [&::-webkit-slider-runnable-track]:[background:transparent]
          [&::-moz-range-track]:h-6 [&::-moz-range-track]:[background:transparent]
        `,
        `
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:[-webkit-appearance:none]
          [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:mt-0.5 [&::-webkit-slider-thumb]:border-0
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:[background:var(--lm-knob)]
          [&::-webkit-slider-thumb]:shadow-(--lm-knob-shadow) [&::-webkit-slider-thumb]:transition-transform
          [&::-webkit-slider-thumb]:duration-[160ms] [&::-webkit-slider-thumb]:ease-[cubic-bezier(0.23,1,0.32,1)]
          motion-reduce:[&::-webkit-slider-thumb]:transition-none active:[&::-webkit-slider-thumb]:[transform:scale(1.1)]
          hover:[&::-webkit-slider-thumb]:[transform:scale(1.1)]
        `,
        `
          [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:[background:var(--lm-knob)] [&::-moz-range-thumb]:shadow-(--lm-knob-shadow)
        `,
        mode === 'mobile' && [
          'max-[810px]:-m-2.5 max-[810px]:h-11 max-[810px]:w-[calc(100%_+_20px)]',
          'max-[810px]:[&::-webkit-slider-runnable-track]:h-11 max-[810px]:[&::-moz-range-track]:h-11',
          `
            max-[810px]:[&::-webkit-slider-thumb]:size-11 max-[810px]:[&::-webkit-slider-thumb]:mt-0
            max-[810px]:[&::-webkit-slider-thumb]:[background:transparent] max-[810px]:[&::-webkit-slider-thumb]:shadow-none
            max-[810px]:active:[&::-webkit-slider-thumb]:transform-none
          `,
          'max-[810px]:[&::-moz-range-thumb]:size-11 max-[810px]:[&::-moz-range-thumb]:[background:transparent] max-[810px]:[&::-moz-range-thumb]:shadow-none'
        ]
      ]}
      min="0"
      max="100"
      step="0.1"
      value={position}
      oninput={handleInput}
      onchange={handleChange}
      onpointerdown={handlePointerStart}
      onkeydown={handleKeyDown}
      aria-label="Signed contracts per month"
      aria-valuetext={details.ariaValueText}
    />
    {#if mode === 'mobile'}
      <span class="
        pointer-events-none absolute top-1/2 left-[calc(12px_+_(100%_-_24px)_*_var(--lm-power,0))] z-2 -mt-3 -ml-3
        hidden size-6 rounded-full [background:var(--lm-knob)] shadow-(--lm-knob-shadow) transition-transform
        duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] peer-active:scale-110 motion-reduce:transition-none max-[810px]:block
      " aria-hidden="true"></span>
    {/if}
  </div>
  <div class="relative mt-0.5 h-2.5" aria-hidden="true">
    {#each STOP_POSITIONS as stopPosition, stop (stop)}
      <span
        class="
          absolute top-0 h-1.5 w-px bg-pricing-border transition-[background,height] duration-150 ease-[ease]
          data-[on=true]:bg-pricing-ink data-[current=true]:h-2.5 motion-reduce:transition-none
        "
        data-on={stop <= selectedStop}
        data-current={stop === selectedStop}
        style:left={`calc(12px + ${stopPosition / 100} * (100% - 24px))`}
      ></span>
    {/each}
  </div>
</div>
