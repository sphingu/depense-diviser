<script lang="ts">
	import BackButton from '.,/Buttons/BackButton.svelte'
	export let backUrl: string = undefined
	export let title: string
</script>

<div class="block is-flex">
	{#if backUrl}
		<BackButton path={backUrl} />
	{/if}
	<h1 class="title" class:ml-4={backUrl}>{title}</h1>
</div>
