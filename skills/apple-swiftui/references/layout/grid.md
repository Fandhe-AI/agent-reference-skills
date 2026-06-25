# Grid

A container view that arranges other views in a two-dimensional layout.

## Signature / Usage

```swift
Grid(alignment: .center, horizontalSpacing: 8, verticalSpacing: 8) {
    GridRow {
        Text("Name")
        Text("Score")
    }
    GridRow {
        Text("Alice")
        Text("100")
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `alignment` | `Alignment` | Default alignment for content in all grid cells. Default: `.center` |
| `horizontalSpacing` | `CGFloat?` | Spacing between columns. `nil` uses system default |
| `verticalSpacing` | `CGFloat?` | Spacing between rows. `nil` uses system default |
| `content` | `() -> Content` | ViewBuilder closure of `GridRow` instances and individual views |

## Notes

- Available: iOS 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS 1.0+
- Renders all rows eagerly; use `LazyVGrid` / `LazyHGrid` for large scrollable collections
- A non-`GridRow` view placed directly in the grid spans all columns
- Column width is determined by the widest cell in that column; row height by the tallest cell
- Cell modifiers: `.gridCellColumns(_:)`, `.gridCellAnchor(_:)`, `.gridCellUnsizedAxes(_:)`, `.gridColumnAlignment(_:)`

## Related

- [GridRow](./gridrow.md)
- [LazyVGrid](./lazyvgrid.md)
- [LazyHGrid](./lazyhgrid.md)
- [GridItem](./griditem.md)
