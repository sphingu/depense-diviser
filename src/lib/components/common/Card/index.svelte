<script lang="ts">
	export let expanded = true

	function toggleExpand() {
		expanded = !expanded
	}
</script>

<div class="card custom-card">
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
