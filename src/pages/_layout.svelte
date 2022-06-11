<script lang="ts">
	import { initClient } from '@urql/svelte'
	import { Header, Footer, Toast, LoadData } from '@/lib/components/common'
	import { URLS } from '@/lib/constants'
	import { isAuthenticated, isSetProfile, profileInfo } from '@/lib/components'
	import type { User } from '@/lib/@generated/type-graphql'
	import { USER_QUERY } from '@/lib/services'
	import Login from './login.svelte'

	initClient({
		url: URLS.API
	})

	let profileData: { currentUser?: User } | undefined

	$: if (!$isAuthenticated && profileData?.currentUser?.id && $isSetProfile) {
		profileInfo.setProfile(profileData.currentUser)
		$isSetProfile = false
	}
</script>

<svelte:head><title>D-Diviser</title></svelte:head>

<Toast />
<Header />
<div id="main">
	<section>
		<div class="container">
			<div class="box">
				{#if $isAuthenticated}
					<slot />
				{:else}
					<LoadData query={USER_QUERY.GET_CURRENT_USER} bind:data={profileData}>
						<div slot="unauthorize">
							<Login />
						</div>
						<slot />
					</LoadData>
				{/if}
			</div>
		</div>
	</section>
</div>

<Footer />

<style lang="scss" global>
	@import '../scss/app.scss';
</style>
