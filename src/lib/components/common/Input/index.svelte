<script lang="ts">
	import { fade, fly } from 'svelte/transition'

	import type { OptionType } from '$lib/types'

	export let size: 'medium' | 'small' | 'large' | 'normal' = 'normal'
	export let kind: 'primary' | 'link' | 'info' | 'success' | 'warning' = 'link'
	export let type = 'text'
	export let name: string
	export let invalid = false
	export let helpText: string
	export let label: string
	export let value: string | string[]
	export let ref: HTMLInputElement | HTMLSelectElement
	export let list: OptionType[]
	export let multiple = false

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
		{#if type === 'dropdown'}
			<div class="select" class:is-multiple={multiple}>
				{#if multiple}
					<!-- {...inputProps} spreding input props will not work here ref: https://github.com/sveltejs/svelte/issues/5644 -->
					<select
						id={name}
						{name}
						class={classes}
						autocomplete="off"
						size="3"
						multiple
						bind:value
						on:blur
						bind:this={ref}
					>
						{#each list as item}
							<option value={item.value}>{item.text}</option>
						{/each}
					</select>
				{:else}
					<select {...inputProps} {value} on:blur on:change bind:this={ref}>
						<option value="">Select {label}</option>
						{#each list as item}
							<option value={item.value}>{item.text}</option>
						{/each}
					</select>
				{/if}
			</div>
		{:else}
			<input {...inputProps} {value} on:blur on:input bind:this={ref} />
		{/if}
	</div>
	{#if helpText}
		<p {...helpTextProps} in:fly={{ y: -20, duration: 100 }} out:fade={{ duration: 10 }}>
			{helpText}
		</p>
	{/if}
</div>

<style>
	.select,
	select {
		width: 100%;
	}
</style>
