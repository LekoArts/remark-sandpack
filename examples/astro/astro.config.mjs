import { unified } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import remarkSandpack from '@lekoarts/remark-sandpack'
import { defineConfig } from 'astro/config'

export default defineConfig({
	integrations: [mdx({
		processor: unified({
			remarkPlugins: [[remarkSandpack, { componentName: ['Playground'] }]],
		}),
	}), react()],
	vite: {
		optimizeDeps: {
			include: ['@codesandbox/sandpack-react'],
		},
	},
})
