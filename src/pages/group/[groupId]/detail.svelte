<script lang="ts">
	import { params } from '@roxi/routify'

	import { PageHeader, LoadData, GroupDetails } from '@/lib/components'
	import { groupFormatters } from '@/lib/helpers/dataFormatters'
	import { isEmpty } from '@/lib/helpers'
	import { GROUP_QUERY } from '@/lib/services'

	import type { Group } from '@/lib/@generated/type-graphql'

	const variables: Record<string, { id: string }> = { where: { id: $params.groupId } }
	let data: { group?: Group } = {}
	let loading: boolean
	let userExpanded = true

	function toggleUserExpanded() {
		userExpanded = !userExpanded
	}

	$: hasGroupDetails = !isEmpty(data?.group)
	$: groupDetails = hasGroupDetails && groupFormatters.getGroupDetails(data.group)
	$: users = hasGroupDetails ? Array.from(groupDetails.users.values()) : []
	$: transactions = hasGroupDetails ? Array.from(groupDetails.transactions.values()) : []
	$: settlements = hasGroupDetails ? Array.from(groupDetails.settlements) : []
</script>

<LoadData bind:loading query={GROUP_QUERY.GET_SINGLE} {variables} bind:data>
	{#if hasGroupDetails}
		<PageHeader backUrl="/group" title={groupDetails.name} iconClass="ri-edit-fill" />
		<nav class="level">
			<div class="level-item has-text-centered has-background-link-light has-text-link">
				<div class="custom-level-info">
					<p class="heading">Transactions</p>
					<p class="title">{groupDetails.transactions.length}</p>
				</div>
			</div>
			<div class="level-item has-text-centered has-background-link-light has-text-link center-item">
				<div class="custom-level-info">
					<p class="heading">Total Spent</p>
					<p class="title">₹ {groupDetails.totalAmount}</p>
				</div>
			</div>
			<div class="level-item has-text-centered has-background-link-light has-text-link">
				<div class="custom-level-info">
					<p class="heading">Users</p>
					<p class="title">{groupDetails.users.size}</p>
				</div>
			</div>
		</nav>
		<!-- <LinkButton path={`/group/${$params.groupId}/transaction/new`}>Add Transaction</LinkButton> -->
		<GroupDetails.UserList {users} />
		<GroupDetails.TransactionList {transactions} groupId={$params.groupId} />
		<GroupDetails.SettlementList {settlements} />
	{/if}
</LoadData>

<style lang="scss">
	.level {
		.level-item {
			box-shadow: 0 0 1px 1px;
		}
		.center-item {
			padding: 0.5rem;
			box-shadow: 0 0 2px 2px;
			z-index: 1;
		}
		.custom-level-info {
			min-width: 200px;
		}
	}
	// .panel-heading,
	// .heading {
	// 	font-weight: bold;
	// 	font-size: 1.1rem;
	// }
	// .card {
	// 	width: 100%;
	// 	.card-content {
	// 		padding: 1rem;
	// 		.column:not(:last-child) {
	// 			border-right: 1px solid lightgrey;
	// 		}
	// 	}
	// }
</style>
