<script lang="ts">
	import { LoadData, PageHeader, isAuthenticated, profileInfo } from '$lib/components'
	import { USER_QUERY } from '$lib/services'
	import Login from './login.svelte'
	import type { User } from '$lib/@generated/type-graphql'

	let profileData: { currentUser?: User } | undefined
	let isSetProflie = !$isAuthenticated

	$: if (isSetProflie && profileData?.currentUser?.id) {
		profileInfo.setProfile(profileData.currentUser)
	}
</script>

<LoadData query={USER_QUERY.GET_CURRENT_USER} bind:data={profileData}>
	<div slot="unauthorize">
		<Login />
	</div>
	<PageHeader title="Home" />
</LoadData>
