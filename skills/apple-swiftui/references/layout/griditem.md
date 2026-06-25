# GridItem

A description of a row or a column in a lazy grid.

## Signature / Usage

```swift
let columns = [
    GridItem(.fixed(80)),
    GridItem(.flexible()),
    GridItem(.adaptive(minimum: 60))
]

LazyVGrid(columns: columns) { ... }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `GridItem.Size` | Sizing mode for the column (in `LazyVGrid`) or row (in `LazyHGrid`) |
| `spacing` | `CGFloat?` | Spacing to the next item |
| `alignment` | `Alignment?` | Alignment for each view placed in this item |

### `GridItem.Size` cases

| Case | Description |
|------|-------------|
| `.fixed(CGFloat)` | Exact fixed size |
| `.flexible(minimum:maximum:)` | Fills available space within min/max bounds |
| `.adaptive(minimum:maximum:)` | Fits as many items as possible at the minimum size |

## Notes

- Available: iOS 14.0+, macOS 11.0+, tvOS 14.0+, watchOS 7.0+, visionOS 1.0+
- In `LazyVGrid`, a `GridItem` array defines **columns**; in `LazyHGrid` it defines **rows**
- `.adaptive` is the most flexible: SwiftUI places as many items as fit the available space

## Related

- [LazyVGrid](./lazyvgrid.md)
- [LazyHGrid](./lazyhgrid.md)
