<script lang="ts">
	import { UserAddEdit, PageHeader } from '$lib/components'
	import { USER_QUERY } from '$lib/services'
	import { getMutationFn } from '$lib/helpers'

	import type { IUser } from '$lib/types/user'

	const mutateUser = getMutationFn(USER_QUERY.CREATE)

	const addUser = async (values: Partial<IUser>) => {
		return mutateUser(values)
	}
</script>

<PageHeader backUrl="/users" title="Add User" iconClass="ri-user-add-fill" />
<UserAddEdit onSubmit={addUser} />
