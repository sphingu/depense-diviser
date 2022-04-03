<script lang="ts">
	import TransactionListItem from './ListItem.svelte'
	import type { Transaction } from '$lib/@generated/type-graphql'

	export let transactions: Transaction[] = []
	export let expanded: boolean
</script>

<div class="columns is-multiline is-centered">
	{#each transactions as transaction}
		<TransactionListItem {transaction} {expanded} on:delete />
	{/each}
</div>
