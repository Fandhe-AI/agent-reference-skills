---
source: https://developer.apple.com/documentation/appintents/relevantintentmanager
---

# RelevantIntentManager

A type you use to suggest app intents and their current relevance to a person.

## Signature / Usage

```swift
final class RelevantIntentManager
```

```swift
static let shared: RelevantIntentManager
func updateRelevantIntents([RelevantIntent]) async throws
```

## Options / Props

| Member | Description |
| --- | --- |
| `shared` | The shared instance of this class. |
| `updateRelevantIntents(_:)` | Sets the relevant app intents for the system to suggest. |

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS, watchOS 10.0+ (the source lists no `introducedAt` for visionOS)
- Use the shared object to specify the actions your app wants to suggest and their current relevance. Register relevant app intents at launch time and any time the set of actions changes later. You can register multiple actions at once; the system uses the relevance factors of each to decide when to suggest it.
- If you have no current actions to suggest, register an empty set to prevent the system from suggesting outdated actions.
- You don't create instances yourself; use `shared`.
- Official article: "Donating your app's data and actions to the system".

## Related

- [RelevantIntent](./relevantintent.md)
- [IntentDonationManager](./intentdonationmanager.md)
