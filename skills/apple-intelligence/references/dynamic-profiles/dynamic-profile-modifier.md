---
source: https://developer.apple.com/documentation/foundationmodels/languagemodelsession/dynamicprofilemodifier, https://developer.apple.com/documentation/foundationmodels/languagemodelsession/dynamicprofilemodifiercontent, https://developer.apple.com/documentation/foundationmodels/languagemodelsession/modifieddynamicprofile
---

# LanguageModelSession.DynamicProfileModifier

A protocol for creating reusable wrappers around dynamic profile content.

## Signature / Usage

```swift
protocol DynamicProfileModifier
```

### Members

| Name | Declaration | Description |
| --- | --- | --- |
| body(content:) | `@LanguageModelSession.DynamicProfileBuilder func body(content: Self.Content) -> Self.Body` | The content of the dynamic profile modifier. |
| Content | `typealias Content = LanguageModelSession.DynamicProfileModifierContent<Self>` | The type of dynamic profile content that this modifier wraps. |
| Body | `associatedtype Body : LanguageModelSession.DynamicProfile` | The type of dynamic profile modifier that represents this modifier. |
| SessionProperty | `typealias SessionProperty = LanguageModelSession.SessionProperty` | A property wrapper that provides access to a session property from within a dynamic profile modifier. |
| DynamicProfile | `typealias DynamicProfile = LanguageModelSession.DynamicProfile` | The dynamic profile type that a modifier's body returns. |

### LanguageModelSession.DynamicProfileModifierContent

A type that represents the dynamic profile a modifier applies to.

```swift
struct DynamicProfileModifierContent<Modifier> where Modifier : LanguageModelSession.DynamicProfileModifier
```

### LanguageModelSession.ModifiedDynamicProfile

A dynamic profile with a modifier applied to it.

```swift
struct ModifiedDynamicProfile<Content, Modifier> where Content : LanguageModelSession.DynamicProfile, Modifier : LanguageModelSession.DynamicProfileModifier
```

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+ (all three types).
- Apply a modifier with `DynamicProfile.modifier(_:)`, which returns `some LanguageModelSession.DynamicProfile`.

## Related

- [LanguageModelSession.DynamicProfile](./dynamic-profile.md)
- [LanguageModelSession.Profile](./profile.md)
- [Dynamic profile helper types](./dynamic-profile-types.md)
