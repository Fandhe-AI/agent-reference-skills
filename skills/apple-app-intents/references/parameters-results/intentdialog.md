---
source: https://developer.apple.com/documentation/appintents/intentdialog
---

# IntentDialog

The text you want the system to display, or speak, when requesting a value, asking for disambiguation, or confirming an action.

## Signature / Usage

```swift
struct IntentDialog
```

```swift
init(LocalizedStringResource)
init(full: LocalizedStringResource, supporting: LocalizedStringResource)
init(full: LocalizedStringResource, supporting: LocalizedStringResource, systemImageName: String)
init(full: LocalizedStringResource, systemImageName: String)
```

(Initializers exactly as shown by the page's topic fragments; parameter labels of the single-argument form are not given there.)

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+. The source data carries no `introducedAt` for visionOS.
- When someone performs an action with Siri AI that invokes your app intent, the system might not display the `IntentDialog` you return as an intent result.
- Conforms to `ExpressibleByExtendedGraphemeClusterLiteral`, `ExpressibleByStringInterpolation`, `ExpressibleByStringLiteral`, `ExpressibleByUnicodeScalarLiteral`, `Sendable`, `SendableMetatype`.
- Topics group result types: `IntentResult`, `IntentResultContainer`, `OpensIntent`, `ProvidesDialog`, `ResultsCollection`, `ReturnsValue`, `ShowsSnippetView`.

## Related

- [IntentResult](./intentresult.md)
- [ProvidesDialog](./providesdialog.md)
- [IntentParameter](./intentparameter.md)
