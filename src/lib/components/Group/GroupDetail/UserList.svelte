<script lang="ts">
	import { AmountTag, LinkButton } from '@/lib/components/common'

	import type { IGroupDetails, IGroupUser } from '@/lib/services'

	export let users: IGroupUser[]

	let expanded = true

	function toggleExpand() {
		expanded = !expanded
	}
</script>

<article class="panel is-link">
	<p class="panel-heading is-clickable" on:click={toggleExpand}>Users</p>
	{#if expanded}
		<div class="panel-block p-0">
			<div class="table-container">
				<table class="table is-hoverable is-bordered is-fullwidth">
					<thead>
						<tr>
							<th>#</th>
							<th>User</th>
							<th><abbr title="Amount spent by user">Spent</abbr></th>
							<th><abbr title="Amount spent for self">Self Spent</abbr></th>
							<th><abbr title="Amount owed by user">Owed</abbr></th>
						</tr>
					</thead>
					<tbody>
						{#each users as user, i}
							<tr>
								<th>{i + 1}</th>
								<td>
									{user.name}
								</td>
								<td>
									<AmountTag classes="is-info is-light is-medium" amount={user.spent} />
								</td>
								<td>
									<AmountTag classes="is-warning is-light is-medium" amount={user.selfSpent} />
								</td>
								<td>
									<AmountTag classes={'is-light is-medium'} amount={user.owed} colored />
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
		<div class="panel-block has-background-link-light">
			<LinkButton path="/user/new" className="is-outlined is-fullwidth">Add New User</LinkButton>
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
