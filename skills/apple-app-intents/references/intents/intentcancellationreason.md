---
source: https://developer.apple.com/documentation/appintents/intentcancellationreason
---

# IntentCancellationReason

Reasons for the cancellation of an app intent's operation.

## Signature / Usage

```swift
struct IntentCancellationReason
```

```swift
onCancel: { reason in
    switch reason {
    case .timeout: // exceeded the time limit without reporting progress
    case .userCancelled: // someone explicitly canceled the intent
    default: break
    }
}
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `timeout` | `static var timeout: IntentCancellationReason` | An option that indicates the app intent exceeded the allowed time limit without reporting progress. |
| `userCancelled` | `static var userCancelled: IntentCancellationReason` | An option that indicates someone explicitly canceled the intent. |

## Notes

- iOS 26.4+, iPadOS 26.4+, Mac Catalyst 26.4+, macOS 26.4+, tvOS 26.4+, visionOS 26.4+, watchOS 26.4+
- You do not create instances; you receive a value in the `onCancel` handler of `withIntentCancellationHandler(operation:onCancel:isolation:)`.
- Conforms to `CustomDebugStringConvertible`, `Equatable`, `Sendable`, `SendableMetatype`.

## Related

- [CancellableIntent](./cancellableintent.md)
