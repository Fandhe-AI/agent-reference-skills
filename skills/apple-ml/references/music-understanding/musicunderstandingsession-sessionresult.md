# MusicUnderstandingSession.SessionResult

The aggregated results for all analysis types that a music understanding session performs.

## Signature / Usage

```swift
struct SessionResult

let instrumentActivity: InstrumentActivityResult?
let key: KeyResult?
let loudness: LoudnessResult?
let pace: PaceResult?
let rhythm: RhythmResult?
let structure: StructureResult?
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `instrumentActivity` | `InstrumentActivityResult?` | The aggregated instrument activity results, identifying which instruments are present and when they're active |
| `key` | `KeyResult?` | The aggregated key results, identifying the central note (tonic) and mode around which a piece of music is organized |
| `loudness` | `LoudnessResult?` | The aggregated loudness results, providing information about volume levels throughout the audio |
| `pace` | `PaceResult?` | The aggregated pace results, describing the energy and momentum variations over time |
| `rhythm` | `RhythmResult?` | The aggregated rhythm results, including detected beats, bars, and BPM |
| `structure` | `StructureResult?` | The aggregated structure results, identifying musical sections and their boundaries |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Each property corresponds to one analysis type. A property is `nil` if the session wasn't configured to perform that analysis.
- Access a session result after the session finishes processing audio to retrieve the data for each configured type.
- Conforms to `Decodable`, `Encodable`, `Sendable`, `SendableMetatype`.
- Source: https://developer.apple.com/documentation/musicunderstanding/musicunderstandingsession/sessionresult

## Related

- [MusicUnderstandingSession](./musicunderstandingsession.md)
- [InstrumentActivityResult](./instrumentactivityresult.md)
- [KeyResult](./keyresult.md)
- [LoudnessResult](./loudnessresult.md)
- [PaceResult](./paceresult.md)
- [RhythmResult](./rhythmresult.md)
- [StructureResult](./structureresult.md)
