<script lang="ts">
	import { page } from '$app/stores'
	import { navigationItems } from './constants'

	let isMenuVisible = false

	const toggleMenuVisible = () => {
		isMenuVisible = !isMenuVisible
	}

	const onColorChange = (e: Event) => {
		document.documentElement.style.setProperty('--bgcolor', (e.target as HTMLInputElement).value)
	}
</script>

<section class="section">
	<div class="container">
		<nav class="navbar">
			<div class="navbar-brand">
				<div class="navbar-item p-0 logo">D-diviser</div>
				<div class="navbar-burger" on:click={toggleMenuVisible}>
					<span />
					<span />
					<span />
				</div>
			</div>

			<div class="navbar-menu" class:is-active={isMenuVisible}>
				<div class="navbar-start">
					{#each navigationItems as item}
						<a
							class="navbar-item"
							href={item.path}
							class:is-active={$page.path === item.path}
							on:click={toggleMenuVisible}
							><span>
								{item.title}
							</span>
						</a>
					{/each}
				</div>
			</div>

			<div class="navbar-end">
				<div class="navbar-item">
					<input type="color" id="favcolor" class="inputcolor" on:input={onColorChange} />
				</div>
			</div>
		</nav>
	</div>
</section>

<style>
	section {
		padding-bottom: 0;
		padding-top: 0;
		border-bottom: 1px dashed;
	}
	.navbar {
		background-color: transparent;
		border-width: 0 1px 0 1px;
		border-style: none;
	}
	.navbar-burger {
		height: auto;
	}
	.navbar-item:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
	.navbar-item.is-active {
		background-color: black !important;
		color: white;
	}
	.navbar-item.is-active span {
		border-bottom: 2px solid;
	}
	.logo {
		font-size: 2.5em;
		padding: 0;
		margin: 0 0.5em;
		background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
		background-size: 400% 400%;
		animation: gradient 10s ease infinite;
	}

	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
