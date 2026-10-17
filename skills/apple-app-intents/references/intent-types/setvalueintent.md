---
source: https://developer.apple.com/documentation/appintents/setvalueintent
---

# SetValueIntent

An intent that contains a value which can be set.

## Signature / Usage

```swift
protocol SetValueIntent<ValueType> : AppIntent
```

```swift
struct ToggleSilentMode: SetValueIntent {
   static var title = LocalizedStringResource("Silent Mode")

   @Parameter(title: "Silent")
   var value: Bool
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `ValueType` | `associatedtype ValueType : _IntentValue` | Type of the value to set (no abstract on the page). |
| `value` | `var value: Self.ValueType` | The value to set (no abstract on the page). |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`. Unlike `OpenIntent` and `DeleteIntent`, it does not inherit from `SystemIntent`.
- The declaration in the source is rendered as `SetValueIntent<ValueType>` with `ValueType` as the associated type.
- For SwiftUI `Toggle(isOn:intent:)` / `Button(intent:)` usage, see apple-swiftui; this page covers only the intent protocol.

## Related

- [OpenIntent](./openintent.md)
- [DeleteIntent](./deleteintent.md)
- [DeprecatedAppIntent](./deprecatedappintent.md)
