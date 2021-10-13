export type IUserSingleQuery = { id: number }
export type IUserCreateQuery = { name: string; email: string }

export type IUserUpdateQuery = IUserSingleQuery & Partial<IUserCreateQuery>
export type IUser = IUserSingleQuery & IUserCreateQuery
