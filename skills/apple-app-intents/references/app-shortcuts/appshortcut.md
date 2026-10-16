---
source: https://developer.apple.com/documentation/appintents/appshortcut
---

# AppShortcut

A type that defines a preconfigured shortcut for a specific app intent.

## Signature / Usage

```swift
struct AppShortcut
```

Initializers:

```swift
init<Intent>(intent: Intent, phrases: [AppShortcutPhrase<Intent>], shortTitle: LocalizedStringResource, systemImageName: String)

init<Intent, Value, Parameter, ParameterKeyPath>(intent: Intent, phrases: [AppShortcutPhrase<Intent>], shortTitle: LocalizedStringResource, systemImageName: String, parameterPresentation: AppShortcutParameterPresentation<Intent, Value, Parameter, ParameterKeyPath>)

// deprecated
init<Intent>(intent: Intent, phrases: [AppShortcutPhrase<Intent>], shortTitle: LocalizedStringResource?, systemImageName: String?)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| intent | Intent | The app intent the shortcut runs |
| phrases | [AppShortcutPhrase<Intent>] | Spoken phrases that run the shortcut |
| shortTitle | LocalizedStringResource | The title (optional `LocalizedStringResource?` in the deprecated initializer) |
| systemImageName | String | The image name (optional `String?` in the deprecated initializer) |
| parameterPresentation | AppShortcutParameterPresentation | Specifies how the shortcut is presented for given parameters |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+; visionOS is listed on the page without an introduced version.
- The initializer taking optional `shortTitle` / `systemImageName` is marked deprecated on the symbol page; the page does not state a replacement.
- The page’s See Also lists the bundle resources `NSAppIconActionTintColorName` (tint color for text and symbols in the App Shortcuts platter) and `NSAppIconComplementingColorNames` (colors for the platter background); these are not App Intents symbols.
- Apple may extract anonymized App Shortcuts data (localized phrases, display representation values, title and description of related intents) for training; related WWDC22 sessions: 10170, 10169.
- Apple App Shortcuts, distinct from Android App Shortcuts (android-platform-core) and Windows App Actions (windows-ai).

## Related

- [AppShortcutsProvider](./appshortcutsprovider.md)
- [AppShortcutPhrase](./appshortcutphrase.md)
- [AppShortcutPhraseToken](./appshortcutphrasetoken.md)
- [AppShortcutParameterPresentation](./appshortcutparameterpresentation.md)
