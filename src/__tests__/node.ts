import type { Code } from 'mdast'
import { describe, expect, it } from 'vitest'
import { resolveCodeMeta } from '../node'
import { ERRORS } from '../utils'

describe('resolveCodeMeta', () => {
	it('throws error when meta is missing', () => {
		const codeNode = { meta: null } as Code
		expect(() => resolveCodeMeta(codeNode)).toThrow(ERRORS.EMPTY_META)
	})

	it('throws error when name is missing', () => {
		const codeNode = { meta: 'active' } as Code
		expect(() => resolveCodeMeta(codeNode)).toThrow(ERRORS.MISSING_NAME)
	})

	it('throws error for invalid meta option', () => {
		const codeNode = { meta: 'name=test.js invalid' } as Code
		expect(() => resolveCodeMeta(codeNode)).toThrow(ERRORS.INVALID_META('invalid'))
	})

	it('parses name only', () => {
		const codeNode = { meta: 'name=test.js' } as Code
		const result = resolveCodeMeta(codeNode)
		expect(result).toEqual({ name: 'test.js' })
	})

	it('parses name with options', () => {
		const codeNode = { meta: 'name=test.js active hidden readOnly' } as Code
		const result = resolveCodeMeta(codeNode)
		expect(result).toEqual({
			name: 'test.js',
			active: true,
			hidden: true,
			readOnly: true,
		})
	})
})
