# Prop Types

Type definitions for Sheet Object props. Types control how Studio renders editing tools and how Theatre.js interpolates keyframe values. Import from `@theatre/core`.

## Signature / Usage

```javascript
import { types } from '@theatre/core'

const obj = sheet.object('My Object', {
  // Shorthand (infers number type)
  x: 0,
  // Explicit number with options
  speed: types.number(1, { range: [0, 10] }),
  // Color
  color: types.rgba({ r: 1, g: 0, b: 0, a: 1 }),
  // Grouped props
  rotation: types.compound({ x: 0, y: 0, z: 0 }),
  // Enum menu
  mode: types.stringLiteral('low', { low: 'Low', high: 'High' }),
  // Image asset
  texture: types.image('', { label: 'Texture' }),
})
```

## Available Types

| Type | Description |
|------|-------------|
| `types.number(default, opts?)` | Numeric value; `opts.range`, `opts.nudgeMultiplier`, `opts.nudgeFn` |
| `types.boolean(default, opts?)` | Boolean toggle; `opts.label` for UI label override |
| `types.string(default, opts?)` | Free-form string; `opts.label` |
| `types.stringLiteral(default, labels, opts?)` | Predefined string options rendered as menu or radio; `opts.as: 'switch'` for toggle |
| `types.compound(props, opts?)` | Groups related props; shown as expandable section in Details Panel |
| `types.rgba(default?)` | Color value stored as `{r, g, b, a}`; accepts `#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA` |
| `types.image(default, opts?)` | Image asset reference; empty string or `undefined` means no asset assigned |

## Notes

- Explicit type declarations unlock Studio's specialized editors and correct keyframe interpolation
- `types.compound` does not itself animate; its child props animate individually
- `types.stringLiteral` does not interpolate between values (stepped transitions only)
- `types.image` integrates with the Assets system; use `project.getAssetUrl(value)` to resolve URLs
- Shorthand defaults (e.g., `x: 0`) are treated as `types.number` automatically

## Related

- [Sheet Objects](./objects.md)
- [Assets](./assets.md)
- [Sequences](./sequences.md)
