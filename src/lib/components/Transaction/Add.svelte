<script lang="ts">
	import { goto } from '$app/navigation'

	import {
		Form,
		FormField,
		FormSubmitButton,
		FormResetButton,
		LoadData,
		toastStore
	} from '$lib/components/common'
	import { getFormFields } from './helpers'
	import { USER_QUERY } from '$lib/services'
	import { getString, hasAPIError } from '$lib/helpers'

	import type { ITransaction } from '$lib/types/transaction'
	import type { IUser } from '$lib/types/user'
	import type { OptionType } from '$lib/types'

	let data: { users: IUser[] }
	export let transaction: Partial<ITransaction> = {}
	export let onSubmit: (value: Record<string, unknown>) => Promise<unknown>

	$: isAdd = !transaction.id
	$: submitText = isAdd ? 'Create' : 'Update'
	$: fields = getFormFields(transaction)

	async function submitHandler(value: Record<string, unknown>) {
		if (hasAPIError(await onSubmit(value))) {
			return
		}
		toastStore.successToast(`Transaction ${isAdd ? 'created' : 'updated'} successfully`)
		goto('/transactions')
	}

	$: list = data?.users.map(
		(user) => ({ text: user.name, value: getString(user.id) } as OptionType)
	)
</script>

<LoadData query={USER_QUERY.GET_ALL} bind:value={data}>
	<Form initialFields={fields} onSubmit={submitHandler} let:isSubmitting>
		<FormField name="name" focus={true} />
		<FormField name="amount" type="number" />
		<FormField name="date" type="date" />
		<FormField name="payerId" type="dropdown" {list} />
		<FormField name="ownedUserIds" type="dropdown" multiple={true} {list} />

		<div class="field is-grouped">
			<p class="control">
				<FormSubmitButton {isSubmitting}>{submitText}</FormSubmitButton>
			</p>
			<p class="control">
				<FormResetButton {isSubmitting} />
			</p>
		</div>
	</Form>
</LoadData>
