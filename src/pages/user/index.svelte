<script lang="ts">
	import { mutation } from '@urql/svelte'
	import { USER_QUERY } from '@/lib/services'
	import {
		Button,
		LoadData,
		PageHeader,
		LinkButton,
		UserList,
		ConfirmDeleteModal,
		NoRecord
	} from '@/lib/components'

	import type { User } from '@/lib/@generated/type-graphql'

	let data: { users: User[] }
	let loading: boolean
	let reload: () => void
	let userToDelete: User
	let deleteUserMutation = mutation({ query: USER_QUERY.DELETE })

	function setDeletingUser(e: CustomEvent<User>) {
		userToDelete = e.detail
	}
	function onConfirmDeleteClose(e: CustomEvent) {
		if (e.detail?.deleted) {
			reload()
		}
		userToDelete = null
	}
	async function deleteUser() {
		return deleteUserMutation({ where: { id: userToDelete.id } })
	}
</script>

<ConfirmDeleteModal
	entityTitle="User"
	itemText={userToDelete?.email}
	onDelete={deleteUser}
	on:close={onConfirmDeleteClose}
/>

<PageHeader backUrl="/" title="Users" iconClass="ri-contacts-fill" />

{#if Boolean(data?.users?.length)}
	<div class="block sp-space-between">
		<LinkButton path="/user/new">
			<i slot="icon" class="ri-user-add-fill ri-xl" />
			Add User
		</LinkButton>

		<Button {loading} on:click={reload}>
			<i slot="icon" class="ri-refresh-line ri-xl" />
			Reload
		</Button>
	</div>
{/if}

<LoadData bind:reload bind:loading query={USER_QUERY.GET_ALL} bind:data>
	{#if Boolean(data?.users?.length)}
		<UserList users={data.users} on:delete={setDeletingUser} />
	{:else}
		<NoRecord text="No users has been added yet.">
			<LinkButton path="/user/new" className="is-fullwidth">
				<i slot="icon" class="ri-user-add-fill ri-xl" />
				Add User
			</LinkButton>
		</NoRecord>
	{/if}
</LoadData>
