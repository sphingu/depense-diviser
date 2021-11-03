import { gql } from '@urql/svelte'
import type { IUser, IUserCreateQuery, IUserSingleQuery, IUserUpdateQuery } from '$lib/types/user'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'

export const GET_ALL: TypedDocumentNode<IUser[], undefined> = gql`
	query {
		users {
			id
			firstName
			lastName
			email
			imageUrl
		}
	}
`

export const GET_CURRENT_USER: TypedDocumentNode<IUser, undefined> = gql`
	query {
		currentUser {
			id
			firstName
			lastName
			email
			imageUrl
		}
	}
`
export const GET_SINGLE: TypedDocumentNode<IUser, IUserSingleQuery> = gql`
	query ($id: String!) {
		user(id: $id) {
			id
			firstName
			lastName
			email
			imageUrl
		}
	}
`

export const CREATE: TypedDocumentNode<IUser, IUserCreateQuery> = gql`
	mutation ($firstName: String!, $lastName: String!, $email: String!) {
		createUser(firstName: $firstName, lastName: $lastName, email: $email) {
			id
		}
	}
`
export const UPDATE: TypedDocumentNode<IUser, IUserUpdateQuery> = gql`
	mutation ($id: String!, $firstName: String, $lastName: String, $email: String) {
		updateUser(id: $id, firstName: $firstName, lastName: $lastName, email: $email) {
			id
		}
	}
`
export const DELETE: TypedDocumentNode<IUser, IUserSingleQuery> = gql`
	mutation ($id: String!) {
		deleteUser(id: $id) {
			id
		}
	}
`
