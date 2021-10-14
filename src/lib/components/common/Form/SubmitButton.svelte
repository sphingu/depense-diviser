<script lang="ts">
	import Button from '../Buttons/Button.svelte'
	import { isFormModified, isFormValid } from './store'

	export let isSubmitting = false
</script>

<Button
	type="submit"
	className="is-success"
	loading={isSubmitting}
	disabled={!($isFormValid && $isFormModified)}
>
	<i slot="icon" class="ri-save-3-line" />
	<slot>Submit</slot>
</Button>
