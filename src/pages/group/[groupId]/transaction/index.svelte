<script lang="ts">
	import { mutation } from '@urql/svelte'
	import { params } from '@roxi/routify'
	import { TRANSACTION_QUERY } from '@/lib/services'
	import {
		Button,
		LoadData,
		PageHeader,
		LinkButton,
		TransactionList,
		ConfirmDeleteModal,
		ExpandButton,
		NoRecord
	} from '@/lib/components'
	import type { Transaction } from '@/lib/@generated/type-graphql'

	let data: { transactions?: Transaction[] }
	let loading: boolean
	let expanded = true
	let reload: () => void
	let transactionToDelete: Transaction
	let mutateTransaction = mutation({ query: TRANSACTION_QUERY.DELETE })

	function setDeletingTransaction(e: CustomEvent<{ transaction: Transaction }>) {
		transactionToDelete = e.detail.transaction
	}
	function onConfirmDeleteClose(e: CustomEvent) {
		if (e.detail?.deleted) {
			reload()
		}
		transactionToDelete = null
	}
	async function deleteTransaction() {
		return mutateTransaction({ where: { id: transactionToDelete.id } })
	}
</script>

<ConfirmDeleteModal
	entityTitle="Transaction"
	itemText={transactionToDelete?.name}
	onDelete={deleteTransaction}
	on:close={onConfirmDeleteClose}
/>

<PageHeader backUrl="/" title="Transactions" iconClass="ri-exchange-fill" />
{#if Boolean(data?.transactions?.length)}
	<div class="block sp-space-between">
		<LinkButton path={`/group/${$params.groupId}/transaction/new`}>
			<i slot="icon" class="ri-exchange-line ri-xl" />
			Add Transaction
		</LinkButton>
		<div>
			<ExpandButton bind:expanded />
			<Button {loading} on:click={reload}>
				<i slot="icon" class="ri-refresh-line ri-xl" />
			</Button>
		</div>
	</div>
{/if}

<LoadData bind:reload bind:loading query={TRANSACTION_QUERY.GET_ALL} bind:data>
	{#if Boolean(data?.transactions?.length)}
		<TransactionList
			groupId={$params.groupId}
			bind:expanded
			transactions={data?.transactions}
			on:delete={setDeletingTransaction}
		/>
	{:else}
		<NoRecord text="No transactions has been made yet.">
			<LinkButton path={`/group/${$params.groupId}/transaction/new`} className="is-fullwidth">
				<i slot="icon" class="ri-exchange-line ri-xl" />
				Add Transaction
			</LinkButton>
		</NoRecord>
	{/if}
</LoadData>
