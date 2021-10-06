<script lang="ts">
	import * as C from './constants'
</script>

<footer class="footer has-text-centered">
	<div class="container">
		<p>
			<strong class="has-text-weight-semibold">
				{C.APP_COPYRIGHT}
				{C.MADE_WITH}
				<span>{C.HEART}</span>
				{C.BY}
				<a href={C.AUTHOR_LINK}>{C.AUTHOR_NAME}</a>
			</strong>
		</p>
	</div>
</footer>

<style>
	footer {
		background-color: transparent;
		border-top: 1px dashed;
		padding-top: 0;
		padding-bottom: 0;
	}
	.container {
		border-width: 0 1px;
		border-style: none;
		padding: 1em;
	}
</style>
