<script lang="ts">
	import { goto } from '$app/navigation'

	import { LoadData, NoRecord, LinkButton, toastStore, Form } from '$lib/components'
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
			group: { connect: { id: 'fa0ce4a4-2674-4078-835d-a9339529285d' } },
			ownedUsers: { connect: (values.ownedUserIds as string[]).map((id) => ({ id })) }
		}
	}

	export let transaction: Partial<Transaction> = {}
	export let onSubmit: (value: TransactionCreateInput | TransactionUpdateInput) => Promise<unknown>

	let initialFields = getFormFields(transaction)
	let data: { users: User[] }

	$: isAdd = !transaction.id
	$: submitText = isAdd ? 'Create' : 'Update'

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
	$: dropdownValues = {
		payerId: list || [],
		ownedUserIds: list || []
	}
</script>

<LoadData query={USER_QUERY.GET_ALL} bind:data>
	{#if list.length}
		<Form {initialFields} onSubmit={submitHandler} {submitText} {dropdownValues} />
	{:else}
		<NoRecord text="No users has been added yet.">
			<LinkButton path="/users/new" className="is-fullwidth">
				<i slot="icon" class="ri-user-add-fill ri-xl" />
				Add User
			</LinkButton>
		</NoRecord>
	{/if}
</LoadData>
