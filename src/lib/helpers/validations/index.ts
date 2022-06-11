import { ValidationTypes, ValidationMessages } from '@/lib/constants'
import { ValidationRules } from './rules'

type ArgType = {
	minValue?: number
	maxValue?: number
	email?: boolean
}
export type IValidationTypes =
	| 'required'
	| 'min-value'
	| 'max-value'
	| 'min-length'
	| 'max-length'
	| 'email'
	| 'url'

const prepareValidator = (fieldName: string, validationName: string) => {
	const args = validationName.split(/:/g)
	const functionName = args.shift() as IValidationTypes
	const functionArgument = args[0]

	return (value: string): string => {
		const isValid = ValidationRules[functionName](value, functionArgument)
		return isValid ? '' : ValidationMessages[functionName](fieldName, functionArgument)
	}
}

export function getValidator(fieldName: string, validations?: string[]): (value: string) => string {
	const validators = validations?.map((validationName) =>
		prepareValidator(fieldName, validationName)
	)

	return (value: string): string => {
		if (!validators?.length) return ''
		let error = ''

		validators.every((validator) => !(error = validator(value)))

		return error
	}
}

export const prepareValidations = (
	required: boolean,
	minLength?: number,
	maxLength?: number,
	{ minValue, maxValue, email }: ArgType = {}
): string[] => {
	const validations: string[] = []

	if (required) validations.push(ValidationTypes.Required)
	if (minLength) validations.push(`${ValidationTypes.MinLength}:${minLength}`)
	if (maxLength) validations.push(`${ValidationTypes.MaxLength}:${maxLength}`)
	if (minValue) validations.push(`${ValidationTypes.MinValue}:${minValue}`)
	if (maxValue) validations.push(`${ValidationTypes.MaxValue}:${maxValue}`)
	if (email) validations.push(`${ValidationTypes.Email}`)

	return validations
}
