# Spacer

A flexible space that expands along the major axis of its containing stack layout, or on both axes if not in a stack.

## Signature / Usage

```swift
HStack {
    Text("Leading")
    Spacer()
    Text("Trailing")
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `minLength` | `CGFloat?` | Minimum length the spacer can shrink to. `nil` uses system default |

## Notes

- Available: iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Inside `HStack`, expands horizontally; inside `VStack`, expands vertically
- A stack containing a `Spacer` expands to fill all available space, unlike a stack without one
- Multiple `Spacer` instances distribute available space equally between them

## Related

- [Divider](./divider.md)
- [VStack](./vstack.md)
- [HStack](./hstack.md)
