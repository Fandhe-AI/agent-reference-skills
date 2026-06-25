# LazyVStack

A view that arranges its children in a line that grows vertically, creating items only as needed.

## Signature / Usage

```swift
ScrollView {
    LazyVStack(alignment: .leading) {
        ForEach(items) { item in
            Text(item.name)
        }
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `alignment` | `HorizontalAlignment` | Horizontal alignment of child views. Default: `.center` |
| `spacing` | `CGFloat?` | Distance between child views. `nil` uses system default |
| `pinnedViews` | `PinnedScrollableViews` | Views to pin to scroll view bounds (e.g., `.sectionHeaders`) |
| `content` | `() -> Content` | ViewBuilder closure producing child views |

## Notes

- Available: iOS 14.0+, macOS 11.0+, tvOS 14.0+, watchOS 7.0+, visionOS 1.0+
- Items are created only when SwiftUI needs to render them; ideal for large collections
- Must be used inside a `ScrollView` to benefit from lazy rendering

## Related

- [VStack](./vstack.md)
- [LazyHStack](./lazyhstack.md)
- [ScrollView](./scrollview.md)
