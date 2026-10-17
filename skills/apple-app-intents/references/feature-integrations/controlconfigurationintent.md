---
source: https://developer.apple.com/documentation/appintents/controlconfigurationintent
---

# ControlConfigurationIntent

An interface for configuring a Control Center module.

## Signature / Usage

```swift
protocol ControlConfigurationIntent : AppIntent
```

```swift
struct SelectFocusIntent: ControlConfigurationIntent {
    static let title: LocalizedStringResource = "Select Focus"
    static let description: IntentDescription = "Turn Focus on to silence notifications and filter out distractions."

    struct FocusOptionsProvider: DynamicOptionsProvider {
        func results() async throws -> [Focus] {
            FocusManager.shared.allFocuses
        }
    }

    @Parameter(title: "Focus", default: .doNotDisturb, optionsProvider: FocusOptionsProvider())
    var focus: Focus
}
```

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 26.0+, watchOS 26.0+
- The parameters of the intent define all of the configuration options for the control.
- No `perform()` implementation is required. You can still implement `perform()` to share one implementation between control configuration and an actionable intent.
- The example provides a default value for the `focus` parameter, so a non-optional value can be used. Without a default value, the parameter's value must be optional, so the system can preview the control before someone configures it.
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`. Associated type: `NeverResult`.
- Scope: this page covers the intent protocol only. WidgetKit-side `ControlWidget` and `StaticControlConfiguration` are covered by the apple-app-services skill (widgetkit category).
- Source retrieved 2026-10-16 (DocC JSON, SDK 27.0).

## Related

- [WidgetConfigurationIntent](./widgetconfigurationintent.md)
- [LiveActivityIntent](./liveactivityintent.md)
- DynamicOptionsProvider
