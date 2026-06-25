# Form

A container for grouping controls used for data entry, such as in settings or inspectors.

## Signature / Usage

```swift
nonisolated struct Form<Content> where Content : View
```

```swift
Form {
    Section("Account") {
        TextField("Username", text: $username)
        SecureField("Password", text: $password)
    }
    Section("Preferences") {
        Toggle("Enable Notifications", isOn: $notificationsOn)
        Picker("Theme", selection: $theme) {
            Text("Light").tag(Theme.light)
            Text("Dark").tag(Theme.dark)
        }
        Stepper("Font Size: \(fontSize)", value: $fontSize, in: 10...24)
    }
}
.formStyle(.grouped)
```

## Options / Props

| Initializer | Description |
|---|---|
| `init(content:)` | Content view builder |
| `init(_:)` | Create from a `FormStyleConfiguration` (for custom styles) |

### Key modifiers

| Modifier | Description |
|---|---|
| `formStyle(_:)` | `.automatic`, `.grouped`, `.columns` |

## Notes

- Available on iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+.
- On iOS, `Form` renders as a grouped `List`; on macOS it renders as aligned vertical stacks.
- `.columns` style (macOS) aligns labels and controls in two columns automatically.
- Wrap groups of related controls in `Section` to add headers and visual separation.

## Related

- [Section](./section.md)
- [TextField](./textfield.md)
- [Toggle](./toggle.md)
- [Picker](./picker.md)
