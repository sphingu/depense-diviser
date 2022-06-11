<script lang="ts">
	import { Card, Anchor } from '@/lib/components'
	import type { IMonthlyTransaction } from '@/lib/types/transaction'

	export let monthlyTransactions: IMonthlyTransaction[] = []
</script>

<div class="columns is-multiline is-centered">
	{#each monthlyTransactions as item}
		<div class="column is-half is-one-third-widescreen">
			<Card>
				<svelte:fragment slot="header">
					<i class="ri-exchange-box-fill ri-2x" />
					<div class="card-header-content">
						<div class="has-text-weight-bold">{item.title}</div>
					</div>
				</svelte:fragment>
				<svelte:fragment slot="footer">
					<Anchor href={`/month-wise/${item.year}-${item.month}`} class="card-footer-item">
						<span class="icon">
							<i class="ri-file-text-line" />
						</span>
						<span>View Details</span>
					</Anchor>
				</svelte:fragment>

				<span class="icon has-text-success-dark">
					<i class="ri-money-dollar-circle-line" />
				</span>
				<div class="tags has-addons mb-0">
					<span class="tag is-success is-light is-medium">Total Amount</span>
					<span class="tag is-success is-medium">₹ {item.sum.toFixed(2)}</span>
				</div>
				<span class="icon has-text-info-dark">
					<i class="ri-hashtag" />
				</span>
				<div class="tags has-addons mb-0">
					<span class="tag is-info is-light is-medium">Total Transactions</span>
					<span class="tag is-info is-medium">{item.count}</span>
				</div>
			</Card>
		</div>
	{/each}
</div>
