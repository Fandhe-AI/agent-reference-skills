# Figma and FigJam Widgets

How to target Figma design files, FigJam boards, or both, and what differs between the two editors.

## Signature / Usage

```json
// manifest.json — target both editors
{ "editorType": ["figma", "figjam"] }

// Figma only
{ "editorType": ["figma"] }

// FigJam only
{ "editorType": ["figjam"] }
```

## Options / Props

| Feature | Figma | FigJam |
|---------|-------|--------|
| Dark mode support | Yes | No (light only) |
| `useStickable` | No | Yes |
| `useStickableHost` | No | Yes |
| `colorMapToOptions` | No | Yes |
| `figma.constants.colors.*` | No | Yes |
| Plugin API scope | Design-file nodes | FigJam nodes |

## Notes

- Omit `editorType` to target both editors (same as specifying `["figma", "figjam"]`).
- FigJam-only APIs (`useStickable`, `useStickableHost`, `colorMapToOptions`) have no effect in Figma design files — guard calls with an editor check if building a cross-editor widget.
- The Plugin API objects and node types available differ per editor; test in both environments.
- Widgets that need Plugin API access require both `widgetApi` and `api` versions in the manifest.

## Related

- [manifest](./manifest.md)
- [useStickable](./useStickable.md)
- [useStickableHost](./useStickableHost.md)
- [colorMapToOptions](./colorMapToOptions.md)
