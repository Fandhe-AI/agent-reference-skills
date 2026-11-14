# AnalysisType

The analysis type for each session.

## Signature / Usage

```swift
struct AnalysisType

static let key: AnalysisType
static let instrumentActivity: AnalysisType
static let loudness: AnalysisType
static let pace: AnalysisType
static let rhythm: AnalysisType
static let structure: AnalysisType
let rawValue: String
```

Adapted (not in the official docs): minimal usage assembled from the `analyze(for:)` signature on the MusicUnderstandingSession page; `session` is an existing `MusicUnderstandingSession`.

```swift
let result = try await session.analyze(for: [.key, .pace])
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `key` | `static let AnalysisType` | Identifies the key music analysis type. |
| `instrumentActivity` | `static let AnalysisType` | Identifies the instrument activity music analysis type. |
| `loudness` | `static let AnalysisType` | Identifies the loudness music analysis type. |
| `pace` | `static let AnalysisType` | Identifies the pace music analysis type. |
| `rhythm` | `static let AnalysisType` | Identifies the rhythm music analysis type. |
| `structure` | `static let AnalysisType` | Identifies the structure music analysis type. |
| `rawValue` | `let String` | Identifies the type of music analysis to perform. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- Conforms to `Decodable`, `Encodable`, `Equatable`, `Hashable`, `Sendable`, `SendableMetatype`.
- This is the primary type used by `MusicUnderstandingSession`.
- Source: https://developer.apple.com/documentation/musicunderstanding/analysistype (fetched 2026-11-14)

## Related

- [MusicUnderstandingSession](./musicunderstandingsession.md)
- [MusicUnderstandingSession.SessionResult](./musicunderstandingsession-sessionresult.md)
- [KeyResult](./keyresult.md)
- [PaceResult](./paceresult.md)
- [RhythmResult](./rhythmresult.md)
- [LoudnessResult](./loudnessresult.md)
- [StructureResult](./structureresult.md)
- [InstrumentActivityResult](./instrumentactivityresult.md)
