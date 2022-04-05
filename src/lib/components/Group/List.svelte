<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { Group } from '$lib/@generated/type-graphql'

	export let groups: Group[] = []
	const dispatch = createEventDispatcher()

	function deleteGroup(group: Group) {
		dispatch('delete', group)
	}
</script>

{#each groups as group}
	<div class="card">
		<div class="card-content">
			<div class="content">
				<div class="columns">
					<div class="column">
						<h4>{group.name}</h4>
						<span class="tag is-info is-light">Total Users: 0</span>
						<span class="tag is-success is-light">Total Transactions: 0</span>
					</div>
					<div class="column is-narrow is-flex">
						<div class="buttons">
							<button class="button is-link is-light">Details</button>
							<button class="button is-info is-light">Edit</button>
							<button class="button is-danger is-light">Delete</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/each}

<style lang="scss">
	.card {
		&:not(:last-child) {
			margin-bottom: 0.75rem;
		}
		.card-content {
			padding: 1rem;
		}
		h4 {
			margin-bottom: 0.5rem;
		}
	}
</style>
