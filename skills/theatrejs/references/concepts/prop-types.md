# Prop Types

Typed descriptors for Sheet Object properties. Explicit types unlock specialised Studio editing widgets (sliders, colour pickers, dropdowns) and correct keyframe interpolation behaviour.

## Signature / Usage

```javascript
import { types } from '@theatre/core'

const obj = sheet.object('Torus Knot', {
  // Compound groups related scalar props
  rotation: types.compound({
    x: types.number(0, { range: [-2, 2] }),
    y: types.number(0, { range: [-2, 2] }),
    z: types.number(0, { range: [-2, 2] }),
  }),
  color: types.rgba({ r: 1, g: 0.5, b: 0.2, a: 1 }),
  label: types.string('Hello'),
  visible: types.boolean(true),
  blendMode: types.stringLiteral('normal', {
    normal: 'Normal',
    multiply: 'Multiply',
    screen: 'Screen',
  }),
})
```

## Options / Props

| Type | Initial value | Notable options | Studio widget |
|------|--------------|-----------------|---------------|
| `types.number(value, opts?)` | `number` | `range: [min, max]`, `nudgeMultiplier` | Slider |
| `types.compound(props)` | object literal | — | Collapsible group |
| `types.boolean(value)` | `boolean` | `true`/`false` labels | Toggle |
| `types.string(value)` | `string` | — | Text input |
| `types.stringLiteral(value, options)` | `string` | `{ value: label }` map, `as: 'menu' \| 'switch'` | Dropdown / radio |
| `types.rgba(value)` | `{ r, g, b, a }` | — | Colour picker |
| `types.image(value?)` | asset handle | — | Asset picker |

## Notes

- Props without an explicit `types.*` wrapper are typed by inference from their initial value (number → `types.number`, boolean → `types.boolean`, etc.)
- `types.compound()` nests props into a collapsible group in the Details Panel; compound props are sequenced as a unit
- `types.rgba()` accepts shorthand hex strings (`#RGB`, `#RRGGBB`, `#RRGGBBAA`) in the Studio UI
- `types.image()` returns an asset handle; call `project.getAssetUrl(handle)` to get a usable URL

## Related

- [Sheet Object](./sheet-object.md)
- [Sequence](./sequence.md)
