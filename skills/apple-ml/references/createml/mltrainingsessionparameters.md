# MLTrainingSessionParameters

A struct holding configuration settings for an asynchronous training session, including where to persist progress and how often to report/checkpoint.

## Signature / Usage

```swift
let sessionParams = MLTrainingSessionParameters(
    sessionDirectory: FileManager.default.temporaryDirectory
        .appendingPathComponent("MyTrainingSession"),
    reportInterval: 5,
    checkpointInterval: 10,
    iterations: 25
)

let job = try MLImageClassifier.train(
    trainingData: .labeledDirectories(at: url),
    parameters: .init(),
    sessionParameters: sessionParams
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `sessionDirectory` | `URL?` | File system location where the session stores its progress; `nil` uses a system temp directory |
| `reportInterval` | `Int` | Number of iterations between progress reports |
| `checkpointInterval` | `Int` | Number of iterations between checkpoint saves |
| `iterations` | `Int` | Maximum number of training iterations |

## Notes

- macOS 11.0+, iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, tvOS 16.0+, visionOS 1.0+
- Persisting `sessionDirectory` to a stable path enables resuming training after an app restart

## Related

- [MLTrainingSession](./mltrainingsession.md)
- [MLJob](./mljob.md)
- [MLCheckpoint](./mlcheckpoint.md)
