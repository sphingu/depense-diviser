export type IUserSingleQuery = { id: string }
export type IUserCreateQuery = {
	firstName: string
	lastName: string
	email: string
	imageUrl: string
}

export type IUserUpdateQuery = IUserSingleQuery & Partial<IUserCreateQuery>
export type IUser = IUserSingleQuery & IUserCreateQuery
