---
source: https://developer.apple.com/documentation/appintents/intentvalueconvertiblewrapper
---

# IntentValueConvertibleWrapper

A protocol for types that wrap another intent value that supports conversion.

## Signature / Usage

```swift
protocol IntentValueConvertibleWrapper : IntentValueConvertible
```

```swift
struct LandmarkEntity: IntentValueConvertibleWrapper {
    var baseValue: AnyAppEntity

    init(baseValue: AnyAppEntity) {
        self.baseValue = baseValue
    }

    var continent: String {
        get throws {
            try baseValue.continent
        }
    }
}
```

`IntentValueConvertibleWrapper` enables you to create specialized types that derive their `IntentValueConvertible` conformance from an underlying base type. This pattern allows you to extend existing convertible types with additional functionality while preserving their ability to work within the AppIntents framework. Use it when you want a type that wraps an existing `IntentValueConvertible` type, adds domain-specific properties or methods, and maintains compatibility with the AppIntents framework.

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `BaseValue` | `associatedtype BaseValue : IntentValueConvertible` | Required. The underlying type that provides protocol conformance. |
| `baseValue` | `var baseValue: Self.BaseValue` | Required. The underlying value that this type wraps. |
| `init(baseValue:)` | `init(baseValue: Self.BaseValue) throws` | Required. Creates a new instance that wraps the specified base value. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Inherits from `IntentValueConvertible`, `IntentValueExpressing`, `Sendable`, `SendableMetatype`.
- `AnyAppEntity` in the example belongs to the App Intents Testing framework (see the `testing` category).

## Related

- [IntentValueConvertible](./intentvalueconvertible.md)
- [IntentValueExpressing](./intentvalueexpressing.md)
