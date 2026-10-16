# RhythmResult

A structure that describes a song's rhythm results in terms of beats, bars, and beats per minute (BPM).

## Signature / Usage

```swift
struct RhythmResult

let bars: [CMTime]
let beats: [CMTime]
let beatsPerMinute: Float?
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `bars` | `[CMTime]` | The start time of each bar. A bar is a musical unit typically containing several beats (2-4 depending on the time signature) |
| `beats` | `[CMTime]` | The timestamp of each detected beat (the basic, recurrent pulse of a song) |
| `beatsPerMinute` | `Float?` | The tempo of the song in beats per minute |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Conforms to `Decodable`, `Encodable`, `Sendable`, `SendableMetatype`.

## Related

- [MusicUnderstandingSession.SessionResult](./musicunderstandingsession-sessionresult.md)
- [PaceResult](./paceresult.md)
- [StructureResult](./structureresult.md)
