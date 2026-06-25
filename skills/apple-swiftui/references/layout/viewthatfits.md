# ViewThatFits

A view that adapts to the available space by providing the first child view that fits.

## Signature / Usage

```swift
ViewThatFits(in: .horizontal) {
    HStack { Text("Full Label"); ProgressView() }
    ProgressView()
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `in` | `Axis.Set` | Axes to constrain when evaluating fit. Default: `[.horizontal, .vertical]` |
| `content` | `() -> Content` | ViewBuilder closure listing candidate views in preference order |

## Notes

- Available: iOS 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS 1.0+
- Evaluates candidates in order; selects the first whose ideal size fits the proposed size
- Provide views largest-to-smallest for typical responsive behavior
- Only one candidate view is rendered; the others are discarded

## Related

- [GeometryReader](./geometryreader.md)
- [HStack](./hstack.md)
- [VStack](./vstack.md)
