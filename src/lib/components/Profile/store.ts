import { isEmpty, localStorageLib } from '@/lib/helpers'
import { derived, writable } from 'svelte/store'

import type { User } from '@/lib/@generated/type-graphql'

const PROFILE_KEY = 'profile-key-for-local-storage'

function createProfileStore() {
	const { subscribe, set } = writable<User | undefined>()
	// const initProfile = () => {
	// 	update((profile) => {
	// 		if (!profile || isEmpty(profile)) {
	// 			return getLocalStorageItem(PROFILE_KEY)
	// 		}
	// 		return profile
	// 	})
	// }
	const initProfile = () => {
		set(localStorageLib.getItem(PROFILE_KEY))
	}
	const setProfile = (profile: User) => {
		set(profile)
		localStorageLib.setItem(PROFILE_KEY, profile)
	}
	const resetProfile = () => {
		set(undefined)
		localStorageLib.removeItem(PROFILE_KEY)
	}
	return {
		subscribe,
		initProfile,
		setProfile,
		resetProfile
	}
}

export const profileInfo = createProfileStore()
export const isSetProfile = writable(true)

export const isAuthenticated = derived(profileInfo, ($profile) => $profile && !isEmpty($profile))
