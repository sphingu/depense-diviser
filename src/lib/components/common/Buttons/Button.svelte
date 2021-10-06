<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' = 'button'
	export let className = ''
	export let disabled = false
</script>

<button {type} class={`button ${className}`} {disabled}>
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
