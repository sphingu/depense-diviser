export const validateMinValue = (value: string, minValue: string): boolean =>
	parseFloat(minValue) <= parseFloat(value)

export const validateMaxValue = (value: string, maxValue: string): boolean =>
	parseFloat(maxValue) >= parseFloat(value)

export const validateMinLength = (value: string, minLength: string): boolean =>
	parseFloat(minLength) <= value.length

export const validateMaxLength = (value: string, maxLength: string): boolean =>
	parseFloat(maxLength) >= value.length
