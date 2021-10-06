<script lang="ts">
	import Button from '../Buttons/Button.svelte'
	import { isFormModified, isFormValid } from './store'

	export let isSubmitting = false

	$: className = `is-success ${isSubmitting ? 'is-loading' : ''}`
</script>

<Button type="submit" {className} disabled={!($isFormValid && $isFormModified)}>
	<i slot="icon" class="ri-save-3-line" />
	<slot>Submit</slot>
</Button>
