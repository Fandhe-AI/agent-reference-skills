# ScrollView

A scrollable view that allows users to scroll through its content.

## Signature / Usage

```swift
ScrollView {
    VStack(alignment: .leading) {
        ForEach(0..<100) { i in
            Text("Row \(i)")
        }
    }
}

// Horizontal scrolling
ScrollView(.horizontal) {
    HStack { ... }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `axes` | `Axis.Set` | Scrollable axes. Default: `.vertical` |
| `content` | `() -> Content` | ViewBuilder closure producing the scrollable content |

## Notes

- Available: iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Does not provide zoom functionality; for zooming, use `UIScrollView` via `UIViewRepresentable`
- Use `.defaultScrollAnchor(_:)` to control the initial scroll position
- Wrap with `ScrollViewReader` for programmatic scrolling via `ScrollViewProxy.scrollTo(_:anchor:)`
- Pair with `LazyVStack` / `LazyHStack` / `LazyVGrid` / `LazyHGrid` for performant large-list rendering
- The deprecated `showsIndicators:` parameter is replaced by the `.scrollIndicators(_:)` modifier

## Related

- [LazyVStack](./lazyvstack.md)
- [LazyHStack](./lazyhstack.md)
- [LazyVGrid](./lazyvgrid.md)
- [LazyHGrid](./lazyhgrid.md)
