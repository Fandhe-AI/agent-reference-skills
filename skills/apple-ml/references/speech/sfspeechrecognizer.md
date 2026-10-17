# SFSpeechRecognizer

The central object for managing speech recognition. Handles authorization, locale selection, and initiating recognition tasks.

## Signature / Usage

```swift
import Speech

func recognizeFile(url: URL) {
    // Create a speech recognizer associated with the user's default language.
    guard let myRecognizer = SFSpeechRecognizer() else {
        // The system doesn't support the user's default language.
        return
    }
    
    guard myRecognizer.isAvailable else {
        // The recognizer isn't available.
        return
    }
    
    // Create and execute a speech recognition request for the audio file at the URL.
    let request = SFSpeechURLRecognitionRequest(url: url)
    myRecognizer.recognitionTask(with: request) { (result, error) in
        guard let result else {
            // Recognition failed, so check the error for details and handle it.
            return
        }
        
        // Print the speech transcription with the highest confidence that the
        // system recognized.
        if result.isFinal {
            print(result.bestTranscription.formattedString)
        }
    }
}
```

```swift
// Call recognizeFile(url:) only after authorization is granted
SFSpeechRecognizer.requestAuthorization { status in
    guard status == .authorized else { return }
    recognizeFile(url: audioFileURL)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `locale` | `Locale` | The locale of the speech recognizer. |
| `isAvailable` | `Bool` | Whether the speech recognizer is currently available. |
| `supportsOnDeviceRecognition` | `Bool` | Whether the recognizer can operate without network access. |
| `defaultTaskHint` | `SFSpeechRecognitionTaskHint` | Hint indicating the type of speech recognition being requested. |
| `delegate` | `SFSpeechRecognizerDelegate?` | Delegate that handles availability changes. |
| `queue` | `OperationQueue` | Queue on which recognition task handlers and delegate methods execute. |
| `convenience init?()` | `SFSpeechRecognizer?` | Creates a recognizer for the user's default language. |
| `init?(locale:)` | `SFSpeechRecognizer?` | Creates a recognizer for the specified locale. |
| `class func requestAuthorization(_:)` | `Void` (takes `(SFSpeechRecognizerAuthorizationStatus) -> Void`) | Asks the user for permission to perform speech recognition. |
| `class func authorizationStatus()` | `SFSpeechRecognizerAuthorizationStatus` | Returns the app's current authorization status. |
| `class func supportedLocales()` | `Set<Locale>` | Returns the set of locales supported by the speech recognizer. |
| `recognitionTask(with:resultHandler:)` | `SFSpeechRecognitionTask` | Starts a recognition task and delivers results to a closure. |
| `recognitionTask(with:delegate:)` | `SFSpeechRecognitionTask` | Starts a recognition task and delivers results to a delegate. |

## Notes

The source page has no code example; the first snippet is Listing 1 from the SFSpeechURLRecognitionRequest page, with `import Speech` added, and the authorization snippet is illustrative. For live audio, SFSpeechAudioBufferRecognitionRequest needs `append(_:)` for each captured buffer and an explicit `endAudio()` call, or the task never finishes.

iOS 10.0+, iPadOS 10.0+, macOS 10.15+, Mac Catalyst 10.0+, visionOS 1.0+. Audio is limited to one minute per task. Network-based recognition is subject to per-device and per-app daily limits. Do not send sensitive data (passwords, health/financial info). Add `NSSpeechRecognitionUsageDescription` to `Info.plist`.

As of 2026-10-16 the official documentation classifies this API under "Legacy API" (Speech Recognition in Objective-C: "Use these classes to perform speech recognition in Objective-C code."). It carries no deprecation marker; it is not deprecated. The modern Swift path is `SpeechAnalyzer` with `SpeechTranscriber` / `DictationTranscriber` (iOS 26.0+).

## Related

- [SFSpeechRecognitionRequest](./sfspeechrecognitionrequest.md)
- [SFSpeechAudioBufferRecognitionRequest](./sfspeechaudiobufferrecognitionrequest.md)
- [SFSpeechURLRecognitionRequest](./sfspeechurlrecognitionrequest.md)
- [SFSpeechRecognitionTask](./sfspeechrecognitiontask.md)
- [SFSpeechRecognizerAuthorizationStatus](./sfspeechrecognizerauthorizationstatus.md)
- [SpeechAnalyzer](./speechanalyzer.md)
- [SpeechTranscriber](./speechtranscriber.md)
