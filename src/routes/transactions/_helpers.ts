import type { ITransactionCreateQuery } from '$lib/types/transaction'

export function getTransactionRequest(
	values: Record<keyof ITransactionCreateQuery, unknown>
): ITransactionCreateQuery {
	return {
		name: values.name as string,
		amount: Number(values.amount),
		payerId: Number(values.payerId),
		ownedUserIds: (values.ownedUserIds as string[]).map(Number),
		date: new Date(values.date as string).toJSON()
	}
}
