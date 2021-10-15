<script lang="ts">
	export let expanded: boolean = true

	function toggleExpand() {
		expanded = !expanded
	}
</script>

<div class="card">
	<div class="card-header" on:click={toggleExpand}>
		<slot name="header" />
	</div>
	{#if expanded}
		<div class="card-content">
			<slot />
		</div>
		<div class="card-footer">
			<slot name="footer" />
		</div>
	{/if}
</div>

<style lang="scss">
	.card {
		.card-header {
			cursor: pointer;
			i {
				padding: 0 0.5rem;
			}
			.card-header-content {
				display: flex;
				align-items: center;
				flex-grow: 1;
				padding-right: 0.5rem;
				> * {
					margin: 0;
				}
				div {
					flex-grow: 1;
				}
			}
		}
		.card-content {
			padding: 0.5rem 0.5rem 0.25rem;
			display: grid;
			grid-template-columns: 32px auto;
			> * {
				display: flex;
				align-self: center;
				margin-bottom: 0.25rem;
			}
		}
	}
</style>
