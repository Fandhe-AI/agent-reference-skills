---
source: https://developer.apple.com/documentation/foundationmodels/transcript, https://developer.apple.com/documentation/foundationmodels/transcripts
---

# Transcript

A linear history of entries that reflect an interaction with a session. A `Transcript` is everything exchanged with a `LanguageModelSession`: the instructions that define the model's behavior, the prompts you send, the model's responses and reasoning, and any tool calls made along the way. It is what the session uses as context.

## Signature / Usage

```swift
struct Transcript
```

Display the history of a session (original example):

```swift
struct HistoryView: View {
    let session: LanguageModelSession

    var body: some View {
        ScrollView {
            ForEach(session.transcript) { entry in
                switch entry {
                case let .instructions(instructions):
                    MyInstructionsView(instructions)
                case let .prompt(prompt):
                    MyPromptView(prompt)
                case let .reasoning(reasoning):
                    MyReasoningView(reasoning)
                case let .toolCalls(toolCalls):
                    MyToolCallsView(toolCalls)
                case let .toolOutput(toolOutput):
                    MyToolOutputView(toolOutput)
                case let .response(response):
                    MyResponseView(response)
                }
            }
        }
    }
}
```

Seed a new session from a previous transcript (original example):

```swift
// Create a new session with the first and last entries from a previous session.
func newContextualSession(with originalSession: LanguageModelSession) -> LanguageModelSession {
    let allEntries = originalSession.transcript

    // Collect the entries to keep from the original session.
    let entries = [allEntries.first, allEntries.last].compactMap { $0 }
    let transcript = Transcript(entries: entries)

    // Create a new session with the result and preload the session resources.
    var session = LanguageModelSession(transcript: transcript)
    session.prewarm()
    return session
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| init(entries:) | initializer | Creates a transcript. |
| history | Transcript.HistoryView | The transcript entries excluding the leading instructions entry, if present. |
| Transcript.HistoryView | struct | A mutable view into the conversational entries of a transcript. |
| structuredTranscript | StructuredTranscript | A structured representation of this transcript, with tool calls, outputs, and responses collected into typed arrays. |
| Transcript.DataAttachment | struct (beta) | A data attachment payload in a serialized, portable format. |
| Transcript.DataEntry | struct (beta) | A top-level transcript entry payload in a serialized, portable format. |
| RandomAccessCollection Implementations | conformance | `Transcript` is a random-access collection of `Transcript.Entry`. |

## Notes

- Availability: iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+.
- Beta: iOS 27.2+ for `Transcript.DataAttachment` and `Transcript.DataEntry`.
- A new `LanguageModelSession` does not contain the state of a previous session; initialize it with entries taken from a session transcript.
- The history is a three-level hierarchy: entries, segments, and attachments. To present or analyze a transcript, iterate its entries and switch over the segment cases.
- `structuredTranscript` is typed as `StructuredTranscript`, a type from the Evaluations framework (preciseIdentifier `s:11Evaluations20StructuredTranscriptV`).

## Related

- [Transcript.Entry](./transcript-entry.md)
- [Transcript.Segment](./transcript-segment.md)
- [Transcript.ToolCalls](./transcript-tool-calls.md)
- [LanguageModelSession](../sessions/languagemodelsession.md)
- [Inspecting transcripts](../guides/inspecting-transcripts.md)
