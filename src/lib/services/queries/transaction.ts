import { gql } from '@urql/svelte'

import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import type {
	IMonthlyTransaction,
	ITransaction,
	ITransactionCreateQuery,
	ITransactionSingleQuery,
	ITransactionUpdateQuery
} from '$lib/types/transaction'

export const GET_ALL: TypedDocumentNode<ITransaction[], undefined> = gql`
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
export const GET_SINGLE: TypedDocumentNode<ITransaction, ITransactionSingleQuery> = gql`
	query ($id: String!) {
		transaction(id: $id) {
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
export const CREATE: TypedDocumentNode<ITransaction, ITransactionCreateQuery> = gql`
	mutation (
		$name: String!
		$amount: Int!
		$payerId: String!
		$ownedUserIds: [String!]!
		$date: DateTime!
	) {
		createTransaction(
			name: $name
			amount: $amount
			payerId: $payerId
			ownedUserIds: $ownedUserIds
			date: $date
		) {
			id
		}
	}
`
export const UPDATE: TypedDocumentNode<ITransaction, ITransactionUpdateQuery> = gql`
	mutation (
		$id: String!
		$name: String
		$amount: Int
		$payerId: String
		$ownedUserIds: [String!]
		$date: DateTime
	) {
		updateTransaction(
			id: $id
			name: $name
			amount: $amount
			payerId: $payerId
			ownedUserIds: $ownedUserIds
			date: $date
		) {
			id
		}
	}
`
export const DELETE: TypedDocumentNode<ITransaction, ITransactionSingleQuery> = gql`
	mutation ($id: String!) {
		deleteTransaction(id: $id) {
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
