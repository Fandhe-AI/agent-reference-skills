# LazyHGrid

A container view that arranges its child views in a grid that grows horizontally, creating items only as needed.

## Signature / Usage

```swift
let rows = [GridItem(.fixed(60)), GridItem(.fixed(60))]

ScrollView(.horizontal) {
    LazyHGrid(rows: rows, spacing: 8) {
        ForEach(items) { item in
            ItemView(item)
        }
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `rows` | `[GridItem]` | Array of `GridItem` definitions describing row count and sizing |
| `alignment` | `VerticalAlignment` | Vertical alignment of items within the grid. Default: `.center` |
| `spacing` | `CGFloat?` | Horizontal spacing between columns. `nil` uses system default |
| `pinnedViews` | `PinnedScrollableViews` | Views to pin to scroll view bounds |
| `content` | `() -> Content` | ViewBuilder closure producing child views |

## Notes

- Available: iOS 14.0+, macOS 11.0+, tvOS 14.0+, watchOS 7.0+, visionOS 1.0+
- Items fill top-to-bottom within each column, then expand to the next column horizontally
- Use inside a `ScrollView(.horizontal)` for horizontal scrolling

## Related

- [GridItem](./griditem.md)
- [LazyVGrid](./lazyvgrid.md)
- [ScrollView](./scrollview.md)
