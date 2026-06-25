# padding

Adds space around a view's content on specified edges.

## Signature / Usage

```swift
// Equal padding on all edges (platform-default amount)
nonisolated func padding(_ edges: Edge.Set = .all, _ length: CGFloat? = nil) -> some View

// Specific amounts per edge
nonisolated func padding(_ insets: EdgeInsets) -> some View

// Uniform amount on all edges
nonisolated func padding(_ length: CGFloat) -> some View
```

```swift
Text("Hello")
    .padding()                            // default padding on all edges
    .padding(.horizontal, 20)             // 20 pt on leading and trailing
    .padding(EdgeInsets(top: 10, leading: 20, bottom: 40, trailing: 0))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `edges` | `Edge.Set` | `.all` | The edges to add padding to (`.top`, `.bottom`, `.leading`, `.trailing`, `.horizontal`, `.vertical`, `.all`). |
| `length` | `CGFloat?` | `nil` | Amount in points. `nil` uses a platform-specific default. |
| `insets` | `EdgeInsets` | — | Per-edge amounts (top, leading, bottom, trailing). |

## Notes

Available on iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+. Apply `padding` before `border` if you want the border to encompass the padded area.

## Related

- [frame.md](./frame.md)
- [border-tint.md](./border-tint.md)
