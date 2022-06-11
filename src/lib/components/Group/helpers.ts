import type { Group, GroupCreateInput, GroupUpdateInput } from '@/lib/@generated/type-graphql'
import { prepareValidations } from '@/lib/helpers'
import type { FieldType } from '../common/Form/types'

export const convertCreateGroupFormData = (data: Record<string, unknown>) => {
	return {
		name: data.name as string,
		isMonthlySettle: data.isMonthlySettle as boolean,
		users: { connect: (data.userIds as string[]).map((id) => ({ id })) }
	} as GroupCreateInput
}
export const convertUpdateGroupFormData = (data: Record<string, unknown>) => {
	return {
		name: { set: data.name as string },
		isMonthlySettle: { set: data.isMonthlySettle as boolean },
		users: { set: (data.userIds as string[]).map((id) => ({ id })) }
	} as GroupUpdateInput
}

export const getFormFields = (group: Partial<Group> = {}): FieldType[] => [
	{
		id: 'name',
		label: 'Name',
		type: 'text',
		validations: prepareValidations(true, 5, 50),
		value: group.name || ''
	},
	{
		id: 'isMonthlySettle',
		label: 'Settle Monthly ?',
		type: 'checkbox',
		value: group.isMonthlySettle || false
	},
	{
		id: 'userIds',
		label: 'User',
		type: 'multiselect',
		validations: prepareValidations(true),
		value: group.users?.map((user) => user.id) || []
	}
]
