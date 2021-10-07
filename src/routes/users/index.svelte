<script lang="ts">
	import { ALL_USERS } from '$lib/services'
	import { Button, LoadData, PageHeader, LinkButton, UserList } from '$lib/components'

	import type { IUser } from '$lib/components/User/types'

	let data: { users: IUser[] } = { users: [] }
	let loading: boolean
	let reload: () => void
</script>

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
		<UserList users={data.users} />
	</LoadData>
</div>
