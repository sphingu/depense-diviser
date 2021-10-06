<script lang="ts">
	import Button from '../Buttons/Button.svelte'

	export let isSubmitting = false
</script>

<Button type="reset" disabled={isSubmitting}>
	<i slot="icon" class="ri-restart-line" />
	<slot>Reset</slot>
</Button>
