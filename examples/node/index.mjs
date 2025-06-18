/* eslint-disable no-console */
/* eslint-disable antfu/no-top-level-await */
import remarkSandpack from '@lekoarts/remark-sandpack'
import { remark } from 'remark'
import remarkMdx from 'remark-mdx'
import { read } from 'to-vfile'

const file = await remark()
	.use(remarkMdx)
	.use(remarkSandpack, { componentName: ['Playground'] })
	.process(await read('example.mdx'))

console.log(String(file))
