import { isEmpty } from '$lib/helpers'
import { derived, writable } from 'svelte/store'
import type { User } from '$lib/@generated/type-graphql'

function createProfileStore() {
	const { subscribe, set } = writable<User | undefined>()

	const setProfile = (profile: User | undefined) => {
		set(profile)
	}
	return {
		subscribe,
		setProfile
	}
}

export const profileInfo = createProfileStore()

export const isAuthenticated = derived(profileInfo, ($profile) => $profile && !isEmpty($profile))
