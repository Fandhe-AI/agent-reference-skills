---
source: https://developer.apple.com/documentation/foundationmodels/languagemodelsession/profile
---

# LanguageModelSession.Profile

A profile that contains dynamic instructions. A profile binds `DynamicInstructions` to a set of session-level configuration values.

## Signature / Usage

```swift
struct Profile
```

```swift
init(@DynamicInstructionsBuilder _ dynamicInstructions: () -> some DynamicInstructions)
```

```swift
Profile {
    // Custom instructions and tools for a creative task.
}
// Use a higher creative temperature value when a person likes poetry.
.temperature(likesPoetry ? 0.8 : 0.1)
// Perform deeper reasoning when a person likes astronomy.
.reasoningLevel(likesAstronomy ? .deep : .light)
```

Observing a life cycle modifier:

```swift
Profile {
    // Custom instructions and tools for the task.
}
.onToolOutput { toolCall, output in
    // Runs after the tool to log any necessary activity.
}
```

## Options / Props

| Name | Description |
| --- | --- |
| `init(_:)` | Creates a profile that contains dynamic instructions. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- `DynamicInstructions` describes the content and tools; a `LanguageModelSession.DynamicProfile` orchestrates transitions between session configurations.
- `LanguageModelSession.Profile` conforms to `LanguageModelSession.DynamicProfile` and includes all the same modifiers used to configure a unit of work.
- When a profile and a subprofile both register a life cycle callback, the framework calls both.
- The Profile page example passes `toolCall, output` to `onToolOutput`, but the declared signature of `onToolOutput(perform:)` takes a zero-argument `() async throws -> Void` closure (see the onToolOutput(perform:) page); follow the declaration.

## Related

- [LanguageModelSession.DynamicProfile](./dynamic-profile.md)
- [DynamicInstructions](./dynamic-instructions.md)
- [LanguageModelSession.DynamicProfileModifier](./dynamic-profile-modifier.md)
