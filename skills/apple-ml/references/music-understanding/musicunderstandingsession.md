# MusicUnderstandingSession

An object that performs music analysis on an audio source and provides the results.

## Signature / Usage

```swift
actor MusicUnderstandingSession

// Creating a session
convenience init<Provider>(audioProvider: Provider)            // streaming audio buffers
convenience init(asset: any AVAsset & Sendable) async throws

// Performing an analysis
func analyze() async throws -> MusicUnderstandingSession.SessionResult
func analyze(for: Set<AnalysisType>) async throws -> MusicUnderstandingSession.SessionResult

// Streaming results
var loudnessResults: some Sendable & AsyncSequence<LoudnessResult, any Error> { get }

// Cancelling
func cancel() async
```

## Options / Props

| Member | Description |
|--------|-------------|
| `init(audioProvider:)` | Creates a music understanding session that accepts streaming audio buffers |
| `init(asset:)` | Creates a music understanding session from an audio asset |
| `analyze()` | Performs all available analyses on the session's audio source |
| `analyze(for:)` | Performs the specified analyses on the session's audio source |
| `SessionResult` | The aggregated results for all analysis types that a session performs |
| `loudnessResults` | An async sequence that yields loudness analysis results as they become available |
| `RangedValue` | A structure that pairs a value over a time range |
| `TimedValue` | A structure that pairs a value with a time |
| `cancel()` | Cancels any ongoing analysis |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Conforms to `Actor`, `Sendable`, `SendableMetatype`.
- Errors are reported as `MusicUnderstandingError` (for example `sessionInProgress` when analysis is requested while a session is already in progress).
- Source: https://developer.apple.com/documentation/musicunderstanding/musicunderstandingsession

## Related

- [MusicUnderstandingSession.SessionResult](./musicunderstandingsession-sessionresult.md)
- `AnalysisType`
- [LoudnessResult](./loudnessresult.md)
- [MusicUnderstandingError](./musicunderstandingerror.md)
- [MusicUnderstandingSession.TimedValue](./musicunderstandingsession-timedvalue.md)
- [MusicUnderstandingSession.RangedValue](./musicunderstandingsession-rangedvalue.md)
