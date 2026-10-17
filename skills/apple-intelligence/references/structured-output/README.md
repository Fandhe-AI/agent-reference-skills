# structured-output

| Name | Description | Path |
|------|-------------|------|
| ConvertibleToGeneratedContent / ConvertibleFromGeneratedContent | Protocol pair for converting a type to and from `GeneratedContent`. `Generable` inherits both. | [convertible-generated-content.md](./convertible-generated-content.md) |
| DynamicGenerationSchema | The dynamic counterpart to the generation schema type that you use to construct schemas at runtime. An individual schema may reference other schemas by name, and references are resolved when converting a set of dynamic schemas into a `GenerationSchema`. | [dynamic-generation-schema.md](./dynamic-generation-schema.md) |
| Generable(description:) macro | Macro that makes a Swift structure or enumeration conform to `Generable`, so the model can respond to a prompt by generating an instance of the type. | [generable-macro.md](./generable-macro.md) |
| Generable | A type that the model uses when responding to prompts. | [generable.md](./generable.md) |
| GeneratedContent | A type that represents structured, generated content. Generated content may contain a single value, an array, or key-value pairs with unique keys. | [generated-content.md](./generated-content.md) |
| GenerationGuide | Guides that control how values are generated. | [generation-guide.md](./generation-guide.md) |
| GenerationID | A unique identifier that is stable for the duration of a response, but not across responses. | [generation-id.md](./generation-id.md) |
| GenerationSchema | A type that describes the properties of an object and any guides on their values. Generation schemas guide the output of a language model to deterministically ensure the output is in the desired format. | [generation-schema.md](./generation-schema.md) |
| Guide(description:) macro | Peer macro applied to a property of a `@Generable` type to describe it in natural language and, optionally, constrain generated values with a `GenerationGuide` or a `Regex`. | [guide-macro.md](./guide-macro.md) |
</content>
