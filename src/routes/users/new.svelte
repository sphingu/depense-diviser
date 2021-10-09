<script lang="ts">
	import { UserAddEdit, PageHeader } from '$lib/components'
	import { ADD_USER } from '$lib/services'
	import { getMutationFn } from '$lib/helpers'

	import type { IUser } from '$lib/components/User/types'

	const mutateUser = getMutationFn(ADD_USER)

	const addUser = async (values: Partial<IUser>) => {
		return mutateUser(values)
	}
</script>

<PageHeader backUrl="/users" title="Add User" />
<UserAddEdit onSubmit={addUser} />
