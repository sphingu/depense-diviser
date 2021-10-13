export default (value?: string | string[]): boolean => {
	if (value === undefined || value === null || value === 'undefined' || value === 'null')
		return false

	if (typeof value === 'string') {
		const tmp = value.replace(/\s/g, '')

		return tmp.length > 0
	}

	if (value instanceof Array) {
		return value.length > 0
	}

	return true
}
