---
source: https://developer.apple.com/documentation/appintents/appshortcutsprovider
---

# AppShortcutsProvider

A type alias for the type that provides an app’s preconfigured shortcuts.

## Signature / Usage

```swift
protocol AppShortcutsProvider : Sendable
```

Member declarations (from the symbol page references):

```swift
static var appShortcuts: [AppShortcut]
static var shortcutTileColor: ShortcutTileColor
static var negativePhrases: NegativeAppShortcutPhrases
static func updateAppShortcutParameters()
```

## Options / Props

| Name | Kind | Description |
|------|------|-------------|
| appShortcuts | required static var | The App Shortcuts the app provides (`[AppShortcut]`); built with `AppShortcutsBuilder` |
| shortcutTileColor | required static var (default implementation provided) | The background color of the tile that Shortcuts displays for each of the app’s App Shortcuts (`ShortcutTileColor`) |
| negativePhrases | static var | `NegativeAppShortcutPhrases` |
| updateAppShortcutParameters() | static func | Updating stored parameters |
| OptionsCollection | typealias | Associated type alias |
| ParameterPresentation | typealias | Associated type alias |
| Summary | typealias | Associated type alias |
| Title | typealias (deprecated) | Marked deprecated on the symbol page |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+; visionOS is listed on the page without an introduced version.
- Source note: Apple may extract anonymized App Shortcuts data such as localized phrases, display representation values, and the title and description of related intents. Machine learning models use this data when training to help improve the App Shortcuts experience.
- Related WWDC22 sessions listed on the page: 10170 (Implement App Shortcuts with App Intents) and 10169 (Design App Shortcuts).
- This is the App Intents App Shortcuts API of Apple platforms. It is distinct from Android App Shortcuts (`ShortcutManager` / `android.content.Intent`, see android-platform-core) and from App Actions on Windows (see windows-ai).

## Related

- [AppShortcut](./appshortcut.md)
- [AppShortcutsBuilder](./appshortcutsbuilder.md)
- [ShortcutTileColor](./shortcuttilecolor.md)
- [NegativeAppShortcutPhrase / NegativeAppShortcutPhrases](./negativeappshortcutphrase.md)
