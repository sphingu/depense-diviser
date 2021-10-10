import { gql } from '@urql/svelte'
import type { IUser } from '$lib/types/user'

export const GET_ALL = gql<IUser[]>`
	query {
		users {
			id
			name
			email
		}
	}
`
export const GET_SINGLE = gql<IUser>`
	query ($id: Int!) {
		user(id: $id) {
			id
			name
			email
		}
	}
`

export const CREATE = gql<IUser>`
	mutation ($name: String!, $email: String!) {
		createUser(name: $name, email: $email) {
			id
			name
			email
		}
	}
`
export const UPDATE = gql<IUser>`
	mutation ($id: Int!, $name: String, $email: String) {
		updateUser(id: $id, name: $name, email: $email) {
			id
			name
			email
		}
	}
`
export const DELETE = gql<IUser>`
	mutation ($id: Int!) {
		deleteUser(id: $id) {
			id
			name
			email
		}
	}
`
