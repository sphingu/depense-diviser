<script lang="ts">
	import { goto } from '@roxi/routify'

	import { Form, toastStore, LoadData, NoRecord, LinkButton } from '@/lib/components/common'
	import { convertCreateGroupFormData, convertUpdateGroupFormData, getFormFields } from './helpers'
	import { hasAPIError } from '@/lib/helpers'
	import type {
		Group,
		GroupCreateInput,
		GroupUpdateInput,
		User
	} from '@/lib/@generated/type-graphql'
	import type { OptionType } from '@/lib/types'
	import { USER_QUERY } from '@/lib/services'

	export let group: Partial<Group> = {}
	export let onSubmit: (value: GroupUpdateInput | GroupCreateInput) => Promise<unknown>

	let initialFields = getFormFields(group)
	let data: { users: User[] }

	$: isAdd = !group.id
	$: submitText = isAdd ? 'Create' : 'Update'

	async function submitHandler(value: Record<string, unknown>) {
		const groupInfo = isAdd ? convertCreateGroupFormData(value) : convertUpdateGroupFormData(value)

		const response = await onSubmit(groupInfo)
		if (hasAPIError(response)) {
			return
		}

		toastStore.successToast(`Group ${isAdd ? 'created' : 'updated'} successfully`)

		$goto('/group')
	}

	$: list = data?.users.map((user) => ({ text: user.email, value: user.id } as OptionType)) || []
	$: dropdownValues = {
		userIds: list || []
	}
</script>

<LoadData query={USER_QUERY.GET_ALL} bind:data>
	{#if list.length}
		<Form {initialFields} onSubmit={submitHandler} {submitText} {dropdownValues} />
	{:else}
		<NoRecord text="No users has been added yet.">
			<LinkButton path="/user/new" className="is-fullwidth">
				<i slot="icon" class="ri-user-add-fill ri-xl" />
				Add User
			</LinkButton>
		</NoRecord>
	{/if}
</LoadData>
