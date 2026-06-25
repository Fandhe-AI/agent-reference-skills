# TimelineProviderContext

An object containing details about how a widget is rendered, including its size and whether it appears in the widget gallery.

## Signature / Usage

```swift
struct TimelineProviderContext
```

```swift
func getTimeline(in context: TimelineProviderContext, completion: @escaping (Timeline<Entry>) -> Void) {
    if context.isPreview {
        // Return sample data quickly for the widget gallery
        completion(Timeline(entries: [sampleEntry], policy: .never))
        return
    }
    let family = context.family  // e.g., .systemSmall
    let size = context.displaySize
    // ...
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `family` | `WidgetFamily` | The user-configured size/shape of the widget |
| `displaySize` | `CGSize` | Size in points of the widget's display area |
| `isPreview` | `Bool` | `true` when the widget is being shown in the widget gallery |
| `environmentVariants` | `TimelineProviderContext.EnvironmentVariants` | All environment variants (color scheme, display scale) that may be rendered |

## Notes

- iOS 14.0+, iPadOS 14.0+, macOS 11.0+, watchOS 9.0+, visionOS 1.0+
- `environmentVariants` helps pre-generate assets for both light/dark and different display scales so system transitions are instantaneous
- Passed as the `in context:` parameter to all `TimelineProvider` and `AppIntentTimelineProvider` methods

## Related

- [TimelineProvider](./timelineprovider.md)
- [AppIntentTimelineProvider](./appintenttimelineprovider.md)
- [WidgetFamily](./widgetfamily.md)
