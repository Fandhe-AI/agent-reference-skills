# LazyHStack

A view that arranges its children in a line that grows horizontally, creating items only as needed.

## Signature / Usage

```swift
ScrollView(.horizontal) {
    LazyHStack(spacing: 10) {
        ForEach(items) { item in
            ItemView(item)
        }
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `alignment` | `VerticalAlignment` | Vertical alignment of child views. Default: `.center` |
| `spacing` | `CGFloat?` | Distance between child views. `nil` uses system default |
| `pinnedViews` | `PinnedScrollableViews` | Views to pin to scroll view bounds (e.g., `.sectionHeaders`) |
| `content` | `() -> Content` | ViewBuilder closure producing child views |

## Notes

- Available: iOS 14.0+, macOS 11.0+, tvOS 14.0+, watchOS 7.0+, visionOS 1.0+
- Items are created only when SwiftUI needs to render them; ideal for large horizontal collections
- Must be used inside a `ScrollView(.horizontal)` to benefit from lazy rendering

## Related

- [HStack](./hstack.md)
- [LazyVStack](./lazyvstack.md)
- [ScrollView](./scrollview.md)
