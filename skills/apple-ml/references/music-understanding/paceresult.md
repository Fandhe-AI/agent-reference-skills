# PaceResult

A pace analysis result for the song, indicating the energy and momentum of the music over time.

## Signature / Usage

```swift
struct PaceResult

let ranges: [MusicUnderstandingSession.RangedValue<Double>]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ranges` | `[MusicUnderstandingSession.RangedValue<Double>]` | The pace for a range of a song |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Parts of a song that feel faster or more energetic have a higher value than slower or less energetic parts. Values represent a perceptual events-per-minute rate.
- The rate lets you synchronize behaviors with the music's changing energy, independent of the fixed tempo. For example, a song with a high BPM might yield a lower `Pace` value during a sparse breakdown.
- Conforms to `Decodable`, `Encodable`, `Sendable`, `SendableMetatype`.
- Source: https://developer.apple.com/documentation/musicunderstanding/paceresult

## Related

- [RhythmResult](./rhythmresult.md)
- [MusicUnderstandingSession.RangedValue](./musicunderstandingsession-rangedvalue.md)
- [MusicUnderstandingSession.SessionResult](./musicunderstandingsession-sessionresult.md)
