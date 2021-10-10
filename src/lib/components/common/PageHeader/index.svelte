<script lang="ts">
	import BackButton from '../Buttons/BackButton.svelte'
	import LinkButton from '../Buttons/LinkButton.svelte'
	export let backUrl = ''
	export let title = ''
</script>

<div class="block is-flex">
	{#if backUrl === '/'}
		<LinkButton path={backUrl}>
			<i slot="icon" class="ri-home-2-line" />
		</LinkButton>
	{:else if backUrl}
		<BackButton path={backUrl} />
	{/if}
	<h1 class="title" class:ml-4={backUrl}>
		<slot>{title}</slot>
	</h1>
</div>
