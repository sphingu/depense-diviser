export type ToastType = 'info' | 'warning' | 'success' | 'error'

export type ToastMessageType = {
	id: string
	message: string
	type: ToastType
	timerId: NodeJS.Timeout
}
