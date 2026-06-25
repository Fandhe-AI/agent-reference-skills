# HStack

A view that arranges its subviews in a horizontal line.

## Signature / Usage

```swift
HStack(alignment: VerticalAlignment = .center, spacing: CGFloat? = nil) {
    Image(systemName: "star")
    Text("Label")
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `alignment` | `VerticalAlignment` | Vertical alignment of subviews. Default: `.center` |
| `spacing` | `CGFloat?` | Distance between subviews. `nil` uses system default |
| `content` | `() -> Content` | ViewBuilder closure producing child views |

## Notes

- Available: iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Renders all subviews eagerly; prefer `LazyHStack` for large collections in a `ScrollView`
- For conditional/animated layout switching, use `HStackLayout` (conforms to `Layout`)

## Related

- [LazyHStack](./lazyhstack.md)
- [VStack](./vstack.md)
- [ZStack](./zstack.md)
