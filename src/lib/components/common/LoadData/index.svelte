<script lang="ts">
	import { operationStore, query as urqlQuery } from '@urql/svelte'
	import type { DocumentNode } from 'graphql'

	import { ProgressBar, LinkButton } from '@/lib/components'
	import { profileInfo } from '@/lib/components/Profile'

	export let query: DocumentNode
	export let variables: Record<string, unknown> = undefined
	export let data = undefined
	export let loading = false

	let request = operationStore(query, variables, { requestPolicy: 'network-only' })

	$: data = $request.data
	$: loading = $request.fetching
	$: isUnauthorized = $request.error?.response?.status === 401 //$request.error?.graphQLErrors[0].extensions.code === 'UNAUTHORIZED'
	urqlQuery(request)

	$: if (isUnauthorized) {
		profileInfo.resetProfile()
	}
	export function reload(): void {
		$request.reexecute({ requestPolicy: 'network-only' })
	}
</script>

{#if $request.fetching}
	<slot name="loading">
		LOADING
		<!-- <ProgressBar /> -->
	</slot>
{:else if $request.error}
	{#if !isUnauthorized}
		<slot name="error">
			<p style="color: red">{$request.error.message}</p>
		</slot>
	{:else}
		<slot name="unauthorize"
			>You are logged out from app. Please login again
			<LinkButton path="/">Login</LinkButton>
		</slot>
	{/if}
{:else}
	<!-- Not followed this way as Not able to set slot props type
  https://github.com/sveltejs/rfcs/pull/38
  https://github.com/sveltejs/language-tools/issues/442
 -->
	<slot data={$request.data} />
{/if}
