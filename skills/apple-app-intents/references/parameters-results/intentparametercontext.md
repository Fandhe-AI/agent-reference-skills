---
source: https://developer.apple.com/documentation/appintents/intentparametercontext
---

# IntentParameterContext

A type that provides information about an associated parameter during value resolution.

## Signature / Usage

```swift
struct IntentParameterContext<Value> where Value : _IntentValue, Value : Sendable
```

Passed to `Resolver.resolve(from:context:)` and `RangeCheckingResolver.checkParameterRangeContains(value:context:)`:

```swift
func resolve(from: Self.Input, context: IntentParameterContext<Self.Output>) async throws -> Self.Output?
```

## Options / Props

Members available when `Value` conforms to `_IntentValue` and `Sendable`, per the page's topic fragments:

| Name | Type | Description |
|------|------|-------------|
| controlStyle (`Value.ValueType` is `Int`) | `IntentParameter<Value>.IntControlStyle?` | Control style configured for an integer parameter |
| controlStyle (`Value.ValueType` is `Double`) | `IntentParameter<Value>.DoubleControlStyle?` | Control style configured for a floating-point parameter |

The page lists further members under additional `Value.ValueType` conditions; only the two above were verified in the saved source.

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+. The source data carries no `introducedAt` for visionOS.

## Related

- [Resolvers](./resolvers.md)
- [IntentParameter](./intentparameter.md)
