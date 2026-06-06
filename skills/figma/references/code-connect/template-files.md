# Template Files

Framework-agnostic approach to defining Code Connect using TypeScript (`.figma.ts`) or JavaScript (`.figma.js`) files that give full control over code snippet generation.

## Signature / Usage

```typescript
// url=https://www.figma.com/file/ABC/DesignSystem?node-id=1-1
// source=src/components/Button.tsx
// component=Button

import figma from 'figma'

const label = instance.getString('Label')
const disabled = instance.getBoolean('Disabled')

export default {
  example: figma.code`<Button disabled={${disabled}}>${label}</Button>`,
  imports: ["import { Button } from '@ui/components'"],
  id: 'button-template',
}
```

## Options / Props

### Metadata comments (at file top)

| Comment | Required | Description |
|---------|----------|-------------|
| `// url=` | Yes | URL of the Figma component node |
| `// source=` | No | File path of the corresponding code component |
| `// component=` | No | Component name |

### Export object fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `example` | `ResultSection[]` | Yes | Code snippet produced by `figma.code` tagged template literal |
| `imports` | `string[]` | No | Import statements to include with the snippet |
| `id` | `string` | No | Custom Code Connect identifier |
| `metadata.nestable` | `boolean` | No | `true` = inline rendering; `false` = expandable pill |
| `metadata.props` | `object` | No | Data passed to parent templates |

### Instance property access methods

| Method | Description |
|--------|-------------|
| `instance.getString(propName)` | Retrieve a string property value |
| `instance.getBoolean(propName)` | Retrieve a boolean property value |
| `instance.getEnum(propName, mapping)` | Map an enum/variant property to a code value |
| `instance.getPropertyValue(propName)` | Retrieve raw string or boolean value |
| `instance.findInstance(layerName)` | Locate a nested component instance by layer name |
| `instance.getSlot(propName)` | Reference a flexible content slot |
| `instance.findConnectedInstances(selectorFn)` | Find child instances matching a selector function |
| `instance.executeTemplate()` | Execute a nested instance's template and return its snippet |

## Notes

- Configure `figma.config.json` with `label`, `language`, and `include: ["**/*.figma.ts"]` before using template files
- Add `"types": ["@figma/code-connect/figma-types"]` to `tsconfig.json` for type definitions
- Use `figma.code` template literal (not plain string interpolation) to preserve pill rendering in Dev Mode
- Use `getSlot()` for freeform content that varies in structure; use `findConnectedInstances()` when all children share the same component type
- `npx figma connect migrate` converts existing Code Connect files to template format; use `--outDir`, `--javascript`, `--include-props` flags as needed

## Related

- [Template API](./template-api.md)
- [Batch Files](./batch-files.md)
- [Config File](./config-file.md)
- [CLI Reference](./cli-reference.md)
