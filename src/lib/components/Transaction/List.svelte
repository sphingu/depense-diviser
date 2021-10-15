<script lang="ts">
	import TransactionListItem from './ListItem.svelte'
	import type { ITransaction } from '$lib/types/transaction'

	export let transactions: ITransaction[] = []
	export let expanded: boolean
</script>

<div class="columns is-multiline is-centered">
	{#each transactions as transaction}
		<TransactionListItem {transaction} {expanded} on:delete />
	{/each}
</div>
