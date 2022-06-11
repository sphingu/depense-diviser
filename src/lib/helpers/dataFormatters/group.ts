import { userFormatters } from '@/lib/helpers/dataFormatters'

import type { Group, Transaction, User } from '@/lib/@generated/type-graphql'
import type {
	IGroupDetails,
	IGroupSettlement,
	IGroupTransaction,
	IGroupUser
} from '@/lib/types/group'
import { getAbsMin } from '..'

//#region Group Details Info
const getFormatterUser = (user: User): IGroupUser => ({
	id: user.id,
	name: userFormatters.getDisplayName(user),
	spent: 0,
	selfSpent: 0,
	owed: 0
})

const getFormattedTransaction = (transaction: Transaction): IGroupTransaction => ({
	id: transaction.id,
	name: transaction.name,
	amount: transaction.amount,
	payer: {
		id: transaction.payer.id,
		name: userFormatters.getDisplayName(transaction.payer)
	},
	paidFor: transaction.ownedUsers.map((user) => ({
		id: user.id,
		name: userFormatters.getDisplayName(user)
	}))
})

const sortUserByOwed = (userA: { owed: number }, userB: { owed: number }) => userB.owed - userA.owed
const getGroupSettlements = (userMap: Map<string, IGroupUser>): IGroupSettlement[] => {
	const users = [...userMap.values()]
		.map((user) => ({ id: user.id, owed: user.owed }))
		.sort(sortUserByOwed)
	const settlements: IGroupSettlement[] = []
	let i = 0
	let j = users.length - 1
	while (i < j) {
		const userCred = users[i]
		const userDebt = users[j]

		const min = getAbsMin(userCred.owed, userDebt.owed)
		if (min !== 0) {
			userCred.owed -= min
			userDebt.owed += min
			settlements.push({
				fromUser: userMap.get(userDebt.id),
				toUser: userMap.get(userCred.id),
				amount: min
			})
		}
		if (users[i].owed === 0) i++
		if (users[j].owed === 0) j--
	}
	return settlements
}

export const getGroupDetails = (group: Group): IGroupDetails => {
	const groupDetails: IGroupDetails = {
		id: group.id,
		name: group.name,
		users: new Map(),
		transactions: [],
		settlements: [],
		totalAmount: 0
	}
	group.users.forEach((user) => {
		groupDetails.users.set(user.id, getFormatterUser(user))
	})

	for (const transaction of group.transactions) {
		const payer = groupDetails.users.get(transaction.payer.id)
		payer.spent += transaction.amount
		payer.owed += transaction.amount

		const amountSpentPerUser = transaction.amount / transaction.ownedUsers.length
		for (const paidForUser of transaction.ownedUsers) {
			const buyer = groupDetails.users.get(paidForUser.id)
			buyer.selfSpent += amountSpentPerUser
			buyer.owed -= amountSpentPerUser

			if (buyer.id === payer.id) {
				payer.owed -= amountSpentPerUser
			}
		}

		groupDetails.transactions.push(getFormattedTransaction(transaction))
		groupDetails.totalAmount += transaction.amount
	}

	if (group.transactions.length) {
		groupDetails.settlements = getGroupSettlements(groupDetails.users)
	}
	return groupDetails
}
//#endregion
