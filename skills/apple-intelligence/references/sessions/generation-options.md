---
source: https://developer.apple.com/documentation/foundationmodels/generationoptions, https://developer.apple.com/documentation/foundationmodels/generationoptions/samplingmode-swift.struct
---

# GenerationOptions

Options that control how the model generates its response to a prompt.

## Signature / Usage

```swift
struct GenerationOptions
```

```swift
struct SamplingMode
```

## Options / Props

### GenerationOptions

| Name | Type | Description |
|------|------|-------------|
| temperature | `Double?` | A value that influences the confidence of the model's response. |
| samplingMode | `GenerationOptions.SamplingMode?` | A sampling strategy for how the model picks tokens when generating a response. |
| toolCallingMode | `GenerationOptions.ToolCallingMode?` | The tool calling requirements. |
| maximumResponseTokens | `Int?` | The maximum number of tokens the model is allowed to produce in its response. |
| sampling | `GenerationOptions.SamplingMode?` | Deprecated. A sampling strategy for how the model picks tokens when generating a response. |

Initializers: `init(samplingMode:temperature:maximumResponseTokens:)`, `init(samplingMode:temperature:maximumResponseTokens:toolCallingMode:)`, and the deprecated `init(sampling:temperature:maximumResponseTokens:)`.

### GenerationOptions.SamplingMode

| Name | Description |
|------|-------------|
| `greedy` | A sampling mode that always chooses the most likely token. |
| `random(probabilityThreshold:seed:)` | A mode that considers a variable number of high-probability tokens based on the specified threshold. |
| `random(top:seed:)` | A sampling mode that considers a fixed number of high-probability tokens. |
| `kind` | The strategy this sampling mode uses to choose the next token (`GenerationOptions.SamplingMode.Kind`). |

## Notes

- Availability: iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+, watchOS 27.0+.
- Only use `maximumResponseTokens` when you need to protect against unexpectedly verbose responses. Enforcing a strict token response limit can lead to the model producing malformed results or grammatically incorrect responses.
- When a property is `nil`, the framework defers to the underlying `LanguageModel` to select an appropriate value. Each model, and each version of a given model, may pick a different default, and the framework doesn't guarantee a specific value or that the value remains stable across OS or model updates.
- A model builds its response in a loop; at each iteration it produces a probability distribution over its vocabulary. The sampling mode controls how a token is selected from that distribution.
- `sampling` and `init(sampling:temperature:maximumResponseTokens:)` are marked deprecated; use `samplingMode`.

## Related

- [LanguageModelSession](./languagemodelsession.md)
- [ContextOptions](./context-options.md)
- [Prompt](./prompt.md)
