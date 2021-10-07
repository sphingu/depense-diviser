export const ValidationTypes = {
	Required: 'required',
	MinValue: 'min-value',
	MaxValue: 'max-value',
	MinLength: 'min-length',
	MaxLength: 'max-length',
	Email: 'email',
	URL: 'url'
} as const
// NOTE: Commented as not working in some cases
// type IValidationTypesKeys = keyof typeof ValidationTypes
// export type IValidationTypes = typeof ValidationTypes[IValidationTypesKeys]

export const ValidationMessages = {
	[ValidationTypes.Required]: (fieldName: string): string => `${fieldName} is required`,
	[ValidationTypes.Email]: (fieldName: string): string => `${fieldName} should be valid email`,
	[ValidationTypes.URL]: (fieldName: string): string => `${fieldName} should be valid url`,
	[ValidationTypes.MinValue]: (fieldName: string, minValue: string | number): string =>
		`${fieldName} should not be less than ${minValue}`,
	[ValidationTypes.MaxValue]: (fieldName: string, maxValue: string | number): string =>
		`${fieldName} should not be more than ${maxValue}`,
	[ValidationTypes.MinLength]: (fieldName: string, minLength: string | number): string =>
		`${fieldName} length should not be less than ${minLength}`,
	[ValidationTypes.MaxLength]: (fieldName: string, maxLength: string | number): string =>
		`${fieldName} length should not be more than ${maxLength}`
}

export const API_URL = 'http://localhost:4000'
