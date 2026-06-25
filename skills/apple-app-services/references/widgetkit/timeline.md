# Timeline

An object that specifies an array of timeline entries and a reload policy telling WidgetKit when to request a new timeline.

## Signature / Usage

```swift
struct Timeline<EntryType> where EntryType: TimelineEntry

init(entries: [EntryType], policy: TimelineReloadPolicy)
```

```swift
func getTimeline(in context: Context, completion: @escaping (Timeline<GameStatusEntry>) -> Void) {
    let now = Date()
    let entries = (0..<5).map { i in
        GameStatusEntry(date: Calendar.current.date(byAdding: .hour, value: i, to: now)!, level: 100)
    }
    let nextUpdate = Calendar.current.date(byAdding: .hour, value: 6, to: now)!
    completion(Timeline(entries: entries, policy: .after(nextUpdate)))
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `entries` | `[EntryType]` | Array of timeline entries; each entry's `date` determines when it is displayed |
| `policy` | `TimelineReloadPolicy` | Determines the earliest date WidgetKit requests a new timeline |

## Notes

- iOS 14.0+, iPadOS 14.0+, macOS 11.0+, watchOS 9.0+, visionOS 26.0+
- WidgetKit may display an entry slightly later than its `date`; do not rely on exact timing
- Provide entries for the full period you expect until the next reload; WidgetKit uses each entry in order
- If all entries are exhausted and no new timeline has been provided, WidgetKit shows the last entry

## Related

- [TimelineReloadPolicy](./timelinereloadpolicy.md)
- [TimelineEntry](./timelineentry.md)
- [TimelineProvider](./timelineprovider.md)
- [WidgetCenter](./widgetcenter.md)
