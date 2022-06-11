<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { Button, Modal, toastStore } from '@/lib/components/common'
	import { hasAPIError } from '@/lib/helpers'

	export let entityTitle: string
	export let itemText: string
	export let onDelete: () => Promise<unknown>
	let deleting = false

	const dispatch = createEventDispatcher()

	$: title = `Delete ${entityTitle}`
	$: show = Boolean(itemText)

	async function deleteItem() {
		deleting = true
		try {
			const response = await onDelete()
			if (hasAPIError(response)) {
				throw new Error('Not Deleted')
			}
			toastStore.successToast(`${entityTitle} deleted successfylly`)
			onClose()
		} catch (error) {
			deleting = false
		}
	}
	function onClose() {
		dispatch('close', { deleted: deleting })
		deleting = false
	}
</script>

<Modal {title} {show} on:close={onClose}>
	Are you sure to delete <b>{itemText}</b> ?
	<div slot="footer">
		<Button className="is-danger" on:click={deleteItem} loading={deleting}>
			<i slot="icon" class="ri-delete-bin-line ri-xl" />
			Yes, Delete
		</Button>
		<Button on:click={onClose}>
			<i slot="icon" class="ri-close-circle-line ri-xl" />
			Cancel
		</Button>
	</div>
</Modal>
