export type ITransactionSingleQuery = { id: number }
export type ITransactionCreateQuery = {
	name: string
	amount: number
	payerId: number
	ownedUserIds: number[]
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
