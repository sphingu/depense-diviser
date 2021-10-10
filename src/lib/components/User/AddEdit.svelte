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

	import type { IUser } from '$lib/types/user'

	export let user: Partial<IUser> = {}
	export let onSubmit: (value: Record<string, unknown>) => Promise<unknown>

	$: isAdd = !user.id
	$: submitText = isAdd ? 'Create' : 'Update'
	$: fields = getFormFields(user)

	async function submitHandler(value: Record<string, unknown>) {
		await onSubmit(value)
		toastStore.successToast(`User ${isAdd ? 'created' : 'updated'} successfully`)
		goto('/users')
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
