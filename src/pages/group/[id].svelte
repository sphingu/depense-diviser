<script lang="ts">
	params
	import { mutation } from '@urql/svelte'
	import { params } from '@roxi/routify'

	import { PageHeader, LoadData, GroupAddEdit } from '@/lib/components'
	import { GROUP_QUERY } from '@/lib/services'
	import { isEmpty } from '@/lib/helpers'

	import type { Group, GroupUpdateInput } from '@/lib/@generated/type-graphql'

	const variables: Record<string, { id: string }> = { where: { id: $params.id } }
	let data: { group?: Group }
	let loading: boolean

	const updateGroupMutation = mutation({ query: GROUP_QUERY.UPDATE })

	const updateGroup = async (values: GroupUpdateInput) => {
		return updateGroupMutation({ where: { id: variables.where.id }, data: { ...values } })
	}
</script>

<PageHeader backUrl="/group" title="Edit Group" iconClass="ri-edit-fill" />

<LoadData bind:loading query={GROUP_QUERY.GET_SINGLE} {variables} bind:data>
	{#if isEmpty(data.group)}
		Not able to retrieve group information
	{:else}
		<GroupAddEdit group={data.group} onSubmit={updateGroup} />
	{/if}
</LoadData>
