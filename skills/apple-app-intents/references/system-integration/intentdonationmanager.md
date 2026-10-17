---
source: https://developer.apple.com/documentation/appintents/intentdonationmanager
---

# IntentDonationManager

A type you use to teach the system about the actions people take using your app.

## Signature / Usage

```swift
struct IntentDonationManager
```

```swift
static let shared: IntentDonationManager
```

```swift
func donate(intent: some AppIntent) -> IntentDonationIdentifier
func donate(intent: some AppIntent) async throws -> IntentDonationIdentifier
func donate(intent: some AppIntent, result: some IntentResult) -> IntentDonationIdentifier
func donate(intent: some AppIntent, result: some IntentResult) async throws -> IntentDonationIdentifier
func deleteDonations(matching: IntentDonationMatchingPredicate) async throws -> [IntentDonationIdentifier]
```

## Options / Props

| Member | Description |
| --- | --- |
| `shared` | The shared instance of this class. |
| `donate(intent:)` (sync) | Donates the specified app intent to the system synchronously. |
| `donate(intent:)` (async throws) | Donates the specified app intent to the system asynchronously. |
| `donate(intent:result:)` (sync) | Donates the specified app intent and result to the system synchronously. |
| `donate(intent:result:)` (async throws) | Donates the specified app intent and result to the system asynchronously. |
| `deleteDonations(matching:)` | Deletes the donations that match the criteria in the specified predicate. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, visionOS, watchOS 9.0+ (the source lists no `introducedAt` for visionOS)
- Use the shared instance to share your app's actions with the system. Over time the system combines donations with other information to predict actions; system features can then suggest actions on the Lock Screen, in the Siri Suggestions widget, in Search, and in other system interfaces.
- Donate only actions that people initiate from your app or its interface, and only after the person completes the action. Provide as much detail as you can; include a result value if the action generates an interesting result.
- Do not donate app intents the system creates on your behalf (for example, when someone runs your app intent from the Shortcuts app the system donates the intent and results automatically).
- Delete donations that are no longer relevant (for example, when the associated data is deleted or an action is undone shortly after it was performed) to improve the quality of future suggestions.
- The asynchronous methods throw an error when a donation fails; the synchronous methods fail quietly. Use the asynchronous methods when you need to know whether a donation succeeded (for example, during testing).
- Official article: "Donating your app's data and actions to the system" (`/documentation/appintents/donating-your-apps-data-and-actions-to-the-system`).

## Related

- [IntentDonationIdentifier](./intentdonationidentifier.md)
- [IntentDonationMatchingPredicate](./intentdonationmatchingpredicate.md)
- [RelevantIntentManager](./relevantintentmanager.md)
