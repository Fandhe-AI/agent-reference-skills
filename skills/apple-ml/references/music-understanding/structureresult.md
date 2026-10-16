# StructureResult

A song's structural boundary information, including sections, segments, and phrases.

## Signature / Usage

```swift
struct StructureResult

let phrases: [CMTimeRange]
let sections: [CMTimeRange]
let segments: [CMTimeRange]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `phrases` | `[CMTimeRange]` | The time range of each phrase in the song |
| `sections` | `[CMTimeRange]` | The time ranges of each section in the song |
| `segments` | `[CMTimeRange]` | The time range of each segment in the song |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- A section corresponds to a distinct part of a song, such as an intro, verse, or chorus. A section consists of one or more segments, and each segment consists of one or more phrases.
- Conforms to `Decodable`, `Encodable`, `Sendable`, `SendableMetatype`.
- Source: https://developer.apple.com/documentation/musicunderstanding/structureresult

## Related

- [RhythmResult](./rhythmresult.md)
- [MusicUnderstandingSession.SessionResult](./musicunderstandingsession-sessionresult.md)
