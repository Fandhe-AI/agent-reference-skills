---
source: https://developer.apple.com/documentation/appintents/intentvaluecontainer
---

# IntentValueContainer

A container that stores a value that supports intent value conversion.

## Signature / Usage

```swift
struct IntentValueContainer
```

```swift
static func == (IntentValueContainer, IntentValueContainer) -> Bool
```

The `IntentValueContainer` structure provides a type-erased wrapper around values that the App Intents framework can use. It encapsulates the actual value as a container element and provides mechanisms for type-safe access and conversion. This container serves as an intermediate representation when converting between different types.

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `ConversionContext` | `struct ConversionContext` | A context that provides additional information for value conversion. |
| `==(_:_:)` | `static func == (IntentValueContainer, IntentValueContainer) -> Bool` | Returns a Boolean value indicating whether two containers are equal. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Conforms to `Copyable`, `Equatable`, `Escapable`, `IntentValueExpressing`, `Sendable`, `SendableMetatype`.
- Listed under "Intent queries" together with `IntentValueQuery` and `IntentValueExpression`.
- Returned by `IntentValueConvertible.makeContainer(context:)`.

## Related

- [IntentValueConvertible](./intentvalueconvertible.md)
- [IntentValueExpressing](./intentvalueexpressing.md)
- [IntentValueExpression](./intentvalueexpression.md)
