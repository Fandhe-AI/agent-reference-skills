# Sheet Objects

Animatable elements within a Sheet. Can represent THREE.js objects, HTML elements, or any virtual entity. Each object holds typed props whose values Theatre.js animates over time.

## Signature / Usage

```javascript
// Create a sheet object with props
const obj = sheet.object('My Object', {
  position: { x: 0, y: 0 },
})

// Read current values
obj.onValuesChange((values) => {
  mesh.position.x = values.position.x
})

// Namespaced keys for Studio organization
sheet.object('Basics / Boxes / box-0', { x: 0 })
sheet.object('Basics / Boxes / box-1', { x: 0 })
```

## Options / Props

`sheet.object(key, props, options?)`:

| Name | Type | Description |
|------|------|-------------|
| `key` | `string` | Unique name; use `/` separators for namespace grouping |
| `props` | `object` | Map of prop names to default values or typed definitions |
| `options.reconfigure` | `boolean` | (v0.5.1+) Replace props on an existing object without page refresh |

## Notes

- Calling `sheet.object()` with an existing key returns the same instance
- With `reconfigure: true`, the same reference is returned but old props are removed; `obj.value.oldProp` becomes `undefined`
- Use `sheet.detachObject(key)` (v0.5.1+) to remove an object while preserving its stored values — recreating with the same key restores them
- Forward-slash namespacing (`'Group / Sub / item'`) creates indented hierarchy in the Studio Outline Panel

## Related

- [Sheets](./sheets.md)
- [Prop Types](./prop-types.md)
- [Sequences](./sequences.md)
