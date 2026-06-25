# AppIntentTimelineProvider

A protocol that advises WidgetKit when to update a user-configurable widget's display, incorporating user-selected App Intent values into timeline entries.

## Signature / Usage

```swift
protocol AppIntentTimelineProvider {
    associatedtype Intent: WidgetConfigurationIntent
    associatedtype Entry: TimelineEntry
    typealias Context = TimelineProviderContext
}
```

```swift
struct CharacterDetailProvider: AppIntentTimelineProvider {
    func placeholder(in context: Context) -> CharacterDetailEntry {
        CharacterDetailEntry(date: Date(), name: "Player", avatar: "default")
    }

    func snapshot(for configuration: SelectCharacterIntent, in context: Context) async -> CharacterDetailEntry {
        CharacterDetailEntry(date: Date(), name: configuration.name, avatar: configuration.avatar)
    }

    func timeline(for configuration: SelectCharacterIntent, in context: Context) async -> Timeline<CharacterDetailEntry> {
        let entry = CharacterDetailEntry(date: Date(), name: configuration.name, avatar: configuration.avatar)
        return Timeline(entries: [entry], policy: .atEnd)
    }
}
```

## Options / Props

Required methods:

| Method | Description |
|--------|-------------|
| `placeholder(in:) -> Entry` | Returns a placeholder entry (synchronous, no intent available) |
| `snapshot(for:in:) async -> Entry` | Returns a single current-state entry using the user's intent configuration |
| `timeline(for:in:) async -> Timeline<Entry>` | Returns a full timeline using the user's intent configuration |
| `recommendations() -> [AppIntentRecommendation<Intent>]` | (Optional) Pre-configured widget suggestions for platforms without customization UI |
| `relevance() async -> WidgetRelevance<Intent>` | (Optional) Relevance information for Smart Stack promotion |

## Notes

- iOS 17.0+, iPadOS 17.0+, macOS 14.0+, watchOS 10.0+, visionOS 26.0+
- Methods are `async`, unlike the completion-handler-based `TimelineProvider`
- Use in conjunction with `AppIntentConfiguration`
- Replaces the older `IntentTimelineProvider` (SiriKit-based)

## Related

- [TimelineProvider](./timelineprovider.md)
- [AppIntentConfiguration](./appintentconfiguration.md)
- [TimelineEntry](./timelineentry.md)
- [Timeline](./timeline.md)
