import type { Group, User } from '$lib/@generated/type-graphql'
import type { IGroupDetails, IGroupTransaction, IGroupUser } from './type'

const getFullName = (user: User): string => {
	return `${user.firstName || ''} ${user.lastName || ''}`.trim()
}

const getUserInfo = (listMap: Map<string, IGroupUser>, user: User) => {
	let userInfo = listMap.get(user.id)
	if (!userInfo) {
		userInfo = {
			id: user.id,
			name: getFullName(user),
			spent: 0,
			owed: 0,
			selfSpent: 0
		}
		listMap.set(user.id, userInfo)
	}
	return userInfo
}

export const getFormattedGroupDetails = (group: Group): IGroupDetails => {
	const groupDetails: IGroupDetails = {
		id: group.id,
		name: group.name,
		users: new Map(),
		transactions: [],
		settlements: []
	}
	for (const transaction of group.transactions) {
		const transactionInfo: IGroupTransaction = {
			id: transaction.id,
			name: transaction.name,
			amount: transaction.amount,
			payer: {
				id: transaction.payer.id,
				name: getFullName(transaction.payer)
			},
			paidFor: transaction.ownedUsers.map((user) => ({ id: user.id, name: getFullName(user) }))
		}
		const payer = getUserInfo(groupDetails.users, transaction.payer)
		payer.spent += transaction.amount

		const isPaidForOthers = transaction.ownedUsers.some((user) => user.id === transaction.payer.id)
		const individualSpentAmount = transaction.amount / transaction.ownedUsers.length

		if (isPaidForOthers) {
			payer.owed += transaction.amount
		} else {
			payer.owed += transaction.amount - individualSpentAmount
		}

		for (const paidForUser of transaction.ownedUsers) {
			const buyer = getUserInfo(groupDetails.users, paidForUser)
			buyer.selfSpent += individualSpentAmount
			buyer.owed -= individualSpentAmount
		}
		groupDetails.transactions.push(transactionInfo)
	}

	return groupDetails
}
