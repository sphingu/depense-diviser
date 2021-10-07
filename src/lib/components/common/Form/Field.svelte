<script lang="ts">
	import { getContext, onMount } from 'svelte'

	import Input from '../Input/index.svelte'
	import { fields } from './store'
	import * as C from './constants'

	import type { FieldEventType } from './types'

	export let name: string
	export let focus = false
	let ref: HTMLInputElement
	$: field = $fields[name]

	onMount(() => {
		focus && ref.focus()
	})

	const onBlur: FieldEventType = getContext(C.FIELD_BLUR_EVENT)
	const onChange: FieldEventType = getContext(C.FIELD_CHANGE_EVENT)
</script>

<Input
	type="text"
	bind:ref
	{name}
	label={field.label}
	value={field.value}
	invalid={Boolean(field.error)}
	helpText={field.error}
	on:blur={onBlur}
	on:input={onChange}
/>
