# Ellipse

A circle or ellipse shape. Supports arc configuration for partial arcs (pie/donut segments).

## Signature / Usage

```tsx
<Ellipse
  width={64}
  height={64}
  fill="#34a853"
  arcData={{ startingAngle: 0, endingAngle: Math.PI, innerRadius: 0.5 }}
/>
```

## Options / Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `width` | `Size` | Yes | Width |
| `height` | `Size` | Yes | Height |
| `arcData` | `ArcData` | — | Arc configuration for partial ellipses |
| `fill` | `HexCode \| Color \| Paint[]` | — | Fill color or paint |
| `stroke` | `Paint \| Paint[]` | — | Stroke paint |
| `strokeWidth` | `number` | — | Stroke thickness (default `1`) |
| `strokeAlign` | `"inside" \| "center" \| "outside"` | — | Stroke alignment (default `"inside"`) |
| `strokeDashPattern` | `number[]` | — | Alternating dash/gap lengths |
| `x` | `number \| HorizontalConstraint` | — | Horizontal position |
| `y` | `number \| VerticalConstraint` | — | Vertical position |
| `rotation` | `number` | — | Degrees (−180 to 180) |
| `minWidth` / `maxWidth` | `number` | — | Size constraints |
| `minHeight` / `maxHeight` | `number` | — | Size constraints |
| `opacity` | `number` | — | Opacity (default `1`) |
| `blendMode` | `BlendMode` | — | Blend mode |
| `effect` | `Effect \| Effect[]` | — | Shadow/blur effects |
| `onClick` | `(e: WidgetClickEvent) => void \| Promise<void>` | — | Click handler |
| `hoverStyle` | `HoverStyle` | — | Style on hover |
| `tooltip` | `string` | — | Tooltip text |
| `hidden` | `boolean` | — | Visibility toggle |
| `positioning` | `"auto" \| "absolute"` | — | Layout positioning in AutoLayout parent |
| `name` | `string` | — | Layer name for debugging |

`ArcData` fields:

| Field | Type | Description |
|-------|------|-------------|
| `startingAngle` | `number` | Start angle in radians |
| `endingAngle` | `number` | End angle in radians |
| `innerRadius` | `number` | Inner radius ratio (0–1); `0` = filled pie, `> 0` = donut |

## Related

- [Rectangle](./Rectangle.md)
- [Frame](./Frame.md)
