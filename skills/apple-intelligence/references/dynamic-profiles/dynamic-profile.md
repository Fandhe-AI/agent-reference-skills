---
source: https://developer.apple.com/documentation/foundationmodels/languagemodelsession/dynamicprofile, https://developer.apple.com/documentation/foundationmodels/languagemodelsession/dynamicprofilebuilder
---

# LanguageModelSession.DynamicProfile

A dynamic profile that contains one or more profiles. It is the top-level coordination layer that manages profiles: it determines which `Profile` is active and lets a `LanguageModelSession` switch between entirely different configurations as app state changes. A body must resolve to a single profile.

## Signature / Usage

```swift
protocol DynamicProfile
```

```swift
struct PresentationProfile: LanguageModelSession.DynamicProfile {
    // The data source for the profile.
    var isEditingImage = true
    var isEditingAnimation = false

    // Determine which profile to load based on the current state.
    var body: some LanguageModelSession.DynamicProfile {
        if isEditingImage {
            // Use the editing image profile.
        } else if isEditingAnimation {
            // Use the editing animation profile.
        } else {
            // Use the default profile.
        }
    }
}
```

Stateless transcript transform (modifies the transcript sent to the model, not the global transcript state):

```swift
Profile {
    // The instructions and tools necessary for the task.
}
.historyTransform { history in
    Array(history.suffix(20))
}
```

### Members

| Name | Declaration | Description |
| --- | --- | --- |
| body | `@LanguageModelSession.DynamicProfileBuilder var body: Self.Body { get }` | The content of the dynamic profile. |
| Body | `associatedtype Body : LanguageModelSession.DynamicProfile` | The type of dynamic profile that represent this profile. |
| DynamicProfile | `typealias DynamicProfile = LanguageModelSession.DynamicProfile` | The dynamic profile type that a dynamic profile's body composes. |
| Profile | `typealias Profile = LanguageModelSession.Profile` | The profile type that a dynamic profile activates. |
| SessionProperty | `typealias SessionProperty = LanguageModelSession.SessionProperty` | A property wrapper that provides access to a session property from within a dynamic profile. |
| historyTransform(_:) | `func historyTransform(_ transform: @escaping ([Transcript.Entry]) -> [Transcript.Entry]) -> some LanguageModelSession.DynamicProfile` | Applies a transformation to the history prior to invoking the model. |
| onActivate(perform:) | `func onActivate(perform action: sending @escaping @isolated(any) () async -> Void) -> some LanguageModelSession.DynamicProfile` | Runs an action when this dynamic profile becomes active. |
| onDeactivate(perform:) | `func onDeactivate(perform action: sending @escaping @isolated(any) () async -> Void) -> some LanguageModelSession.DynamicProfile` | Runs an action when this dynamic profile becomes inactive. |
| onPrompt(perform:) | `@export(implementation) func onPrompt(perform action: nonisolated(nonsending) sending @escaping () async throws -> Void) -> some LanguageModelSession.DynamicProfile` | Runs an action before the model is invoked for this dynamic profile. |
| onReasoning(perform:) | `@export(implementation) func onReasoning(perform action: nonisolated(nonsending) sending @escaping () async throws -> Void) -> some LanguageModelSession.DynamicProfile` | Runs an action whenever this dynamic profile produces reasoning. |
| onResponse(perform:) | `@export(implementation) func onResponse(perform action: nonisolated(nonsending) sending @escaping () async throws -> Void) -> some LanguageModelSession.DynamicProfile` | Runs an action after this dynamic profile produces a response. |
| onToolCall(perform:) | `@export(implementation) func onToolCall(perform action: nonisolated(nonsending) sending @escaping () async throws -> Void) -> some LanguageModelSession.DynamicProfile` | Runs an action whenever a tool is called within this dynamic profile. |
| onToolOutput(perform:) | `@export(implementation) func onToolOutput(perform action: nonisolated(nonsending) sending @escaping () async throws -> Void) -> some LanguageModelSession.DynamicProfile` | Runs an action whenever a tool call output is received within this dynamic profile. |
| toolCallingMode(_:) | `func toolCallingMode(_ toolCallingMode: GenerationOptions.ToolCallingMode?) -> some LanguageModelSession.DynamicProfile` | Sets the tool-calling mode. |
| model(_:) | `func model(_ model: any LanguageModel) -> some LanguageModelSession.DynamicProfile` | Sets the model. |
| temperature(_:) | `func temperature(_ temperature: Double?) -> some LanguageModelSession.DynamicProfile` | Sets the model temperature. |
| samplingMode(_:) | `func samplingMode(_ samplingMode: GenerationOptions.SamplingMode?) -> some LanguageModelSession.DynamicProfile` | Sets the samping mode. |
| reasoningLevel(_:) | `func reasoningLevel(_ reasoningLevel: ContextOptions.ReasoningLevel?) -> some LanguageModelSession.DynamicProfile` | Sets the reasoning level. |
| maximumResponseTokens(_:) | `func maximumResponseTokens(_ maximumResponseTokens: Int?) -> some LanguageModelSession.DynamicProfile` | Sets the maximum response tokens. |
| modifier(_:) | `func modifier<Modifier>(_ modifier: Modifier) -> some LanguageModelSession.DynamicProfile where Modifier : LanguageModelSession.DynamicProfileModifier` | Applies a modifier to the dynamic profile. |
| transcriptErrorHandlingPolicy(_:) | `func transcriptErrorHandlingPolicy(_ transcriptErrorHandlingPolicy: TranscriptErrorHandlingPolicy?) -> some LanguageModelSession.DynamicProfile` | Sets the policy for managing the transcript when errors occur. |

### LanguageModelSession.DynamicProfileBuilder

```swift
@resultBuilder struct DynamicProfileBuilder
```

A type that represents a dynamic profile builder.

| Method | Description |
| --- | --- |
| `buildBlock(_:)` | Creates a builder with a block. |
| `buildEither(first:)` | Creates a builder with the first component. |
| `buildEither(second:)` | Creates a builder with the second component. |
| `buildLimitedAvailability(_:)` | Creates a builder with a limited availability dynamic profile. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+ (`DynamicProfile` and `DynamicProfileBuilder`).
- `DynamicInstructions` declares what content and tools the model sees; `LanguageModelSession.DynamicProfile.Profile` binds that content to how a single configuration runs (model, temperature, reasoning level, and so on).
- A session is created from a dynamic profile with `init(profile:history:)`, or from dynamic instructions with `init(model:dynamicInstructions:history:)` (both listed under "Creating a session with a dynamic profile" in the official pages; see the sessions category for `LanguageModelSession`).
- Official signature text keeps the typo "samping" in the `samplingMode(_:)` abstract.

## Related

- [LanguageModelSession.Profile](./profile.md)
- [LanguageModelSession.DynamicProfileModifier](./dynamic-profile-modifier.md)
- [Dynamic profile helper types](./dynamic-profile-types.md)
- [DynamicInstructions](./dynamic-instructions.md)
