# AnalyzerInputConverter

Converts audio buffers to a format suitable for analysis by a speech analyzer.

## Signature / Usage

```swift
let converter = AnalyzerInputConverter(analyzerFormat: audioFormat)
let inputs = try converter.convert(buffer, at: nil)
for input in inputs {
    inputBuilder.yield(input)
}
let remaining = try converter.flush()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `static converter(compatibleWith:)` | `async throws -> AnalyzerInputConverter` | Returns an audio input converter compatible with the given `[any SpeechModule]`. |
| `init(analyzerFormat:configurationHandler:)` | `AVAudioFormat`, `((AVAudioConverter) -> Void)?` | Creates an audio input converter. |
| `convert(_:at:)` | `(AVAudioBuffer, AVAudioTime?) throws -> [AnalyzerInput]` | Converts an audio buffer. |
| `flush()` | `throws -> [AnalyzerInput]` | Completes pending audio conversions. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+.
- Use it to convert `AVAudioBuffer` audio to `AnalyzerInput` on the fly; call `flush()` when the audio ends.
- Source: https://developer.apple.com/documentation/speech/analyzerinputconverter

## Related

- [SpeechAnalyzer](./speechanalyzer.md)
- [AnalyzerInput](./analyzerinput.md)
- [AssetInputSequenceProvider](./assetinputsequenceprovider.md)
- [CaptureInputSequenceProvider](./captureinputsequenceprovider.md)
