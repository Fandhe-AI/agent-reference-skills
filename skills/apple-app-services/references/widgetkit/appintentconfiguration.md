# AppIntentConfiguration

An object describing the content of a widget that uses a custom App Intent to provide user-configurable options.

## Signature / Usage

```swift
@MainActor @preconcurrency
struct AppIntentConfiguration<Intent, Content>
where Intent: WidgetConfigurationIntent, Content: View

init<Provider>(
    kind: String,
    intent: Intent.Type,
    provider: Provider,
    content: (Provider.Entry) -> Content
) where Provider: AppIntentTimelineProvider
```

```swift
struct CharacterDetailWidget: Widget {
    var body: some WidgetConfiguration {
        AppIntentConfiguration(
            kind: "com.mygame.character-detail",
            intent: SelectCharacterIntent.self,
            provider: CharacterDetailProvider()
        ) { entry in
            CharacterDetailView(entry: entry)
        }
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
    }
}
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `kind` | `String` | Unique identifier for this widget; used with `WidgetCenter` to reload timelines |
| `intent` | `Intent.Type` | A `WidgetConfigurationIntent` type whose parameters are the user-editable options |
| `provider` | `Provider: AppIntentTimelineProvider` | Provides timelines incorporating user-selected intent values |
| `content` | `(Provider.Entry) -> Content` | Closure returning the SwiftUI view for a given entry |

## Notes

- iOS 17.0+, iPadOS 17.0+, macOS 14.0+, watchOS 10.0+, visionOS 26.0+
- Conforms to `WidgetConfiguration` and `Sendable`
- Replaces the older `IntentConfiguration` (SiriKit-based); prefer `AppIntentConfiguration` for new widgets

## Related

- [Widget](./widget.md)
- [StaticConfiguration](./staticconfiguration.md)
- [AppIntentTimelineProvider](./appintenttimelineprovider.md)
- [WidgetCenter](./widgetcenter.md)
