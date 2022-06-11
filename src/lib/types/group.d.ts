export interface IGroupUser {
	id: string
	name: string
	spent: number
	selfSpent: number
	owed: number
}
export interface IGroupTransaction {
	id: string
	name: string
	payer: {
		id: string
		name: string
	}
	paidFor: { id: string; name: string }[]
	amount: number
}
export interface IGroupSettlement {
	fromUser: { id: string; name: string }
	toUser: { id: string; name: string }
	amount: number
}
export interface IGroupDetails {
	id: string
	name: string
	users: Map<string, IGroupUser>
	transactions: IGroupTransaction[]
	totalAmount: number
	settlements: IGroupSettlement[]
}
