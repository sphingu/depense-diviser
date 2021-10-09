<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { Button, Modal } from '$lib/components/common'

	export let entityTitle: string = ''
	export let itemText: string = ''
	export let onDelete: () => Promise<void> | void = () => {}
	let deleting = false

	const dispatch = createEventDispatcher()

	$: title = `Delete ${entityTitle}`
	$: show = Boolean(itemText)

	async function deleteItem() {
		deleting = true
		try {
			await onDelete()
			onClose();
		} catch (error) {
			alert(error.message)
		}
	}
	function onClose() {
		deleting = false
		dispatch('close')
	}
</script>

<Modal {title} {show} on:close>
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
