# MusicUnderstandingError

An error that occurs during a music understanding session.

## Signature / Usage

```swift
enum MusicUnderstandingError

case emptyAnalysisSet
case internalError
case invalidAsset
case sessionInProgress
case hasProtectedContent
```

## Options / Props

| Case | Description |
|------|-------------|
| `emptyAnalysisSet` | Someone requests an analysis of an empty analysis set |
| `internalError` | An unexpected internal failure prevents the session from completing |
| `invalidAsset` | Someone initializes a session with an invalid asset |
| `sessionInProgress` | Someone requests analysis while a session is already in progress |
| `hasProtectedContent` | A session is initialized with an `AVAsset` whose content is protected by DRM and cannot be decoded for analysis |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Conforms to `Equatable`, `Error`, `Hashable`, `Sendable`, `SendableMetatype`.

## Related

- [MusicUnderstandingSession](./musicunderstandingsession.md)
- [AnalysisType](./analysistype.md)
