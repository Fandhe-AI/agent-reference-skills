---
source: https://developer.apple.com/documentation/foundationmodels/running-a-core-ai-model-in-a-foundation-models-session
---

# Core AI Model Session

Export an open source model with Core AI, load it with `CoreAILanguageModel`, and run it through a `LanguageModelSession`.

```swift
import FoundationModels
import CoreAILanguageModels

// Locate the Core AI resource folder you export and bundle it with your app.
guard let modelURL = Bundle.main.url(forResource: "The model name",
                                     withExtension: nil) { 
    // Handle the missing resource. 
}

// Load the model and create a session that runs requests through it.
let model = try await CoreAILanguageModel(resourcesAt: modelURL)
let session = LanguageModelSession(model: model)
```

```swift
// Prompt the Core AI model exactly as you would the built-in models.
let meetingTranscript = ""
let response = try await session.respond(
    to: "Summarize the key points from this meeting transcript: \(meetingTranscript)."
)
```

```swift
if model.capabilities.contains(.reasoning) {
    // The model supports reasoning.
}
```

## Notes

- Requires macOS 27, iOS 27, and Xcode 27 or later.
- `CoreAILanguageModel` comes from the open-source `coreai-models` Swift package (not part of the Foundation Models framework) and conforms to `LanguageModel`; only the model passed to the session changes.
- Reasoning output is routed into the transcript as a `Transcript.Entry.reasoning(_:)` segment, not into the response content.
- Core AI model export and the Core AI runtime are covered by the apple-ml skill, and MLX-based `MLXLanguageModel` (`mlx-swift-lm`) by the apple-silicon skill; this skill covers only the `LanguageModelSession` side.
- The export commands are in `../scripts/core-ai-model-export.md`.
