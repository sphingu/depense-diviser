<script lang="ts">
	import { getContext, onMount } from 'svelte'

	import Input from '../Input/index.svelte'
	import { fields } from './store'
	import * as C from './constants'

	import type { FieldEventType, SetValueType } from './types'
	import type { OptionType } from '$lib/types'

	export let name: string
	export let type: 'text' | 'email' | 'number' | 'date' | 'dropdown' = 'text'
	export let focus = false
	export let list: OptionType[] = []
	export let multiple = false
	let ref: HTMLInputElement
	let value = $fields[name]?.value || (multiple ? [] : '')
	$: field = $fields[name]

	onMount(() => {
		focus && ref.focus()
	})

	const onBlur: FieldEventType = getContext(C.FIELD_BLUR_EVENT)
	const onChange: FieldEventType = getContext(C.FIELD_CHANGE_EVENT)
	const setValue: SetValueType = getContext(C.FIELD_SET_VALUE)

	// will be called when value get changed (use for multi select dropdown only)
	$: multiple && value !== $fields[name].value && setValue(name, value)
</script>

<Input
	bind:ref
	{type}
	{name}
	{list}
	{multiple}
	label={field.label}
	bind:value
	invalid={Boolean(field.error)}
	helpText={field.error}
	on:blur={onBlur}
	on:input={onChange}
	on:change={onChange}
/>
