<script lang="ts">
	import type { CursorFrame } from './tour-model';
	let { cursor }: { cursor: CursorFrame } = $props();
</script>

<div class="guided-cursor" style:opacity={cursor.opacity} style:transform={`translate(${cursor.x}px, ${cursor.y}px) scale(${1 / cursor.scale})`}>
	<svg viewBox="0 0 32 40" width="21.66" height="27.075" aria-hidden="true"><path d="M4 3 11.5 34 18.5 23 30 21.3Z" fill="#111" stroke="white" stroke-width="2.4" stroke-linejoin="round" /></svg>
	<span class="click-ring" style:opacity={cursor.ringOpacity} style:transform={`scale(${cursor.ringScale})`}></span>
</div>

<style>
	.guided-cursor { position: absolute; left: 0; top: 0; z-index: 8; width: 21.66px; height: 27.075px; opacity: 0; transform-origin: top left; pointer-events: none; }
	svg { overflow: visible; transform: translate(-2.7075px, -2.030625px); filter: drop-shadow(0 1px 2px rgb(0 0 0 / 25%)); }
	.click-ring { position: absolute; top: 0; left: 0; width: 26px; height: 26px; border: 2px solid var(--color-accent); border-radius: 50%; translate: -50% -50%; opacity: 0; box-shadow: 0 0 0 1px rgb(255 255 255 / 90%), inset 0 0 0 1px rgb(255 255 255 / 90%); }
</style>
