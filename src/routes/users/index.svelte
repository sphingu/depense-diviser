<script lang="ts">
	import { ALL_USERS, DELETE_USER } from '$lib/services'
	import {
		Button,
		LoadData,
		PageHeader,
		LinkButton,
		UserList,
		ConfirmDeleteModal
	} from '$lib/components'

	import type { IUser } from '$lib/components/User/types'
	import { mutation } from '@urql/svelte'

	let data: { users: IUser[] } = { users: [] }
	let loading: boolean
	let reload: () => void
	let isShowConfirmation = false
	let userToDelete: IUser

	let mutateUser = mutation({ query: DELETE_USER })

	function showConfirmation(e: CustomEvent<IUser>) {
		userToDelete = e.detail
		isShowConfirmation = true
	}
	async function deleteUser() {
		await mutateUser({ id: userToDelete.id })
		reload()
	}
</script>

<ConfirmDeleteModal
	bind:show={isShowConfirmation}
	entityName="User"
	itemName={userToDelete?.name}
	on:delete={deleteUser}
/>

<PageHeader backUrl="/" title="User List" />

<div class="block is-flex is-justify-content-space-between">
	<LinkButton path="/users/new">
		<i slot="icon" class="ri-add-circle-line ri-xl" />
		<span>Add User</span>
	</LinkButton>

	<Button {loading} on:click={reload}>
		<i slot="icon" class="ri-add-circle-line ri-xl" />
		Reload
	</Button>
</div>

<div class="block is-relative is-min-height100">
	<LoadData bind:reload bind:loading query={ALL_USERS} bind:value={data}>
		<UserList users={data.users} on:delete={showConfirmation} />
	</LoadData>
</div>
