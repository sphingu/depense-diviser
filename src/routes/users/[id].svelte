<script lang="ts">
	import { page } from '$app/stores'
	import { mutation } from '@urql/svelte'

	import { UserAddEdit, PageHeader, LoadData } from '$lib/components'
	import { USER_QUERY } from '$lib/services'

	import type { IUser, IUserSingleQuery, IUserValues } from '$lib/types/user'

	const variables: IUserSingleQuery = { id: Number($page.params.id) }
	let data: { user?: IUser } = {}
	let loading: boolean

	const updateUserMutation = mutation({ query: USER_QUERY.UPDATE })

	$: user = data?.user

	const updateUser = async (values: IUserValues) => {
		return updateUserMutation({ ...values, id: variables.id })
	}
</script>

<PageHeader backUrl="/users" title="Edit User" iconClass="ri-edit-fill" />

<LoadData bind:loading query={USER_QUERY.GET_SINGLE} {variables} bind:value={data}>
	<UserAddEdit bind:user onSubmit={updateUser} />
</LoadData>
