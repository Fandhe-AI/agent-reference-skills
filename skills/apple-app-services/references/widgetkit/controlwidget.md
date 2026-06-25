# ControlWidget

A protocol for defining a control — a button or toggle — that users can place in Control Center, on the Lock Screen, or on the Action button.

## Signature / Usage

```swift
protocol ControlWidget

var body: some ControlWidgetConfiguration { get }  // required
```

```swift
struct TimerToggle: ControlWidget {
    static let kind: String = "com.example.TimerToggle"

    var body: some ControlWidgetConfiguration {
        StaticControlConfiguration(
            kind: Self.kind,
            provider: Provider()
        ) { isRunning in
            ControlWidgetToggle(
                "Productivity Timer",
                isOn: isRunning,
                action: ToggleTimerIntent()
            ) { isOn in
                Label(isOn ? "Running" : "Stopped", systemImage: "timer")
            }
        }
        .displayName("Productivity Timer")
        .description("Start and stop a productivity timer.")
    }
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `body` | `some ControlWidgetConfiguration` | Returns the control's configuration (required) |

Configuration types:

| Type | Description |
|------|-------------|
| `StaticControlConfiguration` | Control with no user-configurable options |
| `AppIntentControlConfiguration` | Control with user-configurable App Intent options |

Template types for `content` closure:

| Type | Description |
|------|-------------|
| `ControlWidgetToggle` | A toggle that represents an on/off state |
| `ControlWidgetButton` | A button that performs an action |

## Notes

- iOS 18.0+, iPadOS 18.0+, macOS 26.0+, watchOS 26.0+
- Controls must be added to a `WidgetBundle` to be exposed to the system
- Actions are performed via App Intents (`SetValueIntent` for toggles, `AppIntent` for buttons)
- Current state is provided by a `ControlValueProvider` or `AppIntentControlValueProvider`
- Controls can be placed in Control Center, Lock Screen, Action button, and Apple Watch Smart Stack

## Related

- [StaticControlConfiguration](./staticcontrolconfiguration.md)
- [WidgetBundle](./widgetbundle.md)
