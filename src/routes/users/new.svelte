<script lang="ts">
	import { mutation } from '@urql/svelte'
	import { goto } from '$app/navigation'

	import { UserAddEdit, PageHeader } from '$lib/components'
	import { ADD_USER } from '$lib/services'

	import type { IUser } from '$lib/components/User/types'

	const mutateUser = mutation({ query: ADD_USER })

	const addUser = async (values: Partial<IUser>) => {
		try {
			await mutateUser(values)
			goto('/users')
		} catch (error) {
			// TODO: handle error
			console.log(error)
		}
	}
</script>

<PageHeader backUrl="/users" title="Add User" />
<UserAddEdit onSubmit={addUser} />
