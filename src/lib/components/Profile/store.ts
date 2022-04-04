import { isEmpty, localStorage } from '$lib/helpers'
import { derived, writable } from 'svelte/store'
import type { User } from '$lib/@generated/type-graphql'

const PROFILE_KEY = 'profile-key-for-local-storage'

function createProfileStore() {
	const { subscribe, set } = writable<User | undefined>(localStorage.getItem(PROFILE_KEY))
	// const initProfile = () => {
	// 	update((profile) => {
	// 		if (!profile || isEmpty(profile)) {
	// 			return getLocalStorageItem(PROFILE_KEY)
	// 		}
	// 		return profile
	// 	})
	// }
	const setProfile = (profile: User) => {
		set(profile)
		localStorage.setItem(PROFILE_KEY, profile)
	}
	const resetProfile = () => {
		set(undefined)
		localStorage.removeItem(PROFILE_KEY)
	}
	return {
		subscribe,
		setProfile,
		resetProfile
	}
}

export const profileInfo = createProfileStore()
export const isSetProfile = writable(true)

export const isAuthenticated = derived(profileInfo, ($profile) => $profile && !isEmpty($profile))
