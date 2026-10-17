---
source: https://developer.apple.com/documentation/foundationmodels/languagemodelsession/responsestream
---

# LanguageModelSession.ResponseStream

An async sequence of snapshots of partially generated content.

## Signature / Usage

```swift
struct ResponseStream<Content> where Content : Generable
```

## Options / Props

| Name | Description |
|------|-------------|
| `collect()` | Returns the result from a streaming response, after it completes. |
| `LanguageModelSession.ResponseStream.Snapshot` | A snapshot of partially generated content. |
| AsyncSequence Implementations | Default implementations. |

## Notes

- Availability: iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+, watchOS 27.0+.
- Returned by the `streamResponse(...)` family on `LanguageModelSession`.

## Related

- [LanguageModelSession](./languagemodelsession.md)
- [Response](./response.md)
