import { getDateInputString, getString, prepareValidations } from '@/lib/helpers'

import type { FieldType } from '@/lib/components/common/Form/types'
import type { Transaction } from '@/lib/@generated/type-graphql'

export const getFormFields = (transaction: Partial<Transaction> = {}): FieldType[] => [
	{
		id: 'name',
		label: 'Name',
		type: 'text',
		validations: prepareValidations(true, 5, 50),
		value: transaction.name || ''
	},
	{
		id: 'amount',
		label: 'Amount',
		type: 'number',
		validations: prepareValidations(true, 1, 12, { minValue: 1, maxValue: 500000 }),
		value: getString(transaction.amount)
	},
	{
		id: 'date',
		label: 'Date',
		type: 'date',
		validations: prepareValidations(true, 5, 50),
		value: getDateInputString(transaction.date)
	},
	{
		id: 'payerId',
		label: 'Payer',
		type: 'select',
		validations: prepareValidations(true),
		value: getString(transaction.payerId)
	},
	{
		id: 'ownedUserIds',
		label: 'Paying For',
		type: 'multiselect',
		validations: prepareValidations(true),
		value: (transaction.ownedUsers?.map((user) => user.id) || []).map(getString)
	}
]
