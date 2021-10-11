import { getString, prepareValidations } from '$lib/helpers'

import type { FieldType } from '$lib/components/common/Form/types'
import type { ITransactionValues } from '$lib/types/transaction'

export const getFormFields = (userInfo: Partial<ITransactionValues> = {}): FieldType[] => [
	{
		id: 'name',
		label: 'Name',
		validations: prepareValidations(true, 5, 50),
		value: userInfo.name || ''
	},
	{
		id: 'amount',
		label: 'Amount',
		validations: prepareValidations(true, 1, 12, { minValue: 1, maxValue: 500000 }),
		value: getString(userInfo.amount) || ''
	},
	{
		id: 'date',
		label: 'Date',
		validations: prepareValidations(true, 5, 50),
		value: userInfo.date || new Date().toJSON()
	},
	{
		id: 'payerId',
		label: 'Payer',
		validations: prepareValidations(true),
		value: getString(userInfo.payerId) || ''
	},
	{
		id: 'ownedUserIds',
		label: 'Paying For',
		validations: prepareValidations(true),
		value: (userInfo.ownedUserIds || []).map(getString)
	}
]
