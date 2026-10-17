---
source: https://developer.apple.com/documentation/foundationmodels/managing-the-context-window
---

# Managing the context window

Optimize your app's token usage when prompting a model with the Foundation Models framework.

## Signature / Usage

```swift
do {
    // Perform a request that exceeds the context window.
    let response = try await session.respond(to: prompt)
} catch LanguageModelError.contextSizeExceeded(let context) {
    // Handle exceeding the context window size by creating a new session.
} catch {
    // Handle other errors that are thrown.
}
```

```swift
func newContextualSession(with originalSession: LanguageModelSession) -> LanguageModelSession {
    let allEntries = originalSession.transcript
    let condensedEntries = [allEntries.first, allEntries.last].compactMap { $0 }
    let condensedTranscript = Transcript(entries: condensedEntries)
    let newSession = LanguageModelSession(transcript: condensedTranscript)
    newSession.prewarm()
    return newSession
}
```

Limiting a Generable array and keeping types simple:

```swift
@Generable 
struct GameSettings {
    @Guide(.minimumCount(1), .maximumCount(20))
    @Guide(description: "Keyboard shortcuts for desktop")
    var keyboardShortcuts: [String]
}
```

Splitting a large task across sessions:

```swift
let chunks: [String] = // Split a long article into separate chunks.
var chunkSummaries: [String] = []

// Use a separate session to summarize each chunk.
for (index, chunk) in chunks.enumerated() {
    
    let session = LanguageModelSession()
    var prompt = """
        Summarize this section of an article:
        
        \(chunk)
        """

    // Include the previous summary to maintain continuity.
    if index > 0 {
        prompt = """
        Previous section summary: \(chunkSummaries[index - 1])

        \(prompt)
        """
    }

    // Perform the request and track the response.
    let response = try await session.respond(to: prompt)
    chunkSummaries.append(response.content)
}

// Combine all chunk summaries in a final session.
let finalSession = LanguageModelSession()
let combined = chunkSummaries.joined(separator: "\n")

let prompt = """
    Combine these section summaries into one cohesive summary:

    \(combined)
    """

// Perform the request to get the final summary.
let finalSummary = try await finalSession.respond(to: prompt).content
```

## Notes

- Article in the Foundation Models framework (iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+).
- Apple's on-device foundation model has a context window of 4096 tokens per session. The window is consumed by all prompts, instructions, tool definitions and their input and output, generable type schemas, and all model responses.
- In Latin alphabet languages a token typically represents three to four characters; in Chinese, Japanese, Korean, and Vietnamese a token typically represents one character.
- Use `SystemLanguageModel.tokenCount(for:)` to measure how many tokens a prompt, instruction, or tool uses, and `SystemLanguageModel.contextSize` for the maximum supported size.
- After reaching the limit the session throws `LanguageModelError.contextSizeExceeded(_:)`. Trim the session history or create a new session with `init(model:tools:transcript:)` that includes the necessary state, then retry.
- Profile token usage with the Foundation Models instrument in Xcode (Product > Profile, select the Foundation Models template, record).
- Prompts: use imperative verbs, give only needed information, no more than three paragraphs, avoid indirect or overly formal language.
- Ask for less content: state the length in the prompt, or use `.maximumCount(_:)` on arrays. Only use `maximumResponseTokens` to prevent verbose responses; limiting tokens can yield incomplete or grammatically incorrect responses such as "A cat is a small."
- Generable types are converted to a JSON schema sent to the model, and `@Guide` descriptions also consume tokens. Keep types simple, use short descriptive property names, use `@Guide` only where necessary, and test without `@Guide` first.
- Tools: tool definitions (names, descriptions, parameters) are sent to the model. Keep descriptions short, provide no more than three to five tools per request, and skip tool calling when the model always needs the same information (include it in the prompt instead).
- When creating a new session after an error, either summarize the original transcript or seed with key entries (the first entry often has instructions; the last has the most recent context).

## Related

- [Prompting an on-device foundation model](./prompting.md)
- [Analyzing the runtime performance of your Foundation Models app](./runtime-performance.md)
- [Updating prompts for new model versions](./updating-prompts-for-new-model-versions.md)
