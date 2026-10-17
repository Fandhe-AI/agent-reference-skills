---
source: https://developer.apple.com/documentation/foundationmodels/contextoptions, https://developer.apple.com/documentation/foundationmodels/contextoptions/reasoninglevel-swift.enum
---

# ContextOptions

Options that configure details that should appear in the prompt.

## Signature / Usage

```swift
struct ContextOptions
```

```swift
enum ReasoningLevel
```

## Options / Props

### ContextOptions

| Name | Type | Description |
|------|------|-------------|
| includeSchemaInPrompt | `Bool?` | A Boolean value that indicates whether to inject the schema into the prompt to bias the model. |
| reasoningLevel | `ContextOptions.ReasoningLevel?` | A value that controls the amount of reasoning the model is allowed to output before producing a response. |

Initializer: `init(includeSchemaInPrompt:reasoningLevel:)` creates options that control how the model is prompted.

### ContextOptions.ReasoningLevel

| Case | Description |
|------|-------------|
| `deep` | A level that indicates deep reasoning that's good for more analysis over a request. |
| `light` | A level that indicates light reasoning that's good for quick responses. |
| `moderate` | A level that indicates a moderate amount of reasoning. |
| `custom(_:)` | A custom level not represented by the other cases. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- Create a `ContextOptions` structure when you need to bias the model's behavior by adjusting how the model receives your prompt. Passed through the `contextOptions:` parameter of the `respond` / `streamResponse` overloads.
- When a property is `nil`, the framework defers to the underlying `LanguageModel` to select an appropriate value. Each model, and each version of a given model, may pick a different default, and the framework doesn't guarantee a specific value or that the value remains stable across OS or model updates.

## Related

- [LanguageModelSession](./languagemodelsession.md)
- [GenerationOptions](./generation-options.md)
