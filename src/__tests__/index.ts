import type { Root } from 'mdast'
import type { Options } from '../index'
import fs from 'node:fs/promises'
import { remark } from 'remark'
import remarkMdx from 'remark-mdx'
import { describe, expect, it } from 'vitest'
import * as publicExports from '../index'

describe('remarkSandpack', async () => {
	it('should export all public APIs', () => {
		expect(Object.keys(publicExports).sort()).toEqual([
			'default',
		])
	})
	it('should not throw if no options are passed', async () => {
		expect(() => {
			remark().use(publicExports.default).freeze()
		}).not.toThrow()
	})
})

describe('fixtures', async () => {
	const base = new URL('fixtures/', import.meta.url)
	const folders = await fs.readdir(base)

	let index = -1

	while (++index < folders.length) {
		const folder = folders[index]

		await it(folder, async () => {
			const folderUrl = new URL(`${folder}/`, base)
			const inputUrl = new URL('input.mdx', folderUrl)
			const outputUrl = new URL('output.mdx', folderUrl)
			const treeUrl = new URL('tree.json', folderUrl)

			const input = String(await fs.readFile(inputUrl))

			let expected: Root
			let output: string

			const remarkSandpackOptions: Options = {}

			if (folder === 'component-name') {
				remarkSandpackOptions.componentName = ['Playground']
			}
			if (folder === 'multiple-component-names') {
				remarkSandpackOptions.componentName = ['Playground', 'MinimalPlayground']
			}

			const processor = remark().use(remarkMdx).use(publicExports.default, remarkSandpackOptions)
			const actual = processor.parse(input)

			try {
				output = String(await fs.readFile(outputUrl))
			}
			catch {
				output = input
			}

			try {
				if ('UPDATE' in process.env) {
					throw new Error('Updating…')
				}

				expected = JSON.parse(String(await fs.readFile(treeUrl)))
			}
			catch {
				expected = actual

				// New fixture
				await fs.writeFile(treeUrl, `${JSON.stringify(actual, undefined, 2)}\n`)
			}

			expect(actual).toEqual(expected)

			expect(String(await processor.process(input))).toEqual(String(output))
		})
	}
})
