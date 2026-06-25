# Toggle

A control that toggles between on and off states.

## Signature / Usage

```swift
nonisolated struct Toggle<Label> where Label : View
```

```swift
@State private var isOn = false

Toggle("Enable Notifications", isOn: $isOn)

Toggle(isOn: $isOn) {
    Label("Vibrate", systemImage: "iphone.radiowaves.left.and.right")
}
.toggleStyle(.switch)
```

## Options / Props

| Initializer | Description |
|---|---|
| `init(_:isOn:)` | Title string key + `Binding<Bool>` |
| `init(isOn:label:)` | `Binding<Bool>` + custom label view builder |
| `init(_:systemImage:isOn:)` | Title + SF Symbol + `Binding<Bool>` |
| `init(_:image:isOn:)` | Title + image resource + `Binding<Bool>` |
| `init(_:sources:isOn:)` | Multiple bindings from a collection |
| `init(isOn:intent:label:)` | Binding + `AppIntent` on change |

### Key modifiers

| Modifier | Description |
|---|---|
| `toggleStyle(_:)` | `.automatic`, `.switch`, `.button`, `.checkbox` (macOS) |

## Notes

- Available on iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+.
- The `.button` style renders the toggle as a pressable button that stays highlighted when on.
- Use the `sources:` initializer to reflect a mixed state when multiple items have differing values.

## Related

- [Button](./button.md)
- [Picker](./picker.md)
- [Form](./form.md)
