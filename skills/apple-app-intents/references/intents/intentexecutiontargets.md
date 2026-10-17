---
source: https://developer.apple.com/documentation/appintents/intentexecutiontargets
---

# IntentExecutionTargets

A set of options that describes which process performs an intent or entity query.

## Signature / Usage

```swift
struct IntentExecutionTargets
```

```swift
struct MyIntent: AppIntent {
    static var allowedExecutionTargets: IntentExecutionTargets { [.main, .appIntentsExtension] }
}
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `appIntentsExtension` | `static var appIntentsExtension: IntentExecutionTargets` | The system performs the intent or query in your app intents extension. |
| `default` | ``static var `default`: IntentExecutionTargets`` | The system performs the intent or query in any available target. |
| `main` | `static var main: IntentExecutionTargets` | The system performs the intent or query in the main app process. |
| `widgetKitExtension` | `static var widgetKitExtension: IntentExecutionTargets` | The system performs the intent or query in a widget extension. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Relevant when intents and entities are shared between your app, widget extension, or App Intents extension through a Swift package or framework. By default the system uses any available target.
- Example from the page: adding a bookmark can happen while the app is not visible (App Intents extension is fine), whereas opening a new tab requires the app's process.
- Used by `AppIntent.allowedExecutionTargets` (typealias `AppIntent.ExecutionTargets`) and applies to `EntityQuery` as well.
- Conforms to `Equatable`, `ExpressibleByArrayLiteral`, `Hashable`, `OptionSet`, `RawRepresentable`, `Sendable`, `SendableMetatype`, `SetAlgebra`.

## Related

- [AppIntent](./appintent.md)
- [AppIntentsExtension](./appintentsextension.md)
- [AppIntentsPackage](./appintentspackage.md)
