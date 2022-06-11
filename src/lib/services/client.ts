import { createClient } from '@urql/svelte'
import { URLS } from '@/lib/constants'

const client = createClient({
	url: URLS.API
})

export default client
