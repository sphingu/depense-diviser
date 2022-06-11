import { gql } from '@urql/svelte'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import type {
	Group,
	GroupCreateInput,
	GroupUpdateInput,
	GroupWhereUniqueInput
} from '@/lib/@generated/type-graphql'

export const GET_ALL: TypedDocumentNode<Group, undefined> = gql`
	query {
		currentUserGroups {
			id
			name
			isMonthlySettle
			users {
				id
			}
			transactions {
				id
			}
		}
	}
`

export const GET_SINGLE: TypedDocumentNode<Group, { where: GroupWhereUniqueInput }> = gql`
	query ($where: GroupWhereUniqueInput!) {
		group(where: $where) {
			id
			name
			users {
				id
				firstName
				lastName
			}
			transactions {
				id
				name
				amount
				payer {
					id
					firstName
					lastName
				}
				ownedUsers {
					id
					firstName
					lastName
				}
			}
		}
	}
`

export const CREATE: TypedDocumentNode<Group, { data: GroupCreateInput }> = gql`
	mutation ($data: GroupCreateInput!) {
		createGroup(data: $data) {
			id
		}
	}
`
export const UPDATE: TypedDocumentNode<
	Group,
	{ data: GroupUpdateInput; where: GroupWhereUniqueInput }
> = gql`
	mutation ($data: GroupUpdateInput!, $where: GroupWhereUniqueInput!) {
		updateGroup(data: $data, where: $where) {
			id
		}
	}
`
export const DELETE: TypedDocumentNode<Group, { where: GroupWhereUniqueInput }> = gql`
	mutation ($where: GroupWhereUniqueInput!) {
		deleteGroup(where: $where) {
			id
		}
	}
`
