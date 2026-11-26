<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children, clausePosition = 'opening' }: { children: Snippet; clausePosition?: 'opening' | 'middle' } = $props();
</script>

<p class="m-0 text-ink-muted">Provider will make Workspace Cloud, its hosted project and document collaboration software, available to Customer during the subscription term.</p>
{#if clausePosition === 'opening'}{@render children()}{/if}
<p class="m-0 text-ink-muted">Provider owns the service and its documentation. Customer owns Customer Data. Each party retains its other intellectual property; no ownership transfers under this Agreement.</p>
<p class="m-0 text-ink-muted">Customer Data remains protected for as long as the receiving party retains it.</p>
{#if clausePosition === 'middle'}{@render children()}{/if}
<p class="m-0 text-ink-muted">Neither party may terminate the subscription early for convenience. Nonrenewal ends the subscription at the end of the current term and does not create an additional charge.</p>
<p class="m-0 text-ink-muted">Neither party’s failure to enforce a term waives it. If a provision is unenforceable, the remaining provisions continue in effect. The parties are independent contractors. Electronic signatures and counterparts are permitted.</p>
