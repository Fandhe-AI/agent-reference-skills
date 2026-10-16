---
source: https://developer.apple.com/documentation/appintents/appshortcutphrase
---

# AppShortcutPhrase

A spoken phrase that causes the system to run the corresponding App Shortcut.

## Signature / Usage

```swift
struct AppShortcutPhrase<Intent> where Intent : AppIntent

init(_ stringLiteral: String)
```

Conforms to `ExpressibleByStringLiteral`, `ExpressibleByStringInterpolation`, `ExpressibleByExtendedGraphemeClusterLiteral` and `ExpressibleByUnicodeScalarLiteral`, so phrases are written as string literals.

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+; visionOS is listed on the page without an introduced version.
- The initializer is documented as `init(_:)` taking a `String`; the page has no further description.
- The page does not show a phrase example. For the application-name token see `AppShortcutPhraseToken`.

## Related

- [AppShortcut](./appshortcut.md)
- [AppShortcutPhraseToken](./appshortcutphrasetoken.md)
- [NegativeAppShortcutPhrase / NegativeAppShortcutPhrases](./negativeappshortcutphrase.md)
