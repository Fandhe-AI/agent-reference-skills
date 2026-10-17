---
source: https://developer.apple.com/documentation/foundationmodels/generable
---

# Generable

A type that the model uses when responding to prompts.

## Signature / Usage

```swift
protocol Generable : ConvertibleFromGeneratedContent, ConvertibleToGeneratedContent
```

Annotate your Swift structure or enumeration with the `@Generable` macro to allow the model to respond to prompts by generating an instance of your type. Use the `@Guide` macro to provide natural language descriptions of your properties, and programmatically control the values that the model can generate.

```swift
@Generable
struct SearchSuggestions {
    @Guide(description: "A list of suggested search terms.", .count(4))
    var searchTerms: [SearchTerm]
    @Generable
    struct SearchTerm {
        // Use a generation identifier for data structures the framework generates.
        var id: GenerationID
        @Guide(description: "A two- or three- word search term, like 'Beautiful sunsets'.")
        var searchTerm: String
    }
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| generationSchema | `static var generationSchema: GenerationSchema { get }` | An instance of the generation schema. |
| PartiallyGenerated | `associatedtype PartiallyGenerated : ConvertibleFromGeneratedContent = Self` | A representation of partially generated content. |
| asPartiallyGenerated() | `func asPartiallyGenerated() -> Self.PartiallyGenerated` | Returns the partially generated representation of the current instance. |

## Notes

- Availability: iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+, watchOS 27.0+.
- For every `Generable` type in a request, the framework converts its type and format information to a JSON schema and provides it to the model. This contributes to the available context window size. If the `LanguageModelSession` exceeds the available context size, it throws `LanguageModelError.contextSizeExceeded(_:)`.
- To reduce the size of your generable type: reduce the complexity by evaluating whether properties are necessary; give properties short and clear names; use `Guide(description:)` only when it improves response quality; add a `Guide(description:_:)` with `maximumCount(_:)` to reduce token usage.
- If the type has properties with clear names the model may have all it needs, eliminating the need of `Guide(description:)`.
- Distinct from cloud API structured outputs and tool-calling schemas (openai-api-core, openai-agents, anthropic-api-tools-mcp); this is the on-device Foundation Models guided-generation protocol.
- Source fetched 2026-10-16 (no version in URL).

## Related

- [Generable(description:) macro](./generable-macro.md)
- [Guide(description:) macro](./guide-macro.md)
- [GenerationGuide](./generation-guide.md)
- [GenerationSchema](./generation-schema.md)
- [GeneratedContent](./generated-content.md)
- [GenerationID](./generation-id.md)
- [ConvertibleToGeneratedContent / ConvertibleFromGeneratedContent](./convertible-generated-content.md)
- [Managing the context window](../guides/managing-the-context-window.md)
