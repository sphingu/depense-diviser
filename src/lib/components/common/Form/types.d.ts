export type FieldInputType =
	| 'text'
	| 'email'
	| 'number'
	| 'date'
	| 'select'
	| 'multiselect'
	| 'checkbox'

export type FieldType = {
	id: string
	label: string
	type: FieldInputType
	value?: string | string[] | boolean
	validations?: string[]
}
