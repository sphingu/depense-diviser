<script lang="ts">
	export let tabs: string[] = []

	let activeTab: string = tabs[0]
</script>

<div class="tabs is-centered is-medium">
	<ul>
		{#each tabs as tab}
			<!-- svelte-ignore a11y-invalid-attribute -->
			<li class:is-active={tab === activeTab}>
				<a href="javascript:void(0)" on:click={() => (activeTab = tab)}>{tab}</a>
			</li>
		{/each}
	</ul>
</div>

<slot {activeTab} />
