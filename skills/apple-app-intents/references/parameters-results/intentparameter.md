---
source: https://developer.apple.com/documentation/appintents/intentparameter
---

# IntentParameter

A property wrapper that indicates the associated property is an input argument of the app intent.

## Signature / Usage

```swift
@propertyWrapper final class IntentParameter<Value> where Value : _IntentValue, Value : Sendable
```

When you implement an `AppIntent` type, declare its parameters using the `@Parameter` property wrapper.

Methods for asking the person for input while the intent runs (as declared on the member pages):

```swift
final func requestValue(_ dialog: IntentDialog? = nil) async throws -> Value.ValueType

final func requestConfirmation(for itemToConfirm: Value.ValueType, dialog: IntentDialog? = nil) async throws -> Bool

final func requestDisambiguation(among itemsToDisambiguate: [Value.ValueType], dialog: IntentDialog? = nil) async throws -> Value.ValueType
```

## Options / Props

Topics listed on the page.

| Name | Description |
|------|-------------|
| Creating an intent parameter for primitive types | `IntentParameter-Int`, `IntentParameter-Double`, `IntentParameter-Boolean`, `IntentParameter-String`, `IntentParameter-URL` (configure the details for parameter variables that contain the given primitive values) |
| Creating an intent parameter for custom types | `IntentParameter-App-Entity`, `IntentParameter-App-Enum` (parameter variables that contain custom app entities / app enums) |
| Other parameter kinds | Parameter configuration pages for currency, date, date components, floating-point, files, integers, measurements (temperature, mass, speed, energy, duration, length, volume), payment-related values, people, geographic location, strings or attributed strings, URLs |
| Requesting a value | `requestValue(_:)`, `needsValueError(_:)` |
| Requesting confirmation | `requestConfirmation(for:dialog:)`, `requestConfirmation(for:dialog:view:)` (two overloads) |
| Requesting disambiguation | `requestDisambiguation(among:dialog:)`, `needsDisambiguationError(among:dialog:)` |
| Deprecated | `IntentParameter-Deprecated` ("Review unsupported symbols and their replacements") |
| Instance Properties | `defaultUnit`, `type`, `unit`, `value` |
| Enumerations | `IntentParameter.AppUnionValueComponent` ("The components of a union value parameter available for use in parameter summaries"), `IntentParameter.DurationUnit` |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+. The source data carries no `introducedAt` for visionOS.
- Conforms to `AnyIntentValue` (plus the Swift `Copyable`, `Escapable`, `Sendable`, `SendableMetatype` protocols).
- `requestValue(_:)` returns "The value supplied by the user". `requestConfirmation` returns "Whether or not the user confirmed the value". `needsValueError(_:)` is described as returning a `restartPerform` error with context to request a value from the user for this parameter and re-perform the intent with the new value.
- Members listed above are available when `Value` conforms to `_IntentValue` and `Sendable`.

## Related

- [IntentDialog](./intentdialog.md)
- [IntentParameterDependency](./intentparameterdependency.md)
- [IntentParameterContext](./intentparametercontext.md)
- [InputConnectionBehavior](./inputconnectionbehavior.md)
- [DynamicOptionsProvider](./dynamicoptionsprovider.md)
- [AppIntent](../intents/appintent.md)
