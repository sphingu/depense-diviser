import { prepareValidations } from '$lib/helpers'

import type { FieldType } from '$lib/components/common/Form/types'
import type { IUserCreateQuery } from '$lib/types/user'

export const getFormFields = (userInfo: Partial<IUserCreateQuery> = {}): FieldType[] => [
	{
		id: 'name',
		label: 'Name',
		validations: prepareValidations(true, 5, 50),
		value: userInfo.name || ''
	},
	{
		id: 'email',
		label: 'Email',
		validations: prepareValidations(true, 5, 50, { email: true }),
		value: userInfo.email || ''
	}
]
