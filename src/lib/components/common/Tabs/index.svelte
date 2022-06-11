<script lang="ts">
	import Anchor from '../Anchor.svelte'

	export let tabs: string[] = []

	let activeTab: string = tabs[0]
</script>

<div class="tabs is-centered is-medium">
	<ul>
		{#each tabs as tab}
			<!-- svelte-ignore a11y-invalid-attribute -->
			<li class:is-active={tab === activeTab}>
				<Anchor href="javascript:void(0)" on:click={() => (activeTab = tab)}>{tab}</Anchor>
			</li>
		{/each}
	</ul>
</div>

<slot {activeTab} />
