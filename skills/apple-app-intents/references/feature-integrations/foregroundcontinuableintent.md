---
source: https://developer.apple.com/documentation/appintents/foregroundcontinuableintent
---

# ForegroundContinuableIntent (deprecated)

A protocol you use for app intents which begin their work with the app in the background but may request to continue in the foreground.

## Signature / Usage

```swift
protocol ForegroundContinuableIntent : AppIntent
```

Migration: include `.foreground(.dynamic)` in the `supportedModes` of your app intent. For backward compatibility, provide conformance in an extension:

```swift
@available(*, deprecated)
extension OrderSoupIntent: ForegroundContinuableIntent {}
```

## Options / Props

| Name | Signature | Description |
| --- | --- | --- |
| `requestToContinueInForeground(_:continuation:)` | `func requestToContinueInForeground<ResultValue>(IntentDialog?, continuation: () async throws -> ResultValue) async throws -> ResultValue` | A method you call to ask a person to continue an action in the foreground. Deprecated. |
| `needsToContinueInForegroundError(_:continuation:)` | `func needsToContinueInForegroundError(IntentDialog?, continuation: (() async throws -> Void)?) -> AppIntentError` | A method you call to ask a person to continue an intent's action in the foreground after it encounters an error. Deprecated. |

## Notes

- Deprecated. Deprecation message: "Please include '.foreground(.dynamic)' in the 'supportedModes' of your app intent instead".
- Introduced / deprecated: iOS 16.4 / 26.0, iPadOS 16.4 / 26.0, Mac Catalyst 16.4 / 26.0, macOS 13.3 / 26.0, tvOS 16.4 / 26.0, watchOS 9.4 / 26.0. visionOS: no version data in the source JSON.
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`.
- Replacement mechanism is `AppIntent.supportedModes` (type `IntentModes`).
- Source retrieved 2026-10-16 (DocC JSON, SDK 27.0).

## Related

- [IntentModes](../intents/intentmodes.md)
- [AppIntentError](../intents/appintenterror.md)
- [AudioStartingIntent](./audiostartingintent.md)
