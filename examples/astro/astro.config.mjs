import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import remarkSandpack from '@lekoarts/remark-sandpack'
import { defineConfig } from 'astro/config'

export default defineConfig({
	integrations: [mdx(), react()],
	markdown: {
		remarkPlugins: [[remarkSandpack, { componentName: ['Playground'] }]],
	},
})
