# Text

A view that displays one or more lines of read-only text.

## Signature / Usage

```swift
@frozen struct Text
```

```swift
Text("Hello, world!")
Text("Updated: \(date, style: .date)")
Text(verbatim: "No localization")
```

## Options / Props

| Initializer | Description |
|---|---|
| `init(_:)` | Display a localized string key or attributed string |
| `init(verbatim:)` | Display a string literal without localization |
| `init(_:style:)` | Display a date/time with a `Text.DateStyle` |
| `init(_:format:)` | Display a value using a `FormatStyle` |
| `init(_:formatter:)` | Display a value using a Foundation `Formatter` |
| `init(timerInterval:pauseTime:countsDown:showsHours:)` | Display a live countdown/countup timer |

### Key modifiers

| Modifier | Description |
|---|---|
| `font(_:)` | Set the default font |
| `fontWeight(_:)` | Set font weight |
| `bold()` / `italic()` | Apply bold or italic treatment |
| `foregroundStyle(_:)` | Set text color or style |
| `lineLimit(_:)` | Constrain the number of lines |
| `truncationMode(_:)` | Set truncation behavior (`.head`, `.middle`, `.tail`) |
| `minimumScaleFactor(_:)` | Allow text to scale down to fit |
| `strikethrough(_:color:)` / `underline(_:color:)` | Decorations |
| `kerning(_:)` / `tracking(_:)` | Adjust character spacing |

## Notes

- Available on iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+.
- `Text` views are concatenated with `+` to combine different styles in one line.
- Localized string keys are looked up in `Localizable.strings` by default; pass `bundle:` and `tableName:` to override.

## Related

- [Label](./label.md)
- [TextField](./textfield.md)
- [TextEditor](./texteditor.md)
