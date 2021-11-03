import { isEmpty } from '$lib/helpers'
import type { IUser } from '$lib/types/user'
import { derived, writable } from 'svelte/store'

function createProfileStore() {
	const { subscribe, set } = writable<IUser | undefined>()

	const setProfile = (profile: IUser | undefined) => {
		set(profile)
	}
	return {
		subscribe,
		setProfile
	}
}

export const profileInfo = createProfileStore()

export const isAuthenticated = derived(profileInfo, ($profile) => $profile && !isEmpty($profile))
