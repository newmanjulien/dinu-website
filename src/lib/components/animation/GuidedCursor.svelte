<script lang="ts">
	import type { CursorFrame } from './tour-model';
	let { cursor }: { cursor: CursorFrame } = $props();
</script>

<div class="pointer-events-none absolute top-0 left-0 z-[8] h-[27.075px] w-[21.66px] origin-top-left opacity-0" style:opacity={cursor.opacity} style:transform={`translate(${cursor.x}px, ${cursor.y}px) scale(${1 / cursor.scale})`}>
	<svg class="overflow-visible [transform:translate(-2.7075px,-2.030625px)] drop-shadow-[0_1px_2px_rgb(0_0_0/25%)]" viewBox="0 0 32 40" width="21.66" height="27.075" aria-hidden="true"><path d="M4 3 11.5 34 18.5 23 30 21.3Z" fill="#111" stroke="white" stroke-width="2.4" stroke-linejoin="round" /></svg>
	<span class="
		absolute top-0 left-0 size-[26px] -translate-1/2 rounded-full border-2 border-accent opacity-0
		shadow-[0_0_0_1px_rgb(255_255_255/90%),inset_0_0_0_1px_rgb(255_255_255/90%)]
	" style:opacity={cursor.ringOpacity} style:transform={`scale(${cursor.ringScale})`}></span>
</div>
