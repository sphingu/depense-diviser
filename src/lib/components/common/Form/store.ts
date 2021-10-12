import { writable, derived } from 'svelte/store'

import { getValidator } from '$lib/helpers'
import type { FieldInfo, FieldType } from './types'

function createFields() {
	const { subscribe, set, update } = writable({} as Record<string, FieldInfo>)

	const _updateField = (fieldName: string, updateInfo: (field: FieldInfo) => FieldInfo) =>
		update((fields) => {
			fields[fieldName] = updateInfo(fields[fieldName])
			return fields
		})

	const _updateAllField = (updateInfo: (field: FieldInfo) => FieldInfo) =>
		update((fields) =>
			Object.entries(fields).reduce(
				(acc, [key, field]) => ({
					...acc,
					[key]: updateInfo(field)
				}),
				{}
			)
		)

	const initialize = (fields: FieldType[]) =>
		set(
			fields.reduce(
				(acc, { id, label, value, validations }) => ({
					...acc,
					[id]: {
						id,
						label,
						value: value || '',
						initialValue: value,
						touched: false,
						dirty: false,
						error: '',
						validate: getValidator(label, validations)
					} as FieldInfo
				}),
				{}
			)
		)

	const setTouched = (fieldName: string) =>
		_updateField(fieldName, (field) => ({
			...field,
			touched: true,
			error: field.validate(field.value)
		}))

	const setValue = (fieldName: string, value: string | string[]) =>
		_updateField(fieldName, (field) => ({
			...field,
			touched: true,
			value,
			error: field.validate(value),
			dirty: value != field.initialValue
		}))

	const resetAllFields = () => _updateAllField((field) => ({ ...field, value: '', error: '' }))

	const touchAllFields = () =>
		_updateAllField((field) => ({
			...field,
			touched: true,
			error: field.validate(field.value)
		}))

	return {
		subscribe,
		initialize,
		setTouched,
		setValue,
		resetAllFields,
		touchAllFields
	}
}

export const fields = createFields()

export const isFormValid = derived(
	fields,
	($fields) => !Object.values($fields).find((field) => field.error)
)
export const isFormModified = derived(fields, ($fields) =>
	Boolean(Object.values($fields).find((field) => (field.initialValue || '') !== field.value))
)
