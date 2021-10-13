<script lang="ts">
	import { mutation } from '@urql/svelte'

	import { TransactionAdd, PageHeader } from '$lib/components'
	import { getTransactionRequest } from './_helpers'
	import { TRANSACTION_QUERY } from '$lib/services'
	import type { ITransactionCreateQuery } from '$lib/types/transaction'

	const createTransactionMutation = mutation({ query: TRANSACTION_QUERY.CREATE })

	const createTransaction = async (values: Record<keyof ITransactionCreateQuery, unknown>) => {
		return createTransactionMutation(getTransactionRequest(values))
	}
</script>

<PageHeader backUrl="/transactions" iconClass="ri-exchange-fill" title="Add Transaction" />

<TransactionAdd onSubmit={createTransaction} />
