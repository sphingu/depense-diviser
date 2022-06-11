import { ValidationTypes } from '@/lib/constants'
import { validateMaxLength, validateMaxValue, validateMinLength, validateMinValue } from './min-max'
import { validateEmail, validateUrl } from './regex'
import required from './required'

type ValidationFunctionType = (value: string, args: string) => boolean

export const ValidationRules = {
	get [ValidationTypes.Required](): ValidationFunctionType {
		return required
	},
	get [ValidationTypes.MinLength](): ValidationFunctionType {
		return validateMinLength
	},
	get [ValidationTypes.MaxLength](): ValidationFunctionType {
		return validateMaxLength
	},
	get [ValidationTypes.MinValue](): ValidationFunctionType {
		return validateMinValue
	},
	get [ValidationTypes.MaxValue](): ValidationFunctionType {
		return validateMaxValue
	},
	get [ValidationTypes.Email](): ValidationFunctionType {
		return validateEmail
	},
	get [ValidationTypes.URL](): ValidationFunctionType {
		return validateUrl
	}
}
