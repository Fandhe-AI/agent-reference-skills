# shadow

Adds a drop shadow behind a view.

## Signature / Usage

```swift
nonisolated func shadow(
    color: Color = Color(.sRGBLinear, white: 0, opacity: 0.33),
    radius: CGFloat,
    x: CGFloat = 0,
    y: CGFloat = 0
) -> some View
```

```swift
RoundedRectangle(cornerRadius: 12)
    .fill(.white)
    .shadow(color: .black.opacity(0.2), radius: 8, x: 0, y: 4)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `Color` | semi-transparent black (33% opacity) | The shadow color. |
| `radius` | `CGFloat` | — | Blur radius. `0` produces a sharp shadow; larger values produce softer shadows. |
| `x` | `CGFloat` | `0` | Horizontal offset in points. Positive shifts right. |
| `y` | `CGFloat` | `0` | Vertical offset in points. Positive shifts down. |

## Notes

Available on iOS 13.0+ / macOS 10.15+. The shadow is drawn behind the view using the view's composite alpha; clipping the view also clips its shadow. For inner shadows, use a custom `overlay` with a blend mode instead.

## Related

- [opacity.md](./opacity.md)
- [clip-shape.md](./clip-shape.md)
- [background.md](./background.md)
