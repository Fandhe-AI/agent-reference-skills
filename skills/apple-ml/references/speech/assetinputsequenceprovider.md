# AssetInputSequenceProvider

Reads from an audio file or asset, providing its audio in a format suitable for analysis by a speech analyzer.

## Signature / Usage

```swift
final class AssetInputSequenceProvider
```

```swift
// Factory (signature from the official documentation)
static func provider(
    from: AVAsset,
    compatibleWith: [any SpeechModule],
    priority: TaskPriority?
) async throws -> AssetInputSequenceProvider
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `static provider(from:compatibleWith:priority:)` | `async throws -> AssetInputSequenceProvider` | Returns a provider that reads from the first track of an asset or file. |
| `static provider(from:track:compatibleWith:priority:)` | `async throws -> AssetInputSequenceProvider` | Returns a provider that reads from a track of an asset. |
| `init(asset:track:analyzerFormat:priority:)` | `AVAsset`, `AVAssetTrack`, `AVAudioFormat`, `TaskPriority?` | Creates an input sequence provider. |
| `analyzerInputs` | `some Sendable & AsyncSequence<AnalyzerInput, any Error>` | A new sequence of speech analyzer input objects containing audio from the asset or file. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+.
- Pass `analyzerInputs` to `SpeechAnalyzer.analyzeSequence(_:)`, `start(inputSequence:)`, or an analyzer initializer's input-sequence parameter.
- To end the session after the track is processed, call one of the analyzer's `finish` methods; otherwise the analyzer waits for more input.

## Related

- [SpeechAnalyzer](./speechanalyzer.md)
- [CaptureInputSequenceProvider](./captureinputsequenceprovider.md)
- [AnalyzerInputConverter](./analyzerinputconverter.md)
- [AnalyzerInput](./analyzerinput.md)
