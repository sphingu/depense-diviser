<script lang="ts">
	export let text: string;
</script>

<h1>{text}</h1>

<div class="one">
	ONE
	<div class="two">
TWO OO
	</div>
</div>

<style lang="scss">
	h1 {
		color: lightgreen;
		background-color: black;
	}
	.one {
		color: green;
		.two {
			color: red;
		}
	}
</style>
