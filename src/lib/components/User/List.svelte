<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	import type { IUser } from './types'

	export let users: IUser[] = []
	const dispatch = createEventDispatcher()

	function deleteUser(user: IUser) {
		dispatch('delete', user)
	}
</script>

{#if users.length}
	<div class="columns is-multiline is-centered">
		{#each users as user}
			<div class="column is-one-third-widescreen is-half-desktop is-half-tablet">
				<div class="card">
					<div class="card-content">
						<div class="media">
							<div class="media-left">
								<figure class="image is-48x48 has-background-grey-light" />
							</div>
							<div class="media-content">
								<p class="title is-4">{user.name}</p>
								<p class="subtitle is-6">{user.email}</p>
							</div>
						</div>
					</div>
					<footer class="card-footer">
						<a href={`/users/${user.id}`} class="card-footer-item">Edit</a>
						<!-- svelte-ignore a11y-invalid-attribute -->
						<a href="javascript:void(0)" class="card-footer-item" on:click={() => deleteUser(user)}
							>Delete</a
						>
					</footer>
				</div>
			</div>
		{/each}
	</div>
{:else}
	No users found
{/if}
