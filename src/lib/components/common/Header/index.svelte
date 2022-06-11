<script lang="ts">
	import { navigationItems } from './constants'
	import { isAuthenticated, profileInfo, Anchor } from '@/lib/components'
	import { URLS } from '@/lib/constants'

	let isMenuVisible = false
	let isProfileMenuVisible = false

	const toggleMenuVisible = () => {
		isMenuVisible = !isMenuVisible
	}
	const toggleProfileMenuVisibility = () => {
		isProfileMenuVisible = !isProfileMenuVisible
	}
	const onLogoutClick = () => {
		profileInfo.resetProfile()
		window.location.href = URLS.GOOGLE_LOGOUT
	}
	// const onColorChange = (e: Event) => {
	// 	document.documentElement.style.setProperty('--bgcolor', (e.target as HTMLInputElement).value)
	// }
</script>

<section>
	<div class="container">
		<nav class="navbar">
			<div class="navbar-brand">
				<div class="navbar-item p-0 logo">D-diviser</div>
				{#if $isAuthenticated}
					<div class="navbar-burger" on:click={toggleMenuVisible}>
						<span />
						<span />
						<span />
					</div>
				{/if}
			</div>
			{#if $isAuthenticated}
				<div class="navbar-menu" class:is-active={isMenuVisible}>
					<div class="navbar-start">
						{#each navigationItems as item}
							<Anchor class="navbar-item" href={item.path} on:click={toggleMenuVisible}>
								<!-- class:is-active={$page.url.pathname === item.path} -->
								{#if item.iconClass}
									<span class="icon">
										<i class={item.iconClass} />
									</span>
								{/if}
								<span>
									{item.title}
								</span>
							</Anchor>
						{/each}
					</div>
				</div>
				<div class="navbar-end">
					<!-- <div class="navbar-item">
						<input type="color" on:change={onColorChange} />
					</div> -->
					<div class="navbar-item has-dropdown" class:is-active={isProfileMenuVisible}>
						<!-- svelte-ignore a11y-invalid-attribute -->
						<Anchor
							class="navbar-link"
							on:click={toggleProfileMenuVisibility}
							href="javascript:void(0)"
						>
							<figure class="image is-32x32">
								<img class="is-rounded" src={$profileInfo.imageUrl} alt="profile" />
							</figure>
						</Anchor>
						<div class="navbar-dropdown is-right">
							<!-- <Anchor class="navbar-item" href="/proflie">Profile</Anchor> -->
							<!-- svelte-ignore a11y-invalid-attribute -->
							<Anchor class="navbar-item" href="javascript:void(0)" on:click={onLogoutClick}
								>Logout</Anchor
							>
						</div>
					</div>
				</div>
			{/if}
		</nav>
	</div>
</section>

<style lang="scss">
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
	/* .navbar-item:hover {
		background-color: rgba(0, 0, 0, 0.1);
	} */
	.navbar-start {
		.navbar-item.is-active {
			background-color: black !important;
			color: white;
		}
		.navbar-item.is-active span:last-child {
			border-bottom: 2px solid;
		}

		.navbar-item span.icon {
			height: auto;
			margin-right: 5px;
			font-size: 1.3rem;
		}
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
	/* patch for profile dropdown issue start */
	.navbar-dropdown {
		display: none;
	}
	.has-dropdown.is-active .navbar-dropdown {
		display: block;
	}
	.navbar-item img {
		max-height: fit-content;
	}
	/* patch for profile dropdown issue end */
</style>
