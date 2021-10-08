<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { Button, Modal } from '$lib/components/common'

	export let entityName: string
	export let itemName: string
	export let show = false

	const dispatch = createEventDispatcher()

	$: title = `Delete ${entityName}`

	function onDelete() {
		show = false
		dispatch('delete')
	}
</script>

<Modal {title} bind:show>
	Are you sure to delete <b>{itemName}</b> ?
	<div slot="footer">
		<Button className="is-danger" on:click={onDelete}>
			<i slot="icon" class="ri-delete-bin-line ri-xl" />
			Yes, Delete
		</Button>
		<Button on:click={() => (show = false)}>
			<i slot="icon" class="ri-close-circle-line ri-xl" />
			Cancel
		</Button>
	</div>
</Modal>
