<script lang="ts">
	import type { ITransaction } from '$lib/types/transaction'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()
	export let transaction: ITransaction
	export let expanded: boolean

	function toggleExpand() {
		expanded = !expanded
	}
	function onDelete() {
		dispatch('delete', { transaction })
	}
</script>

<div class="column is-half is-one-third-widescreen">
	<div class="card">
		<div class="card-header" on:click={toggleExpand}>
			<i class="ri-exchange-dollar-fill ri-2x" />
			<div class="dd-header-content">
				<div class="has-text-weight-bold">{transaction.name}</div>
				<span class="tag is-link is-light is-medium has-text-weight-bold">
					₹ {transaction.amount.toFixed(2)}
				</span>
			</div>
		</div>
		{#if expanded}
			<div>
				<div class="card-content">
					<span class="icon has-text-success-dark">
						<i class="ri-coins-fill" />
					</span>
					<div>
						<span class="tag is-success is-light is-medium">
							{transaction.payer.name}
						</span>
					</div>
					<span class="icon has-text-info-dark">
						<i class="ri-hand-coin-fill" />
					</span>
					<div class="tags">
						{#each transaction.ownedUsers as user}
							<div class="tag mb-0 is-info is-light is-medium">{user.name}</div>
						{/each}
					</div>
					<span class="icon has-text-grey">
						<i class="ri-time-fill" />
					</span>
					<div>
						<span class="tag is-light">
							{new Date(transaction.date).toLocaleDateString(undefined, {
								// day: '2-digit',
								month: 'short',
								year: 'numeric'
							})}
						</span>
					</div>
				</div>
				<footer class="card-footer">
					<a href={`/transactions/${transaction.id}`} class="card-footer-item">
						<span class="icon">
							<i class="ri-edit-fill" />
						</span>
						<span>Edit</span>
					</a>
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a href="javascript:void(0)" class="card-footer-item" on:click={onDelete}>
						<span class="icon">
							<i class="ri-delete-bin-line" />
						</span>
						<span>Delete</span>
					</a>
				</footer>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.card-header {
		cursor: pointer;
		i {
			padding: 0 0.5rem;
		}
		.dd-header-content {
			display: flex;
			// flex-direction: column;
			align-items: center;
			flex-grow: 1;
			padding-right: 0.5rem;
			> * {
				margin: 0;
			}
			div {
				flex-grow: 1;
			}
		}
	}
	.card-content {
		padding: 0.5rem 0.5rem 0.25rem;
		display: grid;
		grid-template-columns: 32px auto;
		> * {
			display: flex;
			align-self: center;
			margin-bottom: 0.25rem;
		}
	}
</style>
