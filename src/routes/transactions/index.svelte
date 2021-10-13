<script lang="ts">
	import { TRANSACTION_QUERY } from '$lib/services'
	import {
		Button,
		LoadData,
		PageHeader,
		LinkButton,
		TransactionList,
		ConfirmDeleteModal
	} from '$lib/components'
	import { getMutationFn } from '$lib/helpers'

	import type { ITransaction } from '$lib/types/transaction'

	let data: { transactions?: ITransaction[] }
	let loading: boolean
	let reload: () => void
	let transactionToDelete: ITransaction

	let mutateTransaction = getMutationFn(TRANSACTION_QUERY.DELETE)

	function setDeletingTransaction(e: CustomEvent<ITransaction>) {
		transactionToDelete = e.detail
	}
	function onConfirmDeleteClose(e: CustomEvent) {
		if (e.detail?.deleted) {
			reload()
		}
		transactionToDelete = null
	}
	async function deleteTransaction() {
		return mutateTransaction({ id: transactionToDelete.id })
	}
</script>

<ConfirmDeleteModal
	entityTitle="Transaction"
	itemText={transactionToDelete?.name}
	onDelete={deleteTransaction}
	on:close={onConfirmDeleteClose}
/>

<PageHeader backUrl="/" title="Transactions" iconClass="ri-exchange-fill" />

<div class="block is-flex is-justify-content-space-between">
	<LinkButton path="/transactions/new">
		<i slot="icon" class="ri-exchange-line ri-xl" />
		<span>Add Transaction</span>
	</LinkButton>

	<Button {loading} on:click={reload}>
		<i slot="icon" class="ri-refresh-line ri-xl" />
		Reload
	</Button>
</div>

<div class="block is-relative is-min-height100">
	<LoadData bind:reload bind:loading query={TRANSACTION_QUERY.GET_ALL} bind:value={data}>
		<TransactionList transactions={data?.transactions} on:delete={setDeletingTransaction} />
	</LoadData>
</div>
