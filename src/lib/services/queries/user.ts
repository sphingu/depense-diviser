import { gql } from '@urql/svelte'
import type { IUser, IUserCreateQuery, IUserSingleQuery, IUserUpdateQuery } from '$lib/types/user'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'

export const GET_ALL: TypedDocumentNode<IUser[], undefined> = gql`
	query {
		users {
			id
			name
			email
		}
	}
`
export const GET_SINGLE: TypedDocumentNode<IUser, IUserSingleQuery> = gql`
	query ($id: Int!) {
		user(id: $id) {
			id
			name
			email
		}
	}
`

export const CREATE: TypedDocumentNode<IUser, IUserCreateQuery> = gql`
	mutation ($name: String!, $email: String!) {
		createUser(name: $name, email: $email) {
			id
		}
	}
`
export const UPDATE: TypedDocumentNode<IUser, IUserUpdateQuery> = gql`
	mutation ($id: Int!, $name: String, $email: String) {
		updateUser(id: $id, name: $name, email: $email) {
			id
		}
	}
`
export const DELETE: TypedDocumentNode<IUser, IUserSingleQuery> = gql`
	mutation ($id: Int!) {
		deleteUser(id: $id) {
			id
		}
	}
`
