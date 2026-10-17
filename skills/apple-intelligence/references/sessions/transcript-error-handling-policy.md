---
source: https://developer.apple.com/documentation/foundationmodels/transcripterrorhandlingpolicy
---

# TranscriptErrorHandlingPolicy

Options for controlling how a language model session manages the transcript when errors occur.

## Signature / Usage

```swift
struct TranscriptErrorHandlingPolicy
```

```swift
var transcriptErrorHandlingPolicy: TranscriptErrorHandlingPolicy?
```

The second declaration is `LanguageModelSession.transcriptErrorHandlingPolicy`: the session's policy for managing the transcript when errors occur.

## Options / Props

| Name | Description |
|------|-------------|
| preserveTranscript | A policy that keeps the current transcript as is. |
| revertTranscript | A policy that reverts the transcript back to the state it was in just before the most recent request. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+.

## Related

- [LanguageModelSession](./languagemodelsession.md)
- [Session errors](./session-errors.md)
