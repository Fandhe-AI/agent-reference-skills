---
source: https://developer.apple.com/documentation/foundationmodels/generating-content-and-performing-tasks-with-foundation-models
---

# Generating content and performing tasks with Foundation Models

Enhance the experience in your app by prompting an on-device large language model.

## Signature / Usage

```swift
struct GenerativeView: View {
    // Create a reference to the system language model.
    private var model = SystemLanguageModel.default

    var body: some View {
        switch model.availability {
        case .available:
            // Show your intelligence UI.
        case .unavailable(.deviceNotEligible):
            // Show an alternative UI.
        case .unavailable(.modelNotReady):
            // The model isn't ready because it's downloading or because of other system reasons.
        case .unavailable(let other):
            // The model is unavailable for an unknown reason.
        }
    }
}
```

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

## Options / Props

On-device model capabilities listed in the article:

| Capability | Prompt example |
|------------|----------------|
| Summarize | "Summarize this article." |
| Extract entities | "List the people and places mentioned in this text." |
| Understand text | "What happens to the dog in this story?" |
| Refine or edit text | "Change this story to be in second person." |
| Classify or judge text | "Is this text relevant to the topic 'Swift'?" |
| Compose creative writing | "Generate a short bedtime story about a fox." |
| Generate tags from text | "Provide two tags that describe the main topics of this text." |
| Generate game dialog | "Respond in the voice of a friendly inn keeper." |

Capabilities to avoid:

| Capability | Prompt example |
|------------|----------------|
| Do basic math | "How many b's are there in bagel?" |
| Create code | "Generate a Swift navigation list." |
| Perform logical reasoning | "If I'm at Apple Park facing Canada, what direction is Texas?" |

## Notes

- Article in the Foundation Models framework (iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+).
- Always verify model availability first (`SystemLanguageModel.default`) and plan a fallback experience. It can take some time for the model to download after a person turns on Apple Intelligence.
- For a single-turn interaction create a new session each call; for multiturn interaction reuse the same session.
- Prompts: use conversational language as a question or command, focus on a single specific task, and state the desired length (for example "using three sentences"). Break complex tasks into a series of specific prompts.
- Instructions have higher priority than prompts. Specify the model's role, what it should do, style preferences, and safety measures. Use only trusted content in instructions.
- A session can only handle a single request at a time and causes a runtime error if called again before the previous request finishes. Check `isResponding`.
- Context window: the system model supports up to 4,096 tokens per session; the sum of instructions, all prompts, and all outputs counts. Exceeding it throws `LanguageModelError.contextSizeExceeded(_:)`; remove entries from the transcript and retry, or split data across sessions.
- Use Xcode Instruments to inspect request timing; `Transcript` entries describe the actions the model takes.

## Related

- [Prompting an on-device foundation model](./prompting.md)
- [Managing the context window](./managing-the-context-window.md)
- [Generating Swift data structures with guided generation](./guided-generation.md)
- [Expanding generation with tool calling](./tool-calling.md)
