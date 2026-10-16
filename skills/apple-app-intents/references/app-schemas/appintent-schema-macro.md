---
source: https://developer.apple.com/documentation/appintents/appintent(schema:)
---

# AppIntent(schema:)

A Swift macro you use to make sure your app intent conforms to a schema.

## Signature / Usage

```swift
@attached(memberAttribute) @attached(extension, conformances: AppIntent, AssistantSchemaIntent, ShowInAppSearchResultsIntent, OpenIntent, DeleteIntent, AudioPlaybackIntent, AudioRecordingIntent, LiveActivityIntent, URLRepresentableIntent, names: named(__appSchemaIntent)) macro AppIntent<T>(schema: T) where T : AppSchemaIntent
```

```swift
@AppIntent(schema: .audio.playAudio)
struct PlayAudioIntent: AudioStartingIntent {
    var audioEntity: <#AudioItem#>
    var playbackAttributes: Set<<#PlaybackAttributes#>>
    var warmupAudioQueueResult: <#WarmupAudioQueueResult#>?
    var queueLocation: <#QueueInsertionLocation#>?

    func perform() async throws -> some IntentResult {
        <#code#>
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `schema` | `T where T : AppSchemaIntent` | An intent schema selected from a domain, for example `.audio.playAudio` (see the domain pages in this category). |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- The macro attaches `AppIntent` and `AssistantSchemaIntent` conformances, plus the system intent protocols listed in the declaration (`ShowInAppSearchResultsIntent`, `OpenIntent`, `DeleteIntent`, `AudioPlaybackIntent`, `AudioRecordingIntent`, `LiveActivityIntent`, `URLRepresentableIntent`) according to the chosen schema. The `schema` argument must conform to `AppSchemaIntent`.
- The code listing is the sample on the official `playAudio` page (`appschema/audiointent/playaudio`); `<#...#>` are Xcode placeholders. That sample conforms to `AudioStartingIntent`, which is listed as deprecated in the App Intents documentation; the replacement is not stated on this page.
- `playAudio` itself is marked iOS / iPadOS / Mac Catalyst / macOS / visionOS 27.0+ on its page. Introduction versions of individual schemas vary by schema, so check the member page before relying on one.
- Companion macros: `AppEntity(schema:)` and `AppEnum(schema:)`. The earlier `AssistantIntent(schema:)` macro is deprecated (see assistant-schemas-legacy).
- App Intents macros are unrelated to the Foundation Models framework (`LanguageModelSession` / `Tool`); this macro declares schemas for Apple Intelligence and Siri to discover your app's actions, it does not call a model.

## Related

- [AppEntity(schema:)](./appentity-schema-macro.md)
- [AppEnum(schema:)](./appenum-schema-macro.md)
- [App schema base types](./app-schema-base-types.md)
- [Previous schema types](./assistant-schemas-legacy.md)
- [AppIntent](../intents/appintent.md)
