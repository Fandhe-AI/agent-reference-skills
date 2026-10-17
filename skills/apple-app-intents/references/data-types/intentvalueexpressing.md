---
source: https://developer.apple.com/documentation/appintents/intentvalueexpressing
---

# IntentValueExpressing

A protocol for types that can create intent value expressions.

## Signature / Usage

```swift
protocol IntentValueExpressing : Sendable
```

```swift
func makeExpression() -> IntentValueExpression
```

`IntentValueExpressing` enables types to participate in the lazy evaluation system of the App Intents framework. Types conforming to this protocol can create expressions that are evaluated only when needed, improving performance by deferring potentially expensive conversions. This protocol forms the foundation of the lazy evaluation mechanism in the intent value conversion system.

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `makeExpression()` | `func makeExpression() -> IntentValueExpression` | Required. Creates an intent value expression that represents this value. Has a default implementation. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Inherits from `Sendable`, `SendableMetatype`. Inherited by `IntentValueConvertible` and `IntentValueConvertibleWrapper`.
- Conforming types listed on the page: `IntentCurrencyAmount`, `IntentFile`, `IntentPaymentMethod`, `IntentPerson`, `IntentValueContainer`, `StringSearchCriteria`, `SystemShortcut`.

## Related

- [IntentValueConvertible](./intentvalueconvertible.md)
- [IntentValueConvertibleWrapper](./intentvalueconvertiblewrapper.md)
- [IntentValueExpression](./intentvalueexpression.md)
- [IntentValueContainer](./intentvaluecontainer.md)
