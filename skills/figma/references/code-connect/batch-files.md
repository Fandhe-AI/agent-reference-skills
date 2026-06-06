# Batch Files

Connect many Figma components to code using a single shared template, ideal for large libraries with consistent patterns (e.g., icon sets).

## Signature / Usage

**Template file** (`icons.figma.batch.ts`):

```typescript
import figma from 'figma'

const size = instance.getEnum('Size', {
  Small: '16px',
  Medium: '24px',
  Large: '32px',
})

export default {
  example: figma.code`<${figma.batch.name} size={${size}} />`,
  imports: [`import ${figma.batch.name} from "${figma.batch.importPath}"`],
  id: figma.batch.id,
}
```

**JSON file** (`icons.figma.batch.json`):

```json
{
  "templateFile": "./icons.figma.batch.ts",
  "components": [
    {
      "url": "https://www.figma.com/design/ABC/File?node-id=1-1",
      "name": "Icon24Arrow",
      "id": "icon-arrow",
      "importPath": "@company/icons/arrow"
    }
  ]
}
```

## Options / Props

### `figma.batch` object fields

| Field | Source | Description |
|-------|--------|-------------|
| `url` | JSON `url` (required) | Replaces the `// url=` metadata comment |
| `source` | JSON `source` (optional) | Replaces the `// source=` metadata comment |
| `component` | JSON `component` (optional) | Replaces the `// component=` metadata comment |
| Custom fields | Any JSON field | Accessible as `figma.batch.<fieldName>` |

### JSON file structure

**Single template (shorthand):**
```json
{
  "templateFile": "./template.figma.batch.ts",
  "components": [ { "url": "...", ... } ]
}
```

**Multiple templates:**
```json
[
  { "templateFile": "./icons.figma.batch.ts", "components": [...] },
  { "templateFile": "./buttons.figma.batch.ts", "components": [...] }
]
```

## Notes

- Batch template files do **not** include metadata comments (`// url=`, `// source=`, `// component=`) at the top — this data comes from the JSON file instead
- `.figma.batch.json` files are discovered automatically via existing `include`/`exclude` globs (default globs already cover `**/*.figma.batch.json`)
- Each component entry in the JSON publishes as an independent Code Connect document
- Publish with the standard `npx figma connect publish` command

## Related

- [Template Files](./template-files.md)
- [Template API](./template-api.md)
- [CLI Reference](./cli-reference.md)
