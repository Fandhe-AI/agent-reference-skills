# TimelineEntry

A protocol that specifies the date to display a widget and optionally indicates the current relevance of the widget's content.

## Signature / Usage

```swift
protocol TimelineEntry

// Required property:
var date: Date { get }

// Optional property:
var relevance: TimelineEntryRelevance? { get }
```

```swift
struct GameStatusEntry: TimelineEntry {
    var date: Date
    var healthLevel: Double
    var characterName: String
}
```

## Options / Props

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `date` | `Date` | Yes | The date at which WidgetKit renders the widget using this entry |
| `relevance` | `TimelineEntryRelevance?` | No | Relevance score used to promote the widget in Smart Stack |

## Notes

- iOS 14.0+, iPadOS 14.0+, macOS 11.0+, watchOS 9.0+, visionOS 26.0+
- Include all additional data needed by your widget's SwiftUI view as extra properties
- WidgetKit may render the widget at a time slightly later than `date`; do not rely on precise timing
- The `content` closure in `StaticConfiguration`/`AppIntentConfiguration` receives the entry as its parameter

## Related

- [Timeline](./timeline.md)
- [TimelineProvider](./timelineprovider.md)
- [AppIntentTimelineProvider](./appintenttimelineprovider.md)
