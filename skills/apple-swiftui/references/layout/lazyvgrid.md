# LazyVGrid

A container view that arranges its child views in a grid that grows vertically, creating items only as needed.

## Signature / Usage

```swift
let columns = [GridItem(.adaptive(minimum: 80))]

ScrollView {
    LazyVGrid(columns: columns, spacing: 12) {
        ForEach(items) { item in
            ItemView(item)
        }
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `columns` | `[GridItem]` | Array of `GridItem` definitions describing column count and sizing |
| `alignment` | `HorizontalAlignment` | Horizontal alignment of the grid content. Default: `.center` |
| `spacing` | `CGFloat?` | Vertical spacing between rows. `nil` uses system default |
| `pinnedViews` | `PinnedScrollableViews` | Views to pin to scroll view bounds |
| `content` | `() -> Content` | ViewBuilder closure producing child views |

## Notes

- Available: iOS 14.0+, macOS 11.0+, tvOS 14.0+, watchOS 7.0+, visionOS 1.0+
- Items fill leading-to-trailing, then wrap to the next row
- Use inside a `ScrollView` for vertical scrolling; items are created lazily as they become visible
- For small, fixed datasets with precise alignment control, prefer `Grid`

## Related

- [GridItem](./griditem.md)
- [LazyHGrid](./lazyhgrid.md)
- [Grid](./grid.md)
- [ScrollView](./scrollview.md)
