---
source: https://developer.apple.com/documentation/appintents/resolvers
---

# Resolvers

Resolve the parameters of your app intents, and extend the standard resolution types to include your app's custom types. This page aggregates `Resolver`, `RangeCheckingResolver`, `RangeComparableProperty`, and the system-provided resolver structs.

## Signature / Usage

System experiences like Siri and the Shortcuts app produce input that does not always match what your code requires. For example, natural spoken language commands from Siri are strings, but your app intent might require an integer or floating-point value instead. Resolvers let the system translate one type to another automatically. The system can chain multiple resolvers together (for example integer to string, then string to Boolean). If your app defines custom types, create your own resolvers.

```swift
protocol Resolver : Hashable, Sendable {
    typealias Context
    associatedtype Input : _IntentValue
    associatedtype Output : _IntentValue

    func resolve(from: Self.Input, context: IntentParameterContext<Self.Output>) async throws -> Self.Output?
}

protocol RangeCheckingResolver : Resolver {
    func checkParameterRangeContains<Value>(value: Value, context: IntentParameterContext<Self.Output>) throws
}

protocol RangeComparableProperty : _IntentValue, Comparable
```

## Options / Props

| Type | Kind | Description |
|------|------|-------------|
| `Resolver` | protocol | An interface to convert a value from one type to a different type. `resolve(from:context:)`: "Converts the specified value into the expected data type." |
| `RangeCheckingResolver` | protocol | An interface for validating that a value is within a parameter's defined inclusive range. |
| `RangeComparableProperty` | protocol | Property type usable for range validation (refines `_IntentValue` and `Comparable`). |
| `IntResolver` | struct | Validates an integer is within the parameter's inclusive range. |
| `IntFromDoubleResolver` | struct | Converts a double into an integer using the specified rounding rule and validates the result is within the parameter's inclusive range. |
| `IntFromStringResolver` | struct | Converts a string into an integer in the specified base and validates the result is within the parameter's inclusive range. |
| `DoubleResolver` | struct | Validates a double is within the parameter's inclusive range. |
| `DoubleFromIntResolver` | struct | Integer to double conversion (no abstract on the page). |
| `DoubleFromStringResolver` | struct | Converts a string into a double and validates the result is within the parameter's inclusive range. |
| `StringFromDoubleResolver` | struct | Converts a double into a string. |
| `StringFromIntResolver` | struct | Converts one or more integers into one or more strings. |
| `AttributedStringFromStringResolver` | struct | Converts a string into an attributed string. |
| `BoolFromStringResolver` | struct | Converts a string into a Boolean, optionally using a localized display name. |
| `URLFromStringResolver` | struct | Converts a string into a URL. |

Topic grouping on the page: Integer resolution, Floating-point resolution, String resolution, Boolean resolution, URL resolution, Custom resolution (`Resolver`), Range validation (`RangeCheckingResolver`, `RangeComparableProperty`).

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ for `Resolver`, `RangeCheckingResolver`, `RangeComparableProperty`, `IntResolver` (verified in the saved source). The source data carries no `introducedAt` for visionOS.
- `Resolver` also lists the supporting types `ResolverSpecification` ("An internal type that a resolver uses to convert data values"), `ResolverSpecificationBuilder` ("A result builder that declaratively specifies a set of resolvers"), `EmptyResolverSpecification`, and `StringSearchCriteriaFromStringResolverSpecificification`.
- The struct resolvers above declare only `struct <Name>` on their pages (no additional signature detail).

## Related

- [IntentParameterContext](./intentparametercontext.md)
- [IntentParameter](./intentparameter.md)
