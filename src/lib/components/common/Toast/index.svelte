<script lang="ts">
	import { fly, fade } from 'svelte/transition'
	import { backOut } from 'svelte/easing'

	import { toasts } from './store'
</script>

<div class="toast-wrapper">
	{#each $toasts as toastInfo}
		<div
			class={`toast-item ${toastInfo.type}`}
			in:fly={{
				delay: 0,
				duration: 300,
				x: 0,
				y: 50,
				opacity: 0.1,
				easing: backOut
			}}
			out:fade={{ duration: 500 }}
		>
			{toastInfo.message}
			<button on:click={() => toasts.clearToast(toastInfo.id)}>x</button>
		</div>
	{/each}
</div>
