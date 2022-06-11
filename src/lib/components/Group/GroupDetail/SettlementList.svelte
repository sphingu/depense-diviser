<script lang="ts">
	import { AmountTag } from '@/lib/components/common'
	import LinkButton from '@/lib/components/common/Buttons/LinkButton.svelte'

	import type { IGroupSettlement } from '@/lib/services'

	export let settlements: IGroupSettlement[]

	let expanded = true

	function toggleExpand() {
		expanded = !expanded
	}
</script>

<article class="panel is-link">
	<p class="panel-heading is-clickable" on:click={toggleExpand}>Settlements</p>
	{#if expanded}
		<div class="panel-block p-0">
			<div class="table-container">
				<table class="table is-hoverable is-bordered is-fullwidth">
					<thead>
						<tr>
							<th>#</th>
							<th>From => To</th>
							<th>Amount</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{#each settlements as settlement, i}
							<tr>
								<th>{i + 1}</th>
								<td>
									{settlement.fromUser.name} => {settlement.toUser.name}
								</td>
								<td>
									<AmountTag classes="is-info is-light is-medium" amount={settlement.amount} />
								</td>
								<td>
									<LinkButton className="is-success" path="#">Settle</LinkButton>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
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
