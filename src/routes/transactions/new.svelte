<script lang="ts">
	import { TransactionAdd, PageHeader } from '$lib/components'
</script>

<PageHeader backUrl="/transactions" iconClass="ri-exchange-fill" title="Add Transaction" />

<TransactionAdd onSubmit={async (values) => console.log(values)} />
