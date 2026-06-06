# Rectangle

A frame without children or auto layout. Used for decorative shapes and backgrounds.

## Signature / Usage

```tsx
<Rectangle
  width={80}
  height={40}
  fill="#4285f4"
  cornerRadius={8}
  stroke="#1a73e8"
  strokeWidth={2}
/>
```

## Options / Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `width` | `Size` | Yes | Width |
| `height` | `Size` | Yes | Height |
| `fill` | `HexCode \| Color \| Paint[]` | — | Fill color or paint |
| `stroke` | `Paint \| Paint[]` | — | Stroke color or paint |
| `strokeWidth` | `number` | — | Stroke thickness (default `1`) |
| `strokeAlign` | `"inside" \| "center" \| "outside"` | — | Stroke alignment (default `"inside"`) |
| `strokeDashPattern` | `number[]` | — | Alternating dash/gap lengths |
| `cornerRadius` | `number \| CornerRadius` | — | Rounded corners |
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

## Notes

- `cornerRadius` is clamped to half the shorter edge if the radius would exceed it.
- Has no children — use `Frame` or `AutoLayout` if you need child elements.

## Related

- [Frame](./Frame.md)
- [Ellipse](./Ellipse.md)
- [Image](./Image.md)
