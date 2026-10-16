# KeyResult

A value describing the musical key detected over a time range.

## Signature / Usage

```swift
struct KeyResult

let ranges: [MusicUnderstandingSession.RangedValue<KeyResult.KeySignature>]

// KeyResult.KeySignature
let tonic: KeyResult.Tonic
let mode: KeyResult.Mode
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ranges` | `[MusicUnderstandingSession.RangedValue<KeyResult.KeySignature>]` | The detected key for each time range |
| `KeySignature` | `struct` | The set of sharp and flat symbols for the notes; has `tonic` (root note) and `mode` |
| `KeySignature.tonic` | `KeyResult.Tonic` | The root note of the musical key |
| `KeySignature.mode` | `KeyResult.Mode` | The mode of the musical key |
| `Mode` | `enum` | The mode of a musical key |
| `Tonic` | `enum` | The root note of a musical key |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- A key is the central note that organizes a piece of music. The tonic can be any of the supported enharmonic spellings: A, A♭, A♯, B♭, B, C, C♯, D♭, D, D♯, E♭, E, F, F♯, G, G♭, or G♯. The framework represents the enharmonic equivalents as distinct cases to preserve the original spelling.
- Individual `Mode` / `Tonic` cases are not enumerated in the source used for this page.
- Conforms to `Decodable`, `Encodable`, `Sendable`, `SendableMetatype`.

## Related

- [MusicUnderstandingSession.RangedValue](./musicunderstandingsession-rangedvalue.md)
- [MusicUnderstandingSession.SessionResult](./musicunderstandingsession-sessionresult.md)
- [PaceResult](./paceresult.md)
