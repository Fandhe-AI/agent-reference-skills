---
source: https://developer.apple.com/documentation/appintentstesting/resolvedintentresult
---

# ResolvedIntentResult

A type-safe result from performing an app intent.

## Signature / Usage

```swift
@dynamicMemberLookup struct ResolvedIntentResult
```

After performing the app intent with `AnyAppIntent.run()`, use the `value` property to inspect the output:

```swift
let result = try await intent.run()

// Compare the result with an expected value.
XCTAssertEqual(try result.value, "Hello World")

// Access the return value's nested properties.
let name: String = try result.value.customerName

// Pass the return value to another intent for additional verification.
intent2.coffee = try result.value
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `ValueKeyPath` | `struct ValueKeyPath` | A structure that enables key-path syntax for the intent result. |
| `subscript(dynamicMember:)` | `subscript(dynamicMember _: KeyPath<ResolvedIntentResult.ValueKeyPath, Never>) -> DynamicPropertyPath` | Accesses nested properties of the result's return value. |
| `subscript(dynamicMember:)` | `subscript(dynamicMember _: KeyPath<ResolvedIntentResult.ValueKeyPath, Never>) -> (any IntentValueExpressing)?` | Accesses the return value of the result, without casting. |
| `subscript<T>(dynamicMember:)` | `subscript<T>(dynamicMember _: KeyPath<ResolvedIntentResult.ValueKeyPath, Never>) -> T` | Returns the intent's output, converted to the inferred type. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Conforms to `Equatable`, `Sendable`, `SendableMetatype`.

## Related

- [AnyAppIntent](./anyappintent.md)
- [ResolvedValueQueryResult](./resolvedvaluequeryresult.md)
- [DynamicPropertyPath](./dynamicpropertypath.md)
