import type { Code } from 'mdast'
import type { MdxJsxFlowElement } from 'mdast-util-mdx-jsx'
import type { CodeMeta, SandpackFile } from './types'
import { ERRORS, isCodeMetaOption } from './utils'

/**
 * Check every code block inside a `<Sandpack>` component and extract the metadata.
 * The metadata will be used to add the `files` prop to the Sandpack component.
 */
export async function transformCode(jsxNode: MdxJsxFlowElement): Promise<void> {
	const files: Record<string, SandpackFile> = {}

	const visit = await import('unist-util-visit').then(module => module.visit)

	visit(jsxNode, 'code', (codeNode) => {
		const meta = resolveCodeMeta(codeNode)
		const code = codeNode.value

		files[meta.name] = {
			code,
			active: meta.active,
			hidden: meta.hidden,
			readOnly: meta.readOnly,
		}
	})

	await appendProp(jsxNode, 'files', files)
}

/**
 * Extract the metadata from code blocks inside `<Sandpack>` components. They'll be used as options for the `files` prop later.
 */
export function resolveCodeMeta(codeNode: Code): CodeMeta {
	if (!codeNode.meta) {
		throw new Error(ERRORS.EMPTY_META)
	}

	/**
	 * The meta string can have this format:
	 * - `name=filename.js active`
	 * - `name=filename.js`
	 */
	const metaArray = codeNode.meta.split(' ').filter(meta => meta.length)
	// @ts-expect-error - It'll be populated later
	const meta: CodeMeta = {}
	let hasName = false

	for (const attr of metaArray) {
		if (attr.startsWith('name=')) {
			const name = attr.slice(5) // Remove 'name=' prefix
			meta.name = name
			hasName = true
		}
		else if (isCodeMetaOption(attr)) {
			meta[attr] = true
		}
		else {
			throw new Error(ERRORS.INVALID_META(attr))
		}
	}

	if (!hasName) {
		throw new Error(ERRORS.MISSING_NAME)
	}

	return meta
}

async function appendProp(node: MdxJsxFlowElement, propName: string, propValue: unknown): Promise<void> {
	const valueToEstree = await import('estree-util-value-to-estree').then(module => module.valueToEstree)

	node.attributes.push({
		type: 'mdxJsxAttribute',
		name: propName,
		value: {
			type: 'mdxJsxAttributeValueExpression',
			value: JSON.stringify(propValue),
			data: {
				estree: {
					type: 'Program',
					body: [
						{
							type: 'ExpressionStatement',
							expression: valueToEstree(propValue),
						},
					],
					sourceType: 'module',
				},
			},
		},
	})
}
