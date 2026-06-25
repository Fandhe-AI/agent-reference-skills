# TimelineProvider

A protocol that advises WidgetKit when to update a widget's display by providing timeline entries with scheduled dates.

## Signature / Usage

```swift
protocol TimelineProvider {
    associatedtype Entry: TimelineEntry
    typealias Context = TimelineProviderContext
}
```

```swift
struct GameStatusProvider: TimelineProvider {
    func placeholder(in context: Context) -> GameStatusEntry {
        GameStatusEntry(date: Date(), status: .placeholder)
    }

    func getSnapshot(in context: Context, completion: @escaping (GameStatusEntry) -> Void) {
        completion(GameStatusEntry(date: Date(), status: .current))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<GameStatusEntry>) -> Void) {
        let entries = (0..<5).map { offset in
            GameStatusEntry(date: Calendar.current.date(byAdding: .hour, value: offset, to: Date())!, status: .current)
        }
        completion(Timeline(entries: entries, policy: .atEnd))
    }
}
```

## Options / Props

Required methods:

| Method | Description |
|--------|-------------|
| `placeholder(in:) -> Entry` | Returns a placeholder entry shown while the widget loads (synchronous) |
| `getSnapshot(in:completion:)` | Returns a single current-state entry; called for the widget gallery and transient display |
| `getTimeline(in:completion:)` | Returns a `Timeline<Entry>` with future-dated entries and a reload policy |
| `relevance() async -> WidgetRelevance<Void>` | (Optional) Describes when this widget is relevant for Smart Stack promotion |

## Notes

- iOS 14.0+, iPadOS 14.0+, macOS 11.0+, watchOS 9.0+, visionOS 26.0+
- Use `context.isPreview` in `getSnapshot` to detect widget gallery and return sample data quickly
- WidgetKit limits daily refreshes based on usage patterns; use `TimelineReloadPolicy.never` and call `WidgetCenter.reloadTimelines(ofKind:)` from the app when needed
- For user-configurable widgets use `AppIntentTimelineProvider` instead

## Related

- [AppIntentTimelineProvider](./appintenttimelineprovider.md)
- [TimelineEntry](./timelineentry.md)
- [Timeline](./timeline.md)
- [TimelineReloadPolicy](./timelinereloadpolicy.md)
- [TimelineProviderContext](./timelineprovidercontext.md)
