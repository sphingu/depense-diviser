<script lang="ts">
	import { operationStore, query as urqlQuery } from '@urql/svelte'

	import type { DocumentNode } from 'graphql'

	export let query: DocumentNode
	export let variables: Record<string, unknown> = undefined
	export let value = undefined
	export let loading = false

	let request = operationStore(
		query,
		{
			variables
		},
		{ requestPolicy: 'cache-first' }
	)

	$: value = $request.data
	$: loading = $request.fetching
	urqlQuery(request)

	export function reload(): void {
		$request.reexecute({ requestPolicy: 'network-only' })
	}
</script>

{#if $request.fetching}
	<slot name="loading">LOADING...</slot>
{:else if $request.error}
	<slot name="error">
		<p style="color: red">{$request.error.message}</p>
	</slot>
{:else}
	<!-- Not followed this way as Not able to set slot props type
  https://github.com/sveltejs/rfcs/pull/38
  https://github.com/sveltejs/language-tools/issues/442
 -->
	<slot data={$request.data} />
{/if}
