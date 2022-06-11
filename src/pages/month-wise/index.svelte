<script lang="ts">
	import {
		LoadData,
		PageHeader,
		TransactionMonthlyList,
		NoRecord,
		LinkButton
	} from '@/lib/components'
	import { TRANSACTION_QUERY } from '@/lib/services'
	import type { IMonthlyTransaction } from '@/lib/types/transaction'
	import { formatMonthlyTransactions } from './_helpers'

	let data: { monthlyTransactions: IMonthlyTransaction[] }
</script>

<PageHeader backUrl="/" title="Monthly Report" />

<LoadData query={TRANSACTION_QUERY.GET_MONTHLY} bind:data>
	{#if Boolean(data?.monthlyTransactions?.length)}
		<TransactionMonthlyList
			monthlyTransactions={formatMonthlyTransactions(data.monthlyTransactions)}
		/>
	{:else}
		<NoRecord text="No transactions has been made yet.">
			<LinkButton path="/transactions/new" className="is-fullwidth">
				<i slot="icon" class="ri-exchange-line ri-xl" />
				Add Transaction
			</LinkButton>
		</NoRecord>
	{/if}
</LoadData>
