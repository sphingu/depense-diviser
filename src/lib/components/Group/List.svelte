<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { goto } from '@roxi/routify'
	import Button from '../common/Buttons/Button.svelte'
	import LinkButton from '../common/Buttons/LinkButton.svelte'
	import type { Group } from '@/lib/@generated/type-graphql'

	export let groups: Group[] = []
	const dispatch = createEventDispatcher()

	function deleteGroup(group: Group) {
		dispatch('delete', group)
	}
</script>

{#each groups as group}
	<div class="card is-clickable" on:click={() => $goto(`/group/${group.id}/detail`)}>
		<div class="card-content">
			<div class="content">
				<div class="left-content">
					<h4>{group.name}</h4>
					<span class="tag is-info is-light">Total Users: <b>{group.users.length}</b></span>
					<span class="tag is-success is-light"
						>Total Transactions: <b>{group.transactions.length}</b></span
					>
				</div>
				<div class="right-content">
					<div class="buttons">
						<LinkButton className="is-danger is-light" path={`/group/${group.id}`}>
							<i slot="icon" class="ri-edit-fill ri-xl" />
							Edit
						</LinkButton>
						<Button
							className="is-link is-light"
							on:click={(e) => {
								e.stopPropagation()
								deleteGroup(group)
							}}
						>
							<i slot="icon" class="ri-delete-bin-line ri-xl" />
							Delete
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
{/each}

<style lang="scss">
	.tag {
		b {
			margin-left: 0.5rem;
			font-size: 15px;
		}
	}
	.card {
		&:not(:last-child) {
			margin-bottom: 0.75rem;
		}
		.card-content {
			padding: 0.7rem 1rem;
		}
		h4 {
			margin-bottom: 0.5rem;
		}
		.content {
			display: flex;
			flex-wrap: wrap;
			.left-content {
				flex-grow: 1;
				@media screen and (max-width: 768px) {
					flex-basis: 100%;
					flex-grow: 1;
				}
			}
			.right-content {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				@media screen and (max-width: 768px) {
					flex-grow: 1;
					justify-content: center;
					padding-top: 0.5rem;
				}
			}
		}
	}
</style>
