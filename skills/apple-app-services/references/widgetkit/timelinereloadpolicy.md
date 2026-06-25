# TimelineReloadPolicy

A type indicating the earliest date WidgetKit requests a new timeline from the widget's provider.

## Signature / Usage

```swift
struct TimelineReloadPolicy: Equatable
```

```swift
// Request new timeline after last entry's date passes
Timeline(entries: entries, policy: .atEnd)

// Request new timeline at a specific future date
let refreshDate = Calendar.current.date(byAdding: .hour, value: 6, to: Date())!
Timeline(entries: entries, policy: .after(refreshDate))

// App controls when to reload using WidgetCenter
Timeline(entries: entries, policy: .never)
```

## Options / Props

| Policy | Description |
|--------|-------------|
| `static let atEnd` | Requests a new timeline after the last entry's date passes (default) |
| `static func after(Date) -> TimelineReloadPolicy` | Requests a new timeline at the specified future date |
| `static let never` | No automatic reload; the app must call `WidgetCenter.reloadTimelines(ofKind:)` |

## Notes

- iOS 14.0+, iPadOS 14.0+, macOS 11.0+, watchOS 9.0+, visionOS 26.0+
- WidgetKit treats the policy date as the *earliest* possible reload, not a guaranteed exact time
- Each widget has a daily budget of timeline refreshes; use `.never` for data that only changes in response to user actions

## Related

- [Timeline](./timeline.md)
- [WidgetCenter](./widgetcenter.md)
