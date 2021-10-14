<script lang="ts">
	import { page } from '$app/stores'
	import { mutation } from '@urql/svelte'

	import { PageHeader, LoadData, TransactionAddEdit } from '$lib/components'
	import { TRANSACTION_QUERY } from '$lib/services'
  import { getTransactionRequest } from './_helpers'

	import type {
		ITransaction,
		ITransactionCreateQuery,
		ITransactionSingleQuery,
		ITransactionUpdateQuery
	} from '$lib/types/transaction'

	const variables: ITransactionSingleQuery = { id: Number($page.params.id) }
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
	function formatTransaction(transaction: ITransaction): ITransaction {
		return { ...transaction, ownedUserIds: transaction.ownedUsers.map((user) => user.id) }
	}
</script>

<PageHeader backUrl="/transactions" iconClass="ri-exchange-fill" title="Edit Transaction" />

<LoadData bind:loading query={TRANSACTION_QUERY.GET_SINGLE} {variables} bind:value={data}>
	{#if data?.transaction}
		<TransactionAddEdit
			transaction={formatTransaction(data.transaction)}
			onSubmit={updateTransaction}
		/>
	{/if}
</LoadData>
