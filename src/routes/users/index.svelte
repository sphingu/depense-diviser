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
	import { getMutationFn } from '$lib/helpers'

	import type { IUser } from '$lib/components/User/types'

	let data: { users: IUser[] } = { users: [] }
	let loading: boolean
	let reload: () => void
	let userToDelete: IUser

	let mutateUser = getMutationFn(DELETE_USER)

	function setDeletingUser(e: CustomEvent<IUser>) {
		userToDelete = e.detail
	}
	function clearDeletingUser() {
		userToDelete = null
	}
	async function deleteUser() {
		await mutateUser({ id: userToDelete.id })
		reload()
	}
</script>

<ConfirmDeleteModal
	entityTitle="User"
	itemText={userToDelete?.name}
	onDelete={deleteUser}
	on:close={clearDeletingUser}
/>

<PageHeader backUrl="/" title="Users  " />

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
		<UserList users={data.users} on:delete={setDeletingUser} />
	</LoadData>
</div>
