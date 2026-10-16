# Code Connect — Template File Setup

Create a `.figma.ts` template file for a component, configure `figma.config.json`, and publish it to Figma Dev Mode.

```bash
# Install CLI
npm install --global @figma/code-connect@latest

# Set personal access token (Code Connect: Write, File content: Read)
export FIGMA_ACCESS_TOKEN=<your-personal-access-token>
```

```json
// figma.config.json — project root
{
  "codeConnect": {
    "include": ["**/*.figma.ts"],
    "label": "React",
    "language": "jsx"
  }
}
```

```typescript
// Button.figma.ts
// url=https://www.figma.com/file/your-file-id/Button?node-id=123
import figma from 'figma'

const instance = figma.selectedInstance

export default {
example: figma.code`
<Button
size={${instance.getEnum('Size', { Large: 'large', Medium: 'medium', Small: 'small' })}}
disabled={${instance.getBoolean('Disabled')}}
>
${instance.getString('Text Content')}
</Button>
`,
imports: ['import { Button } from "components/Button"'],
id: 'button',
}
```

```bash
# Preview what will be published (dry run)
npx figma connect publish --dry-run

# Publish template files to Figma
npx figma connect publish
```

## Notes

- Template files (v2) are the recommended format; the `figma.connect()` React parser format is legacy. Since Code Connect v2.0.0 (2026-08-18), framework-specific parsers are only usable by `figma connect migrate` and `figma connect unpublish`; other commands exit with guidance to migrate.
- To keep using framework-specific parsers, install `@figma/code-connect@1` (`npm install --save-dev @figma/code-connect@1`). To convert existing parser-based files, run `npx figma connect migrate`.
- Each template file must start with `// url=...` (copy via right-click, "Copy link to selection"); optional `// source=` and `// component=` comments are displayed in Figma.
- For TypeScript editor support, add `"types": ["@figma/code-connect/figma-types"]` to `compilerOptions` in `tsconfig.json`.
