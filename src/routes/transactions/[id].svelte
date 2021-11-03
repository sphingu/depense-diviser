<script lang="ts">
	import { page } from '$app/stores'
	import { mutation } from '@urql/svelte'

	import { PageHeader, LoadData, TransactionAddEdit } from '$lib/components'
	import { getTransactionRequest, formatTransactionResponse } from './_helpers'
	import { TRANSACTION_QUERY } from '$lib/services'
	import { isEmpty } from '$lib/helpers'

	import type {
		ITransaction,
		ITransactionCreateQuery,
		ITransactionSingleQuery,
		ITransactionUpdateQuery
	} from '$lib/types/transaction'

	const variables: ITransactionSingleQuery = { id: $page.params.id }
	let data: { transaction?: ITransaction }
	let loading: boolean

	const updateTransactionMutation = mutation({ query: TRANSACTION_QUERY.UPDATE })

	async function updateTransaction(values: Record<keyof ITransactionCreateQuery, unknown>) {
		return updateTransactionMutation({
			...getTransactionRequest(values),
			values,
			id: variables.id
		} as ITransactionUpdateQuery)
	}
</script>

<PageHeader backUrl="/transactions" iconClass="ri-exchange-fill" title="Edit Transaction" />

<LoadData bind:loading query={TRANSACTION_QUERY.GET_SINGLE} {variables} bind:data>
	{#if isEmpty(data.transaction)}
		Not able to retrieve transaction information
	{:else}
		<TransactionAddEdit
			transaction={formatTransactionResponse(data.transaction)}
			onSubmit={updateTransaction}
		/>
	{/if}
</LoadData>
