---
source: https://developer.apple.com/documentation/foundationmodels/languagemodelsession/response
---

# LanguageModelSession.Response

A structure that stores the output of a response call.

## Signature / Usage

```swift
struct Response<Content> where Content : Generable
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| content | `Content` | The response content. |
| rawContent | `GeneratedContent` | The raw response content. |
| usage | `LanguageModelSession.Usage` | Information about how many tokens were used by this response. |
| transcriptEntries | (see official page) | The list of transcript entries. |

## Notes

- Availability: iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+, watchOS 27.0+.
- Returned by the `respond(...)` family on `LanguageModelSession`.

## Related

- [LanguageModelSession](./languagemodelsession.md)
- [Usage](./usage.md)
- [ResponseStream](./response-stream.md)
