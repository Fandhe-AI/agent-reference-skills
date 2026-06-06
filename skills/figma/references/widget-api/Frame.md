# Frame

A non-autolayout frame. Children are positioned using explicit `x` and `y` coordinates. Useful for absolute layouts or fixed-size containers.

## Signature / Usage

```tsx
<Frame width={200} height={100} fill="#efefef" cornerRadius={4}>
  <Text x={8} y={8}>Hello</Text>
</Frame>
```

## Options / Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `width` | `Size` | Yes | Frame width |
| `height` | `Size` | Yes | Frame height |
| `fill` | `HexCode \| Color \| Paint[]` | — | Background fill |
| `stroke` | `Paint \| Paint[]` | — | Border stroke |
| `strokeWidth` | `number` | — | Stroke thickness in pixels |
| `strokeAlign` | `"inside" \| "center" \| "outside"` | — | Stroke alignment |
| `strokeDashPattern` | `number[]` | — | Alternating dash/gap lengths |
| `cornerRadius` | `number \| CornerRadius` | — | Rounded corners |
| `overflow` | `"visible" \| "hidden" \| "scroll"` | — | Child clipping; default `"hidden"` |
| `x` | `number \| HorizontalConstraint` | — | Horizontal position |
| `y` | `number \| VerticalConstraint` | — | Vertical position |
| `minWidth` / `maxWidth` | `number` | — | Size constraints |
| `minHeight` / `maxHeight` | `number` | — | Size constraints |
| `rotation` | `number` | — | Degrees (−180 to 180) |
| `opacity` | `number` | — | Opacity (0–1) |
| `blendMode` | `BlendMode` | — | Blend mode |
| `effect` | `Effect \| Effect[]` | — | Shadow/blur effects |
| `onClick` | `(e: WidgetClickEvent) => void \| Promise<void>` | — | Click handler |
| `hoverStyle` | `HoverStyle` | — | Style on hover |
| `tooltip` | `string` | — | Tooltip text |
| `hidden` | `boolean` | — | Visibility toggle |
| `positioning` | `"auto" \| "absolute"` | — | Layout positioning in AutoLayout parent |
| `name` | `string` | — | Layer name for debugging |

## Notes

- Unlike `AutoLayout`, children must have explicit `x` and `y` props for positioning.
- Default `overflow` is `"hidden"` — contents outside the frame bounds are clipped.

## Related

- [AutoLayout](./AutoLayout.md)
- [Rectangle](./Rectangle.md)
