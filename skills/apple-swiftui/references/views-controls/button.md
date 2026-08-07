# Button

A control that initiates an action.

## Signature / Usage

```swift
nonisolated struct Button<Label> where Label : View
```

```swift
Button("Sign In") { signIn() }

Button("Delete", role: .destructive) { delete() }

Button("Add", systemImage: "plus") { add() }

Button {
    performAction()
} label: {
    Label("Confirm", systemImage: "checkmark")
}
```

## Options / Props

| Initializer | Description |
|---|---|
| `init(_:action:)` | Title string key + closure |
| `init(action:label:)` | Custom label view builder + closure |
| `init(_:systemImage:action:)` | Title + SF Symbol + closure |
| `init(_:image:action:)` | Title + image resource + closure |
| `init(role:action:label:)` | With `ButtonRole` (`.destructive`, `.cancel`) |
| `init(_:role:action:)` | Title + role + closure |
| `init(intent:label:)` | Triggers an `AppIntent` |

### Key modifiers

| Modifier | Description |
|---|---|
| `buttonStyle(_:)` | `.automatic`, `.bordered`, `.borderedProminent`, `.borderless`, `.plain`, `.glass` (`GlassButtonStyle`), `.glassProminent` (`GlassProminentButtonStyle`) |
| `buttonBorderShape(_:)` | Shape of the border (`.capsule`, `.roundedRectangle`, etc.) |
| `buttonRepeatBehavior(_:)` | Whether the action repeats on long press |
| `buttonSizing(_:)` | `.fitted` or `.flexible` |
| `controlSize(_:)` | `.mini`, `.small`, `.regular`, `.large`, `.extraLarge` |

## Notes

- Available on iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+.
- Use `ButtonRole.destructive` for irreversible actions; the system applies a red tint automatically.
- `buttonStyle(.borderedProminent)` produces the filled, primary-action style common in iOS.
- `buttonStyle(.glass)` / `.glassProminent` apply the Liquid Glass material (translucent, blur + specular highlight) introduced at WWDC25; available iOS 26.0+, iPadOS 26.0+, macOS 26.0+, tvOS 26.0+, watchOS 26.0+, visionOS 26.0+. Combine with `glassEffect(_:in:)` / `GlassEffectContainer` on custom views for the same material outside of `Button`.

## Related

- [Label](./label.md)
- [Menu](./menu.md)
- [Toggle](./toggle.md)
