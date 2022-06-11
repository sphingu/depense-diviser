<script lang="ts">
	import { goto } from '@roxi/routify'

	import { toastStore, Form } from '@/lib/components'
	import { getFormFields } from './helpers'
	import { hasAPIError } from '@/lib/helpers'
	import type { User, UserCreateInput, UserUpdateInput } from '@/lib/@generated/type-graphql'

	export let user: Partial<User> = {}
	export let onSubmit: (value: UserUpdateInput | UserCreateInput) => Promise<unknown>

	const initialFields = getFormFields(user)

	$: isAdd = !user.id
	$: submitText = isAdd ? 'Create' : 'Update'
	async function submitHandler(values: Record<string, unknown>) {
		let userInfo = { ...values }
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
		$goto('/user')
	}
</script>

<Form {initialFields} onSubmit={submitHandler} {submitText} />
