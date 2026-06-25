# UITextField

A control that displays an editable single-line text area and presents the on-screen keyboard for user input.

## Signature / Usage

```swift
@MainActor
class UITextField : UIControl

let field = UITextField(frame: .zero)
field.placeholder = "Enter email"
field.borderStyle = .roundedRect
field.keyboardType = .emailAddress
field.returnKeyType = .done
field.delegate = self
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `text` | `String?` | Current plain text value |
| `attributedText` | `NSAttributedString?` | Styled text value |
| `placeholder` | `String?` | Gray hint text shown when empty |
| `attributedPlaceholder` | `NSAttributedString?` | Styled placeholder |
| `font` | `UIFont?` | Text font |
| `textColor` | `UIColor?` | Text color |
| `textAlignment` | `NSTextAlignment` | Horizontal alignment |
| `borderStyle` | `UITextField.BorderStyle` | Visual border (`.none`, `.line`, `.bezel`, `.roundedRect`) |
| `isEditing` | `Bool` | Read-only; `true` while user is editing |
| `isSecureTextEntry` | `Bool` | Masks characters for passwords |
| `keyboardType` | `UIKeyboardType` | Keyboard layout variant |
| `returnKeyType` | `UIReturnKeyType` | Label on the Return key |
| `autocapitalizationType` | `UITextAutocapitalizationType` | Automatic capitalization behavior |
| `clearsOnBeginEditing` | `Bool` | Clears existing text when editing starts |
| `adjustsFontSizeToFitWidth` | `Bool` | Shrinks font to fit text |
| `minimumFontSize` | `CGFloat` | Minimum font size when shrinking |
| `clearButtonMode` | `UITextField.ViewMode` | When the clear button appears |
| `leftView` / `rightView` | `UIView?` | Overlay views at each end |
| `leftViewMode` / `rightViewMode` | `UITextField.ViewMode` | When overlays appear |
| `delegate` | `UITextFieldDelegate?` | Receives editing lifecycle callbacks |

**Key delegate methods (`UITextFieldDelegate`):**

| Method | Description |
|--------|-------------|
| `textFieldShouldReturn(_:)` | Called when Return is tapped; dismiss keyboard here |
| `textField(_:shouldChangeCharactersIn:replacementString:)` | Validate/filter input character-by-character |
| `textFieldDidBeginEditing(_:)` | Editing started |
| `textFieldDidEndEditing(_:)` | Editing ended |

## Notes

- Available iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+.
- Subscribe to `keyboardWillShowNotification` / `keyboardWillHideNotification` to scroll content above the keyboard.
- Call `resignFirstResponder()` inside `textFieldShouldReturn(_:)` to dismiss the keyboard.

## Related

- [UILabel](./uilabel.md)
- [UITextView](./uitextview.md)
- [UIControl](./uicontrol.md)
