# HorizontalAlignment

An alignment position along the horizontal axis.

## Signature / Usage

```swift
VStack(alignment: .leading) {
    Text("First")
    Text("Second")
}
```

## Options / Props

### Built-in values

| Value | Description |
|-------|-------------|
| `.leading` | Leading edge (left in LTR, right in RTL) |
| `.center` | Horizontal center |
| `.trailing` | Trailing edge (right in LTR, left in RTL) |
| `.listRowSeparatorLeading` | Leading edge of a `List` row separator |
| `.listRowSeparatorTrailing` | Trailing edge of a `List` row separator |

### Custom alignment guide

```swift
private struct OneQuarterAlignment: AlignmentID {
    static func defaultValue(in context: ViewDimensions) -> CGFloat {
        context.width / 4
    }
}

extension HorizontalAlignment {
    static let oneQuarter = HorizontalAlignment(OneQuarterAlignment.self)
}
```

## Notes

- Available: iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Automatically reverses `.leading` / `.trailing` for right-to-left environments
- Used as the `alignment` parameter of `VStack`, `LazyVStack`, `LazyVGrid`, and `Grid`

## Related

- [Alignment](./alignment.md)
- [VerticalAlignment](./verticalalignment.md)
- [VStack](./vstack.md)
