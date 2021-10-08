<script lang="ts">
	import { Form, FormField, FormSubmitButton, FormResetButton } from '$lib/components/common'
	import { getFormFields } from './helpers'

	import type { IUser } from './types'

	export let user: Partial<IUser> = {}
	export let onSubmit: (value: Record<string, unknown>) => Promise<void>

	$: isAdd = !user.id
	$: submitText = isAdd ? 'Create' : 'Update'
	$: fields = getFormFields(user)
</script>

<Form initialFields={fields} {onSubmit} let:isSubmitting>
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
