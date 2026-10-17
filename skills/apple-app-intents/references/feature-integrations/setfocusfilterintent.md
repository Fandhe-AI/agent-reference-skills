---
source: https://developer.apple.com/documentation/appintents/setfocusfilterintent
---

# SetFocusFilterIntent

An interface for providing an app intent that you use to adapt your app's behavior when Focus changes.

## Signature / Usage

```swift
protocol SetFocusFilterIntent : AppIntent, InstanceDisplayRepresentable
```

Required members (from the topic pages):

```swift
var appContext: FocusFilterAppContext
static var current: Self
static func suggestedFocusFilters(for: FocusFilterSuggestionContext) async -> [Self]
static func invalidateFocusFilterAppContext()
```

## Options / Props

| Name | Signature | Description |
| --- | --- | --- |
| `appContext` | `var appContext: FocusFilterAppContext` | An app context associated with the focus configuration. The system retrieves it and adapts system behavior based on the context provided. Required; has a default implementation. |
| `current` | `static var current: Self` | Getting the current app configuration. |
| `suggestedFocusFilters(for:)` | `static func suggestedFocusFilters(for: FocusFilterSuggestionContext) async -> [Self]` | Implement to return a list of suggested focus configurations. Useful when suggested configurations differ from the configuration when the focus is turned off. Required; has a default implementation. |
| `invalidateFocusFilterAppContext()` | `static func invalidateFocusFilterAppContext()` | Configuring app context for the Focus. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS (no `introducedAt` given in the source JSON)
- Related session: WWDC22 session 10121, "Meet Focus filters". Related article: "Defining your app's Focus filter".
- Inherits from `AppIntent`, `CustomLocalizedStringResourceConvertible`, `InstanceDisplayRepresentable`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`.
- The snippet above is a summary of member declarations; the official page has no code listing.
- Source retrieved 2026-10-16 (DocC JSON, SDK 27.0).

## Related

- [FocusFilterAppContext](./focusfilterappcontext.md)
- [FocusFilterSuggestionContext](./focusfiltersuggestioncontext.md)
- [SetFocusFilterIntentError](./setfocusfilterintenterror.md)
- AppIntent
