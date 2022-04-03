import { prepareValidations } from '$lib/helpers'

import type { FieldType } from '$lib/components/common/Form/types'
import type { User } from '$lib/@generated/type-graphql'

export const getFormFields = (userInfo: Partial<User> = {}): FieldType[] => [
	{
		id: 'firstName',
		label: 'First Name',
		validations: prepareValidations(true, 5, 50),
		value: userInfo.firstName || ''
	},
	{
		id: 'lastName',
		label: 'Last Name',
		validations: prepareValidations(true, 5, 50),
		value: userInfo.lastName || ''
	},
	{
		id: 'email',
		label: 'Email',
		validations: prepareValidations(true, 5, 50, { email: true }),
		value: userInfo.email || ''
	}
]
