import { describe, expect, it } from 'vitest'
import { CODE_META_OPTIONS, isCodeMetaOption } from '../utils'

describe('isCodeMetaOption', () => {
	it('should return true for valid code meta options', () => {
		CODE_META_OPTIONS.forEach((option) => {
			expect(isCodeMetaOption(option)).toBe(true)
		})
	})

	it('should return false for invalid code meta options', () => {
		const invalidOptions = ['invalid', 'test', '']
		invalidOptions.forEach((option) => {
			expect(isCodeMetaOption(option)).toBe(false)
		})
	})
})
