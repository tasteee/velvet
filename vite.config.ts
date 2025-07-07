import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
	plugins: [
		devtoolsJson(),
		sveltekit(),
		Icons({
			compiler: 'svelte',
			autoInstall: true
		}),
		tailwindcss()
	]
})
