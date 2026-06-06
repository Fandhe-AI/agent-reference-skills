# AutoLayout

A Frame with automatic layout pre-applied. The most common root/container component in widgets — children are arranged by the layout engine rather than manual `x`/`y` coordinates.

## Signature / Usage

```tsx
<AutoLayout
  direction="vertical"
  spacing={8}
  padding={16}
  horizontalAlignItems="center"
  fill="#ffffff"
  cornerRadius={8}
  onClick={() => setCount(c => c + 1)}
>
  <Text>Count: {count}</Text>
</AutoLayout>
```

## Options / Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `"horizontal" \| "vertical"` | `"horizontal"` | Child stacking direction |
| `spacing` | `number \| "auto"` | — | Gap between children; `"auto"` = space-between |
| `padding` | `number \| { top?, bottom?, left?, right? }` | — | Inner padding |
| `horizontalAlignItems` | `HorizontalAlign` | — | Horizontal child alignment |
| `verticalAlignItems` | `VerticalAlign \| "baseline"` | — | Vertical child alignment |
| `width` | `Size` | `"hug-contents"` | Frame width; supports `"hug-contents"`, `"fill-parent"`, number |
| `height` | `Size` | `"hug-contents"` | Frame height |
| `minWidth` / `maxWidth` | `number` | — | Size constraints |
| `minHeight` / `maxHeight` | `number` | — | Size constraints |
| `fill` | `HexCode \| Color \| Paint[]` | — | Background fill |
| `stroke` | `Paint \| Paint[]` | — | Border stroke |
| `strokeWidth` | `number` | — | Stroke thickness |
| `strokeAlign` | `"inside" \| "center" \| "outside"` | — | Stroke alignment |
| `cornerRadius` | `number \| CornerRadius` | `0` | Rounded corners; per-corner object also accepted |
| `opacity` | `number` | `1` | Opacity (0–1) |
| `blendMode` | `BlendMode` | — | Blend mode |
| `effect` | `Effect \| Effect[]` | — | Shadow/blur effects |
| `overflow` | `"visible" \| "hidden" \| "scroll"` | `"hidden"` | Child clipping |
| `wrap` | `boolean` | — | Wrap children when overflowing (horizontal only) |
| `positioning` | `"auto" \| "absolute"` | `"auto"` | When `"absolute"`, use `x`/`y` instead of layout |
| `onClick` | `(e: WidgetClickEvent) => void \| Promise<void>` | — | Click handler |
| `hoverStyle` | `HoverStyle` | — | Style applied on hover |
| `tooltip` | `string` | — | Tooltip text |
| `hidden` | `boolean` | — | Hide the element |
| `name` | `string` | — | Layer name for debugging |

## Notes

- `spacing="auto"` distributes remaining space between children (like CSS `justify-content: space-between`).
- Children with `positioning="absolute"` are removed from the layout flow and positioned with explicit `x`/`y`.
- `overflow="scroll"` renders a scrollable region on the canvas.

## Related

- [Frame](./Frame.md)
- [overview](./overview.md)
