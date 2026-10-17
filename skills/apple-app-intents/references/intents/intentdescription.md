---
source: https://developer.apple.com/documentation/appintents/intentdescription
---

# IntentDescription

The human-readable description and metadata for an app intent.

## Signature / Usage

The page has no code listing; declarations below are taken verbatim from the symbol pages.

```swift
struct IntentDescription
```

```swift
init(_: LocalizedStringResource, categoryName: LocalizedStringResource?, searchKeywords: [LocalizedStringResource])
init(_: LocalizedStringResource, categoryName: LocalizedStringResource?, searchKeywords: [LocalizedStringResource], resultValueName: LocalizedStringResource?)
```

Usage seen on the `AppIntent` page:

```swift
static var description = IntentDescription("Order a vinyl record album.")
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `descriptionText` | `var descriptionText: LocalizedStringResource` | A short, localized, human-readable string that describes the intent using sentence case and followed by a period. |
| `categoryName` | `var categoryName: LocalizedStringResource?` | The category in which this intent will be grouped into in the Shortcuts editor. |
| `searchKeywords` | `var searchKeywords: [LocalizedStringResource]` | A set of keywords which, when searched in the Shortcuts editor, will reveal this intent. |
| `resultValueName` | `var resultValueName: LocalizedStringResource?` | A name for the result of this intent, which will be displayed in the Shortcuts editor, such as when the output is used as a variable. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (the page JSON lists visionOS without an `introducedAt` value).
- Assigned to `AppIntent.description` (`static var description: IntentDescription?`).
- Conforms to `ExpressibleByExtendedGraphemeClusterLiteral`, `ExpressibleByStringLiteral`, `ExpressibleByUnicodeScalarLiteral`, `Sendable`, `SendableMetatype`.

## Related

- [AppIntent](./appintent.md)
- [IntentModes](./intentmodes.md)
- [IntentDeprecation](./intentdeprecation.md)
