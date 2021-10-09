<script lang="ts">
	import { goto } from '$app/navigation'

	import {
		Form,
		FormField,
		FormSubmitButton,
		FormResetButton,
		toastStore
	} from '$lib/components/common'
	import { getFormFields } from './helpers'

	import type { IUser } from './types'

	export let user: Partial<IUser> = {}
	export let onSubmit: (value: Record<string, unknown>) => Promise<unknown>

	$: isAdd = !user.id
	$: submitText = isAdd ? 'Create' : 'Update'
	$: fields = getFormFields(user)

	async function submitHandler(value: Record<string, unknown>) {
		try {
			const response = await onSubmit(value)
			if (response['error']) {
				throw new Error(response['error']['name'])
			}
			toastStore.successToast(`User ${isAdd ? 'created' : 'updated'} successfully`)
			goto('/users')
		} catch (error) {
			toastStore.errorToast(
				`Error occured while ${isAdd ? 'creating' : 'updating'} user : ${error.message}`
			)
		}
	}
</script>

<Form initialFields={fields} onSubmit={submitHandler} let:isSubmitting>
	<FormField name="name" focus={true} />
	<FormField name="email" />

	<div class="field is-grouped">
		<p class="control">
			<FormSubmitButton {isSubmitting}>{submitText}</FormSubmitButton>
		</p>
		<p class="control">
			<FormResetButton {isSubmitting} />
		</p>
	</div>
</Form>
