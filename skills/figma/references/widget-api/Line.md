# Line

A straight line element with configurable length, stroke, and endpoint caps.

## Signature / Usage

```tsx
<Line
  length={100}
  stroke="#cccccc"
  strokeWidth={1}
  rotation={45}
/>
```

## Options / Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `length` | `number` | `100` | Length of the line in pixels |
| `stroke` | `HexCode \| Color \| SolidPaint \| GradientPaint \| (SolidPaint \| GradientPaint)[]` | `"#000000"` | Stroke color or paint |
| `strokeWidth` | `number` | `1` | Line thickness in pixels |
| `strokeCap` | `StrokeCap` | — | Endpoint decoration (e.g., `"none"`, `"arrow"`, `"round"`) |
| `x` | `number` | `0` | Horizontal position |
| `y` | `number` | `0` | Vertical position |
| `rotation` | `number` | — | Degrees (−180 to 180) |
| `opacity` | `number` | `1` | Opacity |
| `blendMode` | `BlendMode` | `"pass-through"` | Blend mode |
| `effect` | `Effect \| Effect[]` | — | Shadow/blur effects |
| `onClick` | `(e: WidgetClickEvent) => void \| Promise<void>` | — | Click handler |
| `hoverStyle` | `HoverStyle` | — | Style on hover |
| `tooltip` | `string` | — | Tooltip text |
| `hidden` | `boolean` | — | Visibility toggle |
| `positioning` | `"auto" \| "absolute"` | — | Layout positioning in AutoLayout parent |
| `name` | `string` | — | Layer name for debugging |

## Related

- [Rectangle](./Rectangle.md)
- [AutoLayout](./AutoLayout.md)
