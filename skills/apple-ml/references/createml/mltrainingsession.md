# MLTrainingSession

A generic final class representing the current state of an asynchronous model training session. Enables pausing, resuming, and inspecting training across app launches.

## Signature / Usage

```swift
// Create a session
let session = try MLImageClassifier.makeTrainingSession(
    trainingData: .labeledDirectories(at: url),
    parameters: .init(),
    sessionParameters: MLTrainingSessionParameters(
        sessionDirectory: sessDir,
        reportInterval: 5,
        checkpointInterval: 10,
        iterations: 25
    )
)

// Resume (returns MLJob for monitoring)
let job = try MLImageClassifier.resume(session)

// Inspect checkpoints
print(session.checkpoints)
print(session.phase)

// Restore a previous session
let restored = try MLImageClassifier.restoreTrainingSession(
    sessionParameters: .init(sessionDirectory: sessDir)
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `phase` | `MLPhase` | Current training phase (featureExtracting, training, etc.) |
| `iteration` | `Int` | Current iteration number within the current phase |
| `checkpoints` | `[MLCheckpoint]` | Checkpoints created so far in this session |
| `date` | `Date` | When the session was created |
| `parameters` | `MLTrainingSessionParameters` | Configuration used to create the session |

## Notes

- macOS 11.0+, iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, tvOS 16.0+, visionOS 1.0+
- `removeCheckpoints(_:)` takes a closure predicate to selectively prune saved checkpoints
- `reuseExtractedFeatures(from:)` avoids redundant feature extraction when retraining with same data

## Related

- [MLTrainingSessionParameters](./mltrainingsessionparameters.md)
- [MLJob](./mljob.md)
- [MLCheckpoint](./mlcheckpoint.md)
