# VerticalAlignment

An alignment position along the vertical axis.

## Signature / Usage

```swift
HStack(alignment: .firstTextBaseline) {
    Text("Label").font(.caption)
    Text("Value").font(.title)
}
```

## Options / Props

### Built-in values

| Value | Description |
|-------|-------------|
| `.top` | Top edge |
| `.center` | Vertical center |
| `.bottom` | Bottom edge |
| `.firstTextBaseline` | Top-most text baseline in a view |
| `.lastTextBaseline` | Bottom-most text baseline in a view |

### Custom alignment guide

```swift
private struct FirstThirdAlignment: AlignmentID {
    static func defaultValue(in context: ViewDimensions) -> CGFloat {
        context.height / 3
    }
}

extension VerticalAlignment {
    static let firstThird = VerticalAlignment(FirstThirdAlignment.self)
}
```

## Notes

- Available: iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Text baseline alignments exclude descenders, yielding better typographic alignment
- Used as the `alignment` parameter of `HStack`, `LazyHStack`, `LazyHGrid`, `GridRow`

## Related

- [Alignment](./alignment.md)
- [HorizontalAlignment](./horizontalalignment.md)
- [HStack](./hstack.md)
