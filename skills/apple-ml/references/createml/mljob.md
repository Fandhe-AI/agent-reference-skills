# MLJob

A generic class representing an asynchronous model training session. Provides Combine publishers for monitoring progress, checkpoints, and the final result.

## Signature / Usage

```swift
let job = try MLImageClassifier.train(
    trainingData: .labeledDirectories(at: url),
    parameters: .init(),
    sessionParameters: .init()
)

// Observe result with Combine
job.result
    .sink(
        receiveCompletion: { print($0) },
        receiveValue: { classifier in
            try? classifier.write(to: modelURL, metadata: nil)
        }
    )
    .store(in: &cancellables)

// Monitor progress
job.checkpoints
    .sink { checkpoint in print("Iteration:", checkpoint.iteration) }
    .store(in: &cancellables)

// Cancel if needed
job.cancel()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `result` | `AnyPublisher<Result, any Error>` | Publishes the trained model on completion |
| `progress` | `Progress` | Current training progress (for UI binding) |
| `checkpoints` | `AnyPublisher<MLCheckpoint, Never>` | Publishes a checkpoint at each checkpoint interval |
| `phase` | `AnyPublisher<MLPhase, Never>` | Publishes training phase transitions |
| `startDate` | `Date` | When the training session began |
| `isCanceled` | `Bool` | Whether the job has been canceled |

## Notes

- macOS 11.0+, iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, tvOS 16.0+, visionOS 1.0+
- Conforms to `Cancellable`; calling `cancel()` stops training immediately
- Use `job.result.async()` (via `async/await` bridge) to await the result in an async context

## Related

- [MLTrainingSession](./mltrainingsession.md)
- [MLTrainingSessionParameters](./mltrainingsessionparameters.md)
- [MLCheckpoint](./mlcheckpoint.md)
