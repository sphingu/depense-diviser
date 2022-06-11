export type ToastType = 'info' | 'warning' | 'success' | 'danger'

export type ToastMessageType = {
	id: string
	message: string
	type: ToastType
	timerId: NodeJS.Timeout
}
