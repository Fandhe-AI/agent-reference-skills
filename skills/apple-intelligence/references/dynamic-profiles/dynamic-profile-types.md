---
source: https://developer.apple.com/documentation/foundationmodels/languagemodelsession/anydynamicprofile, https://developer.apple.com/documentation/foundationmodels/languagemodelsession/conditionaldynamicprofile
---

# LanguageModelSession.AnyDynamicProfile / ConditionalDynamicProfile

Supporting types that `DynamicProfileBuilder` produces when composing dynamic profiles.

## Signature / Usage

### LanguageModelSession.AnyDynamicProfile

A type-erased dynamic profile.

```swift
struct AnyDynamicProfile
```

| Member | Description |
| --- | --- |
| `init(_:)` | Creates an instance from the dynamic profile you specify. |
| `init(erasing:)` | Creates an instance from the dynamic profile you specify. |

### LanguageModelSession.ConditionalDynamicProfile

A dynamic profile that resolves to one of two profiles, depending on a condition.

```swift
struct ConditionalDynamicProfile<TrueContent, FalseContent> where TrueContent : LanguageModelSession.DynamicProfile, FalseContent : LanguageModelSession.DynamicProfile
```

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+ (both types).
- The official `ConditionalDynamicProfile` page lists no members and no prose overview.

## Related

- [LanguageModelSession.DynamicProfile](./dynamic-profile.md)
- [LanguageModelSession.DynamicProfileModifier](./dynamic-profile-modifier.md)
- [Dynamic instructions helper types](./dynamic-instructions-types.md)
