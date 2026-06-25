# GridRow

A horizontal row in a two-dimensional grid container.

## Signature / Usage

```swift
Grid {
    GridRow(alignment: .top) {
        Text("Label")
        Text("Value")
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `alignment` | `VerticalAlignment?` | Vertical alignment override for cells in this row. `nil` uses the `Grid`'s default |
| `content` | `() -> Content` | ViewBuilder closure producing the row's cell views |

## Notes

- Available: iOS 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS 1.0+
- Each child view in the closure defines one cell; use `ForEach` to produce multiple cells
- To create an empty cell, use `Color.clear` rather than `EmptyView` (which produces no cell)
- View modifiers applied to a `GridRow` affect each cell individually, not the row as a whole

## Related

- [Grid](./grid.md)
