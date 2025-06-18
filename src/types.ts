export interface RemarkSandpackOptions {
	/**
	 * Specify one or more component names to transform.
	 * These components will receive a `files` prop with the parsed code blocks.
	 * @default 'Sandpack'
	 *
	 * @example
	 * ['Sandpack', 'MyCustomSandpack']
	 */
	componentName?: Array<string>
}

export interface SandpackFile {
	/**
	 * The file contents shown in the Sandpack editor.
	 */
	code: string
	/**
	 * Tab visibility in the Sandpack editor.
	 * @default false
	 */
	hidden?: boolean
	/**
	 * Set as the main file.
	 * @default false
	 */
	active?: boolean
	/**
	 * Set as non-editable.
	 * @default false
	 */
	readOnly?: boolean
	/**
	 * Whether to show the read-only indicator in the editor.
	 * @default true
	 */
	showReadOnly?: boolean
}

export interface CodeMeta extends Omit<SandpackFile, 'code'> {
	name: string
}

export type CodeMetaOptions = keyof Omit<SandpackFile, 'code'>
