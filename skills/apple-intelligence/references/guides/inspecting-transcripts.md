---
source: https://developer.apple.com/documentation/foundationmodels/inspecting-session-transcripts-and-reporting-model-feedback
---

# Inspecting session transcripts and reporting model feedback

Review session history to display the conversation in your app's UI, manage the context window, or diagnose and report unexpected model output.

## Signature / Usage

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

Trimming the transcript in place:

```swift
let entries = session.transcript
let kept = [entries.first, entries.last].compactMap { $0 }
session.transcript = Transcript(entries: kept)
```

Recording the transcript:

```swift
let session = LanguageModelSession()
let response = try await session.respond(to: "Help me plan a trip to Tokyo")

// Encode the transcript that now holds both the prompt and the response.
let data = try JSONEncoder().encode(session.transcript)
```

Reporting a response:

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

Annotating with app context:

```swift
struct AnnotatedTranscript: Encodable {
    var transcript: Transcript
    var annotations: [String: String]
}

let playerName = // The player's name.
let inventoryDescription = // Information related to the player's inventory.
let annotated = AnnotatedTranscript(
    transcript: session.transcript,
    annotations: ["player": playerName, 
                  "inventory": inventoryDescription]
)
```

```swift
let context = "player: \(playerName), inventory: \(inventoryDescription)"

let issue = LanguageModelFeedback.Issue(
    category: .incorrect,
    explanation: "Unexpected trade offer. App context — \(context)"
)

let data = session.logFeedbackAttachment(sentiment: .negative, 
                                         issues: [issue])
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| LanguageModelFeedback.Sentiment | enum | Overall reaction: `.negative`, `.neutral`, `.positive`. |
| LanguageModelFeedback.Issue | struct | One or more issues, each with a `LanguageModelFeedback.Issue.Category` (for example `.incorrect`, `.unhelpful`, `.tooVerbose`) and an optional explanation. |
| logFeedbackAttachment(sentiment:issues:desiredResponseText:) | method | Plain-text desired output. |
| logFeedbackAttachment(sentiment:issues:desiredResponseContent:) | method | Structured-content desired output. |
| logFeedbackAttachment(sentiment:issues:desiredOutput:) | method | A full `Transcript.Entry` as desired output. |

## Notes

- Article in the Foundation Models framework (iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+).
- A transcript records instructions, prompts, responses, and tool calls. `Transcript.Entry` also represents `reasoning(_:)`, `toolCalls(_:)`, and `toolOutput(_:)`.
- `history` returns the same entries as the transcript but omits the leading instructions entry, convenient for displaying the conversation in UI.
- Check context size with `SystemLanguageModel.contextSize` or `PrivateCloudComputeLanguageModel.contextSize`. When exceeded, the framework throws `LanguageModelError.contextSizeExceeded(_:)` and the session stops responding. `transcript` is mutable, so trim it before reaching the limit. To restore a persisted conversation use `init(model:tools:transcript:)`.
- `Transcript` conforms to `Codable`; serialize to JSON and store alongside a version identifier to compare behavior across model versions.
- A transcript includes all prompts, model responses, and tool data. Review it before storing or submitting; avoid sensitive or personal information and only capture and submit feedback with the person's knowledge and consent.
- `logFeedbackAttachment` serializes the current transcript together with your assessment into JSON and returns `Data`. Save it to disk and attach it to a bug report. For an Apple Intelligence model use Feedback Assistant; for other model providers see their documentation.

## Related

- [Transcript](../transcripts/transcript.md)
- [LanguageModelFeedback](../sessions/language-model-feedback.md)
- [Managing the context window](./managing-the-context-window.md)
- [Updating prompts for new model versions](./updating-prompts-for-new-model-versions.md)
