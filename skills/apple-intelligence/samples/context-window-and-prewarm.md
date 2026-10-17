---
source: https://developer.apple.com/documentation/foundationmodels/managing-the-context-window
---

# Context Window and Prewarm

Recover from `LanguageModelError.contextSizeExceeded` by seeding a new session from a condensed transcript, and split large tasks across sessions.

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

- The on-device model has a 4096-token context window per session; prompts, instructions, tool definitions and their input and output, generable schemas, and responses all count.
- `tokenCount(for:)` and `contextSize` on `SystemLanguageModel` report token usage and the maximum size.
- Preserving the first (often instructions) and last (most recent context) transcript entries keeps continuity while cutting token usage.
- Use `maximumResponseTokens` only to prevent verbose responses; it can cut output into incomplete text.
