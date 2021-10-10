<script lang="ts">
	import { USER_QUERY } from '$lib/services'
	import {
		Button,
		LoadData,
		PageHeader,
		LinkButton,
		UserList,
		ConfirmDeleteModal
	} from '$lib/components'
	import { getMutationFn } from '$lib/helpers'

	import type { IUser } from '$lib/types/user'

	let data: { users: IUser[] } = { users: [] }
	let loading: boolean
	let reload: () => void
	let userToDelete: IUser

	let mutateUser = getMutationFn(USER_QUERY.DELETE)

	function setDeletingUser(e: CustomEvent<IUser>) {
		userToDelete = e.detail
	}
	function onConfirmDeleteClose(e: CustomEvent) {
		if (e.detail?.deleted) {
			reload()
		}
		userToDelete = null
	}
	async function deleteUser() {
		return mutateUser({ id: userToDelete.id })
	}
</script>

<ConfirmDeleteModal
	entityTitle="User"
	itemText={userToDelete?.name}
	onDelete={deleteUser}
	on:close={onConfirmDeleteClose}
/>

<PageHeader backUrl="/" title="Users" iconClass="ri-contacts-fill" />

<div class="block is-flex is-justify-content-space-between">
	<LinkButton path="/users/new">
		<i slot="icon" class="ri-user-add-fill ri-xl" />
		<span>Add User</span>
	</LinkButton>

	<Button {loading} on:click={reload}>
		<i slot="icon" class="ri-refresh-line ri-xl" />
		Reload
	</Button>
</div>

<div class="block is-relative is-min-height100">
	<LoadData bind:reload bind:loading query={USER_QUERY.GET_ALL} bind:value={data}>
		<UserList users={data.users} on:delete={setDeletingUser} />
	</LoadData>
</div>
