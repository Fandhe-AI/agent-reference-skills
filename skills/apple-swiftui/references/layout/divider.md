# Divider

A visual element that separates content.

## Signature / Usage

```swift
VStack {
    Text("Section A")
    Divider()
    Text("Section B")
}
```

## Notes

- Available: iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- In a `VStack`, the divider extends horizontally across the stack's width
- In an `HStack`, the divider extends vertically along the stack's height
- Outside a stack, defaults to a horizontal line

## Related

- [Spacer](./spacer.md)
- [VStack](./vstack.md)
- [HStack](./hstack.md)
