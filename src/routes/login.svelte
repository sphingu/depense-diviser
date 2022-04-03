<script lang="ts">
	import { PageHeader, GoogleLoginButton } from '$lib/components'
	import { URLS } from '$lib/constants'
	function googleLogin() {
		window.location.href = URLS.GOOGLE_LOGIN
	}
</script>

<PageHeader title="Login to Your Account" />

<div class="block sp-v-center">
	<GoogleLoginButton on:click={googleLogin} />
</div>

<!-- <script context="module">
	export const ssr = false
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<div class="sp-v-center">
	<div
		id="g_id_onload"
		data-client_id={import.meta.env.VITE_OAUTH_GOOGLE_CLIENT_ID}
		data-context="signin"
		data-ux_mode="redirect"
		data-callback1="onSignIn"
		data-login_uri1="https://httpbin.org/post"
		data-login_uri={import.meta.env.VITE_OAUTH_GOOGLE_CALLBACK_URL}
		data-auto_select="false"
		data-close_on_tap_outside="false"
	/>

	<div
		class="g_id_signin"
		data-type="standard"
		data-shape="rectangular"
		data-theme="outline"
		data-text="signin_with"
		data-size="large"
		data-logo_alignment="left"
	/>
</div> -->
