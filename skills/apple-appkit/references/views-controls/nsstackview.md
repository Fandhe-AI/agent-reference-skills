# NSStackView

A view that arranges an array of views horizontally or vertically and updates their placement and sizing when the window size changes.

## Signature / Usage

```swift
class NSStackView : NSView
```

```swift
// Horizontal stack
let stack = NSStackView(views: [label, button, imageView])
stack.orientation = .horizontal
stack.alignment = .centerY
stack.spacing = 8
stack.distribution = .fill
stack.edgeInsets = NSEdgeInsets(top: 8, left: 12, bottom: 8, right: 12)

// Add or remove views dynamically
stack.addArrangedSubview(newView)
stack.removeArrangedSubview(oldView)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `orientation` | `NSUserInterfaceLayoutOrientation` | `.horizontal` or `.vertical` layout direction |
| `alignment` | `NSLayoutConstraint.Attribute` | Cross-axis alignment of arranged views |
| `spacing` | `CGFloat` | Minimum spacing between adjacent views |
| `distribution` | `NSStackView.Distribution` | Sizing and spacing distribution along the primary axis |
| `edgeInsets` | `NSEdgeInsets` | Padding inside the stack view surrounding its views |
| `arrangedSubviews` | `[NSView]` | Views managed by Auto Layout in the stack |
| `views` | `[NSView]` | All views owned by the stack view |
| `detachesHiddenViews` | `Bool` | Whether hidden views are removed from the view hierarchy |

## Notes

- Platform: macOS 10.9+.
- `addArrangedSubview(_:)` / `insertArrangedSubview(_:at:)` / `removeArrangedSubview(_:)` manage the arranged subviews.
- `setCustomSpacing(_:after:)` sets custom spacing after a specific view.
- `setVisibilityPriority(_:for:)` controls which views detach first when space is tight.
- Gravity-area API (`addView(_:in:)`, `setViews(_:in:)`) supports leading/center/trailing gravity buckets.

## Related

- [NSView](./nsview.md)
- [NSScrollView](./nsscrollview.md)
