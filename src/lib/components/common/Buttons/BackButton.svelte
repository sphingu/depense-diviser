<script lang="ts">
	import LinkButton from './LinkButton.svelte'
	export let path: string
</script>

<LinkButton {path}>
	<i slot="icon" class="ri-arrow-left-circle-line ri-xl" />
</LinkButton>
