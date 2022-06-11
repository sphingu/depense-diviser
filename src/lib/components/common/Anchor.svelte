<script lang="ts">
	import { url } from '@roxi/routify'

	export let href: string
</script>

<a href={$url(href)} {...$$props}><slot /></a>
