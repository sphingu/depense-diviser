<script lang="ts">
	import TransactionListItem from './ListItem.svelte'
	import type { Transaction } from '@/lib/@generated/type-graphql'

	export let transactions: Transaction[] = []
	export let expanded: boolean
	export let groupId: string
</script>

<div class="columns is-multiline is-centered">
	{#each transactions as transaction}
		<TransactionListItem {groupId} {transaction} {expanded} on:delete />
	{/each}
</div>
