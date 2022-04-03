<script lang="ts">
	import {
		LoadData,
		PageHeader,
		GoogleLoginButton,
		isAuthenticated,
		profileInfo
	} from '$lib/components'
	import { URLS } from '$lib/constants'
	import { USER_QUERY } from '$lib/services'
	import type { User } from '$lib/@generated/type-graphql'

	let loading = false
	let data: { currentUser?: User } | undefined
	let isSetProflie = !$isAuthenticated
	$: if (isSetProflie && data?.currentUser?.id) {
		profileInfo.setProfile(data.currentUser)
	}

	function googleLogin() {
		window.location.href = URLS.GOOGLE_LOGIN
	}
</script>

<LoadData bind:loading query={USER_QUERY.GET_CURRENT_USER} bind:data>
	<div slot="unauthorize">
		<PageHeader title="Please login" />
		<div class="block sp-v-center">
			<GoogleLoginButton on:click={googleLogin} />
		</div>
	</div>
	<PageHeader>
		{`Welcome ${$profileInfo?.firstName} ${$profileInfo?.lastName}`}
	</PageHeader>
</LoadData>
