<script lang="ts">
	import { page } from '$app/stores'

	import { PageHeader, LoadData } from '$lib/components'
	import { GROUP_QUERY } from '$lib/services'
	import { isEmpty } from '$lib/helpers'

	import type { Group } from '$lib/@generated/type-graphql'

	const variables: Record<string, { id: string }> = { where: { id: $page.params.id } }
	let data: { group?: Group } = {}
	let loading: boolean

	$: hasGroupInfo = !isEmpty(data?.group)
</script>

<LoadData bind:loading query={GROUP_QUERY.GET_SINGLE} {variables} bind:data>
	{#if hasGroupInfo}
		<PageHeader backUrl="/groups" title={data.group.name} iconClass="ri-edit-fill" />
		<nav class="level">
			<div class="level-item has-text-centered has-background-link-light has-text-link">
				<div>
					<p class="heading">Transactions</p>
					<p class="title">{data.group.transactions.length}</p>
				</div>
			</div>
			<div class="level-item has-text-centered has-background-link-light has-text-link center-item">
				<div>
					<p class="heading">Total Spent</p>
					<p class="title">₹ 789</p>
				</div>
			</div>
			<div class="level-item has-text-centered has-background-link-light has-text-link">
				<div>
					<p class="heading">Users</p>
					<p class="title">{data.group.users.length}</p>
				</div>
			</div>
		</nav>
		<div class="tabs is-centered is-medium">
			<ul>
				<li class="is-active"><a>Users</a></li>
				<li><a>Transactions</a></li>
				<li><a>Settlement</a></li>
			</ul>
		</div>
		<article class="panel is-link">
			<p class="panel-heading">Users</p>
			{#each data.group.users as user}
				<div class="panel-block">
					<div class="card is-clickable">
						<div class="card-content">
							<div class="columns content">
								<div class="column">
									{user.id}
								</div>
								<div class="column">spent + owed = total</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</article>
	{/if}
</LoadData>

<style lang="scss">
	.level {
		.level-item {
			box-shadow: 0 0 1px 1px;
			border-radius: 5px;
		}
		.center-item {
			padding: 1rem;
			box-shadow: 0 0 2px 2px;
			z-index: 1;
			border-radius: 5px;
		}
	}
	.panel-heading {
		font-size: 1.1rem;
	}
	.card {
		width: 100%;
		.card-content {
			padding: 1rem;
			.column:not(:last-child) {
				border-right: 1px solid lightgrey;
			}
		}
	}
</style>
