---
source: https://developer.apple.com/documentation/foundationmodels/instructions, https://developer.apple.com/documentation/foundationmodels/instructionsbuilder, https://developer.apple.com/documentation/foundationmodels/instructionsrepresentable
---

# Instructions

Details you provide that define the model's intended behavior on prompts.

## Signature / Usage

### Instructions

```swift
struct Instructions
```

```swift
let instructions = """
    Suggest related topics. Keep them concise (three to seven words) and make sure they \
    build naturally from the person's topic.
    """

let session = LanguageModelSession(instructions: instructions)

let prompt = "Making homemade bread"
let response = try await session.respond(to: prompt)
```

### InstructionsBuilder

```swift
@resultBuilder struct InstructionsBuilder
```

### InstructionsRepresentable

```swift
protocol InstructionsRepresentable
```

## Options / Props

| Name | Description |
|------|-------------|
| `Instructions.init(_:)` | Creates instructions from the content of a builder closure. |
| `InstructionsBuilder.buildArray(_:)` | Creates a builder with an array of instructions. |
| `InstructionsBuilder.buildBlock(_:)` | Creates a builder with a block. |
| `InstructionsBuilder.buildEither(first:)` / `buildEither(second:)` | Creates a builder with the first / second component. |
| `InstructionsBuilder.buildExpression(_:)` | Creates a builder with an instructions expression. |
| `InstructionsBuilder.buildLimitedAvailability(_:)` | Creates a builder with limited availability instructions. |
| `InstructionsBuilder.buildOptional(_:)` | Creates a builder with an optional component. |
| `InstructionsRepresentable.instructionsRepresentation` | An instance that represents the instructions. |

## Notes

- Availability (all three types): iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+, watchOS 27.0+.
- Don't include untrusted content in instructions: the model is typically trained to obey instructions over any commands it receives in prompts.
- All input to the model (Instructions, Prompt, Tool, and Generable types, and the model's responses) contributes tokens to the session's context window; exceeding it throws `LanguageModelError.contextSizeExceeded(_:)`.
- To reduce instruction size: write shorter instructions, provide only the information necessary, use concise and imperative language, aim for one to three paragraphs.

## Related

- [LanguageModelSession](./languagemodelsession.md)
- [Prompt](./prompt.md)
- [GenerationOptions](./generation-options.md)
