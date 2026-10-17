---
source: https://developer.apple.com/documentation/appintents/intentdeprecation
---

# IntentDeprecation

Describes the deprecation of an app intent, optionally naming the intent that replaces it. The page has no abstract text.

## Signature / Usage

The page has no code listing; declarations below are taken verbatim from the symbol pages.

```swift
struct IntentDeprecation<ReplacementIntent> where ReplacementIntent : AppIntent
```

```swift
init(message: LocalizedStringResource)
init(message: LocalizedStringResource, replacedBy: ReplacementIntent.Type?)
init(replacedBy: ReplacementIntent.Type)
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `message` | `var message: LocalizedStringResource` | A short, localized, human-readable string that describes the deprecation of this intent using sentence case and followed by a period. |
| `replacedBy` | `var replacedBy: ReplacementIntent.Type?` | Optionally, the AppIntent that replaces this one. Note: This is used by the Shortcuts app to help the user find the new AppIntent to use. |

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+ (the page JSON lists visionOS without an `introducedAt` value).
- The page does not say where an `IntentDeprecation` value is attached; see the `DeprecatedAppIntent` protocol (an app intent that marks an action as deprecated and informs people which action to use instead) in the app intent types.

## Related

- [AppIntent](./appintent.md)
- [IntentDescription](./intentdescription.md)
