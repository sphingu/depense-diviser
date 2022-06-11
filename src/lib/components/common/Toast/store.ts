import { writable } from 'svelte/store'
import * as C from './constants'
import type { ToastMessageType, ToastType } from './types'

function createToasts() {
	const { subscribe, update } = writable([] as ToastMessageType[])
	let toastCount = 0

	const clearAllToast = () =>
		update((messages) => {
			messages.forEach((message) => {
				clearTimeout(message.timerId)
			})

			return []
		})

	const clearToast = (id: string) =>
		update((messages) =>
			messages.filter((message) => {
				if (message.id === id) {
					clearTimeout(message.timerId)
					return false
				}
				return true
			})
		)
	const addToast = (message: string, type: ToastType) => {
		toastCount++
		const timerId: NodeJS.Timeout = setTimeout(
			clearToast.bind(undefined, String(toastCount)),
			C.TIMEOUT
		)

		update((messages) => [
			...messages,
			{
				id: String(toastCount),
				message,
				type,
				timerId
			} as ToastMessageType
		])
	}

	return {
		subscribe,
		clearToast,
		clearAllToast,
		infoToast: (message: string) => addToast(message, 'info'),
		warningToast: (message: string) => addToast(message, 'warning'),
		successToast: (message: string) => addToast(message, 'success'),
		errorToast: (message: string) => addToast(message, 'danger')
	}
}

export const toasts = createToasts()
