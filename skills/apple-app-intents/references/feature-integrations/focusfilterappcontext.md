---
source: https://developer.apple.com/documentation/appintents/focusfilterappcontext
---

# FocusFilterAppContext

A type that contains app-specific contextual information for a particular Focus, such as the notification filter criteria to apply.

## Signature / Usage

```swift
struct FocusFilterAppContext

init(notificationFilterPredicate: NSPredicate?)
init(notificationFilterPredicate: NSPredicate?, targetContentIdentifierPrefix: String?)
```

## Options / Props

| Name | Signature | Description |
| --- | --- | --- |
| `init(notificationFilterPredicate:)` | `init(notificationFilterPredicate: NSPredicate?)` | Creates a `FocusFilterAppContext` with a specified `notificationFilterPredicate`. |
| `init(notificationFilterPredicate:targetContentIdentifierPrefix:)` | `init(notificationFilterPredicate: NSPredicate?, targetContentIdentifierPrefix: String?)` | Creates a focus filter context with a specified predicate and identifier prefix. |
| `notificationFilterPredicate` | `let notificationFilterPredicate: NSPredicate?` | An `NSPredicate` for the system to filter the user's notifications of the app when a Focus is active. |
| `targetContentIdentifierPrefix` | `let targetContentIdentifierPrefix: String?` | An identifier you provide to the system for use in scheme prefixes for Focus. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS (no `introducedAt` given in the source JSON)
- Returned from `SetFocusFilterIntent.appContext`. The official page has no code listing; the snippet above is the declarations from the topic pages.
- Source retrieved 2026-10-16 (DocC JSON, SDK 27.0).

## Related

- [SetFocusFilterIntent](./setfocusfilterintent.md)
- [FocusFilterSuggestionContext](./focusfiltersuggestioncontext.md)
