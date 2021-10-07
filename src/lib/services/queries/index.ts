import { gql } from '@urql/svelte'
import type { IUser } from '$lib/components/User/types'

export const ALL_USERS = gql<IUser[]>`
	query {
		users {
			id
			name
			email
		}
	}
`
export const GET_USER = gql<IUser>`
	query ($id: Int!) {
		user(id: $id) {
			id
			name
			email
		}
	}
`

export const ADD_USER = gql<IUser>`
	mutation ($name: String!, $email: String!) {
		createUser(name: $name, email: $email) {
			id
      name
      email
		}
	}
`