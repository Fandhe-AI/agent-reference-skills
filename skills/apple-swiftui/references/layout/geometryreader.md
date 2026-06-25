# GeometryReader

A container view that defines its content as a function of its own size and coordinate space.

## Signature / Usage

```swift
GeometryReader { proxy in
    Circle()
        .frame(width: proxy.size.width * 0.5)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `content` | `(GeometryProxy) -> Content` | Closure receiving a `GeometryProxy` and returning the view |

### `GeometryProxy` key members

| Member | Type | Description |
|--------|------|-------------|
| `size` | `CGSize` | The size of the container |
| `safeAreaInsets` | `EdgeInsets` | Safe area insets of the container |
| `frame(in:)` | `(CoordinateSpace) -> CGRect` | Frame of the container in the given coordinate space |

## Notes

- Available: iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Returns a flexible preferred size to its parent; it expands to fill all offered space
- Use sparingly — prefer layout primitives and `ViewThatFits` when possible, as `GeometryReader` can cause layout cycles if misused

## Related

- [ViewThatFits](./viewthatfits.md)
- [EdgeInsets](./edgeinsets.md)
