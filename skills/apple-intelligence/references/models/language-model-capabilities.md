---
source: https://developer.apple.com/documentation/foundationmodels/languagemodelcapabilities
---

# LanguageModelCapabilities

A set of capabilities that a language model provides.

## Signature / Usage

```swift
struct LanguageModelCapabilities
```

```swift
struct MyLanguageModel: LanguageModel {
    var capabilities: LanguageModelCapabilities {
        LanguageModelCapabilities([
            .toolCalling,
            .guidedGeneration,
            .reasoning
        ])
    }
}
```

```swift
// Before prompting the model with a generable type, check whether it
// supports guided generation.
if selectedModel.capabilities.contains(.guidedGeneration) {
    let response = try await session.respond(to: "...", generating: MySchema.self)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| init(_:) | initializer | Creates a capabilities instance from a list of supported capabilities. |
| contains(_:) | method | Returns a Boolean value that indicates whether the specified capability is supported. |
| Capability.guidedGeneration | static property | The capability to ensure model output conforms to a given generation schema. |
| Capability.reasoning | static property | The capability to reason, structurally separately from producing a response. |
| Capability.toolCalling | static property | The capability to call tools to gather information or trigger side effects. |
| Capability.vision | static property | The capability to accept image inputs in prompts. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- When a model doesn't support a capability, the framework can refuse to dispatch incompatible requests to the executor and throw `LanguageModelError.unsupportedCapability(_:)` instead.

## Related

- [LanguageModel](./language-model.md)
- [LanguageModelError](./language-model-error.md)
