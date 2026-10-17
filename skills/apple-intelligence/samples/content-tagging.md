---
source: https://developer.apple.com/documentation/foundationmodels/categorizing-and-organizing-data-with-content-tags
---

# Content Tagging

Use the content tagging use case of `SystemLanguageModel` with a `@Generable` result type to extract topics, actions, objects, and emotions.

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
// Create an instance of the model with the content tagging use case.
let model = SystemLanguageModel(useCase: .contentTagging)


// Initialize a session with the model.
let session = LanguageModelSession(model: model)
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

Alternatively, steer the tags with instructions:

```swift
// Create an instance of the on-device language model's content tagging use case.
let model = SystemLanguageModel(useCase: .contentTagging)

// Initialize a session with the model and instructions.
let session = LanguageModelSession(model: model, instructions: """
    Provide the two tags that are most significant in the context of topics.
    """
)
```

## Notes

- The content tagging model groups and evaluates the input rather than answering it; asking it questions produces tags about asking questions.
- Match the count in instructions with `maximumCount(_:)`; if they differ, put the larger maximum in the instructions. A `Generable` type with guides saves context window space compared with custom instructions.
- For tags that are not actions, objects, emotions, or topics (for example hashtags), use the `.general` use case instead.
- Duplicate tags can occur across lists (for example humor); handle duplicates in code. Reusing a session may produce tags related to previous turns.
