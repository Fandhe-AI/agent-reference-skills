# SFSpeechRecognizerAuthorizationStatus

An enum representing the app's authorization to perform speech recognition.

## Signature / Usage

```swift
SFSpeechRecognizer.requestAuthorization { status in
    switch status {
    case .authorized:
        // Start recognition
    case .denied:
        // User denied — direct to Settings
    case .restricted:
        // Device policy prevents recognition
    case .notDetermined:
        // Not yet asked — will be asked on next call
    @unknown default:
        break
    }
}
```

## Options / Props

| Case | Description |
|------|-------------|
| `notDetermined` | The app has not yet requested authorization. |
| `denied` | The user denied the app's request to perform speech recognition. |
| `restricted` | The device policy prevents the app from performing speech recognition. |
| `authorized` | The user granted the app's request to perform speech recognition. |

## Notes

iOS 10.0+, iPadOS 10.0+, macOS 10.15+, Mac Catalyst 10.0+, visionOS 1.0+. Always check the status before initiating a recognition task. Add `NSSpeechRecognitionUsageDescription` to `Info.plist`; without it the app will crash when requesting authorization. `restricted` differs from `denied` — the user cannot change a restricted status.

## Related

- [SFSpeechRecognizer](./sfspeechrecognizer.md)
