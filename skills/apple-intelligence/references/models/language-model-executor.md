---
source: https://developer.apple.com/documentation/foundationmodels/languagemodelexecutor
---

# LanguageModelExecutor

A protocol that defines the interface for responding to session requests.

## Signature / Usage

```swift
protocol LanguageModelExecutor : Sendable
```

```swift
// Parse generation and context options
func respond(
    to request: LanguageModelExecutorGenerationRequest,
    model: MyLanguageModel,
    streamingInto channel: LanguageModelExecutorGenerationChannel
) async throws {

    // The request includes a sampling set to `greedy`, but your
    // model only uses temperature.
    if request.generationOptions.samplingMode == .greedy {
        // Use the temperature of `0` to approximate the intention.
    }

    // ...
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| init(configuration:) | initializer | Creates an executor from a configuration. |
| Configuration | associated type | The configuration the model provides for instantiating the executor. |
| Model | associated type | The model type this executor processes requests for. |
| prewarm(model:transcript:) | method | Loads assets into memory or pre-fills caches ahead of a request. |
| respond(to:model:streamingInto:) | method | Creates a response stream containing deltas. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- An executor is the bridge between the framework types and the system that actually generates the tokens, like a server API or a local inference engine. A `LanguageModel` pairs with exactly one executor type, and the framework instantiates the executor from the `Configuration` the model provides.
- In `respond(to:model:streamingInto:)`, convert the transcript into the format your model expects and apply generation options, falling back when the model can't do exactly what was asked (for example, using temperature to approximate sampling options).
- Stream incremental events through `LanguageModelExecutorGenerationChannel`. You don't return a value or close the channel explicitly; it finishes when the method returns or an error is thrown.
- Distance: for running Core AI / Core ML models see apple-ml; for MLX-backed models see apple-silicon. This page covers only the executor protocol.

## Related

- [LanguageModel](./language-model.md)
- [LanguageModelExecutorGenerationChannel](./generation-channel.md)
- [LanguageModelExecutorGenerationRequest](./generation-request.md)
