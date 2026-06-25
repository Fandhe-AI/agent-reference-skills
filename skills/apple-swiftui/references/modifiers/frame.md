# frame

Positions a view within an invisible frame with fixed or flexible size constraints.

## Signature / Usage

```swift
// Fixed size
nonisolated func frame(
    width: CGFloat? = nil,
    height: CGFloat? = nil,
    alignment: Alignment = .center
) -> some View

// Flexible size with min/ideal/max constraints
nonisolated func frame(
    minWidth: CGFloat? = nil,
    idealWidth: CGFloat? = nil,
    maxWidth: CGFloat? = nil,
    minHeight: CGFloat? = nil,
    idealHeight: CGFloat? = nil,
    maxHeight: CGFloat? = nil,
    alignment: Alignment = .center
) -> some View
```

```swift
// Fixed size example
Ellipse()
    .fill(.purple)
    .frame(width: 200, height: 100)

// Expand to fill available width
Text("Full width")
    .frame(maxWidth: .infinity, alignment: .leading)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `CGFloat?` | `nil` | Fixed width. `nil` keeps the view's natural sizing. |
| `height` | `CGFloat?` | `nil` | Fixed height. `nil` keeps the view's natural sizing. |
| `minWidth` | `CGFloat?` | `nil` | Minimum width constraint. |
| `idealWidth` | `CGFloat?` | `nil` | Ideal (preferred) width. |
| `maxWidth` | `CGFloat?` | `nil` | Maximum width. Pass `.infinity` to expand fully. |
| `minHeight` | `CGFloat?` | `nil` | Minimum height constraint. |
| `idealHeight` | `CGFloat?` | `nil` | Ideal (preferred) height. |
| `maxHeight` | `CGFloat?` | `nil` | Maximum height. Pass `.infinity` to expand fully. |
| `alignment` | `Alignment` | `.center` | Alignment of view content inside the frame. |

## Notes

Available on iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+. When both min and max are specified, the frame clamps to those bounds. Always specify at least one parameter in the flexible overload.

## Related

- [padding.md](./padding.md)
- [offset-position.md](./offset-position.md)
