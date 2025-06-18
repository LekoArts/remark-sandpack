import antfu from '@antfu/eslint-config'

export default antfu({
	formatters: true,
	stylistic: {
		indent: 'tab',
		quotes: 'single',
		semi: false,
	},
	typescript: true,
	astro: true,
	javascript: true,
	ignores: ['dist', 'node_modules', 'pnpm-lock.yaml'],
}, {
	rules: {
		'ts/no-restricted-types': ['error', {
			types: {
				'{}': {
					fixWith: 'Record<string, unknown>',
				},
				'object': {
					fixWith: 'Record<string, unknown>',
				},
			},
		}],
		'ts/array-type': ['error', { default: 'generic' }],
	},
})
