---
source: https://developer.apple.com/documentation/appintents/relevantentities
---

# RelevantEntities

A type you use to donate your app's songs, albums, artists, and other media items to play during workouts.

## Signature / Usage

```swift
struct RelevantEntities
```

```swift
static let shared: RelevantEntities
func updateEntities([any AppEntity], for: AppEntityContext) async throws
func removeAllEntities() async throws
func removeAllEntities(for: AppEntityContext) async throws
func removeEntities([any AppEntity]) async throws
func removeEntities([any AppEntity], from: AppEntityContext) async throws
```

## Options / Props

| Member | Description |
| --- | --- |
| `shared` | The shared instance of this class. |
| `updateEntities(_:for:)` | Donates suggested entities for a single context. |
| `removeAllEntities()` | Removes all suggested entities across all contexts. |
| `removeAllEntities(for:)` | Removes all donated entities for the given context. |
| `removeEntities(_:)` | Removes the specified entities across all contexts. |
| `removeEntities(_:from:)` | Removes specific entities from the given context. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Donate songs, albums, artists, playlists, radio stations, podcasts, or other media-related content. The system uses donations to offer suggestions for content someone can play during a workout or other scenario.
- Provide all items at once with `updateEntities(_:for:)`. Apps provide only one set of suggestions at a time; each call replaces the app's previous suggestions with the new set. Pass an empty array if you have no suggestions.
- If someone doesn't launch your app, the system automatically expires its suggestions after approximately four weeks.
- Conforms to `Sendable`, `SendableMetatype`.

## Related

- [AppEntityContext](./appentitycontext.md)
- [AudioContext](./audiocontext.md)
- [IntentDonationManager](./intentdonationmanager.md)
