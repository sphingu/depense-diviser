<script lang="ts">
	export let text = ''
</script>

<div class="is-relative is-min-height100">
	<div class="progress-wrapper">
		{text}
		<div id="progressBar" class="progress-bar--container visible" />
	</div>
</div>

<style>
	.progress-wrapper {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		background: rgb(255 255 255 / 37%);
		box-shadow: 0 0 10px white;
	}
	.progress-bar--container {
		width: 70%;
		height: 10px;
		background-color: rgba(33, 150, 243, 0.6);
		box-shadow: 0 0 4px rgb(33, 150, 243);
		border: 1px solid rgb(33, 150, 243, 0.7);
		display: none;
		position: relative;
		overflow: hidden;
		transition: opacity 0.1s ease-out;
		opacity: 1;
	}

	.progress-bar--container::after {
		background-color: rgb(33, 150, 243);

		content: '';
		position: absolute;
		width: inherit;
		height: inherit;
		transform-origin: left;
	}

	.progress-bar--container.visible {
		display: block;
		animation: progress-bar--container_fadeIn 0.2s ease-in;
	}

	.progress-bar--container.visible::after {
		display: block;
		animation: progress-bar_fill 2s linear;
		animation-iteration-count: infinite;
	}

	/* .progress-bar--container.visible.fade {
		opacity: 0;
	} */

	@keyframes progress-bar_fill {
		0% {
			transform: scaleX(0) translateX(0);
		}
		1% {
			transform: scaleX(0) translateX(0);
		}
		33% {
			transform: scaleX(0.66) translateX(16.5%);
		}
		75% {
			transform: scaleX(1.5) translateX(66%);
		}
		100% {
			transform: scaleX(2) translateX(150%);
		}
	}
	@keyframes progress-bar--container_fadeIn {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}
</style>
