<script lang="ts">
	export let amount: number
	export let precision: number = 0
	export let classes = ''
	export let colored = false
	$: amountClass = !colored
		? ''
		: amount === 0
		? 'is-light'
		: amount > 0
		? 'is-success'
		: 'is-danger'
	$: formattedAmount = `₹ ${Math.abs(amount).toFixed(precision)}`
</script>

<span class={`tag is-rounded ${classes} ${amountClass}`} {...$$props}>{formattedAmount}</span>
