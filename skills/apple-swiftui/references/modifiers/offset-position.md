# offset / position

Shifts a view's rendered content (`offset`) or fixes its center in parent coordinates (`position`).

## Signature / Usage

```swift
// Offset — shifts rendered output, layout space unchanged
nonisolated func offset(_ offset: CGSize) -> some View
nonisolated func offset(x: CGFloat = 0, y: CGFloat = 0) -> some View

// Position — places center at an absolute point in parent
nonisolated func position(_ position: CGPoint) -> some View
nonisolated func position(x: CGFloat = 0, y: CGFloat = 0) -> some View
```

```swift
Text("Offset example")
    .border(.green)                      // shows original layout bounds
    .offset(x: 20, y: 25)               // shifts rendering, not layout

Text("Position example")
    .position(CGPoint(x: 175, y: 100))  // center fixed at (175, 100) in parent
```

## Options / Props

### `offset`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `offset` | `CGSize` | — | Horizontal (`width`) and vertical (`height`) displacement in points. |
| `x` | `CGFloat` | `0` | Horizontal displacement. |
| `y` | `CGFloat` | `0` | Vertical displacement. |

### `position`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `CGPoint` | — | The point in parent coordinates where the view's center is placed. |
| `x` | `CGFloat` | `0` | X coordinate of the center. |
| `y` | `CGFloat` | `0` | Y coordinate of the center. |

## Notes

Available on iOS 13.0+ / macOS 10.15+. `offset` does not affect layout — neighboring views see the original frame. `position` overrides SwiftUI's layout system and places the view at an absolute coordinate; use with care in complex hierarchies.

## Related

- [frame.md](./frame.md)
- [scale-rotation.md](./scale-rotation.md)
