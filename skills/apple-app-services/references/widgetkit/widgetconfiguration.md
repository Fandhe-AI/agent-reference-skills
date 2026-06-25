# WidgetConfiguration

A protocol that defines the configuration for a widget. Concrete types include `StaticConfiguration` and `AppIntentConfiguration`.

## Signature / Usage

```swift
protocol WidgetConfiguration

// Common modifiers available on all WidgetConfiguration conforming types:
StaticConfiguration(kind: "...", provider: MyProvider()) { entry in
    MyView(entry: entry)
}
.configurationDisplayName("Display Name")
.description("Widget description.")
.supportedFamilies([.systemSmall, .systemMedium])
```

## Options / Props

Available modifiers on `WidgetConfiguration`:

| Modifier | Description |
|----------|-------------|
| `.configurationDisplayName(_:)` | Sets the name shown when adding or editing the widget |
| `.description(_:)` | Sets the description shown when adding or editing the widget |
| `.supportedFamilies(_:)` | Specifies the `WidgetFamily` sizes the widget supports |
| `.backgroundTask(_:action:)` | Runs actions for background tasks |
| `.onBackgroundURLSessionEvents(matching:_:)` | Handles background URL session events |
| `.contentMarginsDisabled()` | Disables default content margins |

## Notes

- iOS 14.0+, iPadOS 14.0+, macOS 11.0+, watchOS 9.0+, visionOS 1.0+
- Do not conform to this protocol directly; use `StaticConfiguration` or `AppIntentConfiguration`
- The `body` of a `Widget` returns `some WidgetConfiguration`

## Related

- [Widget](./widget.md)
- [StaticConfiguration](./staticconfiguration.md)
- [AppIntentConfiguration](./appintentconfiguration.md)
- [WidgetFamily](./widgetfamily.md)
