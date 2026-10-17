---
source: https://developer.apple.com/documentation/foundationmodels/prompt, https://developer.apple.com/documentation/foundationmodels/promptbuilder, https://developer.apple.com/documentation/foundationmodels/promptrepresentable
---

# Prompt

A prompt from a person to the model.

## Signature / Usage

### Prompt

```swift
struct Prompt
```

```swift
let prompt = Prompt("What are miniature schnauzers known for?")
```

Use `PromptBuilder` to control the content dynamically:

```swift
let responseShouldRhyme = true
let prompt = Prompt {
    "Answer the following question: Do Siberian Huskies love cold weather?"
    if responseShouldRhyme {
        "Your response MUST rhyme!"
    }
}
```

### PromptBuilder

```swift
@resultBuilder struct PromptBuilder
```

### PromptRepresentable

```swift
protocol PromptRepresentable
```

```swift
struct FamousHistoricalFigure: PromptRepresentable {
    var name: String
    var biggestAccomplishment: String

    var promptRepresentation: Prompt {
        """
        Famous Historical Figure:
        - name: \(name)
        - best known for: \(biggestAccomplishment)
        """
    }
}

let response = try await LanguageModelSession().respond {
    "Tell me more about..."
    FamousHistoricalFigure(
        name: "Albert Einstein",
        biggestAccomplishment: "Theory of Relativity"
    )
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `Prompt.init(_:)` | Creates a prompt from the content of a builder closure. |
| `PromptBuilder.buildArray(_:)` | Creates a builder with an array of prompts. |
| `PromptBuilder.buildBlock(_:)` | Creates a builder with a block. |
| `PromptBuilder.buildEither(first:)` / `buildEither(second:)` | Creates a builder with the first / second component. |
| `PromptBuilder.buildExpression(_:)` | Creates a builder with a prompt expression. |
| `PromptBuilder.buildLimitedAvailability(_:)` | Creates a builder with a limited availability prompt. |
| `PromptBuilder.buildOptional(_:)` | Creates a builder with an optional component. |
| `PromptRepresentable.promptRepresentation` | An instance that represents a prompt. |

## Notes

- Availability (all three types): iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+, watchOS 27.0+.
- If your prompt includes input from people, consider wrapping the input in a string template with your own prompt to better steer the model's response.
- Prompting the same session eventually exceeds the context window size. You can recover from this error by removing entries from the transcript and trying again.
- Conformance to `PromptRepresentable` is provided automatically by the `@Generable` macro; you should not override its implementations (overriding may negatively impact runtime performance and cause bugs). For types that are not `Generable`, you may provide your own implementation.

## Related

- [LanguageModelSession](./languagemodelsession.md)
- [Instructions](./instructions.md)
- [GenerationOptions](./generation-options.md)
