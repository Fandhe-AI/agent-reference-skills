---
source: https://developer.apple.com/documentation/appintents/widgetconfigurationintent
---

# WidgetConfigurationIntent

An interface for configuring a WidgetKit widget.

## Signature / Usage

```swift
protocol WidgetConfigurationIntent : AppIntent
```

```swift
import AppIntents

struct FavoriteBook: WidgetConfigurationIntent {
    static var title: LocalizedStringResource = "Favorite Book"
    static var description = IntentDescription("Shows a picture of your favorite book!")

    @Parameter(title: "Title", default: "The Swift Programming Language")
    var title: String

    @Parameter(title: "Author", default: "Apple Inc.")
    var author: String
}
```

Use `parameterSummary` to configure the order of the parameters in the configuration UI, and dynamic presentation such as showing or hiding one parameter based on another:

```swift
struct FavoriteSoup: WidgetConfigurationIntent {
    static var title: LocalizedStringResource = "Favorite Soup"
    static var description = IntentDescription("Shows a picture of your favorite soup!")

    @Parameter(title: "Soup")
    var name: String?

    @Parameter(title: "Shuffle", default: true)
    var shuffle: Bool

    @Parameter(title: "Refresh", default: .daily)
    var interval: RefreshInterval

    static var parameterSummary: some ParameterSummary {
        When(\.$shuffle, .equalTo, true) {
            Summary {
                \.$name
                \.$shuffle
                \.$interval
            }
        } otherwise: {
            Summary {
                \.$name
                \.$shuffle
            }
        }
    }
}
```

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, watchOS 10.0+, visionOS (no `introducedAt` given in the source JSON)
- The parameters of the intent define the configuration options for the widget. The system uses the intent's title and description as the widget's display name and description if those values are not set explicitly on the `AppIntentConfiguration`.
- No `perform()` implementation is required. You can still implement `perform()` to share one implementation between widget configuration and an actionable intent (see the `EmojiRangerSelection` structure in the Emoji Rangers sample code project).
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`. Topics: `IntentWidgetFamily` (widget families), associated type `NeverResult`.
- Scope: this page covers the intent protocol only. WidgetKit-side `AppIntentConfiguration`, `AppIntentTimelineProvider` and `Widget` are covered by the apple-app-services skill (widgetkit category).
- Source retrieved 2026-10-16 (DocC JSON, SDK 27.0).

## Related

- [ControlConfigurationIntent](./controlconfigurationintent.md)
- [LiveActivityIntent](./liveactivityintent.md)
- [RunSystemShortcutIntent](./runsystemshortcutintent.md)
- [AppIntent](../intents/appintent.md)
