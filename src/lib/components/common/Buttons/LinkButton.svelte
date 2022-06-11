<script lang="ts">
	import Anchor from '../Anchor.svelte'

	export let path: string
	export let className = ''
</script>

<Anchor href={path} class={`button is-link ${className}`}>
	{#if $$slots.icon}
		<span class="icon">
			<slot name="icon" />
		</span>
		{#if $$slots.default}
			<span>
				<slot />
			</span>
		{/if}
	{:else}
		<slot />
	{/if}
</Anchor>
