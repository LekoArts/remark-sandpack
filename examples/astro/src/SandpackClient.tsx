import type { SandpackPredefinedTemplate, SandpackSetup } from '@codesandbox/sandpack-react'
import { Sandpack } from '@codesandbox/sandpack-react'

interface SandpackClientProps {
	files: Record<string, string>
	template?: SandpackPredefinedTemplate
	customSetup?: SandpackSetup
}

export function SandpackClient({ files, template, customSetup }: SandpackClientProps) {
	return <Sandpack theme="auto" files={files} template={template} customSetup={customSetup} />
}
