<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	import type { ITransaction } from '$lib/types/transaction'

	export let transactions: ITransaction[] = []
	const dispatch = createEventDispatcher()

	function deleteTransaction(transaction: ITransaction) {
		dispatch('delete', transaction)
	}
</script>

{#if transactions.length}
	<div class="columns is-multiline is-centered">
		{#each transactions as transaction}
			<div class="column is-one-third-widescreen is-half-desktop is-half-tablet">
				<div class="card">
					<div class="card-header">
						<i class="ri-exchange-dollar-fill ri-2x" />
						<div class="dd-header-content">
							<div class="title is-4">{transaction.name}</div>
							<span class="tag is-success is-light">
								₹ {transaction.amount.toFixed(2)}
							</span>
						</div>
					</div>
					<div class="card-content">
						<div class="has-text-success-dark">
							<span class="icon">
								<i class="ri-coins-fill" />
							</span>
							<span class="tag is-success is-light">
								{transaction.payer.name}
							</span>
						</div>
						<div class="has-text-info-dark">
							<span class="icon">
								<i class="ri-hand-coin-fill" />
							</span>
							<div class="tags has-addons">
								{#each transaction.ownedUsers as user}
									<span class="tag is-info is-light">{user.name}</span>
								{/each}
							</div>
						</div>
						<div class="has-text-grey">
							<span class="icon">
								<i class="ri-time-fill" />
							</span>
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
						<a
							href="javascript:void(0)"
							class="card-footer-item"
							on:click={() => deleteTransaction(transaction)}
						>
							<span class="icon">
								<i class="ri-delete-bin-line" />
							</span>
							<span>Delete</span>
						</a>
					</footer>
				</div>
			</div>
		{/each}
	</div>
{:else}
	No transaction found
{/if}

<style lang="scss">
	.card-header {
		i {
			padding: 0 1rem;
		}
		.dd-header-content {
			display: flex;
			align-items: center;
			flex-grow: 1;
			padding-right: 1rem;
			> * {
				margin: 0;
			}
			.title {
				flex-grow: 1;
			}
		}
	}
	.card-content {
		padding: 0.5rem 1rem 0.25rem;
		> * {
			display: flex;
			align-items: center;
			margin-bottom: 0.25rem;
		}
	}
</style>
