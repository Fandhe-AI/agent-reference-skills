---
source: https://developer.apple.com/documentation/foundationmodels/composing-dynamic-sessions-with-instructions-and-profiles
---

# Composing dynamic sessions with instructions and profiles

Adapt sessions dynamically at runtime by loading instructions and tools based on the state of your app.

## Signature / Usage

```swift
struct PresentationInstructions: DynamicInstructions {
    // The data source for conditional instructions.
    var isEditingImage = true
    var isEditingAnimation = false

    var body: some DynamicInstructions {
        // The instructions and tools that remain the same across any use of this type.
        Instructions {
            "Help people improve their presentation."
        }
        ListPhotosTool()
        AddPhotoTool()

        // Depending on the state of the app, include additional instructions
        // that provide the model with more task-specific instructions and tools.
        if isEditingImage {
            ImageEditingInstructions()
        }
        
        if isEditingAnimation {
            AnimationEditingInstructions()
        }
    }
}

let session = LanguageModelSession(
    dynamicInstructions: PresentationInstructions()
)
```

Orchestrating profiles with a dynamic profile:

```swift
struct PresentationProfile: LanguageModelSession.DynamicProfile {
    // Create an instance to the server model.
    var pccModel = PrivateCloudComputeLanguageModel()
    
    // The data source for the profile.
    var isEditingImage = true
    var isEditingAnimation = false

    // Determine which profile to load based on the current state.
    var body: some LanguageModelSession.DynamicProfile {
        if isEditingImage {
            Profile {
                ImageEditingInstructions()
            }
        } else if isEditingAnimation {
            Profile {
                AnimationEditingInstructions()
            }
            .model(pccModel)
            .temperature(0.2)
            .reasoningLevel(.light)
        } else {
            Profile {
                PresentationDynamicInstructions()
            }
            .temperature(0.8)
        }
    }
}

let session = LanguageModelSession(
    profile: PresentationProfile()
)
```

Life cycle modifiers as validation checkpoints:

```swift
Profile {
    MyCustomFileAccessInstructions()
    MyCustomReadFileTool()
}
.onToolCall { toolCall in
    // Runs before the framework invokes the tool and allows for checking 
    // whether the app is in a state to run the tool.
    guard myAccessPolicy.permits(toolCall) else {
        throw MyAccessPolicyError.denied(toolCall.toolName)
    }
}
.onToolOutput {
    // Runs after the tool. This is a good place to log any necessary activity.
}
```

Session properties:

```swift
extension SessionPropertyValues {
    @SessionPropertyEntry 
    var activatedSkills: [String: Bool] = [:]
}

struct PlannerTool: Tool {
    let description = "Update the state of the activated skills"
    
    // Read the shared session state for the currently activated skills.
    @SessionProperty(\.activatedSkills) 
    var activatedSkills

    @Generable
    struct Arguments {
        @Guide(description: "The skills to activate")
        var skills: [String]
    }

    func call(arguments: Arguments) -> String {
        // When the model calls this tool, update the skills to an active state.
        for skill in arguments.skills {
            activatedSkills[skill] = true
        }
        return "Activated: \(arguments.skills.joined(separator: ", "))"
    }
}
```

Custom modifier and history transform:

```swift
struct DebugProfileModifier: LanguageModelSession.DynamicProfileModifier {
    func body(content: Content) -> some LanguageModelSession.DynamicProfile {
        content
            .temperature(0.0)
            .onResponse { response in
                print("Debug response: \(response)")
            }
    }
}

extension LanguageModelSession.DynamicProfile {
    func debug() -> some LanguageModelSession.DynamicProfile {
        self.modifier(DebugProfileModifier())
    }
}
```

```swift
Profile {
    Instructions("You help people generate fun and interesting book ideas.")
    MyCustomBookTool()
}
.historyTransform { history in
    // Perform a local transformation before prompting the model. This transform
    // doesn't affect the global state of the transcript, so you're not losing
    // existing transcript context.
    Array(history.suffix(20))
}
```

## Options / Props

Life cycle modifiers (callbacks accumulate across nested profiles; when both a profile and a subprofile register one, the framework calls both):

| Modifier | Description |
|----------|-------------|
| onActivate(perform:) | Runs when the profile becomes active and allows for set up work. |
| onDeactivate(perform:) | Runs when the profile becomes inactive and allows for teardown work. |
| onPrompt(perform:) | Runs after the user prompt appends to the transcript, but before the model request starts. |
| onResponse(perform:) | Runs after the model produces a response. |
| onToolCall(perform:) | Runs when the model invokes a tool. |
| onToolOutput(perform:) | Runs when a tool call produces output. |

## Notes

- Article in the Foundation Models framework (iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+). The dynamic profiles and dynamic instructions APIs are 27.0+ (see the dynamic-profiles category).
- By default a session evaluates instructions on initialization and they stay static. Dynamic profiles let instructions, tools, and model configuration change with the app state. The body of dynamic instructions re-evaluates before each model call, so the model always sees a snapshot of current state. Use only the instructions and tools necessary, since the body evaluates before every request.
- Three composable layers are introduced (`DynamicInstructions`, `LanguageModelSession.Profile`, `LanguageModelSession.DynamicProfile`); the official page lists them in a term list not preserved in the source text used here.
- Pass dynamic instructions with `init(model:dynamicInstructions:history:)` and a dynamic profile with `init(profile:history:)`.
- When conditionally providing instructions and tools, append them in place to improve latency from model caching (see the key-value caching guide).
- `Profile` associates `DynamicInstructions` with session-level properties; parameterize model, temperature, and reasoning level (`.model(_:)`, `.temperature(_:)`, `.reasoningLevel(_:)`).
- `DynamicProfileBuilder` enforces at compile time that exactly one `Profile` is active at a time; use expressions (`if` / `else`, `switch`) rather than parallel `if` blocks. When the active profile changes, the session adopts the new model and generation options on the next model request.
- Modifier precedence (highest to lowest): call-site arguments passed to `respond(to:options:)`; innermost dynamic profile or profile modifier (closest to the subprofile declaration); dynamic profile modifiers as defaults for all subprofiles.
- Throwing an error inside a life cycle callback propagates to the caller's `respond(to:options:)` or `streamResponse(to:options:)`.
- `@SessionProperty(\.history)` accesses session history (transcript entries after instructions; excludes `DynamicInstructions` segments), allowing compaction and summarization. History is read-only inside `DynamicInstructions` and `Tool`, because model output influences their evaluation.
- The life cycle snippets above are verbatim from the article, but they disagree with the declared API: `onToolCall(perform:)` and `onResponse(perform:)` take a `() async throws -> Void` closure with no parameter (see the dynamic-profiles category). The `toolCall in` / `response in` forms do not match these declarations; check the tool-call information against the shipping SDK.
- Define custom session properties with the `SessionPropertyEntry()` macro in an extension on `SessionPropertyValues`.
- `historyTransform(_:)` filters entries sent for a request without changing the global transcript; each profile can manage its own view of the history (for example compress for a small on-device model while a server model with a larger context gets the full history).

## Related

- [DynamicInstructions](../dynamic-profiles/dynamic-instructions.md)
- [LanguageModelSession.DynamicProfile](../dynamic-profiles/dynamic-profile.md)
- [LanguageModelSession.Profile](../dynamic-profiles/profile.md)
- [LanguageModelSession.DynamicProfileModifier](../dynamic-profiles/dynamic-profile-modifier.md)
- [Optimizing key-value caching in language model sessions](./kv-caching.md)
