# StaticControlConfiguration

The description of a control that has no user-configurable options.

## Signature / Usage

```swift
@MainActor @preconcurrency
struct StaticControlConfiguration<Content> where Content: ControlWidgetTemplate

// Without value provider:
init(kind: String, content: () -> Content)

// With value provider:
init<Provider>(kind: String, provider: Provider, content: (Provider.Value) -> Content)
where Provider: ControlValueProvider
```

```swift
struct GarageDoorOpener: ControlWidget {
    var body: some ControlWidgetConfiguration {
        StaticControlConfiguration(
            kind: "com.example.GarageDoorOpener",
            provider: GarageDoorValueProvider()
        ) { isOpen in
            ControlWidgetToggle(
                "Garage Door",
                isOn: isOpen,
                action: ToggleGarageDoor()
            ) {
                Label($0 ? "Open" : "Closed",
                      systemImage: $0 ? "door.garage.open" : "door.garage.closed")
            }
        }
    }
}
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `kind` | `String` | Unique identifier for the control; used with `ControlCenter` to reload |
| `provider` | `Provider: ControlValueProvider` | Provides `previewValue` and `currentValue()` for the template |
| `content` | `(Provider.Value) -> Content` | Closure returning a `ControlWidgetTemplate` (toggle or button) |

## Notes

- iOS 18.0+, iPadOS 18.0+, macOS 26.0+, watchOS 26.0+
- Conforms to `ControlWidgetConfiguration`, `Sendable`
- Use `AppIntentControlConfiguration` when the control needs user-configurable settings

## Related

- [ControlWidget](./controlwidget.md)
