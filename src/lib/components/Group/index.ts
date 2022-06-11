import GroupAddEdit from './AddEdit.svelte'
import GroupList from './List.svelte'
import UserList from './GroupDetail/UserList.svelte'
import TransactionList from './GroupDetail/TransactionList.svelte'
import SettlementList from './GroupDetail/SettlementList.svelte'

const GroupDetails = {
	UserList,
	TransactionList,
	SettlementList
}

export { GroupList, GroupAddEdit, GroupDetails }
