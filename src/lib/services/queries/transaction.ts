import { gql } from '@urql/svelte'
import type {
	Transaction,
	TransactionCreateInput,
	TransactionUpdateInput,
	TransactionWhereUniqueInput
} from '@/lib/@generated/type-graphql'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import type { IMonthlyTransaction } from '@/lib/types/transaction'

export const GET_ALL: TypedDocumentNode<Transaction[], undefined> = gql`
	query {
		transactions {
			id
			name
			amount
			year
			month
			date
			payerId
			payer {
				id
				firstName
				lastName
				email
			}
			ownedUsers {
				id
				firstName
				lastName
				email
			}
		}
	}
`
export const GET_SINGLE: TypedDocumentNode<
	Transaction,
	{ where: TransactionWhereUniqueInput }
> = gql`
	query ($where: TransactionWhereUniqueInput!) {
		transaction(where: $where) {
			id
			name
			amount
			year
			month
			date
			payerId
			payer {
				id
				firstName
				lastName
				email
			}
			ownedUsers {
				id
				firstName
				lastName
				email
			}
		}
	}
`
export const CREATE: TypedDocumentNode<Transaction, { data: TransactionCreateInput }> = gql`
	mutation ($data: TransactionCreateInput!) {
		createTransactionWithDate(data: $data) {
			id
		}
	}
`
export const UPDATE: TypedDocumentNode<
	Transaction,
	{ data: TransactionUpdateInput; where: TransactionWhereUniqueInput }
> = gql`
	mutation ($data: TransactionUpdateInput!, $where: TransactionWhereUniqueInput!) {
		updateTransactionWithDate(data: $data, where: $where) {
			id
		}
	}
`
export const DELETE: TypedDocumentNode<Transaction, { where: TransactionWhereUniqueInput }> = gql`
	mutation ($where: TransactionWhereUniqueInput!) {
		deleteTransaction(where: $where) {
			id
		}
	}
`

export const GET_MONTHLY: TypedDocumentNode<IMonthlyTransaction[], undefined> = gql`
	query {
		monthlyTransactions {
			month
			year
			count
			sum
		}
	}
`
