# UITextView

A scrollable, multiline region that displays and optionally edits rich or plain text.

## Signature / Usage

```swift
@MainActor
class UITextView : UIScrollView

let textView = UITextView(frame: .zero, textContainer: nil)
textView.font = UIFont.systemFont(ofSize: 16)
textView.textColor = .label
textView.isEditable = true
textView.delegate = self
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `text` | `String!` | Plain text content |
| `attributedText` | `NSAttributedString!` | Styled rich text content |
| `font` | `UIFont?` | Text font |
| `textColor` | `UIColor?` | Text color |
| `textAlignment` | `NSTextAlignment` | Horizontal alignment |
| `typingAttributes` | `[NSAttributedString.Key: Any]` | Attributes applied to newly typed text |
| `isEditable` | `Bool` | Allows user editing when `true` |
| `isSelectable` | `Bool` | Allows text selection when `true` |
| `selectedRange` | `NSRange` | Current selection (deprecated; prefer `selectedRanges`) |
| `selectedRanges` | `[NSRange]` | Supports multiple discontiguous selections |
| `textContainer` | `NSTextContainer` | Region where text is displayed |
| `textContainerInset` | `UIEdgeInsets` | Inset of the text container from the view edges |
| `textStorage` | `NSTextStorage` | Backing text storage object |
| `layoutManager` | `NSLayoutManager` | Lays out text in the container |
| `dataDetectorTypes` | `UIDataDetectorTypes` | Automatically linkifies phone numbers, URLs, etc. |
| `allowsEditingTextAttributes` | `Bool` | Lets users apply bold/italic from the editing menu |
| `inputView` | `UIView?` | Custom input view shown instead of keyboard |
| `inputAccessoryView` | `UIView?` | Accessory view above the keyboard |
| `isFindInteractionEnabled` | `Bool` | Enables built-in Find/Replace (iOS 16+) |
| `delegate` | `UITextViewDelegate?` | Editing lifecycle callbacks |

## Notes

- Available iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+.
- Call `resignFirstResponder()` to dismiss the keyboard.
- Register for `keyboardWillShowNotification` / `keyboardWillHideNotification` to adjust scroll insets.
- Set `restorationIdentifier` to preserve selection and editing state across launches.

## Related

- [UILabel](./uilabel.md)
- [UITextField](./uitextfield.md)
- [UIScrollView](./uiscrollview.md)
