# NSGlassEffectContainerView

A view that efficiently merges descendant glass effect views together when they are within a specified proximity to each other.

## Signature / Usage

```swift
class NSGlassEffectContainerView : NSView
```

```swift
var contentView: NSView? { get set }
var spacing: CGFloat { get set }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `contentView` | `NSView?` | The view that contains descendant views to merge together when in proximity to each other. |
| `spacing` | `CGFloat` | The proximity at which the glass effect container view begins merging eligible descendent glass effect views. |

## Notes

- Platform: macOS 26.0+.
- Tip (from the docs): using a glass effect container view can improve performance by reducing the number of passes required to render similar glass effect views.
- Eligible descendants are `NSGlassEffectView` instances.

## Related

- [NSGlassEffectView](./nsglasseffectview.md)
- [NSView](./nsview.md)
