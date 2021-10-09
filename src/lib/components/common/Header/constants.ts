import type { NavigationItemType } from './types'

export const navigationItems: NavigationItemType[] = [
	{
		path: '/',
		title: 'Home',
		prefetch: true
	},
	{
		path: '/month-wise',
		title: 'Monthly Report',
		prefetch: true
	},
	{
		path: '/users',
		title: 'Users',
		prefetch: false
	},
	{
		path: '/transactions',
		title: 'Transaction List',
		prefetch: false
	}
]
