import type { Root } from 'mdast'
import type { MdxJsxFlowElement } from 'mdast-util-mdx-jsx'
import type { RemarkSandpackOptions } from './types'
import { transformCode } from './node'

export default function remarkSandpack(options?: Readonly<RemarkSandpackOptions>) {
	const componentName = options?.componentName || ['Sandpack']

	return async (tree: Root): Promise<void> => {
		const visit = await import('unist-util-visit').then(module => module.visit)
		const promises: Array<() => Promise<void>> = []

		visit(tree, 'mdxJsxFlowElement', (jsxNode: MdxJsxFlowElement) => {
			if (!jsxNode.name)
				return

			if (!componentName.includes(jsxNode.name))
				return

			promises.push(async () => transformCode(jsxNode))
		})

		await Promise.all(promises.map(p => p()))
	}
}
