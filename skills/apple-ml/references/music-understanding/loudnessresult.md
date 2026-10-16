# LoudnessResult

A structure that contains perceptual loudness measurements for a song, including integrated, momentary, short-term, and peak values.

## Signature / Usage

```swift
struct LoudnessResult

let integrated: MusicUnderstandingSession.TimedValue<Float>
let momentary: [MusicUnderstandingSession.TimedValue<Float>]
let peak: MusicUnderstandingSession.TimedValue<Float>
let shortTerm: [MusicUnderstandingSession.TimedValue<Float>]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `integrated` | `TimedValue<Float>` | The integrated loudness of the song, measured in LUFS over its full duration |
| `momentary` | `[TimedValue<Float>]` | Momentary loudness measurements sampled across the song in LUFS |
| `peak` | `TimedValue<Float>` | The peak amplitude of the song in decibels (dB) |
| `shortTerm` | `[TimedValue<Float>]` | Short-term loudness measurements sampled across the song in LUFS |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Measurements align with human hearing perception, using the Loudness K-weighted Full Scale (LUFS) standard defined in ITU-R BS.1770.
- In `SessionResult`, a single `LoudnessResult` contains all analysis values for the entire song, with `momentary` and `shortTerm` arrays holding the complete set of measurements across the song's duration.
- In the streaming `loudnessResults` context, the framework delivers multiple results progressively during analysis; each result's `momentary` and `shortTerm` arrays contain only one value representing the measurement at that point in time.
- Conforms to `Decodable`, `Encodable`, `Sendable`, `SendableMetatype`.
- Source: https://developer.apple.com/documentation/musicunderstanding/loudnessresult

## Related

- [MusicUnderstandingSession](./musicunderstandingsession.md)
- [MusicUnderstandingSession.TimedValue](./musicunderstandingsession-timedvalue.md)
- [MusicUnderstandingSession.SessionResult](./musicunderstandingsession-sessionresult.md)
