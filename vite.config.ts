import { defineConfig, optimizeDeps } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
	resolve: {
		alias: {
			'@': resolve('/src')
		}
	},
	optimizeDeps: {
		exclude: ['@urql/svelte']
	}
	// server: {
	// 	proxy: {
	// 		// TODO: move this to env and make it conditional for dev environment only
	// 		'/graphql': 'http://localhost:5001'
	// 	}
	// }
})
