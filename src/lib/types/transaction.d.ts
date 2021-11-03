export type ITransactionSingleQuery = { id: string }
export type ITransactionCreateQuery = {
	name: string
	amount: number
	payerId: string
	ownedUserIds: string[]
	date: string
}

export type ITransactionUpdateQuery = ITransactionSingleQuery & Partial<ITransactionCreateQuery>
export type ITransaction = ITransactionSingleQuery &
	ITransactionCreateQuery & {
		payer: IUser
		ownedUsers: IUsers[]
		month: number
		year: number
	}

export type IMonthlyTransaction = {
	month: number
	year: number
	count: number
	sum: number
	title?: string // client side
}
