# SFSpeechRecognizer

The central object for managing speech recognition. Handles authorization, locale selection, and initiating recognition tasks.

## Signature / Usage

```swift
// Request authorization
SFSpeechRecognizer.requestAuthorization { status in
    guard status == .authorized else { return }
    // proceed
}

// Create recognizer and start task
guard let recognizer = SFSpeechRecognizer(locale: Locale(identifier: "en-US")),
      recognizer.isAvailable else { return }

let request = SFSpeechAudioBufferRecognitionRequest()
let task = recognizer.recognitionTask(with: request) { result, error in
    if let result {
        print(result.bestTranscription.formattedString)
    }
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

## Key Methods

| Method | Description |
|--------|-------------|
| `init?()` | Creates a recognizer for the user's default language. |
| `init?(locale:)` | Creates a recognizer for the specified locale. |
| `class requestAuthorization(_:)` | Asks the user for permission to perform speech recognition. |
| `class authorizationStatus()` | Returns the app's current authorization status. |
| `class supportedLocales()` | Returns the set of locales supported by the speech recognizer. |
| `recognitionTask(with:resultHandler:)` | Starts a recognition task and delivers results to a closure. |
| `recognitionTask(with:delegate:)` | Starts a recognition task and delivers results to a delegate. |

## Notes

iOS 10.0+, iPadOS 10.0+, macOS 15.0+, Mac Catalyst 10.0+, visionOS 1.0+. Audio is limited to one minute per task. Network-based recognition is subject to per-device and per-app daily limits. Do not send sensitive data (passwords, health/financial info). Add `NSSpeechRecognitionUsageDescription` to `Info.plist`.

## Related

- [SFSpeechRecognitionRequest](./sfspeechrecognitionrequest.md)
- [SFSpeechAudioBufferRecognitionRequest](./sfspeechaudiobufferrecognitionrequest.md)
- [SFSpeechURLRecognitionRequest](./sfspeechurlrecognitionrequest.md)
- [SFSpeechRecognitionTask](./sfspeechrecognitiontask.md)
- [SFSpeechRecognizerAuthorizationStatus](./sfspeechrecognizerauthorizationstatus.md)
