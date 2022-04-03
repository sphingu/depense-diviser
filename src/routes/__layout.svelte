<script context="module" lang="ts">
	import { Client, createClient } from '@urql/svelte'
	export async function load(): Promise<{ props: { client: Client } }> {
		const client = createClient({
			url: URLS.API
		})
		return {
			props: { client }
		}
	}
</script>

<script lang="ts">
	import { setClient } from '@urql/svelte'
	import { Header, Footer, Toast } from '$lib/components/common'
	import { URLS } from '$lib/constants'
	export let client: Client

	setClient(client)
</script>

<svelte:head><title>D-Diviser</title></svelte:head>

<Toast />
<Header />
<div id="main">
	<section>
		<div class="container">
			<div class="box">
				<slot />
			</div>
		</div>
	</section>
</div>

<Footer />

<style lang="scss" global>
	@import '../scss/app.scss';
</style>
