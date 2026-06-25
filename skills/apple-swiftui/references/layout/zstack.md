# ZStack

A view that overlays its subviews, aligning them in both axes.

## Signature / Usage

```swift
ZStack(alignment: Alignment = .center) {
    Rectangle().fill(Color.gray)
    Text("Overlay")
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `alignment` | `Alignment` | 2D alignment for positioning subviews. Default: `.center` |
| `content` | `() -> Content` | ViewBuilder closure producing child views |

## Notes

- Available: iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Subviews are layered in declaration order; later views render on top (higher z-axis)
- For conditional/animated layout switching, use `ZStackLayout` (conforms to `Layout`)

## Related

- [Alignment](./alignment.md)
- [VStack](./vstack.md)
- [HStack](./hstack.md)
