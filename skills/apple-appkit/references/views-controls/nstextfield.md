# NSTextField

A control that displays text the user can select or edit, sending an action to a target when the user presses Return.

## Signature / Usage

```swift
class NSTextField : NSControl
```

```swift
// Static label
let label = NSTextField(labelWithString: "Hello, World!")

// Editable single-line field
let field = NSTextField(string: "")
field.placeholderString = "Enter text..."
field.delegate = self

// Wrapping label
let wrapped = NSTextField(wrappingLabelWithString: "Long description text...")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `isEditable` | `Bool` | Whether the user can edit content |
| `isSelectable` | `Bool` | Whether the user can select content |
| `textColor` | `NSColor?` | Color of the displayed text |
| `backgroundColor` | `NSColor?` | Background fill color |
| `drawsBackground` | `Bool` | Whether the background is drawn |
| `isBezeled` | `Bool` | Whether a bezeled border is drawn |
| `isBordered` | `Bool` | Whether a solid black border is drawn |
| `bezelStyle` | `NSTextField.BezelStyle` | Round or square bezel style |
| `placeholderString` | `String?` | Placeholder text shown when empty |
| `placeholderAttributedString` | `NSAttributedString?` | Styled placeholder text |
| `maximumNumberOfLines` | `Int` | Maximum number of lines (0 = unlimited) |
| `preferredMaxLayoutWidth` | `CGFloat` | Preferred maximum width for Auto Layout |
| `allowsEditingTextAttributes` | `Bool` | Allow font attribute changes by the user |
| `isAutomaticTextCompletionEnabled` | `Bool` | Enable system text completion |
| `allowsWritingTools` | `Bool` | Enable Writing Tools support (macOS 15.2+) |
| `allowsWritingToolsAffordance` | `Bool` | Writing Tools affordance (macOS 15.4+) |
| `suggestionsDelegate` | `(any NSTextSuggestionsDelegate)?` | Weak delegate that provides type-ahead text suggestions and responds to the user highlighting and selecting items (macOS 15.0+). Related types: `NSTextSuggestionsDelegate`, `NSSuggestionItem`, `NSSuggestionItemSection`, `NSSuggestionItemResponse` (all macOS 15.0+) |
| `borderShape` | `NSControl.BorderShape` | Border shape (macOS 26.0+) |
| `placeholderStrings` | `[String]` | Placeholder strings (macOS 26.0+) |
| `placeholderAttributedStrings` | `[NSAttributedString]` | Styled placeholder strings (macOS 26.0+) |
| `resolvesNaturalAlignmentWithBaseWritingDirection` | `Bool` | Controls how `natural` alignment is resolved to visual alignment (macOS 26.0+) |
| `delegate` | `NSTextFieldDelegate?` | Delegate for editing lifecycle events |

## Notes

- Platform: macOS (and Mac Catalyst for Objective-C variant).
- Convenience initializers: `init(labelWithString:)`, `init(string:)`, `init(wrappingLabelWithString:)`, `init(labelWithAttributedString:)`.
- `NSTextFieldDelegate` provides `textShouldBeginEditing(_:)`, `textDidBeginEditing(_:)`, `textDidChange(_:)`, `textShouldEndEditing(_:)`, `textDidEndEditing(_:)`.
- Accessing `layoutManager` on macOS 12+ reverts the field to NSLayoutManager compatibility mode; prefer TextKit 2 APIs.

## Related

- [NSControl](./nscontrol.md)
- [NSTextView](./nstextview.md)
- [NSComboBox](./nscombobox.md)
