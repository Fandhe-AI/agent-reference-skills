# NSScrollView

A view that displays a portion of a document view and provides scroll bars to let the user move the document view within the scroll view's bounds.

## Signature / Usage

```swift
class NSScrollView : NSView
```

```swift
// Wrap a content view in a scroll view
let scrollView = NSScrollView(frame: containerFrame)
scrollView.hasVerticalScroller = true
scrollView.hasHorizontalScroller = false
scrollView.autohidesScrollers = true

let contentView = MyContentView(frame: NSRect(x: 0, y: 0, width: 1000, height: 2000))
scrollView.documentView = contentView
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `documentView` | `NSView?` | The view being scrolled inside the content view |
| `contentView` | `NSClipView` | The clip view that clips the document view |
| `hasVerticalScroller` | `Bool` | Whether a vertical scroll bar is shown |
| `hasHorizontalScroller` | `Bool` | Whether a horizontal scroll bar is shown |
| `scrollerStyle` | `NSScroller.Style` | Overlay or legacy scroller appearance |
| `autohidesScrollers` | `Bool` | Hide scrollers automatically when not needed |
| `verticalScroller` | `NSScroller?` | The vertical scroller object |
| `horizontalScroller` | `NSScroller?` | The horizontal scroller object |

## Notes

- Platform: macOS.
- `tile()` lays out component views (content view, scrollers, ruler views); called automatically on resize.
- `flashScrollers()` briefly shows overlay scroll bars.
- `magnify(toFit:)` and `setMagnification(_:centeredAt:)` support zoom behavior.
- `NSTextView` is typically embedded inside `NSScrollView`.

## Related

- [NSView](./nsview.md)
- [NSTextView](./nstextview.md)
- [NSStackView](./nsstackview.md)
