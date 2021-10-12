export type FieldType = {
	id: string
	label: string
	value?: string | string[]
	validations?: string[]
}

export type FieldInfo = Omit<FieldType, 'id'> & {
	initialValue: string
	dirty: boolean
	touched: boolean
	error: string
	validate: (value?: string | string[]) => string
}

export type FieldEventType = (e: Event) => void
export type SetValueType = (name: string, value: string | string[]) => void
