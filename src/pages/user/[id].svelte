<script lang="ts">
	import { params } from '@roxi/routify'
	import { mutation } from '@urql/svelte'

	import { UserAddEdit, PageHeader, LoadData } from '@/lib/components'
	import { USER_QUERY } from '@/lib/services'
	import { isEmpty } from '@/lib/helpers'

	import type { User, UserUpdateInput } from '@/lib/@generated/type-graphql'

	const variables: Record<string, { id: string }> = { where: { id: $params.id } }
	let data: { user?: User }
	let loading: boolean

	const updateUserMutation = mutation({ query: USER_QUERY.UPDATE })

	const updateUser = async (values: UserUpdateInput) => {
		return updateUserMutation({ where: { id: variables.where.id }, data: { ...values } })
	}
</script>

<PageHeader backUrl="/user" title="Edit User" iconClass="ri-edit-fill" />

<LoadData bind:loading query={USER_QUERY.GET_SINGLE} {variables} bind:data>
	{#if isEmpty(data.user)}
		Not able to retrieve user information
	{:else}
		<UserAddEdit user={data?.user} onSubmit={updateUser} />
	{/if}
</LoadData>
