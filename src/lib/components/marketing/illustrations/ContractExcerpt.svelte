<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children, clausePosition = 'opening' }: { children: Snippet; clausePosition?: 'opening' | 'middle' } = $props();
</script>

<p class="m-0 text-ink-muted">The Professional shall provide the services described in the Statement of Work with reasonable skill and care.</p>
{#if clausePosition === 'opening'}{@render children()}{/if}
<p class="m-0 text-ink-muted">The Customer shall make available the information, materials and access reasonably required to carry out those services. If a delay affects the agreed schedule, the parties shall work together to agree revised delivery dates.</p>
<p class="m-0 text-ink-muted">Changes to the scope of work or fees must be agreed in writing before work begins.</p>
{#if clausePosition === 'middle'}{@render children()}{/if}
<p class="m-0 text-ink-muted">Fees shall be invoiced monthly and are payable within thirty days of receipt. The Customer shall notify the Professional promptly of any disputed amount, giving reasonable details of the dispute, and shall pay the undisputed balance when due. The parties shall use reasonable efforts to resolve any outstanding billing questions.</p>
<p class="m-0 text-ink-muted">Each party shall keep the other party’s confidential information secure and use it only to perform its obligations under this Agreement. These obligations shall continue after the services end.</p>
