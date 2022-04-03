<script lang="ts">
	import { mutation } from '@urql/svelte'

	import { PageHeader, TransactionAddEdit } from '$lib/components'
	import { TRANSACTION_QUERY } from '$lib/services'
	import type { TransactionCreateInput } from '$lib/@generated/type-graphql'

	const createTransactionMutation = mutation({ query: TRANSACTION_QUERY.CREATE })

	const createTransaction = async (values: TransactionCreateInput) => {
		return createTransactionMutation({ data: values })
	}
</script>

<PageHeader backUrl="/transactions" iconClass="ri-exchange-fill" title="Add Transaction" />

<TransactionAddEdit onSubmit={createTransaction} />
