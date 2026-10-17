---
source: https://developer.apple.com/documentation/foundationmodels/composing-dynamic-sessions-with-instructions-and-profiles, https://developer.apple.com/documentation/foundationmodels/origami-crafting-a-dynamic-tutorial-for-apple-intelligence
---

# Dynamic Profile Session

Declare `DynamicInstructions`, switch configuration with a `LanguageModelSession.DynamicProfile`, and react to life cycle events.

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
```

```swift
let session = LanguageModelSession(
    dynamicInstructions: PresentationInstructions()
)
```

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
```

```swift
let session = LanguageModelSession(
    profile: PresentationProfile()
)
```

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

The Origami sample orchestrates three modes with one long-lived session:

```swift
struct OrchestratorProfile: LanguageModelSession.DynamicProfile {
    var orchestrator: Orchestrator

    // Swap to PrivateCloudComputeLanguageModel() to opt into PCC.
    var serverModel = SystemLanguageModel()

    var body: some DynamicProfile {
        switch orchestrator.mode {
        case .brainstorm:
            Profile {
                BrainstormInstructions(orchestrator: orchestrator)
            }
            .model(serverModel)
            .temperature(1.0)

        case .tutorial:
            if !isOnDevice {
                Profile {
                    TutorialInstructions(orchestrator: orchestrator)
                }
                .model(serverModel)
                .reasoningLevel(.deep)
            } else {
                Profile {
                    TutorialInstructions(orchestrator: orchestrator)
                }
                .model(SystemLanguageModel())
            }

        case .term:
            Profile {
                TermInstructions(orchestrator: orchestrator)
            }
            .model(SystemLanguageModel())
        }
    }

    private var isOnDevice: Bool {
        type(of: serverModel) == SystemLanguageModel.self
    }
}
```

## Notes

- iOS 27.0+, iPadOS 27.0+, macOS 27.0+, Mac Catalyst 27.0+, visionOS 27.0+, Xcode 27.0+ (Origami sample-code page).
- `body` of dynamic instructions re-evaluates before every model request. Use expressions (`if` / `else`, `switch`) so exactly one `Profile` is active at a time.
- Modifier precedence, highest first: call-site `GenerationOptions`, innermost dynamic profile or profile modifier, then outer dynamic profile modifiers. Life cycle callbacks accumulate across nested profiles.
- Append conditional instructions and tools in place to benefit from key-value caching (see `kv-caching.md`).
- Origami runs on the on-device `SystemLanguageModel` by default; routing through `PrivateCloudComputeLanguageModel` also needs the managed PCC entitlement.
