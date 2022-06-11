<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	import Button from './Button.svelte'
	export let expanded = false

	const dispatch = createEventDispatcher()

	function toggleExpand() {
		expanded = !expanded
		dispatch('click', { expanded })
	}
</script>

<Button on:click={toggleExpand}>
	<i
		slot="icon"
		class="ri-xl"
		class:ri-merge-cells-vertical={expanded}
		class:ri-split-cells-vertical={!expanded}
	/>
</Button>
