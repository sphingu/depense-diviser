import { gql } from '@urql/svelte'
import type {
	ITransaction,
	ITransactionCreateQuery,
	ITransactionSingleQuery,
	ITransactionUpdateQuery
} from '$lib/types/transaction'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'

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
				name
				email
			}
			ownedUsers {
				id
				name
				email
			}
		}
	}
`
export const GET_SINGLE: TypedDocumentNode<ITransaction, ITransactionSingleQuery> = gql`
	query ($id: Int!) {
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
				name
				email
			}
			ownedUsers {
				id
				name
				email
			}
		}
	}
`
export const CREATE: TypedDocumentNode<ITransaction, ITransactionCreateQuery> = gql`
	mutation (
		$name: String!
		$amount: Int!
		$payerId: Int!
		$ownedUserIds: [Int!]!
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
		$id: Int!
		$name: String
		$amount: Int
		$payerId: Int
		$ownedUserIds: [Int!]
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
	mutation ($id: Int!) {
		deleteTransaction(id: $id) {
			id
		}
	}
`
