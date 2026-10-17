---
source: https://developer.apple.com/documentation/foundationmodels/running-a-core-ai-model-in-a-foundation-models-session
---

# Running a Core AI model in a Foundation Models session

Send requests on device to an open source model you export with Core AI to get a consistent API experience.

## Signature / Usage

```bash
# List the models that the registry supports and their export presets.
uv run coreai.model.registry --list-models
```

```bash
# Export the model for macOS.
uv run coreai.llm.export HF_ID

# Export the same model for iOS.
uv run coreai.llm.export HF_ID --platform iOS
```

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

- Article in the Foundation Models framework (iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+). Running and integrating a Core AI model requires macOS 27, iOS 27, and Xcode 27 or later.
- Reasons to use other on-device models: specialized capabilities, a range of devices that might not support Apple Intelligence, cross-platform support. Only the model passed to `init(model:tools:instructions:)` changes.
- The open-source `coreai-models` Swift package (https://github.com/apple/coreai-models) provides export recipes and utilities, and contains `CoreAILanguageModel`, which conforms to `LanguageModel`. Add it as a package dependency in Xcode (File > Add Package Dependencies) and add `CoreAILM` to your app target.
- Export workflow: open Terminal, install the `uv` package manager, clone the Core AI models repository, change to `coreai-models`, list models with the registry (identifier column `HF_ID`). The export produces a resource folder (an `.aimodel` file with the tokenizer and other resources) that you bundle with the app. A model around 0.6B parameters is suggested as a first choice. Models are specialized to the device they run on, so export per target platform. Each registry model has its own README with the exact recipe.
- Loading is asynchronous because the framework compiles the model and loads the tokenizer before the first request; load ahead of time when a request is at least a second or two away (see "Compiling Core AI models ahead of time" in the Core AI documentation).
- After session creation the API is identical regardless of model: `respond(to:options:)`, streaming, tools, and instructions carry over.
- Reasoning models: Core AI routes chain-of-thought into the transcript as `Transcript.Entry.reasoning(_:)`, not into the response content. Whether and how much a model reasons depends on the exported model; inspect `capabilities`.
- Core AI selects an inference engine automatically (GPU, CPU, or Apple Neural Engine, depending on export). Measure with the Foundation Models instrument.
- Core AI model export and the `.aimodel` format are covered by apple-ml (Core ML / Core AI export); MLX-based models (`MLXLanguageModel`) are covered by apple-silicon. This page covers only running such a model in a Foundation Models session.

## Related

- [LanguageModel](../models/language-model.md)
- [LanguageModelExecutor](../models/language-model-executor.md)
- [LanguageModelCapabilities](../models/language-model-capabilities.md)
- [Optimizing key-value caching in language model sessions](./kv-caching.md)
- [Analyzing the runtime performance of your Foundation Models app](./runtime-performance.md)
