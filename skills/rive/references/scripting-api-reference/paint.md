# Paint / PaintDefinition

`Paint` controls how a shape is rendered: fill/stroke styling, color or gradient, stroke thickness/join/cap, feathering, and blend mode. Applied via `renderer:drawPath(path, paint)`.

## Signature / Usage

```lua
self.paint = Paint.with({
  color = Color.rgb(255, 100, 50),
  style = 'fill',
  blendMode = 'multiply',
})

local outline = self.paint:copy({ style = 'stroke', thickness = 4, join = 'round', cap = 'round' })
```

## Options / Props

| Member | Type | Description |
| --- | --- | --- |
| `Paint.new() -> Paint` | constructor | Default-initialized Paint |
| `Paint.with(values: PaintDefinition) -> Paint` | constructor | Paint initialized from a `PaintDefinition` table |
| `copy(values: PaintDefinition?) -> Paint` | method | Copies this Paint, optionally overriding given fields |
| `style` | [PaintStyle](#options--props) | `'fill'` or `'stroke'` |
| `join` | [StrokeJoin](#options--props) | Corner join behavior for strokes |
| `cap` | [StrokeCap](#options--props) | Line-end cap behavior for strokes |
| `thickness` | number | Stroke width |
| `blendMode` | [BlendMode](./artboard-events.md) (see paint-enums below) | Compositing mode |
| `feather` | number | Edge feathering/softening amount |
| `gradient` | `Gradient?` | Optional gradient applied to the fill; set `false` in a `PaintDefinition` to remove |
| `color` | `Color` | Paint color |

### PaintStyle

| Value | Description |
| --- | --- |
| `stroke` | Paints the shape outline |
| `fill` | Paints the shape interior |

### StrokeCap

| Value | Description |
| --- | --- |
| `butt` | Squared, no extension |
| `round` | Semicircular cap |
| `square` | Squared, extends past the end point |

### StrokeJoin

| Value | Description |
| --- | --- |
| `miter` | Sharp corner |
| `round` | Rounded corner |
| `bevel` | Flattened corner |

### BlendMode

`srcOver`, `screen`, `overlay`, `darken`, `lighten`, `colorDodge`, `colorBurn`, `hardLight`, `softLight`, `difference`, `exclusion`, `multiply`, `hue`, `saturation`, `color`, `luminosity` — defines how the paint composites with content behind it.

## Related

- [color.md](./color.md)
- [gradient.md](./gradient.md)
- [path.md](./path.md)
- [renderer.md](./renderer.md)
