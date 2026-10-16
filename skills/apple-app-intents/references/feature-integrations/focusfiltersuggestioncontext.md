---
source: https://developer.apple.com/documentation/appintents/focusfiltersuggestioncontext
---

# FocusFilterSuggestionContext

A type you use to suggest app configurations for a given Focus.

## Signature / Usage

```swift
struct FocusFilterSuggestionContext
```

It is the argument of `SetFocusFilterIntent.suggestedFocusFilters(for:)`:

```swift
static func suggestedFocusFilters(for: FocusFilterSuggestionContext) async -> [Self]
```

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS (no `introducedAt` given in the source JSON)
- The official page documents no members and has no code listing; the second snippet is the declaration of the consuming method from the `SetFocusFilterIntent` page.
- Source retrieved 2026-10-16 (DocC JSON, SDK 27.0).

## Related

- [SetFocusFilterIntent](./setfocusfilterintent.md)
- [FocusFilterAppContext](./focusfilterappcontext.md)
