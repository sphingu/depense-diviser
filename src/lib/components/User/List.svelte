<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { Card, Anchor } from '@/lib/components'
	import type { User } from '@/lib/@generated/type-graphql'

	export let users: User[] = []
	const dispatch = createEventDispatcher()

	function deleteUser(user: User) {
		dispatch('delete', user)
	}
</script>

<div class="columns is-multiline is-centered">
	{#each users as user}
		<div class="column is-half is-one-third-widescreen">
			<Card>
				<svelte:fragment slot="header">
					<i class="ri-user-fill ri-2x" />
					<div class="card-header-content">
						<div class="has-text-weight-bold">{user.firstName} {user.lastName}</div>
					</div>
				</svelte:fragment>
				<svelte:fragment slot="footer">
					<Anchor href={`/user/${user.id}`} class="card-footer-item">
						<span class="icon">
							<i class="ri-edit-fill" />
						</span>
						<span>Edit</span>
					</Anchor>
					<!-- svelte-ignore a11y-invalid-attribute -->
					<Anchor
						href="javascript:void(0)"
						class="card-footer-item"
						on:click={() => deleteUser(user)}
					>
						<span class="icon">
							<i class="ri-delete-bin-line" />
						</span>
						<span>Delete</span>
					</Anchor>
				</svelte:fragment>

				<span class="icon has-text-info-dark">
					<i class="ri-mail-fill" />
				</span>
				<div>
					<span class="tag is-info is-light is-medium">{user.email}</span>
				</div>
			</Card>
		</div>
	{/each}
</div>
