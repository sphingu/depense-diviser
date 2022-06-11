import { getValidator } from '@/lib/helpers'

import type { FormProps } from 'svelte-forms-lib'
import type { FieldType } from './types'

export const getFormProps = (formFields: FieldType[]): FormProps => {
	const initialValues = formFields.reduce(
		(acc, formField) => ({ ...acc, [formField.id]: formField.value }),
		{}
	)

	const validators = formFields.reduce(
		(acc, formField) => ({
			...acc,
			[formField.id]: getValidator(formField.label, formField.validations)
		}),
		{}
	)

	return {
		initialValues,
		validate: (values) => {
			const errors = {}

			for (const key of Object.keys(values)) {
				const error = validators[key](values[key])
				if (error) {
					errors[key] = error
				}
			}

			return errors
		}
	}
}

export const getLabels = (formFields: FieldType[]): Record<string, string> => {
	return formFields.reduce((acc, formField) => ({ ...acc, [formField.id]: formField.label }), {})
}
