---
source: https://developer.apple.com/documentation/foundationmodels/inspecting-session-transcripts-and-reporting-model-feedback
---

# Transcript Inspection and Feedback

Iterate a session transcript, record it as JSON, and package a response as a feedback attachment with `logFeedbackAttachment`.

```swift
for entry in session.transcript {
    switch entry {
    case .instructions(let instructions):
        // The guidance you gave the language model.
    case .prompt(let prompt):
        // A request from a person using your app.
    case .response(let response):
        // A response the language model generated.
    default:
        // Other entries, like reasoning, tool calls, and tool output.
    }
}
```

```swift
let session = LanguageModelSession()
let response = try await session.respond(to: "Help me plan a trip to Tokyo")

// Encode the transcript that now holds both the prompt and the response.
let data = try JSONEncoder().encode(session.transcript)
```

```swift
let issue = LanguageModelFeedback.Issue(
    category: .incorrect,
    explanation: "The response named the wrong capital city."
)

let data = session.logFeedbackAttachment(
    sentiment: .negative,
    issues: [issue],
    desiredResponseText: "The capital of Australia is Canberra."
)
```

```swift
let entries = session.transcript
let kept = [entries.first, entries.last].compactMap { $0 }
session.transcript = Transcript(entries: kept)
```

## Notes

- `transcript.history` returns the same entries without the leading instructions entry, which suits conversation UI.
- `Transcript` conforms to `Codable`; review its contents before storing or submitting it, and only capture feedback with the person's knowledge and consent.
- Other `logFeedbackAttachment` variants accept `desiredResponseContent` (structured content) or `desiredOutput` (a `Transcript.Entry`).
- Report issues with an Apple Intelligence model through Feedback Assistant; other model providers have their own channels.
