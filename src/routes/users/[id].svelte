<script lang="ts">
	import { page } from '$app/stores'

	import { UserAddEdit, PageHeader, LoadData } from '$lib/components'
	import { USER_QUERY } from '$lib/services'
	import { getMutationFn } from '$lib/helpers'

	import type { IUser } from '$lib/types/user'

	const userId = Number($page.params.id)
	let data: { user?: IUser } = {}
	let loading: boolean

	const mutateUser = getMutationFn(USER_QUERY.UPDATE)

	$: user = data?.user

	const updateUser = async (values: Partial<IUser>) => {
		return mutateUser({ ...values, id: userId })
	}
</script>

<PageHeader backUrl="/users" title="Edit User" iconClass="ri-edit-fill" />

<LoadData bind:loading query={USER_QUERY.GET_SINGLE} variables={{ id: userId }} bind:value={data}>
	<UserAddEdit bind:user onSubmit={updateUser} />
</LoadData>
