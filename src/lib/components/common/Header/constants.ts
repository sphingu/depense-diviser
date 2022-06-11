import type { NavigationItemType } from './types'

export const navigationItems: NavigationItemType[] = [
	{
		iconClass: 'ri-home-2-fill',
		path: '/',
		title: 'Home',
		prefetch: true
	},
	{
		iconClass: 'ri-numbers-fill',
		path: '/month-wise',
		title: 'Monthly Report',
		prefetch: true
	},
	// {
	// 	iconClass: 'ri-contacts-fill',
	// 	path: '/user',
	// 	title: 'Users',
	// 	prefetch: false
	// },
	{
		iconClass: 'ri-exchange-fill',
		path: '/group',
		title: 'Groups',
		prefetch: false
	}
	// {
	// 	iconClass: 'ri-exchange-fill',
	// 	path: '/transaction',
	// 	title: 'Transactions',
	// 	prefetch: false
	// }
]
