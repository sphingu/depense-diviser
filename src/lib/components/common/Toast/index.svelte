<script lang="ts">
	import { fly, fade } from 'svelte/transition'
	import { backOut } from 'svelte/easing'

	import { toasts } from './store'
</script>

<section>
	{#each $toasts as toastInfo}
		<div
			class={`notification is-${toastInfo.type}`}
			in:fly={{
				delay: 0,
				duration: 300,
				x: 0,
				y: -100,
				opacity: 0.1,
				easing: backOut
			}}
			out:fade={{ duration: 500 }}
		>
			<button class="delete" aria-label="close" on:click={() => toasts.clearToast(toastInfo.id)} />
			{toastInfo.message}
		</div>
	{/each}
</section>

<style>
	section {
		position: absolute;
		z-index: 10000;
		display: flex;
		flex-direction: column;
		right: 30px;
		top: 60px;
		max-height: calc(100vh - 60px);
		overflow-y: hidden;
	}
</style>
