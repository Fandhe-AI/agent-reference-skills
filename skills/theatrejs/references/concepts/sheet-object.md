# Sheet Object

Represents everything that is animated in Theatre.js — a Three.js mesh, a DOM element, or a purely virtual entity. Each object holds typed props whose values are driven by the Sequence timeline.

## Signature / Usage

```javascript
import { types } from '@theatre/core'

// Create an object with typed props
const obj = sheet.object('Box', {
  position: { x: 0, y: 0, z: 0 },
  opacity: types.number(1, { range: [0, 1] }),
})

// Subscribe to value changes and apply them to your scene
obj.onValuesChange((values) => {
  mesh.position.set(values.position.x, values.position.y, values.position.z)
  mesh.material.opacity = values.opacity
})
```

## Notes

- Calling `sheet.object()` with an existing key returns the same instance (idempotent)
- **Namespacing**: use `/` in the key (e.g. `'Scene / Boxes / box-1'`) to organise objects into collapsible groups in the Studio Outline Panel
- **Reconfiguration** (v0.5.1+): pass `{ reconfigure: true }` as the third argument to add or remove props without a page reload
- **Detachment** (v0.5.1+): call `obj.detach()` to remove the object while preserving its stored prop values; recreating with the same key restores them
- Props without an explicit `types.*` wrapper default to the type inferred from their initial value

## Related

- [Sheet](./sheet.md)
- [Sequence](./sequence.md)
- [Prop Types](./prop-types.md)
