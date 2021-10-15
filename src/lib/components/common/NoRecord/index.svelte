<script lang="ts">
	export let text = 'No records found.'
</script>

<div class="columns is-centered">
	<div class="column is-half">
		<div class="box has-text-info">
			<div class="block sp-v-center">
				<i class="ri-information-line ri-4x" />
				<h2 class="subtitle has-text-info">{text}</h2>
			</div>
			<slot />
		</div>
	</div>
</div>
