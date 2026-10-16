# Getting Started with Code Connect CLI

Set up Code Connect CLI with template files (the recommended, framework-agnostic approach): install, configure, write a template file (with an AI coding agent or by hand), publish, and explore next steps.

## Signature / Usage

```bash
# 1. Install globally
npm install --global @figma/code-connect@latest

# 2. Publish all Code Connect files
npx figma connect publish --token=<PERSONAL_ACCESS_TOKEN>

# Or set token via environment variable
export FIGMA_ACCESS_TOKEN=<token>
npx figma connect publish

# Unpublish a node (omitting --node unpublishes all components in your Code Connect files directory)
npx figma connect unpublish --node=NODE_URL --label=LABEL
```

Minimal template file:

```ts
// Button.figma.ts
// url=https://www.figma.com/file/your-file-id/Button?node-id=123
import figma from 'figma'

const instance = figma.selectedInstance

const label = instance.getString('Label')
const disabled = instance.getBoolean('Disabled')
const size = instance.getEnum('Size', {
  Large: 'large',
  Medium: 'medium',
  Small: 'small',
})

export default {
  example: figma.code`
<Button size={${size}} disabled={${disabled}}>
  ${label}
</Button>
`,
  imports: ['import { Button } from "components/Button"'],
  id: 'button',
}
```

## Options / Props

### Requirements

| Requirement | Detail |
|-------------|--------|
| Node.js | 18 or newer |
| Personal access token | Code Connect scope: `Write`; File content scope: `Read` |
| Seat / plan | Dev or Full seat on the Professional, Organization, or Enterprise plan (Professional: one active library and one active framework) |
| Codebase and library | A design system codebase with components, and a Figma design library file with the root components |

### Steps

1. Install the Code Connect command line tool (above)
2. Configure the project (`figma.config.json`, `tsconfig.json`)
3. Write a template file: with an AI coding agent (the `figma-code-connect` skill, needs an agent with the Figma MCP server; it parses the Figma URL, finds unmapped components, reads property definitions, finds the matching code component, and writes the `.figma.ts`) or manually (copy the component link via right-click → Copy link to selection)
4. Publish (`npx figma connect publish`), then open Dev Mode to see the snippet in the Inspect panel
5. Next steps: Writing template files, Template API reference, Configuration, framework-specific APIs (legacy)

The Simple Design System (SDS) community file and `sds` repository can optionally be used to follow along.

### Project configuration (`figma.config.json`)

```json
{
  "codeConnect": {
    "include": ["**/*.figma.ts"],
    "label": "React",
    "language": "jsx"
  }
}
```

### TypeScript type definitions (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "types": ["@figma/code-connect/figma-types"]
  }
}
```

### Template file parts

| Part | Description |
|------|-------------|
| Metadata comment `// url=...` | Links the file to a specific Figma component |
| Property access | Methods on `figma.selectedInstance`: `getString`, `getBoolean`, `getEnum`, `getInstanceSwap`, etc. |
| `export default` | `example` (snippet), `imports` (import statements shown on top), unique `id` |

## Notes

- Adjust `label` and `language` in `figma.config.json` to match your framework (e.g., `"Swift"` / `"swift"` for SwiftUI)
- Template files use the `.figma.ts` (or `.figma.js`) extension by convention
- Each file requires a metadata comment `// url=https://www.figma.com/...` pointing to the Figma component node
- Since v2.0.2 (2026-10-14), `figma connect create` always generates a parserless template file (`.figma.ts` / `.figma.js`), even in projects configured for a framework-specific parser; other output filenames are rejected
- React Integration (Related) covers the legacy framework-specific parser
- Code Connect collects minimal data: component paths, repository URL, and properties and code in the `.figma` files; basic usage events (publish / unpublish and Figma data calls)
- Types for projects with `@types/node`: use `@figma/code-connect/figma-types-no-require` in the `types` array (v1.4.9)

## Related

- [Config File Reference](./config-file.md)
- [CLI Reference](./cli-reference.md)
- [Template Files](./template-files.md)
- [Template API](./template-api.md)
- [React Integration](./react.md)
