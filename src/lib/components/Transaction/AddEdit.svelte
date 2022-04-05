<script lang="ts">
	import { goto } from '$app/navigation'

	import {
		Form,
		FormField,
		FormSubmitButton,
		FormResetButton,
		LoadData,
		NoRecord,
		LinkButton,
		toastStore
	} from '$lib/components'
	import { getFormFields } from './helpers'
	import { USER_QUERY } from '$lib/services'
	import { getString, hasAPIError } from '$lib/helpers'

	import type { OptionType } from '$lib/types'
	import type {
		Transaction,
		TransactionCreateInput,
		TransactionUpdateInput,
		User
	} from '$lib/@generated/type-graphql'
	// TODO: Move to dedicated helper file
	function getTransactionUpdateRequest(values: Record<string, unknown>): TransactionUpdateInput {
		return {
			name: { set: values.name as string },
			amount: { set: Number(values.amount) },
			date: { set: new Date(values.date as string).getTime() as any },
			payer: { connect: { id: values.payerId as string } },
			ownedUsers: { set: (values.ownedUserIds as string[]).map((id) => ({ id })) }
		}
	}
	function getTransactionCreateRequest(values: Record<string, unknown>): TransactionCreateInput {
		return {
			name: values.name as string,
			amount: Number(values.amount),
			date: new Date(values.date as string).getTime() as any,
			payer: { connect: { id: values.payerId as string } },
			// TODO: temporary added, need to be removed
			group: { connect: { id: '9ab5bdbe-34e4-45a1-8cc8-9da28e8cced2' } },
			ownedUsers: { connect: (values.ownedUserIds as string[]).map((id) => ({ id })) }
		}
	}

	let data: { users: User[] }
	export let transaction: Partial<Transaction> = {}
	export let onSubmit: (value: TransactionCreateInput | TransactionUpdateInput) => Promise<unknown>

	$: isAdd = !transaction.id
	$: submitText = isAdd ? 'Create' : 'Update'
	$: fields = getFormFields(transaction)

	async function submitHandler(value: Record<string, unknown>) {
		let transactionInfo: TransactionCreateInput | TransactionUpdateInput = isAdd
			? getTransactionCreateRequest({ ...value })
			: getTransactionUpdateRequest({ ...value })
		if (hasAPIError(await onSubmit(transactionInfo))) {
			return
		}
		toastStore.successToast(`Transaction ${isAdd ? 'created' : 'updated'} successfully`)
		goto('/transactions')
	}

	$: list =
		data?.users.map((user) => ({ text: user.email, value: getString(user.id) } as OptionType)) || []
</script>

<LoadData query={USER_QUERY.GET_ALL} bind:data>
	{#if list.length}
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
	{:else}
		<NoRecord text="No users has been added yet.">
			<LinkButton path="/users/new" className="is-fullwidth">
				<i slot="icon" class="ri-user-add-fill ri-xl" />
				Add User
			</LinkButton>
		</NoRecord>
	{/if}
</LoadData>
