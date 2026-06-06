# Editor Types

Figma plugins can target one or more editor environments. The active environment is exposed at runtime via `figma.editorType`.

## Signature / Usage

```json
// manifest.json
{
  "editorType": ["figma", "dev"]
}
```

```ts
// Runtime detection
if (figma.editorType === 'figma') {
  // Design editor logic
} else if (figma.editorType === 'figjam') {
  // FigJam whiteboard logic
}
```

## Options / Props

| Value | Description |
|-------|-------------|
| `"figma"` | Design editor — full node creation and manipulation APIs |
| `"figjam"` | Whiteboarding tool — sticky notes, connectors, shapes with text |
| `"dev"` | Dev Mode — inspect and annotation focus; `figma.mode === 'inspect' \| 'codegen'` |
| `"slides"` | Presentation editor — SlideNode, SlideRowNode, SlideGridNode APIs |
| `"buzz"` | Buzz product |

## Notes

- `"dev"` and `"figjam"` cannot appear together in the same `editorType` array.
- Certain APIs are editor-scoped: e.g. `figma.createSticky()` is only available in FigJam; `figma.createConnector()` is FigJam-only.
- Use `figma.editorType` to branch behavior in multi-editor plugins.
- `figma.mode` gives finer-grained context within an editor (`'default'`, `'textreview'`, `'inspect'`, `'codegen'`, `'linkpreview'`, `'auth'`).

## Related

- [manifest](./manifest.md)
- [figma global object](./figma-global.md)
