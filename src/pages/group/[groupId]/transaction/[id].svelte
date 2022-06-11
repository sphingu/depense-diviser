<script lang="ts">
	import { params } from '@roxi/routify'
	import { mutation } from '@urql/svelte'

	import { PageHeader, LoadData, TransactionAddEdit } from '@/lib/components'
	import { TRANSACTION_QUERY } from '@/lib/services'
	import { isEmpty } from '@/lib/helpers'
	import type { Transaction, TransactionUpdateInput } from '@/lib/@generated/type-graphql'

	const variables: Record<string, { id: string }> = { where: { id: $params.id } }
	let data: { transaction?: Transaction }
	let loading: boolean

	const updateTransactionMutation = mutation({ query: TRANSACTION_QUERY.UPDATE })

	async function updateTransaction(values: TransactionUpdateInput) {
		return updateTransactionMutation({ where: { id: variables.where.id }, data: { ...values } })
	}
</script>

<PageHeader
	backUrl={`/group/${$params.groupId}/detail`}
	iconClass="ri-exchange-fill"
	title="Edit Transaction"
/>

<LoadData bind:loading query={TRANSACTION_QUERY.GET_SINGLE} {variables} bind:data>
	{#if isEmpty(data.transaction)}
		Not able to retrieve transaction information
	{:else}
		<TransactionAddEdit
			groupId={$params.groupId}
			transaction={data.transaction}
			onSubmit={updateTransaction}
		/>
	{/if}
</LoadData>
