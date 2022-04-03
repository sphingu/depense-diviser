export type FieldType = {
	id: string
	label: string
	value?: string | string[] | boolean
	validations?: string[]
}

export type FieldInfo = Omit<FieldType, 'id'> & {
	initialValue: string
	dirty: boolean
	touched: boolean
	error: string
	validate: (value?: string | string[] | boolean) => string
}

export type FieldEventType = (e: Event) => void
export type SetValueType = (name: string, value: string | string[] | boolean) => void
