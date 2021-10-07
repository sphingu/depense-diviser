<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' = 'button'
	export let loading = false
	export let className = ''
	export let disabled = false
</script>

<button on:click {type} class={`button ${className}`} {disabled} class:is-loading={loading}>
	{#if $$slots.icon}
		<span class="icon">
			<slot name="icon" />
		</span>
		<span>
			<slot />
		</span>
	{:else}
		<slot />
	{/if}
</button>
