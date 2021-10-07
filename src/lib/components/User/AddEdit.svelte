<script lang="ts">
	import { Form, FormField, FormSubmitButton, FormResetButton } from '$lib/components/common'
	import { getFormFields } from './helpers'

	import type { IUser } from './types'
	import type { FieldType } from '$lib/components/common/Form/types'

	export let user: Partial<IUser> = {}
	export let onSubmit: (value: Record<string, unknown>) => Promise<void>

	let fields: FieldType[] = getFormFields(user)

	$: isAdd = !user.id
	$: submitText = isAdd ? 'Create' : 'Update'
</script>

<Form initialFields={fields} {onSubmit} let:isSubmitting>
	<FormField name="name" />
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
