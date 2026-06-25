# clipShape

Clips the view to a shape, hiding content outside the shape's boundary.

## Signature / Usage

```swift
nonisolated func clipShape<S>(_ shape: S, style: FillStyle = FillStyle()) -> some View
    where S : Shape
```

```swift
// Clip to a circle
Image("photo")
    .clipShape(Circle())

// Clip to a rounded rectangle (replaces deprecated .cornerRadius)
Text("Badge")
    .padding()
    .background(.blue)
    .clipShape(RoundedRectangle(cornerRadius: 12))

// Clip to a custom shape
Path { path in ... }
    .clipShape(Capsule())
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `shape` | `Shape` | — | The clipping shape. Common values: `Circle()`, `Capsule()`, `RoundedRectangle(cornerRadius:)`, `Rectangle()`, `Ellipse()`. |
| `style` | `FillStyle` | `FillStyle()` | Controls the antialiasing and fill rule used when rasterizing the shape. |

## Notes

Available on iOS 13.0+ / macOS 10.15+. The clipping shape itself is invisible; only the content inside the shape's bounds is rendered. `clipShape(RoundedRectangle(cornerRadius: r))` is the preferred replacement for the deprecated `.cornerRadius(r)` modifier. Use `clipped()` to clip to the view's rectangular bounding frame without a custom shape.

## Related

- [background.md](./background.md)
- [overlay.md](./overlay.md)
- [shadow.md](./shadow.md)
