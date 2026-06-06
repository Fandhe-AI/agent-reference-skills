# SVG

Renders an SVG graphic inline within a widget by accepting a raw SVG string.

## Signature / Usage

```tsx
<SVG
  src={`<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="12" fill="#4285f4"/>
  </svg>`}
  width={32}
  height={32}
/>
```

## Options / Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `src` | `string` | Yes | Raw SVG markup string (must start with `<svg .../>`) |
| `width` | `Size` | — | Width override |
| `height` | `Size` | — | Height override |
| `fill` | `HexCode \| Color \| Paint[]` | — | Fill overlay |
| `stroke` | `Paint \| Paint[]` | — | Stroke paint |
| `strokeWidth` | `number` | — | Stroke thickness |
| `strokeAlign` | `"inside" \| "center" \| "outside"` | — | Stroke alignment |
| `strokeDashPattern` | `number[]` | — | Dash/gap pattern |
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

- The `src` string must be a valid SVG element — it is embedded directly in the canvas, not fetched from a URL.
- Store SVG strings as constants in your widget source to avoid them being re-evaluated on every render.

## Related

- [Image](./Image.md)
- [Rectangle](./Rectangle.md)
