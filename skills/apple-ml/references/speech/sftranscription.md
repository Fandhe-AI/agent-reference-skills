# SFTranscription

A textual representation of the entire recognized speech, composed of an array of `SFTranscriptionSegment` objects. Retrieved from `SFSpeechRecognitionResult` — do not instantiate directly.

## Signature / Usage

```swift
recognizer.recognitionTask(with: request) { result, error in
    guard let result, result.isFinal else { return }

    let transcription = result.bestTranscription
    print(transcription.formattedString)

    for segment in transcription.segments {
        print("\(segment.substring) (confidence: \(segment.confidence), at: \(segment.timestamp)s)")
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `formattedString` | `String` | The full transcription as a single user-displayable string. |
| `segments` | `[SFTranscriptionSegment]` | Array of transcription segments identified by the recognizer. |
| `speakingRate` | `Double` | Words per minute. **Deprecated.** |
| `averagePauseDuration` | `TimeInterval` | Average pause between words in seconds. **Deprecated.** |

### SFTranscriptionSegment properties

| Name | Type | Description |
|------|------|-------------|
| `substring` | `String` | The string for this segment of the utterance. |
| `substringRange` | `NSRange` | Range of `substring` within the overall `formattedString`. |
| `alternativeSubstrings` | `[String]` | Alternate interpretations for this segment. |
| `confidence` | `Float` | Confidence level (0.0–1.0) of the recognition for this segment. |
| `timestamp` | `TimeInterval` | Start time of the segment in the audio stream. |
| `duration` | `TimeInterval` | Duration of the spoken segment in seconds. |

## Notes

iOS 10.0+, iPadOS 10.0+, macOS 10.15+, Mac Catalyst 10.0+, visionOS 1.0+. An `SFTranscription` represents one potential version of the speech; use `SFSpeechRecognitionResult.transcriptions` for alternative interpretations. `speakingRate` and `averagePauseDuration` are deprecated — use `SFSpeechRecognitionMetadata` instead.

## Related

- [SFSpeechRecognitionResult](./sfspeechrecognitionresult.md)
- [SFSpeechRecognizer](./sfspeechrecognizer.md)
