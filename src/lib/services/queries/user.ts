import { gql } from '@urql/svelte'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import type {
	User,
	UserCreateInput,
	UserUpdateInput,
	UserWhereUniqueInput
} from '@/lib/@generated/type-graphql'

export const GET_ALL: TypedDocumentNode<User, undefined> = gql`
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

export const GET_CURRENT_USER: TypedDocumentNode<User, undefined> = gql`
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
export const GET_SINGLE: TypedDocumentNode<User, { where: UserWhereUniqueInput }> = gql`
	query ($where: UserWhereUniqueInput!) {
		user(where: $where) {
			id
			firstName
			lastName
			email
			imageUrl
		}
	}
`

export const CREATE: TypedDocumentNode<User, { data: UserCreateInput }> = gql`
	mutation ($data: UserCreateInput!) {
		createUser(data: $data) {
			id
		}
	}
`
export const UPDATE: TypedDocumentNode<
	User,
	{ data: UserUpdateInput; where: UserWhereUniqueInput }
> = gql`
	mutation ($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
		updateUser(data: $data, where: $where) {
			id
		}
	}
`
export const DELETE: TypedDocumentNode<User, { where: UserWhereUniqueInput }> = gql`
	mutation ($where: UserWhereUniqueInput!) {
		deleteUser(where: $where) {
			id
		}
	}
`
