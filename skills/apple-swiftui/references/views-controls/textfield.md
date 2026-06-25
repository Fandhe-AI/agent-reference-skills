# TextField

A control that displays an editable text interface.

## Signature / Usage

```swift
nonisolated struct TextField<Label> where Label : View
```

```swift
@State private var username = ""

TextField("Username", text: $username)
    .textFieldStyle(.roundedBorder)
    .textInputAutocapitalization(.never)
    .disableAutocorrection(true)
```

## Options / Props

| Initializer | Description |
|---|---|
| `init(_:text:)` | Title string key + `Binding<String>` |
| `init(_:text:prompt:)` | With an explicit prompt `Text` |
| `init(text:prompt:label:)` | Custom label view builder |
| `init(_:text:axis:)` | Scrollable along `.horizontal` or `.vertical` axis |
| `init(_:value:format:prompt:)` | Non-string binding using a `FormatStyle` |
| `init(_:value:formatter:)` | Non-string binding using a Foundation `Formatter` |

### Key modifiers

| Modifier | Description |
|---|---|
| `textFieldStyle(_:)` | `.automatic`, `.plain`, `.roundedBorder` |
| `textInputAutocapitalization(_:)` | `.never`, `.words`, `.sentences`, `.characters` |
| `disableAutocorrection(_:)` | Disable autocorrect |
| `keyboardType(_:)` | `.default`, `.emailAddress`, `.numberPad`, etc. |
| `submitLabel(_:)` | Label on the return key: `.done`, `.go`, `.search`, etc. |
| `onSubmit(_:)` | Action when user commits (taps Return) |
| `focused(_:)` | Bind focus state via `@FocusState` |

## Notes

- Available on iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+.
- String bindings update continuously as the user types; non-string bindings update on commit only.
- Use `prompt:` to show placeholder text as a `Text` view (replaces the deprecated string-placeholder parameter).

## Related

- [SecureField](./securefield.md)
- [TextEditor](./texteditor.md)
- [Form](./form.md)
