---
source: https://developer.apple.com/documentation/appintents/intentvalueconvertible
---

# IntentValueConvertible

A protocol that allows the system to use types to as app intent parameters or properties.

## Signature / Usage

```swift
protocol IntentValueConvertible : IntentValueExpressing
```

```swift
func makeContainer(context: IntentValueContainer.ConversionContext) -> IntentValueContainer
```

A type that conforms to `IntentValueConvertible` enables the App Intents framework to convert it to and from intent value containers. This protocol forms the foundation of the App Intents type conversion system, enabling seamless data exchange between your app and the AppIntents framework. To make a custom type usable in AppIntents, conform it to this protocol by implementing the required `makeContainer(context:)` method.

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `makeContainer(context:)` | `func makeContainer(context: IntentValueContainer.ConversionContext) -> IntentValueContainer` | Required. Creates an intent value container that represents this value. Has a default implementation. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Inherits from `IntentValueExpressing`, `Sendable`, `SendableMetatype`. Inherited by `IntentValueConvertibleWrapper`.
- Conforming types listed on the page: `IntentCurrencyAmount`, `IntentFile`, `IntentPaymentMethod`, `IntentPerson`, `StringSearchCriteria`, `SystemShortcut`.

## Related

- [IntentValueExpressing](./intentvalueexpressing.md)
- [IntentValueConvertibleWrapper](./intentvalueconvertiblewrapper.md)
- [IntentValueContainer](./intentvaluecontainer.md)
