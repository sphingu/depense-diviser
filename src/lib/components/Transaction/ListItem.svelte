<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { Card } from '@/lib/components'
	import type { Transaction } from '@/lib/@generated/type-graphql'
	import Anchor from '../common/Anchor.svelte'

	const dispatch = createEventDispatcher()
	export let transaction: Transaction
	export let expanded: boolean
	export let groupId: string

	function onDelete() {
		dispatch('delete', { transaction })
	}
</script>

<div class="column is-half is-one-third-widescreen">
	<Card {expanded}>
		<svelte:fragment slot="header">
			<i class="ri-exchange-dollar-fill ri-2x" />
			<div class="card-header-content">
				<div class="has-text-weight-bold">{transaction.name}</div>
				<span class="tag is-link is-light is-medium has-text-weight-bold">
					₹ {transaction.amount.toFixed(2)}
				</span>
			</div>
		</svelte:fragment>
		<svelte:fragment slot="footer">
			<Anchor href={`/group/${groupId}/transaction/${transaction.id}`} class="card-footer-item">
				<span class="icon">
					<i class="ri-edit-fill" />
				</span>
				<span>Edit</span>
			</Anchor>
			<!-- svelte-ignore a11y-invalid-attribute -->
			<Anchor href="javascript:void(0)" class="card-footer-item" on:click={onDelete}>
				<span class="icon">
					<i class="ri-delete-bin-line" />
				</span>
				<span>Delete</span>
			</Anchor>
		</svelte:fragment>

		<span class="icon has-text-success-dark">
			<i class="ri-coins-fill" />
		</span>
		<div>
			<span class="tag is-success is-light is-medium">
				{transaction.payer.email}
			</span>
		</div>
		<span class="icon has-text-info-dark">
			<i class="ri-hand-coin-fill" />
		</span>
		<div class="tags">
			{#each transaction.ownedUsers as user}
				<div class="tag mb-0 is-info is-light is-medium">{user.email}</div>
			{/each}
		</div>
		<span class="icon has-text-grey">
			<i class="ri-time-fill" />
		</span>
		<div>
			<Anchor href={`/month-wise/${transaction.year}-${transaction.month}`}>
				<span class="tag is-light is-underlined">
					{new Date(transaction.date).toLocaleDateString(undefined, {
						month: 'short',
						year: 'numeric'
					})}
				</span>
			</Anchor>
		</div>
	</Card>
</div>
