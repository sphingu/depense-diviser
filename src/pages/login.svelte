<script lang="ts">
	import { PageHeader, GoogleLoginButton } from '@/lib/components'
	import { URLS } from '@/lib/constants'
	function googleLogin() {
		window.location.href = URLS.GOOGLE_LOGIN
	}
</script>

<PageHeader title="Login to Your Account" />

<div class="block sp-v-center">
	<GoogleLoginButton on:click={googleLogin} />
</div>
