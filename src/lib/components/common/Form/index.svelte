<script lang="ts">
	import type { OptionType } from '@/lib/types'

	import { Form } from 'svelte-forms-lib'
	import { FormSubmitButton, FormResetButton, FormField } from '@/lib/components'
	import { getFormProps, getLabels } from './helpers'

	import type { FieldType } from './types'

	export let initialFields: FieldType[]
	export let dropdownValues: Record<string, OptionType[]> = {}
	export let onSubmit: (values: Record<string, unknown>) => Promise<unknown>
	export let submitText = 'Submit'

	const formProps = getFormProps(initialFields)
	const labels = getLabels(initialFields)
</script>

<Form {...formProps} {onSubmit}>
	<slot name="fields" {labels}>
		{#each initialFields as field, i}
			<FormField
				label={labels[field.id]}
				name={field.id}
				type={field.type}
				options={dropdownValues[field.id]}
				focus={i === 0}
			/>
		{/each}
	</slot>
	<slot name="buttons">
		<div class="field is-grouped">
			<p class="control">
				<FormSubmitButton>{submitText}</FormSubmitButton>
			</p>
			<p class="control">
				<FormResetButton />
			</p>
		</div>
	</slot>
</Form>
