import { getMonthName } from '@/lib/helpers'
import type { IMonthlyTransaction } from '@/lib/types/transaction'

export function formatMonthlyTransactions(list: IMonthlyTransaction[]): IMonthlyTransaction[] {
	return list.map((item) => ({
		...item,
		title: `${getMonthName(item.month + 1)} ${item.year}`
	}))
}
