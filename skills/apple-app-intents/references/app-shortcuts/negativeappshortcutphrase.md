---
source: https://developer.apple.com/documentation/appintents/negativeappshortcutphrase
---

# NegativeAppShortcutPhrase / NegativeAppShortcutPhrases

`NegativeAppShortcutPhrase` is an object that represents a negative phrase; `NegativeAppShortcutPhrases` is a set of negative phrases.

## Signature / Usage

```swift
struct NegativeAppShortcutPhrase

init(_ stringLiteral: String)
```

`NegativeAppShortcutPhrases` (declaration from the symbol references; its own page is not part of this page set):

```swift
struct NegativeAppShortcutPhrases
```

Provided by the provider type:

```swift
static var negativePhrases: NegativeAppShortcutPhrases
```

## Notes

- `NegativeAppShortcutPhrase`: iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+; visionOS is listed on the page without an introduced version.
- Overview: each negative phrase is used to populate an app-level negative training set. This set contains phrases that will completely bypass your app.
- Abstract of `NegativeAppShortcutPhrases`: a set of negative phrases, which will all be added to the app-level negative training set. All the training data specified here will be used to completely bypass your app.
- Conforms to `ExpressibleByStringLiteral`, `ExpressibleByStringInterpolation`, `ExpressibleByExtendedGraphemeClusterLiteral` and `ExpressibleByUnicodeScalarLiteral`; has a nested `StringInterpolation` struct.

## Related

- [AppShortcutsProvider](./appshortcutsprovider.md)
- [AppShortcutPhrase](./appshortcutphrase.md)
