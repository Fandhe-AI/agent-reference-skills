# MLCheckpoint

A struct representing the persisted state of an asynchronous training session at a specific iteration, enabling training to be resumed after interruption.

## Signature / Usage

```swift
// Checkpoints are created automatically during async training
let job = try MLImageClassifier.train(
    trainingData: source,
    parameters: .init(),
    sessionParameters: .init(sessionDirectory: sessDir, checkpointInterval: 10, iterations: 50)
)

job.checkpoints
    .sink { checkpoint in
        print("Checkpoint at iteration \(checkpoint.iteration), phase: \(checkpoint.phase)")
        print("Saved to:", checkpoint.url)
    }
    .store(in: &cancellables)

// Resume from a checkpoint
let session = try MLImageClassifier.makeTrainingSession(trainingData: source, parameters: .init(), sessionParameters: .init(sessionDirectory: sessDir))
let resumed = try MLImageClassifier.resume(session)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `phase` | `MLPhase` | Training phase when the checkpoint was created |
| `iteration` | `Int` | Iteration number within the phase at checkpoint time |
| `date` | `Date` | Timestamp when the checkpoint was created |
| `url` | `URL` | File system location of the checkpoint |
| `metrics` | `[MLProgress.Metric: Any]` | Model performance measurements at this checkpoint |

## Notes

- macOS 11.0+, iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, tvOS 16.0+, visionOS 1.0+
- Conforms to `Codable` and `Sendable`
- Use `MLTrainingSession.removeCheckpoints(_:)` to prune old checkpoints and manage disk space

## Related

- [MLTrainingSession](./mltrainingsession.md)
- [MLJob](./mljob.md)
- [MLTrainingSessionParameters](./mltrainingsessionparameters.md)
