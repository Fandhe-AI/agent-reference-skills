---
source: https://developer.apple.com/documentation/appintents/intentdonationmatchingpredicate
---

# IntentDonationMatchingPredicate

A type you use to specify previously donated app intents.

## Signature / Usage

```swift
struct IntentDonationMatchingPredicate
```

```swift
static func donationIdentifier(IntentDonationIdentifier) -> IntentDonationMatchingPredicate
static func donationIdentifiers([IntentDonationIdentifier]) -> IntentDonationMatchingPredicate
static func entityIdentifier(EntityIdentifier) -> IntentDonationMatchingPredicate
static func entityIdentifiers([EntityIdentifier]) -> IntentDonationMatchingPredicate
static func intentType(any AppIntent.Type, entityIdentifier: EntityIdentifier?) -> IntentDonationMatchingPredicate
```

## Options / Props

| Member | Description |
| --- | --- |
| `donationIdentifier(_:)` | Creates a predicate that matches a single, previous donation. |
| `donationIdentifiers(_:)` | Creates a predicate that matches one or more previous donations. |
| `entityIdentifier(_:)` | Creates a predicate to match any donation that contains the specified entity in a parameter. |
| `entityIdentifiers(_:)` | Creates a predicate that matches donations that refer to one of the specified entities. |
| `intentType(_:entityIdentifier:)` | Creates a predicate to match app intents of the specified type that optionally refers to a specific entity. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, visionOS, watchOS 9.0+ (the source lists no `introducedAt` for visionOS)
- Use this type to specify the donations to delete with `IntentDonationManager.deleteDonations(matching:)`. For example, if someone deletes data in your app, create a predicate to remove donations that refer to that data.

## Related

- [IntentDonationManager](./intentdonationmanager.md)
- [IntentDonationIdentifier](./intentdonationidentifier.md)
