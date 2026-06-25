# Layout

A protocol for creating custom layout containers that define how to size and position a collection of subviews.

## Signature / Usage

```swift
struct MyVStack: Layout {
    func sizeThatFits(
        proposal: ProposedViewSize,
        subviews: Subviews,
        cache: inout ()
    ) -> CGSize {
        // return total size
    }

    func placeSubviews(
        in bounds: CGRect,
        proposal: ProposedViewSize,
        subviews: Subviews,
        cache: inout ()
    ) {
        // position each subview
    }
}

// Usage
MyVStack {
    Text("A")
    Text("B")
}
```

## Options / Props

### Required methods

| Method | Description |
|--------|-------------|
| `sizeThatFits(proposal:subviews:cache:)` | Returns the size the layout container needs given the proposal |
| `placeSubviews(in:proposal:subviews:cache:)` | Assigns positions to subviews within the given bounds |

### Optional methods

| Method | Description |
|--------|-------------|
| `makeCache(subviews:)` | Creates a cache value to avoid redundant computation |
| `spacing(subviews:cache:)` | Preferred spacing around the container |
| `explicitAlignment(of:in:proposal:subviews:cache:)` | Exposes a custom alignment guide |
| `layoutProperties` | Declares orientation axis for stack-like layouts |

## Notes

- Available: iOS 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS 1.0+
- Conforming types can be used directly as view containers and also with `AnyLayout` for animated layout transitions
- Built-in conformers: `HStackLayout`, `VStackLayout`, `ZStackLayout`, `GridLayout`

## Related

- [HStack](./hstack.md)
- [VStack](./vstack.md)
- [ZStack](./zstack.md)
- [Grid](./grid.md)
