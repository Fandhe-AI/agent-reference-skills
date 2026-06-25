# Widget

The configuration and content of a widget to display on the Home screen, Notification Center, or other system surfaces.

## Signature / Usage

```swift
@MainActor @preconcurrency
protocol Widget

struct MyWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "com.example.MyWidget", provider: MyProvider()) { entry in
            MyWidgetView(entry: entry)
        }
        .configurationDisplayName("My Widget")
        .description("Shows my widget content.")
    }
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `body` | `Self.Body` | The content and behavior of the widget (required) |
| `Body` | `associatedtype: WidgetConfiguration` | The type of configuration representing the widget content |

## Notes

- iOS 14.0+, iPadOS 14.0+, macOS 11.0+, watchOS 9.0+, visionOS 1.0+
- Conforming types inherit `@preconcurrency @MainActor` isolation by default when the conformance is in the base declaration; declare in an extension to opt out
- A widget consists of three components: a `WidgetConfiguration` (e.g., `StaticConfiguration` or `AppIntentConfiguration`), a `TimelineProvider`, and SwiftUI views

## Related

- [WidgetConfiguration](./widgetconfiguration.md)
- [StaticConfiguration](./staticconfiguration.md)
- [AppIntentConfiguration](./appintentconfiguration.md)
- [WidgetBundle](./widgetbundle.md)
