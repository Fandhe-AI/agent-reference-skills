# MLCreateError

An enum representing errors thrown by the Create ML framework during training, prediction, and model export operations.

## Signature / Usage

```swift
do {
    let classifier = try MLImageClassifier(trainingData: source, parameters: .init())
    try classifier.write(to: modelURL, metadata: nil)
} catch MLCreateError.cancelled {
    print("Training was cancelled.")
} catch MLCreateError.io(let reason) {
    print("IO error:", reason)
} catch MLCreateError.generic(let reason) {
    print("Error:", reason)
}
```

## Options / Props

| Case | Description |
|------|-------------|
| `.cancelled` | Training session was cancelled by the user |
| `.incompatibleParameters(parameter:originalValue:newValue:)` | Resumed session parameters conflict with the original session |
| `.modifiedTrainingData` | Training data differs from when the session was originally created |
| `.io(reason:)` | I/O operation failure (file read/write) |
| `.type(reason:)` | Missing or incorrect data type |
| `.generic(reason:)` | General failure not covered by other cases |

## Notes

- macOS 10.14+, iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, tvOS 16.0+, visionOS 1.0+
- Conforms to `LocalizedError` — `errorDescription` and `failureReason` provide human-readable messages
- Conforms to `CustomNSError` — `errorCode` provides a numeric code for bridging to Objective-C

## Related

- [MLTrainingSession](./mltrainingsession.md)
- [MLImageClassifier](./mlimageclassifier.md)
