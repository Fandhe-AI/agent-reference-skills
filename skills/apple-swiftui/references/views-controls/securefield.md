# SecureField

A control into which people securely enter private text.

## Signature / Usage

```swift
nonisolated struct SecureField<Label> where Label : View
```

```swift
@State private var password = ""

SecureField("Password", text: $password)
    .textFieldStyle(.roundedBorder)
```

## Options / Props

| Initializer | Description |
|---|---|
| `init(_:text:)` | Title string key + `Binding<String>` |
| `init(_:text:prompt:)` | Title string key + binding + explicit prompt `Text` |
| `init(text:prompt:label:)` | Custom label view builder + prompt |

## Notes

- Available on iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+.
- Each character is displayed as a dot; dots are hidden in screenshots on iOS.
- Cut and Copy are disabled; the Caps Lock indicator is shown when active.
- Accepts the same text-related modifiers as `TextField` (e.g., `onSubmit`, `focused`).

## Related

- [TextField](./textfield.md)
- [Form](./form.md)
