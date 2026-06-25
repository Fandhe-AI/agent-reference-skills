# TextEditor

A view that can display and edit long-form text.

## Signature / Usage

```swift
nonisolated struct TextEditor
```

```swift
@State private var bio = ""

TextEditor(text: $bio)
    .font(.body)
    .lineSpacing(5)
    .frame(minHeight: 100)
```

## Options / Props

| Initializer | Description |
|---|---|
| `init(text:)` | Plain text editor bound to a `Binding<String>` |
| `init(text:selection:)` | Styled/attributed text editor with selection management |

### Key modifiers

| Modifier | Description |
|---|---|
| `font(_:)` | Font applied to the text |
| `foregroundColor(_:)` | Text color |
| `lineSpacing(_:)` | Space between lines |
| `scrollContentBackground(_:)` | Hide or show the default background |
| `findNavigator(isPresented:)` | Show the system find/replace bar |

## Notes

- Available on iOS 14.0+, macOS 11.0+, visionOS 1.0+. Not available on tvOS or watchOS.
- Displays multiline, scrollable text; height grows to fill its parent by default.
- Inherits `font`, `foregroundColor`, and `multilineTextAlignment` from the environment.
- `init(text:selection:)` enables attributed-text formatting and exposes system format controls in the context menu.

## Related

- [TextField](./textfield.md)
- [Text](./text.md)
