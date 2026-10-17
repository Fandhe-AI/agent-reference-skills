---
source: https://developer.apple.com/documentation/appintents/intentdonationidentifier
---

# IntentDonationIdentifier

An opaque type that identifies a specific donation to the system.

## Signature / Usage

```swift
struct IntentDonationIdentifier
```

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, visionOS, watchOS 9.0+ (the source lists no `introducedAt` for visionOS)
- When you donate an app intent, the system returns a unique `IntentDonationIdentifier` so you can refer to that donation later, including deleting it using an `IntentDonationManager` if the action no longer applies.
- Conforms to `Decodable`, `Encodable`, `Equatable`, `Hashable`, `Sendable`, `SendableMetatype`.

## Related

- [IntentDonationManager](./intentdonationmanager.md)
- [IntentDonationMatchingPredicate](./intentdonationmatchingpredicate.md)
