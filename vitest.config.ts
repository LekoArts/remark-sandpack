import process from 'node:process'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		include: ['src/**/__tests__/*.ts'],
		reporters: [process.env.CI ? 'default' : 'verbose'],
	},
})
