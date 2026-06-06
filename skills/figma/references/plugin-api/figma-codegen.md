# figma.codegen

Sub-API for Dev Mode codegen plugins. Registers callbacks that fire when the user's selection changes in Dev Mode, producing code snippets displayed in the Inspect panel.

## Signature / Usage

```ts
figma.codegen.on('generate', async (event: CodegenEvent) => {
  const node = event.node;
  return [
    {
      title: 'CSS',
      code: `width: ${node.width}px;\nheight: ${node.height}px;`,
      language: 'CSS',
    },
  ];
});

figma.codegen.on('preferenceschange', async (event) => {
  figma.codegen.refresh();
});
```

## Options / Props

### Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `on('generate', cb)` | `(event: CodegenEvent) => Promise<CodegenResult[]> \| CodegenResult[]` | Register codegen callback; called on selection change in Dev Mode |
| `on('preferenceschange', cb)` | `(event: CodegenPreferencesEvent) => Promise<void>` | Register callback for preference changes |
| `once(type, cb)` | Same signatures as `on()` | Single-use callback |
| `off(type, cb)` | Same signatures as `on()` | Remove callback |
| `refresh()` | `() => void` | Re-trigger the `generate` callback |

### Properties

| Name | Type | Description |
|------|------|-------------|
| `preferences` | `CodegenPreferences` (readonly) | Current user-set preferences: `unit`, `scaleFactor?`, `customSettings` |

### CodegenResult fields

| Name | Type | Description |
|------|------|-------------|
| `title` | `string` | Section heading in the Inspect panel |
| `code` | `string` | Code snippet content |
| `language` | `CodeLanguage` | Syntax highlighting language |

## Notes

- The `generate` callback has a **15-second timeout**; return results before then.
- `capabilities: ["codegen"]` must be set in `manifest.json`.
- `figma.mode` will be `'codegen'` when the codegen callback runs.
- `CodegenPreferences.unit` is `'PIXEL'` or `'SCALED'`; `scaleFactor` is only present when `'SCALED'`.

## Related

- [figma global object](./figma-global.md)
- [editor-types](./editor-types.md)
