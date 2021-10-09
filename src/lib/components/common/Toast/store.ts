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
			messages.reduce((acc, message) => {
				if (message.id === id) {
					clearTimeout(message.timerId)
				} else {
					acc = [...acc, message]
				}

				return acc
			}, [] as ToastMessageType[])
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

	const infoToast = (message: string) => addToast(message, 'info')
	const warningToast = (message: string) => addToast(message, 'warning')
	const successToast = (message: string) => addToast(message, 'success')
	const errorToast = (message: string) => addToast(message, 'danger')

	return {
		subscribe,
		infoToast,
		warningToast,
		successToast,
		errorToast,
		clearToast,
		clearAllToast
	}
}

export const toasts = createToasts()
