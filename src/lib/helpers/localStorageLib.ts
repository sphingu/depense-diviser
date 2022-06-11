export const setItem = (key: string, value: unknown) => {
	if (!localStorage) {
		return
	}
	const data = typeof value === 'string' ? value : JSON.stringify(value)
	localStorage.setItem(key, data)
}

export const removeItem = (key: string) => {
	if (!localStorage) {
		return
	}
	localStorage.removeItem(key)
}

export const getItem = (key: string) => {
	if (!localStorage) {
		return
	}
	const data = localStorage.getItem(key)
	try {
		return JSON.parse(data)
	} catch (ex) {
		// JSON format was invalid
		// handle errors is you need to
	}
	return data
}
