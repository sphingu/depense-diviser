import { createClient } from '@urql/svelte'
import { API_URL } from '$lib/constants'

const client = createClient({
	url: API_URL
})

export default client
