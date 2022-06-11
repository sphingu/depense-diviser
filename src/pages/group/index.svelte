<script lang="ts">
	import {
		LoadData,
		PageHeader,
		NoRecord,
		LinkButton,
		Button,
		GroupList,
		ConfirmDeleteModal
	} from '@/lib/components'
	import { GROUP_QUERY } from '@/lib/services'

	import type { Group } from '@/lib/@generated/type-graphql'
	import { mutation } from '@urql/svelte'

	let loading = false
	let groupList: { currentUserGroups?: Group[] }
	let reload: () => void
	let groupToDelete: Group
	let deleteGroupMutation = mutation({ query: GROUP_QUERY.DELETE })

	function setDeletingGroup(e: CustomEvent<Group>) {
		groupToDelete = e.detail
	}
	function onConfirmDeleteClose(e: CustomEvent) {
		if (e.detail?.deleted) {
			reload()
		}
		groupToDelete = null
	}
	async function deleteGroup() {
		return deleteGroupMutation({ where: { id: groupToDelete.id } })
	}

	$: groups = groupList?.currentUserGroups || []
	$: hasGroups = Boolean(groups.length)
</script>

<ConfirmDeleteModal
	entityTitle="Group"
	itemText={groupToDelete?.name}
	onDelete={deleteGroup}
	on:close={onConfirmDeleteClose}
/>

<PageHeader backUrl="/" title="Groups" iconClass="ri-contacts-fill" />

{#if hasGroups}
	<div class="block sp-space-between">
		<LinkButton path="/group/new">
			<i slot="icon" class="ri-user-add-fill ri-xl" />
			Add Group
		</LinkButton>

		<Button {loading} on:click={reload}>
			<i slot="icon" class="ri-refresh-line ri-xl" />
			Reload
		</Button>
	</div>
{/if}

<LoadData bind:reload bind:loading query={GROUP_QUERY.GET_ALL} bind:data={groupList}>
	{#if hasGroups}
		<GroupList {groups} on:delete={setDeletingGroup} />
	{:else}
		<NoRecord text="No groups has been added yet.">
			<LinkButton path="/group/new" className="is-fullwidth">
				<i slot="icon" class="ri-group-fill ri-xl" />
				Add Group
			</LinkButton>
		</NoRecord>
	{/if}
</LoadData>
