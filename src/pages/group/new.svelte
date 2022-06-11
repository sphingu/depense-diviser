<script lang="ts">
	import { mutation } from '@urql/svelte'
	import { GroupAddEdit, PageHeader } from '@/lib/components'
	import { GROUP_QUERY } from '@/lib/services'
	import type { GroupCreateInput } from '@/lib/@generated/type-graphql'

	const createGroupMutation = mutation({ query: GROUP_QUERY.CREATE })

	const addGroup = async (values: GroupCreateInput) => {
		return createGroupMutation({ data: values })
	}
</script>

<PageHeader backUrl="/group" title="Add Group" iconClass="ri-user-add-fill" />
<GroupAddEdit onSubmit={addGroup} />
