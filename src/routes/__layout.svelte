<script context="module" lang="ts">
	import { Client, createClient } from '@urql/svelte'
	export async function load(): Promise<{ props: { client: Client } }> {
		const client = createClient({
			url: API_URL
		})
		return {
			props: { client }
		}
	}
</script>

<script lang="ts">
	import { setClient } from '@urql/svelte'
	import { API_URL } from '$lib/constants'
	import { Header, Footer } from '$lib/components/common'
	export let client: Client

	setClient(client)
</script>

<Header />
<div id="main">
	<section class="section pb-0 pt-0">
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
