<script lang="ts">
	import { fade, fly } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
	import { createEventDispatcher } from 'svelte'

	export let show = false
	export let title: string
	export let ignoreBackground = true

	const dispath = createEventDispatcher()

	function closeModal(isBackgroundClick = false) {
		if (isBackgroundClick && !ignoreBackground) {
			return
		}
		show = false
		dispath('close')
	}
</script>

{#if show}
	<div class="modal is-active" tabindex="-1" role="dialog" aria-modal="true" transition:fade>
		<div
			class="modal-background"
			transition:fade={{ duration: 150 }}
			on:click={() => closeModal(true)}
		/>
		<div
			class="modal-card"
			in:fly={{ y: -50, duration: 300 }}
			out:fly={{ y: -50, duration: 300, easing: quintOut }}
		>
			{#if title}
				<header class="modal-card-head">
					<p class="modal-card-title">{title}</p>
					<button class="delete" aria-label="close" on:click={() => closeModal()} />
				</header>
			{/if}
			<section class="modal-card-body">
				<slot />
			</section>
			{#if $$slots.footer}
				<footer class="modal-card-foot">
					<slot name="footer" />
				</footer>
			{/if}
		</div>
	</div>
{/if}

<style>
	.modal-card-head,
	.modal-card-body,
	.modal-card-foot {
		border-radius: 0;
	}
</style>
