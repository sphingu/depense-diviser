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
	import { hasAPIError } from '$lib/helpers'
	import type { User, UserCreateInput, UserUpdateInput } from '$lib/@generated/type-graphql'

	export let user: Partial<User> = {}
	export let onSubmit: (value: UserUpdateInput | UserCreateInput) => Promise<unknown>

	$: isAdd = !user.id
	$: submitText = isAdd ? 'Create' : 'Update'
	$: fields = getFormFields(user)

	async function submitHandler(value: Record<string, unknown>) {
		let userInfo = { ...value }
		if (!isAdd) {
			for (const property in userInfo) {
				userInfo[property] = { set: userInfo[property] }
			}
		}
		const response = await onSubmit(userInfo)
		if (hasAPIError(response)) {
			return
		}

		toastStore.successToast(`User ${isAdd ? 'created' : 'updated'} successfully`)
		goto('/users')
	}
</script>

<Form initialFields={fields} onSubmit={submitHandler} let:isSubmitting>
	<FormField name="firstName" focus={true} />
	<FormField name="lastName" />
	<FormField name="email" type="email" />

	<div class="field is-grouped">
		<p class="control">
			<FormSubmitButton {isSubmitting}>{submitText}</FormSubmitButton>
		</p>
		<p class="control">
			<FormResetButton {isSubmitting} />
		</p>
	</div>
</Form>
