# Alignment

An alignment in both axes, combining a `HorizontalAlignment` and a `VerticalAlignment`.

## Signature / Usage

```swift
ZStack(alignment: .bottomLeading) {
    Rectangle().fill(Color.gray)
    Text("Pinned")
}
```

## Options / Props

### Initializer

```swift
Alignment(horizontal: HorizontalAlignment, vertical: VerticalAlignment)
```

### Built-in values

| Value | Description |
|-------|-------------|
| `.topLeading` | Top edge, leading edge |
| `.top` | Top edge, horizontal center |
| `.topTrailing` | Top edge, trailing edge |
| `.leading` | Vertical center, leading edge |
| `.center` | Vertical and horizontal center |
| `.trailing` | Vertical center, trailing edge |
| `.bottomLeading` | Bottom edge, leading edge |
| `.bottom` | Bottom edge, horizontal center |
| `.bottomTrailing` | Bottom edge, trailing edge |
| `.leadingFirstTextBaseline` | Leading, top-most text baseline |
| `.centerFirstTextBaseline` | Center, top-most text baseline |
| `.trailingFirstTextBaseline` | Trailing, top-most text baseline |
| `.leadingLastTextBaseline` | Leading, bottom-most text baseline |
| `.centerLastTextBaseline` | Center, bottom-most text baseline |
| `.trailingLastTextBaseline` | Trailing, bottom-most text baseline |

## Notes

- Available: iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- "Leading" and "trailing" are layout-direction-aware: leading is left in LTR, right in RTL

## Related

- [HorizontalAlignment](./horizontalalignment.md)
- [VerticalAlignment](./verticalalignment.md)
- [ZStack](./zstack.md)
