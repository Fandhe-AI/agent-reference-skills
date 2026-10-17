---
source: https://developer.apple.com/documentation/appintents/customappintenterrorconvertible
---

# CustomAppIntentErrorConvertible

A type that the system automatically converts to an app intent error.

## Signature / Usage

The page has no code listing; declarations below are taken verbatim from the symbol pages.

```swift
protocol CustomAppIntentErrorConvertible
```

```swift
var appIntentError: AppIntentError { get }
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `appIntentError` | `var appIntentError: AppIntentError` | Required. The `AppIntentError` the framework uses directly (no abstract on the page). |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Conform a custom type when you need full control over the `AppIntentError` the system produces, including the error kind and localized description. When you throw a conforming error from `perform()` or `EntityQuery.entities(for:)`, the framework reads `appIntentError` and uses it directly.
- If an error conforms to both `CustomLocalizedStringResourceConvertible` and `CustomAppIntentErrorConvertible`, the system uses only `CustomAppIntentErrorConvertible`.
- `AppIntentError.init(wrapping: some CustomAppIntentErrorConvertible)` accepts such a value.

## Related

- [AppIntentError](./appintenterror.md)
- [AppIntent](./appintent.md)
