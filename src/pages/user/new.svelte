<script lang="ts">
	import { mutation } from '@urql/svelte'
	import { UserAddEdit, PageHeader } from '@/lib/components'
	import { USER_QUERY } from '@/lib/services'
	import type { UserCreateInput } from '@/lib/@generated/type-graphql'

	const createUserMutation = mutation({ query: USER_QUERY.CREATE })

	const addUser = async (values: UserCreateInput) => {
		return createUserMutation({ data: values })
	}
</script>

<PageHeader backUrl="/user" title="Add User" iconClass="ri-user-add-fill" />
<UserAddEdit onSubmit={addUser} />
