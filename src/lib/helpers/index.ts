import { toasts } from '$lib/components/common/Toast/store'
import { mutation } from '@urql/svelte'
import type { DocumentNode } from 'graphql'

export * from './validations'
import * as C from '$lib/constants'

export const getDateInputString = (date?: string): string => {
	if (!date) {
		date = new Date().toJSON()
	}
	return date.split('T')[0]
}
export const getString = (val: number | string): string =>
	val === null || val === undefined ? '' : val.toString()

export const isEmpty = (obj: unknown): boolean => {
	return (
		obj && // 👈 null and undefined check
		Object.keys(obj).length === 0 &&
		Object.getPrototypeOf(obj) === Object.prototype
	)
}

export const sleep = (time: number): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, time * 1000))

export const getMonthName = (month: number): string => {
	if (month > 12 || month < 1) {
		throw new Error('Please provide valid month value')
	}
	return new Date(2020, month, 1).toLocaleString('default', { month: 'long' })
}

export function getMutationFn(
	query: DocumentNode
): (variables?: Record<string, unknown>) => Promise<unknown> {
	const mutate = mutation({ query })
	return async (variables?: Record<string, unknown>) => {
		try {
			const response = await mutate(variables)
			if (response['error']) {
				throw new Error(response['error']['message'])
			}
			return response
		} catch (error) {
			console.log('Error', error)
			toasts.errorToast(C.ERRORS.API_ERROR)
			throw new Error(C.ERRORS.API_ERROR)
		}
	}
}
