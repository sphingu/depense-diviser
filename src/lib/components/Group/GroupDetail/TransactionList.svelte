<script lang="ts">
	import { AmountTag, LinkButton } from '@/lib/components/common'

	import type { IGroupTransaction } from '@/lib/services'

	export let transactions: IGroupTransaction[]
	export let groupId: string

	let expanded = true

	function toggleExpand() {
		expanded = !expanded
	}
</script>

<article class="panel is-link">
	<p class="panel-heading is-clickable" on:click={toggleExpand}>Transactions</p>
	{#if expanded}
		<div class="panel-block p-0">
			<div class="table-container">
				<table class="table is-hoverable is-bordered is-fullwidth">
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Amount</th>
							<th><abbr title="Amount spent by user">Paid By</abbr></th>
							<th><abbr title="Amount spent for self">Paid For</abbr></th>
						</tr>
					</thead>
					<tbody>
						{#each transactions as transaction, i}
							<tr>
								<th>{i + 1}</th>
								<td>
									{transaction.name}
								</td>
								<td>
									<AmountTag classes="is-info is-light is-medium" amount={transaction.amount} />
								</td>
								<td>
									<span class="tag is-link is-light is-medium">
										{transaction.payer.name}
									</span>
								</td>
								<td>
									<div class="tags are-medium	">
										{#each transaction.paidFor as user}
											<span class="tag is-success is-light">
												{user.name}
											</span>
										{/each}
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
		<div class="panel-block has-background-link-light">
			<LinkButton path={`/group/${groupId}/transaction/new`} className="is-outlined is-fullwidth"
				>Add New Transaction</LinkButton
			>
		</div>
	{/if}
</article>

<style lang="scss">
	.table-container {
		width: 100%;
	}
	.panel-heading {
		padding: 0.5rem 1rem;
	}
</style>
