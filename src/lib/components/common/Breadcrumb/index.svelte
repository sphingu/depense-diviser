<script>
	import Anchor from '../Anchor.svelte'
</script>

<!-- // TODO: make breadcrumb dynamic and refactor style -->
<section class="pb-0 pt-0">
	<div class="container">
		<nav class="breadcrumb" aria-label="breadcrumbs">
			<ul>
				<li><Anchor href="/">Home</Anchor></li>
				<li><Anchor href="/">About</Anchor></li>
				<li class="is-active">
					<Anchor href="/" aria-current="page">Breadcrumb</Anchor>
				</li>
			</ul>
		</nav>
	</div>
</section>

<style>
	section {
		background: rgba(0, 0, 0, 0.05);
	}
	nav {
		padding: 0.5em 0;
	}
</style>
