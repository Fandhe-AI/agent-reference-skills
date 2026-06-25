# NSTextView

The front-end class of the AppKit text system. Displays and edits rich text, handling user events for selection and modification.

## Signature / Usage

```swift
class NSTextView : NSText
```

```swift
// Typically embedded in NSScrollView
let scrollView = NSScrollView(frame: frame)
let textView = NSTextView(frame: scrollView.contentView.bounds)
textView.autoresizingMask = [.width, .height]
textView.isEditable = true
textView.isRichText = false
textView.delegate = self
scrollView.documentView = textView
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `isEditable` | `Bool` | Whether users can edit text |
| `isSelectable` | `Bool` | Whether text can be selected |
| `isRichText` | `Bool` | Whether rich text (styled) is supported |
| `selectedRanges` | `[NSValue]` | Array of selected character ranges |
| `textContainer` | `NSTextContainer?` | Layout container for the text |
| `textStorage` | `NSTextStorage?` | The backing text storage object |
| `layoutManager` | `NSLayoutManager?` | Layout manager (accessing this triggers NSLayoutManager compatibility mode) |
| `backgroundColor` | `NSColor` | Background color of the text view |
| `drawsBackground` | `Bool` | Whether background is drawn |
| `insertionPointColor` | `NSColor` | Color of the insertion point cursor |
| `typingAttributes` | `[NSAttributedString.Key: Any]` | Attributes applied to newly typed text |
| `allowsUndo` | `Bool` | Whether undo is supported |
| `isContinuousSpellCheckingEnabled` | `Bool` | Whether spell checking is on |
| `isAutomaticTextCompletionEnabled` | `Bool` | Whether auto-completion is on |
| `delegate` | `NSTextViewDelegate?` | Delegate for editing and selection events |

## Notes

- Platform: macOS. For simple single-line input, prefer `NSTextField`.
- macOS 12+ uses `NSTextLayoutManager` (TextKit 2) by default; accessing `layoutManager` reverts to NSLayoutManager compatibility mode.
- `NSTextViewDelegate` provides callbacks for selection changes, attribute modification, spell checking, and drag-and-drop.

## Related

- [NSTextField](./nstextfield.md)
- [NSScrollView](./nsscrollview.md)
