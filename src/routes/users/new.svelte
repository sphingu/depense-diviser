<script lang="ts">
	import { mutation } from '@urql/svelte'
	import { UserAddEdit, PageHeader } from '$lib/components'
	import { USER_QUERY } from '$lib/services'

	import type { IUser } from '$lib/types/user'

	const createUserMutation = mutation({ query: USER_QUERY.CREATE })

	const addUser = async (values: IUser) => {
		return createUserMutation(values)
	}
</script>

<PageHeader backUrl="/users" title="Add User" iconClass="ri-user-add-fill" />
<UserAddEdit onSubmit={addUser} />
