---
source: https://developer.apple.com/documentation/appintents/longrunningintent
---

# LongRunningIntent

An interface you use to extend the background execution time of an app intent that performs a long-running task.

## Signature / Usage

```swift
protocol LongRunningIntent : ProgressReportingIntent
```

```swift
struct UploadFileIntent: LongRunningIntent {
    static var title: LocalizedStringResource = "Upload Large File"

    @Parameter(title: "File")
    var file: IntentFile

    func perform() async throws -> some IntentResult & ReturnsValue<String> {
        // Use performBackgroundTask - zero required parameters!
        let result = try await performBackgroundTask {
            // This code runs with extended execution time
            progress.totalUnitCount = 100
            progress.localizedDescription = "Uploading file"

            for chunk in 0..<100 {
                try Task.checkCancellation()
                await uploadChunk(chunk)
                progress.completedUnitCount = Int64(chunk + 1)
                progress.localizedAdditionalDescription = "\(chunk + 1)% complete"
            }
            return "Upload complete!"
        }

        return .result(value: result)
    }

    private func uploadChunk(_ chunk: Int) async {
        // Simulate uploading a chunk
    }
}
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `performBackgroundTask(options:operation:)` | `func performBackgroundTask<T>(options: LongRunningTaskOptions, operation: () async throws -> T) async throws -> T` | Runs an operation in the background with an extended amount of time. |
| `performBackgroundTask(options:operation:onCancel:)` | `func performBackgroundTask<T>(options: LongRunningTaskOptions, operation: () async throws -> T, onCancel: (IntentCancellationReason) -> Void) async throws -> T` | Runs an operation in the background and provides a way to cancel the operation before it finishes. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Background tasks traditionally get up to 30 seconds. Put the task code inside one of this protocol's methods to extend that time; report progress regularly via the `progress` property (`var progress: Progress`) of the inherited `ProgressReportingIntent`. If it is not updated regularly, the system can cancel the extension and end the task.
- In macOS, background tasks run without time limits. In iOS, iPadOS, tvOS, visionOS, and watchOS the system gives tasks 30 seconds unless you use this protocol's methods.
- The example in the official page calls `performBackgroundTask { ... }` with no explicit options (the sample comment says "zero required parameters").
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `ProgressReportingIntent`, `Sendable`, `SendableMetatype`.

## Related

- [LongRunningTaskOptions](./longrunningtaskoptions.md)
- [IntentCancellationReason](./intentcancellationreason.md)
- [CancellableIntent](./cancellableintent.md)
- [AppIntent](./appintent.md)
