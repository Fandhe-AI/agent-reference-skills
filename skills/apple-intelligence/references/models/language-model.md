---
source: https://developer.apple.com/documentation/foundationmodels/languagemodel
---

# LanguageModel

A protocol that you use to interface with a model.

## Signature / Usage

```swift
protocol LanguageModel : Sendable
```

```swift
// Initialize a session with a custom server model.
let session = LanguageModelSession(model: MyCustomServerLanguageModel())
// Use the same API surface to prompt the model.
let response = try await session.respond(to: "Tell me a joke!")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| capabilities | property | The capabilities of this language model. |
| executorConfiguration | property | A configuration for an executor capable of running this model. |
| Executor | associated type | The executor type that does the work for this model. |
| supportsDataAttachmentType(_:) | method (beta) | Listed under Instance Methods; no abstract on the official page. |
| supportsDataEntryType(_:) | method (beta) | Listed under Instance Methods; no abstract on the official page. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+. `supportsDataAttachmentType(_:)` and `supportsDataEntryType(_:)` are Beta: iOS 27.2+.
- Implement this protocol to bridge a model and the framework. The protocol describes capabilities and configuration; an `Executor` translates framework types into the types your platform expects and streams results back through `LanguageModelExecutorGenerationChannel`. Keep the adopting type intentionally light.
- Distribute a custom provider with Swift Package Manager; developers then initialize a `LanguageModelSession` with your model.
- Distance: this page covers the framework's `LanguageModel` protocol. Third-party conformances such as `ClaudeLanguageModel` are documented in the anthropic-models-sdks skill. Core ML / Core AI model export is covered by apple-ml, and MLX (`MLXLanguageModel`, an external package) by apple-silicon.
- Official "See also" for custom providers: "Running a Core AI model in a Foundation Models session" and "Optimizing key-value caching in language model sessions".

## Related

- [LanguageModelCapabilities](./language-model-capabilities.md)
- [LanguageModelExecutor](./language-model-executor.md)
- [LanguageModelExecutorGenerationChannel](./generation-channel.md)
- [LanguageModelExecutorGenerationRequest](./generation-request.md)
- [SystemLanguageModel](./system-language-model.md)
- [PrivateCloudComputeLanguageModel](./private-cloud-compute-language-model.md)
