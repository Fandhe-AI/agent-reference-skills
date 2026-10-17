---
source: https://developer.apple.com/documentation/foundationmodels/categorizing-and-organizing-data-with-content-tags
---

# Categorizing and organizing data with content tags

Identify topics, actions, objects, and emotions in input text with a content tagging model.

## Signature / Usage

```swift
// Create an instance of the on-device language model's content tagging use case.
let model = SystemLanguageModel(useCase: .contentTagging)

// Initialize a session with the model and instructions.
let session = LanguageModelSession(model: model, instructions: """
    Provide the two tags that are most significant in the context of topics.
    """
)
```

```swift
@Generable
struct ContentTaggingResult {
    @Guide(
        description: "Most important actions in the input text.",
        .maximumCount(2)
    )
    let actions: [String]

    @Guide(
        description: "Most important emotions in the input text.",
        .maximumCount(3)
    )
    let emotions: [String]

    @Guide(
        description: "Most important objects in the input text.",
        .maximumCount(5)
    )
    let objects: [String]

    @Guide(
        description: "Most important topics in the input text.",
        .maximumCount(2)
    )
    let topics: [String]
}
```

```swift
let prompt = """
    Today we had a lovely picnic with friends at the beach.
    """
let response = try await session.respond(
    to: prompt,
    generating: ContentTaggingResult.self
)
```

## Notes

- Article in the Foundation Models framework (iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+).
- The framework provides an adapted on-device system language model specialized in content tagging (`SystemLanguageModel(useCase: .contentTagging)`). Each tag uses one to a few lowercase words, and tags are semantically consistent (for example "hi", "hello", and "yo" produce the topic tag "greet").
- Use cases: statistics about popular topics, matching tags to interests, email autolabeling, aggregating tags to identify trends.
- For content that is not an action, object, emotion, or topic (for example social media hashtags), or for complex tagging constraints beyond `maximumCount`, use the `general` use case. If you adopt tool calling and want tags, use `general` and pass the `Tool` output to the content tagging model.
- The tagging model is not a typical chat model: it evaluates and groups the input (asking a question produces tags about asking questions). Instructions give a more precise outcome than instructions in the prompt; state the tag types and count wanted.
- With a `Generable` type using `GenerationGuide`, you can skip custom instructions and save context window space. Without generation guides the model generates topic-related tags by default.
- For very short input queries, topic and emotion tagging instructions give the best results; action and object lists are too specific and may repeat the query words.
- Match the maximum count in your instructions with `maximumCount(_:)`; if they differ, put the larger maximum in the instructions. Define a maximum for long queries to limit tags, avoid duplicates, and improve decoding time.
- Topic and emotion tags may overlap (for example humor); handle duplicates in code. Reusing the same session may produce tags related to a previous turn or a combination of turns.

## Related

- [Supporting languages and locales with Foundation Models](./languages-and-locales.md)
- [Generating Swift data structures with guided generation](./guided-generation.md)
