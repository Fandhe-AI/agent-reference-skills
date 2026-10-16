---
source: https://developer.apple.com/documentation/appintents/runsystemshortcutintent
---

# RunSystemShortcutIntent

An app intent you use in widgets to open another app or perform an App Shortcut, custom shortcut, or system action.

## Signature / Usage

```swift
struct RunSystemShortcutIntent
```

```swift
import SwiftUI
import WidgetKit
import AppIntents

struct LauncherWidgetConfigurationIntent: WidgetConfigurationIntent {
    static var title: LocalizedStringResource { "Launcher Widget" }
    static var description: IntentDescription { "Widget that runs a shortcut or opens an app" }

    @Parameter(title: "Action")
    var shortcut: SystemShortcut
}

struct LauncherWidget: Widget {
    let kind: String = "LauncherWidget"

    var body: some WidgetConfiguration {
        AppIntentConfiguration(
            kind: kind,
            intent: LauncherWidgetConfigurationIntent.self,
            provider: Provider()
        ) { entry in
            Button(
                intent: RunSystemShortcutIntent(shortcut: entry.configuration.shortcut)
            ) {
                VStack {
                    Image(systemName: "play.fill")
                        .font(.largeTitle)
                    Text(entry.configuration.shortcut.displayRepresentation.title)
                        .font(.caption)
                }
            }
        }
    }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `init(shortcut:)` | `init(shortcut: SystemShortcut)` | Creates an intent that performs a person's configured action. |
| `init()` | `init()` | Creates an intent that performs a person's configured action. |
| `perform()` | `func perform() async throws -> IntentResultContainer<Never, Never, Never, Never>` | Performs a widget's configured action, like opening another app or performing an App Shortcut, custom shortcut, or system action. |
| `persistentIdentifier` | `static let persistentIdentifier: String` | The string that identifies the intent. |
| `title` | `static let title: LocalizedStringResource` | The localized string that describes the intent's functionality. |
| `SystemShortcut` | `struct SystemShortcut` | An opaque reference to a user-configured action for use in a widget button. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+ (June 2026 updates; introducedAt is 27.0 in the source JSON)
- Only use `RunSystemShortcutIntent` to initialize a SwiftUI `Button` with `Button(_:intent:)` and place the button in a widget. It provides no functionality in other contexts.
- When a person configures the widget, they choose the button's action: open another installed app, perform an App Shortcut, perform a custom shortcut created in Shortcuts, or perform a system action.
- It represents the chosen action and provides metadata for the widget's configuration UI. It does not give the widget or app access to a shortcut's actions, parameters, or implementation details. If a shortcut requires interaction (for example, prompting for input), the system may open the Shortcuts app to perform the intent.
- Conforms to `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`, `SystemIntent`.
- Scope: `Button(intent:)` itself belongs to the apple-swiftui skill; the WidgetKit types (`Widget`, `AppIntentConfiguration`) belong to apple-app-services.
- Source retrieved 2026-10-16 (DocC JSON, SDK 27.0).

## Related

- [WidgetConfigurationIntent](./widgetconfigurationintent.md)
- [ControlConfigurationIntent](./controlconfigurationintent.md)
- [LiveActivityIntent](./liveactivityintent.md)
