---
source: https://developer.apple.com/documentation/appintents/parametersummarystring
---

# ParameterSummaryString

A human-readable string that interpolates parameter key paths to provide user-configurable placeholders in the Shortcuts app.

## Signature / Usage

```swift
struct ParameterSummaryString<Intent> where Intent : AppIntent
```

```swift
init(String)
```

(Initializer as shown by the page's topic fragment.)

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+. The source data carries no `introducedAt` for visionOS.
- Conforms to `ExpressibleByExtendedGraphemeClusterLiteral`, `ExpressibleByStringInterpolation`, `ExpressibleByStringLiteral`, `ExpressibleByUnicodeScalarLiteral`.

## Related

- [ParameterSummary](./parametersummary.md)
- [IntentParameterSummary](./intentparametersummary.md)
