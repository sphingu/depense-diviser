<script lang="ts">
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

  import { UserAddEdit, PageHeader, LoadData } from '$lib/components'
	import { EDIT_USER, GET_USER } from '$lib/services'
	import { getMutationFn } from '$lib/helpers'

	import type { IUser } from '$lib/components/User/types'

	const userId = Number($page.params.id)
	let data: { user?: IUser } = {}
	let loading: boolean

	const mutateUser = getMutationFn(EDIT_USER)

	$: user = data?.user

	const updateUser = async (values: Partial<IUser>) => {
		await mutateUser({ ...values, id: userId })
		goto('/users')
	}
</script>

<PageHeader backUrl="/users" title="Edit User" />

<LoadData bind:loading query={GET_USER} variables={{ id: userId }} bind:value={data}>
	<UserAddEdit bind:user onSubmit={updateUser} />
</LoadData>
