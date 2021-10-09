import { mutation } from '@urql/svelte'
import type { DocumentNode } from 'graphql'

export * from './validations'

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
		return mutate(variables)
	}
}
