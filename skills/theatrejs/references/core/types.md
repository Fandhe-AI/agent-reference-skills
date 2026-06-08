# types

Prop type constructors for `@theatre/core`. Used when defining typed props on a Sheet Object via `sheet.object()`.

## Signature / Usage

```ts
import { types } from '@theatre/core'

const obj = sheet.object('Box', {
  position: types.compound({
    x: types.number(0, { range: [-10, 10] }),
    y: types.number(0, { range: [-10, 10] }),
  }),
  color: types.rgba({ r: 1, g: 0, b: 0, a: 1 }),
  label: types.string('Hello'),
  visible: types.boolean(true),
  blendMode: types.stringLiteral('normal', {
    normal: 'Normal',
    multiply: 'Multiply',
  }),
})
```

## Options / Props

### `types.number(default, opts?)`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `default` | `number` | — | Initial value |
| `opts.range` | `[number, number]` | none | Clamp range shown in Studio UI |
| `opts.nudgeMultiplier` | `number` | `1` | Multiplier for arrow-key nudging in Studio |
| `opts.label` | `string` | — | Display label in Studio |

### `types.compound(props, opts?)`

Groups multiple props into a nested object.

| Name | Type | Description |
| --- | --- | --- |
| `props` | `Record<string, PropType>` | Child prop definitions |
| `opts.label` | `string` | Display label in Studio |

### `types.rgba(default?)`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `default` | `{ r, g, b, a }` | `{ r:0, g:0, b:0, a:1 }` | Initial color; all channels are 0–1 normalized |

Also accepts CSS hex strings: `#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`.

### `types.boolean(default, opts?)`

| Name | Type | Description |
| --- | --- | --- |
| `default` | `boolean` | Initial value |
| `opts.label` | `string` | Display label in Studio |

### `types.string(default, opts?)`

| Name | Type | Description |
| --- | --- | --- |
| `default` | `string` | Initial value |
| `opts.label` | `string` | Display label in Studio |

### `types.stringLiteral(default, choices, opts?)`

Renders as a radio group or dropdown in Studio.

| Name | Type | Description |
| --- | --- | --- |
| `default` | `string` | Initial choice key |
| `choices` | `Record<string, string>` | Map of value → display label |
| `opts.as` | `'menu' \| 'switch'` | UI style (default: `'menu'`) |

### `types.image(default, opts?)` (v0.6.0+)

Asset handle prop for images. `default` is typically an empty string `''`.

### `types.file(default, opts?)` (v0.7.0+)

Asset handle prop for arbitrary files. `default` is typically an empty string `''`.

## Notes

- Plain object literals in `sheet.object()` config are automatically treated as `types.compound`; explicit `types.compound` is needed only when passing `opts`
- `types.rgba` channels are normalized 0–1, not 0–255
- Asset types (`image`, `file`) return an asset handle string; use `project.getAssetUrl(handle)` to resolve to a URL

## Related

- [Object](./object.md)
- [Project](./project.md)
