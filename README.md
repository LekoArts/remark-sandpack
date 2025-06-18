# remark-sandpack

Use `@lekoarts/remark-sandpack` to more easily author [Sandpack](https://sandpack.codesandbox.io/docs) examples in your MDX. It parses individual code blocks and places them into Sandpack's `files` option. This way you don't have to write the JSX yourself.

> [!NOTE]
> This package is a fork of [thecuvii/remark-sandpack](https://github.com/thecuvii/remark-sandpack) as the repository was put into read-only mode. `@lekoarts/remark-sandpack` is leaner, up-to-date, and maintained.

## Installation

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

```shell
npm install @lekoarts/remark-sandpack
```

## Usage

Say your document `index.mdx` contains:

````mdx
<Sandpack template="react">

```js name=App.js active
import { NAME } from './constants.js'

export default function App() {
  return <h1>Hello {NAME}</h1>
}
```

```js name=constants.js readOnly
export const NAME = 'World'
```

</Sandpack>
````

And the module `index.mjs` contains:

```js
import remarkSandpack from '@lekoarts/remark-sandpack'
import { remark } from 'remark'
import remarkMdx from 'remark-mdx'
import { read } from 'to-vfile'

const file = await remark()
	.use(remarkMdx)
	.use(remarkSandpack)
	.process(await read('example.mdx'))

console.log(String(file))
```

Then running `index.mjs` yields:

````mdx
<Sandpack template="react" files={{"App.js":{"code":"import { NAME } from './constants.js'\n\nexport default function App() {\n  return <h1>Hello {NAME}</h1>\n}","active":true},"constants.js":{"code":"export const NAME = 'World'","readOnly":true}}}>
  ```js name=App.js active
  import { NAME } from './constants.js'

  export default function App() {
    return <h1>Hello {NAME}</h1>
  }
  ```

  ```js name=constants.js readOnly
  export const NAME = 'World'
  ```
</Sandpack>
````

The individual code blocks are added to the `files` prop of the `<Sandpack>` component. Any other props will be passed through to the `<Sandpack>` component, e.g. in the example above the `template="react"` is kept in place.

### Code blocks

You are **required** to add a `name` to each code block.

````md
```js name=filename.js
console.log('Hello World')
```
````

You can also add optional configuration for each code block (Sandpack's [file format](https://sandpack.codesandbox.io/docs/getting-started/usage#file-format)).

- `hidden`
- `active`
- `readOnly`
- `showReadOnly`

Add them after the filename like so:

````md
```js name=filename.js active
console.log('Hello World')
```
````

## API

This package exports no identifiers.
The default export is [`remarkSandpack`](#unifieduseremarksandpack-options).

### `unified().use(remarkSandpack[, options])`

Add support for transforming code blocks into `files` prop for `<Sandpack>` components.

#### Parameters

- `options` ([`Options`](#options), optional) — configuration

#### Returns

Nothing (`undefined`).

#### Notes

Doesn't handle adding Sandpack to your app and into your MDX. Follow the Sandpack [install instructions](https://sandpack.codesandbox.io/docs/getting-started) to add Sandpack. You'll need to [pass/import](https://mdxjs.com/docs/using-mdx/#components) that component into your MDX.

### `Options`

Configuration (TypeScript type)

#### Fields

- `componentName` (`Array<string>`, default: `['Sandpack']`) — By default, `@lekoarts/remark-sandpack` looks for `<Sandpack>` occurences in the MDX. If you use a different name, adjust `componentName`. You can also pass in multiple names in case you have different Sandpack components.

## Examples

### Custom `componentName`

This example overrides the default `componentName` in order to use a different name in the MDX.

```js
import remarkSandpack from '@lekoarts/remark-sandpack'
import { remark } from 'remark'
import remarkMdx from 'remark-mdx'
import { read } from 'to-vfile'

const file = await remark()
	.use(remarkMdx)
	.use(remarkSandpack, { componentName: ['Playground'] })
	.process(await read('example.mdx'))

console.log(String(file))
```

````mdx
<Playground template="vanilla">

```js name=index.js active
console.log('Hello World')
```

</Playground>
````

### Astro

You can view a full end-to-end example inside [`examples/astro`](./examples/astro/).
