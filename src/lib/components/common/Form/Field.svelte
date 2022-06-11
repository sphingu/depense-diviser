<script lang="ts">
	import { getContext, onMount } from 'svelte'
	import { fade, fly } from 'svelte/transition'
	import { key } from 'svelte-forms-lib'

	import type { OptionType } from '@/lib/types'
	import type { FieldInputType } from './types'

	export let size: 'medium' | 'small' | 'large' | 'normal' = 'normal'
	export let kind: 'primary' | 'link' | 'info' | 'success' | 'warning' = 'link'
	export let name: string
	export let type: FieldInputType = 'text'
	export let label: string
	export let focus = false
	export let options: OptionType[] = []

	const { form, handleChange, errors, updateValidateField } = getContext(key)

	let ref: HTMLInputElement | HTMLSelectElement
	let multiselectValue: string[] = $form[name] || []
	onMount(() => {
		focus && ref.focus()
	})

	$: helpText = $errors[name]
	$: invalid = Boolean(helpText)
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

	function handleMultiselectChange() {
		updateValidateField(name, multiselectValue)
	}
</script>

<div class="field">
	{#if type !== 'checkbox'}
		<label {...labelProps} for={name}>{label}</label>
	{/if}
	<div class="control">
		{#if type === 'checkbox'}
			<label class="label checkbox">
				<input
					bind:this={ref}
					id={name}
					{name}
					{type}
					value={$form[name]}
					on:change={handleChange}
					on:blur={handleChange}
					{...$$props}
				/>
				{label}
			</label>
		{:else if type === 'select'}
			<div class="select">
				<select
					bind:this={ref}
					{...inputProps}
					value={$form[name]}
					on:change={handleChange}
					on:blur={handleChange}
					{...$$props}
				>
					<option value="">Select {label}</option>
					{#each options as option}
						<option value={option.value}>{option.text}</option>
					{/each}
				</select>
			</div>
		{:else if type === 'multiselect'}
			<div class="select is-multiple">
				<!-- {...inputProps} & {...$$props} spreding input props will not work here ref: https://github.com/sveltejs/svelte/issues/5644 -->
				<select
					id={name}
					{name}
					class={classes}
					autocomplete="off"
					size="3"
					multiple
					bind:value={multiselectValue}
					on:change={handleMultiselectChange}
					on:blur={handleMultiselectChange}
				>
					{#each options as option}
						<option value={option.value}>{option.text}</option>
					{/each}
				</select>
			</div>
		{:else}
			<input
				bind:this={ref}
				{...inputProps}
				value={$form[name]}
				on:change={handleChange}
				on:blur={handleChange}
				{...$$props}
			/>
		{/if}
	</div>
	{#if helpText}
		<p {...helpTextProps} in:fly={{ y: -20, duration: 100 }} out:fade={{ duration: 10 }}>
			{helpText}
		</p>
	{/if}
</div>

<style lang="scss">
	.select,
	select {
		width: 100%;
	}
	.checkbox {
		margin: 1rem 0;
		input {
			margin-right: 0.5rem;
		}
	}
</style>
