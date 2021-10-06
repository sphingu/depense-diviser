<script lang="ts">
	import { Header, Footer } from '$lib/components/common'
</script>

<Header />
<div id="main">
	<section class="section pb-0 pt-0">
		<div class="container">
			<div class="box">
				<slot />
			</div>
		</div>
	</section>
</div>

<Footer />

<style lang="scss" global>
	@import '../scss/app.scss';
</style>
