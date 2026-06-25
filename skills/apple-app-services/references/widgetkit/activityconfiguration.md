# ActivityConfiguration

An object (part of WidgetKit) that describes the content of a Live Activity, defining views for the Lock Screen and the Dynamic Island.

## Signature / Usage

```swift
@MainActor @preconcurrency
struct ActivityConfiguration<Attributes> where Attributes: ActivityAttributes
```

```swift
init<Content>(
    for: Attributes.Type,
    content: (ActivityViewContext<Attributes>) -> Content,
    dynamicIsland: (ActivityViewContext<Attributes>) -> DynamicIsland
)
```

```swift
struct AdventureActivityConfiguration: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: AdventureAttributes.self) { context in
            // Lock Screen / banner view
            AdventureLiveActivityView(context: context)
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    Label("\(context.state.health)", systemImage: "heart.fill")
                }
            } compactLeading: {
                Label("\(context.state.health)", systemImage: "heart.fill")
            } compactTrailing: {
                Text(context.attributes.playerName)
            } minimal: {
                Image(systemName: "heart.fill")
            }
        }
    }
}
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `for` | `Attributes.Type` | The `ActivityAttributes` type describing static and dynamic Live Activity data |
| `content` | `(ActivityViewContext<Attributes>) -> Content` | View shown on the Lock Screen and as a notification banner |
| `dynamicIsland` | `(ActivityViewContext<Attributes>) -> DynamicIsland` | View shown in the Dynamic Island |

## Notes

- iOS 16.1+, iPadOS 16.1+, Mac Catalyst 16.1+
- Conforms to `WidgetConfiguration`, `Sendable`
- `ActivityAttributes` is defined in the **ActivityKit** framework; the view is defined using WidgetKit
- `ActivityViewContext` provides both `.attributes` (static) and `.state` (dynamic/updatable) to views
- visionOS does not support Live Activities

## Related

- [ActivityKit — Activity](./activitykit-activity.md)
- [Widget](./widget.md)
