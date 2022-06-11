<script lang="ts">
	import BackButton from '../Buttons/BackButton.svelte'
	import LinkButton from '../Buttons/LinkButton.svelte'
	export let backUrl = ''
	export let title = ''
	export let iconClass = ''
</script>

<svelte:head><title>{title} | D-Diviser</title></svelte:head>

<div class="block is-flex">
	{#if backUrl === '/'}
		<LinkButton path={backUrl}>
			<i slot="icon" class="ri-home-2-line" />
		</LinkButton>
	{:else if backUrl}
		<BackButton path={backUrl} />
	{/if}
	<h1 class="title" class:ml-4={backUrl}>
		<!-- // Note: keep it removed for now -->
		{#if false && iconClass}
			<span class="icon">
				<i class={iconClass} />
			</span>
		{/if}
		<span>
			<slot>{title}</slot>
		</span>
	</h1>
</div>

<style>
	h1 {
		display: flex;
		align-items: center;
	}
	.icon {
		font-size: 1.5rem;
		margin-right: 5px;
	}
</style>
