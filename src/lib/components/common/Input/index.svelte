<script lang="ts">
	import { fade, fly } from 'svelte/transition'

	export let size: 'medium' | 'small' | 'large' | 'normal' = 'normal'
	export let kind: 'primary' | 'link' | 'info' | 'success' | 'warning' = 'link'
	export let type = 'text'
	export let name: string
	export let invalid = false
	export let helpText: string
	export let label: string
	export let value: string
	export let ref: HTMLInputElement

	$: classes = [(invalid || kind) && `is-${invalid ? 'danger' : kind}`, size && `is-${size}`]
		.filter(Boolean)
		.join(' ')

	$: inputProps = {
		id: name,
		name,
		type,
		class: `input ${classes}`,
		autocomplete: 'off'
	}

	$: labelProps = {
		class: `label ${classes}`
	}
	$: helpTextProps = {
		class: `help ${classes}`
	}
</script>

<div class="field">
	<label {...labelProps} for={name}>{label}</label>
	<div class="control">
		<input {...inputProps} bind:value on:blur on:input bind:this={ref} />
	</div>
	{#if helpText}
		<p {...helpTextProps} in:fly={{ y: -20, duration: 100 }} out:fade={{ duration: 10 }}>
			{helpText}
		</p>
	{/if}
</div>
