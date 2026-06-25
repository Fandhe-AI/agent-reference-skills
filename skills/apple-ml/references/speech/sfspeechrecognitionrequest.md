# SFSpeechRecognitionRequest

Abstract base class for speech recognition requests. Do not instantiate directly — use `SFSpeechURLRecognitionRequest` or `SFSpeechAudioBufferRecognitionRequest`.

## Signature / Usage

```swift
// Configure a request before starting a task
let request = SFSpeechAudioBufferRecognitionRequest()
request.shouldReportPartialResults = true
request.requiresOnDeviceRecognition = true
request.contextualStrings = ["Cupertino", "SwiftUI"]
request.addsPunctuation = true
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `shouldReportPartialResults` | `Bool` | Whether to return intermediate results before the final transcription. |
| `requiresOnDeviceRecognition` | `Bool` | Whether audio data must stay on-device (no network). |
| `contextualStrings` | `[String]` | Domain-specific phrases to boost recognition accuracy. |
| `taskHint` | `SFSpeechRecognitionTaskHint` | Hint indicating the type of speech (dictation, search, etc.). |
| `addsPunctuation` | `Bool` | Whether to automatically insert punctuation in the result. |
| `customizedLanguageModel` | `SFSpeechLanguageModel.Configuration?` | Custom language model configuration. |

## Notes

iOS 10.0+, iPadOS 10.0+, macOS 10.15+, Mac Catalyst 10.0+, visionOS 1.0+. `interactionIdentifier` is deprecated. Configure all properties before passing the request to `SFSpeechRecognizer`.

## Related

- [SFSpeechURLRecognitionRequest](./sfspeechurlrecognitionrequest.md)
- [SFSpeechAudioBufferRecognitionRequest](./sfspeechaudiobufferrecognitionrequest.md)
- [SFSpeechRecognizer](./sfspeechrecognizer.md)
