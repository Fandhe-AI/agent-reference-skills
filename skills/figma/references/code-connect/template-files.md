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
| `instance.getSlot(propName)` | Reference a slot (renders as a clickable label in Dev Mode); `.connectedInstances` lists code-connected instances placed directly in it |
| `instance.findConnectedInstances(selectorFn)` | Find child instances matching a selector function |
| `instance.executeTemplate()` | Execute a nested instance's template and return its snippet |

### Slots vs `findConnectedInstances`

| Use | When |
|-----|------|
| `getSlot()` | The slot can hold freeform content (extra layout, mixed component types, varying frames). Renders as a clickable label in Dev Mode and lets the remote Figma MCP server traverse into it |
| `getSlot().connectedInstances` | The slot contains code-connected components that vary in type and order and you want their code inline, scoped to one slot property without a selector |
| `findConnectedInstances(selectorFn, opts?)` | All children share the same component type and you want their full code expanded in the parent snippet. `opts.traverseInstances` (default `false`) searches nested instances; `opts.path` restricts to a parent-layer-name hierarchy |

```typescript
const slot = figma.selectedInstance.getSlot('Actions')
const actions = slot.connectedInstances.map((action) => action.executeTemplate().example)
const example = figma.code`<ActionBar>${actions.flat()}</ActionBar>`
```

Only instances with their own Code Connect definitions are included in `connectedInstances`; the lookup is shallow.

### Migration script

`npx figma connect migrate [options]` creates template files locally from existing Code Connect files (commit uncommitted changes first; `--outDir` is recommended for testing). By default it scans the project with your `figma.config.json` include/exclude settings and writes `.figma.ts`.

| Option | Description |
|--------|-------------|
| `--file <file...>` | Migrate specific files (omitted: all files in the project) |
| `--outDir <dir>` | Write template files to a specific directory |
| `--javascript` | Output `.figma.js` |
| `--delete` | Delete source files after successful migration |
| `--batch <auto\|all\|none>` | Default `auto` attempts source files with 10 or more connections |
| `--include-props` | Preserve `__props` metadata blocks (needed for React `.getProps()` / `.render()` or templates reading `executeTemplate().metadata.__props`) |

### Batch migration review

- Migration output is a starting point; there are usually opportunities to simplify (for example replace `figma.helpers.react.renderProp('count', count)` with `count={${count}}` when the type is known)
- Source files with 10 or more connections become one `.figma.batch.ts` plus one `.figma.batch.json` when every connection reduces to one compatible template shape using readable `figma.batch.*` parameters; otherwise a warning is shown and regular one-template-per-connection output is written
- Review both generated files: the `.ts` should contain only fields common to every connection; the `.json` holds each connection's Figma `url` and the varying values

### Variant restrictions

Parser-based files with variant restrictions (multiple `figma.connect` calls to the same Figma URL with different `variant` objects) migrate into one file with if / else-if / else branching on `getPropertyValue()`. Simplify with `getBoolean()`, `getEnum()`, or ternaries.

### Testing in Figma

Set `label` to a temporary value (for example `"TEST"`) in `figma.config.json` and limit `include` to the new files, then `npx figma connect publish --config <path>` and later `npx figma connect unpublish --config <path>`.

## Notes

- The official `/no-parser/` page was reported identical to this page's source (`/template-files/`) in the update check (same content under a different URL); it was not re-compared in this pass
- Template files are the only actively maintained way of using Code Connect (since v2.0.0, 2026-08-18)
- The `figma-code-connect` skill helps an AI coding agent write templates from a Figma component URL
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
