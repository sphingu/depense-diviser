<script lang="ts">
	import { fly, fade } from 'svelte/transition'
	import { backOut } from 'svelte/easing'

	import { toasts } from './store'
</script>

<section>
	{#each $toasts as toastInfo}
		<div
			class={`message is-${toastInfo.type}`}
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
			<div class="message-body is-relative">
				{toastInfo.message}

				<button
					class="delete"
					aria-label="close"
					on:click={() => toasts.clearToast(toastInfo.id)}
				/>
			</div>
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
	.delete {
		position: absolute;
		top: 5px;
		right: 5px;
	}
</style>
