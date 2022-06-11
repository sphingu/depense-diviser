import type { User } from '@/lib/@generated/type-graphql'

export const getDisplayName = (user: User): string => {
	if (!user.firstName && !user.lastName) {
		return user.email
	}

	return `${user.firstName || ''} ${user.lastName || ''}`.trim()
}
