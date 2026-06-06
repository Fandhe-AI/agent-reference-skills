# Image

A rectangle with an image fill. Accepts a URL string or `ImagePaint` as its source.

## Signature / Usage

```tsx
<Image
  src="https://example.com/photo.png"
  width={120}
  height={80}
  cornerRadius={4}
/>
```

## Options / Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `src` | `string \| ImagePaint` | Yes | Image URL, data URI, or `ImagePaint` object |
| `width` | `Size` | Yes | Width |
| `height` | `Size` | Yes | Height |
| `cornerRadius` | `number \| CornerRadius` | — | Rounded corners (default `0`) |
| `fill` | `HexCode \| Color \| Paint[]` | — | Additional fill layer over the image |
| `stroke` | `Paint \| Paint[]` | — | Stroke paint |
| `strokeWidth` | `number` | — | Stroke thickness (default `1`) |
| `strokeAlign` | `"inside" \| "center" \| "outside"` | — | Stroke alignment |
| `strokeDashPattern` | `number[]` | — | Dash/gap pattern |
| `x` | `number \| HorizontalConstraint` | — | Horizontal position |
| `y` | `number \| VerticalConstraint` | — | Vertical position |
| `rotation` | `number` | — | Degrees (−180 to 180, default `0`) |
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

- `Image` is syntactic sugar for `Rectangle` with an image fill — it exposes `src` instead of `fill`.
- Data URIs (`data:image/...`) are supported.
- Network images require the domain to be allowed in `manifest.json` `networkAccess.allowedDomains`.

## Related

- [Rectangle](./Rectangle.md)
- [SVG](./SVG.md)
- [manifest](./manifest.md)
