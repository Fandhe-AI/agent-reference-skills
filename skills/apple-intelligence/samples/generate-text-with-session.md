---
source: https://developer.apple.com/documentation/foundationmodels/generating-content-and-performing-tasks-with-foundation-models
---

# Generate Text with a Session

Create a `LanguageModelSession` with instructions, send a prompt, and tune the request with `GenerationOptions`.

```swift
let instructions = """
    Suggest five related topics. Keep them concise (three to seven words) and make sure they \
    build naturally from the person's topic.
    """

let session = LanguageModelSession(instructions: instructions)

let prompt = "Making homemade bread"
let response = try await session.respond(to: prompt)
```

```swift
// Customize the temperature to increase creativity.
let options = GenerationOptions(temperature: 1.0)

let session = LanguageModelSession()

let prompt = "Write me a story about coffee."
let response = try await session.respond(
    to: prompt,
    options: options
)
```

## Notes

- iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+.
- For a single-turn interaction create a new session each call; for multiturn interaction reuse the same session.
- A session handles one request at a time; calling it again before the previous request finishes causes a runtime error. Check `isResponding` first.
- The system model supports up to 4,096 tokens per session (instructions, prompts, and outputs all count); exceeding it throws `LanguageModelError.contextSizeExceeded(_:)`.
