---
source: https://developer.apple.com/documentation/foundationmodels/languagemodelfeedback
---

# LanguageModelFeedback

Feedback appropriate for logging or attaching to Feedback Assistant.

## Signature / Usage

```swift
struct LanguageModelFeedback
```

```swift
let session = LanguageModelSession()
let response = try await session.respond(to: "What is the capital of France?")

// Create feedback for a problematic response.
let feedbackData = session.logFeedbackAttachment(
    sentiment: LanguageModelFeedback.Sentiment.negative,
    issues: [
        LanguageModelFeedback.Issue(
            category: .incorrect,
            explanation: "The model provided outdated information"
        )
    ],
    desiredOutput: Transcript.Entry.response(...)
)
```

## Options / Props

| Name | Description |
|------|-------------|
| `LanguageModelFeedback.Issue` | An issue with the model's response. |
| `LanguageModelFeedback.Sentiment` | A sentiment regarding the model's response. |

`LanguageModelSession` methods that produce feedback:

| Method | Description |
|--------|-------------|
| `logFeedbackAttachment(sentiment:issues:desiredOutput:)` | Logs and serializes a feedback attachment that can be submitted to Apple. |
| `logFeedbackAttachment(sentiment:issues:desiredResponseContent:)` | Logs and serializes a feedback attachment that includes the content you expected. |
| `logFeedbackAttachment(sentiment:issues:desiredResponseText:)` | Logs and serializes a feedback attachment that includes the response text you expected. |

## Notes

- Availability: iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+, watchOS 27.0+.
- `LanguageModelFeedback` is a namespace with structures for describing feedback in a consistent way.

## Related

- [LanguageModelSession](./languagemodelsession.md)
