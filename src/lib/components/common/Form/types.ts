export type FieldType = {
	id: string
	label: string
	value?: string
	validations?: string[]
}

export type FieldInfo = Omit<FieldType, 'id'> & {
	initialValue: string
	dirty: boolean
	touched: boolean
	error: string
	validate: (value?: string) => string
}

export type FieldEventType = (e: Event) => void
