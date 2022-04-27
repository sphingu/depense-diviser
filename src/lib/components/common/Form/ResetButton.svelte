<script lang="ts">
	import { getContext } from 'svelte'
	import { key } from 'svelte-forms-lib'

	import Button from '../Buttons/Button.svelte'

	const { state } = getContext(key)
</script>

<Button type="reset" disabled={$state.isSubmitting}>
	<i slot="icon" class="ri-restart-line" />
	Reset
</Button>
