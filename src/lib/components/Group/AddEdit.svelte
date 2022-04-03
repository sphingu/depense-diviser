<script lang="ts">
	import { goto } from '$app/navigation'

	import {
		Form,
		FormField,
		FormSubmitButton,
		FormResetButton,
		toastStore,
		LoadData,
		NoRecord,
		LinkButton
	} from '$lib/components/common'
	import { convertCreateGroupFormData, convertUpdateGroupFormData, getFormFields } from './helpers'
	import { hasAPIError } from '$lib/helpers'
	import type {
		Group,
		GroupCreateInput,
		GroupUpdateInput,
		User
	} from '$lib/@generated/type-graphql'
	import type { OptionType } from '$lib/types'
	import { USER_QUERY } from '$lib/services'

	export let group: Partial<Group> = {}
	export let onSubmit: (value: GroupUpdateInput | GroupCreateInput) => Promise<unknown>

	let data: { users: User[] }

	$: isAdd = !group.id
	$: submitText = isAdd ? 'Create' : 'Update'
	$: fields = getFormFields(group)

	async function submitHandler(value: Record<string, unknown>) {
		const groupInfo = isAdd ? convertCreateGroupFormData(value) : convertUpdateGroupFormData(value)

		const response = await onSubmit(groupInfo)
		if (hasAPIError(response)) {
			return
		}

		toastStore.successToast(`Group ${isAdd ? 'created' : 'updated'} successfully`)
		goto('/groups')
	}

	$: list = data?.users.map((user) => ({ text: user.email, value: user.id } as OptionType)) || []
</script>

<LoadData query={USER_QUERY.GET_ALL} bind:data>
	{#if list.length}
		<Form initialFields={fields} onSubmit={submitHandler} let:isSubmitting>
			<FormField name="name" focus={true} />
			<FormField name="userIds" type="dropdown" multiple={true} {list} />
			<FormField name="isMonthlySettle" type="boolean" />

			<div class="field is-grouped">
				<p class="control">
					<FormSubmitButton {isSubmitting}>{submitText}</FormSubmitButton>
				</p>
				<p class="control">
					<FormResetButton {isSubmitting} />
				</p>
			</div>
		</Form>
	{:else}
		<NoRecord text="No users has been added yet.">
			<LinkButton path="/users/new" className="is-fullwidth">
				<i slot="icon" class="ri-user-add-fill ri-xl" />
				Add User
			</LinkButton>
		</NoRecord>
	{/if}
</LoadData>
