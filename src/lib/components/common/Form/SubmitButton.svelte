<script lang="ts">
	import { getContext } from 'svelte'
	import { key } from 'svelte-forms-lib'

	import Button from '../Buttons/Button.svelte'

	const { state } = getContext(key)
</script>

<Button
	type="submit"
	className="is-success"
	loading={$state.isSubmitting}
	disabled={!$state.isModified}
>
	<!-- TODO: but as isValid not working properly kept only modified disabled={!($state.isValid && $state.isModified)} -->
	<i slot="icon" class="ri-save-3-line" />
	<slot>Submit</slot>
</Button>
