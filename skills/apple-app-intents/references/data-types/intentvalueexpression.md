---
source: https://developer.apple.com/documentation/appintents/intentvalueexpression
---

# IntentValueExpression

A type that represents a lazily evaluated intent value.

## Signature / Usage

```swift
struct IntentValueExpression
```

`IntentValueExpression` provides a mechanism for lazy evaluation of intent values, allowing values to be converted to containers only when needed. This approach improves performance by deferring potentially expensive conversions until they're actually required.

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Conforms to `Sendable`, `SendableMetatype`.
- Created by `IntentValueExpressing.makeExpression()`.
- Listed under "Intent queries" together with `IntentValueQuery` and `IntentValueContainer`.
- The saved source page documents no members.

## Related

- [IntentValueExpressing](./intentvalueexpressing.md)
- [IntentValueContainer](./intentvaluecontainer.md)
