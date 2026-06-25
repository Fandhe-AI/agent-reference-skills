# VStack

A view that arranges its subviews in a vertical line.

## Signature / Usage

```swift
VStack(alignment: HorizontalAlignment = .center, spacing: CGFloat? = nil) {
    Text("First")
    Text("Second")
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `alignment` | `HorizontalAlignment` | Horizontal alignment of subviews. Default: `.center` |
| `spacing` | `CGFloat?` | Distance between subviews. `nil` uses system default |
| `content` | `() -> Content` | ViewBuilder closure producing child views |

## Notes

- Available: iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Renders all subviews eagerly; prefer `LazyVStack` for large collections in a `ScrollView`
- For conditional/animated layout switching, use `VStackLayout` (conforms to `Layout`)

## Related

- [LazyVStack](./lazyvstack.md)
- [HStack](./hstack.md)
- [ZStack](./zstack.md)
