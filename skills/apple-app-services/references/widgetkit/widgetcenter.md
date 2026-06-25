# WidgetCenter

An object that contains a list of user-configured widgets and is used for reloading widget timelines.

## Signature / Usage

```swift
class WidgetCenter

static let shared: WidgetCenter
```

```swift
// Reload a specific widget kind
WidgetCenter.shared.reloadTimelines(ofKind: "com.example.gamestatus")

// Reload all widgets from this app
WidgetCenter.shared.reloadAllTimelines()

// Get current widget configurations
let widgets = try await WidgetCenter.shared.currentConfigurations()
```

## Options / Props

| Method / Property | Description |
|-------------------|-------------|
| `static let shared` | The singleton `WidgetCenter` instance |
| `reloadTimelines(ofKind:)` | Reloads timelines for all widgets matching the given `kind` string |
| `reloadAllTimelines()` | Reloads timelines for all configured widgets from this app |
| `currentConfigurations() async throws -> [WidgetInfo]` | Returns info (kind, family, configuration) for all user-configured widgets |
| `getCurrentConfigurations(_:)` | Callback-based variant of `currentConfigurations()` |
| `invalidateConfigurationRecommendations()` | Refreshes pre-configured intent recommendations |
| `invalidateRelevance(ofKind:)` | Marks the relevance for a widget kind as stale |
| `currentPushInfo` | The current push information for widget reloads |

## Notes

- iOS 14.0+, iPadOS 14.0+, macOS 11.0+, watchOS 9.0+, visionOS 26.0+
- The `kind` parameter must match the string used in `StaticConfiguration` or `AppIntentConfiguration`
- Call `reloadTimelines(ofKind:)` from the app when data changes to avoid consuming the widget's daily refresh budget unnecessarily
- Reloads triggered while the app is in the foreground do not count against the daily refresh limit

## Related

- [StaticConfiguration](./staticconfiguration.md)
- [AppIntentConfiguration](./appintentconfiguration.md)
- [TimelineReloadPolicy](./timelinereloadpolicy.md)
