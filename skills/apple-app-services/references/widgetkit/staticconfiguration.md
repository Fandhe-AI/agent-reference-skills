# StaticConfiguration

An object describing the content of a widget that has no user-configurable options.

## Signature / Usage

```swift
@MainActor @preconcurrency
struct StaticConfiguration<Content> where Content: View

init<Provider>(
    kind: String,
    provider: Provider,
    content: (Provider.Entry) -> Content
) where Provider: TimelineProvider
```

```swift
struct LeaderboardWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(
            kind: "com.example.leaderboard",
            provider: LeaderboardProvider()
        ) { entry in
            LeaderboardWidgetView(entry: entry)
        }
        .configurationDisplayName("Leaderboard")
        .description("See the top scores.")
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
    }
}
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `kind` | `String` | Unique identifier for this widget; used with `WidgetCenter` to reload timelines |
| `provider` | `Provider: TimelineProvider` | Determines the widget's refresh schedule via timeline entries |
| `content` | `(Provider.Entry) -> Content` | Closure that receives a timeline entry and returns the SwiftUI view |

## Notes

- iOS 14.0+, iPadOS 14.0+, macOS 11.0+, watchOS 9.0+, visionOS 26.0+
- Conforms to `WidgetConfiguration` and `Sendable`
- Use `AppIntentConfiguration` instead when users should be able to configure the widget

## Related

- [Widget](./widget.md)
- [AppIntentConfiguration](./appintentconfiguration.md)
- [TimelineProvider](./timelineprovider.md)
- [WidgetCenter](./widgetcenter.md)
